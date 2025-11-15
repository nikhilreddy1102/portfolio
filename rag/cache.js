// rag/cache.js

const fs = require("fs");
const path = require("path");

const CACHE_PATH = path.join(process.cwd(), "rag", "queryCache.json");

// Load query cache
let cache = {};
if (fs.existsSync(CACHE_PATH)) {
  cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
}

function getCachedEmbedding(query) {
  return cache[query];
}

function saveCachedEmbedding(query, embedding) {
  cache[query] = embedding;
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
}

module.exports = {
  getCachedEmbedding,
  saveCachedEmbedding,
};