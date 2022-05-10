import React, { useEffect, useState } from 'react';
import isbot from 'isbot'

import getClassName from 'tools/getClassName';
import useRecaptchaVerified from 'hooks/useRecaptchaVerified';

// core
import Button from 'components/core/Button';
import Icon from 'components/core/Icon';
import Headline from 'components/core/Headline';
import CenteredContent from 'components/layout/CenteredContent';
import ContentfulElementParser from 'components/app/ContentfulElementParser';
import Certifications from './Certifications';
import Education from './Education';
import Experiences from './Experiences';
import ResumeSkillsets from './ResumeSkillsets';
import { ResumePageProps } from 'pages/resume';

import styles from './Resume.module.scss';

type ResumeProps = {
    className?: string
} & ResumePageProps;

export default function Resume({
    certifications,
    className,
    education,
    experiences,
    resume,
    skills,
}: ResumeProps) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'resume',
        styles,
    });
    const { verified } = useRecaptchaVerified();
    const [showPersonalInfo, setShowPeronalInfo] = useState(false);

    useEffect(() => {
        if (!isbot(navigator.userAgent)) {
            setShowPeronalInfo(true);
        }
    }, [verified]);

    function handlePrintClick() {
        window.print();
    }

    function handleShowPeronalInfo() {
        setShowPeronalInfo(true);
    }

    return (
        <CenteredContent className={rootClassName}>
            <div className={getChildClass('content-right')}>
                <Button startIcon={<Icon icon="print" />} onClick={handlePrintClick}>Print Resume</Button>
            </div>
            <Headline level={2}>{resume.name}</Headline>
            <div className={getChildClass('main-info')}>
                {showPersonalInfo && (<div className={getChildClass('print-only')}>
                    <div>Email: {resume.email}</div>
                    <div>Number: {resume.number}</div>
                </div>)}
                <div className={getChildClass('location')}>{resume.location}</div>
                <div className={getChildClass('print-only')}>
                    <div>Website: {resume.website}</div>
                    <div>LinkedIn: {resume.linkedin}</div>
                    <div>Github: {resume.github}</div>
                </div>
            </div>
            <ContentfulElementParser content={resume?.summary} />
            <Experiences experiences={experiences} />
            <ResumeSkillsets skills={skills} />
            <Education education={education} />
            <Certifications certifications={certifications} />
        </CenteredContent>
    );
}
