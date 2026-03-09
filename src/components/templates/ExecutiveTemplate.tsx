import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function ExecutiveTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-12 font-serif text-gray-900 bg-white shadow-lg border-t-[12px] border-slate-800 min-h-[1100px]">
            <header className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">
                        {personal.fullName}
                    </h1>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest flex flex-col gap-1">
                        {personal.location && <span>{personal.location}</span>}
                        <div className="flex gap-4 mt-2">
                            {personal.email && <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{personal.email}</span>}
                            {personal.phone && <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{personal.phone}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-32 h-32 bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-200 uppercase text-[10px] font-black tracking-widest text-center px-4">
                    Executive Profile
                </div>
            </header>

            <div className="space-y-12">
                {professionalSummary && (
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Director's Summary</h2>
                        <p className="text-[15px] leading-relaxed text-slate-800 font-medium">{professionalSummary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-100 pb-2">Professional Experience</h2>
                        <div className="space-y-8">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{exp.dateRange || exp.startDate}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-3 italic">{exp.company}</div>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-[14px] leading-relaxed text-slate-700">
                                                {bullet.replace(/^-/, '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Academic Background</h2>
                            <div className="space-y-4">
                                {education.map((edu: any, idx: number) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                                        <div className="text-sm text-slate-600">{edu.degree}</div>
                                        <div className="text-[10px] font-black text-slate-400 mt-1 uppercase">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills && (
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Strategic Competencies</h2>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                    <span key={idx} className="bg-slate-800 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest">
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
