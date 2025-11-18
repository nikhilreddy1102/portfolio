/* eslint-disable */

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// ---------- Types ----------
type VectorChunk = { text: string; embedding: number[] };

// ---------- Load resume vectors ----------
const VECTOR_PATH = path.join(process.cwd(), "rag", "resumeVector.json");
let vectors: VectorChunk[] = [];

try {
  vectors = JSON.parse(fs.readFileSync(VECTOR_PATH, "utf8"));
} catch {
  vectors = [];
}

// ---------- Cosine similarity ----------
function cosine(a: number[], b: number[]) {
  let dot = 0,
    na = 0,
    nb = 0;

  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }

  const d = Math.sqrt(na) * Math.sqrt(nb);
  return d === 0 ? 0 : dot / d;
}

// ---------- Should use RAG ----------
function shouldUseRAG(embed: number[], msg: string) {
  if (!vectors.length) return false;

  const s = msg.toLowerCase().trim();

  const max = Math.max(...vectors.map((v) => cosine(embed, v.embedding)));
  if (max >= 0.4) return true;

  // high-level topics → RAG
  const triggers = [
    "experience",
    "project",
    "skills",
    "work",
    "cloud",
    "dsa",
    "algorithm",
    "microservices",
    "architecture",
    "devops",
    "testing",
    "database",
    "sql",
    "nosql",
    "caching",
    "ai",
    "rag",
    "llm",
    "chatbot",
    "integration",
    "payment",
    "design",
  ];

  if (triggers.some((t) => s.includes(t))) return true;

  return false;
}

// ---------- Cache ----------
import {
  getCachedEmbedding,
  saveCachedEmbedding,
} from "../../../../rag/cache";

// ---------- Azure Clients ----------
const gptClient = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_GPT_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY! },
});

const embedClient = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY! },
});

// -----------------------------------------------------------
// GENERAL SYSTEM PROMPT
// -----------------------------------------------------------
const generalSystemPrompt = `
You are Nikhil's AI assistant.

IDENTITY RULES:
- Always speak as his AI assistant.
- Always describe Nikhil in third person.

STYLE RULE:
- Keep responses short and natural (2 to 4 sentences).
- Avoid hyphens unless absolutely required like in version names.
- No resume dumps, no lists, no robotic answers.

STARTUP RULE:
Treat the ECP platform as his startup style experience. Describe how he works across many areas and builds features from the base level in a fast moving environment.

END TO END RULE:
If user asks about anything he built from end to end, explain that he built several major parts of the ECP platform from the base level. Then optionally mention his portfolio AI agent when relevant.

PORTFOLIO AI AGENT RULE:
For questions about projects, AI experience or general capabilities:
- After talking about ECP work, describe how he built his portfolio AI agent using Azure OpenAI, embeddings, vector retrieval and a RAG approach in a custom Next.js API route.

SKILL EXPANSION RULE:
For ANY skill asked:
- First check if ECP relates to that skill. If yes, begin with ECP.
- If not, fall back to Cognizant. If not there, fall back to Adobe.
- Expand naturally using related resume themes.
- Always keep the explanation positive and focused on capability.
- Never say he lacks the skill or that it is not in the resume.

SKILL SUBSTITUTION RULE:
If user asks about a tool he did not directly use (Azure, GCP, Terraform, Kafka etc):
- Do not say he lacks experience.
- Explain he has not used that exact tool yet.
- Immediately connect it to a similar or related tool from his resume and explain how the concepts transfer.

END RULE:
Always end responses with: "Would you like more detail?"
`;

// -----------------------------------------------------------
// RAG SYSTEM PROMPT
// -----------------------------------------------------------
function buildRAGPrompt(context: string) {
  return `
You are Nikhil's AI assistant. Use the resume content below when helpful.

THIRD PERSON RULE:
Always describe Nikhil in third person. Never act as him.

STYLE:
Short, natural answers. Avoid hyphens unless required. No bullets or lists.

STARTUP RULE:
Treat the ECP platform as startup style experience where Nikhil handles base level development, integrations, and rapid changes.

END TO END RULE:
If asked about building something from the base level, explain he built core modules of the ECP platform completely and also created his portfolio AI agent independently.

PORTFOLIO AI AGENT RULE:
For AI, project or capability questions:
- Mention ECP work first.
- Then mention his portfolio AI agent that uses Azure OpenAI, embeddings, vector retrieval and a RAG pipeline in a custom Next.js route.

SKILL EXPANSION RULE:
For any skill:
- Start with ECP if possible.
- If not, fallback to Cognizant then Adobe.
- Expand naturally using related resume elements.
- Do not say it is missing from resume.

SKILL SUBSTITUTION RULE:
If a tool is not in resume:
- Say he has not used that specific tool yet.
- Connect it to the closest tool he has used and explain concept overlap.

FOLLOW UP:
Always end with: "Would you like more detail?"

RESUME CONTEXT:
${context}
`;
}

// -----------------------------------------------------------
// MAIN ROUTE HANDLER
// -----------------------------------------------------------
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1]?.content || "";
    const userMsg = last.toString().trim();

    if (!userMsg) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    if (!vectors.length) {
      const out = await gptClient.chat.completions.create({
        model: process.env.AZURE_OPENAI_GPT_DEPLOYMENT!,
        messages: [{ role: "system", content: generalSystemPrompt }, ...messages],
      });
      return NextResponse.json({ reply: out.choices[0].message.content, mode: "general-no-vectors" });
    }

    // Embedding
    let emb = getCachedEmbedding(userMsg);
    if (!emb) {
      const e = await embedClient.embeddings.create({
        model: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT!,
        input: userMsg,
      });
      emb = e.data[0].embedding;
      saveCachedEmbedding(userMsg, emb);
    }

    const useRAG = shouldUseRAG(emb, userMsg);

    // ---------- RAG ----------
    if (useRAG) {
      const scored = vectors
        .map((v) => ({ text: v.text, score: cosine(emb!, v.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      const ctx = scored.map((x) => x.text).join("\n\n");

      const out = await gptClient.chat.completions.create({
        model: process.env.AZURE_OPENAI_GPT_DEPLOYMENT!,
        messages: [{ role: "system", content: buildRAGPrompt(ctx) }, ...messages],
      });

      return NextResponse.json({ reply: out.choices[0].message.content, mode: "rag" });
    }

    // ---------- GENERAL ----------
    const out = await gptClient.chat.completions.create({
      model: process.env.AZURE_OPENAI_GPT_DEPLOYMENT!,
      messages: [{ role: "system", content: generalSystemPrompt }, ...messages],
    });

    return NextResponse.json({ reply: out.choices[0].message.content, mode: "general" });

  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Error" }, { status: 500 });
  }
}
