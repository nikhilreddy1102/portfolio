"use client";
import { useState } from "react";

const projects = [
  {
  title: "AI-Powered Portfolio Assistant",
  description:
    "A personal portfolio enhanced with a real-time AI agent using Azure OpenAI, custom embeddings and RAG.",
  details: `The goal of this project was to build a fully interactive developer portfolio 
  with an intelligent AI assistant capable of answering both general queries and 
  deeply contextual, skill-based questions about my background, projects, and tech stack.
  I built the entire platform using Next.js, TypeScript and Tailwind CSS, creating 
  modular UI components, serverless API routes, and a real-time streaming chat interface 
  inspired by modern LLM application design.

  To enable accurate and personalized responses, I implemented a Retrieval-Augmented 
  Generation (RAG) pipeline. I structured my resume and project metadata into JSON, created 
  text chunks, and generated embeddings using Azure OpenAI’s “text-embedding-3-large” model. 
  These embeddings were stored in a vector index and queried dynamically during chat to 
  retrieve the most relevant context before sending prompts to the LLM. This significantly 
  improved answer precision and allowed the agent to reference specific experience, tools, 
  and technical achievements without hallucination.

  The AI agent supports two modes of intelligence:
  1) General language reasoning for open-ended queries, career advice, and basic conversation.
  2) Skill-based, context-aware responses generated through RAG, enabling the model to 
     describe my microservices work, cloud projects, frontend architecture decisions, 
     and domain expertise with high accuracy.

  On the backend, I used serverless functions with secure Azure environment isolation, 
  implemented streaming token responses for a smooth chat UX, and optimized prompt 
  engineering to merge retrieved context with model instructions. By combining LLM 
  reasoning, vector search, embeddings, and a highly modular UI, this project demonstrates 
  how modern AI systems can be integrated into personal applications to create an 
  intelligent, developer-focused experience.`
}
,
  {
    title: "Integrated Healthcare Data Security System (Research Project)",
    description: "Smart security for sensitive healthcare data-compliant, encrypted, and resilient.",
    details: `During my Master’s program, I led a research project aimed at addressing the 
    challenge of securing sensitive healthcare data while complying with HIPAA standards. 
    I designed a secure database prototype with AES-256 and TLS 1.3 encryption, integrated 
    role-based and attribute-based access control and applied graph-based algorithms to resolve 
    complex user permission hierarchies. To further strengthen the system, I implemented real-time 
    audit logging and anomaly detection using behavioral analytics. This project demonstrated how a 
    carefully engineered system can safeguard patient data, prevent unauthorized access and detect potential
     threats in real time, also proving the feasibility of combining strong cryptography with intelligent 
     monitoring for healthcare security.`,
  },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div id="projects" className="w-full text-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 space-y-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-center">Projects</h2>

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              onClick={() => setActive(idx)}
              className="cursor-pointer p-6 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold">{proj.title}</h3>
              <p className="mt-2 text-sm text-white/70">{proj.description}</p>
            </div>
          ))}
        </div>

        {/* Popup modal */}
        {active !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setActive(null)} // click background closes modal
          >
            <div
              className="max-w-lg w-full bg-white text-black rounded-xl p-6 relative"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4">
                {projects[active].title}
              </h3>
              <p className="leading-relaxed">{projects[active].details}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
