import React from 'react';
import type { Teacher } from '../types';
import XIcon from './icons/XIcon';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';

interface TeacherDetailsModalProps {
    teacher: Teacher;
    onClose: () => void;
}

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex items-start py-2 border-b border-gray-100">
        <p className="w-1/3 text-sm text-gray-500 font-medium">{label}</p>
        <p className="w-2/3 text-gray-800 font-tiro-bangla">{value}</p>
    </div>
);


const TeacherDetailsModal: React.FC<TeacherDetailsModalProps> = ({ teacher, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-3xl animate-page-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-brand-primary">শিক্ষকের প্রোফাইল</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800"
                        aria-label="Close modal"
                    >
                        <XIcon />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 text-center">
                            <img src={teacher.imageUrl} alt={teacher.name} className="w-40 h-40 rounded-lg object-cover mx-auto shadow-md" />
                            <h4 className="text-2xl font-bold text-gray-800 mt-4">{teacher.name}</h4>
                            <p className="text-gray-600">{teacher.designation}</p>
                             <div className="flex items-center justify-center space-x-3 mt-3">
                                <a href={`tel:${teacher.phone}`} className="flex items-center text-sm text-gray-600 hover:text-brand-primary">
                                    <PhoneIcon className="w-4 h-4 mr-1" />
                                    ফোন
                                </a>
                                <a href={`mailto:${teacher.email}`} className="flex items-center text-sm text-gray-600 hover:text-brand-primary">
                                    <MailIcon className="w-4 h-4 mr-1" />
                                    ইমেইল
                                </a>
                            </div>
                        </div>
                        <div className="flex-grow md:border-l md:pl-6">
                            <h5 className="text-lg font-semibold text-brand-secondary mb-3">বিস্তারিত তথ্য</h5>
                            <div className="space-y-1">
                                <DetailRow label="শিক্ষাগত যোগ্যতা" value={teacher.education} />
                                <DetailRow label="যোগদানের তারিখ" value={teacher.joiningDate} />
                                <DetailRow label="নিয়োগের তারিখ" value={teacher.appointmentDate} />
                                <DetailRow label="ইমেইল" value={teacher.email} />
                                <DetailRow label="ফোন নম্বর" value={teacher.phone} />
                            </div>
                            <div className="mt-4">
                                <h5 className="text-lg font-semibold text-brand-secondary mb-2">সংক্ষিপ্ত পরিচিতি</h5>
                                <p className="text-gray-700 leading-relaxed text-sm">{teacher.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 text-right rounded-b-lg">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 bg-brand-secondary text-white rounded-md hover:bg-brand-primary transition-colors"
                    >
                        বন্ধ করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetailsModal;
