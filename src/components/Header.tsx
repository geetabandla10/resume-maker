import Link from 'next/link';
import { FileText, Sparkles } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center flex-row justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                        <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Pro<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Resume</span>
                    </span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link href="/create" className="group flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Build Resume
                    </Link>
                </nav>
            </div>
        </header>
    );
}
