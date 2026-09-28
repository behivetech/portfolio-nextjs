import { profile } from '@/content/profile';

/** Person + WebSite structured data so Google can build a knowledge panel and rich results. */
export default function JsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': `${profile.siteUrl}/#person`,
                name: profile.name,
                jobTitle: profile.title,
                description: profile.summary,
                url: profile.siteUrl,
                image: `${profile.siteUrl}/opengraph-image`,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Denver',
                    addressRegion: 'CO',
                    addressCountry: 'US',
                },
                sameAs: [profile.links.linkedin, profile.links.github],
                worksFor: {
                    '@type': 'Organization',
                    name: 'BEhive Tech LLC',
                    url: profile.siteUrl,
                },
                alumniOf: profile.education.map(({ school }) => ({
                    '@type': 'CollegeOrUniversity',
                    name: school,
                })),
                hasCredential: profile.certifications.map((name) => ({
                    '@type': 'EducationalOccupationalCredential',
                    name,
                })),
                knowsAbout: profile.skills.flatMap(({ items }) => items),
            },
            {
                '@type': 'WebSite',
                '@id': `${profile.siteUrl}/#website`,
                url: profile.siteUrl,
                name: 'BEhive Tech',
                publisher: { '@id': `${profile.siteUrl}/#person` },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            // JSON.stringify output is safe here: all values are static strings from profile.ts
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
