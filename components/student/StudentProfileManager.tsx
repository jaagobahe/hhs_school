import React, { useState } from 'react';
import type { Student, Class, Section, Group } from '../../types';
import PencilIcon from '../icons/PencilIcon';

interface StudentProfileManagerProps {
    student: Student;
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    classes: Class[];
    sections: Section[];
    groups: Group[];
}

const InfoRow: React.FC<{ label: string; value: string | undefined | null; isNumeric?: boolean }> = ({ label, value, isNumeric }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className={`mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ${isNumeric ? 'font-tiro-bangla' : ''}`}>{value || 'N/A'}</dd>
    </div>
);


const StudentProfileManager: React.FC<StudentProfileManagerProps> = ({ student, setStudents, classes, sections, groups }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fatherPhone: student.fatherPhone,
        bloodGroup: student.bloodGroup || '',
        photoUrl: student.photoUrl,
    });
    const [message, setMessage] = useState('');

    const classMap = new Map(classes.map(c => [c.id, c.name]));
    const sectionMap = new Map(sections.map(s => [s.id, s.name]));
    const groupMap = new Map(groups.map(g => [g.id, g.name]));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, ...formData } : s));
        setIsEditing(false);
        setMessage('আপনার তথ্য সফলভাবে হালনাগাদ করা হয়েছে।');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-2xl font-semibold text-brand-primary">আমার প্রোফাইল</h3>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="inline-flex items-center py-2 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200">
                        <PencilIcon className="w-4 h-4 mr-2" />
                        সম্পাদনা করুন
                    </button>
                )}
            </div>
            
            {message && <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">{message}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center">
                    <img src={formData.photoUrl} alt={student.nameBn} className="w-40 h-40 rounded-full object-cover border-4 border-brand-secondary shadow-lg" />
                    {isEditing && (
                         <div className="mt-4 w-full">
                            <label className="block text-sm font-medium text-gray-700 text-center">ছবি পরিবর্তন করুন</label>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50"/>
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <dl className="divide-y divide-gray-200">
                        <InfoRow label="পূর্ণ নাম (বাংলা)" value={student.nameBn} />
                        <InfoRow label="পূর্ণ নাম (ইংরেজি)" value={student.nameEn} />
                        <InfoRow label="শিক্ষার্থী আইডি" value={student.studentId} isNumeric />
                        <InfoRow label="শ্রেণী" value={`${classMap.get(student.classId)} - ${sectionMap.get(student.sectionId)}`} />
                        {student.groupId && <InfoRow label="বিভাগ" value={groupMap.get(student.groupId)} />}
                        <InfoRow label="রোল" value={student.roll.toLocaleString('bn-BD')} isNumeric />
                        <InfoRow label="জন্ম তারিখ" value={new Date(student.dob).toLocaleDateString('bn-BD')} isNumeric />
                        
                        {isEditing ? (
                             <>
                                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium text-gray-500">অভিভাবকের মোবাইল</dt>
                                    <dd className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="text" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} className="font-tiro-bangla w-full p-1 border border-gray-300 rounded-md"/>
                                    </dd>
                                </div>
                                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                     <dt className="text-sm font-medium text-gray-500">রক্তের গ্রুপ</dt>
                                     <dd className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="font-tiro-bangla w-full p-1 border border-gray-300 rounded-md"/>
                                    </dd>
                                </div>
                             </>
                        ) : (
                            <>
                                <InfoRow label="অভিভাবকের মোবাইল" value={student.fatherPhone} isNumeric />
                                <InfoRow label="রক্তের গ্রুপ" value={student.bloodGroup} isNumeric />
                            </>
                        )}
                        <InfoRow label="পিতার নাম" value={student.fatherNameBn} />
                        <InfoRow label="মাতার নাম" value={student.motherNameBn} />
                    </dl>
                </div>
            </div>

            {isEditing && (
                <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                    <button onClick={() => { setIsEditing(false); setFormData({fatherPhone: student.fatherPhone, bloodGroup: student.bloodGroup || '', photoUrl: student.photoUrl}) }} className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg">
                        বাতিল
                    </button>
                    <button onClick={handleSave} className="py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg">
                        সংরক্ষণ করুন
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentProfileManager;