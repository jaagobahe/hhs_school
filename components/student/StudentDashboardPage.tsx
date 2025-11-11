import React from 'react';
import type { User, Student, Result, Subject, Class, Section, Group, IDCardRequest, Notice } from '../../types';
import StudentDashboard from './StudentDashboard';

interface StudentDashboardPageProps {
    loggedInUser: User;
    onLogout: () => void;
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    results: Result[];
    subjects: Subject[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    idCardRequests: IDCardRequest[];
    setIdCardRequests: React.Dispatch<React.SetStateAction<IDCardRequest[]>>;
    notices: Notice[];
    onNoticeClick: (notice: Notice) => void;
}

const StudentDashboardPage: React.FC<StudentDashboardPageProps> = (props) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <StudentDashboard {...props} />
        </div>
    );
};

export default StudentDashboardPage;
