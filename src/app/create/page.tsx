import Header from '@/components/Header';
import ResumeForm from '@/components/ResumeForm';

export default function CreateResumePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Build Your Resume</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Fill out the details below as best as you can. Our AI will automatically rewrite and format your experience into highly professional, action-oriented bullet points.
                        </p>
                    </div>

                    <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100">
                        <ResumeForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
