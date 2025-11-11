import React, { useRef } from 'react';
import type { Teacher, StaffMember } from '../../types';
import DownloadIcon from '../icons/DownloadIcon';
import PrinterIcon from '../icons/PrinterIcon';

declare const html2canvas: any;

function isTeacher(person: Teacher | StaffMember): person is Teacher {
    return 'education' in person;
}

interface StaffIdCardProps {
    person: Teacher | StaffMember;
    isSingleView?: boolean;
}

const StaffIdCard: React.FC<StaffIdCardProps> = ({ person, isSingleView = false }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const personId = isTeacher(person) ? person.loginId : `staff-${person.id}`;

    const handleDownload = () => {
        if (cardRef.current) {
            html2canvas(cardRef.current, { scale: 3, useCORS: true, backgroundColor: null })
            .then((canvas: HTMLCanvasElement) => {
                const link = document.createElement('a');
                link.download = `Staff-ID-Card-${personId}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    const handlePrint = () => {
        const cardElement = cardRef.current;
        if (!cardElement) return;
        cardElement.classList.add('print-this-card');
        window.print();
        setTimeout(() => cardElement.classList.remove('print-this-card'), 1000);
    };

    return (
        <div className="flex flex-col items-center">
            {isSingleView && (
                <div className="flex justify-center gap-2 mb-4 no-print">
                    <button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        <DownloadIcon className="w-4 h-4"/> Download
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                        <PrinterIcon className="w-4 h-4"/> Print
                    </button>
                </div>
            )}
            <div ref={cardRef} className="bg-gray-50 w-[320px] h-[508px] rounded-2xl shadow-xl p-0 flex flex-col font-hind-siliguri relative overflow-hidden card-container">
                
                {/* Header */}
                <div className="bg-brand-primary h-28 rounded-t-2xl pt-4 text-white text-center relative">
                     <div className="flex items-center justify-center space-x-2">
                        <img src="https://picsum.photos/seed/schoollogo/40/40" alt="লোগো" className="h-10 w-10 rounded-full bg-white p-0.5" />
                        <div>
                            <h1 className="text-xl font-bold">হরিপুর উচ্চ বিদ্যালয়</h1>
                            <p className="text-xs opacity-80">পরিচয়পত্র</p>
                        </div>
                    </div>
                </div>
                
                {/* Main Content Area */}
                <main className="flex-grow flex flex-col items-center px-4 -mt-10 z-10">
                    {/* Profile Picture */}
                    <img src={person.imageUrl} alt={person.name} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                    
                    <div className="text-center mt-3">
                        <h3 className="text-2xl font-bold text-gray-800">{person.name}</h3>
                        <p className="font-semibold text-brand-secondary">{person.designation}</p>
                    </div>

                    <div className="w-full text-left mt-4 text-sm space-y-2 border-t pt-3">
                        <InfoRow label="যোগদান" value={new Date(person.joiningDate).toLocaleDateString('bn-BD')} />
                        {isTeacher(person) ? (
                            <>
                                <InfoRow label="আইডি" value={person.loginId || 'N/A'} />
                                <InfoRow label="ইমেইল" value={person.email} />
                                <InfoRow label="ফোন" value={person.phone} />
                            </>
                        ) : (
                             <InfoRow label="আইডি" value={`STAFF-${person.id}`} />
                        )}
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="mt-auto flex justify-between items-end w-full p-4">
                     <div className="text-center">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=hhs-staffid-${personId}`} alt="QR Code" className="w-[60px] h-[60px] bg-white p-0.5 rounded-md border" />
                    </div>
                    <div className="text-center">
                        <img src="https://i.ibb.co/6wm0vQt/signature.png" alt="Signature" className="h-10 mx-auto" />
                        <p className="text-xs border-t-2 border-gray-500 font-semibold text-gray-700 px-4 pt-1">প্রধান শিক্ষক</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

const InfoRow: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="flex">
        <p className="w-1/3 font-semibold text-gray-500">{label}:</p>
        <p className="w-2/3 text-gray-800 font-medium truncate">{value}</p>
    </div>
);

export default StaffIdCard;