import React, { useEffect } from 'react';
import getClassName from '@tools/getClassName';
import BackspaceIcon from '@mui/icons-material/BackspaceSharp';
import SaveIcon from '@mui/icons-material/SaveSharp';
import styles from './Keyboard.module.scss';
import TextField from '@core/TextField';

interface KeyboardProps {
    className?: string;
    onSubmit: (value: number) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({
    className,
    onSubmit,
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         const value = event.key;
    //         const isNumber = !isNaN(Number(value));
    //         const isSave = value === 'Enter';

    //         if (isNumber || isSave) {
    //             onClick(value);
    //         }
    //     }

    //     document.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     }
    // }, [onClick]);

    const [rootClass, getChildClass] = getClassName({
        className,
        rootClass
            : 'farkleKeyboard',
        styles,
    });

    const handleNumberClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.value;

        if (inputRef.current) {
            const inputValue = inputRef.current.value;

            if (inputValue === '0') {
                inputRef.current.value = value;
            } else {
                inputRef.current.value = `${inputValue}${value}`;
            }

            // Unfocus the button after click
            event.currentTarget.blur();
        }
    }

    const handleBackspaceClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (inputRef.current) {
            const inputValue = inputRef.current.value;
            const newValue = inputValue.slice(0, -1);

            inputRef.current.value = newValue || '0';

            // Unfocus the button after click
            event.currentTarget.blur();
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputRef.current) {
            onSubmit(Number(inputRef.current.value));
            inputRef.current.value = '0';
        }
    }

    return (
        <form className={rootClass} onSubmit={handleSubmit}>
            <TextField
                label="Score"
                type="number"
                name="score"
                defaultValue={0}
                aria-readonly
                inputRef={inputRef}
                inputProps={{ readOnly: true }}
            />
            <div className={getChildClass('buttons')}>
                {[...Array(10)].map((_, i) => {
                    const buttonNumber = i < 9 ? i + 1 : 0;
                    return (
                        <button
                            key={`buttonNumber--${buttonNumber}`}
                            className={getChildClass('button')}
                            value={buttonNumber}
                            onClick={handleNumberClick}
                            type="button"
                            tabIndex={-1}
                        >
                            {buttonNumber}
                        </button>
                    )
                })}
                <button
                    className={getChildClass('button')}
                    onClick={handleBackspaceClick}
                    type="button"
                >
                    <BackspaceIcon />
                </button>
                <button className={getChildClass('button')} value="0" type="submit">
                    <SaveIcon />
                </button>
            </div>
        </form>
    );
}
