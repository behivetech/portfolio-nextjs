import React, { useMemo, useRef, useState } from 'react';
import Button from '@core/Button';
import getClassName from '@tools/getClassName';
import { UserScore } from './UserScore';
import styles from './Farkle.module.scss';
import Headline from '@core/Headline';
import { UserScoreList } from './UserScoreList';
import { AddScore } from './AddScore';
import { AddUser } from './AddUser';
import ForwardSharpIcon from '@mui/icons-material/ForwardSharp';
import { IconButton } from '@core/IconButton';
import { Keyboard } from './Keyboard';
import { ScoreCarousel } from './ScoreCarousel';
import { FarkleSettings } from './FarkleSettings';
import { useFarkle } from './FarkleProvider';

export const Farkle = () => {
    const {
        users,
        currentUserIndex,
        setCurrentUserIndex,
        addUser: addUserToProvider,
        addScore: addScoreToProvider,
        editScore: editScoreInProvider,
        deleteScore: deleteScoreInProvider,
        targetScore,
        resetUsers: resetUsersInProvider,
        resetScores: resetScoresInProvider
    } = useFarkle();
    const [scoreFocus, setScoreFocus] = useState<boolean>(false);
    const userScoreListRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scoreRef = useRef<HTMLInputElement>(null);

    const userScores = useMemo(() => {
        return users.map(({ scores }) => scores.reduce((total, score) => total + score, 0));
    }, [users]);

    const addUser = (user: { name: string; scores: number[] }) => {
        addUserToProvider(user);
    }

    const editScore = (userIndex: number, scoreIndex: number, score: number) => {
        editScoreInProvider(userIndex, scoreIndex, score);
    }

    const deleteScore = (userIndex: number, scoreIndex: number) => {
        deleteScoreInProvider(userIndex, scoreIndex);
    }

    const resetUsers = () => {
        resetUsersInProvider();
    }

    const resetScores = () => {
        resetScoresInProvider();
    }

    const handleNextClick = (newIndex: number) => {
        const userLength = users.length;
        let nextIndex = newIndex;

        if (newIndex < 0) {
            nextIndex = userLength - 1;
        } else if (newIndex >= userLength) {
            nextIndex = 0;
        }

        setScoreFocus(true);
        setCurrentUserIndex(nextIndex);

        // Scroll to the selected userKeyboard_farkleKeyboard__1iZTMkey
        if (userRefs.current[nextIndex]) {
            userRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const addScore = (score: number) => {
        const oldTotal = users[currentUserIndex].scores.reduce((sum, s) => sum + s, 0);
        const newTotal = oldTotal + score;

        // Check if crossed target score threshold
        if (oldTotal < targetScore && newTotal >= targetScore) {
            // Vibrate pattern: short-pause-short
            // iOS Safari doesn't support navigator.vibrate, so we try multiple methods
            if ('vibrate' in navigator) {
                try {
                    navigator.vibrate([200, 100, 200]);
                } catch (err) {
                    console.log('Vibration not supported:', err);
                }
            }

            // Additional haptic feedback for iOS (via audio context)
            // iOS requires user interaction to play audio, but button clicks count
            try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

                // Create a very short silent audio to trigger haptic feedback on iOS
                const buffer = audioContext.createBuffer(1, 1, 22050);
                const source = audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start(0);
            } catch (err) {
                console.log('Haptic feedback not available:', err);
            }

            // Play celebratory tone using Web Audio API
            try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                // Victory tone
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (err) {
                console.log('Audio playback not available:', err);
            }

            // Flash background red/green 4 times
            const body = document.body;
            const originalBg = body.style.backgroundColor;
            let flashCount = 0;
            const flashInterval = setInterval(() => {
                if (flashCount >= 8) { // 4 full cycles (red + green = 2 flashes per cycle)
                    clearInterval(flashInterval);
                    body.style.backgroundColor = originalBg;
                    return;
                }

                // Alternate between red and green (same colors as carousel)
                body.style.backgroundColor = flashCount % 2 === 0 ? '#ff5983' : '#4ade80';
                flashCount++;
            }, 150); // Flash every 150ms
        }

        addScoreToProvider(currentUserIndex, score);
        handleNextClick(currentUserIndex + 1);
    }

    const [rootClass, getChildClass] = getClassName({
        rootClass: 'farkle',
        styles,
    });

    return (
        <div className={rootClass}>
            <header className={getChildClass('header')}>
                <Headline level={1} className={getChildClass('headerHeadline')}>Farkle Scores</Headline>
                <FarkleSettings />
            </header>
            <section className={getChildClass('content')}>
                <aside className={getChildClass('users')}>
                    {!!users.length &&
                        <div className={getChildClass('usersList')} ref={userScoreListRef}>
                            {users.map(({ name, scores }, index) => {
                                return (
                                    <UserScore
                                        key={name}
                                        name={name}
                                        onClick={() => handleNextClick(index)}
                                        scores={scores}
                                        ref={el => userRefs.current[index] = el}
                                        selected={index === currentUserIndex}
                                    />
                                );
                            })}
                        </div>
                    }
                    <AddUser addUser={addUser} />
                </aside>
                {!!users.length &&
                    <section className={getChildClass('userInfo')}>
                        <ScoreCarousel
                            currentUserScore={userScores[currentUserIndex] || 0}
                            allUserScores={userScores}
                            className={getChildClass('difference')}
                        />
                        <Keyboard onSubmit={addScore} />
                        <UserScoreList
                            className={getChildClass('userScoreList')}
                            deleteScore={(scoreIndex: number) => deleteScore(currentUserIndex, scoreIndex)}
                            editScore={(scoreIndex, score) => editScore(currentUserIndex, scoreIndex, score)}
                            currentUserIndex={currentUserIndex}
                            scores={users[currentUserIndex]?.scores ?? []}
                        />
                    </section>
                }
            </section>
            <footer className={getChildClass('footer')}>
                <Button size="small" onClick={resetScores}>Reset Scores</Button>
                <Button size="small" onClick={resetUsers}>Reset Farkle</Button>
            </footer>
        </div>
    );
}
