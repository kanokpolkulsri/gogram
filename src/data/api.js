import { auth } from './firebase';

const BASE_URL = import.meta.env.VITE_API_URL || (
  window.location.hostname === 'localhost' 
    ? 'http://localhost:5001/api' 
    : 'https://gogram.techshabu.com/api' // Replace with your live Google Cloud Run URL later
);

/**
 * Helper to fetch with Firebase Auth ID Token automatically appended.
 * Supports mock UIDs in local development if Firebase is not active.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Get active ID token if logged into Firebase
  let idToken = null;
  if (auth.currentUser) {
    try {
      idToken = await auth.currentUser.getIdToken();
    } catch (e) {
      console.warn('Failed to retrieve Firebase ID Token:', e);
    }
  }

  // Fallback to mock token in local dev if no live Firebase user is authenticated
  if (!idToken && window.location.hostname === 'localhost') {
    // Check if there is an active local user profile loaded in userStore
    try {
      const stored = localStorage.getItem('gogram-user');
      if (stored) {
        const parsed = JSON.parse(stored);
        const activeUid = parsed.authProfile?.uid || parsed.uid || 'admin-1';
        idToken = `mock-${activeUid}`;
      } else {
        idToken = 'mock-admin-1';
      }
    } catch (e) {
      idToken = 'mock-admin-1';
    }
  }

  if (idToken) {
    headers['Authorization'] = `Bearer ${idToken}`;
  }

  const config = {
    ...options,
    headers
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' })
};
