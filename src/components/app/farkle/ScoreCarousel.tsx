"use client";
import React, { useMemo, useState, useEffect } from 'react';
import getClassName from '@tools/getClassName';
import styles from './ScoreCarousel.module.scss';
import { useFarkle } from './FarkleProvider';
import { ScoreMetricDisplay } from './ScoreMetricDisplay';

interface ScoreCarouselProps {
    className?: string;
}

interface ScoreMetric {
    label: string;
    value: number;
    suffix?: string;
    isAhead: boolean;
}

export const ScoreCarousel: React.FC<ScoreCarouselProps> = ({
    className
}) => {
    const { targetScore, currentUserScore, userScores, currentUserIndex } = useFarkle();
    const allUserScores = userScores;
    const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const scoreMetrics = useMemo(() => {
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
            metrics.push({
                label: `To ${targetScore.toLocaleString()}`,
                value: toTarget,
                suffix: 'pts',
                isAhead: false // Below target is red
            });
        } else if (allUserScores.length === 1) {
            // If single player and they've reached the target, show "Winner!"
            metrics.push({
                label: 'Winner!',
                value: currentUserScore,
                suffix: 'pts',
                isAhead: true // Green for winner
            });
        }

        return metrics;
    }, [currentUserScore, allUserScores, targetScore]);

    // Auto-rotate through metrics if there's more than one
    useEffect(() => {
        const interval = scoreMetrics.length > 1 ? setInterval(() => {
            setIsTransitioning(true);
            setPreviousIndex(currentMetricIndex);
            setCurrentMetricIndex((prevIndex) => (prevIndex + 1) % scoreMetrics.length);

            setTimeout(() => {
                setIsTransitioning(false);
                setPreviousIndex(null);
            }, 500);
        }, 3000) : undefined;

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [scoreMetrics.length, currentMetricIndex]);

    const safeCurrentIndex = Math.min(currentMetricIndex, scoreMetrics.length - 1);
    const currentMetric = scoreMetrics[safeCurrentIndex];
    const previousMetric = previousIndex !== null && previousIndex < scoreMetrics.length ? scoreMetrics[previousIndex] : null;

    const [rootClass, getChildClass] = getClassName({
        className,
        rootClass: 'scoreCarousel',
        styles,
    });

    return (
        <div className={rootClass}>
            <div className={getChildClass('contentWrapper')}>
                {isTransitioning && previousMetric && (
                    <ScoreMetricDisplay
                        value={previousMetric.value}
                        suffix={previousMetric.suffix}
                        label={previousMetric.label}
                        isAhead={previousMetric.isAhead}
                        isExiting={true}
                    />
                )}
                <ScoreMetricDisplay
                    value={currentMetric.value}
                    suffix={currentMetric.suffix}
                    label={currentMetric.label}
                    isAhead={currentMetric.isAhead}
                    isEntering={isTransitioning}
                />
            </div>
        </div>
    );
};
