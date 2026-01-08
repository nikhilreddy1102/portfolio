# Portfolio + AI Chatbot (RAG) — Nikhil Reddy

A modern developer portfolio built with Next.js and Tailwind CSS, with an AI chatbot experience. The chatbot uses Retrieval-Augmented Generation (RAG) to answer questions about my background and projects using my own content as context.

---

## What this project includes

### 1) Portfolio Website
- Clean, fast personal site built for recruiters and hiring managers
- Pixel-aligned UI based on Figma specs
- Sections typically include: Hero, experience/projects, skills and contact

### 2) AI Chatbot (RAG)
- Chat UI embedded into the site
- Retrieval-Augmented Generation:
  - Stores resume / project docs / FAQs as searchable chunks
  - Uses embeddings + vector search to retrieve relevant context
  - Uses an LLM to generate an answer grounded in retrieved context

### 3) Basic Security & Privacy Notes (recommended)
- Rate limiting (basic)
- Bot protection / abuse controls (basic)
- Logs only minimal anonymous metadata (for security and debugging)

---

## Tech Stack

### Frontend
- **Next.js** (App Router)
- **React**
- **Tailwind CSS**

### AI / Backend (Chatbot)
- **Azure OpenAI** (chat completions + embeddings)
- **Vector DB:** Qdrant / FAISS
- **API Layer:** Next.js Route Handlers (server endpoints)



## Architecture Overview (high level)

1. Content sources (resume, project docs, FAQs, case studies)
2. Chunking + embeddings pipeline
3. Vector search (Qdrant/FAISS)
4. Chat endpoint
5. Chat UI in the portfolio

**Flow:**
User question → embed query → vector search → retrieve top-k chunks → LLM response using retrieved context

---

## Getting Started
This project is intended as a portfolio showcase. Setup and environment details are kept private to protect keys and infrastructure.

