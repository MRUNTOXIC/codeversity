export function getSessionId() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'server-' + Math.random().toString(36).substring(2);
  }
  
  // Check if sessionStorage is available
  if (typeof sessionStorage === 'undefined') {
    return 'fallback-' + Math.random().toString(36).substring(2);
  }
  
  try {
    let id = sessionStorage.getItem("session_id");
    if (!id) {
      id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem("session_id", id);
    }
    return id;
  } catch (error) {
    // Fallback if sessionStorage fails (private browsing, etc.)
    return 'error-' + Math.random().toString(36).substring(2);
  }
}