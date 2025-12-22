import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import getClassName from '@tools/getClassName';
import styles from './ScoreCarousel.module.scss';

interface ScoreCarouselProps {
    currentUserScore: number;
    allUserScores: number[];
    className?: string;
}

interface ScoreMetric {
    label: string;
    value: number;
    suffix?: string;
    isAboveTarget?: boolean;
}

export const ScoreCarousel: React.FC<ScoreCarouselProps> = ({
    currentUserScore,
    allUserScores,
    className
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scoreMetrics: ScoreMetric[] = React.useMemo(() => {
        const sortedScores = [...allUserScores].sort((a, b) => b - a);
        const highestScore = sortedScores[0] || 0;
        const secondHighestScore = sortedScores[1] || 0;
        const isCurrentUserHighest = currentUserScore === highestScore;
        const targetScore = 25000;

        const metrics: ScoreMetric[] = [];

        if (isCurrentUserHighest && allUserScores.length > 1) {
            // If user is in the lead, show how far ahead they are
            const leadAmount = currentUserScore - secondHighestScore;
            metrics.push({
                label: 'Ahead',
                value: leadAmount,
                suffix: 'pts'
            });
        } else {
            // If user is not in the lead, show how far behind they are
            const behindAmount = highestScore - currentUserScore;
            metrics.push({
                label: 'Behind',
                value: behindAmount,
                suffix: 'pts'
            });
        }

        // Always show distance to target score (negative if above target)
        const toTarget = targetScore - currentUserScore;
        const isAboveTarget = currentUserScore >= targetScore;
        metrics.push({
            label: `To ${targetScore.toLocaleString()}`,
            value: toTarget,
            suffix: 'pts',
            isAboveTarget
        });

        return metrics;
    }, [currentUserScore, allUserScores]);

    // Auto-rotate through the metrics
    useEffect(() => {
        if (scoreMetrics.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % scoreMetrics.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [scoreMetrics.length]);

    if (scoreMetrics.length === 0) {
        return null;
    }

    const currentMetric = scoreMetrics[currentIndex];

    const [rootClass, getChildClass] = getClassName({
        className,
        rootClass: 'scoreCarousel',
        modifiers: {
            aboveTarget: Boolean(currentMetric.isAboveTarget),
            belowTarget: Boolean(!currentMetric.isAboveTarget && currentMetric.label.includes('To 25'))
        },
        styles,
    });

    return (
        <div className={rootClass}>
            <div className={getChildClass('content')}>
                <div className={getChildClass('value')}>
                    {currentMetric.value.toLocaleString()}
                    {currentMetric.suffix && (
                        <span className={getChildClass('suffix')}> {currentMetric.suffix}</span>
                    )}
                </div>
                <div className={getChildClass('label')}>{currentMetric.label}</div>
            </div>
            {scoreMetrics.length > 1 && (
                <div className={getChildClass('indicators')}>
                    {scoreMetrics.map((_, index) => (
                        <button
                            key={index}
                            className={classnames(
                                getChildClass('indicator'),
                                { [getChildClass('indicator--active')]: index === currentIndex }
                            )}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`View ${scoreMetrics[index].label} metric`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
