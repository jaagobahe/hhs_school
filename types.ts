
import type { ReactNode } from 'react';

export type Page = 
  | 'home' 
  | 'about' 
  | 'student-statistics' 
  | 'teachers' 
  | 'staff' 
  | 'committee' 
  | 'admission' 
  | 'results' 
  | 'gallery' 
  | 'contact'
  | 'login'
  | 'login-selection'
  | 'dashboard'
  | 'student-dashboard'
  | 'teacher-dashboard'
  | 'notices';

export type LoginRole = 'teacher' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  role: LoginRole;
}

export interface Notice {
  id: number;
  date: string;
  title: string;
  details: string;
  isUrgent?: boolean;
  fileUrl?: string;
  fileName?: string;
}

export interface TeacherAssignment {
  classId: number;
  sectionId: number;
  subjectId: number;
  groupId?: number | null;
}

export interface Teacher {
  id: number;
  loginId?: string;
  password?: string;
  name: string;
  designation: string;
  imageUrl: string;
  joiningDate: string;
  appointmentDate: string;
  education: string;
  email: string;
  phone: string;
  bio: string;
  assignments?: TeacherAssignment[];
  facebookUrl?: string;
  whatsappNumber?: string;
}

export interface GalleryImage {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface AdhocCommitteeMember {
    id: number;
    name: string;
    post: string;
}

export interface Class {
    id: number;
    name: string;
    numericName: number;
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface OnlineAdmission {
    id: number;
    status: ApplicationStatus;
    studentNameBn: string;
    studentNameEn: string;
    dob: string;
    birthCertNo: string;
    gender: 'male' | 'female';
    religion: 'islam' | 'hindu' | 'buddhist' | 'christian';
    admissionClassId: number;
    studentPhotoUrl?: string;
    fatherNameBn: string;
    fatherNameEn: string;

    fatherNid: string;
    fatherPhone: string;
    motherNameBn: string;
    motherNameEn: string;
    motherNid: string;
    motherPhone: string;
    presentAddress: string;
    permanentAddress: string;
    prevSchool?: string;
    prevClass?: string;
    prevResult?: string;
    // Fix: Add optional payment fields used by payment-related components.
    paymentStatus?: 'pending' | 'paid' | 'failed';
    paymentGateway?: string;
    paymentTransactionId?: string;
    paymentDate?: string;
    paymentAmount?: number;
}

export interface StudentStat {
    class: string;
    section?: string;
    male?: string;
    female?: string;
    total?: string;
}

export interface StaffMember {
    id: number;
    name: string;
    designation: string;
    imageUrl: string;
    joiningDate: string;
}

export interface SscResult {
    year: number;
    candidates: number;
    passed: number;
    passRate: number;
    gpa5: number;
}

export interface Student {
    id: number;
    studentId: string;
    roll: number;
    nameBn: string;
    nameEn: string;
    dob: string;
    gender: 'male' | 'female';
    religion: 'islam' | 'hindu' | 'buddhist' | 'christian';
    photoUrl: string;
    classId: number;
    sectionId: number;
    groupId: number | null;
    fatherNameBn: string;
    fatherPhone: string;
    motherNameBn: string;
    admissionDate: string;
    bloodGroup?: string;
}

export interface Group {
    id: number;
    name: string;
}

export interface Section {
    id: number;
    name: string;
}

export interface Subject {
    id: number;
    name: string;
    classId: number;
    groupId: number | null;
}

export interface Mark {
    subjectId: number;
    cq: number;
    mcq: number;
}

export interface Result {
    id: number;
    studentId: string;
    exam: string;
    year: number;
    marks: Mark[];
    isOptional?: (subjectId: number) => boolean;
}

export interface StudentLogin {
    studentId: string;
    password?: string;
    isActive: boolean;
}

export interface IDCardRequest {
  id: number;
  studentId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Fix: Add missing PaymentSettings type.
export interface PaymentSettings {
  admissionFee: number;
  bKash: {
    enabled: boolean;
    sandboxMode: boolean;
    merchantNumber: string | null;
    username: string | null;
    appKey: string | null;
    appSecret: string | null;
    password: string | null;
  };
}

export interface AdmissionSettings {
  formEnabled: boolean;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  unavailableMessage: string;
}