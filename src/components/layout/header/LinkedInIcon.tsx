import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

/**
    Component that shows an svg of a github icon.
*/

type LinkedInIconParams = {
    className?: string,
};

/* eslint-disable max-len */
export default function LinkedInIcon({ className }: LinkedInIconParams) {
    return (
        <SvgIcon>
            <path fill="#FFFFFF" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M9.3,16.8H7.1V9.7h2.2L9.3,16.8L9.3,16.8z
	 M8.2,8.8c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3s1.3,0.6,1.3,1.3C9.5,8.2,8.9,8.8,8.2,8.8z M17.6,16.8h-2.2v-3.7
	c0-1-0.4-1.6-1.2-1.6c-0.9,0-1.3,0.6-1.3,1.6v3.7h-2.1V9.7h2.1v1c0,0,0.6-1.2,2.1-1.2s2.6,0.9,2.6,2.8V16.8z"/>
        </SvgIcon>
    );
}
