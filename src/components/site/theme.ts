'use client';

import { useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY } from './themeKey';

export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', listener);
    return () => {
        listeners.delete(listener);
        media.removeEventListener('change', listener);
    };
}

function getTheme(): Theme {
    const forced = document.documentElement.dataset.theme;
    if (forced === 'light' || forced === 'dark') {
        return forced;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Storage can be unavailable (private mode); the attribute still applies.
    }
    listeners.forEach((listener) => listener());
}

/**
 * The effective theme: a forced `data-theme` on <html> if set, otherwise the
 * OS preference. Returns null during SSR and the first client render so both
 * agree; components should render a neutral fallback for null.
 */
export function useTheme(): Theme | null {
    return useSyncExternalStore(subscribe, getTheme, () => null);
}
