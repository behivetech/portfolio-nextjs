import React from 'react';

import getClassName from 'tools/getClassName';
import { useData } from 'components/providers/DataProvider';

import Badge from 'components/core/Badge';
import { HomeProps } from '../../../pages/index';

import styles from './Skillsets.module.scss';

type SkillsetsProps = {
    className?: string,
    skills: HomeProps.skills
};

export default function Skillsets({ className, skills }: SkillsetsProps) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'skillsets',
        styles,
    });

    return skills?.length ? (
        <div className={rootClassName}>
            {skills.map(({ name }) => (
                <Badge className={getChildClass('skill')} key={name}>
                    {name}
                </Badge>
            ))}
        </div>
    ) : null;
}
