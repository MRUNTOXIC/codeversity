"use client";

import { useEffect, useState } from "react";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import { sendMessage } from "@/lib/apiClient";

export default function ReflectRoom() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to your Reflect & Calm space. I'm here to help you process your thoughts and find inner peace. Take a deep breath. What would you like to explore today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState("reflect");

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await sendMessage(text, currentMode);

      const aiMessage = {
        sender: "ai",
        text: res.reply
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "I'm here to support you. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤔</span>
            <h1 className="text-lg font-semibold">Reflect & Calm</h1>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMode("reflect")}
              className={`px-3 py-1 rounded text-sm ${
                currentMode === "reflect" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Reflect
            </button>
            <button
              onClick={() => setCurrentMode("calm")}
              className={`px-3 py-1 rounded text-sm ${
                currentMode === "calm" 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Calm
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {currentMode === "reflect" 
            ? "Process your thoughts and find clarity" 
            : "Find peace and relaxation"}
        </p>
      </header>

      <section className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <ChatBubble sender="ai" text="Thinking..." />
        )}
      </section>

      <ChatInput onSend={handleSend} disabled={loading} />
    </main>
  );
}