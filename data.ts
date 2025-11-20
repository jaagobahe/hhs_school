import type { Notice, Teacher, GalleryImage, AdhocCommitteeMember, Class, OnlineAdmission, StudentStat, StaffMember, SscResult, Student, Group, Section, Subject, Result, StudentLogin, IDCardRequest, AdmissionSettings, PaymentSettings } from './types';

export const initialNotices: Notice[] = [
  { id: 1, date: '২৬ জুন', title: '২০২৫ সালের এসএসসি পরীক্ষার ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি।', details: 'এতদ্বারা হরিপুর উচ্চ বিদ্যালয়ের ২০২৫ সালের এসএসসি পরীক্ষায় অংশগ্রহণেচ্ছুক সকল ছাত্র-ছাত্রীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ০১/০৭/২০২৪ ইং তারিখ থেকে ১৫/০৭/২০২৪ তারিখ পর্যন্ত বিলম্ব ফি ছাড়া ফরম পূরণ চলবে।', isUrgent: true, fileUrl: '#', fileName: 'ssc_form_fillup_2025.pdf' },
  { id: 2, date: '২০ জুন', title: 'ষান্মাসিক পরীক্ষার ফলাফল প্রকাশ ও অভিভাবক সমাবেশ।', details: 'আগামী ২৫/০৬/২০২৪ তারিখ রোজ মঙ্গলবার সকাল ১০ ঘটিকায় ষান্মাসিক পরীক্ষার ফলাফল প্রকাশ করা হবে এবং একটি অভিভাবক সমাবেশ অনুষ্ঠিত হবে। সকল অভিভাবককে উপস্থিত থাকার জন্য অনুরোধ করা হলো।' },
  { id: 3, date: '১৫ জুন', title: 'ঈদুল আযহা উপলক্ষে বিদ্যালয়ের ছুটি।', details: 'পবিত্র ঈদুল আযহা উপলক্ষে আগামী ১৬/০৬/২০২৪ ইং তারিখ থেকে ২০/০৬/২০২৪ ইং তারিখ পর্যন্ত বিদ্যালয়ের সকল কার্যক্রম বন্ধ থাকবে।' },
  { id: 4, date: '১০ জুন', title: 'বৃক্ষরোপণ কর্মসূচি ২০২৪।', details: 'পরিবেশের ভারসাম্য রক্ষায় আগামী ১২/০৬/২০২৪ তারিখে বিদ্যালয়ে বৃক্ষরোপণ কর্মসূচি গ্রহণ করা হয়েছে। সকল শিক্ষার্থীকে অংশগ্রহণের জন্য বলা হলো।' },
];

export const initialTeachers: Teacher[] = [
  { id: 1, loginId: 'hm', password: 'hm', name: 'মোঃ আব্দুল মোত্তালেব', designation: 'প্রধান শিক্ষক', imageUrl: 'https://picsum.photos/seed/teacher1/200/200', joiningDate: '২০০৮-০৭-১৫', appointmentDate: '২০০৮-০৭-১৫', education: 'বি.এস.সি, বি.এড', email: 'hm@hhs.edu.bd', phone: '01712345678', bio: 'হরিপুর উচ্চ বিদ্যালয়ের প্রধান শিক্ষক হিসেবে কর্মরত আছি। শিক্ষার মানোন্নয়নে সর্বদা সচেষ্ট।', assignments: [], facebookUrl: '#', whatsappNumber: '8801712345678' },
  { id: 2, loginId: 'teacher2', password: 'teacher2', name: 'মোছাঃ আফরুজা বেগম', designation: 'সহকারী প্রধান শিক্ষক', imageUrl: 'https://picsum.photos/seed/teacher2/200/200', joiningDate: '২০১০-০৫-২০', appointmentDate: '২০১০-০৫-২০', education: 'এম.এ, বি.এড', email: 'afruza@hhs.edu.bd', phone: '01812345678', bio: 'শিক্ষার্থীদের মাঝে জ্ঞানের আলো ছড়ানোই আমার মূল লক্ষ্য।', assignments: [], facebookUrl: '#', whatsappNumber: '8801812345678' },
  { id: 3, loginId: 'teacher3', password: 'teacher3', name: 'মোঃ রফিকুল ইসলাম', designation: 'সহকারী শিক্ষক (গণিত)', imageUrl: 'https://picsum.photos/seed/teacher3/200/200', joiningDate: '২০১২-০৩-০১', appointmentDate: '২০১২-০৩-০১', education: 'এম.এস.সি (গণিত)', email: 'rafiqul@hhs.edu.bd', phone: '01912345678', bio: 'গণিতের ভয়কে জয় করতে শিক্ষার্থীদের সহায়তা করি।', assignments: [], facebookUrl: '#', whatsappNumber: '8801912345678' },
  { id: 4, loginId: 'teacher4', password: 'teacher4', name: 'মোছাঃ শাহানাজ পারভীন', designation: 'সহকারী শিক্ষক (ইংরেজি)', imageUrl: 'https://picsum.photos/seed/teacher4/200/200', joiningDate: '২০১৩-১১-১০', appointmentDate: '২০১৩-১১-১০', education: 'এম.এ (ইংরেজি)', email: 'shahanaj@hhs.edu.bd', phone: '01512345678', bio: 'ইংরেজি ভাষার প্রতি শিক্ষার্থীদের আগ্রহী করে তোলাই আমার প্রধান কাজ।', assignments: [], facebookUrl: '#', whatsappNumber: '8801512345678' },
  { id: 5, loginId: 'teacher5', password: 'teacher5', name: 'মোঃ আবু তাহের', designation: 'সহকারী শিক্ষক (বিজ্ঞান)', imageUrl: 'https://picsum.photos/seed/teacher5/200/200', joiningDate: '২০১৪-০২-২৫', appointmentDate: '২০১৪-০২-২৫', education: 'বি.এস.সি', email: 'taher@hhs.edu.bd', phone: '01612345678', bio: 'বিজ্ঞানের জটিল বিষয়গুলো সহজভাবে উপস্থাপন করাই আমার প্রচেষ্টা।', assignments: [], facebookUrl: '#', whatsappNumber: '8801612345678' },
];

export const initialGalleryImages: GalleryImage[] = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/gallery1/500/300', caption: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৪' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/gallery2/500/300', caption: 'আন্তর্জাতিক মাতৃভাষা দিবস উদযাপন' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/gallery3/500/300', caption: 'বিজ্ঞান মেলা ২০২৩' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/gallery4/500/300', caption: 'নবীন বরণ অনুষ্ঠান' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/gallery5/500/300', caption: 'বিদ্যালয় ভবন' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/gallery6/500/300', caption: 'সাংস্কৃতিক অনুষ্ঠান' },
];

export const initialSliderImages: GalleryImage[] = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/slide1/1200/500', caption: 'ঐতিহ্যবাহী হরিপুর উচ্চ বিদ্যালয়' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/slide2/1200/500', caption: 'শিক্ষার্থীদের অ্যাসেম্বলি' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/slide3/1200/500', caption: 'আমাদের সবুজ ক্যাম্পাস' },
];

export const initialAdhocCommitteeMembers: AdhocCommitteeMember[] = [
  { id: 1, name: 'জনাব মোঃ আব্দুল লতিফ', post: 'সভাপতি' },
  { id: 2, name: 'মোঃ আব্দুল মোত্তালেব', post: 'সদস্য সচিব' },
  { id: 3, name: 'জনাব মোঃ রফিকুল ইসলাম', post: 'অভিভাবক সদস্য' },
  { id: 4, name: 'মোছাঃ আফরুজা বেগম', post: 'শিক্ষক প্রতিনিধি' },
];

export const initialStaff: StaffMember[] = [
    { id: 1, name: 'মোঃ আনোয়ার হোসেন', designation: 'অফিস সহকারী', imageUrl: 'https://picsum.photos/seed/staff1/200/200', joiningDate: '২০১৫-০১-০১' },
    { id: 2, name: 'শ্রী বিপ্লব কুমার', designation: 'ল্যাব সহকারী', imageUrl: 'https://picsum.photos/seed/staff2/200/200', joiningDate: '২০১৮-০৫-১০' },
    { id: 3, name: 'মোঃ সোলেমান মিয়া', designation: 'নৈশ প্রহরী', imageUrl: 'https://picsum.photos/seed/staff3/200/200', joiningDate: '২০২০-১১-২০' },
];

export const initialSscResults: SscResult[] = [
    { year: 2024, candidates: 120, passed: 115, passRate: 95.83, gpa5: 15 },
    { year: 2023, candidates: 110, passed: 108, passRate: 98.18, gpa5: 20 },
    { year: 2022, candidates: 125, passed: 120, passRate: 96.00, gpa5: 18 },
];

export const initialGenderData: StudentStat[] = [
    { class: 'ষষ্ঠ', section: 'ক', male: '৩০', female: '৩৫', total: '৬৫' },
    { class: 'সপ্তম', section: 'ক', male: '২৮', female: '৩২', total: '৬০' },
    { class: 'অষ্টম', section: 'ক', male: '২৫', female: '৩০', total: '৫৫' },
    { class: 'নবম', section: 'বিজ্ঞান', male: '২০', female: '২২', total: '৪২' },
    { class: 'দশম', section: 'বিজ্ঞান', male: '১৮', female: '২০', total: '৩৮' },
];
export const initialIslamData: StudentStat[] = [...initialGenderData];
export const initialHinduData: StudentStat[] = [...initialGenderData];

export const initialClasses: Class[] = [
    { id: 6, name: 'ষষ্ঠ', numericName: 6 },
    { id: 7, name: 'সপ্তম', numericName: 7 },
    { id: 8, name: 'অষ্টম', numericName: 8 },
    { id: 9, name: 'নবম', numericName: 9 },
    { id: 10, name: 'দশম', numericName: 10 },
];
export const initialSections: Section[] = [
    { id: 1, name: 'ক' },
    { id: 2, name: 'খ' },
];
export const initialGroups: Group[] = [
    { id: 1, name: 'বিজ্ঞান' },
    { id: 2, name: 'মানবিক' },
];
export const initialSubjects: Subject[] = [
    // Class 6
    { id: 1, name: 'বাংলা', classId: 6, groupId: null },
    { id: 2, name: 'ইংরেজি', classId: 6, groupId: null },
    { id: 3, name: 'গণিত', classId: 6, groupId: null },
    { id: 4, name: 'বিজ্ঞান', classId: 6, groupId: null },
    { id: 5, name: 'বাংলাদেশ ও বিশ্বপরিচয়', classId: 6, groupId: null },
    { id: 6, name: 'ইসলাম ধর্ম', classId: 6, groupId: null },
    { id: 7, name: 'হিন্দু ধর্ম', classId: 6, groupId: null },
    { id: 8, name: 'তথ্য ও যোগাযোগ প্রযুক্তি', classId: 6, groupId: null },
    { id: 9, name: 'কৃষি শিক্ষা', classId: 6, groupId: null },

    // Class 7 (Adding similar structure for completeness if needed, focusing on 6,9,10 for now)
    { id: 71, name: 'বাংলা', classId: 7, groupId: null },
    { id: 72, name: 'ইংরেজি', classId: 7, groupId: null },
    { id: 73, name: 'গণিত', classId: 7, groupId: null },
    { id: 74, name: 'বিজ্ঞান', classId: 7, groupId: null },
    { id: 75, name: 'বাংলাদেশ ও বিশ্বপরিচয়', classId: 7, groupId: null },
    { id: 76, name: 'ইসলাম ধর্ম', classId: 7, groupId: null },
    { id: 77, name: 'হিন্দু ধর্ম', classId: 7, groupId: null },
    { id: 78, name: 'তথ্য ও যোগাযোগ প্রযুক্তি', classId: 7, groupId: null },

    // Class 9
    { id: 11, name: 'বাংলা', classId: 9, groupId: null },
    { id: 12, name: 'ইংরেজি', classId: 9, groupId: null },
    { id: 13, name: 'গণিত', classId: 9, groupId: null },
    { id: 91, name: 'ইসলাম ধর্ম', classId: 9, groupId: null },
    { id: 92, name: 'হিন্দু ধর্ম', classId: 9, groupId: null },
    { id: 93, name: 'তথ্য ও যোগাযোগ প্রযুক্তি', classId: 9, groupId: null },
    { id: 14, name: 'পদার্থবিজ্ঞান', classId: 9, groupId: 1 }, // Science
    { id: 15, name: 'রসায়ন', classId: 9, groupId: 1 }, // Science
    { id: 16, name: 'জীববিজ্ঞান', classId: 9, groupId: 1 }, // Science
    { id: 50, name: 'উচ্চতর গণিত', classId: 9, groupId: 1 }, // Science
    { id: 17, name: 'ইতিহাস', classId: 9, groupId: 2 }, // Humanities
    { id: 94, name: 'ভূগোল', classId: 9, groupId: 2 }, // Humanities
    { id: 95, name: 'পৌরনীতি', classId: 9, groupId: 2 }, // Humanities
    { id: 96, name: 'বিজ্ঞান (মানবিক)', classId: 9, groupId: 2 }, // Humanities - General Science

    // Class 10
    { id: 21, name: 'বাংলা', classId: 10, groupId: null },
    { id: 22, name: 'ইংরেজি', classId: 10, groupId: null },
    { id: 23, name: 'গণিত', classId: 10, groupId: null },
    { id: 101, name: 'ইসলাম ধর্ম', classId: 10, groupId: null },
    { id: 102, name: 'হিন্দু ধর্ম', classId: 10, groupId: null },
    { id: 103, name: 'তথ্য ও যোগাযোগ প্রযুক্তি', classId: 10, groupId: null },
    { id: 24, name: 'পদার্থবিজ্ঞান', classId: 10, groupId: 1 },
    { id: 25, name: 'রসায়ন', classId: 10, groupId: 1 },
    { id: 26, name: 'জীববিজ্ঞান', classId: 10, groupId: 1 },
    { id: 10, name: 'উচ্চতর গণিত', classId: 10, groupId: 1 },
    { id: 104, name: 'ইতিহাস', classId: 10, groupId: 2 },
    { id: 105, name: 'ভূগোল', classId: 10, groupId: 2 },
    { id: 106, name: 'পৌরনীতি', classId: 10, groupId: 2 },
    { id: 107, name: 'বিজ্ঞান (মানবিক)', classId: 10, groupId: 2 },
];

export const initialStudents: Student[] = [
    { id: 1, studentId: '2024001', roll: 1, nameBn: 'আরিফ হোসেন', nameEn: 'ARIF HOSSAIN', dob: '2012-01-15', gender: 'male', religion: 'islam', photoUrl: 'https://picsum.photos/seed/student1/100/100', classId: 6, sectionId: 1, groupId: null, fatherNameBn: 'মোঃ রহমান আলী', fatherPhone: '01711111111', motherNameBn: 'মোছাঃ আমেনা বেগম', admissionDate: '2024-01-01', bloodGroup: 'O+' },
    { id: 2, studentId: '2024002', roll: 2, nameBn: 'সুমি আক্তার', nameEn: 'SUMI AKTER', dob: '2012-03-20', gender: 'female', religion: 'islam', photoUrl: 'https://picsum.photos/seed/student2/100/100', classId: 6, sectionId: 1, groupId: null, fatherNameBn: 'মোঃ করিম শেখ', fatherPhone: '01722222222', motherNameBn: 'মোছাঃ ফাতেমা বেগম', admissionDate: '2024-01-01', bloodGroup: 'A+' },
];

export const initialOnlineAdmissions: OnlineAdmission[] = [
    { id: 1, status: 'pending', studentNameBn: 'জাহিদ হাসান', studentNameEn: 'JAHID HASAN', dob: '2013-02-10', birthCertNo: '20131234567890123', gender: 'male', religion: 'islam', admissionClassId: 6, fatherNameBn: 'মোঃ ফারুক মিয়া', fatherNameEn: 'MD FARUK MIA', fatherNid: '1980123456789', fatherPhone: '01987654321', motherNameBn: 'মোছাঃ হাসিনা বেগম', motherNameEn: 'MOSA HASINA BEGUM', motherNid: '1985123456789', motherPhone: '01987654322', presentAddress: 'গ্রাম: হরিপুর', permanentAddress: 'গ্রাম: হরিপুর' },
    { id: 2, status: 'approved', studentNameBn: 'রিয়া মনি', studentNameEn: 'RIYA MONI', dob: '2013-04-15', birthCertNo: '20139876543210987', gender: 'female', religion: 'hindu', admissionClassId: 6, fatherNameBn: 'শ্রী নির্মল চন্দ্র', fatherNameEn: 'SRI NIRMAL CHANDRA', fatherNid: '1978123456789', fatherPhone: '01887654321', motherNameBn: 'শ্রীमति আরতি রানী', motherNameEn: 'SMT ARATI RANI', motherNid: '1983123456789', motherPhone: '01887654322', presentAddress: 'গ্রাম: হরিপুর', permanentAddress: 'গ্রাম: হরিপুর' },
];

export const initialResults: Result[] = [];
export const initialStudentLogins: StudentLogin[] = initialStudents.map(s => ({
    studentId: s.studentId,
    password: s.studentId,
    isActive: true,
}));

export const initialIdCardRequests: IDCardRequest[] = [
    { id: 1, studentId: '2024002', requestDate: '2024-06-20', status: 'pending' },
];

export const initialAdmissionSettings: AdmissionSettings = {
  formEnabled: true,
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  unavailableMessage: 'ভর্তি কার্যক্রম শীঘ্রই শুরু হবে।',
};

export const initialPaymentSettings: PaymentSettings = {
  admissionFee: 250,
  bKash: {
    enabled: true,
    sandboxMode: true,
    merchantNumber: "017xxxxxxxx",
    username: null,
    appKey: null,
    appSecret: null,
    password: null,
  }
};
