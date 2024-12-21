import React from 'react';
import Button from '@core/Button';
import TextField from '@core/TextField';
import getClassName from '@tools/getClassName';
import styles from './UserScore.module.scss';
import Headline from '@core/Headline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

interface UserScoreProps {
    name: string;
    addScore: (name: string, score: number) => void;
    deleteScore: (name: string, scoreIndex: number) => void;
    editScore: (name: string, scoreIndex: number, score: number) => void;
    scores: number[];
}

export const UserScore: React.FC<UserScoreProps> = ({
    addScore,
    deleteScore,
    editScore,
    name,
    scores
}) => {
    const scoreRef = React.useRef<HTMLInputElement>(null);
    const [formIndex, setFormIndex] = React.useState<number>(-1);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const score = Number(formData.get('score'));

        addScore(name, score);

        if (scoreRef.current) {
            scoreRef.current.value = '';
        }
    }

    const [rootClass, getChildClass] = getClassName({
        rootClass: 'userScore',
        styles,
    });

    const renderEditForm = (score: number, index: number) => {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const score = Number(formData.get('editScore'));

            editScore(name, index, score);
            setFormIndex(-1);
        }

        return (
            <li>
                <form onSubmit={handleSubmit} className={getChildClass('form')}>
                    <TextField
                        label="Edit Score"
                        type="number"
                        name="editScore"
                        placeholder="Enter a score"
                        defaultValue={score}
                    />
                    <Button type="submit">Update</Button>
                </form>
            </li>
        );
    }

    return (
        <section className={rootClass}>
            <Headline level={2} className={getChildClass('headline')}>{name}</Headline>
            <form onSubmit={handleSubmit} className={getChildClass('form')}>
                <TextField
                    label="Add Score"
                    inputRef={scoreRef}
                    type="number"
                    name="score"
                    placeholder="Enter a score"
                />
                <Button type="submit">Add</Button>
            </form>
            <div className={getChildClass('scores')}>
                <Headline level={3}>
                    Total Score:{' '}
                    {scores.reduce((total, score) => total + score, 0)}
                </Headline>
                <ol className={getChildClass('list')}>
                    {scores.map((score, scoreIndex) => {

                        return scoreIndex === formIndex
                            ? renderEditForm(score, scoreIndex)
                            : (
                                <li key={`${name}__score--${scoreIndex}`} className={getChildClass('listItem')}>
                                    {scores.length - scoreIndex}.{' '}
                                    <div className={getChildClass('score')}>{score}</div>
                                    <button
                                        className={getChildClass('buttonIcon')}
                                        onClick={() => setFormIndex(scoreIndex)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </button>
                                    <button
                                        className={getChildClass('buttonIcon')}
                                        onClick={() => deleteScore(name, scoreIndex)}
                                    >
                                        <DeleteForeverIcon fontSize="small" />
                                    </button>
                                </li>
                            )
                    })}
                </ol>
            </div>
        </section>
    );
}
