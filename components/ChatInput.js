"use client";

import { useState, useRef, useEffect } from "react";
import VoiceInput from "./VoiceInput";
import { detectSensitiveContent, getSensitiveContentWarning, validateMessage } from "@/backend/services/contentValidator";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const [sensitiveWarning, setSensitiveWarning] = useState(null);
  const [inputError, setInputError] = useState(null);
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  // Check for sensitive content as user types
  useEffect(() => {
    if (text.trim().length > 10) {
      const detection = detectSensitiveContent(text);
      if (detection.isSensitive) {
        setSensitiveWarning(getSensitiveContentWarning(detection.category));
      } else {
        setSensitiveWarning(null);
      }
    } else {
      setSensitiveWarning(null);
    }
  }, [text]);

  // Handle voice transcription
  const handleVoiceTranscript = (transcript) => {
    setText(prev => (prev ? prev + " " : "") + transcript);
    
    // Auto-validate when voice is transcribed
    const validation = validateMessage((text ? text + " " : "") + transcript);
    if (!validation.isValid) {
      setInputError(validation.error);
    } else {
      setInputError(null);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate message
    const validation = validateMessage(text);
    if (!validation.isValid) {
      setInputError(validation.error);
      return;
    }

    // Check for sensitive content
    const detection = detectSensitiveContent(text);
    if (detection.isSensitive) {
      // Show warning but still allow sending
      console.warn('Sensitive content detected:', detection.category);
    }

    if (!text.trim() || disabled) return;
    
    onSend(text);
    setText("");
    setSensitiveWarning(null);
    setInputError(null);
  }

  return (
    <div className="input-container p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Sensitive Content Warning */}
        {sensitiveWarning && (
          <div
            className="mb-3 p-3 rounded-lg text-xs whitespace-pre-wrap"
            style={{
              background: 'var(--warning-light)',
              color: 'var(--text-primary)',
              border: '1px solid var(--warning)',
              maxHeight: '150px',
              overflowY: 'auto'
            }}
          >
            {sensitiveWarning}
          </div>
        )}

        {/* Input Error */}
        {inputError && (
          <div
            className="mb-3 p-3 rounded-lg text-xs"
            style={{
              background: 'var(--error-light)',
              color: 'var(--error)',
              border: '1px solid var(--error)'
            }}
          >
            {inputError}
          </div>
        )}

        {/* Voice Input Component */}
        <div className="mb-3">
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            disabled={disabled}
          />
        </div>

        {/* Text Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setInputError(null);
              }}
              placeholder="Type or use voice input... 🎤"
              disabled={disabled}
              rows={1}
              className="input-field w-full px-4 py-3 rounded-2xl resize-none"
              style={{ 
                minHeight: '48px', 
                maxHeight: '120px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderColor: inputError ? 'var(--error)' : 'var(--border)'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            {/* Character count */}
            <span
              className="absolute bottom-2 right-2 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {text.length}/2000
            </span>
          </div>
          <button
            type="submit"
            disabled={disabled || !text.trim()}
            className="send-button w-12 h-12 rounded-xl flex-shrink-0"
            style={{
              background: disabled || !text.trim() 
                ? 'var(--text-muted)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              cursor: disabled || !text.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {disabled ? (
              <div className="loading-spinner animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>

        {/* Helper Text */}
        <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          Press Shift+Enter for new line • Sensitive topics are monitored for your safety
        </div>
      </div>
    </div>
  );
}