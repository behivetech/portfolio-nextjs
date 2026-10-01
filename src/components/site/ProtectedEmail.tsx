'use client';

import { type ButtonHTMLAttributes, type ReactNode, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

/**
 * The address never appears in server-rendered HTML, and it is stored here
 * reversed with a letter shift so a plain-text search of the JS bundle does
 * not find it either. By default it is only decoded when a person clicks,
 * which also defeats scrapers that execute JavaScript but never interact.
 *
 * To change the address: run the decode() below in reverse (reverse the
 * string, shift letters by 13) and paste the result here.
 */
const ENCODED = 'zbp.uprgrivuro@negyh.rpheo';

function decode(value: string): string {
    return value
        .split('')
        .map((char) => {
            const code = char.charCodeAt(0);
            if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + 13) % 26) + 97);
            if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + 13) % 26) + 65);
            return char;
        })
        .reverse()
        .join('');
}

type ProtectedEmailProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> & {
    /** Content rendered before the label, such as an icon */
    icon?: ReactNode;
    /** Text shown before the address is revealed; empty string for icon-only */
    label?: string;
    /**
     * The address is always click-to-reveal. With `revealOnPrint`, it is also
     * decoded the moment the browser starts printing, so a printed or
     * saved-as-PDF resume includes it without it ever sitting in the DOM.
     */
    revealOnPrint?: boolean;
};

export default function ProtectedEmail({ icon, label = 'Show email', revealOnPrint = false, className, ...rest }: ProtectedEmailProps) {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (!revealOnPrint) return;
        // flushSync so React commits the address before the print snapshot.
        const onBeforePrint = () => flushSync(() => setEmail(decode(ENCODED)));
        window.addEventListener('beforeprint', onBeforePrint);
        return () => window.removeEventListener('beforeprint', onBeforePrint);
    }, [revealOnPrint]);

    if (email) {
        return (
            <a className={className} href={`mailto:${email}`}>
                {icon}
                {label === '' ? null : email}
            </a>
        );
    }

    const iconOnly = label === '';

    return (
        <button
            {...rest}
            type="button"
            className={className}
            onClick={() => {
                const address = decode(ENCODED);
                if (iconOnly) {
                    // Nothing to reveal visually; open the mail client directly.
                    window.location.href = `mailto:${address}`;
                } else {
                    setEmail(address);
                }
            }}
        >
            {icon}
            {iconOnly ? null : label}
        </button>
    );
}
