/* eslint-disable */
// Proper Azure Embedding Script for RAG (multiple chunks)

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// ---------------------------
//  CONFIG
// ---------------------------
const resumePath = path.join(process.cwd(), "rag", "resume.json");
const outPath = path.join(process.cwd(), "rag", "resumeVector.json");

// Azure client
const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
});

// ---------------------------
//  CHUNKING FUNCTION
// ---------------------------
function chunkText(text, maxChars = 1200) {
  const chunks = [];
  let current = "";

  const sentences = text.split(/(?<=[.?!])\s+/);

  for (const sentence of sentences) {
    if ((current + sentence).length > maxChars) {
      chunks.push(current.trim());
      current = "";
    }
    current += sentence + " ";
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  return chunks;
}

// ---------------------------
//  MAIN FUNCTION
// ---------------------------
async function run() {
  if (!fs.existsSync(resumePath)) {
    console.error("❌ rag/resume.json not found");
    process.exit(1);
  }

  // Load resume.json (array)
  const raw = fs.readFileSync(resumePath, "utf8");
  const resumeArray = JSON.parse(raw);

  if (!Array.isArray(resumeArray)) {
    console.error("❌ resume.json must be an array of objects");
    process.exit(1);
  }

  console.log(`✅ Loaded ${resumeArray.length} resume entries`);

  // Build a single combined text block
  const fullText = resumeArray
    .map((item) => `${item.section}: ${item.content}`)
    .join("\n\n");

  // Chunk into smaller semantic parts
  const chunks = chunkText(fullText, 1000); // ~1000-character chunks
  console.log(`🧩 Created ${chunks.length} chunks for embedding...`);

  const output = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`📡 Embedding chunk ${i + 1}/${chunks.length}...`);

    const response = await client.embeddings.create({
      model: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
      input: chunk,
    });

    output.push({
      id: i,
      text: chunk,
      embedding: response.data[0].embedding,
    });
  }

  // Save final vector JSON array
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");

  console.log(`✅ Saved ${output.length} embedded chunks → ${outPath}`);
  console.log("🎉 Embeddings completed successfully!");
}

run().catch((err) => {
  console.error("❌ Embedding script failed:", err);
  process.exit(1);
});
