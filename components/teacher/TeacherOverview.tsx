import React from 'react';
import type { Teacher, Notice } from '../../types';
import UsersIcon from '../icons/UsersIcon';
import BookOpenIcon from '../icons/BookOpenIcon';

interface TeacherOverviewProps {
    teacher: Teacher;
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

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="text-3xl text-brand-primary">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-gray-800 font-tiro-bangla">{value}</p>
            <p className="text-gray-600">{title}</p>
        </div>
    </div>
);


const TeacherOverview: React.FC<TeacherOverviewProps> = ({ teacher, notices, onNoticeClick }) => {
    const totalAssignments = teacher.assignments?.length || 0;
    
    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold text-gray-800">স্বাগতম, {teacher.name}</h2>
                <p className="text-gray-600 mt-2">আপনার ব্যক্তিগত ড্যাশবোর্ডে আপনাকে স্বাগতম।</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <StatCard title="মোট ক্লাস/বিষয়" value={totalAssignments.toLocaleString('bn-BD')} icon={<BookOpenIcon />} />
                <StatCard title="মোট শিক্ষার্থী (আনুমানিক)" value={'১৫০'} icon={<UsersIcon />} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">সাম্প্রতিক নোটিশ</h3>
                <ul className="space-y-2">
                    {notices.slice(0, 5).map(notice => (
                        <NoticeItem key={notice.id} notice={notice} onClick={() => onNoticeClick(notice)} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeacherOverview;