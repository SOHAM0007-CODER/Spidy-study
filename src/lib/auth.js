// Demo-only fake authentication module.
// Holds no real security, just writes a flag to localStorage to simulate auth state.

const AUTH_KEY = 'adaptlearn-auth';

export function isAuthed() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function signIn(name) {
  const displayName = name && name.trim() ? name.trim() : 'Hero';
  localStorage.setItem(AUTH_KEY, displayName);
}

export function signOut() {
  localStorage.removeItem(AUTH_KEY);
}
