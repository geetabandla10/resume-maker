import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, Sparkles, Wand2 } from 'lucide-react';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20 mb-8 animate-fade-in-up stagger-1">
                <Sparkles className="h-4 w-4" />
                Powered by Advanced AI
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6 animate-fade-in-up stagger-2">
                Craft the Perfect Resume in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Seconds</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-3">
                Transform your professional experience into a polished, recruiter-ready resume. Provide your details, and our AI will generate highly impactful bullet points and summaries tailored just for you.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up stagger-4">
                <Link
                  href="/create"
                  className="group rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
                >
                  Create My Resume Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features / How it works */}
        <section id="how-it-works" className="bg-white py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Faster, Smarter, Better</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to land your next job
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Stop struggling with formatting and writer's block. Let our AI handle the heavy lifting while you focus on applying.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <FileText className="h-8 w-8" />
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">
                    1. Fill Your Details
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Enter your personal info, education, and raw experience points through our easy-to-use form.</p>
                  </dd>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow relative">
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 translate-x-1/2 text-gray-300">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                  <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 -translate-x-1/2 text-gray-300">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600 shadow-inner">
                    <Wand2 className="h-8 w-8" />
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">
                    2. AI Magic
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Our advanced AI takes your raw data and transforms it into powerful, action-oriented bullet points and summaries.</p>
                  </dd>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">
                    3. Get Your Resume
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Download your professionally formatted resume instantly and start applying to your dream jobs with confidence.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">ProResume</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ProResume. All rights reserved. Built with Next.js & AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
