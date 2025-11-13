import React from 'react';
import AdminDashboard from '../admin/AdminDashboard';

interface DashboardPageProps {
    onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminDashboard onLogout={onLogout} />
        </div>
    );
};

export default DashboardPage;
