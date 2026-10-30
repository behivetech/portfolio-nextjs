import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@behivetech/atoms.badge';
import { Button } from '@behivetech/atoms.button';
import { Card } from '@behivetech/atoms.card';
import { getClassName } from '@behivetech/get-class-name';

import { site } from '@/content/site';
import { agentTeam } from '@/content/work';
import CtaBand from '@/components/site/CtaBand';
import MaterialIcon from '@/components/site/MaterialIcon';
import PageHero from '@/components/site/PageHero';
import Section from '@/components/site/Section';

import styles from './agent-team.module.scss';

export const metadata: Metadata = {
    title: 'AI Agent Team',
    description:
        'Six specialised Claude Code agents that work from GitHub issues: UX, frontend, backend, reviewer, test and end-to-end runners, with human gates, enforced standards and cross-model review. Built and run by BEhive Tech.',
    alternates: { canonical: agentTeam.href },
    openGraph: { url: agentTeam.href, title: 'AI Agent Team | BEhive Tech' },
};

export default function AgentTeamPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'agent-team',
        styles,
    });
    // A step is an element with its own modifier, so it gets its own class builder.
    const flowStepClassName = (human: boolean) =>
        getClassName({ rootClass: 'agent-team__flow-step', modifiers: { human }, styles })[0];

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow={agentTeam.eyebrow}
                headline={agentTeam.headline}
                subtext={agentTeam.summary}
                ctas={[
                    { label: site.cta.primary, href: '/contact', variant: 'primary' },
                    { label: agentTeam.service.label, href: agentTeam.service.href, variant: 'secondary' },
                ]}
            />

            <Section id="idea" eyebrow="The idea" title="Agents do the steps. People make the calls.">
                <div className={getChildClass('prose')}>
                    {agentTeam.idea.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </Section>

            <Section id="team" eyebrow="The team" title="Six agents, one job each">
                <div className={getChildClass('grid')}>
                    {agentTeam.agents.map(({ icon, name, model, job }) => (
                        <Card
                            key={name}
                            icon={<MaterialIcon name={icon} />}
                            title={name}
                            action={<Badge className={getChildClass('model')}>{model}</Badge>}
                            padding="lg"
                            className={getChildClass('card')}
                        >
                            <p>{job}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section id="flow" eyebrow="The flow" title="From issue to merged pull request">
                <ol className={getChildClass('flow')} aria-label="Workflow steps">
                    {agentTeam.flow.map(({ step, body, human }) => (
                        <li key={step} className={flowStepClassName(Boolean(human))}>
                            <h3 className={getChildClass('flow-title')}>{step}</h3>
                            <p className={getChildClass('flow-body')}>{body}</p>
                        </li>
                    ))}
                </ol>
                <p className={getChildClass('legend')}>
                    <MaterialIcon name="person" size={18} /> Highlighted steps are yours. Agents move the labels; they never approve.
                </p>
            </Section>

            <Section id="commands" eyebrow="Your commands" title="Four commands you run">
                <dl className={getChildClass('commands')}>
                    {agentTeam.commands.map(({ name, body }) => (
                        <div key={name} className={getChildClass('command')}>
                            <dt className={getChildClass('command-name')}>
                                <code>/{name}</code>
                            </dt>
                            <dd className={getChildClass('command-body')}>{body}</dd>
                        </div>
                    ))}
                </dl>
            </Section>

            <Section id="guardrails" eyebrow="Guardrails" title="Standards enforced, not suggested">
                <div className={getChildClass('grid')}>
                    {agentTeam.guardrails.map(({ icon, title, body }) => (
                        <Card key={title} icon={<MaterialIcon name={icon} />} title={title} padding="lg" className={getChildClass('card')}>
                            <p>{body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section id="where-it-runs" eyebrow="Where it runs" title="Laptop, cloud, and on a schedule">
                <div className={getChildClass('prose')}>
                    {agentTeam.anywhere.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </Section>

            <Section id="service" eyebrow="As a service" title={agentTeam.service.heading}>
                <div className={getChildClass('prose')}>
                    <p>{agentTeam.service.body}</p>
                </div>
                <div className={getChildClass('actions')}>
                    <Button asChild>
                        <Link href="/contact">{site.cta.primary}</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href={agentTeam.service.href}>{agentTeam.service.label}</Link>
                    </Button>
                </div>
            </Section>

            <CtaBand heading="Want a team like this in your repos?" body="I design it around your repository, review process and tools, install it, and train the people who will run it. A short call is the quickest way to find out what that would look like for you." />
        </div>
    );
}
