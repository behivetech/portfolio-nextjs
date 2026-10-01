import { profile } from '@/content/profile';
import { site } from '@/content/site';

/**
 * ProfessionalService + founder Person + WebSite structured data so Google can
 * show the business and the person behind it.
 */
export default function JsonLd() {
    const personId = `${profile.siteUrl}/#person`;
    const orgId = `${profile.siteUrl}/#organization`;

    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfessionalService',
                '@id': orgId,
                name: site.company,
                alternateName: site.shortName,
                description: site.description,
                url: profile.siteUrl,
                logo: `${profile.siteUrl}/images/behivetech-logo.svg`,
                image: `${profile.siteUrl}/opengraph-image`,
                founder: { '@id': personId },
                areaServed: 'US',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: site.locality,
                    addressRegion: site.region,
                    addressCountry: 'US',
                },
                sameAs: [profile.links.linkedin, profile.links.github],
                knowsAbout: site.services.map(({ name }) => name),
                makesOffer: site.services.map(({ name, summary, slug }) => ({
                    '@type': 'Offer',
                    url: `${profile.siteUrl}/services#${slug}`,
                    itemOffered: { '@type': 'Service', name, description: summary },
                })),
            },
            {
                '@type': 'Person',
                '@id': personId,
                name: profile.name,
                jobTitle: profile.title,
                url: `${profile.siteUrl}/about`,
                image: `${profile.siteUrl}/images/bruce-ultra.jpg`,
                worksFor: { '@id': orgId },
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: site.locality,
                    addressRegion: site.region,
                    addressCountry: 'US',
                },
                sameAs: [profile.links.linkedin, profile.links.github],
                alumniOf: profile.education.map(({ school }) => ({
                    '@type': 'CollegeOrUniversity',
                    name: school,
                })),
                knowsAbout: profile.skills.flatMap(({ items }) => items),
            },
            {
                '@type': 'WebSite',
                '@id': `${profile.siteUrl}/#website`,
                url: profile.siteUrl,
                name: site.shortName,
                publisher: { '@id': orgId },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            // JSON.stringify output is safe here: all values are static strings from the content files
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
