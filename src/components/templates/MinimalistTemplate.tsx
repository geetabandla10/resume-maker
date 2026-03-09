import { Mail, Phone, MapPin } from 'lucide-react';

export default function MinimalistTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-16 font-sans text-gray-800 bg-white min-h-[1100px] max-w-[900px] mx-auto tracking-tight">
            <header className="mb-16">
                <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tighter">
                    {personal.fullName}
                </h1>
                <div className="flex gap-6 text-[13px] text-gray-400 font-medium">
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                </div>
            </header>

            <div className="space-y-16">
                {professionalSummary && (
                    <section>
                        <p className="text-[15px] leading-relaxed text-gray-600 max-w-2xl">{professionalSummary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-8">Experience</h2>
                        <div className="space-y-12">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx} className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 text-[12px] font-bold text-gray-400 pt-1">
                                        {exp.dateRange || exp.startDate}
                                    </div>
                                    <div className="col-span-9">
                                        <h3 className="text-[16px] font-bold text-gray-900 mb-1">{exp.position}</h3>
                                        <div className="text-[14px] text-gray-500 mb-4">{exp.company}</div>
                                        <ul className="space-y-2">
                                            {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                                <li key={bIdx} className="text-[14px] leading-relaxed text-gray-600">
                                                    {bullet.replace(/^-/, '').trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-300 pt-1">
                        Education
                    </div>
                    <div className="col-span-9 space-y-8">
                        {education.map((edu: any, idx: number) => (
                            <div key={idx}>
                                <h3 className="text-[15px] font-bold text-gray-900">{edu.institution}</h3>
                                <div className="text-[14px] text-gray-500">{edu.degree}</div>
                                <div className="text-[12px] text-gray-400 mt-1">{edu.startDate} - {edu.endDate || 'Present'}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {skills && (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-300 pt-1">
                            Skills
                        </div>
                        <div className="col-span-9">
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                    <span key={idx} className="text-[14px] text-gray-600 font-medium">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
