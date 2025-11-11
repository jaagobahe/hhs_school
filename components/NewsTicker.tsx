import React from 'react';
import BoltIcon from './icons/BoltIcon';
import type { Notice } from '../types';

interface NewsTickerProps {
    onNoticeClick: (notice: Notice) => void;
    notices: Notice[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ onNoticeClick, notices }) => {
    if (!notices || notices.length === 0) {
        return null;
    }
    // প্রশস্ত স্ক্রিনে একটি মসৃণ এবং অবিচ্ছিন্ন স্ক্রলিং নিশ্চিত করতে, আমরা নোটিশগুলো কয়েকবার পুনরাবৃত্তি করি।
    const singleBlock = Array(4).fill(notices).flat();
    
    // CSS অ্যানিমেশনের মাধ্যমে একটি বিরামহীন লুপিং প্রভাব তৈরি করার জন্য আমরা সেই ব্লকটিকে ডুপ্লিকেট করি।
    const extendedNotices = [...singleBlock, ...singleBlock];

    return (
        <div className="py-3">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-red-600 text-white font-semibold text-center py-2 px-4">
                         <h2 className="text-lg">বিশেষ বিজ্ঞপ্তি</h2>
                    </div>
                    <div className="h-12 flex items-center overflow-hidden">
                        <div className="animate-scroll-horizontal inline-flex items-center h-full">
                            {extendedNotices.map((notice, index) => (
                                <button 
                                    key={`${notice.id}-${index}`} 
                                    onClick={() => onNoticeClick(notice)}
                                    className="flex-shrink-0 flex items-center mx-8 text-sm md:text-base text-gray-800 whitespace-nowrap hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
                                >
                                    <BoltIcon className="w-4 h-4 mr-2 text-red-700" />
                                    <span>{notice.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
