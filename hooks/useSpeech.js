"use client";

/**
 * Text-to-Speech Hook
 * Uses browser's Web Speech API to read responses aloud
 */

import { useRef, useState } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);
  const preferredVoiceRef = useRef(null);

  // Hints for picking a warm female voice across platforms
  const FEMALE_VOICE_HINTS = [
    "female", "woman", "samantha", "victoria", "zira", "fiona", "karen",
    "sarah", "alloy", "olivia", "emma", "ava", "sophia", "isabella",
    "google uk english", "google us english", "microsoft zira", "serena"
  ];

  const speak = (text) => {
    // Check browser support
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported in this browser");
      return false;
    }

    // Stop current speech if any
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }

    try {
      // Clean text of markdown and special characters for better TTS
      const cleanText = text
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/##/g, "")
        .replace(/\[([^\]]+)\]/g, "$1")
        .replace(/\n+/g, " ");

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Configure voice settings
      utterance.rate = 1; // Speed
      utterance.pitch = 1; // Pitch
      utterance.volume = 1; // Volume

      // Use a nice female voice if available (heuristic selection)
      const voices = window.speechSynthesis.getVoices();
      let chosen = null;

      // If user previously selected a preferred voice, try to honor it
      if (preferredVoiceRef.current) {
        chosen = voices.find(v => v.name === preferredVoiceRef.current || v.voiceURI === preferredVoiceRef.current) || null;
      }

      if (!chosen && voices.length > 0) {
        // 1) Try to match known female name hints (case-insensitive)
        const hintMatch = voices.find(v => {
          const name = (v.name || "").toLowerCase();
          const uri = (v.voiceURI || "").toLowerCase();
          return FEMALE_VOICE_HINTS.some(h => name.includes(h) || uri.includes(h));
        });
        if (hintMatch) chosen = hintMatch;

        // 2) If no hint match, prefer English voices (for natural TTS) and then pick the first
        if (!chosen) {
          const enMatch = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("en"));
          if (enMatch) chosen = enMatch;
        }

        // 3) Fallback to first available voice
        if (!chosen) chosen = voices[0];
      }

      if (chosen) utterance.voice = chosen;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.error("Error initiating speech:", error);
      return false;
    }
  };

  // Allow programmatic override of preferred voice name/voiceURI
  const setPreferredVoice = (voiceNameOrURI) => {
    preferredVoiceRef.current = voiceNameOrURI;
  };

  const pause = () => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    setPreferredVoice,
    // utility to list available voices (may be empty until voicesloaded)
    getAvailableVoices: () => (typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis.getVoices() : [])
  };
}
