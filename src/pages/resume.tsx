import React from 'react';
import { Document } from "@contentful/rich-text-types";

import client from 'tools/contentfulClient';

import Layout from 'components/layout/Layout';
import SEO from 'components/app/SEO';
import Resume from 'components/app/resume';

export type ResumePageProps = {
    certifications: {
        fields: {
            id: string
            name: string
            issuer: string
        }
    }[]
    codeExamples: {
        fields: {
            name: string
            url: string
            description: Document
            skillsLink: {
                name: string
            }
        }
    }[]
    education: {
        fields: {
            id: string
            school: string
            description: string
            yearStart: string
            yearEnd: string

        }
    }[]
    experiences: {
        fields: {
            id: string
            company: string
            contract: string
            endDate: string
            locationCity: string
            locationState: string
            startDate: string
            summary: Document
            title: string
        }
    }[]
    resume: {
        id: string
        name: string
        location: string
        website: string
        linkedin: string
        github: string
        summary: Document
        [key: string]: any
    }
    skills: { name: string }[]
}

export async function getStaticProps() {
    const resumeRes = await client.getEntry('3I5r4Nxi1jjMwLSPV8guMq');
    const skillsRes = await client.getEntries({
        content_type: 'skills',
        order: 'fields.name'
    });
    const experiencesRes = await client.getEntries({
        content_type: 'resumeExperience',
        order: '-fields.startDate'
    });
    const educationRes = await client.getEntries({
        content_type: 'resumeEducation',
        order: '-fields.yearStart'
    });
    const certificationsRes = await client.getEntries({
        content_type: 'certifications',
    });
    const codeExamplesRes = await client.getEntries({
        content_type: 'codeExamples',
    });

    return {
        props: {
            certifications: certificationsRes?.items || [],
            codeExamples: codeExamplesRes?.items || [],
            education: educationRes?.items || [],
            experiences: experiencesRes?.items || [],
            resume: resumeRes.fields || {},
            skills: skillsRes?.items?.map(({ fields }) => fields) || [],
        },
    }
}

export default function ResumePage({
    certifications,
    codeExamples,
    education,
    experiences,
    resume,
    skills,
}: ResumePageProps) {
    return (
        <Layout className="resume-page">
            <SEO title="Resume" />
            <Resume
                certifications={certifications}
                codeExamples={codeExamples}
                education={education}
                experiences={experiences}
                resume={resume}
                skills={skills}
            />
        </Layout>
    );
}
