import { GoogleGenerativeAI } from "@google/generative-ai";
import { detectCrisis, getCrisisResponse } from "@/backend/services/crisisDetectionService";
import { mockAIResponse } from "@/backend/services/mockAiService";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ---------- Helpers ---------- */

function detectEmotionMode(text) {
  const lower = text.toLowerCase();  

  if (/panic|anxious|anxiety|calm me|relax|stress|overwhelmed/.test(lower)) {
    return "calm";
  }

  if (/why do i|overthink|confused|thinking a lot|reflect/.test(lower)) {
    return "reflect";
  }

  if (/angry|hate|frustrated|annoyed|mad|vent/.test(lower)) {
    return "vent";
  }

  return "reflect";
}

function isGameRequest(text) {
  return /play a game|let'?s play|game please|play with me/.test(
    text.toLowerCase()
  );
}

function startChatGame() {
  return `🎮 **Game Time!**
I'm thinking of a number between **1 and 10** 🤫  
What’s your guess?`;
}

/* ---------- Routes ---------- */

export async function GET() {
  return Response.json({
    message: "Chat API is working. Use POST to send messages.",
    status: "ready",
  });
}

export async function POST(request) {
  let requestBody;
  
  try {
    requestBody = await request.json();
    const { message, mode } = requestBody;

    console.log('Received message:', message, 'Mode:', mode);

    // 1️⃣ Crisis detection (highest priority)
    const crisisDetection = detectCrisis(message);

    if (crisisDetection.isCrisis) {
      return Response.json({
        reply: getCrisisResponse(),
        message: getCrisisResponse(),
        status: "crisis_detected",
        isCrisisContent: true,
        severity: crisisDetection.severity,
      });
    }

    // 2️⃣ Game detection (no therapy during games)
    if (isGameRequest(message)) {
      return Response.json({
        reply: startChatGame(),
        message: startChatGame(),
        mode: "game",
        status: "game_started",
      });
    }

    // 3️⃣ Emotion-based mode detection
    const activeMode = mode || detectEmotionMode(message);

    // 4️⃣ System prompts
    const systemPrompts = {
      vent: `You are a sweet, caring friend. Respond with 1-2 short sentences, validate feelings, use emojis.`,
      reflect: `You are a supportive mental health AI. Ask gentle questions in 3-4 lines max. Include a breathing tip.`,
      calm: `You are a soothing AI. Use peaceful language and provide relaxation exercises.`,
    };

    const systemPrompt = systemPrompts[activeMode];
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;

    console.log('Using prompt:', fullPrompt);

    // If no API key available, immediately fallback to a local mock
    if (!process.env.GEMINI_API_KEY) {
      const responseText = mockAIResponse(message, activeMode);
      return Response.json({
        reply: responseText,
        message: responseText,
        mode: activeMode,
        status: "mock_fallback",
      });
    }

    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    try {
      const result = await model.generateContent(fullPrompt);
      const responseText = result.response.text();
      console.log('AI Response:', responseText);

      return Response.json({
        reply: responseText,
        message: responseText,
        mode: activeMode,
        status: "success",
      });
    } catch (apiErr) {
      // Detect leaked / revoked API key errors and fallback to local mock
      const msg = apiErr?.message || '';
      console.error('Generative API error:', msg);

      if (apiErr?.status === 403 || /leaked|revoked|forbidden/i.test(msg)) {
        const responseText = mockAIResponse(message, activeMode);
        return Response.json({
          reply: responseText,
          message: responseText,
          mode: activeMode,
          status: "mock_fallback",
        });
      }

      // Re-throw other errors to be handled by outer catch
      throw apiErr;
    }
  } catch (error) {
    console.error("API Error:", error);
    
    // Use the stored request body for mode
    const mode = requestBody?.mode || 'reflect';
    
    // Fallback responses based on mode
    const fallbackResponses = {
      vent: "I hear you and I'm here for you. 💙 Your feelings are valid.",
      reflect: "Take a deep breath with me. What's one thing you're grateful for right now?",
      calm: "Let's breathe together. Inhale for 4... hold for 4... exhale for 4. You're safe."
    };
    
    const fallbackMessage = fallbackResponses[mode] || fallbackResponses.reflect;
    
    return Response.json({ 
      reply: fallbackMessage,
      message: fallbackMessage,
      mode: mode,
      status: "fallback"
    });
  }
}