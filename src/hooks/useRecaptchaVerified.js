import {useContext} from 'react';

import {RecaptchaContext} from 'components/providers/RecaptchaProvider';

export default function useRecaptchaVerified() {
    return useContext(RecaptchaContext);
}
