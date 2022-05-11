import React from 'react';
import { map } from 'lodash';

import getClassName from 'tools/getClassName';

import Headline from 'components/core/Headline';
import Skillsets from './Skillsets';
import { HomeProps } from '../../../pages/index';

type ResumeSkillsetsParams = {
    className?: string,
    headlineSize?: 1 | 2 | 3 | 4 | 5 | 6
    skills: HomeProps['skills']
};

export default function ResumeSkillsets({
    className,
    headlineSize = 2,
    skills,
}: ResumeSkillsetsParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'resume-skillsets',
    });

    return (
        <section className={rootClassName}>
            <Headline level={3} size={headlineSize}>
                Skillsets
            </Headline>
            <Skillsets skills={skills} />
        </section>
    );
}
