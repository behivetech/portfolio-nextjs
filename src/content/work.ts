/**
 * The two projects shown under /work: the component registry and the AI agent
 * team. Both came out of BEhive Tech's own products and both are what gets
 * installed for clients, so each page ends by pointing at the matching service.
 */

import type { MaterialIconName } from '@/components/site/MaterialIcon';

export type Feature = {
    icon: MaterialIconName;
    title: string;
    body: string;
};

export type Step = {
    title: string;
    body: string;
};

export const registry = {
    slug: 'component-registry',
    href: '/work/component-registry',
    icon: 'widgets' as MaterialIconName,
    name: 'Component Registry',
    eyebrow: 'Component registry',
    headline: 'A component registry that stays in git.',
    summary:
        'One npm package per component, docs generated from the source, live examples, versions with Changesets, and a static site you can deploy anywhere. Open source under MIT.',
    highlights: [
        'The folder tree is the registry; a component is an npm package',
        'Docs, props table and changelog generated from the source at build time',
        'No auth, no database, no required environment variables',
    ],
    links: {
        site: 'https://platform.behivetech.com',
        docs: 'https://platform.behivetech.com/docs',
        tokens: 'https://platform.behivetech.com/tokens',
        repo: 'https://github.com/behivetech/bht-component-registry',
        npm: 'https://www.npmjs.com/package/create-bht-component-registry',
    },
    badges: ['Open source, MIT', 'Next.js static export', 'No database', 'No required env vars'],

    idea: [
        'Most component libraries end up with their documentation somewhere else: a hosted platform, a separate docs repo, a wiki that drifts. I built this registry on the opposite bet. Everything the docs need is already in the component\'s folder, so the folder tree is the registry and the docs are generated from it at build time.',
        'A change to a component changes its docs in the same pull request, reviewed together. There is no database to keep in step, no server to patch, and nothing to export if you stop using it: your components are npm packages in git, which is where they were anyway.',
        'I built it for my own library first. It is now the open-source template behind the Behive Tech registry, and the starting point I use when a client wants a design system with documentation that keeps up.',
    ],

    features: [
        {
            icon: 'widgets',
            title: 'One package per component',
            body: 'A scope owns categories, a category owns components, and each component folder is a complete npm package. Deleting a component is deleting a folder.',
        },
        {
            icon: 'auto-stories',
            title: 'Docs from the source',
            body: 'The Overview tab is the component\'s README, and its code blocks run live. The props table is built from the TypeScript interface and its JSDoc.',
        },
        {
            icon: 'play-circle',
            title: 'Live, editable examples',
            body: 'Each named export of a component\'s example file becomes an editable example on the Examples tab and the thumbnail in the catalog.',
        },
        {
            icon: 'history',
            title: 'Versions with Changesets',
            body: 'Every component is versioned and published on its own. The Changelog tab is the package\'s CHANGELOG, written by Changesets.',
        },
        {
            icon: 'tune',
            title: 'Status, tags and tokens',
            body: 'Stable, beta, draft or deprecated per component, tags for finding things, and an optional design tokens page generated from a scope\'s token sheet.',
        },
        {
            icon: 'public',
            title: 'Deploys anywhere',
            body: 'A static export that runs on Vercel, Netlify, Cloudflare Pages, S3 or the included Docker image. No auth, no database, no required environment variables.',
        },
    ] satisfies readonly Feature[],

    howItWorks: [
        {
            title: 'The folder tree is the registry',
            body: 'registry/<scope>/<category>/<name> is the npm package @<scope>/<category>.<name>, with its README, examples, source and changelog alongside.',
        },
        {
            title: 'A catalog is generated before every build',
            body: 'A script reads every package and writes the catalog the pages are generated from. Nothing is stored anywhere else, so nothing can drift.',
        },
        {
            title: 'Every package describes itself',
            body: 'Each component\'s build writes a docs file into the package, so a published tarball carries its own documentation and old versions can be documented from the registry alone.',
        },
        {
            title: 'Publishing is Changesets',
            body: 'Add a changeset, version, release. Publish to npmjs, GitHub Packages or a private registry by changing one value in the config file.',
        },
    ] satisfies readonly Step[],

    quickStart: ['npx create-bht-component-registry my-registry', 'cd my-registry', 'pnpm dev'],
    quickStartNote:
        'The command asks for your npm scope, the registry you publish to and the starter categories you want, then installs, builds and serves the docs site locally. The guide covers components, scopes, publishing, deploying and updating to newer versions of the template.',

    inProduction: [
        'The Behive Tech registry is this template running with my own scope: components from atoms through forms, molecules and organisms to page templates, each with its docs, live examples, props table and changelog.',
        'This site is one of its consumers. The buttons, cards, stats, hero banner and page template you are looking at are installed from that registry as npm packages and themed with its Material Design 3 token sheet.',
    ],

    expanded: {
        intro:
            'The open registry is complete on its own. The expanded version keeps all of it unchanged and layers a workspace for the people who maintain the registry on top.',
        features: [
            'A dashboard next to the public docs: sign in and see every component in your scope',
            'Status, tags and descriptions edited in place from a form, reflected on the public pages',
            'Roles: everyone in the organisation can author; deprecating a component or renaming the scope needs an admin',
            'An audit log of who changed what, when, per scope',
            'Sign-in with SSO through the identity provider you already have, with organisations mapping to scopes',
        ],
        fit: [
            'Your folders, config, Changesets flow and static docs are untouched; the layer renders with the same engine',
            'It runs on your infrastructure: your hosting, your database, your identity provider',
            'Remove the layer and you are back to the open registry with every component exactly where it was',
        ],
        note:
            'The expanded version is set up for your team as a consulting engagement: installation on your infrastructure, SSO wired to your provider, your existing components and metadata carried over, and a session for the people who will maintain it. Engagements are governed by a separate written agreement.',
    },
} as const;

export type Agent = {
    icon: MaterialIconName;
    name: string;
    model: string;
    job: string;
};

export type FlowStep = {
    step: string;
    body: string;
    /** A gate where a person decides */
    human?: boolean;
};

export const agentTeam = {
    slug: 'agent-team',
    href: '/work/agent-team',
    icon: 'group' as MaterialIconName,
    name: 'AI Agent Team',
    eyebrow: 'AI agent team',
    headline: 'An AI engineering team that works from your GitHub issues.',
    summary:
        'Six specialised Claude Code agents, the GitHub-issue workflow that coordinates them, the standards they follow, and the hooks that enforce them. Installed once as a plugin; every repository gets the same team.',
    highlights: [
        'UX, frontend, backend, reviewer, test and end-to-end agents, one job each',
        'Issues are the handoff; a person approves the design, the contract and the merge',
        'Hooks lint every file as it is written and keep lint configs off limits',
    ],

    idea: [
        'Autocomplete is not a workflow. The gain from AI shows up when the mechanical work moves off the people and onto agents: claiming an issue, implementing it, running the tests, answering review comments. The decisions stay with the people. This is the team I built to do that, and it builds my own products.',
        'It is a Claude Code plugin: six agents with one job each, four commands I run, the standards every agent carries, and three hooks that enforce those standards on every file an agent writes. Install it once and every repository on the machine gets the same team.',
        'GitHub issues are the handoff. Each agent reads the issue, does one step, posts a short comment (what it did, what it decided, what is open, what comes next) and moves the label. Nothing is approved by an agent.',
    ],

    agents: [
        {
            icon: 'palette',
            name: 'UX',
            model: 'Opus',
            job: 'Designs each feature in Figma from the issue and the repo\'s component registry, then posts the frames for approval. Never edits a file.',
        },
        {
            icon: 'code',
            name: 'Frontend',
            model: 'Sonnet',
            job: 'Builds the approved frames on the approved contract, in the project\'s frontend architecture, and opens the pull request.',
        },
        {
            icon: 'dns',
            name: 'Backend',
            model: 'Sonnet',
            job: 'Contract mode writes the schema, API shapes and auth rules as a draft PR. Build mode implements the approved contract with tests.',
        },
        {
            icon: 'reviews',
            name: 'Reviewer',
            model: 'Opus',
            job: 'Reviews every diff against the issue, the frames, the contract and the standards. Read-only: it reports, it changes nothing.',
        },
        {
            icon: 'fact-check',
            name: 'Test runner',
            model: 'Haiku',
            job: 'Runs unit tests, lint and type checks for a package or the whole repo and returns only the failures.',
        },
        {
            icon: 'devices',
            name: 'E2E runner',
            model: 'Haiku',
            job: 'Runs Playwright locally or against a Vercel preview deployment and returns only the failures.',
        },
    ] satisfies readonly Agent[],

    commands: [
        { name: 'plan-feature', body: 'Interviews you about an idea, explores the repo, proposes an epic and child issues, and creates them on your yes.' },
        { name: 'refine-issue', body: 'Turns a thin issue, the kind typed on a phone, into the full format every agent reads.' },
        { name: 'work-issue', body: 'Does whatever step comes next on an issue, from its labels, and stops at your gates.' },
        { name: 'status', body: 'What is waiting on you, what is ready for an agent, what is blocked or stale, and epic progress.' },
    ],

    flow: [
        { step: 'Issue', body: 'A feature becomes an epic and child issues in one format every agent reads.' },
        { step: 'Design & contract', body: 'The UX agent posts Figma frames; the backend agent opens the API contract as a draft PR.' },
        { step: 'Your approval', body: 'Nothing is built until you approve the frames and the contract.', human: true },
        { step: 'Build', body: 'Backend implements the contract with tests; frontend builds the frames on it; the PR opens.' },
        { step: 'Review & e2e', body: 'The reviewer checks the diff against spec, frames, contract and standards; e2e runs against the preview.' },
        { step: 'You merge', body: 'The last gate is a person.', human: true },
    ] satisfies readonly FlowStep[],

    guardrails: [
        {
            icon: 'lock',
            title: 'Lint configs are off limits',
            body: 'A hook blocks any agent edit to ESLint, Stylelint or Prettier configuration. Rule changes go through a person, in one standards repo, not through an agent working around a failure.',
        },
        {
            icon: 'fact-check',
            title: 'Every file is linted as it is written',
            body: 'A hook lints each file the moment an agent writes it and hands the errors straight back, so the standards are enforced before review rather than during it.',
        },
        {
            icon: 'tune',
            title: 'Model routing',
            body: 'Judgment calls run on the heaviest model, building on a mid-weight one, test and lint runs on the lightest. A hook trims long test logs to the failures so spend goes to the work, not to reading output.',
        },
        {
            icon: 'auto-stories',
            title: 'Standards travel as skills',
            body: 'Coding standards, frontend standards, backend architecture and the issue format are skills the agents carry, so every repository is held to the same rules.',
        },
        {
            icon: 'history',
            title: 'Memory that survives the session',
            body: 'Each agent keeps its own memory across repositories. A correction given once is applied next time without being asked, and lessons that hold are promoted into the agent prompt.',
        },
        {
            icon: 'reviews',
            title: 'A second opinion on every PR',
            body: 'An independent reviewer challenges each change so one model\'s blind spots are caught by another. People review design and correctness, and nothing merges without a person.',
        },
    ] satisfies readonly Feature[],

    anywhere: [
        'The team runs on a laptop, in Claude Code cloud sessions, and on a schedule. A script vendors the agents, skills and hooks into a repository so cloud sessions, which load nothing from your machine, carry the same team.',
        'Routines pick up labelled issues on the hour, review every opened pull request against its preview deployment, and run the full end-to-end suite nightly, posting only failures.',
    ],

    service: {
        heading: 'Built for you, around your tools',
        body:
            'This is the shape of the AI-Native Workflow Setup engagement. I design the team around your repository, your review process and the models and tools you have access to, install it, and train the people who will run it. The pieces stay the same: agents with one job each, an issue flow with human gates, standards enforced by hooks, and cross-model review so one model\'s blind spots are caught by another.',
        href: '/services#ai-native-workflow',
        label: 'The AI-Native Workflow service',
    },
} as const;

/** The two projects, in the order they appear on /work and the home page. */
export const projects = [registry, agentTeam] as const;
