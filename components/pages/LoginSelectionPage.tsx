import React from 'react';
import type { LoginRole } from '../../types';
import AcademicCapIcon from '../icons/AcademicCapIcon';
import PersonIcon from '../icons/PersonIcon';
import CogIcon from '../icons/CogIcon';

interface LoginSelectionPageProps {
    onLoginRequest: (role: LoginRole) => void;
}

const LoginCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="group w-full bg-white p-4 md:p-8 rounded-xl shadow-lg hover:shadow-2xl border border-transparent hover:border-brand-primary transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-center"
    >
        <div className="mx-auto bg-brand-primary/10 text-brand-primary rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white">
            {icon}
        </div>
        <h3 className="mt-4 md:mt-6 text-lg md:text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
    </button>
);

const LoginSelectionPage: React.FC<LoginSelectionPageProps> = ({ onLoginRequest }) => {
    return (
        <div className="bg-gray-100 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-brand-primary">লগইন করুন</h2>
                    <p className="text-lg text-gray-600 mt-3">আপনার ভূমিকা নির্বাচন করে লগইন প্যানেলে প্রবেশ করুন।</p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 md:gap-8">
                    <LoginCard
                        icon={<AcademicCapIcon className="w-8 h-8 md:w-12 md:h-12" />}
                        title="শিক্ষক"
                        description="শিক্ষক প্যানেলে প্রবেশ করুন।"
                        onClick={() => onLoginRequest('teacher')}
                    />
                    <LoginCard
                        icon={<PersonIcon className="w-8 h-8 md:w-12 md:h-12" />}
                        title="শিক্ষার্থী"
                        description="শিক্ষার্থী প্যানেলে প্রবেশ করুন।"
                        onClick={() => onLoginRequest('student')}
                    />
                    <LoginCard
                        icon={<CogIcon className="w-8 h-8 md:w-12 md:h-12" />}
                        title="এডমিন"
                        description="এডমিন প্যানেলে প্রবেশ করুন।"
                        onClick={() => onLoginRequest('admin')}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginSelectionPage;