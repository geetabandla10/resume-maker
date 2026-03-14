import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Rocket } from 'lucide-react';

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

export default function StartupTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white min-h-[1056px] text-slate-900 font-sans shadow-2xl border border-indigo-50 mx-auto max-w-[800px] flex flex-col">
            <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <Rocket size={100} />
                </div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none transition-all">
                        {personalInfo.fullName}
                    </h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold opacity-90">
                        <span className="flex items-center gap-1.5"><Mail size={16} /> {personalInfo.email}</span>
                        {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={16} /> {personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={16} /> {personalInfo.location}</span>}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-10 flex gap-10">
                <div className="flex-[2] space-y-10">
                    {summary && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-tight text-indigo-600 mb-4 flex items-center gap-2">
                                <span className="w-8 h-1 bg-indigo-600"></span> Summary
                            </h2>
                            <p className="text-base leading-relaxed text-slate-600 border-l-4 border-indigo-100 pl-4 py-1 italic">
                                {summary}
                            </p>
                        </section>
                    )}

                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-tight text-indigo-600 mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-indigo-600"></span> Experience
                        </h2>
                        <div className="space-y-8">
                            {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-black group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-none">{exp.company}</h3>
                                            <div className="text-sm font-extrabold text-slate-500 mt-1 uppercase tracking-wider">{exp.position}</div>
                                        </div>
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-full whitespace-nowrap">
                                            {exp.dateRange || `${exp.startDate} - ${exp.endDate || 'Present'}`}
                                        </span>
                                    </div>
                                    <ul className="space-y-2.5 mt-4">
                                        {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-sm leading-relaxed text-slate-600 flex gap-3">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></span>
                                                <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="flex-1 space-y-10">
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-tight text-indigo-600 mb-6 flex items-center gap-2">
                            <span className="w-4 h-1 bg-indigo-600"></span> Education
                        </h2>
                        <div className="space-y-6 border-l-2 border-slate-100 pl-6">
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-slate-200 border-2 border-white"></div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight">{edu.institution}</h3>
                                    <p className="text-sm text-slate-600 font-semibold mb-1">{edu.degree}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase">{edu.startDate} - {edu.endDate || 'Present'}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-tight text-indigo-600 mb-6 flex items-center gap-2">
                            <span className="w-4 h-1 bg-indigo-600"></span> Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {(Array.isArray(skills) ? skills : skills.split(',')).map((skill, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-transform hover:-rotate-2 hover:scale-105">
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
