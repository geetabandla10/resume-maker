"use client";

import { useState, useCallback, useEffect } from 'react';
import { Edit3, ChevronDown, Pencil, Plus, Trash2, Eye, ChevronRight } from 'lucide-react';
import { templates, TemplateId } from './templates';
import DownloadButton from './DownloadButton';
import TemplateSelector from './TemplateSelector';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LiveResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone?: string;
        location?: string;
        website?: string;
        linkedin?: string;
        summary?: string;
    };
    experience: Array<{
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
        bullets: string[];
    }>;
    education: Array<{
        institution: string;
        degree: string;
        fieldOfStudy: string;
        startDate: string;
        endDate?: string;
    }>;
    skills: string[];
    generated_content?: {
        summary?: string;
        enhancedExperience?: Array<{
            company: string;
            position: string;
            startDate?: string;
            endDate?: string;
            dateRange?: string;
            bullets: string[];
        }>;
    };
    personal_info?: any;
    template_id?: string;
}

interface Props {
    initialData: LiveResumeData;
    initialTemplateId?: string;
    resumeId?: string;
}

// ─── Small components ──────────────────────────────────────────────────────────

function Field({ label, value, onChange, multiline = false }: {
    label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
    return (
        <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition resize-none"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition"
                />
            )}
        </div>
    );
}

function Section({ title, icon, children, defaultOpen = true }: {
    title: string; icon?: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    {icon}
                    {title}
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <div className="p-4 space-y-4 bg-white">{children}</div>}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LivePreviewEditor({ initialData, initialTemplateId = 'standard' }: Props) {
    const [templateId, setTemplateId] = useState(initialTemplateId);
    const [data, setData] = useState<LiveResumeData>(initialData);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

    const updatePersonal = useCallback((field: string, value: string) => {
        setSaveStatus('saving');
        setData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value },
            personal_info: { ...(prev.personal_info || prev.personalInfo), [field]: value },
            ...(field === 'summary' && {
                generated_content: { ...prev.generated_content, summary: value },
            }),
        }));
    }, []);

    const updateExpField = useCallback((idx: number, field: string, value: string) => {
        setSaveStatus('saving');
        setData(prev => {
            const exp = prev.experience.map((e, i) => i === idx ? { ...e, [field]: value } : e);
            const enhanced = prev.generated_content?.enhancedExperience?.map((e, i) =>
                i === idx ? { ...e, [field]: value } : e
            );
            return {
                ...prev,
                experience: exp,
                generated_content: enhanced ? { ...prev.generated_content, enhancedExperience: enhanced } : prev.generated_content,
            };
        });
    }, []);

    const updateExpBullet = useCallback((expIdx: number, bulletIdx: number, value: string) => {
        setSaveStatus('saving');
        setData(prev => {
            const exp = prev.experience.map((e, i) => {
                if (i !== expIdx) return e;
                const bullets = e.bullets.map((b, j) => j === bulletIdx ? value : b);
                return { ...e, bullets };
            });
            const enhanced = prev.generated_content?.enhancedExperience?.map((e, i) => {
                if (i !== expIdx) return e;
                const bullets = (e.bullets || []).map((b: string, j: number) => j === bulletIdx ? value : b);
                return { ...e, bullets };
            });
            return {
                ...prev,
                experience: exp,
                generated_content: enhanced ? { ...prev.generated_content, enhancedExperience: enhanced } : prev.generated_content,
            };
        });
    }, []);

    // Auto-save effect (simulated)
    useEffect(() => {
        if (saveStatus === 'saving') {
            const timeout = setTimeout(() => {
                setSaveStatus('saved');
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [saveStatus]);

    const addExpBullet = useCallback((expIdx: number) => {
        setSaveStatus('saving');
        setData(prev => {
            const exp = prev.experience.map((e, i) =>
                i === expIdx ? { ...e, bullets: [...e.bullets, ''] } : e
            );
            const enhanced = prev.generated_content?.enhancedExperience?.map((e, i) =>
                i === expIdx ? { ...e, bullets: [...(e.bullets || []), ''] } : e
            );
            return {
                ...prev, experience: exp,
                generated_content: enhanced ? { ...prev.generated_content, enhancedExperience: enhanced } : prev.generated_content,
            };
        });
    }, []);

    const removeExpBullet = useCallback((expIdx: number, bulletIdx: number) => {
        setSaveStatus('saving');
        setData(prev => {
            const exp = prev.experience.map((e, i) =>
                i === expIdx ? { ...e, bullets: e.bullets.filter((_, j) => j !== bulletIdx) } : e
            );
            const enhanced = prev.generated_content?.enhancedExperience?.map((e, i) =>
                i === expIdx ? { ...e, bullets: (e.bullets || []).filter((_: any, j: number) => j !== bulletIdx) } : e
            );
            return {
                ...prev, experience: exp,
                generated_content: enhanced ? { ...prev.generated_content, enhancedExperience: enhanced } : prev.generated_content,
            };
        });
    }, []);

    const addExperience = useCallback(() => {
        setSaveStatus('saving');
        const newExp = { company: 'Company Name', position: 'Your Role', startDate: 'Jan 2023', endDate: 'Present', bullets: ['Describe your key achievement here'] };
        setData(prev => ({
            ...prev,
            experience: [...prev.experience, newExp],
            generated_content: prev.generated_content ? {
                ...prev.generated_content,
                enhancedExperience: [...(prev.generated_content.enhancedExperience || []), newExp],
            } : prev.generated_content,
        }));
    }, []);

    const removeExperience = useCallback((idx: number) => {
        setSaveStatus('saving');
        setData(prev => {
            const exp = prev.experience.filter((_, i) => i !== idx);
            const enhanced = prev.generated_content?.enhancedExperience?.filter((_, i) => i !== idx);
            return {
                ...prev, experience: exp,
                generated_content: enhanced ? { ...prev.generated_content, enhancedExperience: enhanced } : prev.generated_content,
            };
        });
    }, []);

    const updateEduField = useCallback((idx: number, field: string, value: string) => {
        setSaveStatus('saving');
        setData(prev => ({
            ...prev,
            education: prev.education.map((e, i) => i === idx ? { ...e, [field]: value } : e),
        }));
    }, []);

    const updateSkill = useCallback((idx: number, value: string) => {
        setSaveStatus('saving');
        setData(prev => {
            const skills = prev.skills.map((s, i) => i === idx ? value : s);
            return { ...prev, skills };
        });
    }, []);

    const removeSkill = useCallback((idx: number) => {
        setSaveStatus('saving');
        setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
    }, []);

    const addSkill = useCallback(() => {
        setSaveStatus('saving');
        setData(prev => ({ ...prev, skills: [...prev.skills, 'New Skill'] }));
    }, []);

    // Normalize data for templates
    const templateData = {
        ...data,
        personal_info: data.personal_info || data.personalInfo,
        personalInfo: data.personalInfo,
        skills: data.skills,
        experience: data.experience,
        education: data.education,
        generated_content: {
            summary: data.generated_content?.summary ?? data.personalInfo?.summary ?? '',
            enhancedExperience: data.generated_content?.enhancedExperience ?? data.experience,
        },
    };

    const SelectedTemplate = templates[templateId as TemplateId] || templates.standard;

    const navItems = [
        { key: 'personal', label: 'Personal' },
        { key: 'experience', label: 'Experience' },
        { key: 'education', label: 'Education' },
        { key: 'skills', label: 'Skills' },
    ] as const;

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Top action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <Pencil className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-semibold text-gray-700">Live Editor</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <button
                        onClick={() => setShowTemplateSelector(v => !v)}
                        className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Change Template
                        <ChevronDown className={`h-3 w-3 transition-transform ${showTemplateSelector ? 'rotate-180' : ''}`} />
                    </button>
                    {saveStatus !== 'idle' && (
                        <div className="flex items-center gap-1.5 px-2">
                            <div className={`h-2 w-2 rounded-full ${saveStatus === 'saving' ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
                            <span className="text-[10px] font-medium text-gray-400">
                                {saveStatus === 'saving' ? 'Saving...' : 'Saved ✓'}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {/* Mobile Tab Toggle */}
                    <div className="lg:hidden flex bg-gray-100 p-1 rounded-full border border-gray-200">
                        <button
                            onClick={() => setMobileTab('edit')}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${mobileTab === 'edit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setMobileTab('preview')}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${mobileTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            Preview
                        </button>
                    </div>
                    <DownloadButton targetId="resume-printable-area" fileName="my-resume" />
                </div>
            </div>

            {/* Template selector dropdown */}
            {showTemplateSelector && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <TemplateSelector
                        selectedTemplateId={templateId}
                        onSelect={(id) => { setTemplateId(id); setShowTemplateSelector(false); }}
                    />
                </div>
            )}

            {/* Main split layout */}
            <div className="flex flex-col lg:flex-row gap-6 min-h-0">

                {/* Left: Editor Panel */}
                <div className={`${mobileTab === 'edit' ? 'flex' : 'hidden lg:flex'} w-full lg:w-[380px] shrink-0 flex flex-col gap-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
                    {/* Section nav tabs */}
                    <div className="flex border-b border-gray-100">
                        {navItems.map(item => (
                            <button
                                key={item.key}
                                onClick={() => setActiveSection(item.key)}
                                className={`flex-1 px-2 py-2.5 text-[11px] font-semibold transition-colors ${activeSection === item.key
                                    ? 'text-indigo-700 border-b-2 border-indigo-600 bg-indigo-50/50'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Editor content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[780px]">

                        {/* Personal Info */}
                        {activeSection === 'personal' && (
                            <div className="space-y-3">
                                <Field label="Full Name" value={data.personalInfo.fullName} onChange={v => updatePersonal('fullName', v)} />
                                <Field label="Email" value={data.personalInfo.email} onChange={v => updatePersonal('email', v)} />
                                <Field label="Phone" value={data.personalInfo.phone ?? ''} onChange={v => updatePersonal('phone', v)} />
                                <Field label="Location" value={data.personalInfo.location ?? ''} onChange={v => updatePersonal('location', v)} />
                                <Field label="LinkedIn URL" value={data.personalInfo.linkedin ?? ''} onChange={v => updatePersonal('linkedin', v)} />
                                <Field label="Website" value={data.personalInfo.website ?? ''} onChange={v => updatePersonal('website', v)} />
                                <Field label="Professional Summary" value={
                                    data.generated_content?.summary ?? data.personalInfo?.summary ?? ''
                                } onChange={v => updatePersonal('summary', v)} multiline />
                            </div>
                        )}

                        {/* Experience */}
                        {activeSection === 'experience' && (
                            <div className="space-y-4">
                                {(data.generated_content?.enhancedExperience ?? data.experience).map((exp, expIdx) => (
                                    <Section
                                        key={expIdx}
                                        title={exp.position || 'Position'}
                                        icon={<ChevronRight className="h-3.5 w-3.5 text-indigo-400" />}
                                        defaultOpen={expIdx === 0}
                                    >
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => removeExperience(expIdx)}
                                                className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-1"
                                            >
                                                <Trash2 className="h-3 w-3" /> Remove Entry
                                            </button>
                                        </div>
                                        <Field label="Company" value={exp.company} onChange={v => updateExpField(expIdx, 'company', v)} />
                                        <Field label="Position / Title" value={exp.position} onChange={v => updateExpField(expIdx, 'position', v)} />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Start Date" value={exp.startDate ?? ''} onChange={v => updateExpField(expIdx, 'startDate', v)} />
                                            <Field label="End Date" value={exp.endDate ?? (exp as any).dateRange ?? ''} onChange={v => updateExpField(expIdx, 'endDate', v)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Bullets</label>
                                            {(exp.bullets || []).map((bullet: string, bIdx: number) => (
                                                <div key={bIdx} className="flex gap-2 items-start">
                                                    <span className="mt-2.5 text-gray-300 text-xs font-bold shrink-0">▸</span>
                                                    <textarea
                                                        value={bullet}
                                                        onChange={e => updateExpBullet(expIdx, bIdx, e.target.value)}
                                                        rows={2}
                                                        className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition resize-none"
                                                    />
                                                    <button
                                                        onClick={() => removeExpBullet(expIdx, bIdx)}
                                                        className="mt-2 text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => addExpBullet(expIdx)}
                                                className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                                            >
                                                <Plus className="h-3.5 w-3.5" /> Add bullet
                                            </button>
                                        </div>
                                    </Section>
                                ))}
                                <button
                                    onClick={addExperience}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                                >
                                    <Plus className="h-4 w-4" /> Add Experience
                                </button>
                            </div>
                        )}

                        {/* Education */}
                        {activeSection === 'education' && (
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <Section key={idx} title={edu.institution || 'Institution'} icon={<ChevronRight className="h-3.5 w-3.5 text-indigo-400" />} defaultOpen={idx === 0}>
                                        <Field label="Institution" value={edu.institution} onChange={v => updateEduField(idx, 'institution', v)} />
                                        <Field label="Degree" value={edu.degree} onChange={v => updateEduField(idx, 'degree', v)} />
                                        <Field label="Field of Study" value={edu.fieldOfStudy} onChange={v => updateEduField(idx, 'fieldOfStudy', v)} />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Start" value={edu.startDate} onChange={v => updateEduField(idx, 'startDate', v)} />
                                            <Field label="End" value={edu.endDate ?? ''} onChange={v => updateEduField(idx, 'endDate', v)} />
                                        </div>
                                    </Section>
                                ))}
                            </div>
                        )}

                        {/* Skills */}
                        {activeSection === 'skills' && (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {data.skills.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5">
                                            <input
                                                type="text"
                                                value={skill}
                                                onChange={e => updateSkill(idx, e.target.value)}
                                                className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition"
                                            />
                                            <button
                                                onClick={() => removeSkill(idx)}
                                                className="shrink-0 text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={addSkill}
                                    className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                >
                                    <Plus className="h-4 w-4" /> Add Skill
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Live Resume Preview */}
                <div className={`${mobileTab === 'preview' ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}>
                    <div className="sticky top-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Live Preview</span>
                            <span className="text-xs text-gray-400">Updates instantly as you type</span>
                        </div>
                        <div
                            className="bg-white shadow-2xl ring-1 ring-black/5 overflow-auto rounded-sm"
                            style={{ maxHeight: '90vh' }}
                        >
                            <div id="resume-printable-area">
                                <SelectedTemplate data={templateData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
