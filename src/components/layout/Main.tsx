import * as React from 'react';

/**
    Main container that wraps all the site content. It can be set to 100% wide or
    the main site setting for the width which will be centered.
*/

// tools
import getClassName from 'tools/getClassName';

export type MainParams = {
    className: string,
    children: React.ReactNode,
} & React.HTMLAttributes<HTMLDivElement>;

export default function Main({className, children, ...restProps}: MainParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'main',
    });

    return (
        <main {...restProps} className={rootClassName}>
            {children}
        </main>
    );
}
