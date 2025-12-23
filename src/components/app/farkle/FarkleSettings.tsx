import React, { useState, useRef } from 'react';
import TextField from '@core/TextField';
import getClassName from '@tools/getClassName';
import { useFarkle } from './FarkleProvider';
import styles from './FarkleSettings.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@core/IconButton';
import Menu from '@mui/material/Menu';

export const FarkleSettings: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { targetScore, setTargetScore } = useFarkle();
    const [inputValue, setInputValue] = useState(targetScore);
    const inputRef = useRef<HTMLInputElement>(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newScore = parseInt(e.target.value, 10);
        if (!isNaN(newScore) && newScore > 0) {
            setInputValue(newScore);
            setTargetScore(newScore);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClose();
        }
    };

    const [rootClass, getChildClass] = getClassName({
        rootClass: 'farkleSettings',
        styles,
    });

    return (
        <div className={rootClass}>
            <IconButton
                onClick={handleClick}
                className={getChildClass('button')}
                aria-label="Settings"
            >
                <SettingsIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                autoFocus={false}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                TransitionProps={{
                    onEntered: () => {
                        setTimeout(() => {
                            if (inputRef.current) {
                                inputRef.current.focus();
                                inputRef.current.select();
                            }
                        }, 0);
                    }
                }}
            >
                <div className={getChildClass('dropdown')}>
                    <TextField
                        label="Score to Win"
                        type="number"
                        value={String(inputValue)}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className={getChildClass('input')}
                        inputProps={{ min: 1 }}
                        inputRef={inputRef}
                    />
                </div>
            </Menu>
        </div>
    );
};
