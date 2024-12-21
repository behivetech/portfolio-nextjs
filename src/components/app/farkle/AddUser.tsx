import React from 'react';
import AddBIcon from '@mui/icons-material/AddSharp';
import Button from '@core/Button';
import TextField from '@core/TextField';
import getClassName from '@tools/getClassName';
import styles from './AddUser.module.scss';

interface AddUserProps {
    addUser: (user: {name: string, scores: number[]}) => void;
}

export const AddUser: React.FC<AddUserProps> = ({
    addUser,
}) => {
    const userInputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name= formData.get('name') as string;

        addUser({name, scores: []});

        if (userInputRef.current) {
            userInputRef.current.value = '';
        }
    }

    const [rootClass] = getClassName({
        rootClass: 'addUser',
        styles,
    });

    return (
        <form onSubmit={handleSubmit} className={rootClass}>
            <TextField
                label="Add Name"
                size="small"
                inputRef={userInputRef}
                name="name"
                placeholder="Enter a name"
                required
            />
            <Button size="small" type="submit" variant="outlined">Add</Button>
        </form>
    );
}
