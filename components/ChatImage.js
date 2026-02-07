"use client";

import { useState } from "react";

export default function ChatImage({ src, alt = "Chat image", maxWidth = "300px" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!src) return null;

  return (
    <div className="my-2">
      <img
        src={src}
        alt={alt}
        className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          maxWidth: isExpanded ? "100%" : maxWidth,
          maxHeight: isExpanded ? "600px" : "300px"
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        Click to {isExpanded ? "collapse" : "expand"}
      </p>
    </div>
  );
}
