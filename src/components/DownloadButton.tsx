"use client";

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
    targetId: string; // The id of the DOM element to capture
    fileName?: string;
}

export default function DownloadButton({ targetId, fileName = 'resume' }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const element = document.getElementById(targetId);
            if (!element) {
                alert('Could not find resume element to export.');
                return;
            }

            // Scroll to top to ensure html2canvas captures correctly from the start
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            window.scrollTo(0, 0);

            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    logging: true, // Enable logging for production diagnostics
                    allowTaint: true,
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: 'a4',
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const canvasRatio = canvas.height / canvas.width;
                const imgWidth = pdfWidth;
                const imgHeight = pdfWidth * canvasRatio;

                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                pdf.save(`${fileName}.pdf`);
            } finally {
                // Restore scroll position
                window.scrollTo(scrollX, scrollY);
            }
        } catch (err: any) {
            console.error('Failed to generate PDF:', err);
            alert(`PDF generation failed: ${err.message || 'Unknown error'}. Please try again.`);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="group flex items-center gap-2.5 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isDownloading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating PDF...
                </>
            ) : (
                <>
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Download PDF
                </>
            )}
        </button>
    );
}
