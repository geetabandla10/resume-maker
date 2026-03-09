import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function ProfessionalTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-12 font-serif text-slate-900 bg-white border shadow-sm min-h-[1100px]">
            <header className="text-center mb-10 border-b-4 border-slate-900 pb-8">
                <h1 className="text-4xl font-black uppercase tracking-widest mb-4 italic">
                    {personal.fullName}
                </h1>
                <div className="flex justify-center flex-wrap gap-6 text-sm font-bold text-slate-600 uppercase tracking-tighter">
                    {personal.email && <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {personal.email}</span>}
                    {personal.phone && <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {personal.phone}</span>}
                    {personal.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {personal.location}</span>}
                </div>
            </header>

            <div className="space-y-10">
                {professionalSummary && (
                    <section>
                        <h2 className="text-lg font-black uppercase tracking-widest border-b-2 border-slate-200 mb-4 pb-1">Professional Profile</h2>
                        <p className="text-slate-800 leading-relaxed text-justify">{professionalSummary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-black uppercase tracking-widest border-b-2 border-slate-200 mb-6 pb-1">Work History</h2>
                        <div className="space-y-8">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 leading-tight">{exp.position}</h3>
                                            <div className="text-slate-600 font-bold uppercase tracking-wider text-sm mt-1">{exp.company}</div>
                                        </div>
                                        <div className="text-sm font-black text-slate-500 tabular-nums italic">
                                            {exp.dateRange || `${exp.startDate} - ${exp.endDate || 'Present'}`}
                                        </div>
                                    </div>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-slate-800 pl-2">
                                                {bullet.replace(/^-/, '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest border-b-2 border-slate-200 mb-4 pb-1">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu: any, idx: number) => (
                                    <div key={idx}>
                                        <h3 className="font-black text-slate-900 leading-tight">{edu.institution}</h3>
                                        <div className="text-slate-700 text-sm mt-1">{edu.degree} in {edu.fieldOfStudy}</div>
                                        <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-widest border-b-2 border-slate-200 mb-4 pb-1">Core Competencies</h2>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                    <div key={idx} className="text-sm font-bold text-slate-800 border-l-4 border-slate-900 pl-3 py-1">
                                        {skill.trim()}
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
