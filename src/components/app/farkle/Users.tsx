import React, { useEffect, useRef, useState } from 'react';
import Button from '@core/Button';
import TextField from '@core/TextField';
import getClassName from '@tools/getClassName';
import { UserScore } from './UserScore';
import styles from './Users.module.scss';

type UsersState = {
    [key: string]: {
        scores: number[];
    };
};

const LOCAL_STORAGE_KEY = 'farkle__users';

const getLocalStorage = (): UsersState => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    return data ? JSON.parse(data) : {};
}

const setLocalStorage = (data: UsersState) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const Users = () => {
    const [users, setUsers] = useState<UsersState>({});
    const nameFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setUsers(getLocalStorage());
    }, []);

    const updateUsers = (newUsers: UsersState) => {
        setUsers(newUsers);
        setLocalStorage(newUsers);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const newUsers = { ...users, [name]: { scores: [] } };

        setUsers(newUsers);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUsers));

        if (nameFieldRef.current) {
            nameFieldRef.current.value = '';
        }
    }

    const addScore = (name: string, score: number) => {
        const newUsers = { ...users };
        newUsers[name].scores.unshift(score);

        updateUsers(newUsers);
    }

    const editScore = (name: string, scoreIndex: number, score: number) => {
        const newUsers = { ...users };
        newUsers[name].scores[scoreIndex] = score;

        updateUsers(newUsers);
    }

    const deleteScore = (name: string, scoreIndex: number) => {
        const newUsers = { ...users };
        newUsers[name].scores.splice(scoreIndex, 1);

        updateUsers(newUsers);
    }

    const resetUsers = () => {
        updateUsers({});
    }

    const resetScores = () => {
        const newUsers = { ...users };

        Object.keys(newUsers).forEach((name) => {
            newUsers[name].scores = [];
        });

        updateUsers(newUsers);
    }

    const [rootClass, getChildClass] = getClassName({
        rootClass: 'users',
        styles,
    });

    return (
        <section className={rootClass}>
            <div className={getChildClass('user')}>
                {Object.keys(users).map((name) => (
                    <UserScore
                        addScore={addScore}
                        deleteScore={deleteScore}
                        editScore={editScore}
                        key={name}
                        name={name}
                        scores={users[name].scores}
                    />
                ))}
            </div>
            <form onSubmit={handleSubmit} className={getChildClass('form')}>
                <TextField
                    label="Add User"
                    name="name"
                    size="small"
                    placeholder='Enter a name'
                    inputRef={nameFieldRef}
                    required
                />
                <div className={getChildClass('actions')}>
                    <Button size="small" type="submit">Add</Button>
                    <Button size="small" onClick={resetScores}>Reset Scores</Button>
                    <Button size="small" onClick={resetUsers}>Reset Users</Button>
                </div>
            </form>
        </section>
    );
}
