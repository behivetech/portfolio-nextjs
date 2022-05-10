import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

// const PRIVATE_INFO = graphql`
//     query PRIVATE_INFO {
//         contentfulResumes(id: {eq: "7cf0f08d-ec84-5602-9772-f91e4153c7bf"}) {
//             number
//             email
//         }
//     }
// `;

export default function PrivateInfo({className, show}) {
    // const {
    //     contentfulResumes: {email, number},
    // } = useStaticQuery(PRIVATE_INFO);
    const [rootClassName] = getClassName({className, rootClass: 'private-info'});

    return show ? (
        <div className={rootClassName}>
            <div>Email: {`email`}</div>
            <div>Mobile: {`number`}</div>
        </div>
    ) : null;
}

PrivateInfo.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
};

PrivateInfo.defaultProps = {
    show: false,
};
