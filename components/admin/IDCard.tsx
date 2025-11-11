import React, { useMemo, useRef } from 'react';
import type { Student, Class, Section, Group } from '../../types';
import DownloadIcon from '../icons/DownloadIcon';
import PrinterIcon from '../icons/PrinterIcon';

declare const html2canvas: any;

interface IDCardProps {
    student: Student;
    classes: Class[];
    sections: Section[];
    groups: Group[];
    isSingleView?: boolean;
}

const AbstractBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <svg className="absolute -bottom-1/2 -left-1/2 w-[200%] h-[200%]" width="320" height="508" viewBox="0 0 320 508" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-135 254C-135 125.66 -43.3401 21 85 21C213.34 21 305 125.66 305 254V508H-135V254Z" fill="#F0F9FF"/>
            <path d="M405 254C405 382.34 313.34 487 185 487C56.6599 487 -35 382.34 -35 254V0H405V254Z" fill="#E0F2FE" fillOpacity="0.7"/>
        </svg>
    </div>
);


const IDCard: React.FC<IDCardProps> = ({ student, classes, sections, groups, isSingleView = false }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    const sectionMap = useMemo(() => new Map(sections.map(s => [s.id, s.name])), [sections]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);

    const studentClass = `${classMap.get(student.classId) || ''} (${sectionMap.get(student.sectionId) || ''})`;
    const studentGroup = student.groupId ? groupMap.get(student.groupId) : 'প্রযোজ্য নয়';
    
    const handleDownload = () => {
        if (cardRef.current) {
            html2canvas(cardRef.current, {
                scale: 3, // High scale for better resolution
                useCORS: true,
                backgroundColor: null,
                logging: false,
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight,
                windowWidth: cardRef.current.scrollWidth,
                windowHeight: cardRef.current.scrollHeight,
            }).then((canvas: HTMLCanvasElement) => {
                const link = document.createElement('a');
                link.download = `ID-Card-${student.studentId}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            });
        }
    };

    const handlePrint = () => {
        const cardElement = cardRef.current;
        if (!cardElement) return;

        cardElement.classList.add('print-this-card');
        window.print();
        
        setTimeout(() => {
             cardElement.classList.remove('print-this-card');
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center">
             {isSingleView && (
                <div className="flex justify-center gap-2 mb-4 no-print">
                     <button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        <DownloadIcon className="w-4 h-4"/>
                        ডাউনলোড (PNG)
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        <PrinterIcon className="w-4 h-4"/>
                        প্রিন্ট করুন
                    </button>
                </div>
            )}
            <div ref={cardRef} className="bg-white w-[320px] h-[508px] rounded-2xl shadow-xl p-0 flex flex-col font-hind-siliguri relative overflow-hidden card-container">
                <AbstractBackground />
                <div className="relative z-10 flex flex-col h-full text-center p-2">
                    <header className="flex flex-col items-center pb-1">
                        <img src="https://picsum.photos/seed/schoollogo/50/50" alt="লোগো" className="h-12 w-12 rounded-full border-2 border-white shadow-md" />
                        <h1 className="text-2xl font-bold text-brand-primary mt-1">হরিপুর উচ্চ বিদ্যালয়</h1>
                        <p className="text-xs text-gray-600">EIIN: <span className="font-tiro-bangla">১২১৬২৯</span>, স্থাপিত: <span className="font-tiro-bangla">১৮৮২</span></p>
                    </header>
                    
                    <main className="flex-grow flex flex-col items-center pt-1">
                         <div className="relative w-36 h-36">
                             <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full -rotate-45"></div>
                             <div className="absolute inset-1 bg-white rounded-full p-1">
                                <img src={student.photoUrl} alt={student.nameBn} className="w-full h-full object-cover rounded-full" />
                             </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mt-1">{student.nameBn}</h3>
                        <p className="text-sm text-gray-500 uppercase font-medium">{student.nameEn}</p>
                        
                        <div className="w-full text-left mt-2 text-sm space-y-1 px-2">
                            <InfoRow label="আইডি" value={student.studentId} valueClass="font-tiro-bangla font-bold" />
                            <InfoRow label="শ্রেণী" value={studentClass} />
                            <InfoRow label="বিভাগ" value={studentGroup} />
                            <InfoRow label="রোল" value={student.roll.toLocaleString('bn-BD')} valueClass="font-tiro-bangla font-bold" />
                            <InfoRow label="রক্তের গ্রুপ" value={student.bloodGroup || 'N/A'} valueClass="font-bold text-red-600" />
                        </div>
                    </main>

                    <footer className="mt-auto flex justify-between items-end w-full pt-1">
                         <div className="text-center">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=hhs-sid-${student.studentId}`} alt="QR Code" className="w-[60px] h-[60px] bg-white p-0.5 rounded-md" />
                        </div>
                        <div className="text-center">
                            <img src="https://i.ibb.co/6wm0vQt/signature.png" alt="Signature" className="h-10 mx-auto" />
                            <p className="text-xs border-t-2 border-gray-600 font-semibold text-gray-700 px-2">প্রধান শিক্ষক</p>
                        </div>
                    </footer>
                </div>
                 {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary to-brand-accent"></div>
            </div>
        </div>
    );
};

const InfoRow: React.FC<{ label: string; value: string; valueClass?: string }> = ({ label, value, valueClass = '' }) => (
    <div className="flex justify-between items-center border-b border-gray-300/50 pb-0.5">
        <p className="font-semibold text-gray-600">{label}:</p>
        <p className={`text-gray-900 font-medium ${valueClass}`}>{value}</p>
    </div>
);

export default IDCard;
