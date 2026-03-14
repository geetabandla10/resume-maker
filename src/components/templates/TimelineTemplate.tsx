import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, History, GraduationCap, Award } from 'lucide-react';

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

export default function TimelineTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white min-h-[1056px] text-gray-800 font-sans shadow-2xl border border-gray-100 mx-auto max-w-[800px]">
            <header className="p-12 text-center bg-zinc-50 border-b border-zinc-100">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
                    {personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">
                    <span>{personalInfo.email}</span>
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
                {summary && (
                    <p className="text-sm leading-relaxed text-zinc-500 max-w-xl mx-auto italic font-medium">
                        "{summary}"
                    </p>
                )}
            </header>

            <div className="p-12 grid grid-cols-12 gap-12">
                <div className="col-span-8">
                    <h2 className="text-xl font-black text-gray-900 mb-10 flex items-center gap-3">
                        <History className="text-indigo-600" size={24} />
                        Career Path
                    </h2>
                    <div className="relative border-l-4 border-indigo-100 ml-4 space-y-12">
                        {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                            <div key={idx} className="relative pl-10 group">
                                <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-600 group-hover:bg-indigo-600 transition-colors shadow-sm"></div>
                                <div className="mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">
                                        {exp.dateRange || `${exp.startDate} — ${exp.endDate || 'Now'}`}
                                    </span>
                                    <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{exp.company}</h3>
                                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-wide mt-1 italic">{exp.position}</p>
                                </div>
                                <ul className="space-y-3">
                                    {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                        <li key={bIdx} className="text-sm leading-relaxed text-zinc-600 flex gap-3">
                                            <span className="text-indigo-300 font-bold">•</span>
                                            <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-4 space-y-12 pt-4">
                    <section>
                        <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                            <GraduationCap className="text-indigo-600" size={20} />
                            Education
                        </h2>
                        <div className="space-y-8 pl-4 border-l-2 border-zinc-100">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-black text-gray-900 mb-1">{edu.institution}</h3>
                                    <p className="text-xs text-zinc-500 font-bold mb-1">{edu.degree}</p>
                                    <p className="text-[10px] text-zinc-400 uppercase font-black">{edu.startDate} – {edu.endDate || 'Now'}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                            <Award className="text-indigo-600" size={20} />
                            Expertise
                        </h2>
                        <div className="flex flex-col gap-4">
                            {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                                <div key={idx} className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tighter">{skill.trim()}</span>
                                        <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Expert_0{idx + 1}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${Math.floor(Math.random() * (95 - 75 + 1) + 75)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
