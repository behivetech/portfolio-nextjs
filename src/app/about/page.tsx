import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@behivetech/atoms.badge';
import { Button } from '@behivetech/atoms.button';
import { Stat } from '@behivetech/atoms.stat';
import { getClassName } from '@behivetech/get-class-name';

import { profile } from '@/content/profile';
import { site } from '@/content/site';
import CtaBand from '@/components/site/CtaBand';
import { GithubIcon, LinkedInIcon } from '@/components/site/Icons';
import PageHero from '@/components/site/PageHero';
import Section from '@/components/site/Section';

import styles from './about.module.scss';

export const metadata: Metadata = {
    title: 'About',
    description: `${profile.name} is a software architect and principal engineer in the Denver metro area with ${profile.years} years building for the web, and the founder of BEhive Tech LLC.`,
    alternates: { canonical: '/about' },
    openGraph: { url: '/about', title: `About ${profile.name} | BEhive Tech`, type: 'profile', firstName: 'Bruce', lastName: 'Ultra' },
};

export default function AboutPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'about',
        styles,
    });

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow="About"
                headline={profile.name}
                subtext={`${profile.title}. ${site.locality}, ${site.region}.`}
            >
                <div className={getChildClass('social')}>
                    <a href={profile.links.linkedin} rel="me noopener" target="_blank">
                        <LinkedInIcon size={18} /> LinkedIn
                    </a>
                    <a href={profile.links.github} rel="me noopener" target="_blank">
                        <GithubIcon size={18} /> GitHub
                    </a>
                </div>
            </PageHero>

            <Section id="bio" eyebrow="Background" title={`${profile.years} years building for the web`}>
                <div className={getChildClass('layout')}>
                    <div className={getChildClass('prose')}>
                        {site.about.bio.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                        <p>
                            <Button asChild variant="secondary">
                                <Link href="/resume">Full resume</Link>
                            </Button>
                        </p>
                    </div>
                    <div className={getChildClass('photo')}>
                        <Image
                            src="/images/bruce-ultra.jpg"
                            alt={`${profile.name}, smiling, in a blue shirt against a teal wall`}
                            width={1200}
                            height={1500}
                            sizes="(min-width: 1024px) 22rem, 100vw"
                        />
                    </div>
                </div>
            </Section>

            <Section id="scale" eyebrow="Proof points" title="Work that had to hold up">
                <div className={getChildClass('stats')}>
                    {site.about.proofPoints.map(({ value, label }) => (
                        <Stat key={label} label={label} value={value} className={getChildClass('stat')} />
                    ))}
                </div>
            </Section>

            <Section id="domains" eyebrow="Domains" title="Industries I have shipped in">
                <ul className={getChildClass('chips')}>
                    {site.about.domains.map((domain) => (
                        <li key={domain}>
                            <Badge className={getChildClass('chip')}>{domain}</Badge>
                        </li>
                    ))}
                </ul>
                <p className={getChildClass('experience-label')}>Experience at</p>
                <ul className={getChildClass('experience')}>
                    {site.experienceAt.map((company) => (
                        <li key={company}>{company}</li>
                    ))}
                </ul>
            </Section>

            <CtaBand />
        </div>
    );
}
