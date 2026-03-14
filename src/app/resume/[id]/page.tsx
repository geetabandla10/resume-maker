"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import LivePreviewEditor, { LiveResumeData } from '@/components/LivePreviewEditor';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

function buildLiveData(raw: any): LiveResumeData {
    // Normalise from the Supabase row format to the LiveResumeData format
    const personalInfo = raw.personal_info || {};
    const generatedContent = raw.generated_content || {};

    // Experience: prefer generated_content.enhancedExperience, fall back to raw.experience
    const rawExp: any[] = raw.experience || [];
    const enhancedExp: any[] = generatedContent.enhancedExperience || rawExp;

    const experience = rawExp.map((exp: any, i: number) => ({
        company: exp.company || enhancedExp[i]?.company || '',
        position: exp.position || enhancedExp[i]?.position || '',
        startDate: exp.startDate || enhancedExp[i]?.startDate || '',
        endDate: exp.endDate || enhancedExp[i]?.endDate || '',
        bullets: enhancedExp[i]?.bullets || (exp.description ? exp.description.split('\n').filter(Boolean) : []),
    }));

    const education = (raw.education || []).map((edu: any) => ({
        institution: edu.institution || '',
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
    }));

    const rawSkills = raw.skills;
    const skills: string[] = Array.isArray(rawSkills)
        ? rawSkills
        : typeof rawSkills === 'string'
            ? rawSkills.split(',').map((s: string) => s.trim()).filter(Boolean)
            : [];

    return {
        personalInfo: {
            fullName: personalInfo.fullName || '',
            email: personalInfo.email || '',
            phone: personalInfo.phone || '',
            location: personalInfo.location || '',
            website: personalInfo.website || '',
            linkedin: personalInfo.linkedin || '',
            summary: generatedContent.summary || '',
        },
        experience,
        education,
        skills,
        generated_content: {
            summary: generatedContent.summary || '',
            enhancedExperience: enhancedExp.map((exp: any, i: number) => ({
                ...exp,
                bullets: experience[i]?.bullets || exp.bullets || [],
            })),
        },
        personal_info: personalInfo,
        template_id: raw.template_id,
    };
}

export default function ResumePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [resumeData, setResumeData] = useState<LiveResumeData | null>(null);
    const [templateId, setTemplateId] = useState('standard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchResume() {
            if (!id) return;
            const { data, error: sbError } = await supabase
                .from('resumes')
                .select('*')
                .eq('id', id)
                .single();

            if (sbError || !data) {
                setError('Resume not found or there was an error loading it.');
                console.error(sbError);
            } else {
                setResumeData(buildLiveData(data));
                setTemplateId(data.template_id || 'standard');
            }
            setLoading(false);
        }
        fetchResume();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
                <Header />
                <main className="flex-1 py-10">
                    <div className="container mx-auto px-4 max-w-[1400px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />
                            <div className="h-10 w-32 bg-slate-200 rounded-full animate-pulse" />
                        </div>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-[380px] h-[700px] bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
                                <div className="h-8 w-full bg-slate-50 rounded animate-pulse" />
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="h-12 w-full bg-slate-50 rounded-lg animate-pulse" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 h-[900px] bg-white rounded shadow-sm p-12 space-y-8">
                                <div className="h-16 w-1/3 bg-slate-50 rounded mx-auto animate-pulse" />
                                <div className="h-4 w-1/4 bg-slate-50 rounded mx-auto animate-pulse" />
                                <div className="space-y-4 pt-10">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="h-4 w-full bg-slate-50 rounded animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !resumeData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Header />
                <main className="flex-1 flex items-center justify-center p-6 text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
                        <p className="text-gray-600 mb-6">{error || 'Something went wrong.'}</p>
                        <button onClick={() => router.push('/create')} className="text-indigo-600 font-semibold hover:underline">
                            Create a new resume →
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-slate-50 font-sans overflow-hidden">
            <LivePreviewEditor
                initialData={resumeData}
                initialTemplateId={templateId}
                resumeId={id}
            />
        </div>
    );
}
