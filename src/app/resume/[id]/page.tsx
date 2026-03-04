"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';
import ResumePreview from '@/components/ResumePreview';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ResumePage() {
    const params = useParams();
    const id = params.id as string;
    const [resumeData, setResumeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchResume() {
            if (!id) return;

            const { data, error: sbError } = await supabase
                .from('resumes')
                .select('*')
                .eq('id', id)
                .single();

            if (sbError) {
                setError('Resume not found or there was an error loading it.');
                console.error(sbError);
            } else {
                setResumeData(data);
            }
            setLoading(false);
        }

        fetchResume();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </main>
            </div>
        );
    }

    if (error || !resumeData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Header />
                <main className="flex-1 flex items-center justify-center p-6 text-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
                        <p className="text-gray-600">{error || 'Something went wrong.'}</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col font-sans print:bg-white">
            <div className="print:hidden">
                <Header />
            </div>

            <main className="flex-1 py-10 print:py-0">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
                    <div className="mb-6 flex items-center justify-between print:hidden">
                        <h1 className="text-2xl font-bold text-gray-900">Your Generated Resume</h1>
                        <button
                            onClick={() => window.print()}
                            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            Export PDF (Print)
                        </button>
                    </div>

                    <div className="bg-white shadow-2xl print:shadow-none mx-auto print:mx-0 overflow-hidden" style={{ minHeight: '1122px', maxWidth: '794px' }}>
                        {/* A4 roughly 210x297mm -> 794x1122px at 96dpi */}
                        <ResumePreview data={resumeData} />
                    </div>
                </div>
            </main>
        </div>
    );
}
