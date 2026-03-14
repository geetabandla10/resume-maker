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

export default function HarvardTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || [];

    return (
        <div className="bg-white p-12 min-h-[1056px] text-[#1a1a1a] font-serif shadow-xl border border-gray-100 mx-auto max-w-[800px]">
            <div className="text-center border-b-[1.5px] border-[#1a1a1a] pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2 leading-tight">
                    {personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-medium tracking-wide">
                    <span className="flex items-center gap-1"><Mail size={10} /> {personalInfo.email}</span>
                    {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={10} /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={10} /> {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={10} /> LinkedIn</span>}
                    {personalInfo.website && <span className="flex items-center gap-1"><Globe size={10} /> Portfolio</span>}
                </div>
            </div>

            {summary && (
                <section className="mb-6">
                    <p className="text-[12px] leading-relaxed italic text-gray-700">
                        {summary}
                    </p>
                </section>
            )}

            <section className="mb-6">
                <h2 className="text-[14px] font-extrabold uppercase border-b border-[#1a1a1a] mb-3 pb-0.5 tracking-wider">
                    Work Experience
                </h2>
                <div className="space-y-4">
                    {(enhancedExp.length > 0 ? enhancedExp : experience).map((exp, idx) => (
                        <div key={idx} className="relative">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-[13px] font-bold">{exp.company}</span>
                                <span className="text-[11px] font-medium italic tabular-nums">
                                    {exp.dateRange || `${exp.startDate} - ${exp.endDate || 'Present'}`}
                                </span>
                            </div>
                            <div className="text-[12px] font-semibold italic mb-1.5">{exp.position}</div>
                            <ul className="list-inside list-disc space-y-1">
                                {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                    <li key={bIdx} className="text-[11px] leading-relaxed text-gray-800 pl-2 -indent-4">
                                        {bullet.replace(/^[•\-\*]\s*/, '')}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-[14px] font-extrabold uppercase border-b border-[#1a1a1a] mb-3 pb-0.5 tracking-wider">
                    Education
                </h2>
                <div className="space-y-3">
                    {education.map((edu, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-baseline mb-0.5">
                                <span className="text-[13px] font-bold">{edu.institution}</span>
                                <span className="text-[11px] italic tabular-nums">
                                    {edu.startDate} - {edu.endDate || 'Present'}
                                </span>
                            </div>
                            <div className="text-[12px] italic">
                                {edu.degree} in {edu.fieldOfStudy}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-[14px] font-extrabold uppercase border-b border-[#1a1a1a] mb-3 pb-0.5 tracking-wider">
                    Skills & Technical Expertise
                </h2>
                <p className="text-[11px] leading-relaxed text-gray-800">
                    <span className="font-bold">Technical Skills:</span> {Array.isArray(skills) ? skills.join(', ') : skills}
                </p>
            </section>
        </div>
    );
}
