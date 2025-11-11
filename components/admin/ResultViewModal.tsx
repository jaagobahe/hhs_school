import React from 'react';
import type { Student, Result, Subject, Class } from '../../types';
import Modal from '../common/Modal';
import StudentResultCard from '../StudentResultCard';
import PrinterIcon from '../icons/PrinterIcon';
import DownloadIcon from '../icons/DownloadIcon';

declare const html2canvas: any;
declare const jspdf: any;

interface ResultViewModalProps {
    student: Student;
    result: Result;
    subjects: Subject[];
    classes: Class[];
    onClose: () => void;
}

const ResultViewModal: React.FC<ResultViewModalProps> = ({ student, result, subjects, classes, onClose }) => {
    
    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const printableArea = document.getElementById('printable-area');
        if (printableArea) {
            const card = printableArea.querySelector('.border-brand-primary');
            const originalShadow = card ? (card as HTMLElement).style.boxShadow : '';
            if (card) (card as HTMLElement).style.boxShadow = 'none';

            html2canvas(printableArea, {
                scale: 3, // Increased scale for better resolution to reduce blurriness
                useCORS: true,
                backgroundColor: '#ffffff'
            }).then((canvas: HTMLCanvasElement) => {
                if (card) (card as HTMLElement).style.boxShadow = originalShadow;

                // Use JPEG format with high quality to reduce file size
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                const { jsPDF } = jspdf;
                
                // A4 page size in mm: 210 x 297
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const ratio = canvasWidth / canvasHeight;
                
                let imgWidth = pdfWidth - 20; // with 10mm margin on each side
                let imgHeight = imgWidth / ratio;
                
                if (imgHeight > pdfHeight - 20) {
                    imgHeight = pdfHeight - 20; // with 10mm margin top/bottom
                    imgWidth = imgHeight * ratio;
                }

                const x = (pdfWidth - imgWidth) / 2;
                const y = (pdfHeight - imgHeight) / 2;

                pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
                pdf.save(`result-${student.studentId}-${result.exam}.pdf`);
            }).catch((error: any) => {
                console.error("Error generating PDF:", error);
                if (card) (card as HTMLElement).style.boxShadow = originalShadow;
            });
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="একাডেমিক ট্রান্সক্রিপ্ট" size="lg">
            <div id="printable-area">
                <StudentResultCard 
                    student={student}
                    result={result}
                    subjects={subjects}
                    classes={classes}
                />
            </div>
             <div className="flex justify-end space-x-3 pt-4 mt-4 border-t no-print">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বন্ধ করুন</button>
                <button type="button" onClick={handleDownload} className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    ডাউনলোড (PDF)
                </button>
                <button type="button" onClick={handlePrint} className="inline-flex items-center px-6 py-2 bg-brand-secondary text-white rounded-md hover:bg-brand-primary">
                    <PrinterIcon className="w-4 h-4 mr-2" />
                    প্রিন্ট
                </button>
            </div>
        </Modal>
    );
};

export default ResultViewModal;