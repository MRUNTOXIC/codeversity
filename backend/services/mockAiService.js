export function mockAIResponse(message, mode) {
  if (mode === "vent") {
    return "I hear you. That sounds heavy. You don’t have to hold it in here.";
  }

  if (mode === "reflect") {
    return "Let’s slow down for a moment. Try taking a deep breath with me.";
  }

  return "I’m here with you.";
}
