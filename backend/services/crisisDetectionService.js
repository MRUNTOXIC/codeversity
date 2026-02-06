/**
 * Crisis Detection Service
 * Detects self-harm, suicide, and mental health crisis keywords
 */

export const HELPLINE_NUMBERS = {
  US: {
    "National Suicide Prevention Lifeline": "988",
    "Crisis Text Line": "Text HOME to 741741",
    "SAMHSA National Helpline": "1-800-662-4357",
    "NAMI Helpline": "1-800-950-6264",
    "Emergency Services": "911"
  },
  INTERNATIONAL: {
    "International Association for Suicide Prevention": "https://www.iasp.info/resources/Crisis_Centres/",
    "Crisis Chat (US)": "suicidepreventionlifeline.org/chat",
    "Crisis Now": "Text or Call 741741"
  }
};

// Comprehensive crisis keywords
const CRISIS_KEYWORDS = [
  // Suicide-related keywords
  'suicide', 'suicidal', 'kill myself', 'kill me', 'end my life', 'end it all',
  'want to die', 'wish i was dead', 'rather be dead', 'hurt myself',
  'self harm', 'self-harm', 'cutting', 'overdose', 'jump off', 'hang myself',
  'hang me', 'slit my', 'slice my', 'cut myself', 'cut me',
  'poisoned', 'poison myself', 'drown myself', 'jump in front',
  // Additional self-harm indicators
  'no reason to live', 'better off dead', 'everyone would be better',
  'done with life', 'can\'t take it anymore', 'too much pain',
  // Hopelessness indicators
  'hopeless', 'worthless', 'pointless', 'nobody cares', 'give up',
  'nobody loves me', 'completely alone',
  // Additional indicators
  'i hate myself', 'hate my life', 'tired of living', 'end this',
  'destroy myself', 'stab myself', 'burn myself'
];

/**
 * Detect crisis content in user message
 * @param {string} message - User's message
 * @returns {Object} Detection result with isCrisis flag and severity
 */
export function detectCrisis(message) {
  if (!message || typeof message !== 'string') {
    return { isCrisis: false, severity: 'none', matchedKeywords: [] };
  }

  const lowerMessage = message.toLowerCase();
  const matchedKeywords = CRISIS_KEYWORDS.filter(keyword => 
    lowerMessage.includes(keyword)
  );

  const hasCrisis = matchedKeywords.length > 0;
  
  // Determine severity based on number of matched keywords
  let severity = 'none';
  if (hasCrisis) {
    severity = matchedKeywords.length >= 2 ? 'high' : 'medium';
  }

  return {
    isCrisis: hasCrisis,
    severity,
    matchedKeywords,
    message: hasCrisis ? getCrisisResponse() : null
  };
}

/**
 * Get crisis response message with helpline numbers
 * @returns {string} Formatted crisis response
 */
export function getCrisisResponse() {
  return `I'm really concerned about what you're sharing. Your life has value and you deserve support from trained professionals right now.

🆘 **IMMEDIATE HELP:**
• **National Suicide Prevention Lifeline**: 988 (Call or Text 24/7)
• **Crisis Text Line**: Text HOME to 741741
• **Emergency Services**: 911

💙 **24/7 Support Resources:**
• **SAMHSA National Helpline**: 1-800-662-4357 (Free & Confidential)
• **Crisis Chat**: suicidepreventionlifeline.org/chat
• **NAMI Helpline**: 1-800-950-6264
• **Crisis Now**: Text or Call 741741
• **International**: https://www.iasp.info/resources/Crisis_Centres/

Please reach out to one of these resources right now. You don't have to go through this alone. People care about you, and help is available. 💙`;
}

/**
 * Get all crisis keywords
 * @returns {Array} Array of crisis keywords
 */
export function getCrisisKeywords() {
  return [...CRISIS_KEYWORDS];
}
