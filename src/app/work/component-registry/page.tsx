import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@behivetech/atoms.badge';
import { Button } from '@behivetech/atoms.button';
import { Card } from '@behivetech/atoms.card';
import { getClassName } from '@behivetech/get-class-name';

import { site } from '@/content/site';
import { registry } from '@/content/work';
import CtaBand from '@/components/site/CtaBand';
import { CheckIcon, ExternalLinkIcon, GithubIcon } from '@/components/site/Icons';
import MaterialIcon from '@/components/site/MaterialIcon';
import PageHero from '@/components/site/PageHero';
import Section from '@/components/site/Section';

import styles from './component-registry.module.scss';

export const metadata: Metadata = {
    title: 'Component Registry',
    description:
        'An open-source component registry that stays in git: one npm package per component, docs generated from the source, live examples, versions with Changesets, and a static site that deploys anywhere. Built by BEhive Tech.',
    alternates: { canonical: registry.href },
    openGraph: { url: registry.href, title: 'Component Registry | BEhive Tech' },
};

export default function ComponentRegistryPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'registry',
        styles,
    });

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow={registry.eyebrow}
                headline={registry.headline}
                subtext={registry.summary}
                ctas={[
                    { label: 'Open the registry', href: registry.links.site, variant: 'primary' },
                    { label: 'View on GitHub', href: registry.links.repo, variant: 'secondary' },
                ]}
            >
                <ul className={getChildClass('badges')} aria-label="At a glance">
                    {registry.badges.map((badge) => (
                        <li key={badge}>
                            <Badge className={getChildClass('badge')}>{badge}</Badge>
                        </li>
                    ))}
                </ul>
            </PageHero>

            <Section id="idea" eyebrow="The idea" title="Your repo is the registry">
                <div className={getChildClass('prose')}>
                    {registry.idea.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </Section>

            <Section id="features" eyebrow="What you get" title="Docs that cannot drift from the code">
                <div className={getChildClass('grid')}>
                    {registry.features.map(({ icon, title, body }) => (
                        <Card key={title} icon={<MaterialIcon name={icon} />} title={title} padding="lg" className={getChildClass('card')}>
                            <p>{body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section id="how-it-works" eyebrow="How it works" title="Four moving parts, all in git">
                <ol className={getChildClass('steps')}>
                    {registry.howItWorks.map(({ title, body }) => (
                        <li key={title} className={getChildClass('step')}>
                            <h3 className={getChildClass('step-title')}>{title}</h3>
                            <p className={getChildClass('step-body')}>{body}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section id="get-started" eyebrow="Get started" title="Running in a few minutes">
                <div className={getChildClass('start')}>
                    <pre className={getChildClass('code')}>
                        <code>{registry.quickStart.join('\n')}</code>
                    </pre>
                    <div className={getChildClass('start-text')}>
                        <p>{registry.quickStartNote}</p>
                        <ul className={getChildClass('resources')}>
                            <li>
                                <a href={registry.links.docs}>
                                    <MaterialIcon name="auto-stories" size={18} /> The guide
                                </a>
                            </li>
                            <li>
                                <a href={registry.links.npm}>
                                    <MaterialIcon name="terminal" size={18} /> create-bht-component-registry on npm
                                </a>
                            </li>
                            <li>
                                <a href={registry.links.repo}>
                                    <GithubIcon size={18} /> Source on GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Section>

            <Section id="in-production" eyebrow="See it running" title="The Behive Tech registry">
                <div className={getChildClass('prose')}>
                    {registry.inProduction.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className={getChildClass('actions')}>
                    <Button asChild>
                        <a href={registry.links.site}>
                            Browse the components <ExternalLinkIcon size={16} />
                        </a>
                    </Button>
                    <Button asChild variant="secondary">
                        <a href={registry.links.tokens}>
                            Design tokens <ExternalLinkIcon size={16} />
                        </a>
                    </Button>
                </div>
            </Section>

            <Section id="expanded" eyebrow="The expanded version" title="A workspace for the team on top">
                <p className={getChildClass('lead')}>{registry.expanded.intro}</p>
                <div className={getChildClass('expanded')}>
                    <div className={getChildClass('panel')}>
                        <h3 className={getChildClass('panel-title')}>What it adds</h3>
                        <ul className={getChildClass('check-list')}>
                            {registry.expanded.features.map((item) => (
                                <li key={item}>
                                    <CheckIcon size={18} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={getChildClass('panel')}>
                        <h3 className={getChildClass('panel-title')}>How it fits</h3>
                        <ul className={getChildClass('check-list')}>
                            {registry.expanded.fit.map((item) => (
                                <li key={item}>
                                    <CheckIcon size={18} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p className={getChildClass('note')}>{registry.expanded.note}</p>
                <div className={getChildClass('actions')}>
                    <Button asChild>
                        <Link href="/contact">{site.cta.primary}</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/services#design-systems">The Design Systems service</Link>
                    </Button>
                </div>
            </Section>

            <CtaBand heading="Want a registry like this for your team?" body="Setting one up, moving an existing library into it, or adding the expanded version on top are all things I do as fixed-scope engagements. A short call is the quickest way to find out which fits." />
        </div>
    );
}
