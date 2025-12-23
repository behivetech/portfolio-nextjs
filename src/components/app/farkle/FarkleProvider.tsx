import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    name: string;
    scores: number[];
}

interface FarkleContextType {
    users: User[];
    targetScore: number;
    currentUserIndex: number;
    addUser: (user: User) => void;
    addScore: (userIndex: number, score: number) => void;
    editScore: (userIndex: number, scoreIndex: number, score: number) => void;
    deleteScore: (userIndex: number, scoreIndex: number) => void;
    setCurrentUserIndex: (index: number) => void;
    setTargetScore: (score: number) => void;
    resetUsers: () => void;
    resetScores: () => void;
}

interface FarkleProviderProps {
    children: React.ReactNode;
}

const USERS_STORAGE_KEY = 'farkle__users';
const TARGET_SCORE_STORAGE_KEY = 'farkle__targetScore';
const DEFAULT_TARGET_SCORE = 25000;

const FarkleContext = createContext<FarkleContextType | undefined>(undefined);

export const FarkleProvider: React.FC<FarkleProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [targetScore, setTargetScoreState] = useState<number>(DEFAULT_TARGET_SCORE);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
            if (storedUsers) {
                const parsedUsers = JSON.parse(storedUsers);
                if (Array.isArray(parsedUsers)) {
                    setUsers(parsedUsers);
                }
            }

            const storedTargetScore = localStorage.getItem(TARGET_SCORE_STORAGE_KEY);
            if (storedTargetScore) {
                setTargetScoreState(Number(storedTargetScore));
            }
        }
    }, []);

    // Save users to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        }
    }, [users]);

    // Save target score to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TARGET_SCORE_STORAGE_KEY, String(targetScore));
        }
    }, [targetScore]);

    const addUser = (user: User) => {
        setUsers(prev => [...prev, user]);
        if (users.length === 0) {
            setCurrentUserIndex(0);
        }
    };

    const addScore = (userIndex: number, score: number) => {
        setUsers(prev => {
            const newUsers = [...prev];
            newUsers[userIndex].scores.unshift(score);
            return newUsers;
        });
    };

    const editScore = (userIndex: number, scoreIndex: number, score: number) => {
        setUsers(prev => {
            const newUsers = [...prev];
            newUsers[userIndex].scores[scoreIndex] = score;
            return newUsers;
        });
    };

    const deleteScore = (userIndex: number, scoreIndex: number) => {
        setUsers(prev => {
            const newUsers = [...prev];
            newUsers[userIndex].scores.splice(scoreIndex, 1);
            return newUsers;
        });
    };

    const setTargetScore = (score: number) => {
        setTargetScoreState(score);
    };

    const resetUsers = () => {
        if (confirm('Are you sure you want to reset all users?')) {
            setUsers([]);
            setCurrentUserIndex(0);
        }
    };

    const resetScores = () => {
        if (confirm('Are you sure you want to reset all scores?')) {
            setUsers(prev => prev.map(user => ({ ...user, scores: [] })));
        }
    };

    return (
        <FarkleContext.Provider
            value={{
                users,
                targetScore,
                currentUserIndex,
                addUser,
                addScore,
                editScore,
                deleteScore,
                setCurrentUserIndex,
                setTargetScore,
                resetUsers,
                resetScores,
            }}
        >
            {children}
        </FarkleContext.Provider>
    );
};

export const useFarkle = () => {
    const context = useContext(FarkleContext);
    if (context === undefined) {
        throw new Error('useFarkle must be used within a FarkleProvider');
    }
    return context;
};
