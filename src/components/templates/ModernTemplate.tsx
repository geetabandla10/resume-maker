import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export default function ModernTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-10 font-sans text-gray-900 bg-white shadow-sm border border-gray-100 min-h-[1100px]">
            <header className="mb-10">
                <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight mb-2">
                    {personal.fullName}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                    {personal.email && <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-indigo-400" />{personal.email}</span>}
                    {personal.phone && <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-indigo-400" />{personal.phone}</span>}
                    {personal.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-indigo-400" />{personal.location}</span>}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-8">
                    {professionalSummary && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full" />
                                Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed">{professionalSummary}</p>
                        </section>
                    )}

                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full" />
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp: any, idx: number) => (
                                    <div key={idx} className="relative pl-6 border-l-2 border-indigo-100">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white" />
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{exp.dateRange || `${exp.startDate} - ${exp.endDate || 'Present'}`}</span>
                                        </div>
                                        <div className="text-indigo-600 font-semibold mb-3">{exp.company}</div>
                                        <ul className="list-none space-y-2">
                                            {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                                <li key={bIdx} className="text-gray-700 flex gap-2">
                                                    <span className="text-indigo-400 mt-1.5 text-xs">●</span>
                                                    {bullet.replace(/^-/, '').trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-8">
                    {skills && (
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-1">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-1">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu: any, idx: number) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                                        <div className="text-sm text-gray-600">{edu.degree}</div>
                                        <div className="text-xs text-indigo-500 font-semibold mt-1">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
