import React, { useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

import client from 'tools/contentfulClient';
import getClassName from 'tools/getClassName';

import About from 'components/app/about/';
import Button from 'components/core/Button';
import Headline from 'components/core/Headline';
import Layout from 'components/layout/Layout';
import Projects from 'components/app/Projects';
import SEO from 'components/app/SEO';

import styles from './index.module.scss';

export type HomeProps = {
    skills: { name: string }[]
}

export async function getStaticProps() {
    const skillsRes = await client.getEntries({ content_type: 'skills' });

    return {
        props: {
            skills: skillsRes?.items?.map(({ fields }) => fields) || [],
        },
    }
}

const Home: NextPage = ({ skills }: HomeProps) => {
    const aboutEl = useRef(null);
    const projectsEl = useRef(null);
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'index-page',
        styles,
    });

    function handleLearnClick() {
        aboutEl?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <Layout className={rootClassName} title="Home">
            <SEO title="Home" />
            <div className={getChildClass('container')}>
                <div className={getChildClass('image-container')}>
                    <Image
                        layout="responsive"
                        width="100vw"
                        height="93vh"
                        alt="Event Image"
                        src="/images/HomeMain.png"
                        priority
                    />
                </div>
                <div className={getChildClass('content')}>
                    <Headline className={getChildClass('heading')} level={2}>
                        Welcome to BEhive Tech
                    </Headline>
                    <p>
                        Expert in the design, development and global introduction of
                        advanced technologies to meet business, financial, competitive,
                        and customer demands. Experience combining strong development with
                        outstanding performance for leading complex technology
                        organizations. Diverse understanding of web-based applications
                        from concept, business case, and feasibility analysis through
                        development, usability testing, deployment and maintenance. As a
                        primarily front-end React developer, my focus and expertise
                        revolves around building efficient, reusable components and
                        performant, scalable apps to align with the fast paced world of
                        development. Much of my recent experience and passion is
                        architecting new apps or rebuilding apps from an older technology.
                    </p>
                    <p>
                        <Button onClick={handleLearnClick}>
                            Learn More
                        </Button>
                    </p>
                </div>
            </div>
            <About componentRef={aboutEl} skills={skills} />
            <Projects componentRef={projectsEl} />
        </Layout>
    )
}

export default Home;
