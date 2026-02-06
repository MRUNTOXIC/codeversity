const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyAsMYlSCugPztwxCx5EYXIu8khmW6xzPXg";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    console.log("Listing available models...");
    
    const models = await genAI.listModels();
    
    console.log("Available models:");
    models.forEach(model => {
      console.log(`- ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(", ") || "None"}`);
      console.log("");
    });
    
  } catch (error) {
    console.log("❌ Error listing models:");
    console.log("Message:", error.message);
  }
}

listModels();