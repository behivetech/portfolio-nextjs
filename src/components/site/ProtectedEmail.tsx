'use client';

import { type ButtonHTMLAttributes, type ReactNode, useState, useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

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
     * 'click' (default): show a button; the address is decoded and shown when
     * clicked. 'mount': decode as soon as the component is on screen, for the
     * printable resume.
     */
    reveal?: 'click' | 'mount';
};

export default function ProtectedEmail({ icon, label = 'Show email', reveal = 'click', className, ...rest }: ProtectedEmailProps) {
    const [clicked, setEmail] = useState<string | null>(null);
    // False during SSR and the first client render, true once hydrated; the
    // server never sees the address.
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
    const email = clicked ?? (reveal === 'mount' && mounted ? decode(ENCODED) : null);

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
