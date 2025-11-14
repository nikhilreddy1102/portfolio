"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Text + Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-50
          bg-black text-white
          px-5 py-3 
          rounded-full shadow-lg
          flex items-center gap-2
          font-medium text-sm
          hover:bg-gray-900 hover:scale-[1.03]
          transition-all tracking-wide
        "
      >
        <MessageCircle size={18} className="text-white" />
        Chat with me
      </button>

      {/* Chat modal */}
      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  );
}
