import { type ReactNode } from 'react';
import { getClassName } from '@behivetech/get-class-name';

import styles from './Section.module.scss';

type SectionProps = {
    id: string;
    eyebrow: string;
    title: string;
    className?: string;
    children: ReactNode;
};

export default function Section({ id, eyebrow, title, className, children }: SectionProps) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'section',
        styles,
    });

    return (
        <section id={id} aria-labelledby={`${id}-title`} className={rootClassName}>
            <div className={getChildClass('inner')}>
                <p className={getChildClass('eyebrow')}>{eyebrow}</p>
                <h2 id={`${id}-title`} className={getChildClass('title')}>
                    {title}
                </h2>
                {children}
            </div>
        </section>
    );
}
