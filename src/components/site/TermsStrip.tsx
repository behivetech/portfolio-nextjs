import { getClassName } from '@behivetech/get-class-name';

import { site } from '@/content/site';
import MaterialIcon from './MaterialIcon';

import styles from './TermsStrip.module.scss';

/** How engagements are structured: length, directness, contract type. */
export default function TermsStrip() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'terms-strip',
        styles,
    });

    return (
        <section className={rootClassName} aria-labelledby="terms-strip-title">
            <div className={getChildClass('inner')}>
                <h2 id="terms-strip-title" className={getChildClass('title')}>
                    Terms that fit the work
                </h2>
                <ul className={getChildClass('list')}>
                    {site.terms.map(({ icon, title, body }) => (
                        <li key={title} className={getChildClass('item')}>
                            <MaterialIcon name={icon} className={getChildClass('icon')} />
                            <div>
                                <h3 className={getChildClass('item-title')}>{title}</h3>
                                <p className={getChildClass('item-body')}>{body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
