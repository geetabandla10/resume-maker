import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Palette, Sparkles } from 'lucide-react';

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

export default function CreativeProTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-[#fcf8f7] min-h-[1056px] text-[#1e1e1e] font-sans shadow-2xl border border-black/5 mx-auto max-w-[800px] flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-[80px] bg-black flex flex-col items-center py-10 gap-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-xl">
                    {personalInfo.fullName.charAt(0)}
                </div>
                <div className="flex-1 flex flex-col justify-center gap-12 text-white opacity-40">
                    <Mail size={20} className="hover:opacity-100 cursor-pointer" />
                    <Linkedin size={20} className="hover:opacity-100 cursor-pointer" />
                    <Globe size={20} className="hover:opacity-100 cursor-pointer" />
                </div>
                <div className="rotate-90 origin-center translate-y-20 whitespace-nowrap text-[10px] font-black tracking-[0.3em] uppercase text-white/20">
                    Creative Portfolio 2026
                </div>
            </div>

            <div className="flex-1 p-16 relative">
                <div className="absolute top-16 right-16">
                    <Palette className="text-fuchsia-100" size={120} />
                </div>

                <header className="mb-20 relative z-10">
                    <h1 className="text-7xl font-black uppercase leading-[0.85] tracking-tighter mb-8 max-w-lg drop-shadow-sm">
                        {personalInfo.fullName.split(' ').map((name, i) => (
                            <span key={i} className={i === 1 ? "text-fuchsia-600 block" : "block text-black"}>{name} </span>
                        ))}
                    </h1>
                    <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-black/50">
                        <span>{personalInfo.location || 'Based in Earth'}</span>
                        <span>•</span>
                        <span>Highly Motivated</span>
                    </div>
                </header>

                <main className="space-y-20">
                    {summary && (
                        <section className="max-w-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles size={20} className="text-fuchsia-600" />
                                <h2 className="text-sm font-black uppercase tracking-[0.2em] underline decoration-fuchsia-600 underline-offset-4">Elevator Pitch</h2>
                            </div>
                            <p className="text-lg font-medium leading-[1.6] text-black">
                                {summary}
                            </p>
                        </section>
                    )}

                    <section>
                        <h2 className="text-4xl font-black uppercase mb-10 tracking-tighter flex items-end gap-4">
                            Journey <span className="h-[2px] w-40 bg-black/10 mb-3"></span>
                        </h2>
                        <div className="space-y-16">
                            {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                                <div key={idx} className="group relative">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-6">
                                        <h3 className="text-2xl font-black group-hover:text-fuchsia-600 transition-colors uppercase italic">{exp.company}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/30 border border-black/10 px-3 py-1 rounded">
                                            {exp.dateRange || `${exp.startDate} – ${exp.endDate || 'Now'}`}
                                        </span>
                                    </div>
                                    <div className="text-sm font-black text-black/60 uppercase tracking-widest mb-6 underline decoration-fuchsia-100 decoration-8 underline-offset-[-4px]">{exp.position}</div>
                                    <ul className="space-y-4 max-w-2xl">
                                        {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-base font-medium leading-relaxed text-black/80 flex gap-4">
                                                <span className="text-fuchsia-600 text-lg">›</span>
                                                <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-20">
                        <section>
                            <h2 className="text-4xl font-black uppercase mb-10 tracking-tighter">Roots</h2>
                            <div className="space-y-8">
                                {education.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-xl font-black text-black mb-1 italic">{edu.institution}</h3>
                                        <p className="text-sm font-bold text-black/60 uppercase tracking-wider">{edu.degree}</p>
                                        <p className="text-[10px] text-fuchsia-600 font-black uppercase mt-2 tracking-widest">{edu.startDate} – {edu.endDate || 'End'}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-4xl font-black uppercase mb-10 tracking-tighter">Tools</h2>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <span className="text-xs font-black uppercase tracking-widest text-black/40 mb-1">0{idx + 1}</span>
                                        <span className="text-lg font-black uppercase tracking-tight hover:text-fuchsia-600 cursor-default transition-colors">{skill.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
