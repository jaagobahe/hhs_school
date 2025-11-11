import React from 'react';
import type { Notice } from '../types';
import XIcon from './icons/XIcon';

interface NoticeModalProps {
    notice: Notice;
    onClose: () => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ notice, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-2xl animate-page-fade-in"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-brand-primary">নোটিশের বিস্তারিত</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800"
                        aria-label="Close modal"
                    >
                        <XIcon />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <h4 className="text-2xl font-bold text-gray-800">{notice.title}</h4>
                    <p className="text-sm text-gray-500">প্রকাশের তারিখ: {notice.date}</p>
                    <p className="text-gray-700 leading-relaxed">{notice.details}</p>
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

export default NoticeModal;