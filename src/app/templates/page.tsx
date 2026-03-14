"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { templates, templateConfig, TemplateId } from '@/components/templates';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// Dummy sample resume data for previewing templates
const SAMPLE_DATA = {
    personalInfo: {
        fullName: 'Alexandra Chen',
        email: 'alex.chen@email.com',
        phone: '+1 (555) 012-3456',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexchen',
        website: 'alexchen.dev',
    },
    personal_info: {
        fullName: 'Alexandra Chen',
        email: 'alex.chen@email.com',
        phone: '+1 (555) 012-3456',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexchen',
    },
    education: [
        {
            id: 'edu-1',
            institution: 'Stanford University',
            degree: 'B.S.',
            fieldOfStudy: 'Computer Science',
            startDate: 'Sep 2016',
            endDate: 'May 2020',
        },
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'],
    experience: [
        {
            id: 'exp-1',
            company: 'Stripe',
            position: 'Senior Software Engineer',
            startDate: 'Jan 2022',
            endDate: 'Present',
            description: 'Led development of payment infrastructure\nImproved API latency by 40%',
            bullets: [],
        },
        {
            id: 'exp-2',
            company: 'Airbnb',
            position: 'Software Engineer',
            startDate: 'Jun 2020',
            endDate: 'Dec 2021',
            description: 'Built real-time booking features\nMentored junior engineers',
            bullets: [],
        },
    ],
    generated_content: {
        summary:
            'Results-driven software engineer with 4+ years of experience building scalable web applications. Passionate about developer experience, performance optimization, and elegant code architecture.',
        enhancedExperience: [
            {
                company: 'Stripe',
                position: 'Senior Software Engineer',
                startDate: 'Jan 2022',
                endDate: 'Present',
                dateRange: 'Jan 2022 – Present',
                bullets: [
                    'Led development of core payment infrastructure serving 50M+ daily transactions.',
                    'Improved API response latency by 40% through intelligent caching and query optimization.',
                    'Mentored a team of 5 engineers and drove adoption of TypeScript across the team.',
                ],
            },
            {
                company: 'Airbnb',
                position: 'Software Engineer',
                startDate: 'Jun 2020',
                endDate: 'Dec 2021',
                dateRange: 'Jun 2020 – Dec 2021',
                bullets: [
                    'Built real-time booking availability features used by 2M+ hosts globally.',
                    'Reduced front-end bundle size by 35% using code splitting and lazy loading.',
                    'Collaborated with design to launch the new host onboarding flow, increasing host signups by 18%.',
                ],
            },
        ],
    },
};

const TEMPLATE_COLORS: Record<string, string> = {
    standard: 'from-slate-500 to-slate-700',
    modern: 'from-indigo-500 to-violet-600',
    professional: 'from-gray-700 to-gray-900',
    creative: 'from-purple-500 to-pink-600',
    minimalist: 'from-gray-300 to-gray-500',
    executive: 'from-amber-600 to-amber-800',
    tech: 'from-emerald-500 to-teal-700',
    elegant: 'from-rose-500 to-pink-700',
    two_column: 'from-sky-500 to-blue-700',
    bold: 'from-red-500 to-red-700',
};

export default function TemplatesPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [previewId, setPreviewId] = useState<string>('professional');

    const PreviewTemplate = templates[previewId as TemplateId] || templates.standard;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="bg-white border-b border-gray-100 py-14 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                        Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Templates</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                        Browse our professionally designed templates. Pick one, edit it directly in the browser, and download as a polished PDF.
                    </p>
                    <Link
                        href="/create"
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                    >
                        Build My Resume <ArrowRight className="h-5 w-5" />
                    </Link>
                </section>

                {/* Main: split grid + preview */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-[1300px]">
                    <div className="flex flex-col xl:flex-row gap-10">

                        {/* Left: template grid */}
                        <div className="w-full xl:w-[420px] shrink-0">
                            <h2 className="text-lg font-bold text-gray-800 mb-5">
                                {templateConfig.length} Designs Available
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-4">
                                {templateConfig.map(t => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => { setPreviewId(t.id); setSelectedId(t.id); }}
                                        className={`relative group flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-200 text-left ${previewId === t.id
                                                ? 'border-indigo-600 shadow-xl shadow-indigo-200/50'
                                                : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
                                            }`}
                                    >
                                        {/* Color band */}
                                        <div className={`h-20 bg-gradient-to-br ${TEMPLATE_COLORS[t.id] || 'from-gray-400 to-gray-600'} w-full relative`}>
                                            {/* Mini layout lines */}
                                            <div className="absolute inset-3 flex flex-col gap-1.5 opacity-30">
                                                <div className="h-2 w-3/4 rounded-full bg-white" />
                                                <div className="h-1 w-1/2 rounded-full bg-white" />
                                                <div className="flex gap-2 mt-1">
                                                    <div className="h-1 flex-1 rounded-full bg-white" />
                                                    <div className="h-1 flex-1 rounded-full bg-white" />
                                                </div>
                                                <div className="h-1 w-5/6 rounded-full bg-white" />
                                            </div>
                                            {previewId === t.id && (
                                                <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-3 py-2.5 bg-white">
                                            <div className={`text-[12px] font-bold truncate ${previewId === t.id ? 'text-indigo-700' : 'text-gray-800'}`}>
                                                {t.name}
                                            </div>
                                            <div className="text-[10px] text-gray-400 mt-0.5 truncate">{t.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-8 p-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-lg shadow-indigo-300/40">
                                <h3 className="font-bold text-lg mb-1">Ready to start?</h3>
                                <p className="text-indigo-200 text-sm mb-4">Fill in your details and our AI will generate your resume in seconds.</p>
                                <Link
                                    href="/create"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 hover:bg-indigo-50 transition-colors"
                                >
                                    Get Started <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right: real template preview */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800">
                                    Preview:{' '}
                                    <span className="text-indigo-600">
                                        {templateConfig.find(t => t.id === previewId)?.name}
                                    </span>
                                </h2>
                                <Link
                                    href="/create"
                                    className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow"
                                >
                                    Use this template <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                            <div className="bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden rounded-sm" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                <div style={{ minWidth: 700, transformOrigin: 'top left' }}>
                                    <PreviewTemplate data={SAMPLE_DATA} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
