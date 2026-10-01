import type { Metadata } from 'next';

import CtaBand from '@/components/site/CtaBand';
import PageHero from '@/components/site/PageHero';

export const metadata: Metadata = {
    title: 'Page not found',
    robots: { index: false },
};

export default function NotFound() {
    return (
        <>
            <PageHero
                eyebrow="404"
                headline="That page does not exist."
                subtext="The link may be old, or the page moved when the site was rebuilt. The links below will get you where you need to go."
                ctas={[
                    { label: 'Home', href: '/', variant: 'primary' },
                    { label: 'Services', href: '/services', variant: 'secondary' },
                ]}
            />
            <CtaBand heading="Looking for me?" body="If you were sent here by a recruiter or a colleague, the About page has the short version and the resume has the long one." />
        </>
    );
}
