import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Layout, Shapes } from 'lucide-react';

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

export default function GridTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-gray-100 p-8 min-h-[1056px] text-gray-900 font-sans shadow-2xl border border-gray-200 mx-auto max-w-[800px]">
            <div className="grid grid-cols-12 gap-4">
                {/* Header Block */}
                <div className="col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-white flex flex-col justify-end min-h-[240px]">
                    <h1 className="text-5xl font-black tracking-tighter leading-none mb-6">
                        {personalInfo.fullName}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Mail size={14} className="text-indigo-500" /> {personalInfo.email}</span>
                        {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-500" /> {personalInfo.location}</span>}
                    </div>
                </div>

                {/* Summary Block */}
                <div className="col-span-4 bg-indigo-600 p-8 rounded-2xl shadow-sm text-white flex flex-col justify-center">
                    <Layout size={32} className="mb-4 opacity-50" />
                    <h2 className="text-xs font-black uppercase tracking-widest mb-3 opacity-60">Professional Profile</h2>
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                        {summary || "Experienced professional dedicated to delivering excellence and driving innovation in every project."}
                    </p>
                </div>

                {/* Experience Blocks */}
                {(enhancedExp.length > 0 ? enhancedExp.slice(0, 3) : experience.slice(0, 3)).map((exp, idx) => (
                    <div key={idx} className={`${idx === 0 ? "col-span-12" : "col-span-6"} bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col group`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-black group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-none">{exp.company}</h3>
                                <div className="text-sm font-bold text-gray-400 mt-1 italic">{exp.position}</div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                {exp.dateRange || `${exp.startDate} — ${exp.endDate || 'Now'}`}
                            </span>
                        </div>
                        <ul className="space-y-2 mt-auto">
                            {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).slice(0, 3).map((bullet: string, bIdx: number) => (
                                <li key={bIdx} className="text-sm leading-relaxed text-gray-600 flex gap-2">
                                    <span className="text-indigo-300 font-bold">»</span>
                                    <span className="line-clamp-2">{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Skills Block */}
                <div className="col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                    <h2 className="text-xs font-black uppercase tracking-widest mb-6 text-indigo-600 flex items-center gap-2">
                        <Shapes size={16} /> Stack & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {(Array.isArray(skills) ? skills : (skills as string).split(',')).map((skill, idx) => (
                            <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl border border-gray-100 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Education Block */}
                <div className="col-span-5 bg-white p-8 rounded-2xl shadow-sm border border-gray-50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <h2 className="text-xs font-black uppercase tracking-widest mb-6 text-gray-400">Academic Background</h2>
                    <div className="space-y-6 relative z-10">
                        {education.slice(0, 2).map((edu, idx) => (
                            <div key={idx}>
                                <h3 className="text-sm font-black text-gray-900 mb-0.5">{edu.institution}</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
