import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export default function BoldTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="bg-white shadow-2xl min-h-[1100px] font-sans overflow-hidden">
            <header className="bg-indigo-600 p-12 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                            {personal.fullName}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-sm font-bold text-indigo-200 uppercase tracking-widest">
                            {personal.email && <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> {personal.email}</span>}
                            {personal.phone && <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {personal.phone}</span>}
                            {personal.location && <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {personal.location}</span>}
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-12 space-y-12">
                {professionalSummary && (
                    <section className="relative">
                        <div className="absolute -left-12 top-0 w-2 h-full bg-indigo-600" />
                        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Impact Statement</h2>
                        <p className="text-xl text-gray-600 leading-relaxed font-bold tracking-tight">{professionalSummary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-10 border-b-2 border-indigo-100 pb-2">Professional Experience</h2>
                        <div className="space-y-12">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{exp.position}</h3>
                                        <div className="text-sm font-black text-gray-400 tabular-nums">{exp.dateRange || exp.startDate}</div>
                                    </div>
                                    <div className="text-lg font-bold text-indigo-400 mb-6 uppercase tracking-widest">{exp.company}</div>
                                    <ul className="space-y-4">
                                        {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-lg leading-relaxed text-gray-700 flex gap-4">
                                                <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-indigo-50 transition-colors">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-400" />
                                                </div>
                                                {bullet.replace(/^-/, '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-12 gap-12 pt-12 border-t border-gray-100">
                    <div className="col-span-8">
                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-8">Academic History</h2>
                                <div className="space-y-8">
                                    {education.map((edu: any, idx: number) => (
                                        <div key={idx} className="border-l-4 border-gray-100 pl-6 py-2">
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{edu.institution}</h3>
                                            <div className="text-lg font-bold text-gray-500 mt-1">{edu.degree}</div>
                                            <div className="text-sm font-black text-indigo-400 mt-2 uppercase tracking-widest">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="col-span-4">
                        {skills && (
                            <section>
                                <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-8">Skillset</h2>
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                        <span key={idx} className="bg-gray-900 text-white text-[11px] font-black px-3 py-2 uppercase tracking-widest hover:bg-indigo-600 transition-colors cursor-default">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
