// rag/cache.js

// In-memory cache only – safe for Vercel serverless
const cache = {};

/**
 * Get embedding from cache for a given query.
 */
function getCachedEmbedding(query) {
  return cache[query];
}

/**
 * Save embedding in memory. No filesystem writes.
 */
function saveCachedEmbedding(query, embedding) {
  cache[query] = embedding;
}

module.exports = {
  getCachedEmbedding,
  saveCachedEmbedding,
};
