/**
 * Content Validator Service
 * Detects and filters sensitive topics to protect users
 */

// Sensitive keywords and phrases that require caution
const SENSITIVE_KEYWORDS = {
  suicide: [
    'suicide', 'kill myself', 'end it all', 'don\'t want to live',
    'want to die', 'hurt myself', 'harm myself', 'end my life'
  ],
  selfHarm: [
    'cut myself', 'self harm', 'self-harm', 'hurt myself', 'injure myself',
    'bleeding', 'burn myself', 'overdose', 'pills'
  ],
  abuse: [
    'abuse', 'abused', 'beating', 'hitting me', 'hurt me', 'assault',
    'rape', 'molest', 'sexual assault', 'domestic violence'
  ],
  eatingDisorders: [
    'anorexia', 'bulimia', 'binge eat', 'eating disorder', 'starving',
    'purge', 'laxatives', 'not eating'
  ],
  violence: [
    'kill', 'murder', 'violence', 'violent', 'stab', 'shoot',
    'bomb', 'attack someone', 'hurt others'
  ],
  addiction: [
    'heroin', 'cocaine', 'meth', 'drugs', 'addiction', 'overdose',
    'high', 'dealer'
  ]
};

// Combine all keywords for easy searching
const ALL_SENSITIVE_KEYWORDS = Object.values(SENSITIVE_KEYWORDS).flat();

/**
 * Check if message contains sensitive content
 * @param {string} message - User message to check
 * @returns {object} {isSensitive: boolean, category: string, keywords: array}
 */
export function detectSensitiveContent(message) {
  if (!message || typeof message !== 'string') {
    return { isSensitive: false, category: null, keywords: [] };
  }

  const lowerMessage = message.toLowerCase();
  const foundKeywords = [];

  // Check for sensitive keywords
  for (const keyword of ALL_SENSITIVE_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }

  if (foundKeywords.length === 0) {
    return { isSensitive: false, category: null, keywords: [] };
  }

  // Determine category based on found keywords
  let category = 'other';
  for (const [cat, keywords] of Object.entries(SENSITIVE_KEYWORDS)) {
    if (foundKeywords.some(k => keywords.includes(k))) {
      category = cat;
      break;
    }
  }

  return {
    isSensitive: true,
    category,
    keywords: [...new Set(foundKeywords)]
  };
}

/**
 * Get warning message for sensitive content
 * @param {string} category - Category of sensitive content
 * @returns {string} Warning message to display to user
 */
export function getSensitiveContentWarning(category) {
  const warnings = {
    suicide: `⚠️ I notice you may be having thoughts of suicide. Please reach out for help:
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/`,
    
    selfHarm: `⚠️ I'm concerned about your safety. If you're thinking about harming yourself:
- Crisis Text Line: Text HOME to 741741
- National Hotline: 1-800-273-8255
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/`,
    
    abuse: `⚠️ I'm sorry you're experiencing this. Please reach out to someone who can help:
- National Domestic Violence Hotline: 1-800-799-7233
- RAINN (Sexual Assault): 1-800-656-4673
- Childhelp (Child Abuse): 1-800-422-4453`,
    
    eatingDisorders: `⚠️ If you're struggling with an eating disorder:
- NEDA Hotline: 1-800-931-2237
- Crisis Text Line: Text NEDA to 741741
- ANAD (Anorexia Nervosa and Associated Disorders): 1-888-375-7767`,
    
    violence: `⚠️ Violence is never the answer. Please seek help:
- Crisis Text Line: Text HOME to 741741
- National Hotline: 1-800-273-8255
- If in immediate danger, call 911`,
    
    addiction: `⚠️ Substance abuse support is available:
- SAMHSA National Helpline: 1-800-662-4357 (free, confidential, 24/7)
- Narcotics Anonymous: https://www.na.org/
- Local support groups: AA, NA, CA meetings`,
    
    other: `⚠️ I'm here to support you, but I notice you may be struggling with something serious. 
Please reach out to a mental health professional or crisis helpline for proper support.`
  };

  return warnings[category] || warnings.other;
}

/**
 * Check if content needs intervention (crisis level)
 * @param {string} message - Message to check
 * @returns {boolean} True if immediate crisis intervention needed
 */
export function requiresCrisisIntervention(message) {
  if (!message) return false;
  
  const lowerMessage = message.toLowerCase();
  
  // Critical phrases that need immediate intervention
  const criticalPhrases = [
    'kill myself', 'end my life', 'hurt myself right now',
    'plan to', 'going to', 'attempt tonight', 'attempt today'
  ];
  
  return criticalPhrases.some(phrase => lowerMessage.includes(phrase));
}

/**
 * Sanitize and filter message for safe response
 * @param {string} message - Original message
 * @returns {string} Filtered or modified message for API
 */
export function sanitizeMessage(message) {
  // For sensitive content, replace with safer alternatives for API
  let sanitized = message;
  
  // Don't send exact harmful language to AI, use placeholder
  if (detectSensitiveContent(message).isSensitive) {
    sanitized = message
      .replace(/suicide|kill myself|end my life/gi, '[sensitive content removed]')
      .replace(/hurt myself|self harm/gi, '[sensitive content removed]')
      .replace(/abuse|assault/gi, '[sensitive content removed]');
  }
  
  return sanitized;
}

/**
 * Validate entire message including length and content type
 * @param {string} message - Message to validate
 * @returns {object} {isValid: boolean, error: string}
 */
export function validateMessage(message) {
  // Check if message exists and is a string
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message must be text.' };
  }

  // Check length
  if (message.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty.' };
  }

  if (message.length > 2000) {
    return { isValid: false, error: 'Message is too long (max 2000 characters).' };
  }

  // All other validations pass
  return { isValid: true, error: null };
}
