import React from 'react';
import TeacherCard from '../TeacherCard';
import type { Teacher } from '../../types';

interface TeachersPageProps {
    onTeacherDetailsClick: (teacher: Teacher) => void;
    teachers: Teacher[];
}

const TeachersPage: React.FC<TeachersPageProps> = ({ onTeacherDetailsClick, teachers }) => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-brand-primary">আমাদের অভিজ্ঞ শিক্ষকবৃন্দ</h2>
                    <p className="text-gray-600 mt-2">আমাদের নিবেদিতপ্রাণ শিক্ষকদের সাথে পরিচিত হন যারা শিক্ষার্থীদের ভবিষ্যৎ গঠনে অক্লান্ত পরিশ্রম করে যাচ্ছেন।</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teachers.map((teacher) => (
                        <TeacherCard key={teacher.id} teacher={teacher} onDetailsClick={onTeacherDetailsClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeachersPage;
