import React from 'react';
import type { 
    Notice, GalleryImage, AdhocCommitteeMember, Teacher, StaffMember, StudentStat, SscResult, 
    OnlineAdmission, Student, Class, Group, Section, Subject, Result, StudentLogin, IDCardRequest, AdmissionSettings
} from '../types';

export interface AppContextType {
    // State
    notices: Notice[];
    teachers: Teacher[];
    galleryImages: GalleryImage[];
    sliderImages: GalleryImage[];
    adhocCommitteeMembers: AdhocCommitteeMember[];
    classes: Class[];
    staff: StaffMember[];
    sscResults: SscResult[];
    genderData: StudentStat[];
    islamData: StudentStat[];
    hinduData: StudentStat[];
    onlineAdmissions: OnlineAdmission[];
    students: Student[];
    groups: Group[];
    sections: Section[];
    subjects: Subject[];
    results: Result[];
    studentLogins: StudentLogin[];
    idCardRequests: IDCardRequest[];
    admissionSettings: AdmissionSettings;
    logoUrl: string;
    
    // Setters
    setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
    setSliderImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
    setAdhocCommitteeMembers: React.Dispatch<React.SetStateAction<AdhocCommitteeMember[]>>;
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
    setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
    setSscResults: React.Dispatch<React.SetStateAction<SscResult[]>>;
    setGenderData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    setIslamData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    setHinduData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    setOnlineAdmissions: React.Dispatch<React.SetStateAction<OnlineAdmission[]>>;
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
    setStudentLogins: React.Dispatch<React.SetStateAction<StudentLogin[]>>;
    setIdCardRequests: React.Dispatch<React.SetStateAction<IDCardRequest[]>>;
    setAdmissionSettings: React.Dispatch<React.SetStateAction<AdmissionSettings>>;
    setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
    setSelectedNotice: React.Dispatch<React.SetStateAction<Notice | null>>;
}

export const AppContext = React.createContext<AppContextType | null>(null);
