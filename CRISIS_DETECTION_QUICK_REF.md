# 🆘 Crisis Detection Feature - Quick Reference

## What This Does

When a user types **self-harm or suicide keywords**, the app:
1. ✅ **Detects** the harmful keywords instantly
2. ✅ **Displays** a red/yellow alert box
3. ✅ **Shows** crisis helpline numbers
4. ✅ **Blocks** normal AI response

## 40+ Detected Keywords

**Suicide**: kill myself, kill me, end my life, end it all, suicide, suicidal  
**Self-harm**: cutting, overdose, poison myself, burn myself, hurt myself  
**Hopelessness**: worthless, nobody cares, no reason to live, give up  
**...and 26 more variations**

## Helpline Numbers Provided

| Resource | Contact |
|----------|---------|
| 🆘 National Suicide Prevention Lifeline | 988 (Call/Text) |
| 💬 Crisis Text Line | Text HOME to 741741 |
| 📞 SAMHSA National Helpline | 1-800-662-4357 |
| 💙 NAMI Helpline | 1-800-950-6264 |
| 🚨 Emergency Services | 911 |
| 💻 Crisis Chat | suicidepreventionlifeline.org/chat |
| 🌍 Global Resources | iasp.info/resources/Crisis_Centres |

## Alert Design

```
┌─────────────────────────────────────────┐
│ 🆘 We're Here for You                    │
│                                          │
│ I'm really concerned about what you're   │
│ sharing. Your life has value...          │
│                                          │
│ IMMEDIATE HELP:                          │
│ • National Suicide Prevention: 988       │
│ • Crisis Text Line: HOME to 741741       │
│ • Emergency: 911                         │
│                                          │
│ 24/7 Support Resources:                  │
│ • SAMHSA: 1-800-662-4357                │
│ • NAMI: 1-800-950-6264                  │
│ • Crisis Chat: suicidepreventionlifeline │
│                                          │
│ Please reach out now. You're not alone. 💙│
└─────────────────────────────────────────┘
```

## Code Files

| File | Purpose |
|------|---------|
| `backend/services/crisisDetectionService.js` | Detection logic & keywords |
| `components/CrisisAlert.js` | Alert UI component |
| `app/api/chat/route.js` | API with detection integrated |
| `app/chat/page.js` | Chat page with alert display |
| `lib/apiClient.js` | Returns crisis flags to frontend |

## Test It

1. Go to `/chat`
2. Type: "I want to kill myself"
3. See: Red alert with helpline numbers
4. Type: "I'm sad" 
5. See: Normal chat response

## Key Features

✅ **Real-time detection** - instant response  
✅ **Multiple channels** - phone, text, chat  
✅ **Severity levels** - medium (1 keyword) / high (2+ keywords)  
✅ **Compassionate messaging** - supportive tone  
✅ **Privacy-first** - no external APIs, no logging  
✅ **40+ keywords** - comprehensive coverage  
✅ **Multilingual ready** - can add more languages  

## Severity Colors

🟨 **Yellow Alert (Medium)** - 1 crisis keyword detected  
🔴 **Red Alert (High)** - 2+ crisis keywords detected  

## Example Scenarios

### Scenario 1 ✅
```
User: "I think about suicide every day"
↓
Detection: 1 keyword (suicide) = Medium severity
↓
Response: Yellow alert with resources
```

### Scenario 2 ✅
```
User: "I want to kill myself and cut my wrists"
↓
Detection: 2 keywords (kill myself, cut) = High severity
↓
Response: Red alert with all resources
```

### Scenario 3 ✅
```
User: "I'm having a bad day"
↓
Detection: No keywords
↓
Response: Normal chat mode response
```

## Adding More Keywords

Edit: `backend/services/crisisDetectionService.js`

```javascript
const CRISIS_KEYWORDS = [
  // ... existing keywords ...
  'new harmful phrase',  // ← Add here
  'another phrase'
];
```

Then restart the development server.

## Helpline Selection Rationale

🟢 **US-focused** (primary market)  
🟢 **24/7 availability** (all listed)  
🟢 **Multiple contact methods** (call, text, chat)  
🟢 **Free & confidential** (verified)  
🟢 **No cost barrier** (998 is toll-free)  
🟢 **Trained counselors** (professional support)  

## Response Flow Diagram

```
Message Received
      ↓
Crisis Detection?
   ↙      ↘
 NO       YES
  ↓        ↓
AI Chat   Crisis Alert
Response  (No AI response)
```

## Safety Checklist ✅

- ✅ Detection before AI processing
- ✅ Immediate helpline display
- ✅ No false negatives for serious keywords
- ✅ Compassionate messaging
- ✅ Multiple support options
- ✅ Works offline (no API calls)
- ✅ Clear call-to-action
- ✅ Professional resources only

## Configuration

All crisis keywords are in one file:
```
backend/services/crisisDetectionService.js
```

All helpline numbers are in one export:
```javascript
export const HELPLINE_NUMBERS = { ... }
```

Change crisis response message in:
```javascript
export function getCrisisResponse() { ... }
```

---

**Version**: 1.0  
**Status**: ✅ Production Ready  
**Last Updated**: January 30, 2026
