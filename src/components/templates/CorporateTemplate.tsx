import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, ShieldCheck } from 'lucide-react';

interface TemplateProps {
    data: {
        personalInfo: PersonalInfoData;
        experience: ExperienceData[];
        education: EducationData[];
        skills: string | string[];
    };
    enhancedContent?: {
        summary: string;
        enhancedExperience: any[];
    };
}

export default function CorporateTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white p-12 min-h-[1056px] text-gray-900 font-sans shadow-lg border border-gray-200 mx-auto max-w-[800px]">
            <div className="flex justify-between items-end mb-10 border-b-4 border-gray-900 pb-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-2">
                        {personalInfo.fullName}
                    </h1>
                    <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span>{personalInfo.location || 'Location'}</span>
                        <span>•</span>
                        <span>{personalInfo.email}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 text-xs font-bold text-gray-600">
                    {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-400" /> {personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1.5 uppercase tracking-tighter"><Linkedin size={14} className="text-gray-400" /> LinkedIn</span>}
                </div>
            </div>

            <div className="space-y-8">
                {summary && (
                    <section>
                        <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-3 flex items-center gap-3">
                            <ShieldCheck size={20} className="text-gray-400" />
                            Executive Summary
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-600 max-w-3xl">
                            {summary}
                        </p>
                    </section>
                )}

                <section>
                    <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-4 border-b-2 border-gray-100 pb-1">
                        Professional Experience
                    </h2>
                    <div className="space-y-6">
                        {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                            <div key={idx} className="relative pl-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-base font-bold text-gray-900">{exp.company}</h3>
                                    <span className="text-xs font-bold text-gray-400 tabular-nums uppercase">
                                        {exp.dateRange || `${exp.startDate} - ${exp.endDate || 'Present'}`}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-gray-600 italic mb-2 tracking-wide uppercase">{exp.position}</div>
                                <ul className="space-y-1.5">
                                    {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                        <li key={bIdx} className="text-sm leading-relaxed text-gray-600 flex gap-2">
                                            <span className="font-bold text-gray-300">•</span>
                                            <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-10 pt-4">
                    <section>
                        <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-4 border-b-2 border-gray-100 pb-1">
                            Education
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-bold text-gray-900">{edu.institution}</h3>
                                    <p className="text-xs text-gray-600 italic">{edu.degree}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{edu.startDate} - {edu.endDate || 'Present'}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-4 border-b-2 border-gray-100 pb-1">
                            Areas of Expertise
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {(Array.isArray(skills) ? skills : skills.split(',')).map((skill, idx) => (
                                <span key={idx} className="text-xs font-bold text-gray-600 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
