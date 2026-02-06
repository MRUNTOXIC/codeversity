# Crisis Detection Feature

## Overview
This mental wellness app includes a **Crisis Detection System** that automatically identifies when users are expressing suicidal or self-harm thoughts and immediately provides them with emergency helpline numbers.

## How It Works

### 1. **Detection**
When a user types a message, the system scans for 40+ keywords related to:
- Suicide ideation ("kill myself", "end my life", "suicide")
- Self-harm ("cutting", "overdose", "self harm")
- Hopelessness ("worthless", "no reason to live", "everyone would be better")

### 2. **Response**
When crisis keywords are detected:
- ✅ An immediate **crisis alert** is displayed
- ✅ **Severity level** is determined (medium/high)
- ✅ **Helpline numbers** and resources are provided
- ✅ The AI does NOT respond normally - only the crisis resources are shown

### 3. **Available Resources**

#### Immediate Help
- **National Suicide Prevention Lifeline**: 988 (Call or Text 24/7)
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

#### 24/7 Support
- **SAMHSA National Helpline**: 1-800-662-4357 (Free & Confidential)
- **NAMI Helpline**: 1-800-950-6264
- **Crisis Chat**: suicidepreventionlifeline.org/chat
- **Crisis Now**: Text or Call 741741

#### International
- **IASP Crisis Centres**: https://www.iasp.info/resources/Crisis_Centres/

## Files Involved

### Backend
- **[backend/services/crisisDetectionService.js](backend/services/crisisDetectionService.js)**
  - Contains detection logic
  - Manages keywords list
  - Formats crisis response

### API Route
- **[app/api/chat/route.js](app/api/chat/route.js)**
  - Uses crisis detection service
  - Returns crisis status and severity

### Frontend Components
- **[components/CrisisAlert.js](components/CrisisAlert.js)**
  - Displays crisis alert with prominent styling
  - Shows helpline numbers

- **[app/chat/page.js](app/chat/page.js)**
  - Integrates CrisisAlert component
  - Manages crisis state

- **[lib/apiClient.js](lib/apiClient.js)**
  - Passes crisis detection data from API to UI

## Detection Keywords

The system detects 40+ keywords across these categories:

```javascript
// Suicide-related
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
```

## Crisis Alert Styling

The crisis alert is displayed with:
- 🆘 Warning icon
- Red/Yellow background (high/medium severity)
- Bold messaging
- Prominent helpline information
- Appears above chat messages

## Severity Levels

- **None**: No crisis keywords detected
- **Medium**: 1 crisis keyword detected
- **High**: 2+ crisis keywords detected

## Example Scenarios

### Scenario 1: Simple Crisis Keyword
User: "I think I want to kill myself"
→ **Detection**: Crisis detected (severity: medium)
→ **Response**: Immediate helpline numbers displayed

### Scenario 2: Multiple Keywords
User: "I'm worthless and I want to hang myself"
→ **Detection**: Crisis detected (severity: high)
→ **Response**: Immediate helpline numbers with prominent styling

### Scenario 3: No Crisis Content
User: "I'm feeling sad about my breakup"
→ **Detection**: No crisis keywords
→ **Response**: Normal AI response from the chat mode

## Best Practices

✅ Always run crisis detection before any other AI processing
✅ Provide multiple helpline options (phone, text, chat)
✅ Include emergency services numbers (911)
✅ Display crisis messages prominently
✅ Never ask users to elaborate when crisis detected
✅ Keep the message compassionate and supportive

## Adding New Keywords

To add more crisis keywords:

1. Edit [backend/services/crisisDetectionService.js](backend/services/crisisDetectionService.js)
2. Add keywords to the `CRISIS_KEYWORDS` array
3. Restart the development server

```javascript
const CRISIS_KEYWORDS = [
  // ... existing keywords ...
  'new keyword here',
  'another keyword'
];
```

## Testing

To test crisis detection:

1. Go to the chat page
2. Type a message with any crisis keyword (e.g., "I want to kill myself")
3. The crisis alert should appear immediately
4. Verify helpline numbers are displayed

## Privacy & Safety Notes

- ✅ Crisis detection is done locally (no external API calls)
- ✅ Messages are not logged or stored for crisis detection
- ✅ Crisis detection happens before AI processing
- ✅ All helplines are real, verified resources
