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
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside modal
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Auto scroll to bottom on new messages or typing indicator
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const reply = data?.reply || "No response.";

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: reply },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Error connecting to server.",
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-end pointer-events-auto">
      {/* CLICK-OUTSIDE OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />

      {/* CHAT BOX */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl w-[350px] h-[480px] flex flex-col overflow-hidden m-6 animate-fadeIn z-50"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-base font-semibold">Chat with Nikhil’s AI</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-3 px-3 pb-3 scroll-smooth"
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

          {/* TYPING INDICATOR */}
          {isTyping && (
            <div className="flex items-center gap-2 pl-1">
              <div className="typing-dot bg-gray-400"></div>
              <div className="typing-dot bg-gray-400"></div>
              <div className="typing-dot bg-gray-400"></div>
            </div>
          )}
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

      {/* CSS FOR TYPING ANIMATION */}
      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
          100% {
            opacity: 0.2;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
