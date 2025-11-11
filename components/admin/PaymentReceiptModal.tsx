import React, { useState } from 'react';
import type { OnlineAdmission, Class } from '../../types';
import Modal from '../common/Modal';
import PrinterIcon from '../icons/PrinterIcon';
import DownloadIcon from '../icons/DownloadIcon';
import { hindSiliguriRegularBase64 } from '../common/HindSiliguri-Regular';


declare const jspdf: any;

// Function to convert number to Bengali words
const toBengaliWords = (num: number): string => {
    // This is a simplified version. For a full implementation, a library would be better.
    // For now, let's just return the number with "টাকা মাত্র"
    return `${num.toLocaleString('bn-BD')} টাকা মাত্র`;
};


interface PaymentReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    admission: OnlineAdmission | null;
    classes: Class[];
}

const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({ isOpen, onClose, admission, classes }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    if (!isOpen || !admission) return null;

    const classMap = new Map(classes.map(c => [c.id, c.name]));

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPdf = async () => {
        if (!admission) return;
        setIsDownloading(true);

        try {
            const { jsPDF } = jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            pdf.addFileToVFS('HindSiliguri-Regular.ttf', hindSiliguriRegularBase64);
            pdf.addFont('HindSiliguri-Regular.ttf', 'HindSiliguri', 'normal');
            pdf.setFont('HindSiliguri');

            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 15;
            let y = margin;

            const fetchImage = async (url: string): Promise<{ dataUrl: string, format: string }> => {
                const response = await fetch(url);
                 if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                }
                const blob = await response.blob();
                const format = blob.type.split('/')[1]?.toUpperCase();
                
                if (!format || !['PNG', 'JPEG', 'JPG'].includes(format)) {
                    // Fallback or throw error
                    console.warn(`Unsupported image format: ${blob.type}. Defaulting to JPEG.`);
                }
                
                const safeFormat = format === 'JPG' ? 'JPEG' : (format || 'JPEG');

                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (reader.result) {
                            resolve({ dataUrl: reader.result as string, format: safeFormat });
                        } else {
                            reject(new Error('Failed to read blob as data URL.'));
                        }
                    };
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(blob);
                });
            };

            const logoUrl = 'https://picsum.photos/seed/schoollogo/60/60';
            const signatureUrl = 'https://i.ibb.co/6wm0vQt/signature.png';
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=hhs-receipt-${admission.id}`;

            const [logo, signature, qr] = await Promise.all([
                fetchImage(logoUrl),
                fetchImage(signatureUrl),
                fetchImage(qrUrl)
            ]);
            
            y += 5;
            pdf.addImage(logo.dataUrl, logo.format, (pageWidth - 20) / 2, y, 20, 20);
            y += 25;

            pdf.setFontSize(22);
            pdf.text('হরিপুর উচ্চ বিদ্যালয়', pageWidth / 2, y, { align: 'center' });
            y += 8;

            pdf.setFontSize(10);
            pdf.text(`EIIN: ১২১৬২৯, স্থাপিত: ১৮৮২`, pageWidth / 2, y, { align: 'center' });
            y += 5;
            pdf.text('উজাড় বোচাগাড়ী, সুন্দরগঞ্জ, গাইবান্ধা।', pageWidth / 2, y, { align: 'center' });
            y += 10;
            
            pdf.setFillColor(229, 231, 235);
            pdf.rect((pageWidth - 50) / 2, y - 3, 50, 8, 'F');
            pdf.setFontSize(14);
            pdf.text('ভর্তি ফি রশিদ', pageWidth / 2, y + 2, { align: 'center' });
            y += 15;
            
            pdf.setDrawColor(209, 213, 219);
            pdf.setLineDash([2, 2], 0);
            pdf.line(margin, y, pageWidth - margin, y);
            pdf.setLineDash([], 0);
            y += 10;

            pdf.setFontSize(11);
            pdf.text(`রশিদ নং: ADM-${admission.id}`, margin, y);
            const dateText = `তারিখ: ${admission.paymentDate ? new Date(admission.paymentDate).toLocaleDateString('bn-BD') : 'N/A'}`;
            pdf.text(dateText, pageWidth - margin, y, { align: 'right' });
            y += 15;

            const leftMargin = 25.4;
            const drawInfoRow = (label: string, value: string) => {
                pdf.setFontSize(11);
                pdf.setTextColor(107, 114, 128);
                pdf.text(label, leftMargin, y);
                pdf.setTextColor(0, 0, 0);
                pdf.text(`: ${value}`, leftMargin + 40, y);
                y += 8;
            };
            
            drawInfoRow('শিক্ষার্থীর নাম', admission.studentNameBn);
            drawInfoRow('পিতার নাম', admission.fatherNameBn);
            drawInfoRow('শ্রেণী', (classMap.get(admission.admissionClassId) || '') as string);
            drawInfoRow('ট্রানজেকশন আইডি', admission.paymentTransactionId || 'N/A');
            drawInfoRow('পেমেন্ট মাধ্যম', admission.paymentGateway === 'offline' ? 'অফিস কাউন্টার' : admission.paymentGateway || 'N/A');
            
            y += 15;

            const tableX = pageWidth * 0.55;
            const tableWidth = pageWidth - tableX - margin;
            
            pdf.setFontSize(11);
            pdf.text('মোট', tableX, y);
            pdf.text(`${admission.paymentAmount?.toLocaleString('bn-BD')} টাকা`, tableX + tableWidth, y, { align: 'right' });
            y += 7;

            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(0.5);
            pdf.line(tableX, y, tableX + tableWidth, y);
            y += 5;

            pdf.setFontSize(12);
            pdf.setFont('HindSiliguri', 'normal');
            pdf.text('সর্বমোট', tableX, y);
            pdf.text(`${admission.paymentAmount?.toLocaleString('bn-BD')} টাকা`, tableX + tableWidth, y, { align: 'right' });
            y += 15;

            pdf.setFontSize(11);
            pdf.text(`কথায়: ${toBengaliWords(admission.paymentAmount || 0)}`, leftMargin, y);
            
            const footerY = y + 30;

            pdf.addImage(qr.dataUrl, qr.format, leftMargin, footerY, 30, 30);
            pdf.text('Scan for details', leftMargin + 6, footerY + 35);


            const signatureX = pageWidth - margin - 60;
            pdf.addImage(signature.dataUrl, signature.format, signatureX + 10, footerY + 5, 40, 15);
            const sigY = footerY + 25;
            pdf.setDrawColor(107, 114, 128);
            pdf.setLineWidth(0.5);
            pdf.line(signatureX, sigY, signatureX + 60, sigY);
            pdf.setFontSize(10);
            pdf.text('আদায়কারীর স্বাক্ষর', signatureX + 30, sigY + 5, { align: 'center' });
            
            pdf.save(`receipt-${admission.id}.pdf`);

        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("PDF তৈরি করতে একটি সমস্যা হয়েছে।");
        } finally {
            setIsDownloading(false);
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} title="ভর্তি ফি রশিদ" size="lg">
            <div id="printable-receipt" className="font-hind-siliguri bg-white p-4">
                <header className="text-center mb-6 border-b-2 border-dashed pb-4">
                    <img src="https://picsum.photos/seed/schoollogo/60/60" alt="লোগো" className="h-16 w-16 rounded-full mx-auto" />
                    <h1 className="text-3xl font-bold text-brand-primary mt-2 whitespace-nowrap">হরিপুর উচ্চ বিদ্যালয়</h1>
                    <p className="text-sm text-gray-600">EIIN: <span className="font-tiro-bangla">১২১৬২৯</span>, স্থাপিত: <span className="font-tiro-bangla">১৮৮২</span></p>
                    <p className="text-sm text-gray-600">উজাড় বোচাগাড়ী, সুন্দরগঞ্জ, গাইবান্ধা।</p>
                    <h2 className="text-xl font-semibold bg-gray-200 inline-block px-4 py-1 rounded-md mt-4">ভর্তি ফি রশিদ</h2>
                </header>
                
                <div className="flex justify-between mb-6 text-sm px-8">
                    <p><span className="font-semibold">রশিদ নং:</span> ADM-{admission.id}</p>
                    <p><span className="font-semibold">তারিখ:</span> {admission.paymentDate ? new Date(admission.paymentDate).toLocaleDateString('bn-BD') : 'N/A'}</p>
                </div>

                <div className="space-y-2 mb-6 text-sm pl-8">
                    <div className="flex"><p className="w-1/3 font-semibold text-gray-600">শিক্ষার্থীর নাম</p><p className="w-2/3">: {admission.studentNameBn}</p></div>
                    <div className="flex"><p className="w-1/3 font-semibold text-gray-600">পিতার নাম</p><p className="w-2/3">: {admission.fatherNameBn}</p></div>
                    <div className="flex"><p className="w-1/3 font-semibold text-gray-600">শ্রেণী</p><p className="w-2/3">: {classMap.get(admission.admissionClassId)}</p></div>
                    <div className="flex"><p className="w-1/3 font-semibold text-gray-600">ট্রানজেকশন আইডি</p><p className="w-2/3 font-mono">: {admission.paymentTransactionId || 'N/A'}</p></div>
                    <div className="flex"><p className="w-1/3 font-semibold text-gray-600">পেমেন্ট মাধ্যম</p><p className="w-2/3">: {admission.paymentGateway === 'offline' ? 'অফিস কাউন্টার' : admission.paymentGateway}</p></div>
                </div>

                
                <div className="flex justify-end mb-8 px-8">
                    <table className="w-2/5 text-sm">
                        <tbody>
                            <tr><td className="py-1 font-semibold">মোট</td><td className="py-1 text-right font-tiro-bangla">{admission.paymentAmount?.toLocaleString('bn-BD')} টাকা</td></tr>
                            <tr className="border-t-2 border-black"><td className="py-2 font-bold">সর্বমোট</td><td className="py-2 text-right font-bold font-tiro-bangla">{admission.paymentAmount?.toLocaleString('bn-BD')} টাকা</td></tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-sm mb-16 pl-8"><span className="font-semibold">কথায়:</span> {toBengaliWords(admission.paymentAmount || 0)}</p>

                <div className="flex justify-between items-end pt-8 px-8">
                    <div className="text-center">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=hhs-receipt-${admission.id}`} alt="QR Code" className="w-20 h-20 bg-white p-0.5 rounded-md border" />
                        <p className="text-xs text-gray-500 mt-1">Scan for details</p>
                    </div>
                    <div className="text-center">
                        <img src="https://i.ibb.co/6wm0vQt/signature.png" alt="Signature" className="h-12 mx-auto" />
                        <p className="border-t-2 border-gray-500 px-8 pt-1 font-semibold text-sm">আদায়কারীর স্বাক্ষর</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 mt-4 border-t no-print">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বন্ধ করুন</button>
                <button 
                    type="button" 
                    onClick={handleDownloadPdf} 
                    disabled={isDownloading}
                    className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed w-48"
                >
                    {isDownloading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ডাউনলোড হচ্ছে...
                        </>
                    ) : (
                        <>
                            <DownloadIcon className="w-4 h-4 mr-2" />
                            PDF ডাউনলোড করুন
                        </>
                    )}
                </button>
                <button type="button" onClick={handlePrint} className="inline-flex items-center px-6 py-2 bg-brand-secondary text-white rounded-md hover:bg-brand-primary">
                    <PrinterIcon className="w-4 h-4 mr-2" />
                    প্রিন্ট
                </button>
            </div>
        </Modal>
    );
};

export default PaymentReceiptModal;