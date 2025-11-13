import React from 'react';
import type { User } from '../../types';
import TeacherDashboard from './TeacherDashboard';

interface TeacherDashboardPageProps {
    loggedInUser: User;
    onLogout: () => void;
}

const TeacherDashboardPage: React.FC<TeacherDashboardPageProps> = (props) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <TeacherDashboard {...props} />
        </div>
    );
};

export default TeacherDashboardPage;
