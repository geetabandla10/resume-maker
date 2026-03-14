import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, UserCircle, MessageSquare } from 'lucide-react';

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

export default function SidebarTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white min-h-[1056px] text-gray-800 font-sans shadow-2xl border border-gray-100 mx-auto max-w-[800px] flex">
            {/* Left Sidebar */}
            <aside className="w-[280px] bg-slate-900 p-10 text-white flex flex-col pt-20">
                <div className="mb-12">
                    <h1 className="text-4xl font-black leading-[0.9] tracking-tighter mb-4">
                        {personalInfo.fullName.split(' ').map((name, i) => (
                            <span key={i} className="block">{name}</span>
                        ))}
                    </h1>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">{experience[0]?.position || 'Professional'}</p>
                </div>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-slate-700"></span> Contacts
                        </h2>
                        <div className="space-y-4 text-sm font-medium opacity-80">
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-indigo-400" />
                                <span className="break-all">{personalInfo.email}</span>
                            </div>
                            {personalInfo.phone && <div className="flex items-center gap-3"><Phone size={16} className="text-indigo-400" /> {personalInfo.phone}</div>}
                            {personalInfo.location && <div className="flex items-center gap-3"><MapPin size={16} className="text-indigo-400" /> {personalInfo.location}</div>}
                            {personalInfo.website && <div className="flex items-center gap-3"><Globe size={16} className="text-indigo-400" /> Website</div>}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-slate-700"></span> Education
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xs font-black uppercase tracking-wider mb-1 leading-tight">{edu.institution}</h3>
                                    <p className="text-[11px] text-slate-400 font-bold italic">{edu.degree}</p>
                                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-tighter">{edu.startDate} – {edu.endDate || 'Present'}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-slate-700"></span> Core Stack
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded border border-slate-700">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-16 pt-20">
                <div className="space-y-16">
                    {summary && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-6 flex items-center gap-3">
                                <UserCircle size={20} className="text-gray-200" /> Profile Summary
                            </h2>
                            <p className="text-base leading-[1.7] text-gray-600 font-medium">
                                {summary}
                            </p>
                        </section>
                    )}

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-8 flex items-center gap-3">
                            <MessageSquare size={20} className="text-gray-200" /> Experience History
                        </h2>
                        <div className="space-y-12">
                            {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-black group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{exp.company}</h3>
                                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1 italic">{exp.position}</div>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 tabular-nums">
                                            {exp.dateRange || `${exp.startDate} / ${exp.endDate || 'Now'}`}
                                        </span>
                                    </div>
                                    <ul className="space-y-3 border-l-2 border-gray-50 pl-6 ml-1">
                                        {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-sm leading-relaxed text-gray-600 flex gap-4">
                                                <span className="text-indigo-400 font-bold">›</span>
                                                <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
