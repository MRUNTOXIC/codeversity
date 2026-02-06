const API_KEY = "AIzaSyAsMYlSCugPztwxCx5EYXIu8khmW6xzPXg";

async function checkAPIKey() {
  try {
    console.log("Checking API key validity...");
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.log("❌ API Key Error:");
      console.log("Status:", response.status);
      console.log("Response:", JSON.stringify(data, null, 2));
      return;
    }
    
    console.log("✅ API Key is valid!");
    console.log("Available models:");
    
    if (data.models && data.models.length > 0) {
      data.models.forEach(model => {
        console.log(`- ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`  Methods: ${model.supportedGenerationMethods.join(", ")}`);
        }
      });
    } else {
      console.log("No models found in response");
    }
    
  } catch (error) {
    console.log("❌ Network Error:");
    console.log(error.message);
  }
}

checkAPIKey();