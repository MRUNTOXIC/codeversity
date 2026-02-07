"use client";

import { useEffect, useRef, useState } from "react";

export default function VoiceInput({ onTranscript, disabled = false }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const recognitionRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check browser support for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsBrowserSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    
    // Configure speech recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // Handle incoming voice data
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript("");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // Update display with interim results for real-time feedback
      if (interimTranscript || finalTranscript) {
        setTranscript(interimTranscript || finalTranscript);
      }

      // Send final transcript to parent
      if (finalTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      setError(`Voice error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setError(null);
      recognitionRef.current.start();
    }
  };

  if (!isBrowserSupported) {
    return (
      <div className="text-xs p-2" style={{ color: 'var(--text-muted)' }}>
        Voice input not supported in this browser. Use Firefox, Chrome, or Safari.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Voice Button */}
      <button
        onClick={toggleListening}
        disabled={disabled}
        className="p-2 rounded-lg flex items-center justify-center gap-2 transition-all"
        style={{
          background: isListening 
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'var(--bg-secondary)',
          color: isListening ? 'white' : 'var(--text-secondary)',
          border: '1px solid var(--border)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          fontSize: '12px',
          fontWeight: '500'
        }}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        <svg
          className="w-4 h-4"
          fill={isListening ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
          />
        </svg>
        {isListening ? '🔴 Listening...' : '🎤 Voice'}
      </button>

      {/* Transcript Display */}
      {transcript && (
        <div
          className="p-2 rounded-lg text-xs"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderLeft: '3px solid var(--accent-primary)',
            fontStyle: 'italic'
          }}
        >
          {transcript}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div
          className="p-2 rounded-lg text-xs"
          style={{
            background: 'var(--error-light)',
            color: 'var(--error)'
          }}
        >
          {error}
        </div>
      )}

      {/* Status Indicator */}
      {isListening && (
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <div className="flex gap-1">
            <div
              className="w-1 h-3 rounded-full bg-red-500 animate-pulse"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="w-1 h-3 rounded-full bg-red-500 animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="w-1 h-3 rounded-full bg-red-500 animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
          Listening for voice input...
        </div>
      )}
    </div>
  );
}
