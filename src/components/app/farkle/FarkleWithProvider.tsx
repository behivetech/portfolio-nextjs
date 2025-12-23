import React from 'react';
import { FarkleProvider } from './FarkleProvider';
import { Farkle as FarkleGame } from './Farkle';

export const FarkleWithProvider: React.FC = () => {
    return (
        <FarkleProvider>
            <FarkleGame />
        </FarkleProvider>
    );
};
