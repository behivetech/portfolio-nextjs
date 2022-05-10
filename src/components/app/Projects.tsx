import React from 'react';
import Image from 'next/image';

import getClassName from 'tools/getClassName';

import Headline from 'components/core/Headline';
import CenteredContent from 'components/layout/CenteredContent';
import SEO from 'components/app/SEO';

import styles from './Projects.module.scss';


type ProjectsProps = {
    componentRef: {
        current: null | React.ReactNode
    }
};

type ProjectParams = {
    heading: string
    dates: string
    image: string
    description: string
}

function Project({
    dates,
    description,
    heading,
    image
}: ProjectParams) {
    const [_, getChildClass] = getClassName({
        rootClass: 'projects',
        styles
    });
    const projectKey = heading.replace(' ', '');

    return (
        <>
            <div
                className={getChildClass('detail')}
                id={styles[`${projectKey}__Description`]}
                key={`${projectKey}__Description`}
            >
                <Headline level={3}>{heading}</Headline>
                <p>{dates}</p>
                <p className={getChildClass('description')}>{description}</p>
            </div>
            <div
                className={getChildClass('image')}
                id={styles[`${projectKey}__Image`]}
                key={`${projectKey}__Image`}
            >
                <Image src={image} layout="intrinsic" width={800} height={600} />
            </div>
        </>
    );
}

export default function Projects({ componentRef }: ProjectsProps) {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'projects',
        styles
    });

    const projects: ProjectParams[] = [
        {
            heading: `Rally`,
            dates: 'Dec 2019 – Aug 2020',
            image: '/images/Rally.png',
            description: `
                    6 month contract (extended to 7) rebuilding a reporting system from older
                    technologies into an updated ReactJS SPA using HighchartsJS that clients
                    of Rally, a division of Broadcom, use to chart thier work. The Rally software
                    tracks and builds analytics such as burnups, burndowns, etc. to visualize
                    progress on their Agile projects.
                `,
        },
        {
            heading: 'Southwest Airlines',
            dates: 'Dec 2014 - June 2016',
            image: '/images/Southwest.png',
            description: `
                    Southwest was my first experience with React. I was fortunate
                    to be able to work with some brilliant developers which upped my
                    skillsets to a much higher level as a UI developer. I was
                    on a lead team where most of the projects started such as the main
                    components and the Flight Status portion of the site, but the primary
                    part of my time there was spent on the Booking section of the site.
                `,
        },
        {
            heading: `PipelineRx`,
            dates: 'Jan 2018 - May 2019',
            image: '/images/PipelineRx.png',
            description: `
                    I came on at PipelineRx to help them re-architect their web application
                    into a SPA (single page app) using React, HAL JSON and Redux. My key role
                    was to lead and collaborate with a couple of teams developers and a UX designer
                    to come up with the best solutions to build an efficient, fast, reliable and
                    HIPAA compliant front end web application.
                `,
        },
    ];


    return (
        <CenteredContent className={rootClassName}>
            <SEO title="Projects" />
            <Headline className={getChildClass('headline')} level={2}>
                Project Highlights
            </Headline>
            <div className={getChildClass('project-container')}>
                {projects.map((project, index) => (
                    <Project {...project} key={`project__${index}`} />)
                )}
            </div>
        </CenteredContent>
    );
}
