"use client";
import React from 'react';
import getClassName from '@tools/getClassName';
import styles from './ScoreMetricDisplay.module.scss';

interface ScoreMetricDisplayProps {
    value: number;
    suffix?: string;
    label: string;
    isAhead: boolean;
    isEntering?: boolean;
    isExiting?: boolean;
}

export const ScoreMetricDisplay: React.FC<ScoreMetricDisplayProps> = ({
    value,
    suffix,
    label,
    isAhead,
    isEntering = false,
    isExiting = false
}) => {
    const [rootClass, getChildClass] = getClassName({
        rootClass: 'scoreMetricDisplay',
        modifiers: {
            ahead: isAhead,
            behind: !isAhead,
            entering: isEntering,
            exiting: isExiting
        },
        styles,
    });

    return (
        <div className={rootClass}>
            <div className={getChildClass('value')}>
                {value.toLocaleString()}
                {suffix && <span className={getChildClass('suffix')}> {suffix}</span>}
            </div>
            <div className={getChildClass('label')}>{label}</div>
        </div>
    );
};
