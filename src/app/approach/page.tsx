import type { Metadata } from 'next';
import { getClassName } from '@behivetech/get-class-name';

import { site } from '@/content/site';
import CtaBand from '@/components/site/CtaBand';
import PageHero from '@/components/site/PageHero';
import MaterialIcon from '@/components/site/MaterialIcon';
import Section from '@/components/site/Section';
import TermsStrip from '@/components/site/TermsStrip';

import styles from './approach.module.scss';

export const metadata: Metadata = {
    title: 'Approach',
    description:
        'How BEhive Tech works: composable architecture, an AI development pipeline with human review built in, and maintainability standards that hold up after the engagement ends.',
    alternates: { canonical: '/approach' },
    openGraph: { url: '/approach', title: 'Approach | BEhive Tech' },
};

export default function ApproachPage() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'approach',
        styles,
    });

    return (
        <div className={rootClassName}>
            <PageHero
                eyebrow="Approach"
                headline="Speed that does not come back as bugs."
                subtext="Most teams can go faster. The hard part is doing it without turning the codebase into something nobody wants to touch. These are the three things I bring to every engagement."
            />

            <Section id="principles" eyebrow="How I work" title="Three things I bring to every engagement">
                <ol className={getChildClass('principles')}>
                    {site.approach.map(({ icon, title, body }) => (
                        <li key={title} className={getChildClass('principle')}>
                            <div className={getChildClass('principle-head')}>
                                <span className={getChildClass('icon')}>
                                    <MaterialIcon name={icon} size={28} />
                                </span>
                                <h3 className={getChildClass('principle-title')}>{title}</h3>
                            </div>
                            <p className={getChildClass('principle-body')}>{body}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section id="pipeline" eyebrow="The AI pipeline" title="From GitHub issue to reviewed pull request">
                <div className={getChildClass('prose')}>
                    <p>
                        Here is one pipeline I have built, as an example of the principle. It is not autocomplete. An agent claims an issue, reads the codebase, implements the change, runs the test suite, and opens a pull request. A second, independent AI reviewer reads that PR and pushes back. The agent resolves the feedback. Only then does a person look at it.
                    </p>
                    <p>
                        By the time a human reviews, the change is already built, tested, and challenged by a reviewer with different blind spots than the author. Human review goes where it matters: is this the right design, and is it correct?
                    </p>
                    <p>
                        Cost stays in check through model routing. Linting, formatting, and test runs go to lightweight models. Architecture decisions and judgment calls go to frontier models. MCP servers and CLI integrations give agents direct, auditable access to the repo, issues, and PRs, so nothing happens that you cannot trace.
                    </p>
                </div>
                <ol className={getChildClass('flow')} aria-label="Pipeline steps">
                    {['Issue claimed', 'Implemented & tested', 'AI cross-review', 'Human review', 'Merged'].map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </Section>

            <Section id="engagement" eyebrow="Working together" title="How an engagement runs">
                <ol className={getChildClass('steps')}>
                    {site.engagement.map(({ icon, step, body }) => (
                        <li key={step} className={getChildClass('step')}>
                            <div className={getChildClass('step-head')}>
                                <MaterialIcon name={icon} className={getChildClass('step-icon')} />
                                <h3 className={getChildClass('step-title')}>{step}</h3>
                            </div>
                            <p className={getChildClass('step-body')}>{body}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <TermsStrip />

            <CtaBand />
        </div>
    );
}
