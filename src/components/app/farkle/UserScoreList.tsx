import React, { useState } from 'react';
import Button from '@core/Button';
import TextField from '@core/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import getClassName from '@tools/getClassName';
import { IconButton } from '@core/IconButton';
import styles from './UserScoreList.module.scss';

interface UserScoreListProps {
    className?: string;
    currentUserIndex: number;
    deleteScore: (scoreIndex: number) => void;
    editScore: (scoreIndex: number, score: number) => void;
    scores: number[];
}

export const UserScoreList: React.FC<UserScoreListProps> = ({
    className,
    currentUserIndex,
    deleteScore,
    editScore,
    scores,
}) => {
    const [formIndex, setFormIndex] = useState<number>(-1);

    const [rootClass, getChildClass] = getClassName({
        className,
        rootClass: 'userScoreList',
        styles,
    });

    const renderEditForm = (score: number, index: number) => {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const score = Number(formData.get('editScore'));

            editScore(index, score);
            setFormIndex(-1);
        }

        const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
            event.target.select();
        };

        return (
            <li>
                <form onSubmit={handleSubmit} className={getChildClass('form')}>
                    <TextField
                        label="Edit Score"
                        type="number"
                        name="editScore"
                        size="small"
                        placeholder="Enter a score"
                        onFocus={handleFocus}
                        autoFocus
                        defaultValue={score}
                    />
                    <Button size="small" type="submit">Update</Button>
                </form>
            </li>
        );
    }

    return (
        <ol className={rootClass}>
            {scores.map((score, scoreIndex) => {
                return scoreIndex === formIndex
                    ? renderEditForm(score, scoreIndex)
                    : (
                        <li key={`score${currentUserIndex}--${scoreIndex}`} className={getChildClass('listItem')}>
                            {scores.length - scoreIndex}.{' '}
                            <div className={getChildClass('score')}>{score}</div>
                            <IconButton
                                onClick={() => setFormIndex(scoreIndex)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                onClick={() => deleteScore(scoreIndex)}
                            >
                                <DeleteForeverIcon fontSize="small" />
                            </IconButton>
                        </li>
                    )
            })}
        </ol>
    );
};
