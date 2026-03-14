import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

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

export default function CleanTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white px-16 py-20 min-h-[1056px] text-zinc-900 font-sans shadow-lg border border-zinc-100 mx-auto max-w-[800px]">
            <div className="mb-20">
                <h1 className="text-5xl font-light tracking-tight text-zinc-900 mb-6 antialiased">
                    {personalInfo.fullName.split(' ')[0]} <span className="font-semibold">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
                </h1>
                <div className="flex flex-wrap gap-x-10 gap-y-2 text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-900 transition-colors uppercase italic">{personalInfo.email}</a>
                    {personalInfo.phone && <span className="italic">{personalInfo.phone}</span>}
                    {personalInfo.location && <span className="italic uppercase">{personalInfo.location}</span>}
                </div>
            </div>

            <div className="space-y-24">
                {summary && (
                    <section>
                        <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-3">
                                <h2 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] pt-1">Profile</h2>
                            </div>
                            <div className="col-span-9">
                                <p className="text-base leading-[1.8] text-zinc-600 font-light max-w-2xl">
                                    {summary}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                <section>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] pt-1">Work</h2>
                        </div>
                        <div className="col-span-9 space-y-16">
                            {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex flex-col mb-4">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-xl font-medium text-zinc-900">{exp.company}</h3>
                                            <span className="text-[10px] font-bold tabular-nums text-zinc-300 uppercase tracking-widest">
                                                {exp.dateRange || `${exp.startDate} – ${exp.endDate || 'Present'}`}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-zinc-400 italic tracking-wide">{exp.position}</div>
                                    </div>
                                    <ul className="space-y-3 pl-0 border-l border-zinc-100 ml-0.5 mt-6">
                                        {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-sm leading-relaxed text-zinc-500 pl-8 relative">
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-zinc-100"></span>
                                                {bullet.replace(/^[•\-\*]\s*/, '')}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] pt-1">Study</h2>
                        </div>
                        <div className="col-span-9 grid grid-cols-2 gap-12">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-semibold text-zinc-900 mb-1">{edu.institution}</h3>
                                    <p className="text-xs text-zinc-500 mb-1 font-light italic">{edu.degree} {edu.fieldOfStudy}</p>
                                    <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-widest">{edu.startDate} – {edu.endDate || 'Present'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] pt-1">Capabilities</h2>
                        </div>
                        <div className="col-span-9 flex flex-wrap gap-x-12 gap-y-6">
                            {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-[8px] font-black text-zinc-200 uppercase tracking-tighter mb-1">SK_{idx + 1}</span>
                                    <span className="text-xs font-semibold text-zinc-600 tracking-wide">{skill.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
