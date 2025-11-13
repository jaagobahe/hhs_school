import React, { useState, useContext } from 'react';
import type { Student, AdmissionSettings } from '../../types';
import { AppContext } from '../AppContext';

import DashboardIcon from '../icons/DashboardIcon';
import NewspaperIcon from '../icons/NewspaperIcon';
import PhotographIcon from '../icons/PhotographIcon';
import UsersIcon from '../icons/UsersIcon';
import CogIcon from '../icons/CogIcon';
import LogoutIcon from '../icons/LogoutIcon';
import AcademicCapIcon from '../icons/AcademicCapIcon';
import IdentificationIcon from '../icons/IdentificationIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';
import CardIcon from '../icons/CardIcon';
import SmsIcon from '../icons/SmsIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import WalletIcon from '../icons/WalletIcon';

import DashboardOverview from './DashboardOverview';
import NoticeManager from './NoticeManager';
import GalleryManager from './GalleryManager';
import CommitteeManager from './CommitteeManager';
import SiteSettingsManager from './SiteSettingsManager';
import SliderManager from './SliderManager';
import StaffManager from './StaffManager';
import StudentStatsManager from './StudentStatsManager';
import TeacherManager from './TeacherManager';
import ResultsManager from './ResultsManager';
import OnlineAdmissionManager from './OnlineAdmissionManager';
import NewStudentManager from './NewStudentManager';
import AllStudentsManager from './AllStudentsManager';
import ClassManager from './ClassManager';
import GroupManager from './GroupManager';
import SectionManager from './SectionManager';
import SubjectManager from './SubjectManager';
import ResultEntryManager from './ResultEntryManager';
import TeacherLoginManager from './TeacherLoginManager';
import StudentLoginManager from './StudentLoginManager';
import IDCardManager from './IDCardManager';
import StaffIdCardManager from './StaffIdCardManager';
import SmsSettingsManager from './SmsSettingsManager';
import AdmissionSettingsManager from './AdmissionSettingsManager';
import TestimonialStudent from './documents/TestimonialStudent';
import TestimonialTeacher from './documents/TestimonialTeacher';
import TransferCertificate from './documents/TransferCertificate';
import RecommendationLetter from './documents/RecommendationLetter';
import AdmitCard from './documents/AdmitCard';
import PaymentSettingsManager from './PaymentSettingsManager';


// New component for admin settings
const AdminSettingsManager: React.FC = () => {
    const [username, setUsername] = useState('admin');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।' });
            return;
        }

        // Mock password check
        if (currentPassword !== 'admin') {
             setMessage({ type: 'error', text: 'বর্তমান পাসওয়ার্ড সঠিক নয়।' });
             return;
        }
        
        // In a real app, you would make an API call here.
        console.log('Updating settings:', { username, newPassword });
        setMessage({ type: 'success', text: 'সেটিংস সফলভাবে হালনাগাদ করা হয়েছে।' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">ইউজারনেম পরিবর্তন</h3>
                        <div className="mt-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                নতুন ইউজারনেম
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">পাসওয়ার্ড পরিবর্তন</h3>
                        <div className="mt-4 space-y-4">
                             <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                    বর্তমান পাসওয়ার্ড
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    id="currentPassword"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                    নতুন পাসওয়ার্ড
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                             <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    নতুন পাসওয়ার্ড নিশ্চিত করুন
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <div className="pt-5 text-right">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary"
                        >
                            সংরক্ষণ করুন
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


type AdminPage = 
    | 'overview' 
    | 'notices' 
    | 'gallery' 
    | 'slider'
    | 'committee'
    | 'teachers'
    | 'staff'
    | 'student-stats'
    | 'results-ssc'
    | 'online-admissions'
    | 'new-student'
    | 'all-students'
    | 'classes'
    | 'sections'
    | 'groups'
    | 'subjects'
    | 'result-entry'
    | 'student-id-card'
    | 'staff-id-card'
    | 'settings'
    | 'admin-settings'
    | 'teacher-logins'
    | 'student-logins'
    | 'sms-settings'
    | 'admission-settings'
    | 'testimonial-student'
    | 'testimonial-teacher'
    | 'transfer-certificate'
    | 'recommendation-letter'
    | 'admit-card'
    | 'payment-settings';


interface AdminDashboardProps {
    onLogout: () => void;
}


const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const context = useContext(AppContext);
    const [activePage, setActivePage] = useState<AdminPage>('overview');
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
    
    // Fix: Add initial state for payment settings from context if available, or a default structure.
    const [paymentSettings, setPaymentSettings] = useState(context?.paymentSettings || {
        admissionFee: 250,
        bKash: { enabled: true, sandboxMode: true, merchantNumber: "017xxxxxxxx", username: null, appKey: null, appSecret: null, password: null }
    });

    if (!context) {
        return <div className="flex justify-center items-center h-screen">Loading context...</div>;
    }
    
    const pageTitles: Record<AdminPage, string> = {
        overview: 'ওভারভিউ',
        notices: 'নোটিশ ব্যবস্থাপনা',
        gallery: 'গ্যালারি ব্যবস্থাপনা',
        slider: 'স্লাইডার ব্যবস্থাপনা',
        committee: 'কমিটি ব্যবস্থাপনা',
        teachers: 'শিক্ষক ব্যবস্থাপনা',
        staff: 'কর্মচারী ব্যবস্থাপনা',
        'student-stats': 'শিক্ষার্থী পরিসংখ্যান',
        'results-ssc': 'SSC ফলাফল',
        'online-admissions': 'ভর্তি আবেদন',
        'new-student': studentToEdit ? 'শিক্ষার্থী সম্পাদনা' : 'নতুন শিক্ষার্থী',
        'all-students': 'সকল শিক্ষার্থী',
        classes: 'শ্রেণী ব্যবস্থাপনা',
        sections: 'শাখা ব্যবস্থাপনা',
        groups: 'বিভাগ ব্যবস্থাপনা',
        subjects: 'বিষয় ব্যবস্থাপনা',
        'result-entry': 'ফলাফল এন্ট্রি',
        'student-id-card': 'আইডি কার্ড (শিক্ষার্থী)',
        'staff-id-card': 'আইডি কার্ড (জনবল)',
        settings: 'সাইট সেটিংস',
        'admin-settings': 'এডমিন সেটিংস',
        'teacher-logins': 'শিক্ষক লগইন তথ্য',
        'student-logins': 'শিক্ষার্থী লগইন তথ্য',
        'sms-settings': 'এসএমএস সেটিংস',
        'admission-settings': 'ভর্তি ফরম সেটিংস',
        'testimonial-student': 'প্রত্যয়ন পত্র (শিক্ষার্থী)',
        'testimonial-teacher': 'প্রত্যয়ন পত্র (শিক্ষক)',
        'transfer-certificate': 'ছাড়পত্র',
        'recommendation-letter': 'প্রশংসা পত্র',
        'admit-card': 'প্রবেশ পত্র',
        'payment-settings': 'পেমেন্ট গেটওয়ে',
    };

    const toggleDropdown = (label: string) => {
        setOpenDropdowns(prev => 
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    const handleEditStudent = (student: Student) => {
        setStudentToEdit(student);
        setActivePage('new-student');
    };
    
    const handleSaveStudent = (student: Student) => {
        if(studentToEdit) {
            context.setStudents(context.students.map(s => s.id === student.id ? student : s));
        } else {
            context.setStudents([student, ...context.students]);
        }
        setStudentToEdit(null);
        setActivePage('all-students');
    };
    
    const handleCancelStudentForm = () => {
        setStudentToEdit(null);
        setActivePage('all-students');
    };

    const renderContent = () => {
        switch (activePage) {
            case 'overview': return <DashboardOverview />;
            case 'notices': return <NoticeManager notices={context.notices} setNotices={context.setNotices} />;
            case 'gallery': return <GalleryManager galleryImages={context.galleryImages} setGalleryImages={context.setGalleryImages} />;
            case 'slider': return <SliderManager sliderImages={context.sliderImages} setSliderImages={context.setSliderImages} />;
            case 'committee': return <CommitteeManager committeeMembers={context.adhocCommitteeMembers} setCommitteeMembers={context.setAdhocCommitteeMembers} />;
            case 'teachers': return <TeacherManager teachers={context.teachers} setTeachers={context.setTeachers} classes={context.classes} sections={context.sections} groups={context.groups} subjects={context.subjects} />;
            case 'staff': return <StaffManager staff={context.staff} setStaff={context.setStaff} />;
            case 'student-stats': return <StudentStatsManager genderData={context.genderData} setGenderData={context.setGenderData} islamData={context.islamData} setIslamData={context.setIslamData} hinduData={context.hinduData} setHinduData={context.setHinduData} />;
            case 'results-ssc': return <ResultsManager sscResults={context.sscResults} setSscResults={context.setSscResults} />;
            case 'online-admissions': return <OnlineAdmissionManager admissions={context.onlineAdmissions} setAdmissions={context.setOnlineAdmissions} students={context.students} setStudents={context.setStudents} classes={context.classes} groups={context.groups} sections={context.sections} studentLogins={context.studentLogins} setStudentLogins={context.setStudentLogins} />;
            case 'new-student': return <NewStudentManager onSave={handleSaveStudent} onCancel={handleCancelStudentForm} studentToEdit={studentToEdit} classes={context.classes} groups={context.groups} sections={context.sections} students={context.students} setStudentLogins={context.setStudentLogins} />;
            case 'all-students': return <AllStudentsManager students={context.students} setStudents={context.setStudents} onEditStudent={handleEditStudent} classes={context.classes} groups={context.groups} sections={context.sections} setStudentLogins={context.setStudentLogins} />;
            case 'classes': return <ClassManager classes={context.classes} setClasses={context.setClasses} />;
            case 'sections': return <SectionManager sections={context.sections} setSections={context.setSections} />;
            case 'groups': return <GroupManager groups={context.groups} setGroups={context.setGroups} />;
            case 'subjects': return <SubjectManager subjects={context.subjects} setSubjects={context.setSubjects} classes={context.classes} groups={context.groups} />;
            case 'result-entry': return <ResultEntryManager students={context.students} subjects={context.subjects} classes={context.classes} sections={context.sections} groups={context.groups} results={context.results} setResults={context.setResults} />;
            case 'student-id-card': return <IDCardManager students={context.students} classes={context.classes} sections={context.sections} groups={context.groups} idCardRequests={context.idCardRequests} setIdCardRequests={context.setIdCardRequests} />;
            case 'staff-id-card': return <StaffIdCardManager teachers={context.teachers} staff={context.staff} />;
            case 'settings': return <SiteSettingsManager logoUrl={context.logoUrl} setLogoUrl={context.setLogoUrl} />;
            case 'admin-settings': return <AdminSettingsManager />;
            case 'teacher-logins': return <TeacherLoginManager teachers={context.teachers} />;
            case 'student-logins': return <StudentLoginManager students={context.students} classes={context.classes} sections={context.sections} groups={context.groups} studentLogins={context.studentLogins} setStudentLogins={context.setStudentLogins} />;
            case 'sms-settings': return <SmsSettingsManager students={context.students} teachers={context.teachers} classes={context.classes} sections={context.sections} groups={context.groups} studentLogins={context.studentLogins} />;
            case 'admission-settings': return <AdmissionSettingsManager settings={context.admissionSettings} setSettings={context.setAdmissionSettings} />;
            case 'testimonial-student': return <TestimonialStudent students={context.students} classes={context.classes} sections={context.sections} groups={context.groups} />;
            case 'testimonial-teacher': return <TestimonialTeacher teachers={context.teachers} />;
            case 'transfer-certificate': return <TransferCertificate students={context.students} classes={context.classes} sections={context.sections} groups={context.groups} />;
            case 'recommendation-letter': return <RecommendationLetter students={context.students} classes={context.classes} sections={context.sections} groups={context.groups} />;
            case 'admit-card': return <AdmitCard students={context.students} classes={context.classes} sections={context.sections} groups={context.groups} />;
            // Fix: Add the new payment settings component to the switch case.
            case 'payment-settings': return <PaymentSettingsManager settings={paymentSettings} setSettings={setPaymentSettings} onlineAdmissions={context.onlineAdmissions} setOnlineAdmissions={context.setOnlineAdmissions} classes={context.classes} />;
            default: return <DashboardOverview />;
        }
    };
    
    const sidebarContent = (
         <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                 <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-brand-primary">হরিপুর উচ্চ বিদ্যালয়</h2>
                        <h3 className="font-semibold text-gray-700">এডমিন প্যানেল</h3>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800">
                        <XIcon />
                    </button>
                </div>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                <SidebarItem icon={<DashboardIcon />} label="ওভারভিউ" page="overview" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                
                <SidebarDropdown label="ওয়েবসাইট" isOpen={openDropdowns.includes('ওয়েবসাইট')} onClick={() => toggleDropdown('ওয়েবসাইট')}>
                    <SidebarItem icon={<NewspaperIcon />} label="নোটিশ" page="notices" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<PhotographIcon />} label="গ্যালারি" page="gallery" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<PhotographIcon />} label="স্লাইডার" page="slider" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<UsersIcon />} label="কমিটি" page="committee" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<BookOpenIcon />} label="SSC ফলাফল" page="results-ssc" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                </SidebarDropdown>

                <SidebarDropdown label="একাডেমিক" isOpen={openDropdowns.includes('একাডেমিক')} onClick={() => toggleDropdown('একাডেমিক')}>
                    <SidebarItem icon={<AcademicCapIcon className="w-5 h-5"/>} label="ভর্তি আবেদন" page="online-admissions" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<AcademicCapIcon className="w-5 h-5"/>} label="নতুন শিক্ষার্থী" page="new-student" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} studentToEdit={studentToEdit} setStudentToEdit={setStudentToEdit} />
                    <SidebarItem icon={<UsersIcon />} label="সকল শিক্ষার্থী" page="all-students" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<BookOpenIcon />} label="ফলাফল এন্ট্রি" page="result-entry" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<CardIcon />} label="আইডি কার্ড (শিক্ষার্থী)" page="student-id-card" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<CogIcon />} label="ভর্তি ফরম সেটিংস" page="admission-settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    
                    <SidebarDropdown label="একাডেমিক সেটিংস" isOpen={openDropdowns.includes('একাডেমিক সেটিংস')} onClick={() => toggleDropdown('একাডেমিক সেটিংস')}>
                        <SidebarItem icon={<IdentificationIcon />} label="শ্রেণী" page="classes" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                        <SidebarItem icon={<IdentificationIcon />} label="শাখা" page="sections" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                        <SidebarItem icon={<IdentificationIcon />} label="বিভাগ" page="groups" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                        <SidebarItem icon={<BookOpenIcon />} label="বিষয়" page="subjects" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    </SidebarDropdown>
                </SidebarDropdown>

                <SidebarDropdown label="জনবল" isOpen={openDropdowns.includes('জনবল')} onClick={() => toggleDropdown('জনবল')}>
                    <SidebarItem icon={<UsersIcon />} label="শিক্ষক" page="teachers" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<UsersIcon />} label="কর্মচারী" page="staff" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<CardIcon />} label="আইডি কার্ড (জনবল)" page="staff-id-card" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                </SidebarDropdown>

                <SidebarDropdown label="জেনারেট" isOpen={openDropdowns.includes('জেনারেট')} onClick={() => toggleDropdown('জেনারেট')}>
                    <SidebarItem icon={<DocumentTextIcon className="w-5 h-5"/>} label="প্রত্যয়ন পত্র (শিক্ষার্থী)" page="testimonial-student" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<DocumentTextIcon className="w-5 h-5"/>} label="প্রত্যয়ন পত্র (শিক্ষক)" page="testimonial-teacher" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<DocumentTextIcon className="w-5 h-5"/>} label="ছাড়পত্র" page="transfer-certificate" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<DocumentTextIcon className="w-5 h-5"/>} label="প্রশংসা পত্র" page="recommendation-letter" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<DocumentTextIcon className="w-5 h-5"/>} label="প্রবেশ পত্র" page="admit-card" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                </SidebarDropdown>
                
                <SidebarDropdown label="সেটিংস" isOpen={openDropdowns.includes('সেটিংস')} onClick={() => toggleDropdown('সেটিংস')}>
                    <SidebarItem icon={<IdentificationIcon />} label="শিক্ষার্থী পরিসংখ্যান" page="student-stats" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<WalletIcon />} label="পেমেন্ট গেটওয়ে" page="payment-settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<CogIcon />} label="সাইট সেটিংস" page="settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<SmsIcon />} label="এসএমএস সেটিংস" page="sms-settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarDropdown label="ইউজার ম্যানেজমেন্ট" isOpen={openDropdowns.includes('ইউজার ম্যানেজমেন্ট')} onClick={() => toggleDropdown('ইউজার ম্যানেজমেন্ট')}>
                        <SidebarItem icon={<UsersIcon />} label="শিক্ষক লগইন" page="teacher-logins" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                        <SidebarItem icon={<UsersIcon />} label="শিক্ষার্থী লগইন" page="student-logins" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    </SidebarDropdown>
                </SidebarDropdown>
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
            {/* Overlay */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                {sidebarContent}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 mr-4">
                            <MenuIcon />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">{pageTitles[activePage]}</h1>
                    </div>
                    
                    {/* Admin Settings Button */}
                    <button 
                        onClick={() => setActivePage('admin-settings')}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary"
                        title="এডমিন সেটিংস"
                    >
                        <CogIcon className="w-5 h-5 text-gray-600" />
                        <span className="hidden md:block text-sm font-medium text-gray-700">এডমিন সেটিংস</span>
                    </button>
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

interface SidebarDropdownProps {
    label: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}
const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ label, children, isOpen, onClick }) => (
    <div className="px-2">
        <button onClick={onClick} className="w-full flex justify-between items-center py-2 text-xs font-semibold text-gray-500 uppercase hover:text-gray-700">
            <span>{label}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="pl-2 mt-1 space-y-1 border-l-2 border-gray-200">
                {children}
            </div>
        )}
    </div>
);


interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    page: AdminPage;
    activePage: AdminPage;
    setActivePage: (page: AdminPage) => void;
    setIsSidebarOpen: (isOpen: boolean) => void;
    studentToEdit?: Student | null;
    setStudentToEdit?: (student: Student | null) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, page, activePage, setActivePage, setIsSidebarOpen, studentToEdit, setStudentToEdit }) => {
    const isActive = activePage === page;
    
    const handleClick = () => {
        if (page !== 'new-student' && studentToEdit && setStudentToEdit) {
            setStudentToEdit(null);
        }
        setActivePage(page);
        setIsSidebarOpen(false);
    };

    return (
         <button 
            onClick={handleClick}
            className={`w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                ? 'bg-brand-secondary text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};


export default AdminDashboard;
