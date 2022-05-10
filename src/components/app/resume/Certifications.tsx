import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import Headline from 'components/core/Headline';
import { ResumePageProps } from 'pages/resume';

import styles from './Certifications.module.scss';

type CertificationsProps = {
    className?: string,
    certifications: ResumePageProps['certifications']
};

export default function Certifications({
    className,
    certifications
}: CertificationsProps) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'certifications',
        styles,
    });

    return (
        <section className={rootClassName}>
            <Headline level={3} size={2}>
                Certifications
            </Headline>
            {certifications.map(({ fields: { issuer, name } }) => (
                <section key={name} className={getChildClass('school')}>
                    <Headline level={4} size={4}>
                        {name} - <span className={getChildClass('issuer')}>{issuer}</span>
                    </Headline>
                </section>
            ))}
        </section>
    );
}
