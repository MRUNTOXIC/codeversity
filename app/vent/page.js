"use client";

import { useEffect, useState } from "react";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import { sendMessage } from "@/lib/apiClient";

export default function VentRoom() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to the Vent Room. This is your safe space to let it all out. I'm here to listen without judgment. What's on your mind?"
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await sendMessage(text, "vent");
      console.log('API Response:', res);

      const aiMessage = {
        sender: "ai",
        text: res.reply
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error in handleSend:', err);
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "I'm here for you. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💭</span>
          <h1 className="text-lg font-semibold">Vent Room</h1>
        </div>
        <p className="text-sm text-gray-600">A safe space to express your feelings</p>
      </header>

      <section className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <ChatBubble sender="ai" text="Listening..." />
        )}
      </section>

      <ChatInput onSend={handleSend} disabled={loading} />
    </main>
  );
}