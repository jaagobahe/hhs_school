import type { 
    Notice, Teacher, GalleryImage, AdhocCommitteeMember, Class, StaffMember, SscResult, 
    StudentStat, OnlineAdmission, Student, Group, Section, Subject, Result, Mark, StudentLogin, IDCardRequest, AdmissionSettings 
} from './types';

export const mockClasses: Class[] = [
    { id: 6, name: 'ষষ্ঠ', numericName: 6 },
    { id: 7, name: 'সপ্তম', numericName: 7 },
    { id: 8, name: 'অষ্টম', numericName: 8 },
    { id: 9, name: 'নবম', numericName: 9 },
    { id: 10, name: 'দশম', numericName: 10 },
];

export const mockSections: Section[] = [
    { id: 1, name: 'ক' },
    { id: 2, name: 'খ' },
];

export const mockGroups: Group[] = [
    { id: 1, name: 'বিজ্ঞান' },
    { id: 2, name: 'মানবিক' },
];

export const mockTeachers: Teacher[] = [
    {
        id: 1,
        loginId: 'headmaster',
        password: 'password',
        name: 'মোঃ আব্দুল মোত্তালিব',
        designation: 'প্রধান শিক্ষক',
        imageUrl: 'https://picsum.photos/seed/teacher1/200/200',
        joiningDate: '2010-01-15',
        appointmentDate: '2009-12-20',
        education: 'এম.এ, বি.এড',
        email: 'headmaster@hhs.edu.bd',
        phone: '01712345678',
        bio: 'হরিপুর উচ্চ বিদ্যালয়ের প্রধান শিক্ষক হিসেবে আমি গর্বিত। আমরা শিক্ষার্থীদের সামগ্রিক বিকাশে প্রতিশ্রুতিবদ্ধ।',
        facebookUrl: 'https://facebook.com',
        whatsappNumber: '8801712345678',
        assignments: [
            { classId: 10, sectionId: 1, subjectId: 1 }, // দশম, ক, বাংলা
            { classId: 9, sectionId: 1, subjectId: 2 }, // নবম, ক, ইংরেজী
        ]
    },
    {
        id: 2,
        loginId: 'teacher2',
        password: 'password',
        name: 'মোছাঃ আফরোজা বেগম',
        designation: 'সহকারী প্রধান শিক্ষক',
        imageUrl: 'https://picsum.photos/seed/teacher2/200/200',
        joiningDate: '2012-05-20',
        appointmentDate: '2012-05-10',
        education: 'এম.এস.সি, বি.এড',
        email: 'afroza@hhs.edu.bd',
        phone: '01812345678',
        bio: 'শিক্ষকতা একটি মহৎ পেশা। আমি আমার ছাত্র-ছাত্রীদের মধ্যে জ্ঞানের আলো জ্বালিয়ে দিতে চাই।',
        assignments: [
            { classId: 10, sectionId: 1, subjectId: 4, groupId: 1 }, // দশম, ক, পদার্থবিজ্ঞান
            { classId: 9, sectionId: 1, subjectId: 5, groupId: 1 }, // নবম, ক, রসায়ন
        ]
    },
    {
        id: 3,
        loginId: 'teacher3',
        password: 'password',
        name: 'মোঃ রফিকুল ইসলাম',
        designation: 'সিনিয়র সহকারী শিক্ষক',
        imageUrl: 'https://picsum.photos/seed/teacher3/200/200',
        joiningDate: '2014-03-10',
        appointmentDate: '2014-03-01',
        education: 'বি.এ, বি.এড',
        email: 'rafiqul@hhs.edu.bd',
        phone: '01912345678',
        bio: 'ইতিহাস ও ঐতিহ্যের সঠিক জ্ঞান শিক্ষার্থীদের দেশপ্রেমে উদ্বুদ্ধ করে।',
        assignments: [
            { classId: 8, sectionId: 1, subjectId: 8 }, // অষ্টম, ক, বাংলাদেশ ও বিশ্বপরিচয়
        ]
    },
];

export const mockStaff: StaffMember[] = [
    { id: 1, name: 'মোঃ আব্দুর রহিম', designation: 'অফিস সহকারী', imageUrl: 'https://picsum.photos/seed/staff1/200/200', joiningDate: '2015-02-01' },
    { id: 2, name: 'শ্রী বিপ্লব কুমার', designation: 'ল্যাব সহকারী', imageUrl: 'https://picsum.photos/seed/staff2/200/200', joiningDate: '2018-07-11' },
    { id: 3, name: 'মোছাঃ রাশেদা খাতুন', designation: 'পরিচ্ছন্নতাকর্মী', imageUrl: 'https://picsum.photos/seed/staff3/200/200', joiningDate: '2019-11-23' },
];

export const mockStudents: Student[] = [
    { id: 1, studentId: '2024001', roll: 1, nameBn: 'আরিফুল ইসলাম', nameEn: 'ARIFUL ISLAM', dob: '2012-01-15', gender: 'male', religion: 'islam', photoUrl: 'https://picsum.photos/seed/student1/100/100', classId: 6, sectionId: 1, groupId: null, fatherNameBn: 'মোঃ শফিকুল ইসলাম', fatherPhone: '017xxxxxxxx', motherNameBn: 'মোছাঃ আমেনা বেগম', admissionDate: '2024-01-01', bloodGroup: 'O+' },
    { id: 2, studentId: '2024002', roll: 2, nameBn: 'সুমাইয়া আক্তার', nameEn: 'SUMAIYA AKTER', dob: '2012-03-22', gender: 'female', religion: 'islam', photoUrl: 'https://picsum.photos/seed/student2/100/100', classId: 6, sectionId: 1, groupId: null, fatherNameBn: 'মোঃ আব্দুল করিম', fatherPhone: '018xxxxxxxx', motherNameBn: 'মোছাঃ ফাতেমা খাতুন', admissionDate: '2024-01-01', bloodGroup: 'A+' },
    { id: 3, studentId: '2024003', roll: 1, nameBn: 'বিপ্লব চন্দ্র রায়', nameEn: 'BIPLAB CHANDRA ROY', dob: '2012-02-10', gender: 'male', religion: 'hindu', photoUrl: 'https://picsum.photos/seed/student3/100/100', classId: 6, sectionId: 2, groupId: null, fatherNameBn: 'শ্রী গোপাল চন্দ্র রায়', fatherPhone: '019xxxxxxxx', motherNameBn: 'শ্রী রাধা রানী', admissionDate: '2024-01-01' },
    { id: 4, studentId: '2024004', roll: 1, nameBn: 'ফারহানা ইয়াসমিন', nameEn: 'FARHANA YEASMIN', dob: '2009-05-18', gender: 'female', religion: 'islam', photoUrl: 'https://picsum.photos/seed/student4/100/100', classId: 9, sectionId: 1, groupId: 1, fatherNameBn: 'মোঃ নজরুল ইসলাম', fatherPhone: '015xxxxxxxx', motherNameBn: 'মোছাঃ সেলিনা বেগম', admissionDate: '2021-01-10' },
    { id: 5, studentId: '2024005', roll: 2, nameBn: 'রাজিব আহমেদ', nameEn: 'RAJIB AHMED', dob: '2009-07-01', gender: 'male', religion: 'islam', photoUrl: 'https://picsum.photos/seed/student5/100/100', classId: 9, sectionId: 1, groupId: 2, fatherNameBn: 'মোঃ আনোয়ার হোসেন', fatherPhone: '013xxxxxxxx', motherNameBn: 'মোছাঃ নাজমা বেগম', admissionDate: '2021-01-10', bloodGroup: 'B+' },
];

export const mockStudentLogins: StudentLogin[] = mockStudents.map(s => ({
    studentId: s.studentId,
    password: s.studentId, // Default password is student ID
    isActive: true,
}));

export const mockSubjects: Subject[] = [
    { id: 1, name: 'বাংলা', classId: 10, groupId: null },
    { id: 2, name: 'ইংরেজী', classId: 10, groupId: null },
    { id: 3, name: 'গণিত', classId: 10, groupId: null },
    { id: 4, name: 'পদার্থবিজ্ঞান', classId: 10, groupId: 1 },
    { id: 5, name: 'রসায়ন', classId: 10, groupId: 1 },
    { id: 6, name: 'জীববিজ্ঞান', classId: 10, groupId: 1 },
    { id: 7, name: 'ভূগোল ও পরিবেশ', classId: 10, groupId: 2 },
    { id: 8, name: 'বাংলাদেশ ও বিশ্বপরিচয়', classId: 8, groupId: null },
    { id: 9, name: 'ইসলাম ধর্ম', classId: 6, groupId: null },
    { id: 10, name: 'উচ্চতর গণিত', classId: 10, groupId: 1 },
    { id: 50, name: 'উচ্চতর গণিত', classId: 9, groupId: 1 },
];

export const mockResults: Result[] = [
    {
        id: 1, studentId: '2024004', exam: 'অর্ধ বার্ষিক', year: 2024,
        marks: [
            { subjectId: 1, cq: 50, mcq: 25 }, // বাংলা
            { subjectId: 2, cq: 60, mcq: 20 }, // ইংরেজী
            { subjectId: 3, cq: 70, mcq: 28 }, // গণিত
            { subjectId: 4, cq: 55, mcq: 22 }, // পদার্থবিজ্ঞান
        ]
    }
];

export const mockNotices: Notice[] = [
    { id: 1, date: '১০ জুন', title: 'ষান্মাসিক পরীক্ষার রুটিন প্রকাশ', details: 'সকল ছাত্র-ছাত্রীদের জানানো যাচ্ছে যে, আগামী ২০ জুন থেকে ষান্মাসিক পরীক্ষা শুরু হবে। রুটিন নোটিশ বোর্ডে দেওয়া হয়েছে।', isUrgent: true },
    { id: 2, date: '৫ জুন', title: 'পরিবেশ দিবস উপলক্ষে বৃক্ষরোপণ কর্মসূচী', details: 'বিশ্ব পরিবেশ দিবস উপলক্ষে আগামী ৭ জুন विद्यालय প্রাঙ্গণে বৃক্ষরোপণ কর্মসূচী আয়োজন করা হয়েছে।', },
    { id: 3, date: '১ জুন', title: 'বেতন পরিশোধের বিজ্ঞপ্তি', details: 'জুন মাসের বেতন পরিশোধের শেষ তারিখ ১৫ জুন।', fileName: 'fee_notice.pdf', fileUrl: '#' },
];

export const mockGalleryImages: GalleryImage[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/gallery1/500/300', caption: 'বার্ষিক ক্রীড়া প্রতিযোগিতা' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/gallery2/500/300', caption: 'সাংস্কৃতিক অনুষ্ঠান' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/gallery3/500/300', caption: 'বিজ্ঞান মেলা' },
    { id: 4, imageUrl: 'https://picsum.photos/seed/gallery4/500/300', caption: 'আন্তর্জাতিক মাতৃভাষা দিবস' },
];

export const mockSliderImages: GalleryImage[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/slider1/1200/500', caption: 'আমাদের বিদ্যালয় প্রাঙ্গণ' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/slider2/1200/500', caption: 'শিক্ষার্থীদের সমাবেশ' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/slider3/1200/500', caption: 'পাঠাগারে শিক্ষার্থীরা' },
];

export const mockAdhocCommitteeMembers: AdhocCommitteeMember[] = [
    { id: 1, name: 'জনাব মোঃ আবুল কালাম আজাদ', post: 'সভাপতি' },
    { id: 2, name: 'মোঃ আব্দুল মোত্তালিব', post: 'সদস্য সচিব' },
    { id: 3, name: 'জনাব মোঃ শফিকুল ইসলাম', post: 'অভিভাবক সদস্য' },
    { id: 4, name: 'মোছাঃ আফরোজা বেগম', post: 'শিক্ষক প্রতিনিধি' },
];

export const mockSscResults: SscResult[] = [
    { year: 2023, candidates: 120, passed: 115, passRate: 95.83, gpa5: 15 },
    { year: 2022, candidates: 110, passed: 108, passRate: 98.18, gpa5: 22 },
    { year: 2021, candidates: 130, passed: 125, passRate: 96.15, gpa5: 18 },
];

export const mockGenderData: StudentStat[] = [
    { class: 'ষষ্ঠ', section: 'ক', male: '৩০', female: '৩৫', total: '৬৫' },
    { class: 'ষষ্ঠ', section: 'খ', male: '২৮', female: '৩২', total: '৬০' },
    { class: 'সপ্তম', section: 'ক', male: '৩২', female: '৩০', total: '৬২' },
];

export const mockIslamData: StudentStat[] = [
    { class: 'ষষ্ঠ', male: '৫০', female: '৫২', total: '১০২' },
    { class: 'সপ্তম', male: '২৮', female: '২৭', total: '৫৫' },
];
export const mockHinduData: StudentStat[] = [
    { class: 'ষষ্ঠ', male: '৮', female: '১৫', total: '২৩' },
    { class: 'সপ্তম', male: '৪', female: '৩', total: '৭' },
];

export const mockOnlineAdmissions: OnlineAdmission[] = [
    {
        id: 1, status: 'pending', studentNameBn: 'নতুন শিক্ষার্থী', studentNameEn: 'NEW STUDENT', dob: '2013-01-01', birthCertNo: '12345678901234567',
        gender: 'male', religion: 'islam', admissionClassId: 6, fatherNameBn: 'পিতার নাম', fatherNameEn: 'FATHERS NAME', fatherNid: '12345', fatherPhone: '01700000000',
        motherNameBn: 'মাতার নাম', motherNameEn: 'MOTHERS NAME', motherNid: '54321', motherPhone: '01800000000', presentAddress: 'Present Address', permanentAddress: 'Permanent Address'
    },
    {
        id: 2, status: 'approved', studentNameBn: 'অনুমোদিত শিক্ষার্থী', studentNameEn: 'APPROVED STUDENT', dob: '2013-02-02', birthCertNo: '98765432109876543',
        gender: 'female', religion: 'hindu', admissionClassId: 6, fatherNameBn: 'পিতার নাম ২', fatherNameEn: 'FATHERS NAME 2', fatherNid: '123456', fatherPhone: '01700000001',
        motherNameBn: 'মাতার নাম ২', motherNameEn: 'MOTHERS NAME 2', motherNid: '654321', motherPhone: '01800000001', presentAddress: 'Present Address 2', permanentAddress: 'Permanent Address 2',
        paymentStatus: 'paid', paymentAmount: 250, paymentDate: '2024-07-15T12:30:00Z', paymentGateway: 'bKash', paymentTransactionId: 'TRX12345'
    },
];

export const mockIdCardRequests: IDCardRequest[] = [
    { id: 1, studentId: '2024001', requestDate: '2024-07-10', status: 'pending' },
    { id: 2, studentId: '2024002', requestDate: '2024-07-09', status: 'approved' },
];

export const mockAdmissionSettings: AdmissionSettings = {
    formEnabled: true,
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    unavailableMessage: 'ভর্তি কার্যক্রম সাময়িকভাবে বন্ধ আছে।',
};
