'use client';

import { type AnchorHTMLAttributes, type ReactNode, useSyncExternalStore } from 'react';

// Kept in pieces and only assembled in the browser so the address never
// appears in server-rendered HTML, where most email harvesters scrape.
// Don't pass the address in as a prop: props from server components are
// serialized into the page's HTML payload.
const EMAIL_PARTS = ['bruce.ultra', 'behivetech.com'];

const subscribe = () => () => {};

type ProtectedEmailProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    /** Content rendered before the address, such as an icon */
    icon?: ReactNode;
    /** Show this label instead of the address */
    label?: string;
};

export default function ProtectedEmail({ icon, label, ...rest }: ProtectedEmailProps) {
    const isClient = useSyncExternalStore(subscribe, () => true, () => false);
    const email = isClient ? EMAIL_PARTS.join('@') : null;

    return (
        <a {...rest} href={email ? `mailto:${email}` : '#contact'}>
            {icon}
            {label ?? email ?? 'Email'}
        </a>
    );
}
