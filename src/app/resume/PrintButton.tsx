'use client';

import { Button } from '@behivetech/atoms.button';

export default function PrintButton() {
    return (
        <Button variant="secondary" onClick={() => window.print()}>
            Print / Save as PDF
        </Button>
    );
}
