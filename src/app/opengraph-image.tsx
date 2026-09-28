import { ImageResponse } from 'next/og';

import { profile } from '@/content/profile';

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
                    padding: '72px 80px',
                    width: '100%',
                }}
            >
                <div style={{ color: '#cebdfe', display: 'flex', fontSize: 28, letterSpacing: 6 }}>
                    BEHIVETECH.COM
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: '#fff', fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
                        {profile.name}
                    </div>
                    <div style={{ color: '#e8ddff', fontSize: 44, marginTop: 12 }}>{profile.title}</div>
                    <div style={{ fontSize: 30, marginTop: 28, maxWidth: 980 }}>
                        Micro frontends · Design systems · AI-native engineering workflows
                    </div>
                </div>
                <div style={{ display: 'flex', fontSize: 26, justifyContent: 'space-between' }}>
                    <span>{profile.location}</span>
                    <span style={{ color: '#cebdfe' }}>{profile.openTo}</span>
                </div>
            </div>
        ),
        size,
    );
}
