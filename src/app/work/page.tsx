import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@behivetech/atoms.button';
import { getClassName } from '@behivetech/get-class-name';

import { projects, registry } from '@/content/work';
import CtaBand from '@/components/site/CtaBand';
import { CheckIcon, ExternalLinkIcon } from '@/components/site/Icons';
import MaterialIcon from '@/components/site/MaterialIcon';
import PageHero from '@/components/site/PageHero';

import styles from './work.module.scss';

export const metadata: Metadata = {
    title: 'Work',
    description:
        'Two things BEhive Tech built that you can look at: an open-source component registry that stays in git, and an AI engineering team of Claude Code agents that works from GitHub issues.',
    alternates: { canonical: '/work' },
    openGraph: { url: '/work', title: 'Work | BEhive Tech' },
};

export default function WorkPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'work',
        styles,
    });

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow="Work"
                headline="Two things I built that you can look at."
                subtext="Both came out of my own products, and both are what I install for clients: a component registry that stays in git, and an AI engineering team that works from GitHub issues. Each page explains how it works and what the matching engagement looks like."
            />

            <div className={getChildClass('list')}>
                {projects.map(({ slug, href, icon, name, summary, highlights }) => (
                    <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className={getChildClass('project')}>
                        <div className={getChildClass('intro')}>
                            <div className={getChildClass('head')}>
                                <span className={getChildClass('icon')}>
                                    <MaterialIcon name={icon} size={28} />
                                </span>
                                <h2 id={`${slug}-title`} className={getChildClass('title')}>
                                    {name}
                                </h2>
                            </div>
                            <p className={getChildClass('summary')}>{summary}</p>
                            <div className={getChildClass('actions')}>
                                <Button asChild>
                                    <Link href={href}>How it works</Link>
                                </Button>
                                {slug === registry.slug && (
                                    <Button asChild variant="secondary">
                                        <a href={registry.links.site}>
                                            Open the registry <ExternalLinkIcon size={16} />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className={getChildClass('highlights')}>
                            <h3 className={getChildClass('highlights-title')}>In short</h3>
                            <ul className={getChildClass('check-list')}>
                                {highlights.map((item) => (
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

            <CtaBand heading="Want one of these for your team?" body="Both are things I set up for clients, matched to the repository, tools and process you already have. A short call is the quickest way to find out what that would look like." />
        </div>
    );
}
