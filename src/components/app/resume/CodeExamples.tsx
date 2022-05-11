import React from 'react';

import getClassName from 'tools/getClassName';
import { ResumePageProps } from 'pages/resume';

import Link from 'components/core/Link';
import Headline from 'components/core/Headline';
import ContentfulElementParser from 'components/app/ContentfulElementParser';
// import Skillsets from './Skillsets';

const Skillsets = () => null;

type CodeExamplesProps = {
    className?: string,
    codeExamples: ResumePageProps['codeExamples']
};

export default function CodeExamples({ className, codeExamples }: CodeExamplesProps) {
    const [rootClassName] = getClassName({className, rootClass: 'code-examples'});

    return (
        <section className={rootClassName}>
            <Headline level={3} size={2}>
                Code Examples
            </Headline>
            {codeExamples.map(({fields: {name, description, url, skillsLink}}) => (
                <section key={name}>
                    <Headline level={4} size={3}>
                        <Link href={url} target="_blank">
                            {name}
                        </Link>
                    </Headline>
                    <ContentfulElementParser content={description} />
                    <section>
                        <Headline level={5}>Skills Used</Headline>
                        {/* <Skillsets skills={skillsLink} /> */}
                    </section>
                </section>
            ))}
        </section>
    );
}
