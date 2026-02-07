"use client";

import { useState, useEffect } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import ChatImage from "./ChatImage";

export default function ChatBubble({ sender, text, image }) {
  const isUser = sender === "user";
  const isTyping = text === "Typing…";
  const { speak, pause, resume, stop, isSpeaking, isPaused } = useSpeech();
  const [isReadingAvailable, setIsReadingAvailable] = useState(false);

  // Check if text-to-speech is available on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;
      setIsReadingAvailable(!!synth);
    }
  }, []);

  if (isTyping) {
    return (
      <div className="animate-fadeIn mb-6">
        <div className="flex items-start gap-3">
          <div className="avatar w-7 h-7">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="message-ai typing">
            <div className="typing-dots">
              <div className="typing-dot animate-typing"></div>
              <div className="typing-dot animate-typing" style={{animationDelay: '0.2s'}}></div>
              <div className="typing-dot animate-typing" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn mb-6">
      <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`avatar w-7 h-7 ${isUser ? 'user' : ''}`}>
          {isUser ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )}
        </div>
        <div className={`message-bubble ${isUser ? 'message-user' : 'message-ai'}`}>
          {/* Image in message */}
          {image && (
            <ChatImage src={image} alt="Chat attachment" maxWidth="280px" />
          )}

          {/* Message text */}
          <div className={isUser ? '' : 'py-1'}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{text}</p>

            {/* Text-to-speech controls for AI messages */}
            {!isUser && isReadingAvailable && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                {!isSpeaking ? (
                  <button
                    onClick={() => speak(text)}
                    className="text-xs px-2 py-1 rounded hover:opacity-80 transition"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Read aloud"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    Read
                  </button>
                ) : isPaused ? (
                  <button
                    onClick={() => resume()}
                    className="text-xs px-2 py-1 rounded hover:opacity-80 transition"
                    style={{
                      background: 'var(--accent)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Resume reading"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={() => pause()}
                    className="text-xs px-2 py-1 rounded hover:opacity-80 transition"
                    style={{
                      background: 'var(--accent)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Pause reading"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                    Pause
                  </button>
                )}
                {isSpeaking && (
                  <button
                    onClick={() => stop()}
                    className="text-xs px-2 py-1 rounded hover:opacity-80 transition"
                    style={{
                      background: 'var(--error-light)',
                      color: 'var(--error)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title="Stop reading"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h12v12H6z"/>
                    </svg>
                    Stop
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}