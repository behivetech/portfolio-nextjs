import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import getClassName from 'tools/getClassName';

// core
import Headline from 'components/core/Headline';

// app
import ContentfulElementParser from 'components/app/ContentfulElementParser';

import styles from './Experiences.module.scss';

export default function Experiences({className, experiences}) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'experiences',
        styles,
    });

    function getDates(startDate, endDate) {
        const momentStart = moment(startDate);
        const momentEnd = endDate ? moment(endDate) : 'present';

        return (
            <React.Fragment>
                {momentStart.format('MMM YYYY')} -{' '}
                {momentEnd === 'present' ? momentEnd : momentEnd.format('MMM YYYY')}
            </React.Fragment>
        );
    }
    return (
        <section className={rootClassName}>
            <Headline level={3} size={2}>
                Professional Experience
            </Headline>
            {experiences.map(
                ({
                    fields: {
                        company,
                        contract,
                        startDate,
                        endDate,
                        locationCity,
                        locationState,
                        summary,
                        title,
                    },
                }) => (
                    <section key={company}>
                        <Headline level={4} size={3}>
                            {company}
                        </Headline>
                        <div>{title}</div>
                        <div className={getChildClass('sub-detail')}>
                            {locationCity}, {locationState} /{' '}
                            {getDates(startDate, endDate)} /{' '}
                            {contract ? 'contract' : 'full-time'}
                        </div>

                        <ContentfulElementParser content={summary} />
                    </section>
                ),
            )}
        </section>
    );
}

Experiences.propTypes = {
    className: PropTypes.string,
    experiences: PropTypes.arrayOf(
        PropTypes.shape({
            node: PropTypes.shape({
                id: PropTypes.string.isRequired,
                company: PropTypes.string.isRequired,
                contract: PropTypes.bool,
                startDate: PropTypes.string,
                endDate: PropTypes.string,
                locationCity: PropTypes.string,
                locationState: PropTypes.string,
                summary: PropTypes.shape({json: PropTypes.object}),
                title: PropTypes.string.isRequired,
            }),
        }),
    ),
};
