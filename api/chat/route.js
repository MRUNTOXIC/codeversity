export async function sendMessage(message, mode) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, mode })
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}