// lib/apiClient.js

import { getSessionId } from "@/utils/session";

export async function sendMessage(message, mode = "reflect") {
  const sessionId = getSessionId();
  
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-session-id": sessionId
    },
    body: JSON.stringify({ message, mode })
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  const data = await res.json();
  return {
    reply: data.reply || data.message,
    isCrisisContent: data.isCrisisContent || false,
    severity: data.severity || 'none',
    status: data.status || 'success'
  };
}