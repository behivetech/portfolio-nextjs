/**
 * Consulting site copy for BEhive Tech LLC. Edit this file to change what the
 * home, services, approach, about, and contact pages say. Resume content
 * stays in profile.ts.
 *
 * Search for TODO(bruce) for the items still waiting on input.
 */

import type { MaterialIconName } from '@/components/site/MaterialIcon';
import { profile, type Experience } from './profile';

export type Service = {
    slug: string;
    icon: MaterialIconName;
    name: string;
    summary: string;
    description: string;
    deliverables: readonly string[];
};

export const site = {
    company: 'BEhive Tech LLC',
    shortName: 'BEhive Tech',
    tagline: 'Full-stack architecture and AI-native engineering for teams that want to ship faster.',
    description:
        'BEhive Tech LLC is the consulting practice of Bruce Ultra, a software architect and principal engineer in the Denver metro area. Expert frontend architecture, full-stack delivery in TypeScript and Node.js, design systems, and AI-assisted development workflows with human review built in.',
    locality: 'Denver',
    region: 'CO',

    /**
     * Calendly event types shown on /contact. The first one is selected by
     * default. Leave `events` empty to show the "coming soon" placeholder.
     */
    calendly: {
        baseUrl: 'https://calendly.com/bruce-ultra-behivetech',
        events: [
            { slug: '30min', label: '30-minute call', description: 'A quick intro. The best first step.' },
            { slug: '1-hour-meeting', label: '1-hour call', description: 'A deeper look at a specific problem.' },
            { slug: '30-minute-group-meeting', label: '30-minute group call', description: 'Bring a colleague or two.' },
            { slug: '1-hour-group-meeting', label: '1-hour group call', description: 'A working session with your team.' },
        ],
    },

    cta: {
        primary: 'Book a call',
        secondary: 'See services',
    },

    valueProp: {
        heading: 'I help teams modernize how they build.',
        body: [
            'That means two things. First, a modular, scalable architecture across the whole stack: independently deployable modules on shared foundations, with typed contracts between the UI and the Node.js services behind it, so people can work in parallel without stepping on each other. Second, an AI-assisted development workflow with human review built in, so the speed you gain does not come back later as bugs.',
            'I have done this work as a principal engineer and architect inside companies for 25+ years. The frontend is my deepest expertise: React, design systems, and the architecture that keeps large UIs maintainable. The Node.js side of the stack is right behind it, so I can own a feature from the database to the pixel. Through BEhive Tech I do it for teams that need a principal engineer or architect without making a permanent hire.',
            'Modernization is the core of what I do, but not every engagement is a rebuild. Teams also hand me one piece of a larger project: a feature that has been waiting, a module that needs an owner, an integration, a component library, a desktop client. Same standards, smaller scope.',
        ],
    },

    services: [
        {
            slug: 'ai-native-workflow',
            icon: 'auto-awesome',
            name: 'AI-Native Workflow Setup',
            summary: 'An AI-assisted development workflow designed around your team, your repo, and the tools you already use.',
            description:
                'I design and install an AI-assisted development workflow that fits how your team already works, then train the team to run it. The shape depends on your needs: which models and tools you have access to, how strict your review process is, and where the mechanical work is piling up. One configuration I have built: Claude Code agents pick up GitHub issues, implement the change, and run the test suite, while GitHub Copilot reviews every pull request as an independent second opinion. Whatever the tools, the principle holds: agents do the mechanical work, a second model challenges it, and nothing merges without a person signing off.',
            deliverables: [
                'Workflow design matched to your repository, review process, and tooling',
                'Agent configuration, MCP servers, and subagents using Claude Code, Copilot, or the tools you have',
                "Cross-model review so one model's blind spots are caught by another, with people making the call",
                'Model routing and cost reporting so AI spend stays proportional to value',
                'Team training sessions and a written playbook',
            ],
        },
        {
            slug: 'architecture-audit',
            icon: 'account-tree',
            name: 'Architecture Audit',
            summary: 'A structured review of your codebase, UI through API and data layer, with a roadmap you can act on.',
            description:
                'A structured review of an existing codebase, delivered as a roadmap you can act on. I look at how the code is organized, typed, tested, and shipped, from the React components down to the Node.js services, API contracts, and data model, then tell you what to change, in what order, and why. Where micro frontends, atomic design systems, packaging, or a better data layer would pay off, I say so; where they would not, I say that too.',
            deliverables: [
                'Written assessment covering frontend architecture, API design, data model, typing, testing, and CI/CD',
                'Prioritized roadmap with effort and risk for each step',
                'Recommendations on micro frontends, design systems, packaging, and data layers',
                'Readout session with your engineering leads',
            ],
        },
        {
            slug: 'modernization-build',
            icon: 'code',
            name: 'Modernization & Build',
            summary: 'Hands-on React, Next.js, Node.js, and TypeScript implementation inside your team.',
            description:
                'Hands-on implementation across the stack: React and Next.js on the front, Node.js services, REST APIs, and the database behind it, all in TypeScript. I work inside your process, ship production code in reviewable pull requests, and leave behind patterns your engineers can keep extending after I am gone. It does not have to be a whole system: I also take on a scoped piece of a larger project, a feature, a module, an integration, and deliver it to the same standard.',
            deliverables: [
                'Production features or migrations delivered in reviewable pull requests',
                'Scoped pieces of a larger project: a feature, a module, or an integration your team hands off',
                'Legacy-to-modern migrations that keep the old system running until the new one is ready',
                'API and data-layer work alongside the UI: Node.js services, REST endpoints, and data models in whatever database you run',
                'Typed contracts, composable data layers, and tests as part of the work',
                'Documentation and a handoff your team can build on',
            ],
        },
        {
            slug: 'node-backends',
            icon: 'dns',
            name: 'Node.js Backends & APIs',
            summary: 'REST APIs, real-time messaging, and multi-tenant data models in TypeScript on Node.js.',
            description:
                'Backend services in TypeScript on Node.js, for teams that want one language and one set of patterns across the stack. REST APIs with typed contracts the frontend can rely on, real-time messaging over WebSockets, data models in SQL or document databases, and multi-tenant authentication with organization-level access control and SSO. Postgres with Prisma is my default pairing, not a requirement; I work with what you already run.',
            deliverables: [
                'Node.js services with typed REST contracts shared with the frontend',
                'WebSocket and real-time messaging with reconnection handling',
                'Schema design and a typed data layer with migrations, in Postgres and Prisma by default or your existing database',
                'Multi-tenant authentication, organization-level access control, and SSO',
                'CI/CD and environment configuration for Vercel or your own platform',
            ],
        },
        {
            slug: 'design-systems',
            icon: 'palette',
            name: 'Design Systems',
            summary: 'Hand-built, accessible, internationalized component libraries using atomic design.',
            description:
                'A hand-built component library using atomic design: atoms through organisms to full page templates. Accessible and internationalized from day one, so a UI change lands in one place instead of fifty and every product looks like it came from the same team.',
            deliverables: [
                'Component library with design tokens, theming, and light and dark support',
                'WCAG AA accessibility and i18n built into every component',
                'Packaging and versioning so each app pulls in only what it needs',
                'Living documentation and contribution guidelines',
            ],
        },
        {
            slug: 'desktop-mobile-apps',
            icon: 'devices',
            name: 'Desktop & Mobile Apps',
            summary: 'Electron desktop apps and React Native mobile apps, built alongside your web app.',
            description:
                'Your product, extended to the desktop and to phones. Electron desktop applications run your React code as-is, with real-time messaging, system-tray presence, and a release pipeline that ships signed, certified builds for Windows and macOS. React Native mobile apps share what can be shared with the web app, business logic, state, API clients, and types, while the UI stays native to the platform.',
            deliverables: [
                'Electron application architecture on a shared React codebase',
                'React Native mobile app sharing business logic, state, API clients, and types with your web app',
                'Real-time messaging over WebSockets with reconnection and offline handling',
                'System tray, native notifications, and auto-update on desktop',
                'Signed installers and a CI/CD pipeline for Windows and macOS releases',
            ],
        },
    ] satisfies readonly Service[],

    pricingNote: 'Scoped and priced after a short call',

    approach: [
        {
            icon: 'view-module' as MaterialIconName,
            title: 'Composable architecture',
            body: 'I build systems as independently deployable modules on shared foundations: micro frontends, packaged components, Node.js services behind typed API contracts, and Turborepo monorepos where every component is its own versioned package in a registry. New products launch as modules, not new codebases. Teams ship in parallel, and a change in a shared component lands everywhere at once.',
        },
        {
            icon: 'reviews' as MaterialIconName,
            title: 'AI pipeline with human review built in',
            body: 'Agents do the mechanical work: claim the issue, implement, run tests, and respond to review comments. A second, independent AI reviewer challenges every change so one model\'s blind spots are caught by the other. People review design and correctness, and nothing merges without a human signing off.',
        },
        {
            icon: 'verified-user' as MaterialIconName,
            title: 'Standards that hold up after I leave',
            body: 'Strongly typed contracts in TypeScript, composable hooks and data layers, automated testing and CI/CD, and living documentation, including interactive visual guides that onboard engineers onto new patterns. The goal is a codebase your team can keep moving fast in.',
        },
    ],

    terms: [
        {
            icon: 'schedule' as MaterialIconName,
            title: 'Short or long',
            body: 'A two-week audit, a three-month build, or an ongoing retainer. Length and terms are negotiated around the work, not the other way around.',
        },
        {
            icon: 'person' as MaterialIconName,
            title: 'Direct, no middle man',
            body: 'You work with me, not an agency or a recruiter. No markup on the rate, and the person on the call is the person doing the work.',
        },
        {
            icon: 'description' as MaterialIconName,
            title: '1099 or W-2 contract',
            body: 'Fixed-scope proposals, hourly, or a contract through your payroll. Whatever your procurement needs, we can make it work.',
        },
    ],

    engagement: [
        { icon: 'call' as MaterialIconName, step: 'Call', body: 'A short conversation about what you are building and where it hurts.' },
        { icon: 'description' as MaterialIconName, step: 'Proposal', body: 'A fixed-scope proposal with deliverables, timeline, and price.' },
        { icon: 'construction' as MaterialIconName, step: 'Work', body: 'Delivered in small, reviewable pull requests inside your process.' },
        { icon: 'handshake' as MaterialIconName, step: 'Handoff', body: 'Documentation, training, and patterns your team keeps using.' },
    ],

    about: {
        bio: [
            `I'm Bruce Ultra, a software architect and principal engineer in the Denver metro area. I've spent ${profile.years} years building for the web, on teams ranging from startups to large enterprises. The frontend is where I go deepest: React, Next.js, design systems, and the architecture that keeps large UIs maintainable. I work the rest of the stack in TypeScript too: Node.js services and whichever database the project calls for behind the UI.`,
            'BEhive Tech LLC is how I take on consulting work: architecture, AI-native engineering workflows, design systems, and hands-on builds. I have also delivered modular SaaS applications and mapping experiences used at live events as independent work.',
        ],
        proofPoints: [
            { value: '12M+', label: 'daily page views on southwest.com, an early enterprise React adoption' },
            { value: '500+', label: 'hospitals on a pharmacy platform whose frontend I led' },
            { value: 'Billions', label: 'of emergency alerts a year on platforms I have built for' },
        ],
        domains: [
            'Healthcare (HIPAA)',
            'Emergency notifications & geofencing',
            'Air travel',
            'Broadcast',
            'Retail',
        ],
    },

    /** Companies from the resume, shown as "experience at", never as clients. */
    experienceAt: (profile.experience as readonly Experience[])
        .filter(({ company }) => company !== 'BEhive Tech LLC')
        .map(({ company, formerly }) => (formerly ? `${company} (formerly ${formerly})` : company)),
} as const;
