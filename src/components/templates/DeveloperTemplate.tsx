import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Terminal, Cpu } from 'lucide-react';

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

export default function DeveloperTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-[#0f172a] p-12 min-h-[1056px] text-slate-300 font-mono shadow-2xl border border-slate-800 mx-auto max-w-[800px]">
            <div className="border-b-2 border-slate-700 pb-8 mb-8 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                        <Terminal size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">User Profile</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {personalInfo.fullName}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                        <span className="text-slate-500">_email:</span> <span className="text-emerald-400">"{personalInfo.email}"</span>
                        {personalInfo.phone && <><span className="text-slate-500">_tel:</span> <span className="text-emerald-400">"{personalInfo.phone}"</span></>}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-[10px] text-slate-500 font-bold uppercase">
                    {personalInfo.location && <span>// {personalInfo.location}</span>}
                    {personalInfo.website && <span className="text-indigo-400 hover:underline cursor-pointer">{personalInfo.website}</span>}
                </div>
            </div>

            <div className="space-y-10">
                {summary && (
                    <section>
                        <div className="text-slate-500 text-xs mb-2 font-bold uppercase tracking-tighter flex items-center gap-2">
                            <span className="text-indigo-500">★</span> About
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 border-l-2 border-slate-800 pl-6 italic">
                            {`/** ${summary} */`}
                        </p>
                    </section>
                )}

                <section>
                    <div className="text-slate-500 text-xs mb-6 font-bold uppercase tracking-tighter flex items-center gap-2">
                        <span className="text-indigo-500">★</span> Experience.map(exp ={'>'} ...)
                    </div>
                    <div className="space-y-8">
                        {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                            <div key={idx} className="group relative pl-6 border-l border-slate-800">
                                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-slate-800 border-2 border-slate-700 group-hover:bg-indigo-500 transition-colors"></div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-base font-bold text-white uppercase tracking-tight">{exp.company}</h3>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-0.5 bg-slate-900 rounded">
                                        {exp.dateRange || `${exp.startDate} ${'`'}to${'`'} ${exp.endDate || 'Present'}`}
                                    </span>
                                </div>
                                <div className="text-xs font-bold text-indigo-400 mb-4 tracking-wider">{`const position = "${exp.position}";`}</div>
                                <ul className="space-y-2">
                                    {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                        <li key={bIdx} className="text-sm leading-relaxed text-slate-400 flex gap-3">
                                            <span className="text-slate-600">-{'>'}</span>
                                            <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="text-slate-500 text-xs mb-6 font-bold uppercase tracking-tighter flex items-center gap-2">
                        <span className="text-indigo-500">★</span> Skills.json
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                        <div className="flex flex-wrap gap-4">
                            {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2 group">
                                    <Cpu size={14} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                                    <span className="text-xs font-bold text-slate-400 group-hover:text-white">{skill.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="text-slate-500 text-xs mb-4 font-bold uppercase tracking-tighter flex items-center gap-2">
                        <span className="text-indigo-500">★</span> Education.md
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800 rounded">
                                <h3 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">{edu.institution}</h3>
                                <p className="text-[10px] text-slate-500 font-bold italic mb-2 tracking-tighter">{edu.degree}</p>
                                <p className="text-[9px] text-indigo-400/80 font-bold uppercase">{edu.startDate} - {edu.endDate || 'Present'}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
