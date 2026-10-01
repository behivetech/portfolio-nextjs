'use client';

import { useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { track } from '@vercel/analytics';
import { getClassName } from '@behivetech/get-class-name';
import { useCalendlyEventListener } from 'react-calendly';

import { site } from '@/content/site';
import { CalendarIcon } from './Icons';
import { useTheme } from './theme';

import styles from './Scheduler.module.scss';

// The iframe widget is client-only; keep it out of the server bundle.
const InlineWidget = dynamic(() => import('react-calendly').then((mod) => mod.InlineWidget), {
    ssr: false,
});

// Calendly takes bare hex. These mirror the galaxy dark/light surface tokens.
// Only applied on paid Calendly plans; harmless otherwise.
const COLORS = {
    dark: { backgroundColor: '1b1b1b', textColor: 'e2e2e2', primaryColor: 'cebdfe' },
    light: { backgroundColor: 'ffffff', textColor: '1b1b1b', primaryColor: '64558f' },
} as const;

// Starting iframe height until Calendly reports its real content height.
const DEFAULT_HEIGHT = 720;

/**
 * Embedded Calendly scheduler with a picker for the event types configured in
 * src/content/site.ts. Shows a placeholder when no events are configured.
 */
export default function Scheduler() {
    const { baseUrl } = site.calendly;
    // Widened from the tuple type so an empty list is a legal state.
    const events: readonly { slug: string; label: string; description: string }[] = site.calendly.events;
    const [selected, setSelected] = useState(0);
    const [height, setHeight] = useState(DEFAULT_HEIGHT);
    const theme = useTheme();
    const tabsId = useId();
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'scheduler',
        modifiers: { placeholder: events.length === 0 },
        styles,
    });

    useCalendlyEventListener({
        onEventScheduled: () => track('booking', { event: events[selected]?.slug ?? 'unknown' }),
        // Size the iframe to Calendly's content so the page scrolls, not the embed.
        onPageHeightResize: (e) => {
            const next = parseInt(e.data.payload.height, 10);
            if (Number.isFinite(next) && next > 0) setHeight(next);
        },
    });

    // Fresh widget on event/theme change: drop the stale height until it reports again.
    const selectEvent = (index: number) => {
        setSelected(index);
        setHeight(DEFAULT_HEIGHT);
    };

    if (events.length === 0) {
        return (
            <div className={rootClassName} role="status">
                <CalendarIcon size={32} className={getChildClass('icon')} />
                <p className={getChildClass('title')}>Online scheduling is coming soon.</p>
                <p className={getChildClass('body')}>
                    In the meantime, send me an email and I will reply with a few times for a call.
                </p>
            </div>
        );
    }

    const event = events[selected];

    return (
        <div className={rootClassName}>
            <div role="tablist" aria-label="Meeting type" className={getChildClass('tabs')}>
                {events.map(({ slug, label, description }, index) => {
                    const active = index === selected;
                    return (
                        <button
                            key={slug}
                            type="button"
                            role="tab"
                            id={`${tabsId}-tab-${slug}`}
                            aria-selected={active}
                            aria-controls={`${tabsId}-panel`}
                            tabIndex={active ? 0 : -1}
                            className={getChildClass('tab')}
                            onClick={() => selectEvent(index)}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowRight') selectEvent((index + 1) % events.length);
                                if (e.key === 'ArrowLeft') selectEvent((index - 1 + events.length) % events.length);
                            }}
                        >
                            <span className={getChildClass('tab-label')}>{label}</span>
                            <span className={getChildClass('tab-description')}>{description}</span>
                        </button>
                    );
                })}
            </div>
            <div
                role="tabpanel"
                id={`${tabsId}-panel`}
                aria-labelledby={`${tabsId}-tab-${event.slug}`}
                className={getChildClass('panel')}
            >
                {theme && (
                    <InlineWidget
                        key={`${event.slug}-${theme}`}
                        url={`${baseUrl}/${event.slug}`}
                        iframeTitle={`Schedule a ${event.label.toLowerCase()} with Bruce Ultra`}
                        styles={{ height: `${height}px`, minWidth: '320px' }}
                        pageSettings={{ hideLandingPageDetails: true, ...COLORS[theme] }}
                        utm={{ utmSource: 'behivetech.com', utmMedium: 'website', utmCampaign: 'contact' }}
                    />
                )}
            </div>
        </div>
    );
}
