"use client";

import { useState } from 'react';
import { templateConfig } from './templates';
import { CheckCircle, Eye, X } from 'lucide-react';

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
};

function TemplateMiniCard({ id }: { id: string }) {
    const p = palettes[id] || palettes.standard;
    const isDark = id === 'tech';

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
        </section>
    );
}
