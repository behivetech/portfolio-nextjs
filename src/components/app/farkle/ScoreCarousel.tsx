import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import getClassName from '@tools/getClassName';
import styles from './ScoreCarousel.module.scss';
import { useFarkle } from './FarkleProvider';

interface ScoreCarouselProps {
    currentUserScore: number;
    allUserScores: number[];
    className?: string;
}

interface ScoreMetric {
    label: string;
    value: number;
    suffix?: string;
    isAhead?: boolean; // true if ahead (green), false if behind (red)
}

export const ScoreCarousel: React.FC<ScoreCarouselProps> = ({
    currentUserScore,
    allUserScores,
    className
}) => {
    const { targetScore } = useFarkle();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const scoreMetrics: ScoreMetric[] = useMemo(() => {
        const sortedScores = [...allUserScores].sort((a, b) => b - a);
        const highestScore = sortedScores[0] || 0;
        const secondHighestScore = sortedScores[1] || 0;
        const isCurrentUserHighest = currentUserScore === highestScore;
        const anyoneMetTarget = sortedScores.some(score => score >= targetScore);

        const metrics: ScoreMetric[] = [];

        // Show ahead/behind if there are multiple users
        if (allUserScores.length > 1) {
            if (isCurrentUserHighest) {
                // If user is in the lead, show how far ahead they are (green)
                const leadAmount = currentUserScore - secondHighestScore;
                metrics.push({
                    label: 'Ahead',
                    value: leadAmount,
                    suffix: 'pts',
                    isAhead: true // Ahead is green
                });
            } else {
                // If user is not in the lead, show how far behind they are (red)
                const behindAmount = highestScore - currentUserScore;
                metrics.push({
                    label: 'Behind',
                    value: behindAmount,
                    suffix: 'pts',
                    isAhead: false // Behind is red
                });
            }
        }

        // Only show distance to target score if no one has reached it yet
        if (!anyoneMetTarget) {
            const toTarget = targetScore - currentUserScore;
            const isAboveTarget = currentUserScore >= targetScore;
            metrics.push({
                label: `To ${targetScore.toLocaleString()}`,
                value: toTarget,
                suffix: 'pts',
                isAhead: isAboveTarget // Above target is green, below is red
            });
        }

        return metrics;
    }, [currentUserScore, allUserScores, targetScore]);

    // Auto-rotate through the metrics
    useEffect(() => {
        if (scoreMetrics.length <= 1) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setPreviousIndex(currentIndex);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % scoreMetrics.length);

            // Clear the exiting element after animation completes
            setTimeout(() => {
                setIsTransitioning(false);
                setPreviousIndex(null);
            }, 500);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [scoreMetrics.length, currentIndex]);

    // Early return
    if (scoreMetrics.length === 0) {
        return null;
    }

    // Non-hook logic
    const currentMetric = scoreMetrics[currentIndex];
    const previousMetric = previousIndex !== null ? scoreMetrics[previousIndex] : null;

    // If no metrics available, don't render anything
    if (!currentMetric) {
        return null;
    }

    const [rootClass, getChildClass] = getClassName({
        className,
        rootClass: 'scoreCarousel',
        styles,
    });

    const [currentContentClass] = getClassName({
        rootClass: 'scoreCarousel__content',
        modifiers: {
            ahead: !!currentMetric?.isAhead,
            behind: !currentMetric?.isAhead,
            entering: isTransitioning
        },
        styles,
    });

    const [previousContentClass] = previousMetric ? getClassName({
        rootClass: 'scoreCarousel__content',
        modifiers: {
            ahead: !!previousMetric?.isAhead,
            behind: !previousMetric?.isAhead,
            exiting: true
        },
        styles,
    }) : ['', () => ''];

    return (
        <div className={rootClass}>
            <div className={getChildClass('contentWrapper')}>
                {isTransitioning && previousMetric && (
                    <div className={previousContentClass}>
                        <div className={getChildClass('value')}>
                            {previousMetric.value.toLocaleString()}
                            {previousMetric.suffix && (
                                <span className={getChildClass('suffix')}> {previousMetric.suffix}</span>
                            )}
                        </div>
                        <div className={getChildClass('label')}>{previousMetric.label}</div>
                    </div>
                )}
                <div className={currentContentClass}>
                    <div className={getChildClass('value')}>
                        {currentMetric.value.toLocaleString()}
                        {currentMetric.suffix && (
                            <span className={getChildClass('suffix')}> {currentMetric.suffix}</span>
                        )}
                    </div>
                    <div className={getChildClass('label')}>{currentMetric.label}</div>
                </div>
            </div>
        </div>
    );
};
