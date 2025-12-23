"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    name: string;
    scores: number[];
}

export interface FarkleContextType {
    users: User[];
    targetScore: number;
    currentUserIndex: number;
    currentUser: User | null;
    userScores: number[];
    currentUserScore: number;
    addUser: (user: User) => void;
    addScore: (score: number) => void;
    editScore: (userIndex: number, scoreIndex: number, score: number) => void;
    deleteScore: (userIndex: number, scoreIndex: number) => void;
    nextUser: () => void;
    selectUser: (index: number) => void;
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

const loadUsers = (): User[] => {
    const storedUsers = typeof window !== 'undefined' ? localStorage.getItem(USERS_STORAGE_KEY) : null;
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

    return Array.isArray(parsedUsers) ? parsedUsers : [];
};

const saveUsers = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
};

const loadTargetScore = (): number => {
    const storedTargetScore = typeof window !== 'undefined' ? localStorage.getItem(TARGET_SCORE_STORAGE_KEY) : null;

    return storedTargetScore ? Number(storedTargetScore) : DEFAULT_TARGET_SCORE;
};

const saveTargetScore = (score: number) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TARGET_SCORE_STORAGE_KEY, String(score));
    }
};

export const FarkleProvider: React.FC<FarkleProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [targetScore, setTargetScoreState] = useState<number>(DEFAULT_TARGET_SCORE);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage after hydration
    useEffect(() => {
        setUsers(loadUsers());
        setTargetScoreState(loadTargetScore());
        setIsHydrated(true);
    }, []);

    const userScores = users.map(({ scores }) => scores.reduce((total, score) => total + score, 0));
    const currentUser = users[currentUserIndex] || null;
    const currentUserScore = userScores[currentUserIndex] || 0;

    const triggerCelebration = (oldTotal: number, newTotal: number) => {
        if (oldTotal < targetScore && newTotal >= targetScore) {
            // Play celebratory tone
            try {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

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
                if (flashCount >= 8) {
                    clearInterval(flashInterval);
                    body.style.backgroundColor = originalBg;
                } else {
                    body.style.backgroundColor = flashCount % 2 === 0 ? '#ff5983' : '#4ade80';
                    flashCount++;
                }
            }, 150);
        }
    };

    const addUser = (user: User) => {
        const newUsers = [...users, user];
        setUsers(newUsers);
        saveUsers(newUsers);
        if (users.length === 0) {
            setCurrentUserIndex(0);
        }
    };

    const nextUser = () => {
        setCurrentUserIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % users.length;
            return nextIndex;
        });
    };

    const selectUser = (index: number) => {
        setCurrentUserIndex((prevIndex) => {
            return (index >= 0 && index < users.length) ? index : prevIndex;
        });
    };

    const addScore = (score: number) => {
        if (currentUser) {
            const oldTotal = currentUserScore;
            const newTotal = oldTotal + score;

            const newUsers = [...users];
            newUsers[currentUserIndex].scores.unshift(score);
            setUsers(newUsers);
            saveUsers(newUsers);

            triggerCelebration(oldTotal, newTotal);
            nextUser();
        }
    };

    const editScore = (userIndex: number, scoreIndex: number, score: number) => {
        const newUsers = [...users];
        newUsers[userIndex].scores[scoreIndex] = score;
        setUsers(newUsers);
        saveUsers(newUsers);
    };

    const deleteScore = (userIndex: number, scoreIndex: number) => {
        const newUsers = [...users];
        newUsers[userIndex].scores.splice(scoreIndex, 1);
        setUsers(newUsers);
        saveUsers(newUsers);
    };

    const setTargetScore = (score: number) => {
        setTargetScoreState(score);
        saveTargetScore(score);
    };

    const resetUsers = () => {
        if (confirm('Are you sure you want to reset all users?')) {
            setUsers([]);
            saveUsers([]);
            setCurrentUserIndex(0);
        }
    };

    const resetScores = () => {
        if (confirm('Are you sure you want to reset all scores?')) {
            const newUsers = users.map(user => ({ ...user, scores: [] }));
            setUsers(newUsers);
            saveUsers(newUsers);
        }
    };

    const contextValue: FarkleContextType = {
        users,
        targetScore,
        currentUserIndex,
        currentUser,
        userScores,
        currentUserScore,
        addUser,
        addScore,
        editScore,
        deleteScore,
        nextUser,
        selectUser,
        setTargetScore,
        resetUsers,
        resetScores,
    };

    return (
        <FarkleContext.Provider value={contextValue}>
            {children}
        </FarkleContext.Provider>
    );
};

export const useFarkle = (): FarkleContextType => {
    const context = useContext(FarkleContext);
    if (context === undefined) {
        throw new Error('useFarkle must be used within a FarkleProvider');
    }
    return context;
};
