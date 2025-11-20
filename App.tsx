import React, { useState, useEffect } from 'react';
import type { Page, LoginRole, User, Notice, Teacher, GalleryImage, AdhocCommitteeMember, Class, OnlineAdmission, StudentStat, StaffMember, SscResult, Student, Group, Section, Subject, Result, StudentLogin, IDCardRequest, AdmissionSettings, PaymentSettings } from './types';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsTicker from './components/NewsTicker';
import NoticeModal from './components/NoticeModal';
import TeacherDetailsModal from './components/TeacherDetailsModal';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import CommitteePage from './components/pages/CommitteePage';
import ResultsPage from './components/pages/ResultsPage';
import GalleryPage from './components/pages/GalleryPage';
import AdmissionPage from './components/pages/AdmissionPage';
import ContactPage from './components/pages/ContactPage';
import LoginPage from './components/pages/LoginPage';
import LoginSelectionPage from './components/pages/LoginSelectionPage';
import DashboardPage from './components/pages/DashboardPage';
import TeachersPage from './components/pages/TeachersPage';
import StudentStatisticsPage from './components/pages/StudentStatisticsPage';
import StaffPage from './components/pages/StaffPage';
import NoticesPage from './components/pages/NoticesPage';
import StudentDashboardPage from './components/student/StudentDashboardPage';
import TeacherDashboardPage from './components/teacher/TeacherDashboardPage';
import { AppContext, AppContextType } from './components/AppContext';
import { 
    initialNotices, initialTeachers, initialGalleryImages, initialSliderImages, 
    initialAdhocCommitteeMembers, initialClasses, initialStaff, initialSscResults,
    initialGenderData, initialIslamData, initialHinduData, initialOnlineAdmissions,
    initialStudents, initialGroups, initialSections, initialSubjects, initialResults,
    initialStudentLogins, initialIdCardRequests, initialAdmissionSettings, initialPaymentSettings
} from './data';


const App: React.FC = () => {
    // State for page navigation
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [loginRole, setLoginRole] = useState<LoginRole | null>(null);

    // State for user session
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    // Modal states
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    // Site settings state
    const [logoUrl, setLogoUrl] = useState('https://picsum.photos/seed/schoollogo/60/60');

    // Application data states initialized with mock data
    const [notices, setNotices] = useState<Notice[]>(initialNotices);
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
    const [sliderImages, setSliderImages] = useState<GalleryImage[]>(initialSliderImages);
    const [adhocCommitteeMembers, setAdhocCommitteeMembers] = useState<AdhocCommitteeMember[]>(initialAdhocCommitteeMembers);
    const [classes, setClasses] = useState<Class[]>(initialClasses);
    const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
    const [sscResults, setSscResults] = useState<SscResult[]>(initialSscResults);
    const [genderData, setGenderData] = useState<StudentStat[]>(initialGenderData);
    const [islamData, setIslamData] = useState<StudentStat[]>(initialIslamData);
    const [hinduData, setHinduData] = useState<StudentStat[]>(initialHinduData);
    const [onlineAdmissions, setOnlineAdmissions] = useState<OnlineAdmission[]>(initialOnlineAdmissions);
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [groups, setGroups] = useState<Group[]>(initialGroups);
    const [sections, setSections] = useState<Section[]>(initialSections);
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [results, setResults] = useState<Result[]>(initialResults);
    const [studentLogins, setStudentLogins] = useState<StudentLogin[]>(initialStudentLogins);
    const [idCardRequests, setIdCardRequests] = useState<IDCardRequest[]>(initialIdCardRequests);
    const [admissionSettings, setAdmissionSettings] = useState<AdmissionSettings>(initialAdmissionSettings);
    const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(initialPaymentSettings);


    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);
    
    const handleLoginRequest = (role: LoginRole) => {
        setLoginRole(role);
        setCurrentPage('login');
    };

    const handleLoginSuccess = (user: User) => {
        setLoggedInUser(user);
        if (user.role === 'admin') {
            setCurrentPage('dashboard');
        } else if (user.role === 'student') {
            setCurrentPage('student-dashboard');
        } else if (user.role === 'teacher') {
            setCurrentPage('teacher-dashboard');
        } else {
            setCurrentPage('home');
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setCurrentPage('home');
    };
    
    const contextValue: AppContextType = {
        notices, setNotices,
        teachers, setTeachers,
        galleryImages, setGalleryImages,
        sliderImages, setSliderImages,
        adhocCommitteeMembers, setAdhocCommitteeMembers,
        classes, setClasses,
        staff, setStaff,
        sscResults, setSscResults,
        genderData, setGenderData,
        islamData, setIslamData,
        hinduData, setHinduData,
        onlineAdmissions, setOnlineAdmissions,
        students, setStudents,
        groups, setGroups,
        sections, setSections,
        subjects, setSubjects,
        results, setResults,
        studentLogins, setStudentLogins,
        idCardRequests, setIdCardRequests,
        admissionSettings, setAdmissionSettings,
        paymentSettings, setPaymentSettings,
        logoUrl, setLogoUrl,
        setSelectedNotice
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={setCurrentPage} onTeacherDetailsClick={setSelectedTeacher} notices={notices} teachers={teachers} sliderImages={sliderImages} />;
            case 'about':
                return <AboutPage />;
            case 'student-statistics':
                return <StudentStatisticsPage genderData={genderData} islamData={islamData} hinduData={hinduData} />;
            case 'teachers':
                return <TeachersPage onTeacherDetailsClick={setSelectedTeacher} teachers={teachers} />;
            case 'staff':
                return <StaffPage staff={staff} />;
            case 'committee':
                return <CommitteePage adhocCommitteeMembers={adhocCommitteeMembers} />;
            case 'notices':
                return <NoticesPage notices={notices} onNoticeClick={setSelectedNotice} />;
            case 'admission':
                return <AdmissionPage classes={classes} setOnlineAdmissions={setOnlineAdmissions} admissionSettings={admissionSettings} paymentSettings={paymentSettings} />;
            case 'results':
                return <ResultsPage sscResults={sscResults} results={results} students={students} subjects={subjects} classes={classes} />;
            case 'gallery':
                return <GalleryPage images={galleryImages} />;
            case 'contact':
                return <ContactPage />;
            case 'login-selection':
                return <LoginSelectionPage onLoginRequest={handleLoginRequest} />;
            case 'login':
                return loginRole ? <LoginPage role={loginRole} onLoginSuccess={handleLoginSuccess} logoUrl={logoUrl} studentLogins={studentLogins} students={students} teachers={teachers} /> : <HomePage onNavigate={setCurrentPage} onTeacherDetailsClick={setSelectedTeacher} notices={notices} teachers={teachers} sliderImages={sliderImages}/>;
            default:
                return <HomePage onNavigate={setCurrentPage} onTeacherDetailsClick={setSelectedTeacher} notices={notices} teachers={teachers} sliderImages={sliderImages}/>;
        }
    };

    if (currentPage === 'dashboard' && loggedInUser?.role === 'admin') {
        return (
            <AppContext.Provider value={contextValue}>
                <DashboardPage onLogout={handleLogout} />
            </AppContext.Provider>
        );
    }
    
    if (currentPage === 'student-dashboard' && loggedInUser?.role === 'student') {
        return (
             <AppContext.Provider value={contextValue}>
                <StudentDashboardPage
                    loggedInUser={loggedInUser}
                    onLogout={handleLogout}
                />
            </AppContext.Provider>
        );
    }

    if (currentPage === 'teacher-dashboard' && loggedInUser?.role === 'teacher') {
        return (
            <AppContext.Provider value={contextValue}>
                <TeacherDashboardPage
                    loggedInUser={loggedInUser}
                    onLogout={handleLogout}
                />
            </AppContext.Provider>
        );
    }


    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <Header 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                loggedInUser={loggedInUser}
                onLogout={handleLogout}
                logoUrl={logoUrl}
            />
            {currentPage === 'home' && <NewsTicker notices={notices} onNoticeClick={setSelectedNotice} />}
            <main className="flex-grow animate-page-fade-in" key={currentPage}>
                {renderPage()}
            </main>
            <Footer />

            {selectedNotice && <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />}
            {selectedTeacher && <TeacherDetailsModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />}
        </div>
    );
};

export default App;
