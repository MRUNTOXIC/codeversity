const API_KEY = "AIzaSyAsMYlSCugPztwxCx5EYXIu8khmW6xzPXg";

async function testGeminiREST() {
  try {
    console.log("Testing Gemini REST API...");
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Hello, can you respond with a simple greeting?"
          }]
        }]
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log("❌ Error:");
      console.log("Status:", response.status);
      console.log("Response:", JSON.stringify(data, null, 2));
      return;
    }
    
    console.log("✅ Success!");
    console.log("Response:", data.candidates[0].content.parts[0].text);
    
  } catch (error) {
    console.log("❌ Network Error:");
    console.log(error.message);
  }
}

testGeminiREST();