"use client";

import { useEffect, useState, useRef } from "react";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import ModeBadge from "@/components/ModeBadge";
import CrisisAlert from "@/components/CrisisAlert";
import ThemeToggle from "@/components/ThemeToggle";
import { sendMessage } from "@/lib/apiClient";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("vent");
  const [loading, setLoading] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    const savedMode = sessionStorage.getItem("mode");
    if (savedMode) setMode(savedMode);
    
    // Check API status
    fetch('/api/chat')
      .then(res => res.json())
      .then(() => setApiStatus("ready"))
      .catch(() => setApiStatus("error"));
  }, []);

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setCrisisAlert(null);
    setLoading(true);

    try {
      const res = await sendMessage(text, mode);

      if (res.isCrisisContent) {
        setCrisisAlert({
          message: res.reply,
          severity: res.severity || 'medium'
        });
      }

      const aiMessage = {
        sender: "ai",
        text: res.reply || res.message,
        isCrisis: res.isCrisisContent || false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "I'm having trouble connecting right now. Please try again in a moment." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="flex flex-col h-screen">
        <header className="chat-header flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium">MindSpace</h1>
            <ModeBadge mode={mode} />
            {apiStatus === "checking" && (
              <div className="flex items-center gap-2 text-xs" style={{color: 'var(--text-muted)'}}>
                <div className="loading-spinner animate-spin w-3 h-3"></div>
                Connecting...
              </div>
            )}
            {apiStatus === "error" && (
              <div className="text-xs px-2 py-1 rounded" style={{background: 'var(--error)', color: 'white'}}>
                API Error
              </div>
            )}
            {apiStatus === "ready" && (
              <div className="text-xs px-2 py-1 rounded" style={{background: 'var(--success)', color: 'white'}}>
                Online
              </div>
            )}
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col max-w-4xl mx-auto">
            <div className="flex-1 overflow-y-auto scroll-area px-4">
              {crisisAlert && (
                <div className="animate-fadeIn my-4">
                  <CrisisAlert message={crisisAlert.message} severity={crisisAlert.severity} />
                </div>
              )}
              
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="empty-state max-w-md text-center">
                    <div className="avatar w-12 h-12 mx-auto mb-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h2 className="text-xl font-medium mb-2">How can I help you today?</h2>
                    <p className="text-sm">I'm here to listen and provide support. Share what's on your mind.</p>
                  </div>
                </div>
              )}
              
              <div className="py-4">
                {messages.map((msg, idx) => (
                  <ChatBubble key={idx} sender={msg.sender} text={msg.text} isCrisis={msg.isCrisis} />
                ))}

                {loading && (
                  <ChatBubble sender="ai" text="Typing…" />
                )}
              </div>
              
              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSend={handleSend} disabled={loading || apiStatus !== "ready"} />
          </div>
        </main>
      </div>
    </div>
  );
}
