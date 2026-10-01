/**
 * Single source of truth for all site and resume content.
 * Update this file to change what appears on the home page and /resume.
 */

export type Experience = {
    company: string;
    formerly?: string;
    title: string;
    start: string;
    end: string;
    highlights: readonly string[];
};

export const profile = {
    name: 'Bruce Ultra',
    title: 'Software Architect & Principal Engineer',
    tagline: 'AI-Driven Engineering Leadership',
    location: 'Denver Metro, CO',
    siteUrl: 'https://behivetech.com',
    links: {
        linkedin: 'https://www.linkedin.com/in/bruce-ultra',
        github: 'https://github.com/behivetech',
    },
    years: '25+',
    openTo: 'Open to principal, staff & architect roles',
    heroStatement:
        'I design composable platforms and AI-native engineering workflows that let teams ship in parallel, faster, without regressions.',
    summary:
        'Principal software engineer and architect with 25+ years designing and delivering scalable, user-focused applications, from high-traffic consumer sites (southwest.com, 12M+ daily page views) to healthcare systems serving 500+ hospitals and emergency-notification platforms sending billions of alerts a year. Front-end specialist with deep expertise in React, Next.js, TypeScript, and micro frontends, combined with full-stack range and architectural leadership: Turborepo monorepos, atomic design systems, and independently deployable packages that let teams ship in parallel without regressions. Pioneers AI-native engineering: agentic, human-in-the-loop pipelines that take work from GitHub issue to reviewed pull request, cross-model AI code review, and cost-aware model orchestration.',
    seeking:
        'Seeking to drive technical vision and innovation as a principal engineer, staff engineer, or software architect: setting direction, mentoring teams, and modernizing legacy systems, workflows, and codebases.',
    stats: [
        { value: '25+', label: 'years building for the web' },
        { value: '12M+', label: 'daily page views at southwest.com' },
        { value: '500+', label: 'hospitals on a platform whose frontend I led' },
        { value: 'Billions', label: 'of life-safety alerts a year on platforms I build for' },
    ],
    highlights: [
        {
            title: 'Agentic, human-in-the-loop delivery',
            body: "Architected an AI-native development pipeline in which Claude Code agents claim GitHub issues, implement, run the test suite, and resolve GitHub Copilot's PR review feedback before a pull request ever reaches a human. Every change arrives pre-built, pre-tested, and already challenged by a second, independent AI reviewer, so human review focuses on design and correctness instead of nitpicks.",
        },
        {
            title: 'Cross-model AI code review',
            body: "Deliberately pairs competing AI systems (Claude Code as author, Copilot as reviewer) so each model's blind spots are caught by the other, a quality-gate pattern for teams adopting AI-generated code at scale.",
        },
        {
            title: 'Agent orchestration & cost governance',
            body: 'Designs multi-agent workflows with specialized subagents running in parallel, routing mechanical work (linting, test runs) to lightweight models and reserving frontier models for architecture and judgment calls, which keeps AI spend proportional to value. MCP servers and CLI integrations give agents direct, auditable access to repos, issues, and PRs.',
        },
        {
            title: 'Composable, modular architecture',
            body: 'Designs micro-frontend and packaged-component architectures in Turborepo monorepos, with pnpm workspaces, Changesets versioning, and a component registry where every component is its own published package, where each product ships as an independently versioned, deployable module on shared foundations, so new products launch as modules, not new codebases.',
        },
        {
            title: 'Atomic design systems',
            body: 'Hand-builds component libraries from atoms through organisms to full page templates, accessible and internationalized from day one, so UI stays consistent across products and a change lands in one place instead of fifty.',
        },
        {
            title: 'Engineering standards that scale',
            body: 'Champions strongly typed contracts (TypeScript), composable hooks and data layers (React Query), automated testing and CI/CD, and living documentation, including interactive visual guides that onboard engineers onto new architectural patterns.',
        },
    ],
    skills: [
        {
            group: 'Architecture & system design',
            items: ['Micro frontends', 'Turborepo monorepos', 'Component registries', 'pnpm workspaces & Changesets', 'Atomic design', 'Design systems', 'Multi-tenant SaaS', 'API design', 'Scalability', 'Legacy modernization'],
        },
        {
            group: 'AI development tools & workflows',
            items: ['Claude Code', 'GitHub Copilot', 'MCP servers', 'Subagent orchestration', 'Agentic coding', 'AI code review', 'Human-in-the-loop workflows', 'Model routing'],
        },
        {
            group: 'Frontend',
            items: ['React', 'Next.js (App & Pages Router)', 'Server & client components', 'React Native', 'TypeScript', 'JavaScript', 'Electron', 'HTML', 'CSS/Sass', 'React Query', 'i18n (react-intl, Lingui)', 'Highcharts', 'Accessibility', 'Performance optimization'],
        },
        {
            group: 'Backend & data',
            items: ['Node.js', 'Postgres', 'SQL', 'Prisma', 'REST APIs', 'WebSockets & real-time messaging', 'Multi-tenant auth & SSO', 'Auth.js (NextAuth)'],
        },
        {
            group: 'Geospatial',
            items: ['Mapbox', 'Geofencing', 'Location-based alerting'],
        },
        {
            group: 'Leadership & delivery',
            items: ['Technical strategy', 'Multi-team frontend leadership', 'Technical hiring', 'Mentoring', 'CI/CD', 'Cross-platform desktop release engineering', 'SAFe Agile'],
        },
    ],
    experience: [
        {
            company: 'Crisis24',
            formerly: 'OnSolve',
            title: 'Senior Software Engineer',
            start: 'Aug 2022',
            end: 'Sep 2026',
            highlights: [
                'Architected enterprise React web applications for critical-event notification and geofenced alert targeting on a platform that sends billions of alerts a year for thousands of organizations, where reliability is a life-safety requirement.',
                'Built a cross-platform Electron desktop alerting client for Crisis24 and CodeRED customers: a background system-tray app that receives alerts in real time over WebSockets, surfaces them as foreground notifications, and captures recipient responses, all driven by settings managed on the web platform and local config files.',
                "Built most of the desktop client's CI/CD pipeline and installer packaging, shipping signed, platform-certified releases for Windows and macOS in partnership with DevOps.",
                'Served as shared tech lead, defining component design and application architecture standards across frontend teams, and mentored engineers through the OnSolve-to-Crisis24 acquisition and integration.',
            ],
        },
        {
            company: 'BEhive Tech LLC',
            title: 'Principal Software Engineer (Consulting)',
            start: 'Sep 2020',
            end: 'Present',
            highlights: [
                'Designed and delivered multi-tenant SaaS applications end to end, from data modeling and organization-level access control through production launch.',
                'Built a Next.js App Router inventory management application for a small-business client: a multi-tenant Prisma and Postgres data model for organizations, roles, and inventory across store locations, Auth.js (NextAuth) sign-in with GitHub, Google, and Auth0, and middleware-protected routes.',
                'Built a shared component library as a Turborepo monorepo of atomic-design React packages, versioned with Changesets and published to a private registry so each app pulls in only the packages it needs.',
                'Rebuilt behivetech.com on Next.js 16 and that component library, moving it from the Pages Router to the App Router with static generation, the Metadata API, generated Open Graph images, and JSON-LD structured data.',
                'Architected modular, micro-frontend-based applications in which independently deployable modules share common foundations and component libraries.',
                'Built interactive mapping and location-based experiences used in live, real-world settings.',
                'Prototyped a custom Shopify app in React with inventory barcode and labeling features for a family gem and mineral business.',
                'Delivered architecture, consulting, and development for clients on 1099 and W-2 contracts, including Outside Magazine and Hotel Engine, focused on user experience and integration with existing APIs, and mentored developers through Codementor.',
            ],
        },
        {
            company: 'Broadcom (Rally)',
            title: 'Senior Software Engineer',
            start: 'Dec 2019',
            end: 'Aug 2020',
            highlights: [
                "Architected a new reporting system in React and Highcharts for Rally's agile management platform, with accessibility, i18n, and full cross-browser support.",
                "Proposed and built a library of reusable UI components adopted across Rally's frontend ecosystem.",
                'Designed URL-based report sharing, turning static reports into shareable links and speeding collaboration across teams.',
            ],
        },
        {
            company: 'PipelineRx',
            title: 'Principal Software Engineer',
            start: 'Jan 2018',
            end: 'May 2019',
            highlights: [
                'Led frontend architecture across two scrum teams (6–9 developers), replacing a legacy pharmacy system with a modern React SPA, and served on the hiring team interviewing and evaluating engineering candidates.',
                'Designed clinical workflows with UX for a remote pharmacy platform used by 500+ hospitals to verify 15M+ medication orders a year.',
                'Integrated allergy and medication-conflict alerts that help pharmacists stop harmful prescriptions, in a HIPAA-regulated environment.',
            ],
        },
        {
            company: 'EchoStar',
            title: 'Senior UI Developer',
            start: 'Aug 2016',
            end: 'Dec 2017',
            highlights: [
                'Built a platform consolidating device-guide metadata for DISH into a single unified system, replacing fragmented sources.',
            ],
        },
        {
            company: 'Southwest Airlines',
            title: 'Senior UI Developer',
            start: 'Dec 2014',
            end: 'Jun 2016',
            highlights: [
                'Helped build the React-based southwest.com, serving 12M+ daily page views and 2.2M+ unique visitors.',
                'Worked on the lead team that built the core shared components and the Flight Status experience, then focused primarily on the Booking flow.',
            ],
        },
        {
            company: 'MapMyFitness (Under Armour)',
            title: 'Software Engineer',
            start: 'Sep 2012',
            end: 'Jul 2014',
            highlights: [
                'Shipped features and marketing integrations for GPS fitness-tracking apps across web and mobile.',
            ],
        },
    ],
    earlierCareer:
        'Frontend engineering, application development, and design for JCPenney, Nerium, and Dallas-area agencies (Temerlin McClain, Ackerman McQueen, Levenson & Hill).',
    education: [
        { degree: 'BAAS, Applied Arts & Sciences', school: 'University of North Texas' },
        { degree: 'AAS, Interactive Design', school: 'Collin County Community College' },
        { degree: 'AAS, Biomedical Engineering Technology', school: 'Texas State Technical College' },
    ],
    certifications: ['SAFe Agilist', 'Continuous Integration and Continuous Delivery with GitLab'],
} as const;
