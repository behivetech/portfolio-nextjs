import React, { useEffect, useRef, useState } from 'react';
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

    useEffect(() => {
        setUsers(getLocalStorage());
    }, []);

    const updateFarkle = (newFarkle: FarkleState) => {
        setUsers(newFarkle);
        setLocalStorage(newFarkle);
    }

    const addUser = (user: Users) => {
        updateFarkle([...users, user]);
    }

    const addScore = (currentUserIndex: number, score: number) => {
        const newFarkle = [...users];
        newFarkle[currentUserIndex].scores.unshift(score);

        updateFarkle(newFarkle);
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
        updateFarkle([]);
    }

    const resetScores = () => {
        const newFarkle = [...users];

        newFarkle.forEach((_, userIndex) => {
            newFarkle[userIndex].scores = [];
        });

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
    }


    const [rootClass, getChildClass] = getClassName({
        rootClass: 'farkle',
        styles,
    });

    return (
        <section className={rootClass}>
            <header className={getChildClass('header')}>
                <Headline level={1} className={getChildClass('headerHeadline')}>Farkle</Headline>
                <div className={getChildClass('headerActions')}>
                    <Button size="small" onClick={resetScores}>Reset Scores</Button>
                    <Button size="small" onClick={resetUsers}>Reset Farkle</Button>
                </div>
            </header>
            <section className={getChildClass('content')}>
                <aside className={getChildClass('user')}>
                    {users.map(({ name, scores }, userIndex) => (
                        <UserScore
                            key={name}
                            name={name}
                            scores={scores}
                            selected={userIndex === currentUserIndex}
                        />
                    ))}
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
                        <AddScore
                            addScore={(score: number) => addScore(currentUserIndex, score)}
                            shouldFocus={scoreFocus}
                            setFocus={(focus) => setScoreFocus(focus)}
                        />
                        <UserScoreList
                            deleteScore={(scoreIndex: number) => deleteScore(currentUserIndex, scoreIndex)}
                            editScore={(scoreIndex, score) => editScore(currentUserIndex, scoreIndex, score)}
                            currentUserIndex={currentUserIndex}
                            scores={users[currentUserIndex]?.scores ?? []}
                        />
                    </section>
                }
            </section>
        </section>
    );
}
