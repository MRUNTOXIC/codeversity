const sessionStore = new Map();

export function getSession(sessionId) {
  return sessionStore.get(sessionId);
}

export function setSession(sessionId, data) {
  sessionStore.set(sessionId, {
    ...data,
    lastActive: Date.now(),
  });
}

export function clearSession(sessionId) {
  sessionStore.delete(sessionId);
}

// Auto cleanup inactive sessions every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, data] of sessionStore.entries()) {
    if (now - data.lastActive > 10 * 60 * 1000) {
      sessionStore.delete(id);
    }
  }
}, 10 * 60 * 1000);