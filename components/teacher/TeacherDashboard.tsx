import React, { useState, useMemo, useContext } from 'react';
import type { User, Teacher } from '../../types';
import { AppContext } from '../AppContext';

import DashboardIcon from '../icons/DashboardIcon';
import PersonIcon from '../icons/PersonIcon';
import UsersIcon from '../icons/UsersIcon';
import CalendarIcon from '../icons/CalendarIcon';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';
import CogIcon from '../icons/CogIcon';

import TeacherOverview from './TeacherOverview';
import TeacherProfileManager from './TeacherProfileManager';
import MyStudents from './MyStudents';
import MyRoutine from './MyRoutine';
import TeacherSettingsManager from './TeacherSettingsManager';

type TeacherPage = 'overview' | 'profile' | 'my-students' | 'my-routine' | 'settings';

interface TeacherDashboardProps {
    loggedInUser: User;
    onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ loggedInUser, onLogout }) => {
    const context = useContext(AppContext);
    const [activePage, setActivePage] = useState<TeacherPage>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const teacherData = useMemo(() => {
        return context?.teachers.find(t => t.loginId === loggedInUser.id);
    }, [context?.teachers, loggedInUser.id]);

    const pageTitles: Record<TeacherPage, string> = {
        overview: 'ড্যাশবোর্ড ওভারভিউ',
        profile: 'আমার প্রোফাইল',
        'my-students': 'আমার ছাত্রছাত্রী',
        'my-routine': 'আমার রুটিন',
        settings: 'পাসওয়ার্ড পরিবর্তন',
    };

    if (!context || !teacherData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">ত্রুটি</h2>
                    <p className="text-gray-600">আপনার শিক্ষকের তথ্য খুঁজে পাওয়া যায়নি।</p>
                    <button onClick={onLogout} className="mt-4 px-4 py-2 bg-brand-primary text-white rounded-md">লগআউট</button>
                </div>
            </div>
        );
    }
    
    const renderContent = () => {
        switch (activePage) {
            case 'overview':
                return <TeacherOverview teacher={teacherData} notices={context.notices} onNoticeClick={context.setSelectedNotice} />;
            case 'profile':
                return <TeacherProfileManager teacher={teacherData} setTeachers={context.setTeachers} />;
            case 'my-students':
                return <MyStudents 
                            teacher={teacherData} 
                            students={context.students} 
                            classes={context.classes} 
                            sections={context.sections} 
                            groups={context.groups} 
                            subjects={context.subjects} 
                            results={context.results} 
                            setResults={context.setResults} 
                        />;
            case 'my-routine':
                 return <MyRoutine teacher={teacherData} classes={context.classes} sections={context.sections} groups={context.groups} subjects={context.subjects} />;
            case 'settings':
                return <TeacherSettingsManager teacher={teacherData} setTeachers={context.setTeachers} />;
            default:
                return <TeacherOverview teacher={teacherData} notices={context.notices} onNoticeClick={context.setSelectedNotice} />;
        }
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
           <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                   <div>
                       <h2 className="text-lg font-bold text-brand-primary truncate">{teacherData.name}</h2>
                       <h3 className="font-semibold text-gray-700 text-sm">শিক্ষক প্যানেল</h3>
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800">
                       <XIcon />
                   </button>
               </div>
           </div>
           <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
               <SidebarItem icon={<DashboardIcon />} label="ওভারভিউ" page="overview" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<PersonIcon className="w-5 h-5" />} label="আমার প্রোফাইল" page="profile" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<UsersIcon className="w-5 h-5" />} label="আমার ছাত্রছাত্রী" page="my-students" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<CalendarIcon />} label="আমার রুটিন" page="my-routine" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
               <SidebarItem icon={<CogIcon />} label="সেটিংস" page="settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
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
                        স্বাগতম, <span className="font-semibold">{teacherData.name}</span>
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
    page: TeacherPage;
    activePage: TeacherPage;
    setActivePage: (page: TeacherPage) => void;
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

export default TeacherDashboard;
