import React, { useState } from 'react';
import type { Notice, GalleryImage, AdhocCommitteeMember, Teacher, StaffMember, StudentStat, SscResult, OnlineAdmission, Student, Class, Group, Section, Subject, Result, StudentLogin, IDCardRequest, AdmissionSettings } from '../../types';

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
    | 'admit-card';


interface AdminDashboardProps {
    onLogout: () => void;
    notices: Notice[];
    setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
    galleryImages: GalleryImage[];
    setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
    sliderImages: GalleryImage[];
    setSliderImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
    adhocCommitteeMembers: AdhocCommitteeMember[];
    setAdhocCommitteeMembers: React.Dispatch<React.SetStateAction<AdhocCommitteeMember[]>>;
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    staff: StaffMember[];
    setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
    genderData: StudentStat[];
    setGenderData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    islamData: StudentStat[];
    setIslamData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    hinduData: StudentStat[];
    setHinduData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    sscResults: SscResult[];
    setSscResults: React.Dispatch<React.SetStateAction<SscResult[]>>;
    onlineAdmissions: OnlineAdmission[];
    setOnlineAdmissions: React.Dispatch<React.SetStateAction<OnlineAdmission[]>>;
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    classes: Class[];
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    sections: Section[];
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
    subjects: Subject[];
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
    results: Result[];
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
    studentLogins: StudentLogin[];
    setStudentLogins: React.Dispatch<React.SetStateAction<StudentLogin[]>>;
    idCardRequests: IDCardRequest[];
    setIdCardRequests: React.Dispatch<React.SetStateAction<IDCardRequest[]>>;
    admissionSettings: AdmissionSettings;
    setAdmissionSettings: React.Dispatch<React.SetStateAction<AdmissionSettings>>;
    logoUrl: string;
    setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
}


const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
    const [activePage, setActivePage] = useState<AdminPage>('overview');
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
    
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
            props.setStudents(props.students.map(s => s.id === student.id ? student : s));
        } else {
            props.setStudents([student, ...props.students]);
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
            case 'notices': return <NoticeManager notices={props.notices} setNotices={props.setNotices} />;
            case 'gallery': return <GalleryManager galleryImages={props.galleryImages} setGalleryImages={props.setGalleryImages} />;
            case 'slider': return <SliderManager sliderImages={props.sliderImages} setSliderImages={props.setSliderImages} />;
            case 'committee': return <CommitteeManager committeeMembers={props.adhocCommitteeMembers} setCommitteeMembers={props.setAdhocCommitteeMembers} />;
            case 'teachers': return <TeacherManager teachers={props.teachers} setTeachers={props.setTeachers} classes={props.classes} sections={props.sections} groups={props.groups} subjects={props.subjects} />;
            case 'staff': return <StaffManager staff={props.staff} setStaff={props.setStaff} />;
            case 'student-stats': return <StudentStatsManager genderData={props.genderData} setGenderData={props.setGenderData} islamData={props.islamData} setIslamData={props.setIslamData} hinduData={props.hinduData} setHinduData={props.setHinduData} />;
            case 'results-ssc': return <ResultsManager sscResults={props.sscResults} setSscResults={props.setSscResults} />;
            case 'online-admissions': return <OnlineAdmissionManager admissions={props.onlineAdmissions} setAdmissions={props.setOnlineAdmissions} students={props.students} setStudents={props.setStudents} classes={props.classes} groups={props.groups} sections={props.sections} studentLogins={props.studentLogins} setStudentLogins={props.setStudentLogins} />;
            case 'new-student': return <NewStudentManager onSave={handleSaveStudent} onCancel={handleCancelStudentForm} studentToEdit={studentToEdit} classes={props.classes} groups={props.groups} sections={props.sections} students={props.students} setStudentLogins={props.setStudentLogins} />;
            case 'all-students': return <AllStudentsManager students={props.students} setStudents={props.setStudents} onEditStudent={handleEditStudent} classes={props.classes} groups={props.groups} sections={props.sections} setStudentLogins={props.setStudentLogins} />;
            case 'classes': return <ClassManager classes={props.classes} setClasses={props.setClasses} />;
            case 'sections': return <SectionManager sections={props.sections} setSections={props.setSections} />;
            case 'groups': return <GroupManager groups={props.groups} setGroups={props.setGroups} />;
            case 'subjects': return <SubjectManager subjects={props.subjects} setSubjects={props.setSubjects} classes={props.classes} groups={props.groups} />;
            case 'result-entry': return <ResultEntryManager students={props.students} subjects={props.subjects} classes={props.classes} sections={props.sections} groups={props.groups} results={props.results} setResults={props.setResults} />;
            case 'student-id-card': return <IDCardManager students={props.students} classes={props.classes} sections={props.sections} groups={props.groups} idCardRequests={props.idCardRequests} setIdCardRequests={props.setIdCardRequests} />;
            case 'staff-id-card': return <StaffIdCardManager teachers={props.teachers} staff={props.staff} />;
            case 'settings': return <SiteSettingsManager logoUrl={props.logoUrl} setLogoUrl={props.setLogoUrl} />;
            case 'admin-settings': return <AdminSettingsManager />;
            case 'teacher-logins': return <TeacherLoginManager teachers={props.teachers} />;
            case 'student-logins': return <StudentLoginManager students={props.students} classes={props.classes} sections={props.sections} groups={props.groups} studentLogins={props.studentLogins} setStudentLogins={props.setStudentLogins} />;
            case 'sms-settings': return <SmsSettingsManager students={props.students} teachers={props.teachers} classes={props.classes} sections={props.sections} groups={props.groups} studentLogins={props.studentLogins} />;
            case 'admission-settings': return <AdmissionSettingsManager settings={props.admissionSettings} setSettings={props.setAdmissionSettings} />;
            case 'testimonial-student': return <TestimonialStudent students={props.students} classes={props.classes} sections={props.sections} groups={props.groups} />;
            case 'testimonial-teacher': return <TestimonialTeacher teachers={props.teachers} />;
            case 'transfer-certificate': return <TransferCertificate students={props.students} classes={props.classes} sections={props.sections} groups={props.groups} />;
            case 'recommendation-letter': return <RecommendationLetter students={props.students} classes={props.classes} sections={props.sections} groups={props.groups} />;
            case 'admit-card': return <AdmitCard students={props.students} classes={props.classes} sections={props.sections} groups={props.groups} />;
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
                    <SidebarItem icon={<CogIcon />} label="সাইট সেটিংস" page="settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarItem icon={<SmsIcon />} label="এসএমএস সেটিংস" page="sms-settings" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    <SidebarDropdown label="ইউজার ম্যানেজমেন্ট" isOpen={openDropdowns.includes('ইউজার ম্যানেজমেন্ট')} onClick={() => toggleDropdown('ইউজার ম্যানেজমেন্ট')}>
                        <SidebarItem icon={<UsersIcon />} label="শিক্ষক লগইন" page="teacher-logins" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                        <SidebarItem icon={<UsersIcon />} label="শিক্ষার্থী লগইন" page="student-logins" activePage={activePage} setActivePage={setActivePage} setIsSidebarOpen={setIsSidebarOpen} />
                    </SidebarDropdown>
                </SidebarDropdown>
            </nav>
             <div className="px-2 py-4 border-t">
                <button onClick={props.onLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900">
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