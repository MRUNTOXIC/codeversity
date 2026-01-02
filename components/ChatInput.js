"use client";

import { useState } from "react";
import Button from "./Button";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-4 border-t bg-white"
    >
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type what you’re feeling…"
        disabled={disabled}
        className="flex-1 border rounded-lg px-3 py-2 text-sm"
      />

      <Button type="submit" disabled={disabled}>
        Send
      </Button>
    </form>
  );
}
