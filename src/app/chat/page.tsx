"use client";

import { useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input.trim() }
    ];

    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
        }),
      });

      const data = await res.json();

      const reply =
        data?.choices?.[0]?.message?.content ??
        "No response from model";

      setMessages([
        ...newMessages,
        { role: "assistant", content: reply }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error connecting to API." }
      ]);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Test AI Chat</h1>

      <div
        style={{
          border: "1px solid #333",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role}: </strong>
            {m.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask something..."
        style={{ width: "80%", padding: 8 }}
      />

      <button
        onClick={sendMessage}
        style={{ padding: "8px 12px", marginLeft: 8 }}
      >
        Send
      </button>
    </div>
  );
}
