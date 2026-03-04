import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export default function ResumePreview({ data }: { data: any }) {
    const { personal_info, education, skills, generated_content } = data;

    // Use AI generated experience if available, fallback to raw input
    const experience = generated_content?.enhancedExperience || data.experience || [];
    const professionalSummary = generated_content?.summary || '';

    return (
        <div className="p-10 font-sans text-gray-900 bg-white">

            {/* Header Info */}
            <header className="border-b-2 border-gray-800 pb-6 mb-6">
                <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight uppercase">
                    {personal_info.fullName}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-medium text-gray-600">
                    {personal_info.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="h-4 w-4" />
                            <span>{personal_info.email}</span>
                        </div>
                    )}
                    {personal_info.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="h-4 w-4" />
                            <span>{personal_info.phone}</span>
                        </div>
                    )}
                    {personal_info.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{personal_info.location}</span>
                        </div>
                    )}
                    {personal_info.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin className="h-4 w-4" />
                            <span>{personal_info.linkedin.replace(/^https?:\/\//, '')}</span>
                        </div>
                    )}
                    {personal_info.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe className="h-4 w-4" />
                            <span>{personal_info.website.replace(/^https?:\/\//, '')}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {professionalSummary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">Professional Summary</h2>
                    <p className="text-[15px] leading-relaxed text-gray-800">{professionalSummary}</p>
                </section>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 pb-1 border-b border-gray-200">Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp: any, idx: number) => {
                            // The API payload uses startDate/endDate but our generated AI JSON uses 'dateRange' 
                            // We cater to both just in case AI failed.
                            const dateDisplay = exp.dateRange || `${exp.startDate || ''} - ${exp.current ? 'Present' : (exp.endDate || 'Present')}`;

                            return (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                                        <span className="text-sm font-medium text-gray-600 tabular-nums">{dateDisplay}</span>
                                    </div>
                                    <div className="text-[15px] font-medium text-gray-700 italic mb-2">{exp.company}</div>

                                    {/* Enhanced Bullets */}
                                    {exp.bullets && Array.isArray(exp.bullets) ? (
                                        <ul className="list-disc pl-5 space-y-1.5">
                                            {exp.bullets.map((bullet: string, bIdx: number) => (
                                                <li key={bIdx} className="text-[14px] leading-relaxed text-gray-800 tracking-tight">{bullet}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        // Fallback to original raw description (split by newline to bullet)
                                        <ul className="list-disc pl-5 space-y-1.5">
                                            {exp.description?.split('\n').filter((x: string) => x.trim() !== '').map((item: string, iIdx: number) => (
                                                <li key={iIdx} className="text-[14px] leading-relaxed text-gray-800 tracking-tight">{item.replace(/^-/, '').trim()}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-8">
                {/* Education */}
                {education && education.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 pb-1 border-b border-gray-200">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu: any, idx: number) => (
                                <div key={idx}>
                                    <div className="flex flex-col mb-1">
                                        <h3 className="text-[15px] font-bold text-gray-900">{edu.institution}</h3>
                                        <div className="text-[14px] text-gray-800">{edu.degree} in {edu.fieldOfStudy}</div>
                                    </div>
                                    <div className="text-[13px] text-gray-500 font-medium">
                                        {edu.startDate} - {edu.endDate || 'Present'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 pb-1 border-b border-gray-200">Core Skills</h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {skills.map((skill: string, idx: number) => (
                                <span key={idx} className="text-[14px] text-gray-800 font-medium border border-gray-300 rounded-md px-2 py-0.5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

        </div>
    );
}
