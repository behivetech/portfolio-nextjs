/**
 * SEO component to insert title, description and meta data into the <head /> element
 */

import * as React from 'react';
import Head from 'next/head'

import {siteConfig} from 'siteConfig';

export type SEOParams = {
    description?: string,
    title?: string,
};

export default function SEO({
    description = siteConfig.description,
    title
}: SEOParams) {
    const titleConcat = title ? `${siteConfig.title} | ${title}` : siteConfig.title;

    return (
        <Head>
            <title>{titleConcat}</title>
            <meta name="description" content={siteConfig.description} />
            <meta name="og:title" content={titleConcat} />
            <meta name="og:description" content={description} />
            <meta name="twitter:card" content={description} />
            <meta name="twitter:creator" content={siteConfig.title} />
            <meta name="twitter:title" content={titleConcat} />
            <meta name="twitter:description" content={siteConfig.description} />
        </Head>
    );
}
