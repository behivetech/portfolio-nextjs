import type { Metadata } from 'next';
import { getClassName } from '@behivetech/get-class-name';

import { profile } from '@/content/profile';
import { site } from '@/content/site';
import { LinkedInIcon, MailIcon, MapPinIcon } from '@/components/site/Icons';
import PageHero from '@/components/site/PageHero';
import ProtectedEmail from '@/components/site/ProtectedEmail';
import Scheduler from '@/components/site/Scheduler';

import styles from './contact.module.scss';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Book a call with Bruce Ultra at BEhive Tech, or reach out by email or LinkedIn. Denver metro, working with teams anywhere in the US.',
    alternates: { canonical: '/contact' },
    openGraph: { url: '/contact', title: 'Contact | BEhive Tech' },
};

export default function ContactPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'contact',
        styles,
    });

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow="Contact"
                headline="Let's talk about what you're building."
                subtext="Pick a time that works for you, or send a note. I reply to every message myself, usually within a business day."
            />

            <div className={getChildClass('layout')}>
                <div className={getChildClass('scheduler')}>
                    <h2 className={getChildClass('heading')}>Book a call</h2>
                    <Scheduler />
                </div>
                <aside className={getChildClass('aside')}>
                    <h2 className={getChildClass('heading')}>Other ways to reach me</h2>
                    <ul className={getChildClass('methods')}>
                        <li>
                            <MailIcon size={20} />
                            <ProtectedEmail />
                        </li>
                        <li>
                            <LinkedInIcon size={20} />
                            <a href={profile.links.linkedin} rel="me noopener" target="_blank">
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <MapPinIcon size={20} />
                            <span>
                                {site.locality}, {site.region}. Remote-friendly, US time zones.
                            </span>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
}
