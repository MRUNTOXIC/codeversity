const API_KEY = "AIzaSyAsMYlSCugPztwxCx5EYXIu8khmW6xzPXg";

const models = [
  "gemini-pro",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.0-pro",
  "text-bison-001"
];

async function testModel(modelName) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Hello"
          }]
        }]
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${modelName} works!`);
      console.log("Response:", data.candidates[0].content.parts[0].text);
      return true;
    } else {
      console.log(`❌ ${modelName} failed: ${response.status}`);
      return false;
    }
    
  } catch (error) {
    console.log(`❌ ${modelName} error:`, error.message);
    return false;
  }
}

async function findWorkingModel() {
  console.log("Testing different model names...\n");
  
  for (const model of models) {
    const works = await testModel(model);
    if (works) {
      console.log(`\n🎉 Found working model: ${model}`);
      break;
    }
    console.log("");
  }
}

findWorkingModel();