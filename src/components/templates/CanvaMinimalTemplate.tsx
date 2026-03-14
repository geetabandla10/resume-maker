import { PersonalInfoData, ExperienceData, EducationData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
    data: {
        personalInfo: PersonalInfoData;
        experience: {
            id: string;
            company: string;
            position: string;
            startDate: string;
            endDate?: string;
            bullets: string[];
            description: string;
        }[];
        education: {
            id: string;
            institution: string;
            degree: string;
            fieldOfStudy: string;
            startDate: string;
            endDate?: string;
        }[];
        skills: string | string[];
    };
    enhancedContent?: {
        summary: string;
        enhancedExperience: any[];
    };
}

export default function CanvaMinimalTemplate({ data, enhancedContent }: TemplateProps) {
    const { personalInfo, experience, education, skills } = data;
    const summary = enhancedContent?.summary || personalInfo.summary || "";
    const enhancedExp = enhancedContent?.enhancedExperience || experience;

    const skillList = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="bg-white p-12 min-h-[1056px] text-[#333] font-sans shadow-2xl mx-auto max-w-[800px] leading-snug">
            <header className="mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-widest text-[#1a1a1a] mb-1">
                    {personalInfo.fullName}
                </h1>
                <div className="text-sm font-semibold text-[#444] uppercase tracking-wider mb-4 border-b-4 border-black inline-block pb-1">
                    {experience[0]?.position || 'Professional'}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-bold text-[#666] uppercase tracking-tighter">
                    <span>{personalInfo.location || 'Location'}</span>
                    <span>•</span>
                    <span>{personalInfo.email}</span>
                    {personalInfo.phone && <><span>•</span><span>{personalInfo.phone}</span></>}
                    {personalInfo.website && <><span>•</span><span>{personalInfo.website.replace(/^https?:\/\//, '')}</span></>}
                </div>
            </header>

            <div className="space-y-8">
                {summary && (
                    <section>
                        <h2 className="bg-[#f0f0f0] px-4 py-1 text-[12px] font-black uppercase tracking-[0.2em] mb-4">Summary</h2>
                        <p className="text-[12px] leading-relaxed text-[#555] px-4">
                            {summary}
                        </p>
                    </section>
                )}

                <section>
                    <h2 className="bg-[#f0f0f0] px-4 py-1 text-[12px] font-black uppercase tracking-[0.2em] mb-6">Technical Skills</h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 px-4">
                        {skillList.map((skill, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[11px] font-bold">
                                <span className="uppercase">{skill}</span>
                                <div className="h-2 w-24 bg-[#eee] rounded-full overflow-hidden">
                                    <div className="h-full bg-black" style={{ width: `${Math.floor(Math.random() * (95 - 70) + 70)}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="bg-[#f0f0f0] px-4 py-1 text-[12px] font-black uppercase tracking-[0.2em] mb-6">Professional Experience</h2>
                    <div className="space-y-8 px-4">
                        {enhancedExp.map((exp: any, idx: number) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div>
                                        <span className="text-[13px] font-black uppercase">{exp.company}</span>
                                        <span className="text-[13px] font-medium italic">, {exp.location || 'Global'}</span>
                                    </div>
                                    <span className="text-[11px] font-black tabular-nums">{exp.dateRange || `${exp.startDate} - ${exp.endDate || 'Present'}`}</span>
                                </div>
                                <div className="text-[12px] font-bold text-[#444] mb-3">{exp.position}</div>
                                <ul className="space-y-2">
                                    {(exp.bullets || (exp.description || '').split('\n')).filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                                        <li key={bIdx} className="text-[11px] leading-relaxed text-[#555] flex gap-3">
                                            <span className="mt-1 text-black font-black">•</span>
                                            <span>{bullet.replace(/^[•\-\*]\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="bg-[#f0f0f0] px-4 py-1 text-[12px] font-black uppercase tracking-[0.2em] mb-6">Education</h2>
                    <div className="space-y-6 px-4">
                        {education.map((edu, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-[13px] font-black uppercase">{edu.institution}</span>
                                    <span className="text-[11px] font-black tabular-nums">{edu.startDate} - {edu.endDate || 'Present'}</span>
                                </div>
                                <div className="text-[12px] font-bold text-[#444]">{edu.degree} in {edu.fieldOfStudy}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="bg-[#f0f0f0] px-4 py-1 text-[12px] font-black uppercase tracking-[0.2em] mb-4">Additional Information</h2>
                    <div className="px-4 space-y-2">
                        <div className="text-[11px]"><span className="font-black uppercase mr-2">Languages:</span> English, Spanish, German</div>
                        <div className="text-[11px]"><span className="font-black uppercase mr-2">Certifications:</span> Professional Design Cert (2024), PMP</div>
                    </div>
                </section>
            </div>
        </div>
    );
}
