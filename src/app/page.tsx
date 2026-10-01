import Link from 'next/link';
import { Card } from '@behivetech/atoms.card';
import { Stat } from '@behivetech/atoms.stat';
import { getClassName } from '@behivetech/get-class-name';
import { Page } from '@behivetech/templates.page';

import { site } from '@/content/site';
import CtaBand from '@/components/site/CtaBand';
import { ArrowRightIcon } from '@/components/site/Icons';
import MaterialIcon from '@/components/site/MaterialIcon';
import JsonLd from '@/components/site/JsonLd';
import PageHero from '@/components/site/PageHero';
import Section from '@/components/site/Section';

import styles from './page.module.scss';

export default function HomePage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'home',
        styles,
    });

    return (
        <Page className={rootClassName}>
            <JsonLd />

            <PageHero
                size="large"
                eyebrow={site.company}
                headline={site.tagline}
                subtext="Expert frontend architecture, full-stack delivery in TypeScript and Node.js, and AI-assisted development workflows with human review built in. Senior hands on a fixed scope, without a permanent hire."
                ctas={[
                    { label: site.cta.primary, href: '/contact', variant: 'primary' },
                    { label: site.cta.secondary, href: '/services', variant: 'secondary' },
                ]}
            />

            <Section id="value" eyebrow="What I do" title={site.valueProp.heading}>
                <div className={getChildClass('prose')}>
                    {site.valueProp.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </Section>

            <Section id="services" eyebrow="Services" title="Fixed-scope engagements, senior hands">
                <div className={getChildClass('grid')}>
                    {site.services.map(({ slug, icon, name, summary }) => (
                        <Card
                            key={slug}
                            icon={<MaterialIcon name={icon} />}
                            title={name}
                            padding="lg"
                            className={getChildClass('card')}
                        >
                            <p>{summary}</p>
                            <Link href={`/services#${slug}`} className={getChildClass('card-link')}>
                                Details <ArrowRightIcon size={16} />
                            </Link>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section id="credibility" eyebrow="Track record" title="Built at scale, in production">
                <div className={getChildClass('stats')}>
                    {site.about.proofPoints.map(({ value, label }) => (
                        <Stat key={label} label={label} value={value} className={getChildClass('stat')} />
                    ))}
                </div>
                <p className={getChildClass('experience-label')}>Experience at</p>
                <ul className={getChildClass('experience')}>
                    {site.experienceAt.map((company) => (
                        <li key={company}>{company}</li>
                    ))}
                </ul>
            </Section>

            <CtaBand />
        </Page>
    );
}
