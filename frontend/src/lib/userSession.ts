/**
 * User Session Management
 * Handles user identification and session persistence
 */

const USER_ID_KEY = 'healthvoice_user_id';
const USER_NAME_KEY = 'healthvoice_user_name';

/**
 * Get or create a user ID
 * Uses localStorage to persist user identity
 */
export function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    // Generate a new user ID
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
}

/**
 * Get user name if set
 */
export function getUserName(): string | null {
  return localStorage.getItem(USER_NAME_KEY);
}

/**
 * Set user name
 */
export function setUserName(name: string): void {
  localStorage.setItem(USER_NAME_KEY, name);
}

/**
 * Clear user session (logout)
 */
export function clearUserSession(): void {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return localStorage.getItem(USER_ID_KEY) !== null;
}

