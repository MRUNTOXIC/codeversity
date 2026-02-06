export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";
  const isTyping = text === "Typing…";

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
          <div className={isUser ? '' : 'py-1'}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}