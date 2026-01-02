"use client";

import { useEffect, useState } from "react";
import ChatBubble from "@/frontend/components/ChatBubble";
import ChatInput from "@/frontend/components/ChatInput";
import ModeBadge from "@/frontend/components/ModeBadge";
import { sendMessage } from "@/frontend/lib/apiClient";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("vent");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedMode = sessionStorage.getItem("mode");
    if (savedMode) setMode(savedMode);
  }, []);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await sendMessage(text, mode);

      const aiMessage = {
        sender: "ai",
        text: res.reply
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 border-b bg-white">
        <ModeBadge mode={mode} />
      </header>

      <section className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <ChatBubble sender="ai" text="Typing…" />
        )}
      </section>

      <ChatInput onSend={handleSend} disabled={loading} />
    </main>
  );
}
