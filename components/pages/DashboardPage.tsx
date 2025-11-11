import React from 'react';
import type { Notice, GalleryImage, AdhocCommitteeMember, Teacher, StaffMember, StudentStat, SscResult, OnlineAdmission, Student, Class, Group, Section, Subject, Result, StudentLogin, IDCardRequest, AdmissionSettings } from '../../types';
import AdminDashboard from '../admin/AdminDashboard';

interface DashboardPageProps {
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

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminDashboard {...props} />
        </div>
    );
};

export default DashboardPage;