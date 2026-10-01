import React from 'react';
import dynamic from 'next/dynamic';

// Client-only: the game state lives in localStorage and the page has nothing
// worth server-rendering.
const FarkleWithProvider = dynamic(
    () => import('@app/farkle/FarkleWithProvider').then((mod) => mod.FarkleWithProvider),
    { ssr: false },
);

export default function FarklePage() {
    return (
        <FarkleWithProvider />
    );
}
