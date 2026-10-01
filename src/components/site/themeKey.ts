// Kept in a plain module (no 'use client') so the server layout can inline it
// into the pre-paint script. Importing from a client module there would give a
// client-reference stub instead of the string.
export const THEME_STORAGE_KEY = 'theme';
