"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import ThemeToggle from "@/components/ThemeToggle";
import { sendMessage } from "@/lib/apiClient";
import { VentIcon, MindSpaceLogo } from "@/components/Icons";
import { useTheme } from "@/components/ThemeProvider";

export default function VentRoom() {
  const router = useRouter();
  const { theme } = useTheme();
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
    <main className="flex flex-col h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Enhanced Header */}
      <header className="border-b px-6 py-4 backdrop-blur-md" style={{
        background: theme === 'dark' 
          ? 'rgba(15, 23, 42, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        borderColor: 'var(--border)'
      }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.back()} 
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <VentIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Vent Room</h1>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>A safe space to express your feelings</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Messages Area */}
      <section className="flex-1 overflow-y-auto p-6 space-y-4 scroll-area" style={{
        background: 'var(--bg-primary)'
      }}>
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
              background: 'var(--bg-secondary)'
            }}>
              <div className="typing-dots">
                <div className="typing-dot animate-pulse"></div>
                <div className="typing-dot animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="typing-dot animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Input Area */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </main>
  );
}