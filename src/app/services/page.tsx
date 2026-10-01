import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@behivetech/atoms.button';
import { getClassName } from '@behivetech/get-class-name';

import { site } from '@/content/site';
import CtaBand from '@/components/site/CtaBand';
import { CheckIcon } from '@/components/site/Icons';
import MaterialIcon from '@/components/site/MaterialIcon';
import PageHero from '@/components/site/PageHero';

import styles from './services.module.scss';

export const metadata: Metadata = {
    title: 'Services',
    description:
        'Fixed-scope consulting from BEhive Tech: AI-native workflow setup, architecture audits, modernization and build, Node.js backends and APIs, design systems, and Electron desktop apps.',
    alternates: { canonical: '/services' },
    openGraph: { url: '/services', title: 'Services | BEhive Tech' },
};

export default function ServicesPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'services',
        styles,
    });

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow="Services"
                headline="Fixed-scope engagements with clear deliverables."
                subtext="Each engagement starts with a short call and a written proposal, so you know what you are getting and when. Pricing depends on scope; ask and I will give you a straight answer."
            />

            <div className={getChildClass('list')}>
                {site.services.map(({ slug, icon, name, description, deliverables }) => (
                    <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className={getChildClass('service')}>
                        <div className={getChildClass('service-intro')}>
                            <div className={getChildClass('service-head')}>
                                <span className={getChildClass('icon')}>
                                    <MaterialIcon name={icon} size={28} />
                                </span>
                                <h2 id={`${slug}-title`} className={getChildClass('service-title')}>
                                    {name}
                                </h2>
                            </div>
                            <p className={getChildClass('service-body')}>{description}</p>
                            <div className={getChildClass('service-actions')}>
                                <Button asChild>
                                    <Link href="/contact">{site.cta.primary}</Link>
                                </Button>
                                <span className={getChildClass('pricing')}>{site.pricingNote}</span>
                            </div>
                        </div>
                        <div className={getChildClass('deliverables')}>
                            <h3 className={getChildClass('deliverables-title')}>What you get</h3>
                            <ul className={getChildClass('check-list')}>
                                {deliverables.map((item) => (
                                    <li key={item}>
                                        <CheckIcon size={18} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>

            <CtaBand heading="Not sure which engagement fits?" body="Most work starts with a call and a conversation about where things hurt. I will tell you which of these fits, or whether something smaller would do." />
        </div>
    );
}
