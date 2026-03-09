"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { resumeFormSchema, ResumeFormData } from '@/types/resume';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';
import TemplateSelector from './TemplateSelector';

export default function ResumeForm() {
    const router = useRouter();
    const supabase = createClient();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ResumeFormData>({
        resolver: zodResolver(resumeFormSchema),
        defaultValues: {
            personalInfo: {
                fullName: '', email: '', phone: '', location: '', website: '', linkedin: ''
            },
            education: [
                { id: crypto.randomUUID(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }
            ],
            skills: '',
            templateId: 'standard',
            experience: [],
        }
    });

    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');

    useEffect(() => {
        if (editId) {
            const fetchExisting = async () => {
                const { data, error } = await supabase
                    .from('resumes')
                    .select('*')
                    .eq('id', editId)
                    .single();

                if (data && !error) {
                    reset({
                        personalInfo: data.personal_info,
                        experience: data.experience || [],
                        education: data.education || [],
                        skills: Array.isArray(data.skills) ? data.skills.join(', ') : data.skills,
                        templateId: data.template_id || 'standard',
                    });
                }
            };
            fetchExisting();
        }
    }, [editId, reset]);

    const selectedTemplateId = watch("templateId");

    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
        control,
        name: "experience",
    });

    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
        control,
        name: "education",
    });

    const onSubmit = async (data: ResumeFormData) => {
        setIsGenerating(true);
        setError(null);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to generate resume');
            }

            const result = await response.json();

            // Store the result ID in localStorage or redirect to a success page passing the ID
            if (result.id) {
                router.push(`/resume/${result.id}`);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-10">
            {/* Template Selection */}
            <TemplateSelector
                selectedTemplateId={selectedTemplateId || 'standard'}
                onSelect={(id) => setValue("templateId", id)}
            />

            {/* Personal Info */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                        <input {...register("personalInfo.fullName")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="John Doe" />
                        {errors.personalInfo?.fullName && <p className="text-sm text-red-500">{errors.personalInfo.fullName.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email Address *</label>
                        <input type="email" {...register("personalInfo.email")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="john@example.com" />
                        {errors.personalInfo?.email && <p className="text-sm text-red-500">{errors.personalInfo.email.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input {...register("personalInfo.phone")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <input {...register("personalInfo.location")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="City, State" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
                        <input {...register("personalInfo.linkedin")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="linkedin.com/in/johndoe" />
                        {errors.personalInfo?.linkedin && <p className="text-sm text-red-500">{errors.personalInfo.linkedin.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Portfolio / Website</label>
                        <input {...register("personalInfo.website")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="johndoe.com" />
                        {errors.personalInfo?.website && <p className="text-sm text-red-500">{errors.personalInfo.website.message}</p>}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section>
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                    <button type="button" onClick={() => appendExp({ id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        <Plus className="h-4 w-4" /> Add Role
                    </button>
                </div>

                <div className="space-y-8">
                    {expFields.map((field, index) => (
                        <div key={field.id} className="relative p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <button type="button" onClick={() => removeExp(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Company *</label>
                                    <input {...register(`experience.${index}.company`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="Acme Inc" />
                                    {errors.experience?.[index]?.company && <p className="text-sm text-red-500">{errors.experience[index]?.company?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Position *</label>
                                    <input {...register(`experience.${index}.position`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="Software Engineer" />
                                    {errors.experience?.[index]?.position && <p className="text-sm text-red-500">{errors.experience[index]?.position?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Start Date *</label>
                                    <input {...register(`experience.${index}.startDate`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="Jan 2020" />
                                    {errors.experience?.[index]?.startDate && <p className="text-sm text-red-500">{errors.experience[index]?.startDate?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">End Date</label>
                                    <input {...register(`experience.${index}.endDate`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="Present (leave blank if current)" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    What did you do? (Be brief, AI will enhance this) *
                                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                                </label>
                                <textarea
                                    {...register(`experience.${index}.description`)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white min-h-[100px]"
                                    placeholder="- built REST APIs using Node.js
- setup CI/CD pipeline
- managed a team of 3 developers"
                                />
                                {errors.experience?.[index]?.description && <p className="text-sm text-red-500">{errors.experience[index]?.description?.message}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section>
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Education</h2>
                    <button type="button" onClick={() => appendEdu({ id: crypto.randomUUID(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })} className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        <Plus className="h-4 w-4" /> Add Education
                    </button>
                </div>

                <div className="space-y-8">
                    {eduFields.map((field, index) => (
                        <div key={field.id} className="relative p-6 bg-gray-50 rounded-xl border border-gray-100">
                            {eduFields.length > 1 && (
                                <button type="button" onClick={() => removeEdu(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Institution *</label>
                                    <input {...register(`education.${index}.institution`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="University of Technology" />
                                    {errors.education?.[index]?.institution && <p className="text-sm text-red-500">{errors.education[index]?.institution?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Degree *</label>
                                    <input {...register(`education.${index}.degree`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="B.S." />
                                    {errors.education?.[index]?.degree && <p className="text-sm text-red-500">{errors.education[index]?.degree?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Field of Study *</label>
                                    <input {...register(`education.${index}.fieldOfStudy`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="Computer Science" />
                                    {errors.education?.[index]?.fieldOfStudy && <p className="text-sm text-red-500">{errors.education[index]?.fieldOfStudy?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Start Date *</label>
                                    <input {...register(`education.${index}.startDate`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="Sep 2016" />
                                    {errors.education?.[index]?.startDate && <p className="text-sm text-red-500">{errors.education[index]?.startDate?.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">End Date</label>
                                    <input {...register(`education.${index}.endDate`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white" placeholder="May 2020" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-6">Skills</h2>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">List your top skills (comma-separated) *</label>
                    <textarea
                        {...register("skills")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
                        placeholder="JavaScript, React, Node.js, Project Management, Agile..."
                    />
                    {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
                </div>
            </section>

            {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
            )}

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button
                    type="submit"
                    disabled={isGenerating}
                    className="group flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Generating AI Resume...
                        </>
                    ) : (
                        <>
                            Generate with AI
                            <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
                        </>
                    )}
                </button>
            </div>

        </form>
    );
}
