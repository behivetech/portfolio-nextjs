"use client";

import React, { useRef } from 'react';
import Button from '@core/Button';
import getClassName from '@tools/getClassName';
import { UserScore } from './UserScore';
import styles from './Farkle.module.scss';
import Headline from '@core/Headline';
import { UserScoreList } from './UserScoreList';
import { AddUser } from './AddUser';
import { Keyboard } from './Keyboard';
import { ScoreCarousel } from './ScoreCarousel';
import { FarkleSettings } from './FarkleSettings';
import { useFarkle } from './FarkleProvider';

export const Farkle = () => {
    const {
        users,
        currentUser,
        currentUserIndex,
        addUser,
        addScore,
        editScore,
        deleteScore,
        selectUser,
        resetUsers,
        resetScores
    } = useFarkle();
    const userScoreListRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleUserClick = (index: number) => {
        selectUser(index);
        if (userRefs.current[index]) {
            userRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
                                        onClick={() => handleUserClick(index)}
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
                        <ScoreCarousel className={getChildClass('difference')} />
                        <Keyboard onSubmit={addScore} />
                        <UserScoreList
                            className={getChildClass('userScoreList')}
                            deleteScore={(scoreIndex: number) => deleteScore(currentUserIndex, scoreIndex)}
                            editScore={(scoreIndex, score) => editScore(currentUserIndex, scoreIndex, score)}
                            currentUserIndex={currentUserIndex}
                            scores={currentUser?.scores ?? []}
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
