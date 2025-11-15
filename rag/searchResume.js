/* eslint-disable */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// ----------------------------------------
// CONFIG
// ----------------------------------------
const VECTOR_PATH = path.join(process.cwd(), "rag", "resumeVector.json");
const K = 5;

// ----------------------------------------
// LOAD EMBEDDING DATA
// ----------------------------------------
function loadVectors() {
  try {
    const json = fs.readFileSync(VECTOR_PATH, "utf8");
    return JSON.parse(json);
  } catch (err) {
    console.error("❌ Could not read resumeVector.json", err);
    process.exit(1);
  }
}

// ----------------------------------------
// COSINE SIMILARITY
// ----------------------------------------
function cosineSimilarity(a, b) {
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

// ----------------------------------------
// SEARCH IMPLEMENTATION
// ----------------------------------------
async function runSearch() {
  const query = process.argv.slice(2).join(" ");
  if (!query) {
    console.error("❌ Provide a query. Example:");
    console.error("   node rag/searchResume.js \"cloud devops\"");
    process.exit(1);
  }

  console.log("🔍 Searching:", query);

  // ENV VALIDATION
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const key = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

  if (!endpoint || !key || !deployment || !apiVersion) {
    console.error("❌ Missing required .env variables");
    console.error({ endpoint, key, deployment, apiVersion });
    process.exit(1);
  }

  console.log("🌐 Endpoint:", endpoint);
  console.log("🤖 Deployment:", deployment);

  // ----------------------------------------
  // CREATE AZURE OPENAI CLIENT (CORRECT)
  // ----------------------------------------
  const client = new OpenAI({
    apiKey: key,
    baseURL: `${endpoint}/openai/deployments/${deployment}`,
    defaultQuery: { "api-version": apiVersion },
    defaultHeaders: { "api-key": key },
  });

  // Load resume vector data
  const storedVectors = loadVectors();

  // ----------------------------------------
  // EMBED THE QUERY
  // ----------------------------------------
  let embeddingResponse;
  try {
    console.log("📡 Requesting Azure embedding...");

    embeddingResponse = await client.embeddings.create({
      model: deployment, // IMPORTANT
      input: query,
    });
  } catch (err) {
    console.error("❌ ERROR calling Azure embeddings:", err);
    process.exit(1);
  }

  const queryEmbedding = embeddingResponse.data[0].embedding;

  // ----------------------------------------
  // SCORE SEARCH
  // ----------------------------------------
  const scored = storedVectors.map((item) => ({
    text: item.text,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  const top = scored.sort((a, b) => b.score - a.score).slice(0, K);

  // ----------------------------------------
  // PRINT RESULTS
  // ----------------------------------------
  console.log("\n🎯 Top Results:\n");
  top.forEach((r, idx) => {
    console.log(`#${idx + 1} (score: ${r.score.toFixed(4)})`);
    console.log(r.text);
    console.log("--------------------------------------------------");
  });
}

runSearch();
