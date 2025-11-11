import React from 'react';
import type { Student, Notice } from '../../types';

interface StudentOverviewProps {
    student: Student;
    notices: Notice[];
    onNoticeClick: (notice: Notice) => void;
}

const NoticeItem: React.FC<{ notice: Notice; onClick: () => void }> = ({ notice, onClick }) => (
    <li className="flex items-start space-x-3 py-3 border-b border-gray-200 last:border-b-0">
        <div className="flex-shrink-0 text-center bg-brand-secondary text-white rounded-md p-2">
            <p className="font-bold text-lg font-tiro-bangla">{notice.date.split(' ')[0]}</p>
            <p className="text-xs">{notice.date.split(' ').length > 1 ? notice.date.split(' ')[1] : ''}</p>
        </div>
        <button onClick={onClick} className="text-left text-gray-700 hover:text-brand-primary transition-colors">{notice.title}</button>
    </li>
);

const StudentOverview: React.FC<StudentOverviewProps> = ({ student, notices, onNoticeClick }) => {
    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold text-gray-800">স্বাগতম, {student.nameBn}</h2>
                <p className="text-gray-600 mt-2">আপনার ব্যক্তিগত ড্যাশবোর্ডে আপনাকে স্বাগতম। এখান থেকে আপনি আপনার প্রোফাইল, ফলাফল এবং অন্যান্য তথ্য দেখতে পারবেন।</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">সাম্প্রতিক নোটিশ</h3>
                    <ul className="space-y-2">
                        {notices.slice(0, 5).map(notice => (
                            <NoticeItem key={notice.id} notice={notice} onClick={() => onNoticeClick(notice)} />
                        ))}
                    </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">দ্রুত লিংক</h3>
                     <p className="text-gray-600">বাম পাশের মেনু থেকে আপনার প্রয়োজনীয় সেকশনে যান।</p>
                </div>
            </div>
        </div>
    );
};

export default StudentOverview;
