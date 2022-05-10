import type { AppProps } from 'next/app';
// import contentfulClient from 'tools/contentfulClient';

import AppProvider from 'components/providers/AppProvider';

import 'styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const props = {...pageProps};

    return <AppProvider><Component {...props} /></AppProvider>
}

export default MyApp
