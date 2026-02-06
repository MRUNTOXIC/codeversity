import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message, mode } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    
    return Response.json({ 
      message: response.text(),
      mode 
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

/**/