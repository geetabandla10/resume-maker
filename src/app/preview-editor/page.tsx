"use client";

import LivePreviewEditor from '@/components/LivePreviewEditor';

const mockData = {
    personalInfo: {
        fullName: "Tharun Bandla",
        email: "tharun@example.com",
        phone: "+1 234 567 890",
        location: "San Francisco, CA",
        summary: "Passionate AI Software Engineer with experience in building agentic systems and modern web applications."
    },
    experience: [
        {
            company: "Tech Giant",
            position: "Senior AI Engineer",
            startDate: "2022",
            endDate: "Present",
            bullets: [
                "Led the development of AI-powered resume building platform",
                "Implemented complex Canva-style UI refactors using Next.js and Tailwind",
                "Optimized PDF generation performance by 40%"
            ]
        },
        {
            company: "Startup Co",
            position: "Full Stack Developer",
            startDate: "2020",
            endDate: "2022",
            bullets: [
                "Built responsive web applications from scratch",
                "Integrated Supabase for real-time data sync"
            ]
        }
    ],
    education: [
        {
            institution: "University of Technology",
            degree: "Bachelor of Science",
            fieldOfStudy: "Computer Science",
            startDate: "2016",
            endDate: "2020"
        }
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "AI/ML"]
};

export default function PreviewEditorPage() {
    return (
        <div className="h-screen w-full">
            <LivePreviewEditor initialData={mockData} initialTemplateId="canva_minimal" />
        </div>
    );
}
