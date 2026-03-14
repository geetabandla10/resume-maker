import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, Eye, Edit3, Calendar } from "lucide-react";

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: resumes } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and edit your generated resumes.
                        </p>
                    </div>
                    <Link
                        href="/create"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        Create New
                    </Link>
                </div>

                {!resumes || resumes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No resumes yet</h3>
                        <p className="mt-1 text-gray-500 max-w-sm mx-auto">
                            Start by creating your first professional resume with AI.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/create"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <div
                                key={resume.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">
                                                {resume.personal_info.fullName}
                                            </h3>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                {resume.template_id}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                        <Calendar size={14} />
                                        <span>
                                            {new Date(resume.created_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            href={`/resume/${resume.id}`}
                                            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                                        >
                                            <Eye size={16} />
                                            View
                                        </Link>
                                        <Link
                                            href={`/create?edit=${resume.id}`}
                                            className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                                        >
                                            <Edit3 size={16} />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
