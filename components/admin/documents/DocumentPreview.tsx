import React, { useState } from 'react';
import PrinterIcon from '../../icons/PrinterIcon';
import DownloadIcon from '../../icons/DownloadIcon';
import { hindSiliguriRegularBase64 } from '../../common/HindSiliguri-Regular';

declare const jspdf: any;

interface DocumentPreviewProps {
    children: React.ReactNode;
    title: string;
    docId: string | number;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ children, title, docId }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        try {
            const { jsPDF } = jspdf;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            pdf.addFileToVFS('HindSiliguri-Regular.ttf', hindSiliguriRegularBase64);
            pdf.addFont('HindSiliguri-Regular.ttf', 'HindSiliguri', 'normal');
            pdf.setFont('HindSiliguri');
            
            // Using jspdf's html method for better text rendering
            const element = document.getElementById('printable-document-content');
            if (element) {
                 await pdf.html(element, {
                    callback: function (pdf: any) {
                        pdf.save(`${title}-${docId}.pdf`);
                    },
                    x: 10,
                    y: 10,
                    width: 190, // A4 width in mm is 210, with 10mm margins
                    windowWidth: element.scrollWidth,
                    fontFaces: [{
                        family: 'HindSiliguri',
                        style: 'normal',
                        weight: 'normal',
                        src: [{
                            url: `data:font/ttf;base64,${hindSiliguriRegularBase64}`,
                            format: 'truetype'
                        }]
                    }]
                });
            }
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("PDF তৈরি করতে একটি সমস্যা হয়েছে।");
        } finally {
            setIsDownloading(false);
        }
    };
    

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-end items-center mb-6 pb-4 border-b no-print">
                <div className="flex items-center space-x-2">
                    <button onClick={handleDownloadPdf} disabled={isDownloading} className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 w-44">
                        {isDownloading ? (
                             <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ডাউনলোড...
                            </>
                        ) : (
                            <>
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                PDF ডাউনলোড
                            </>
                        )}
                    </button>
                    <button onClick={handlePrint} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        <PrinterIcon className="w-4 h-4 mr-2" />
                        প্রিন্ট
                    </button>
                </div>
            </div>
            
            <div id="printable-area">
                <div id="printable-document-content" className="bg-white font-hind-siliguri" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', boxSizing: 'border-box' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DocumentPreview;