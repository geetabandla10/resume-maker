import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export default function TwoColumnTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="flex bg-white shadow-sm min-h-[1100px] font-sans border border-gray-100">
            {/* Sidebar */}
            <aside className="w-[320px] bg-slate-900 p-10 text-white flex flex-col">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tighter leading-none mb-4 uppercase">
                        {personal.fullName.split(' ')[0]}<br />
                        <span className="text-indigo-400">{personal.fullName.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4">
                        Contact Information
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="space-y-4">
                        {personal.email && (
                            <div className="group">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-indigo-400 transition-colors">Email</div>
                                <div className="text-sm font-medium break-all">{personal.email}</div>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="group">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-indigo-400 transition-colors">Phone</div>
                                <div className="text-sm font-medium">{personal.phone}</div>
                            </div>
                        )}
                        {personal.location && (
                            <div className="group">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-indigo-400 transition-colors">Location</div>
                                <div className="text-sm font-medium">{personal.location}</div>
                            </div>
                        )}
                    </div>

                    {skills && (
                        <div className="pt-8 border-t border-slate-800">
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Technical Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                    <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1.5 rounded uppercase tracking-wider hover:bg-indigo-600 hover:text-white transition-colors cursor-default">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {education && education.length > 0 && (
                    <div className="mt-auto pt-10 border-t border-slate-800">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu: any, idx: number) => (
                                <div key={idx}>
                                    <div className="text-xs font-bold text-white mb-1">{edu.institution}</div>
                                    <div className="text-[10px] text-slate-400 font-medium">{edu.degree}</div>
                                    <div className="text-[9px] text-indigo-400 font-bold mt-1 uppercase">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 bg-white flex flex-col">
                {professionalSummary && (
                    <section className="mb-12">
                        <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Professional Objective</h2>
                        <p className="text-lg text-slate-800 leading-relaxed font-serif italic">{professionalSummary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="flex-1">
                        <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-10 border-b border-gray-50 pb-2">Employment History</h2>
                        <div className="space-y-12">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx} className="relative">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{exp.position}</h3>
                                        <div className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-widest">{exp.dateRange || exp.startDate}</div>
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">{exp.company}</div>
                                    <ul className="space-y-3">
                                        {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-[15px] leading-relaxed text-slate-600 flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-200 mt-1.5 flex-shrink-0" />
                                                {bullet.replace(/^-/, '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
