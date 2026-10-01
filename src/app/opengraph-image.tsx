import { ImageResponse } from 'next/og';

import { profile } from '@/content/profile';
import { site } from '@/content/site';

export const alt = `${site.company}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Same geometry as public/images/bht-mark.svg, drawn inline because the OG
// renderer cannot load external SVG files.
const CELLS = [
    '16.24,1.65 30.7,10 30.7,26.7 16.24,35.05 1.78,26.7 1.78,10',
    '47.76,1.65 62.22,10 62.22,26.7 47.76,35.05 33.3,26.7 33.3,10',
    '32,28.95 46.46,37.3 46.46,54 32,62.35 17.54,54 17.54,37.3',
];
const LETTERS = [
    'M11.19,10.75 V25.95 M11.19,12.1 H15.56 L18.71,13.92 V16.53 L15.56,18.35 H11.19 M11.19,18.35 H15.56 L19.94,20.88 V22.07 L15.56,24.6 H11.19',
    'M42.96,10.75 V25.95 M51.21,10.75 V25.95 M42.96,18.35 H51.21',
    'M25.6,39.4 H37.05 M31.33,39.4 V53.25',
];

/** Share card used by LinkedIn, Facebook, Slack, X, iMessage, etc. */
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'radial-gradient(circle at 85% 0%, #4c3e76 0%, #131313 60%)',
                    color: '#e2e2e2',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    padding: '64px 80px',
                    width: '100%',
                }}
            >
                <div style={{ alignItems: 'center', display: 'flex', gap: 24 }}>
                    <svg width="96" height="96" viewBox="0 0 64 64">
                        {CELLS.map((points) => (
                            <polygon key={points} points={points} fill="none" stroke="#cebdfe" strokeWidth="3" strokeLinejoin="miter" />
                        ))}
                        {LETTERS.map((d) => (
                            <path key={d} d={d} fill="none" stroke="#f5ca4f" strokeWidth="2.7" strokeLinejoin="miter" />
                        ))}
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#fff', fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>BEhive Tech</span>
                        <span style={{ color: '#cebdfe', fontSize: 22, letterSpacing: 4 }}>BEHIVETECH.COM</span>
                    </div>
                </div>
                <div style={{ color: '#fff', display: 'flex', fontSize: 58, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 1040 }}>
                    {site.tagline}
                </div>
                <div style={{ display: 'flex', fontSize: 26, justifyContent: 'space-between' }}>
                    <span>
                        {profile.name} · {profile.title}
                    </span>
                    <span style={{ color: '#cebdfe' }}>
                        {site.locality}, {site.region}
                    </span>
                </div>
            </div>
        ),
        size,
    );
}
