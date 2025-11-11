import React, { useState, useMemo } from 'react';
import type { OnlineAdmission, ApplicationStatus, Student, Class, Group, Section, StudentLogin } from '../../types';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import AdmissionDetailsForm from './AdmissionDetailsForm';
import EyeIcon from '../icons/EyeIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';
import TrashIcon from '../icons/TrashIcon';

interface OnlineAdmissionManagerProps {
    admissions: OnlineAdmission[];
    setAdmissions: React.Dispatch<React.SetStateAction<OnlineAdmission[]>>;
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    classes: Class[];
    groups: Group[];
    sections: Section[];
    studentLogins: StudentLogin[];
    setStudentLogins: React.Dispatch<React.SetStateAction<StudentLogin[]>>;
}

const OnlineAdmissionManager: React.FC<OnlineAdmissionManagerProps> = ({ admissions, setAdmissions, students, setStudents, classes, groups, sections, studentLogins, setStudentLogins }) => {
    const [activeTab, setActiveTab] = useState<ApplicationStatus>('pending');
    const [selectedApp, setSelectedApp] = useState<OnlineAdmission | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dialog, setDialog] = useState<{ type: 'approve' | 'reject' | 'delete'; admission: OnlineAdmission } | null>(null);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);

    const filteredAdmissions = useMemo(() => {
        return admissions.filter(app => app.status === activeTab);
    }, [admissions, activeTab]);

    const handleViewEdit = (admission: OnlineAdmission) => {
        setSelectedApp(admission);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedApp(null);
        setIsModalOpen(false);
    };

    const handleSave = (updatedApp: OnlineAdmission) => {
        setAdmissions(admissions.map(app => app.id === updatedApp.id ? updatedApp : app));
        handleCloseModal();
    };
    
    const handleConfirmAction = () => {
        if (!dialog) return;

        const { type, admission } = dialog;

        if (type === 'approve') {
            // 1. Update admission status
            const updatedAdmissions = admissions.map(app => 
                app.id === admission.id ? { ...app, status: 'approved' as ApplicationStatus } : app
            );
            setAdmissions(updatedAdmissions);

            // 2. Create new student record
            const year = new Date().getFullYear();
            const studentsThisYear = students.filter(s => s.studentId.startsWith(String(year))).length;
            
            const newStudent: Student = {
                id: Date.now(),
                studentId: `${year}${(studentsThisYear + 1).toString().padStart(3, '0')}`,
                roll: 0, // Admin should set this later
                nameBn: admission.studentNameBn,
                nameEn: admission.studentNameEn,
                dob: admission.dob,
                gender: admission.gender,
                religion: admission.religion,
                photoUrl: admission.studentPhotoUrl || `https://picsum.photos/seed/student${Date.now()}/100/100`,
                classId: admission.admissionClassId,
                sectionId: sections.find(s => s.name === 'ক')?.id || sections[0].id, // Default to section 'ক' or first available
                groupId: null, // Default to no group
                fatherNameBn: admission.fatherNameBn,
                fatherPhone: admission.fatherPhone,
                motherNameBn: admission.motherNameBn,
                admissionDate: new Date().toISOString().slice(0, 10),
            };
            setStudents(prev => [newStudent, ...prev]);

            // 3. Create new student login
            const newLogin: StudentLogin = {
                studentId: newStudent.studentId,
                password: newStudent.studentId, // Default password is student ID
                isActive: true,
            };
            setStudentLogins(prev => [newLogin, ...prev]);

        } else if (type === 'reject') {
            setAdmissions(admissions.map(app => app.id === admission.id ? { ...app, status: 'rejected' as ApplicationStatus } : app));
        } else if (type === 'delete') {
            setAdmissions(admissions.filter(app => app.id !== admission.id));
        }

        setDialog(null);
    };

    const getStatusBadge = (status: ApplicationStatus) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
        }
    };
    
    const getDialogMessage = () => {
        if (!dialog) return '';
        const studentName = <strong className="font-bold">{dialog.admission.studentNameBn}</strong>;
        switch (dialog.type) {
            case 'approve': return <p>আপনি কি নিশ্চিতভাবে {studentName} এর ভর্তির আবেদন অনুমোদন করতে চান?</p>;
            case 'reject': return <p>আপনি কি নিশ্চিতভাবে {studentName} এর ভর্তির আবেদন প্রত্যাখ্যান করতে চান?</p>;
            case 'delete': return <p>আপনি কি নিশ্চিতভাবে {studentName} এর ভর্তির আবেদনটি মুছে ফেলতে চান?</p>;
        }
    }
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">অনলাইন ভর্তি ব্যবস্থাপনা</h2>

            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <TabButton name="বিচারাধীন" status="pending" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="অনুমোদিত" status="approved" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="প্রত্যাখ্যাত" status="rejected" activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">আবেদনকারীর নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শ্রেণী</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">মোবাইল</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">আবেদন স্ট্যাটাস</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAdmissions.map((app) => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.studentNameBn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classMap.get(app.admissionClassId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.fatherPhone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => handleViewEdit(app)} className="text-gray-600 hover:text-gray-900 p-1" title="দেখুন/সম্পাদনা"><EyeIcon /></button>
                                        {app.status === 'pending' && (
                                            <>
                                                <button onClick={() => setDialog({type: 'approve', admission: app})} className="text-green-600 hover:text-green-900 p-1" title="অনুমোদন"><CheckCircleIcon /></button>
                                                <button onClick={() => setDialog({type: 'reject', admission: app})} className="text-orange-600 hover:text-orange-900 p-1" title="প্রত্যাখ্যান"><XCircleIcon /></button>
                                            </>
                                        )}
                                        <button onClick={() => setDialog({type: 'delete', admission: app})} className="text-red-600 hover:text-red-900 p-1" title="মুছে ফেলুন"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredAdmissions.length === 0 && (
                    <p className="text-center py-8 text-gray-500">কোনো আবেদন পাওয়া যায়নি।</p>
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="ভর্তি আবেদনের বিস্তারিত" size="lg">
                {selectedApp && <AdmissionDetailsForm application={selectedApp} onSave={handleSave} onCancel={handleCloseModal} classes={classes} />}
            </Modal>

            <ConfirmationDialog 
                isOpen={!!dialog}
                onClose={() => setDialog(null)}
                onConfirm={handleConfirmAction}
                title="পদক্ষেপ নিশ্চিত করুন"
                message={getDialogMessage()}
            />
        </div>
    );
};

const TabButton: React.FC<{name: string, status: ApplicationStatus, activeTab: ApplicationStatus, setActiveTab: (s: ApplicationStatus)=>void}> = ({ name, status, activeTab, setActiveTab }) => {
    const isActive = activeTab === status;
    return (
        <button
            onClick={() => setActiveTab(status)}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                isActive
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
        >
            {name}
        </button>
    );
}

export default OnlineAdmissionManager;