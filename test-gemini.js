const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyAsMYlSCugPztwxCx5EYXIu8khmW6xzPXg";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  try {
    console.log("Testing Gemini API...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Hello, can you respond with a simple greeting?";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Success!");
    console.log("Response:", text);
    
  } catch (error) {
    console.log("❌ Error:");
    console.log("Message:", error.message);
    console.log("Full error:", error);
  }
}

testGemini();