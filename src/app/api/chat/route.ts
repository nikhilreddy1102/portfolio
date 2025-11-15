/* eslint-disable */

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// ---------------- IMPORT CACHE UTILS ----------------
import {
  getCachedEmbedding,
  saveCachedEmbedding,
} from "../../../../rag/cache";

// --------------- LOAD RESUME VECTORS ----------------
type VectorChunk = {
  text: string;
  embedding: number[];
};

const VECTOR_PATH = path.join(process.cwd(), "rag", "resumeVector.json");
const vectors: VectorChunk[] = JSON.parse(
  fs.readFileSync(VECTOR_PATH, "utf8")
);

// ----------------- COSINE SIMILARITY ----------------
function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0,
    normA = 0,
    normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ------------------ GENERAL CHAT CHECK --------------
function isGeneralChat(message: string): boolean {
  const msg = message.toLowerCase();

  const resumeKeywords = [
    "experience",
    "skills",
    "project",
    "cognizant",
    "adobe",
    "codelance",
    "spring",
    "java",
    "cloud",
    "devops",
    "frontend",
    "backend",
    "microservices",
    "resume",
    "job",
    "work",
  ];

  // If NO resume keyword → general chat
  return !resumeKeywords.some((kw) => msg.includes(kw));
}

// ------------------ AZURE GPT CLIENT -----------------
const gptClient = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_GPT_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY! },
});

// ------------------ AZURE EMBEDDING CLIENT ----------
const embedClient = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY! },
});

// ---------------------- ROUTE ------------------------
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    // -------------------- GENERAL CHAT -----------------
    if (isGeneralChat(userMessage)) {
      const generalReply = await gptClient.chat.completions.create({
        model: process.env.AZURE_OPENAI_GPT_DEPLOYMENT!,
        messages: [
          {
            role: "system",
            content:
              "You are a friendly assistant. Respond politely, naturally, and casually to greetings or general questions.",
          },
          ...messages,
        ],
      });

      return NextResponse.json({
        reply: generalReply.choices[0].message.content,
      });
    }

    // -------------------- RAG MODE ---------------------
    // Try cache first
    let queryEmbedding = getCachedEmbedding(userMessage);

    // If no cache → embed and save
    if (!queryEmbedding) {
      const embedRes = await embedClient.embeddings.create({
        model: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT!,
        input: userMessage,
      });

      queryEmbedding = embedRes.data[0].embedding;
      saveCachedEmbedding(userMessage, queryEmbedding);
    }

    // Score resume vectors
    const scored = vectors.map((v: VectorChunk) => ({
      text: v.text,
      score: cosineSimilarity(queryEmbedding!, v.embedding),
    }));

    const topK = scored
      .sort(
        (
          a: { score: number },
          b: { score: number }
        ) => b.score - a.score
      )
      .slice(0, 4);

    const contextText = topK
      .map((c: { text: string }) => c.text)
      .join("\n\n");

    // System instruction for resume questions
    const systemPrompt = `
You are an AI assistant answering questions ONLY using the resume context below.

If user asks about experience, skills, projects, Cognizant, Adobe, Codelance, cloud, devops, Java, frontend, backend, or technical work — USE THE CONTEXT.

If information is missing, respond:
"I don't have enough information for that."

RESUME CONTEXT:
${contextText}
    `;

    const completion = await gptClient.chat.completions.create({
      model: process.env.AZURE_OPENAI_GPT_DEPLOYMENT!,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("❌ Chat Error:", error);
    return NextResponse.json(
      { error: error?.message || "Chat error" },
      { status: 500 }
    );
  }
}
