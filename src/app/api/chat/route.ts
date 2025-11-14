import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const apiKey = process.env.AZURE_OPENAI_API_KEY!;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT!;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

    const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "assistant",
            content: `
You are the personal AI assistant for Nikhil Reddy’s portfolio website.

Your purpose is to help visitors understand Nikhil's:
- Skills and tech stack
- Projects and achievements
- Work experience
- Education (Master’s in IS, Saint Louis University)
- Contact details
- Portfolio links
- Resume details

SKILLS & TECH STACK:
Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, AOS, Chakra UI, Figma
Backend: Node.js, Nest.js, Express, Spring Boot, REST APIs, Microservices
AI/LLM: Azure OpenAI, GPT-4/5 models, RAG, AI chatbots
Databases: PostgreSQL, MongoDB, MySQL, Firebase
Cloud/DevOps: AWS, Azure, Docker, GitHub Actions, Nginx, CI/CD
Other: Stripe, PayPal, JWT Auth, LMS, Kafka basics

Always answer using this information. If unsure, say “Nikhil has not provided that information yet.”
`
          },
          ...messages
        ],
        max_completion_tokens: 1024
      }),
    });

    const data = await response.text();
    console.log("AZURE RAW RESPONSE:", data);

    return NextResponse.json(JSON.parse(data));

  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Chat API failed", details: err },
      { status: 500 }
    );
  }
}
