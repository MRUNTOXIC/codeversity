/**
 * Image Analysis Service
 * Analyzes images and provides emotionally-focused support responses
 * instead of practical problem-solving advice
 */

// Image scenarios and emotional support responses
const IMAGE_SCENARIOS = {
  // Damage/broken items
  broken_glass: {
    keywords: ["glass", "broken", "shattered", "crack"],
    response: `I see something precious has been broken. That can feel really upsetting and frustrating, and those feelings are completely valid. 💔

Sometimes when things break, it feels like a reflection of something deeper. Whatever you're going through, know that:
- Your worth isn't defined by broken objects
- These moments of loss are temporary
- You're strong enough to handle this

Take a moment to breathe. Is there something specific about this situation that's weighing on you emotionally?`
  },

  broken_item: {
    keywords: ["broken", "damaged", "destroyed", "ruined"],
    response: `I can see something has been damaged, and that's tough. 💙 It's okay to feel disappointed or upset about losing something.

Remember:
- Your feelings about this are valid and important
- Objects can be replaced, but your wellbeing is what matters most
- This difficult moment will pass

What matters now is how you're feeling. Do you want to talk about what this means to you emotionally?`
  },

  // Mess/disorganization
  messy_space: {
    keywords: ["mess", "dirty", "cluttered", "disorganized"],
    response: `A cluttered or messy space can sometimes reflect how we're feeling inside - overwhelmed, stressed, or just exhausted. 🤝

This is okay. It doesn't mean anything is wrong with you:
- Your home reflects your mental state, and that's normal
- Taking one small step at a time is enough
- Being gentle with yourself is more important than perfection
- You deserve rest and self-compassion

How are you feeling right now? Sometimes addressing the inner feelings helps the external follow.`
  },

  // Weather/storms
  stormy_weather: {
    keywords: ["storm", "rain", "lightning", "dark", "weather"],
    response: `Storms and dark weather can feel overwhelming, and it's natural to feel affected by them. 🌧️ Many people feel their emotions more intensely when the weather is gloomy.

Remember:
- You're not alone in feeling this way
- Bad weather passes, just like difficult emotions do
- It's okay to feel reflective or sad during these times
- Your feelings are valid and deserve acknowledgment

How is the weather affecting your mood today? Sometimes just naming it helps.`
  },

  // Sad/emotional expressions
  sadness: {
    keywords: ["sad", "cry", "tear", "upset", "hurt", "pain"],
    response: `I can sense there's pain here, and I want you to know that your sadness is valid and important. 💙

Crying and feeling deeply is a sign of your humanity:
- Emotions need to flow, not be held in
- Your sadness doesn't make you weak
- You deserve compassion, especially from yourself
- These feelings won't last forever, even though it may feel that way now

What do you need right now? Sometimes just being heard makes a difference.`
  },

  // Nature/peaceful scenes
  peaceful_nature: {
    keywords: ["nature", "tree", "flower", "water", "sunset", "sunrise", "forest", "beach"],
    response: `What a beautiful reminder of nature's peace and healing energy. 🌿 Taking a moment to appreciate these things can be so grounding.

Nature has a way of reminding us:
- That change is natural and necessary
- That there is beauty even in difficult times
- To slow down and breathe
- That we're part of something bigger

Spending time with nature, even through a photo, can be incredibly soothing. How does this make you feel right now?`
  },

  // Workspace/personal items
  workspace: {
    keywords: ["desk", "work", "computer", "office", "workspace"],
    response: `Your workspace is where you create and work on things that matter to you. 💼

If things feel chaotic or demanding:
- It's okay to feel stressed about work
- You're doing the best you can
- Your value isn't measured by productivity
- You deserve breaks and rest

If things feel peaceful:
- You deserve to celebrate small wins
- Creating a supportive environment for yourself is important
- You're taking care of yourself, and that's beautiful

How are you feeling about the work and demands right now?`
  },

  // General/fallback
  general: {
    response: `I can see something in this image that matters to you. 🤝

Whatever is happening in this moment:
- Your feelings about it are valid and important
- You don't need to have it all figured out right now
- It's okay to feel whatever you're feeling
- You deserve support and understanding

What do you want me to know about what you're experiencing right now?`
  }
};

/**
 * Analyze image context and return emotional support response
 * @param {string} base64Image - Base64 encoded image
 * @param {string} userDescription - User's description of the image
 * @returns {string} Emotional support response
 */
export async function analyzeImageForSupport(base64Image, userDescription = "") {
  try {
    // Analyze based on user's description first
    if (userDescription && userDescription.trim().length > 0) {
      const description = userDescription.toLowerCase();
      
      // Find matching scenario
      for (const [key, scenario] of Object.entries(IMAGE_SCENARIOS)) {
        if (key !== "general" && scenario.keywords) {
          if (scenario.keywords.some(keyword => description.includes(keyword))) {
            return scenario.response;
          }
        }
      }
    }

    // Try to detect from visual features (simple heuristics)
    // In a real app, this would use vision API like Google Vision or Claude Vision
    const detectedScenario = await detectImageContent(base64Image);
    
    if (detectedScenario && IMAGE_SCENARIOS[detectedScenario]) {
      return IMAGE_SCENARIOS[detectedScenario].response;
    }

    // Fallback to general emotional support
    return IMAGE_SCENARIOS.general.response;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return IMAGE_SCENARIOS.general.response;
  }
}

/**
 * Simple image content detection using canvas analysis
 * More sophisticated detection would use a real vision API
 * @param {string} base64Image - Base64 encoded image
 * @returns {string} Detected scenario key
 */
async function detectImageContent(base64Image) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Analyze color distribution and brightness
        let brightness = 0;
        let colorVariance = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const avg = (r + g + b) / 3;
          brightness += avg;
        }

        brightness = brightness / (data.length / 4);

        // Heuristic-based detection
        if (brightness < 100) {
          resolve("stormy_weather"); // Dark image likely storm/sad
        } else if (brightness > 180) {
          resolve("peaceful_nature"); // Bright image likely nature/peaceful
        } else {
          resolve("general"); // Medium brightness - use general response
        }
      };

      img.onerror = () => {
        resolve("general");
      };

      img.src = base64Image;
    } catch (error) {
      console.error("Error in image detection:", error);
      resolve("general");
    }
  });
}

/**
 * Get all available emotion support responses for reference
 * @returns {object} All scenarios and responses
 */
export function getEmotionalSupportScenarios() {
  return IMAGE_SCENARIOS;
}

/**
 * Validate image file before upload
 * @param {File} file - Image file to validate
 * @returns {object} {isValid: boolean, error: string}
 */
export function validateImageFile(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: "Please upload a JPEG, PNG, WebP, or GIF image" 
    };
  }

  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: "Image must be less than 5MB" 
    };
  }

  return { isValid: true, error: null };
}

/**
 * Convert image file to base64
 * @param {File} file - Image file to convert
 * @returns {Promise<string>} Base64 encoded image
 */
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
