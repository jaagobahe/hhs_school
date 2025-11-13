import React, { useState, useMemo, useContext } from 'react';
import type { User, Student, Notice } from '../../types';
import { AppContext } from '../AppContext';

import DashboardIcon from '../icons/DashboardIcon';
import PersonIcon from '../icons/PersonIcon';
import ClipboardListIcon from '../icons/ClipboardListIcon';
import CardIcon from '../icons/CardIcon';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';

import StudentOverview from './StudentOverview';
import StudentProfileManager from './StudentProfileManager';
import StudentResultsViewer from './StudentResultsViewer';
import StudentIDCardRequest from './StudentIDCardRequest';


type StudentPage = 'overview' | 'profile' | 'results' | 'id-card';

interface StudentDashboardProps {
    loggedInUser: User;
    onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ loggedInUser, onLogout }) => {
    const context = useContext(AppContext);
    const [activePage, setActivePage] = useState<StudentPage>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const studentData = useMemo(() => {
        return context?.students.find(s => s.studentId === loggedInUser.id);
    }, [context?.students, loggedInUser.id]);

    const pageTitles: Record<StudentPage, string> = {
        overview: 'ড্যাশবোর্ড ওভারভিউ',
        profile: 'আমার প্রোফাইল',
        results: 'আমার ফলাফল',
        'id-card': 'আইডি কার্ড',
    };

    if (!context || !studentData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">ত্রুটি</h2>
                    <p className="text-gray-600">আপনার শিক্ষার্থীর তথ্য খুঁজে পাওয়া যায়নি।</p>
                    <button onClick={onLogout} className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-md">লগআউট</button>
                </div>
            </div>
        );
    }
    
    const renderContent = () => {
        switch (activePage) {
            case 'overview':
                return <StudentOverview student={studentData} notices={context.notices} onNoticeClick={context.setSelectedNotice} />;
            case 'profile':
                return <StudentProfileManager student={studentData} setStudents={context.setStudents} classes={context.classes} sections={context.sections} groups={context.groups}/>;
            case 'results':
                return <StudentResultsViewer student={studentData} results={context.results} subjects={context.subjects} classes={context.classes} />;
            case 'id-card':
                return <StudentIDCardRequest 
                            student={studentData} 
                            idCardRequests={context.idCardRequests} 
                            setIdCardRequests={context.setIdCardRequests}
                            classes={context.classes}
                            sections={context.sections}
                            groups={context.groups}
                        />;
            default:
                return <StudentOverview student={studentData} notices={context.notices} onNoticeClick={context.setSelectedNotice} />;
        }
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
           <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                   <div>
                       <h2 className="text-lg font-bold text-brand-primary truncate">{studentData.nameBn}</h2>
                       <h3 className="font-semibold text-gray-700 text-sm">শিক্ষার্থী প্যানেল</h3>
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800">
                       <XIcon />
                   </button>
               </div>
           </div>
           <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
               <SidebarItem icon={<DashboardIcon />} label="ওভারভিউ" page="overview" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<PersonIcon className="w-5 h-5" />} label="আমার প্রোফাইল" page="profile" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<ClipboardListIcon className="w-5 h-5" />} label="ফলাফল" page="results" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<CardIcon />} label="আইডি কার্ড" page="id-card" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
           </nav>
            <div className="px-2 py-4 border-t">
               <button onClick={onLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                   <LogoutIcon />
                   <span>লগআউট</span>
               </button>
           </div>
       </div>
   );


    return (
        <div className="flex min-h-screen bg-gray-100">
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                {sidebarContent}
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 mr-4">
                            <MenuIcon />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">{pageTitles[activePage]}</h1>
                    </div>
                     <div className="text-sm">
                        স্বাগতম, <span className="font-semibold">{studentData.nameBn}</span>
                    </div>
                </header>
                
                <main className="flex-grow p-4 md:p-8 overflow-y-auto">
                    <div className="animate-page-fade-in" key={activePage}>
                       {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};


interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    page: StudentPage;
    activePage: StudentPage;
    setActivePage: (page: StudentPage) => void;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, page, activePage, setActivePage, setIsSidebarOpen }) => {
    const isActive = activePage === page;
    return (
         <button 
            onClick={() => { setActivePage(page); setIsSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive 
                ? 'bg-brand-secondary text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default StudentDashboard;
