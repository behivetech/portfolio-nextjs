'use client';

import { getClassName } from '@behivetech/get-class-name';

import { MoonIcon, SunIcon } from './Icons';
import { setTheme, useTheme, type Theme } from './theme';

import styles from './ThemeToggle.module.scss';

/**
 * Light/dark switch. The galaxy tokens follow the OS by default; this sets
 * `data-theme` on <html> to force one and remembers the choice. The inline
 * script in layout.tsx re-applies it before first paint.
 */
export default function ThemeToggle({ className }: { className?: string }) {
    const theme = useTheme();
    const [rootClassName] = getClassName({ className, rootClass: 'theme-toggle', styles });

    if (theme === null) {
        return <span className={rootClassName} aria-hidden="true" />;
    }

    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            className={rootClassName}
            onClick={() => setTheme(next)}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
        >
            {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>
    );
}
