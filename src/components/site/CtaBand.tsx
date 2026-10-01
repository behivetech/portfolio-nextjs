import Link from 'next/link';
import { Button } from '@behivetech/atoms.button';
import { getClassName } from '@behivetech/get-class-name';

import { site } from '@/content/site';

import styles from './CtaBand.module.scss';

type CtaBandProps = {
    heading?: string;
    body?: string;
};

/** Closing call to action used at the bottom of every marketing page. */
export default function CtaBand({
    heading = 'Want to ship faster without losing control of the codebase?',
    body = 'A short call is the quickest way to find out whether I can help. No pitch deck, just a conversation about what you are building.',
}: CtaBandProps) {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'cta-band',
        styles,
    });

    return (
        <section className={rootClassName} aria-labelledby="cta-band-title">
            <div className={getChildClass('inner')}>
                <h2 id="cta-band-title" className={getChildClass('heading')}>
                    {heading}
                </h2>
                <p className={getChildClass('body')}>{body}</p>
                <div className={getChildClass('actions')}>
                    <Button asChild size="lg">
                        <Link href="/contact">{site.cta.primary}</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/services">{site.cta.secondary}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
