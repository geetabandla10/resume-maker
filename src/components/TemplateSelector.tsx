"use client";

import { useState } from 'react';
import { templateConfig } from './templates';
import { CheckCircle, Eye, X, Palette, Terminal } from 'lucide-react';

interface TemplateSelectorProps {
    selectedTemplateId: string;
    onSelect: (id: string) => void;
}

// Color palettes for each template to make thumbnails feel unique
const palettes: Record<string, { primary: string; accent: string; bg: string; text: string; light: string }> = {
    standard: { primary: '#1e293b', accent: '#334155', bg: '#ffffff', text: '#64748b', light: '#f1f5f9' },
    modern: { primary: '#4f46e5', accent: '#6366f1', bg: '#ffffff', text: '#6b7280', light: '#eef2ff' },
    professional: { primary: '#111827', accent: '#374151', bg: '#ffffff', text: '#6b7280', light: '#f3f4f6' },
    creative: { primary: '#7c3aed', accent: '#a855f7', bg: '#faf5ff', text: '#7c3aed', light: '#ede9fe' },
    minimalist: { primary: '#737373', accent: '#a3a3a3', bg: '#fafafa', text: '#a3a3a3', light: '#f5f5f5' },
    executive: { primary: '#92400e', accent: '#b45309', bg: '#fffbeb', text: '#78350f', light: '#fef3c7' },
    tech: { primary: '#10b981', accent: '#34d399', bg: '#0f172a', text: '#34d399', light: '#1e293b' },
    elegant: { primary: '#be185d', accent: '#db2777', bg: '#fff1f2', text: '#9d174d', light: '#fce7f3' },
    two_column: { primary: '#0284c7', accent: '#0ea5e9', bg: '#ffffff', text: '#0369a1', light: '#e0f2fe' },
    bold: { primary: '#dc2626', accent: '#ef4444', bg: '#ffffff', text: '#dc2626', light: '#fee2e2' },
    harvard: { primary: '#1a1a1a', accent: '#404040', bg: '#ffffff', text: '#525252', light: '#f5f5f5' },
    startup: { primary: '#4f46e5', accent: '#9333ea', bg: '#ffffff', text: '#4f46e5', light: '#f3e8ff' },
    corporate: { primary: '#111827', accent: '#4b5563', bg: '#ffffff', text: '#111827', light: '#f9fafb' },
    developer: { primary: '#6366f1', accent: '#10b981', bg: '#0f172a', text: '#e2e8f0', light: '#1e293b' },
    creative_pro: { primary: '#c026d3', accent: '#000000', bg: '#fcf8f7', text: '#000000', light: '#fdf4ff' },
    clean: { primary: '#27272a', accent: '#71717a', bg: '#ffffff', text: '#3f3f46', light: '#f4f4f5' },
    timeline: { primary: '#4f46e5', accent: '#818cf8', bg: '#ffffff', text: '#1e1b4b', light: '#eef2ff' },
    grid: { primary: '#1e1b4b', accent: '#4f46e5', bg: '#f3f4f6', text: '#4f46e5', light: '#ffffff' },
    sidebar_pro: { primary: '#0f172a', accent: '#6366f1', bg: '#ffffff', text: '#0f172a', light: '#f8fafc' },
    infographic: { primary: '#14b8a6', accent: '#0f172a', bg: '#ffffff', text: '#14b8a6', light: '#f0fdfa' },
    canva_minimal: { primary: '#000000', accent: '#555555', bg: '#ffffff', text: '#333333', light: '#f0f0f0' },
};

function TemplateMiniCard({ id }: { id: string }) {
    const p = palettes[id] || palettes.standard;
    const isDark = id === 'tech' || id === 'developer';

    return (
        <div
            className="w-full h-full rounded-sm overflow-hidden"
            style={{ backgroundColor: p.bg, fontFamily: 'sans-serif' }}
        >
            {/* Header */}
            {id === 'two_column' ? (
                <div className="flex h-full">
                    <div className="w-1/3 h-full p-2 flex flex-col gap-1.5" style={{ backgroundColor: p.primary }}>
                        <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ backgroundColor: p.accent, opacity: 0.6 }} />
                        {[70, 50, 60, 40, 55].map((w, i) => (
                            <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.accent, opacity: 0.5, width: `${w}%` }} />
                        ))}
                    </div>
                    <div className="w-2/3 p-2 flex flex-col gap-1">
                        <div className="rounded-full h-2 mb-1" style={{ backgroundColor: p.primary, width: '80%' }} />
                        <div className="rounded-full h-1 mb-2" style={{ backgroundColor: p.text, width: '55%', opacity: 0.6 }} />
                        {[100, 90, 80, 70, 85, 75].map((w, i) => (
                            <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            ) : id === 'tech' ? (
                <div className="p-2 h-full flex flex-col gap-1.5">
                    <div className="rounded px-1.5 py-0.5 mb-1 text-[5px] font-mono" style={{ backgroundColor: p.light, color: p.accent }}>
                        &gt; resume --name "Your Name"
                    </div>
                    <div className="rounded-full h-1.5" style={{ backgroundColor: p.accent, width: '70%' }} />
                    <div className="rounded-full h-1" style={{ backgroundColor: p.accent, width: '45%', opacity: 0.6 }} />
                    {[90, 75, 85, 60, 80].map((w, i) => (
                        <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                    ))}
                </div>
            ) : id === 'creative' ? (
                <div className="p-2 h-full flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: p.accent, opacity: 0.7 }} />
                        <div className="flex flex-col gap-0.5">
                            <div className="rounded-full h-1.5" style={{ backgroundColor: p.primary, width: 50 }} />
                            <div className="rounded-full h-1" style={{ backgroundColor: p.text, width: 35, opacity: 0.7 }} />
                        </div>
                    </div>
                    <div className="rounded h-0.5 mb-1" style={{ backgroundColor: p.accent, width: '100%' }} />
                    {[100, 90, 80, 95, 70, 85].map((w, i) => (
                        <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                    ))}
                </div>
            ) : id === 'bold' ? (
                <div className="flex flex-col h-full">
                    <div className="px-2 pt-2 pb-1.5 mb-1" style={{ backgroundColor: p.primary }}>
                        <div className="rounded-full h-2 mb-0.5" style={{ backgroundColor: '#fff', width: '75%', opacity: 0.9 }} />
                        <div className="rounded-full h-1" style={{ backgroundColor: '#fff', width: '50%', opacity: 0.6 }} />
                    </div>
                    <div className="p-2 flex flex-col gap-1 flex-1">
                        {[100, 90, 80, 95, 70, 85].map((w, i) => (
                            <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            ) : id === 'elegant' ? (
                <div className="p-2 h-full flex flex-col items-center gap-1.5">
                    <div className="rounded-full h-2" style={{ backgroundColor: p.primary, width: '65%' }} />
                    <div className="rounded-full h-1 mb-0.5" style={{ backgroundColor: p.accent, width: '45%', opacity: 0.7 }} />
                    <div className="w-full h-0.5 mb-1" style={{ backgroundColor: p.primary, opacity: 0.2 }} />
                    {[100, 85, 95, 75, 90, 80].map((w, i) => (
                        <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                    ))}
                </div>
            ) : id === 'creative_pro' ? (
                <div className="flex h-full">
                    <div className="w-[12px] h-full bg-black shrink-0 flex flex-col items-center py-2 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <div className="flex-1 flex flex-col justify-center gap-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-white/20 rounded-full" />)}
                        </div>
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-1.5 relative">
                        <Palette className="absolute top-2 right-2 text-fuchsia-100/50" size={16} />
                        <div className="rounded-full h-2 mb-1" style={{ backgroundColor: p.primary, width: '60%' }} />
                        <div className="rounded-full h-1 mb-2" style={{ backgroundColor: p.text, width: '30%', opacity: 0.5 }} />
                        {[100, 90, 80, 95].map((w, i) => (
                            <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            ) : id === 'infographic' ? (
                <div className="p-2 h-full flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-4 h-4 rounded bg-teal-500 flex items-center justify-center text-[4px] text-white font-black italic">R</div>
                        <div className="flex-1 space-y-0.5">
                            <div className="h-1 bg-slate-800 w-1/2 rounded-full" />
                            <div className="h-0.5 bg-teal-100 w-full rounded-full" />
                        </div>
                    </div>
                    <div className="h-6 bg-slate-50 border border-slate-100 rounded-lg flex items-center px-1.5">
                        <div className="h-0.5 bg-slate-200 w-full rounded-full shrink-0" />
                    </div>
                    <div className="grid grid-cols-5 gap-1 pt-1">
                        <div className="col-span-3 space-y-1.5">
                            {[70, 85, 60].map((w, i) => (
                                <div key={i} className="h-1 rounded-full" style={{ backgroundColor: p.light, width: `${w}%` }} />
                            ))}
                        </div>
                        <div className="col-span-2 space-y-1.5 pt-1">
                            {[90, 70, 80].map((w, i) => (
                                <div key={i} className="h-0.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-800 rounded-full" style={{ width: `${w}%` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : id === 'developer' ? (
                <div className="p-2 h-full flex flex-col gap-1.5 font-mono text-[#10b981]">
                    <div className="border-b border-slate-700 pb-1 mb-1">
                        <div className="flex items-center gap-1 text-[3px]">
                            <Terminal size={4} />
                            <span>user.profile</span>
                        </div>
                        <div className="h-1.5 bg-white w-2/3 mt-0.5" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="h-0.5 bg-indigo-500/30 w-1/3" />
                        {[80, 70, 90, 60].map((w, i) => (
                            <div key={i} className="flex gap-1 items-center">
                                <span className="text-[3px] text-slate-600">-&gt;</span>
                                <div className="h-0.5 bg-slate-800" style={{ width: `${w}%` }} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : id === 'corporate' ? (
                <div className="p-2 h-full flex flex-col gap-1.5">
                    <div className="border-b-2 border-slate-900 pb-1 mb-2">
                        <div className="h-2 bg-slate-900 w-2/3 mb-1" />
                        <div className="h-1 bg-slate-300 w-1/3" />
                    </div>
                    <div className="space-y-2">
                        {[100, 90, 80].map((w, i) => (
                            <div key={i} className="space-y-1">
                                <div className="h-1.5 bg-slate-100 w-full rounded-sm" />
                                <div className="h-1 bg-slate-50 w-2/3 rounded-sm ml-2" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : id === 'clean' ? (
                <div className="p-2 h-full flex flex-col items-center justify-center gap-2">
                    <div className="h-1 bg-zinc-900 w-1/2 mb-2" />
                    <div className="w-full space-y-1.5">
                        {[70, 60, 80, 50, 65].map((w, i) => (
                            <div key={i} className="h-0.5 bg-zinc-100 mx-auto" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            ) : id === 'timeline' ? (
                <div className="p-2 h-full flex flex-col gap-1.5">
                    <div className="h-1.5 bg-indigo-600 w-2/3 mb-2 rounded-full" />
                    <div className="flex-1 relative pl-3 border-l-2 border-indigo-100/50">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="relative mb-3 last:mb-0">
                                <div className="absolute -left-[14px] top-0.5 w-1.5 h-1.5 rounded-full bg-white border border-indigo-500" />
                                <div className="h-1.5 bg-gray-100 w-full rounded-full" />
                                <div className="h-1 bg-gray-50 w-2/3 mt-0.5 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : id === 'grid' ? (
                <div className="p-2 h-full grid grid-cols-2 gap-1.5 items-start">
                    <div className="col-span-2 h-2 bg-indigo-900 rounded-sm" />
                    <div className="aspect-square bg-white border border-gray-100 rounded p-1 space-y-1 shadow-sm">
                        <div className="h-0.5 bg-indigo-100 w-full" />
                        <div className="h-0.5 bg-indigo-50 w-2/3" />
                    </div>
                    <div className="aspect-square bg-indigo-500 rounded p-1 space-y-1">
                        <div className="h-0.5 bg-white/30 w-full" />
                        <div className="h-0.5 bg-white/20 w-2/3" />
                    </div>
                    <div className="col-span-2 h-4 bg-gray-50 rounded p-1 space-y-1 mt-auto">
                        <div className="h-0.5 bg-gray-200 w-full" />
                        <div className="h-0.5 bg-gray-100 w-2/3" />
                    </div>
                </div>
            ) : id === 'sidebar_pro' ? (
                <div className="flex h-full">
                    <div className="w-1/4 h-full bg-slate-900 p-1.5 flex flex-col gap-1 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-white/10 mx-auto mb-1" />
                        {[30, 40, 35, 20].map((w, i) => (
                            <div key={i} className="h-0.5 bg-white/10" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                    <div className="flex-1 p-2 space-y-2">
                        <div className="h-1.5 bg-slate-900 w-1/2 rounded-full" />
                        {[80, 90, 70, 85].map((w, i) => (
                            <div key={i} className="h-1 bg-slate-50 w-full rounded-full" />
                        ))}
                    </div>
                </div>
            ) : (
                // Standard, Modern, Professional, Minimalist, Executive
                <div className="p-2 h-full flex flex-col gap-1.5">
                    <div className="mb-1">
                        <div className="rounded-full h-2 mb-0.5" style={{ backgroundColor: p.primary, width: '75%' }} />
                        <div className="rounded-full h-1" style={{ backgroundColor: p.text, width: '50%', opacity: 0.7 }} />
                        {id !== 'minimalist' && (
                            <div className="mt-1 rounded-full h-0.5" style={{ backgroundColor: p.accent, width: '100%', opacity: 0.4 }} />
                        )}
                    </div>
                    {[100, 90, 80, 95, 70, 85, 75].map((w, i) => (
                        <div key={i} className="rounded-full h-1" style={{ backgroundColor: p.light, width: `${w}%` }} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function TemplateSelector({ selectedTemplateId, onSelect }: TemplateSelectorProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Choose a Template</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Pick a design and edit it directly in the preview</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100">
                    {templateConfig.length} Designs
                </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {templateConfig.map((template) => {
                        const isSelected = selectedTemplateId === template.id;
                        const isHovered = hoveredId === template.id;
                        const p = palettes[template.id] || palettes.standard;
                        return (
                            <button
                                key={template.id}
                                type="button"
                                onClick={() => onSelect(template.id)}
                                onMouseEnter={() => setHoveredId(template.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`relative group flex flex-col items-center rounded-xl border-2 transition-all duration-200 overflow-hidden ${isSelected
                                    ? 'border-indigo-600 shadow-lg shadow-indigo-200/60 scale-[1.02]'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                    }`}
                                style={{ padding: 0 }}
                            >
                                {/* Thumbnail */}
                                <div
                                    className="w-full aspect-[3/4] relative overflow-hidden"
                                    style={{ backgroundColor: p.bg }}
                                >
                                    <TemplateMiniCard id={template.id} />

                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-200 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}
                                        style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
                                    >
                                        {isSelected ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <CheckCircle className="h-7 w-7 text-white" />
                                                <span className="text-xs font-semibold text-white">Selected</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1">
                                                <Eye className="h-6 w-6 text-white" />
                                                <span className="text-xs font-semibold text-white">Use This</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Selected badge */}
                                    {isSelected && (
                                        <div className="absolute top-1.5 right-1.5 rounded-full bg-indigo-600 p-0.5 shadow">
                                            <CheckCircle className="h-4 w-4 text-white fill-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Label */}
                                <div
                                    className="w-full px-2 py-2 text-center border-t transition-colors"
                                    style={{
                                        borderColor: isSelected ? p.primary + '33' : '#e5e7eb',
                                        backgroundColor: isSelected ? p.bg : '#fff',
                                    }}
                                >
                                    <div
                                        className="text-[11px] font-bold uppercase tracking-wider truncate"
                                        style={{ color: isSelected ? p.primary : '#111827' }}
                                    >
                                        {template.name}
                                    </div>
                                    <div className="text-[9px] text-gray-400 font-medium leading-tight mt-0.5 truncate">
                                        {template.description}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
