import React, { forwardRef } from 'react';
import getClassName from '@tools/getClassName';
import styles from './UserScore.module.scss';
import Headline from '@core/Headline';
import Button from '@core/Button';

interface UserScoreProps {
    name: string;
    scores: number[];
    selected?: boolean;
}

export const UserScore = forwardRef<HTMLDivElement, UserScoreProps>(({
    name,
    selected = false,
    scores
}, ref) => {
    const [rootClass, getChildClass] = getClassName({
        rootClass: 'userScore',
        modifiers: {selected},
        styles,
    });

    return (
        <section className={rootClass} ref={ref}>
            <Headline level={2} className={getChildClass('headline')}>{name}</Headline>
            <div className={getChildClass('score')}>{scores.reduce((total, score) => total + score, 0)}</div>
        </section>
    );
})

UserScore.displayName = 'UserScore';
