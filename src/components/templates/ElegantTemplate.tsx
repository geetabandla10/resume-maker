import { Mail, Phone, MapPin } from 'lucide-react';

export default function ElegantTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-16 font-serif text-gray-900 bg-[#fffcf5] shadow-inner min-h-[1100px] border-[20px] border-white">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-extralight tracking-[0.15em] uppercase mb-6 text-gray-800">
                    {personal.fullName}
                </h1>
                <div className="flex justify-center gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] border-y border-gray-100 py-4">
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                </div>
            </header>

            <div className="max-w-3xl mx-auto space-y-16">
                {professionalSummary && (
                    <section className="text-center italic">
                        <p className="text-lg text-gray-600 leading-relaxed font-light">{professionalSummary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10">Professional History</h2>
                        <div className="space-y-12">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx}>
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{exp.position}</h3>
                                        <div className="text-sm font-light italic text-gray-500">{exp.company} | {exp.dateRange || exp.startDate}</div>
                                    </div>
                                    <ul className="list-none space-y-4 max-w-2xl mx-auto">
                                        {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-[15px] leading-relaxed text-gray-600 text-center font-light">
                                                {bullet.replace(/^-/, '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="pt-12 border-t border-gray-100 grid grid-cols-2 gap-16">
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu: any, idx: number) => (
                                    <div key={idx}>
                                        <h3 className="text-sm font-bold text-gray-800">{edu.institution}</h3>
                                        <div className="text-xs text-gray-500 font-light italic mt-1">{edu.degree}</div>
                                        <div className="text-[10px] text-gray-300 font-bold mt-2 uppercase tracking-widest">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills && (
                        <section>
                            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Expertise</h2>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                    <span key={idx} className="text-[13px] text-gray-500 font-light tracking-wide">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
