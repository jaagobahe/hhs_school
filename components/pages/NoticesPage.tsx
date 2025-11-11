import React from 'react';
import type { Notice } from '../../types';
import DownloadIcon from '../icons/DownloadIcon';
import EyeIcon from '../icons/EyeIcon';

interface NoticesPageProps {
    notices: Notice[];
    onNoticeClick: (notice: Notice) => void;
}

const NoticesPage: React.FC<NoticesPageProps> = ({ notices, onNoticeClick }) => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-brand-primary">সকল নোটিশ</h2>
                    <p className="text-lg text-gray-600 mt-2">বিদ্যালয়ের সকল সাম্প্রতিক ও পুরাতন নোটিশসমূহ</p>
                </div>
                
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-base">
                            <thead className="bg-brand-primary text-white">
                                <tr>
                                    <th className="py-4 px-6 text-center font-semibold tracking-wider">প্রকাশের তারিখ</th>
                                    <th className="py-4 px-6 text-left font-semibold tracking-wider">শিরোনাম</th>
                                    <th className="py-4 px-6 text-center font-semibold tracking-wider">পদক্ষেপ</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {notices.map((notice, index) => (
                                    <tr 
                                        key={notice.id} 
                                        className={`border-t border-gray-200 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                                    >
                                        <td className="py-4 px-6 text-center font-tiro-bangla whitespace-nowrap">
                                            {notice.date}
                                        </td>
                                        <td className="py-4 px-6 text-left">
                                            {notice.title}
                                            {notice.isUrgent && (
                                                <span className="ml-3 text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full">জরুরী</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-center whitespace-nowrap space-x-2">
                                            <button 
                                                onClick={() => onNoticeClick(notice)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                                                title="বিস্তারিত দেখুন"
                                            >
                                                <EyeIcon className="w-4 h-4 mr-1"/>
                                                <span>দেখুন</span>
                                            </button>
                                            {notice.fileUrl && (
                                                <a 
                                                    href={notice.fileUrl} 
                                                    download={notice.fileName || 'notice-file'}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors"
                                                    title="ডাউনলোড করুন"
                                                >
                                                    <DownloadIcon className="w-4 h-4 mr-1"/>
                                                   <span>ডাউনলোড</span>
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     {notices.length === 0 && (
                        <p className="text-center py-10 text-gray-500">কোনো নোটিশ পাওয়া যায়নি।</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticesPage;