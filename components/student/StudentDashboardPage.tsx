import React from 'react';
import type { User, Notice } from '../../types';
import StudentDashboard from './StudentDashboard';

interface StudentDashboardPageProps {
    loggedInUser: User;
    onLogout: () => void;
}

const StudentDashboardPage: React.FC<StudentDashboardPageProps> = (props) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <StudentDashboard {...props} />
        </div>
    );
};

export default StudentDashboardPage;
