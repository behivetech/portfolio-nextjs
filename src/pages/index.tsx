import React, { useRef } from 'react';
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
            skills: skillsRes?.items?.map(({ fields }) => fields) as HomeProps['skills'] || [],
        },
    }
}

const Home = ({ skills }: HomeProps) => {
    const aboutEl = useRef<HTMLDivElement>(null);
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
                        width={2800}
                        height={1373}
                        layout="responsive"
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
                        Expert in the design, development and global introduction of advanced technologies to meet business, financial, competitive, and customer demands.  Experience combining strong development with outstanding performance for leading complex technology organizations.  Diverse understanding of web-based applications from concept, business case, and feasibility analysis through development, usability testing, deployment and maintenance using a modern web stack.
                        Direct work experience in...
                        - architecting several single page and server side apps from the ground up
                        - leading and mentoring junior to mid level developers
                        - working with extremely high traffic websites such as Southwest Airlines
                        - principal and senior level positions with smaller startups all the way up to large corporations
                    </p>
                    <p>
                        <Button onClick={handleLearnClick}>
                            Learn More
                        </Button>
                    </p>
                </div>
            </div>
            <About componentRef={aboutEl} skills={skills} />
            <Projects />
        </Layout>
    )
}

export default Home;
