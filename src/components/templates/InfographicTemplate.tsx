import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, BarChart3, Activity, Target } from 'lucide-react';

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

export default function InfographicTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white min-h-[1056px] text-slate-800 font-sans shadow-2xl border border-slate-100 mx-auto max-w-[800px] p-12">
            <header className="flex items-center gap-8 mb-16 px-4">
                <div className="w-24 h-24 bg-teal-500 rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-lg shadow-teal-100 uppercase italic">
                    {personalInfo.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.8]">
                        {personalInfo.fullName}
                    </h1>
                    <div className="h-2 w-full bg-teal-50 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-1/3 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-6 mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1.5"><Mail size={14} className="text-teal-500" /> {personalInfo.email}</span>
                        {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-teal-500" /> {personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12">
                    {summary && (
                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex gap-8 items-center mb-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 opacity-5 blur-[100px] -mr-32 -mt-32"></div>
                            <div className="flex-1 space-y-4 relative z-10">
                                <div className="flex items-center gap-2 text-teal-600">
                                    <Target size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Core Mission</span>
                                </div>
                                <p className="text-lg leading-relaxed text-slate-600 font-medium italic">
                                    "{summary}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-7 space-y-16">
                    <section>
                        <div className="flex items-center gap-3 mb-10">
                            <Activity size={24} className="text-teal-500" />
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Impact History</h2>
                        </div>
                        <div className="space-y-12">
                            {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                                <div key={idx} className="group relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-black group-hover:text-teal-600 transition-colors uppercase italic">{exp.company}</h3>
                                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{exp.position}</div>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-teal-50 text-teal-700 rounded-full">
                                            {exp.dateRange || `${exp.startDate} – ${exp.endDate || 'Now'}`}
                                        </span>
                                    </div>
                                    <ul className="space-y-4">
                                        {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-sm leading-relaxed text-slate-600 flex gap-4">
                                                <div className="mt-2 w-1.5 h-1.5 bg-teal-400 rounded-full shrink-0"></div>
                                                <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-5 space-y-16">
                    <section>
                        <div className="flex items-center gap-3 mb-10">
                            <BarChart3 size={24} className="text-teal-500" />
                            <h2 className="text-xl font-black uppercase tracking-tighter">Skill Metrics</h2>
                        </div>
                        <div className="space-y-8">
                            {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                                <div key={idx} className="space-y-2 group cursor-default">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-teal-600 transition-colors">
                                        <span>{skill.trim()}</span>
                                        <span>{95 - (idx * 4)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-800 rounded-full group-hover:bg-teal-500 transition-all duration-700" style={{ width: `${95 - (idx * 4)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Academic</h2>
                        <div className="space-y-8 border-l border-slate-100 pl-8">
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-slate-50 border-2 border-teal-500"></div>
                                    <h3 className="text-sm font-black text-slate-900 mb-1 leading-tight">{edu.institution}</h3>
                                    <p className="text-xs text-slate-500 font-bold mb-1 opacity-60 italic">{edu.degree}</p>
                                    <p className="text-[10px] text-teal-600 font-black uppercase tracking-tighter">{edu.startDate} – {edu.endDate || 'Present'}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
