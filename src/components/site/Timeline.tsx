import { getClassName } from '@behivetech/get-class-name';

import type { Experience } from '@/content/profile';

import styles from './Timeline.module.scss';

type TimelineProps = {
    items: readonly Experience[];
};

export default function Timeline({ items }: TimelineProps) {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'timeline',
        styles,
    });

    return (
        <ol className={rootClassName}>
            {items.map(({ company, formerly, title, start, end, highlights }) => (
                <li key={`${company}-${start}`} className={getChildClass('item')}>
                    <div className={getChildClass('meta')}>
                        <time>{start}</time> – <time>{end}</time>
                    </div>
                    <div className={getChildClass('body')}>
                        <h3 className={getChildClass('role')}>{title}</h3>
                        <p className={getChildClass('company')}>
                            {company}
                            {formerly && <span> (formerly {formerly})</span>}
                        </p>
                        <ul className={getChildClass('highlights')}>
                            {highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                </li>
            ))}
        </ol>
    );
}
