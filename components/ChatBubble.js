export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-black text-white"
            : "bg-white border text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
