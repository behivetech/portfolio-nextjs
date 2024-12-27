import React, { useEffect, useMemo, useRef, useState } from 'react';
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

interface Users {
    name: string;
    scores: number[];
}

type FarkleState = Users[];

const LOCAL_STORAGE_KEY = 'farkle__users';

const getLocalStorage = (): FarkleState => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedData = JSON.parse(data ?? '[]');

    return Array.isArray(parsedData) ? parsedData : [];
}

const setLocalStorage = (data: FarkleState) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const Farkle = () => {
    const [users, setUsers] = useState<FarkleState>([]);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
    const [scoreFocus, setScoreFocus] = useState<boolean>(false);
    const userScoreListRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scoreRef = useRef<HTMLInputElement>(null);

    const differenceFromHighestScore = useMemo(() => {
        const scores = users.map(({ scores }) => scores.reduce((total, score) => total + score, 0));
        const highestScore = Math.max(...scores);

        return scores.map(score => highestScore - score);
    }, [users]);

    useEffect(() => {
        setUsers(getLocalStorage());
    }, []);

    const updateFarkle = (newFarkle: FarkleState) => {
        setUsers(newFarkle);
        setLocalStorage(newFarkle);
    }

    const addUser = (user: Users) => {
        if (!users.length) {
            setCurrentUserIndex(0);
        }

        updateFarkle([...users, user]);

    }

    const editScore = (currentUserIndex: number, scoreIndex: number, score: number) => {
        const newFarkle = [...users];
        newFarkle[currentUserIndex].scores[scoreIndex] = score;

        updateFarkle(newFarkle);
    }

    const deleteScore = (currentUserIndex: number, scoreIndex: number) => {
        const newFarkle = [...users];
        newFarkle[currentUserIndex].scores.splice(scoreIndex, 1);

        updateFarkle(newFarkle);
    }

    const resetUsers = () => {
        confirm(('Are you sure you want to reset all users?')) &&
            updateFarkle([]);
    }

    const resetScores = () => {
        const newFarkle = [...users];

        newFarkle.forEach((_, userIndex) => {
            newFarkle[userIndex].scores = [];
        });
        confirm(('Are you sure you want to reset all scores?')) &&
            updateFarkle(newFarkle);
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

        // Scroll to the selected user
        if (userRefs.current[nextIndex]) {
            userRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const addScore = (score: number) => {
        const newFarkle = [...users];
        newFarkle[currentUserIndex].scores.unshift(score);

        updateFarkle(newFarkle);
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
                        <Headline level={2} className={getChildClass('userHeadline')}>
                            <IconButton onClick={() => handleNextClick(currentUserIndex - 1)} flip>
                                <ForwardSharpIcon />
                            </IconButton>
                            {users[currentUserIndex]?.name ?? ''}
                            <IconButton onClick={() => handleNextClick(currentUserIndex + 1)}>
                                <ForwardSharpIcon />
                            </IconButton>
                        </Headline>
                        <div className={getChildClass('difference')}>
                            {differenceFromHighestScore[currentUserIndex]} {' '}
                            Behind
                        </div>
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
