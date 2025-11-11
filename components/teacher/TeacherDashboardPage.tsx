import React from 'react';
import type { User, Teacher, Student, Class, Section, Group, Subject, Notice, Result } from '../../types';
import TeacherDashboard from './TeacherDashboard';

interface TeacherDashboardPageProps {
    loggedInUser: User;
    onLogout: () => void;
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    subjects: Subject[];
    notices: Notice[];
    onNoticeClick: (notice: Notice) => void;
    results: Result[];
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

const TeacherDashboardPage: React.FC<TeacherDashboardPageProps> = (props) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <TeacherDashboard {...props} />
        </div>
    );
};

export default TeacherDashboardPage;