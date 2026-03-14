"use client";

import { useState, useCallback, useEffect } from 'react';
import {
    ChevronDown,
    Plus,
    Trash2,
    ChevronRight,
    Layout,
    Type,
    Palette,
    Save,
    Share2,
    Sparkles
} from 'lucide-react';
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
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">{label}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={4}
                    className="w-full rounded border border-[#E3E4E7] bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-500 transition resize-none"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full rounded border border-[#E3E4E7] bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-indigo-500 transition"
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
        <div className="rounded-lg border border-[#E3E4E7] overflow-hidden bg-white">
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F9F9FB] hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-600">
                    {icon}
                    {title}
                </div>
                <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <div className="p-3 space-y-4">{children}</div>}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LivePreviewEditor({ initialData, initialTemplateId = 'standard' }: Props) {
    const [templateId, setTemplateId] = useState(initialTemplateId);
    const [data, setData] = useState<LiveResumeData>(initialData);
    const [activeTool, setActiveTool] = useState<'templates' | 'content' | 'styles'>('content');
    const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [zoom, setZoom] = useState(100);

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
        const newExp = { company: 'New Company', position: 'Your Role', startDate: '2023', endDate: 'Present', bullets: ['Your key achievement'] };
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

    useEffect(() => {
        if (saveStatus === 'saving') {
            const timeout = setTimeout(() => setSaveStatus('saved'), 1000);
            return () => clearTimeout(timeout);
        }
    }, [saveStatus]);

    // Normalize data for templates
    const templateData = {
        ...data,
        personal_info: data.personal_info || data.personalInfo,
        personalInfo: data.personalInfo,
        skills: data.skills,
        experience: data.experience.map((exp, i) => ({
            ...exp,
            id: `exp-${i}`,
            description: exp.bullets.join('\n'),
        })),
        education: data.education.map((edu, i) => ({
            ...edu,
            id: `edu-${i}`
        })),
        generated_content: {
            summary: data.generated_content?.summary ?? data.personalInfo?.summary ?? '',
            enhancedExperience: (data.generated_content?.enhancedExperience ?? data.experience).map((exp, i) => ({
                ...exp,
                id: `exp-${i}`,
                description: exp.bullets ? exp.bullets.join('\n') : (exp as any).description || '',
            })),
        },
    };

    const SelectedTemplate = templates[templateId as TemplateId] || templates.standard;

    const navItems = [
        { key: 'personal', label: 'Personal' },
        { key: 'experience', label: 'Experience' },
        { key: 'education', label: 'Education' },
        { key: 'skills', label: 'Skills' },
    ] as const;

    const sidebarTools = [
        { id: 'templates', icon: <Layout size={20} />, label: 'Templates' },
        { id: 'content', icon: <Type size={20} />, label: 'Content' },
        { id: 'styles', icon: <Palette size={20} />, label: 'Styles' },
    ] as const;

    return (
        <div className="fixed inset-0 flex flex-col bg-[#F2F3F5] overflow-hidden">
            {/* Canva Top Bar */}
            <header className="h-14 bg-[#0F172A] flex items-center justify-between px-4 shrink-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg shadow-lg">
                        <Sparkles className="text-white h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-white leading-tight uppercase tracking-widest">Resume Studio</h1>
                        <p className="text-[10px] text-indigo-400 font-bold">Powered by AI</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {saveStatus !== 'idle' && (
                        <div className="flex items-center gap-2 mr-4">
                            <div className={`h-1.5 w-1.5 rounded-full ${saveStatus === 'saving' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {saveStatus === 'saving' ? 'Saving' : 'Saved'}
                            </span>
                        </div>
                    )}
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded shadow-lg shadow-indigo-500/20 transition-all">
                        <Save size={14} /> SAVE
                    </button>
                    <DownloadButton targetId="resume-printable-area" fileName="my-resume" />
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded transition-all">
                        <Share2 size={14} /> SHARE
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Canva Left Sidebar */}
                <aside className="w-[72px] bg-[#18191B] flex flex-col items-center py-4 shrink-0 z-40">
                    {sidebarTools.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`w-full flex flex-col items-center gap-1.5 py-4 transition-all ${activeTool === tool.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <div className={`p-2.5 rounded-xl transition-all ${activeTool === tool.id ? 'bg-white/10 shadow-inner' : ''}`}>
                                {tool.icon}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tight">{tool.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Tool Panel */}
                <div className="w-[360px] bg-[#FFFFFF] border-r border-[#E3E4E7] flex flex-col shrink-0 z-30 shadow-2xl overflow-hidden">
                    <div className="h-14 border-b border-[#E3E4E7] flex items-center px-4 shrink-0 bg-white">
                        <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#18191B]">{activeTool}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                        {activeTool === 'templates' && (
                            <div className="p-4">
                                <TemplateSelector
                                    selectedTemplateId={templateId}
                                    onSelect={(id) => setTemplateId(id)}
                                />
                            </div>
                        )}

                        {activeTool === 'content' && (
                            <div className="flex flex-col h-full">
                                <div className="flex border-b border-[#E3E4E7] sticky top-0 bg-white z-10">
                                    {navItems.map(item => (
                                        <button
                                            key={item.key}
                                            onClick={() => setActiveSection(item.key)}
                                            className={`flex-1 px-1 py-4 text-[9px] font-black uppercase tracking-widest transition-all ${activeSection === item.key
                                                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/20'
                                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-5 space-y-6">
                                    {activeSection === 'personal' && (
                                        <div className="space-y-5">
                                            <Field label="Full Name" value={data.personalInfo.fullName} onChange={v => updatePersonal('fullName', v)} />
                                            <Field label="Email" value={data.personalInfo.email} onChange={v => updatePersonal('email', v)} />
                                            <Field label="Phone" value={data.personalInfo.phone ?? ''} onChange={v => updatePersonal('phone', v)} />
                                            <Field label="Location" value={data.personalInfo.location ?? ''} onChange={v => updatePersonal('location', v)} />
                                            <Field label="Professional Summary" value={
                                                data.generated_content?.summary ?? data.personalInfo?.summary ?? ''
                                            } onChange={v => updatePersonal('summary', v)} multiline />
                                        </div>
                                    )}

                                    {activeSection === 'experience' && (
                                        <div className="space-y-4">
                                            {(data.generated_content?.enhancedExperience ?? data.experience).map((exp, expIdx) => (
                                                <Section
                                                    key={expIdx}
                                                    title={exp.position || 'Position'}
                                                    icon={<ChevronRight className="h-4 w-4 text-indigo-500" />}
                                                    defaultOpen={expIdx === 0}
                                                >
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() => removeExperience(expIdx)}
                                                            className="text-[9px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                                                        >
                                                            Remove Entry
                                                        </button>
                                                    </div>
                                                    <Field label="Company" value={exp.company} onChange={v => updateExpField(expIdx, 'company', v)} />
                                                    <Field label="Position" value={exp.position} onChange={v => updateExpField(expIdx, 'position', v)} />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Field label="Start" value={exp.startDate ?? ''} onChange={v => updateExpField(expIdx, 'startDate', v)} />
                                                        <Field label="End" value={exp.endDate ?? (exp as any).dateRange ?? ''} onChange={v => updateExpField(expIdx, 'endDate', v)} />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Achievements</label>
                                                        {(exp.bullets || []).map((bullet: string, bIdx: number) => (
                                                            <div key={bIdx} className="flex gap-2 items-start group">
                                                                <textarea
                                                                    value={bullet}
                                                                    onChange={e => updateExpBullet(expIdx, bIdx, e.target.value)}
                                                                    rows={1}
                                                                    className="flex-1 rounded border border-[#E3E4E7] bg-white px-2.5 py-2 text-[11px] outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition resize-none"
                                                                />
                                                                <button onClick={() => removeExpBullet(expIdx, bIdx)} className="mt-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <Trash2 size={12} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button onClick={() => addExpBullet(expIdx)} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-colors">+ Add line</button>
                                                    </div>
                                                </Section>
                                            ))}
                                            <button
                                                onClick={addExperience}
                                                className="w-full py-4 border-2 border-dashed border-[#E3E4E7] rounded-xl text-[10px] font-black text-gray-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 uppercase tracking-[0.15em] transition-all"
                                            >
                                                + Add Experience
                                            </button>
                                        </div>
                                    )}

                                    {activeSection === 'education' && (
                                        <div className="space-y-4">
                                            {data.education.map((edu, idx) => (
                                                <Section key={idx} title={edu.institution || 'Institution'} icon={<ChevronRight className="h-4 w-4 text-indigo-500" />} defaultOpen={idx === 0}>
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

                                    {activeSection === 'skills' && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-3">
                                                {data.skills.map((skill, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 group">
                                                        <input
                                                            type="text"
                                                            value={skill}
                                                            onChange={e => updateSkill(idx, e.target.value)}
                                                            className="flex-1 min-w-0 rounded border border-[#E3E4E7] bg-white px-3 py-2 text-xs text-gray-800 outline-none focus:border-indigo-400 transition"
                                                        />
                                                        <button
                                                            onClick={() => removeSkill(idx)}
                                                            className="shrink-0 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={addSkill}
                                                className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-colors"
                                            >
                                                + Add Skill
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTool === 'styles' && (
                            <div className="p-6 space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Workspace Zoom</label>
                                    <input
                                        type="range"
                                        min="40"
                                        max="150"
                                        value={zoom}
                                        onChange={e => setZoom(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                    <div className="flex justify-between text-[10px] font-black text-gray-400">
                                        <span>40%</span>
                                        <span className="text-indigo-600">{zoom}%</span>
                                        <span>150%</span>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8 border-t border-gray-100">
                                    <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Global Styles</h3>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <p className="text-[11px] leading-relaxed text-gray-500 italic">Advanced style controls (fonts, colors, line-height) are coming in the next update. Templates currently use preset professional styles.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Workspace */}
                <main className="flex-1 relative overflow-auto custom-scrollbar p-16 flex justify-center items-start bg-[#E3E4E7]/30">
                    <div className="transition-all duration-300 origin-top shadow-[0_20px_50px_rgba(0,0,0,0.15)]" style={{ transform: `scale(${zoom / 100})` }}>
                        <div id="resume-printable-area" className="bg-white">
                            <SelectedTemplate data={templateData} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
