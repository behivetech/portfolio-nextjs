import type { AppProps } from 'next/app';
// import contentfulClient from '@tools/contentfulClient';

import AppProviders from '@providers/AppProvider';

import '@styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const props = {...pageProps};

    return <AppProviders><Component {...props} /></AppProviders>
}

export default MyApp
