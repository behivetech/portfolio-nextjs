import React, {useMemo, useReducer} from 'react';
import Recaptcha from 'components/app/Recaptcha';
import {useForm} from 'react-hook-form';

// tools and hooks
import getClassName from 'tools/getClassName';
import useRecaptchaVerified from 'hooks/useRecaptchaVerified';

// core
import Button from 'components/core/Button';
import LoadingSpinner from 'components/core/LoadingSpinner';
import Headline from 'components/core/Headline';
import TextField from 'components/core/TextField';

// layout
import Layout from 'components/layout/Layout';

// app
import SEO from 'components/app/SEO';

// styles
import styles from './contact.module.scss';

const FORM_NAME = 'contact';
const REQUIRED = 'This field is required';
const INITIAL_STATE = {
    error: null,
    loading: false,
    submitted: false,
};

function encodeFormBody(data) {
    return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
}

function contactReducer(state, {type, payload = {}}) {
    const actions = {
        SET_ERROR: {
            error: payload.error,
            loading: false,
            submitted: false,
        },
        SET_LOADING: {
            ...INITIAL_STATE,
            loading: true,
        },
        SET_SUBMITTED: {
            error: null,
            loading: false,
            submitted: true,
        },
    };

    return {...state, ...actions[type]} || state;
}

export default function ContactPage() {
    const {verified} = useRecaptchaVerified();
    const [{error, loading, submitted}, contactDispatch] = useReducer(
        contactReducer,
        INITIAL_STATE,
    );
    const formDisabled = useMemo(() => !verified || loading, [verified, loading]);
    const {register: fieldRegister, handleSubmit, errors: fieldErrors} = useForm();
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'contact-page',
        styles
    });

    function handleOnSubmit(formData) {
        if (!formDisabled) {
            contactDispatch({type: 'SET_LOADING'});
            // TODO: This is a quick Netlify form submission. Probably want
            // to move this to a custom API that needs to be built.
            const formBody = encodeFormBody({...formData, 'form-name': FORM_NAME});

            fetch('/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formBody,
            })
                .then((response) => {
                    contactDispatch({type: 'SET_SUBMITTED'});
                })
                .catch((formError) =>
                    contactDispatch({type: 'SET_ERROR', payload: {formError}}),
                );
        }
    }

    function getFieldProps(fieldName) {
        const fieldVerify =
            fieldName === 'email'
                ? {
                    required: REQUIRED,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'A valid email address is required',
                    },
                }
                : {required: REQUIRED};
        return {
            className: getChildClass('field'),
            disabled: loading,
            fieldError: fieldErrors && fieldErrors[fieldName],
            id: fieldName,
            inputRef: fieldRegister(fieldName, fieldVerify),
            name: fieldName,
            sx: {margin: '0.5rem 0'}
        };
    }

    return (
        <Layout className={rootClassName}>
            <div className={getChildClass('form-container')}>
                <Headline level={2}>Contact Form</Headline>
                {error && <code className={getChildClass('error')}>{error}</code>}
                {submitted && <span>Form submitted</span>}
                {!submitted && (
                    <form
                        action="/contact"
                        className={rootClassName}
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        method="POST"
                        name={FORM_NAME}
                        onSubmit={handleSubmit(handleOnSubmit)}
                    >
                        <SEO title="Contact" />
                        <TextField {...getFieldProps('name')} label="Name" />
                        <TextField
                            {...getFieldProps('email')}
                            label="Email"
                            type="email"
                        />
                        <TextField {...getFieldProps('subject')} label="Subject" />
                        <TextField
                            {...getFieldProps('message')}
                            label="Message"
                            textarea
                        />
                        <Recaptcha show={!verified} />
                        <Button
                            disabled={formDisabled}
                            className={getChildClass('button')}
                            icon={loading ? <LoadingSpinner small /> : undefined}
                            type="submit"
                        >
                            submit
                        </Button>
                    </form>
                )}
            </div>
        </Layout>
    );
}
