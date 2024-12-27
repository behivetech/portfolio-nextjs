import React, { forwardRef, useEffect } from 'react';
import AddBIcon from '@mui/icons-material/AddSharp';
import Button from '@core/Button';
import TextField from '@core/TextField';
import getClassName from '@tools/getClassName';
import styles from './AddScore.module.scss';

interface AddScoreProps {
    addScore: (score: number) => void;
    shouldFocus?: boolean;
    setFocus?: (focus: boolean) => void;
}

export const AddScore = forwardRef<HTMLInputElement, AddScoreProps>(({
    addScore,
    shouldFocus = false,
    setFocus = () => null,
}, scoreRef) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const score = Number(formData.get('score'));

        addScore(score);

        if (scoreRef) {
            // scoreRef.value = '';
        }
    }

    const [rootClass, getChildClass] = getClassName({
        rootClass: 'addScore',
        styles,
    });

    return (
        <form onSubmit={handleSubmit} className={rootClass}>
            <TextField
                label="Add Score"
                size="small"
                inputRef={scoreRef}
                type="number"
                name="score"
                placeholder="Enter a score"
            />
            <Button variant="outlined" size="small" type="submit"><AddBIcon  /></Button>
        </form>
    );
})

AddScore.displayName = 'AddScore';
