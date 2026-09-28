import Link from 'next/link';
import { Badge } from '@behivetech/atoms.badge';
import { Button } from '@behivetech/atoms.button';
import { Card } from '@behivetech/atoms.card';
import { Stat } from '@behivetech/atoms.stat';
import { getClassName } from '@behivetech/get-class-name';
import { HeroBanner } from '@behivetech/organisms.hero-banner';
import { Page } from '@behivetech/templates.page';

import { profile } from '@/content/profile';
import { GithubIcon, LinkedInIcon, MailIcon, MapPinIcon } from '@/components/site/Icons';
import ProtectedEmail from '@/components/site/ProtectedEmail';
import JsonLd from '@/components/site/JsonLd';
import Section from '@/components/site/Section';
import Timeline from '@/components/site/Timeline';

import styles from './page.module.scss';

export default function HomePage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'home',
        styles,
    });

    return (
        <Page className={rootClassName}>
            <JsonLd />

            <HeroBanner
                align="left"
                className={getChildClass('hero')}
                headline={profile.name}
                subtext={profile.title}
                ctaButtons={[
                    { label: 'Get in touch', href: '#contact', variant: 'primary' },
                    { label: 'View resume', href: '/resume', variant: 'secondary' },
                ]}
            >
                <div className={getChildClass('hero-meta')}>
                    <span className={getChildClass('status')}>
                        <span className={getChildClass('status-dot')} aria-hidden="true" />
                        {profile.openTo}
                    </span>
                    <span className={getChildClass('location')}>
                        <MapPinIcon size={16} /> {profile.location}
                    </span>
                </div>
            </HeroBanner>

            <div className={getChildClass('stats')}>
                {profile.stats.map(({ value, label }) => (
                    <Stat key={label} label={label} value={value} className={getChildClass('stat')} />
                ))}
            </div>

            <Section id="about" eyebrow="About" title={profile.tagline}>
                <div className={getChildClass('about')}>
                    <p className={getChildClass('lead')}>{profile.heroStatement}</p>
                    <p>{profile.summary}</p>
                    <p className={getChildClass('seeking')}>{profile.seeking}</p>
                </div>
            </Section>

            <Section id="expertise" eyebrow="Architecture & innovation" title="What I bring to a team">
                <div className={getChildClass('grid')}>
                    {profile.highlights.map(({ title, body }) => (
                        <Card key={title} title={title} padding="lg" className={getChildClass('card')}>
                            <p>{body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section id="experience" eyebrow="Experience" title="20+ years shipping for the web">
                <Timeline items={profile.experience} />
                <p className={getChildClass('earlier')}>
                    <strong>Earlier career:</strong> {profile.earlierCareer}
                </p>
            </Section>

            <Section id="skills" eyebrow="Core skills" title="Tools of the trade">
                <div className={getChildClass('skills')}>
                    {profile.skills.map(({ group, items }) => (
                        <div key={group}>
                            <h3 className={getChildClass('skill-group')}>{group}</h3>
                            <ul className={getChildClass('badges')}>
                                {items.map((item) => (
                                    <li key={item}>
                                        <Badge className={getChildClass('chip')}>{item}</Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="education" eyebrow="Education & certifications" title="Foundations">
                <div className={getChildClass('grid')}>
                    <Card title="Education" padding="lg">
                        <ul className={getChildClass('list')}>
                            {profile.education.map(({ degree, school }) => (
                                <li key={degree}>
                                    <strong>{degree}</strong>
                                    <span>{school}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card title="Certifications" padding="lg">
                        <ul className={getChildClass('list')}>
                            {profile.certifications.map((name) => (
                                <li key={name}>
                                    <strong>{name}</strong>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </Section>

            <Section id="contact" eyebrow="Contact" title="Let's build something together">
                <div className={getChildClass('contact')}>
                    <p>
                        I&apos;m currently looking for my next principal, staff, or architect role, and I&apos;m open to
                        consulting engagements through BEhive Tech. The fastest way to reach me is email or LinkedIn.
                    </p>
                    <div className={getChildClass('contact-actions')}>
                        <Button asChild size="lg">
                            <ProtectedEmail icon={<MailIcon size={18} />} />
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <a href={profile.links.linkedin} target="_blank" rel="me noopener">
                                <LinkedInIcon size={18} /> LinkedIn
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="ghost">
                            <a href={profile.links.github} target="_blank" rel="me noopener">
                                <GithubIcon size={18} /> GitHub
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="ghost">
                            <Link href="/resume">Printable resume</Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </Page>
    );
}
