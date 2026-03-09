import { Terminal, Cpu, Code, Globe, Mail, Phone } from 'lucide-react';

export default function TechTemplate({ data }: { data: any }) {
    const { personalInfo, education, skills, generated_content } = data;
    const personal = personalInfo || data.personal_info;
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-10 font-mono text-green-500 bg-slate-900 shadow-2xl border-2 border-slate-800 min-h-[1100px] selection:bg-green-500 selection:text-slate-900">
            <header className="mb-12 border-b border-slate-800 pb-8 flex justify-between items-end">
                <div>
                    <div className="text-xs text-slate-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                        <Terminal className="h-4 w-4" /> [root@resume ~]# whoami
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter text-white">
                        {personal.fullName.replace(/\s/g, '_').toLowerCase()}
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                        {personal.email && <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-green-800" />{personal.email}</span>}
                        {personal.phone && <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-green-800" />{personal.phone}</span>}
                        {personal.location && <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-green-800" />{personal.location}</span>}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-slate-600 uppercase mb-1">Last Updated</div>
                    <div className="text-xs font-bold text-green-900">{new Date().toISOString().split('T')[0]}</div>
                </div>
            </header>

            <div className="space-y-12">
                {professionalSummary && (
                    <section>
                        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Code className="h-4 w-4 text-green-800" /> ./professional_summary.sh
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl pl-6 border-l border-slate-800">
                            {professionalSummary}
                        </p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-green-800" /> cat experience.log
                        </h2>
                        <div className="space-y-8 pl-6 border-l border-slate-800">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-base font-bold text-green-400">{exp.position} @ {exp.company}</h3>
                                        <span className="text-[10px] text-slate-600 font-bold">[{exp.dateRange || exp.startDate}]</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {(exp.bullets || exp.description?.split('\n').filter(Boolean)).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="text-sm text-slate-400 flex gap-2">
                                                <span className="text-green-900 font-bold">$</span>
                                                {bullet.replace(/^-/, '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        {skills && (
                            <section className="mb-12">
                                <h2 className="text-sm font-bold text-white mb-4">grep -E "Skills|Tools" bio.txt</h2>
                                <div className="flex flex-wrap gap-x-6 gap-y-3 pl-6 border-l border-slate-800">
                                    {(Array.isArray(skills) ? skills : skills.split(',')).map((skill: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 bg-green-900 rounded-full group-hover:bg-green-500 transition-colors" />
                                            <span className="text-xs text-slate-500 font-bold group-hover:text-green-400">{skill.trim()}</span>
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
