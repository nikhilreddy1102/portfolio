"use client";

import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ChatModalProps {
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll: ALWAYS go to exact TOP of latest message
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const lastMessage = container.querySelector(
      ".chat-msg:last-child"
    ) as HTMLElement | null;

    if (!lastMessage) return;

    container.scrollTo({
      top: lastMessage.offsetTop,
      behavior: "smooth",
    });
  }, [messages]);

  // When modal opens
  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input }
    ];

    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content || "No response.";

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: reply }
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error connecting to server." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[350px] h-[480px] flex flex-col overflow-hidden animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-base font-semibold">Chat with Nikhil’s AI</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-3 px-3 pb-3"
        >
          {messages.length === 0 && (
            <p className="text-gray-500 text-sm">
              👋 Hi! Ask anything about Nikhil’s projects, experience, or skills.
            </p>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-msg p-2 rounded-lg max-w-[80%] ${
                m.role === "user"
                  ? "bg-black text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t flex gap-2">
          <input
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 rounded-lg hover:bg-gray-900"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
