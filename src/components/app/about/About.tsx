import React from 'react';
import moment from 'moment';
import Link from 'components/core/Link';

import getClassName from 'tools/getClassName';

// core
import Headline from 'components/core/Headline';

// app
import AboutCard from './AboutCard';
import SEO from 'components/app/SEO';
import ResumeSkillsets from '../resume/ResumeSkillsets';
import {HomeProps } from '../../../pages/index';
import styles from './About.module.scss';

type AboutParams = {
    componentRef?: React.RefObject<HTMLElement>,
    skills: HomeProps['skills']
};

export default function About({ componentRef, skills }: AboutParams) {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'about',
        styles,
    });

    return (
        <section className={rootClassName} ref={componentRef}>
            <SEO title="About" />
            <Headline level={2}>About</Headline>
            <div className={getChildClass('content')}>
                <AboutCard icon="code" className={getChildClass('card')}>
                    Started development with React over{' '}
                    {moment('20141201', 'YYYYMMDD').fromNow()} and have been in some sort
                    of web development for{' '}
                    {moment('19960101', 'YYYYMMDD')
                        .fromNow()
                        .split(' ago')
                        .join('')}
                    . Primarily a frontend dev with some fullstack development in the
                    NodeJS tech stack.
                </AboutCard>
                <AboutCard icon="build" className={getChildClass('card')}>
                    Familiarized with client side and isomorphic rendering primarily using
                    different types of build frameworks such as NextJS, Gatsby and Create
                    React App.
                </AboutCard>
                <AboutCard icon="class" className={getChildClass('card')}>
                    Styling is typically created using a &quot;
                    <a
                        href="http://getbem.com/introduction/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Block Element Modifier
                    </a>
                    &quot; code standard with{' '}
                    <a
                        href="https://sass-lang.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        SASS
                    </a>{' '}
                    (Syntactically Awesome Style Sheets) to complile to CSS which
                    simplifies much of the styling for the site and reduces style
                    conflicts.
                </AboutCard>
                <AboutCard icon="explore" className={getChildClass('card')}>
                    Up to date with the current web development technologies and
                    techniques.
                </AboutCard>
                <AboutCard icon="accessibility" className={getChildClass('card')}>
                    Experience in building{' '}
                    <a
                        href="https://en.wikipedia.org/wiki/Computer_accessibility"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        a11y
                    </a>{' '}
                    (accessibility) compliant sites.
                </AboutCard>
                <AboutCard icon="language" className={getChildClass('card')}>
                    Experience in building{' '}
                    <a
                        href="https://en.wikipedia.org/wiki/Internationalization_and_localization"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        i18n
                    </a>{' '}
                    (internationalize aka localized) compliant sites.
                </AboutCard>
                <AboutCard icon="bug_report" className={getChildClass('card')}>
                    Development with unit and integration testing to produce a more
                    stable, bug free site.
                </AboutCard>
                <AboutCard icon="change_history" className={getChildClass('card')}>
                    Useage of version control software such as Git or Mercurial.
                </AboutCard>
                {/* <AboutCard icon="description" className={getChildClass('card')}>
                    Documenation of sites using{' '}
                    <a
                        href="https://github.com/reactjs/react-docgen"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        react-docgen
                    </a>{' '}
                    either homegrown or using{' '}
                    <a
                        href="https://react-styleguidist.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Styleguidist
                    </a>{' '}
                    to make it easy on other developers stepping in on the projects. An
                    example of <Link to="/docs">documentation</Link> is available on this
                    site.
                </AboutCard> */}
                <AboutCard className={getChildClass('card')}>
                    <ResumeSkillsets headlineSize={5} skills={skills} />
                </AboutCard>
            </div>
        </section>
    );
}
