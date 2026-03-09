import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function CreativeTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="flex bg-white shadow-xl min-h-[1100px] font-sans">
            {/* Sidebar Accent */}
            <div className="w-4 bg-orange-500" />

            <div className="flex-1 p-12">
                <header className="mb-12 flex justify-between items-start">
                    <div>
                        <h1 className="text-6xl font-black text-gray-900 leading-none">
                            {personal.fullName.split(' ')[0]}<br />
                            <span className="text-orange-500">{personal.fullName.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <div className="mt-8 space-y-2 text-sm font-bold text-gray-500 uppercase tracking-widest">
                            {personal.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-500" /> {personal.email}</div>}
                            {personal.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-500" /> {personal.phone}</div>}
                            {personal.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-500" /> {personal.location}</div>}
                        </div>
                    </div>
                    {skills && (
                        <div className="w-48">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Top Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(skills) ? skills : skills.split(',')).slice(0, 6).map((skill: string, idx: number) => (
                                    <span key={idx} className="bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded uppercase">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        {professionalSummary && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-gray-900 mb-4 italic">The Story</h2>
                                <p className="text-lg text-gray-600 leading-relaxed font-medium">{professionalSummary}</p>
                            </section>
                        )}

                        {experience && experience.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                                    Experience
                                    <div className="flex-1 h-1 bg-gray-100" />
                                </h2>
                                <div className="space-y-12">
                                    {experience.map((exp: any, idx: number) => (
                                        <div key={idx} className="group">
                                            <div className="flex justify-between items-baseline mb-4">
                                                <h3 className="text-2xl font-black text-gray-900 group-hover:text-orange-500 transition-colors">{exp.position}</h3>
                                                <span className="text-sm font-black text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                                    {exp.dateRange || exp.startDate}
                                                </span>
                                            </div>
                                            <div className="text-lg font-bold text-gray-400 mb-4">{exp.company}</div>
                                            <ul className="space-y-3">
                                                {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                                    <li key={bIdx} className="text-gray-600 border-l-4 border-orange-100 pl-4 py-1 font-medium">
                                                        {bullet.replace(/^-/, '').trim()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-gray-900 mb-6 underline decoration-orange-500 decoration-4 underline-offset-8">Education</h2>
                                <div className="grid grid-cols-2 gap-8 mt-10">
                                    {education.map((edu: any, idx: number) => (
                                        <div key={idx} className="bg-gray-50 p-6 rounded-2xl">
                                            <h3 className="font-black text-gray-900 text-lg">{edu.institution}</h3>
                                            <div className="text-orange-600 font-bold mt-1">{edu.degree}</div>
                                            <div className="text-gray-400 text-sm font-bold mt-2">{edu.startDate} - {edu.endDate || 'Present'}</div>
                                        </div>
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
