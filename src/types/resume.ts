import { z } from 'zod';

export const personalInfoSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    linkedin: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

export const experienceSchema = z.object({
    id: z.string(),
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().or(z.literal('')),
    current: z.boolean().optional(),
    description: z.string().min(10, "Please provide at least a brief description of what you did"),
});

export const educationSchema = z.object({
    id: z.string(),
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().or(z.literal('')),
});

export const resumeFormSchema = z.object({
    personalInfo: personalInfoSchema,
    experience: z.array(experienceSchema).min(1, "At least one experience is required"),
    education: z.array(educationSchema).min(1, "At least one education entry is required"),
    skills: z.string().min(1, "Please list at least a few skills (comma separated)"),
});

export type ResumeFormData = z.infer<typeof resumeFormSchema>;
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type EducationData = z.infer<typeof educationSchema>;
