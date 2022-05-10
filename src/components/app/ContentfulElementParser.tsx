import React from 'react';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import { Document } from "@contentful/rich-text-types";

import getClassName from 'tools/getClassName';

import styles from './ContentfulElementParser.module.scss';

type ContentfulNode = {
    data?: {[key: string]: any}
    nodeType?: string
    value?: string
    marks?: {type: string}[]
};

type ContentfulElementParserProps = {
    className?: string
    content: Document
};

export default function ContentfulElementParser({ className, content }: ContentfulElementParserProps) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'contentful-element-parser',
        styles,
    });

    return <div className={rootClassName}>{documentToReactComponents(content)}</div>;
}


