import type { Metadata } from 'next';
import { getClassName } from '@behivetech/get-class-name';

import { profile, type Experience } from '@/content/profile';
import ProtectedEmail from '@/components/site/ProtectedEmail';
import PrintButton from './PrintButton';

import styles from './resume.module.scss';

const description = `Resume of ${profile.name}, ${profile.title}. ${profile.seeking}`;

export const metadata: Metadata = {
    title: 'Resume',
    description,
    alternates: { canonical: '/resume' },
    openGraph: {
        type: 'profile',
        url: '/resume',
        title: `${profile.name} | Resume`,
        description,
        images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` }],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${profile.name} | Resume`,
        description,
        images: ['/twitter-image'],
    },
};

const experience: readonly Experience[] = profile.experience;

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

export default function ResumePage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'resume',
        styles,
    });

    return (
        <div className={rootClassName}>
            <div className={getChildClass('toolbar')}>
                <PrintButton />
            </div>
            <article className={getChildClass('paper')}>
                <header className={getChildClass('header')}>
                    <h1>{profile.name}</h1>
                    <p className={getChildClass('title')}>
                        {profile.title} | {profile.tagline}
                    </p>
                    <p className={getChildClass('contact')}>
                        <span>{profile.location}</span>
                        <ProtectedEmail />
                        <a href={profile.links.linkedin}>{stripProtocol(profile.links.linkedin)}</a>
                        <a href={profile.siteUrl}>{stripProtocol(profile.siteUrl)}</a>
                        <a href={profile.links.github}>{stripProtocol(profile.links.github)}</a>
                    </p>
                </header>

                <section>
                    <h2>Summary</h2>
                    <p>
                        {profile.summary} {profile.seeking}
                    </p>
                </section>

                <section>
                    <h2>Architecture &amp; Innovation</h2>
                    <ul>
                        {profile.highlights.map(({ title, body }) => (
                            <li key={title}>
                                <strong>{title}:</strong> {body}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Core Skills</h2>
                    <ul>
                        {profile.skills.map(({ group, items }) => (
                            <li key={group}>
                                <strong>{group}:</strong> {items.join(', ')}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Experience</h2>
                    {experience.map(({ company, formerly, title, start, end, highlights }) => (
                        <div key={`${company}-${start}`} className={getChildClass('job')}>
                            <h3>
                                {title} · {company}
                                {formerly && ` (formerly ${formerly})`}
                                <span className={getChildClass('dates')}>
                                    {start} – {end}
                                </span>
                            </h3>
                            <ul>
                                {highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <p>
                        <strong>Earlier Career:</strong> {profile.earlierCareer}
                    </p>
                </section>

                <section>
                    <h2>Education &amp; Certifications</h2>
                    <ul>
                        {profile.education.map(({ degree, school }) => (
                            <li key={degree}>
                                {degree} · {school}
                            </li>
                        ))}
                        <li>{profile.certifications.join(' · ')}</li>
                    </ul>
                </section>
            </article>
        </div>
    );
}
