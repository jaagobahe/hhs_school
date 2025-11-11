import React, { useState, useEffect, useMemo } from 'react';
import type { Student, Class, Group, Section, StudentLogin } from '../../types';

interface NewStudentManagerProps {
    onSave: (student: Student) => void;
    onCancel: () => void;
    studentToEdit: Student | null;
    classes: Class[];
    groups: Group[];
    sections: Section[];
    students: Student[];
    setStudentLogins: React.Dispatch<React.SetStateAction<StudentLogin[]>>;
}

const initialFormState: Omit<Student, 'id' | 'studentId'> = {
    roll: 0,
    nameBn: '',
    nameEn: '',
    dob: '',
    gender: 'male',
    religion: 'islam',
    photoUrl: '',
    classId: 0,
    sectionId: 0,
    groupId: null,
    fatherNameBn: '',
    fatherPhone: '',
    motherNameBn: '',
    admissionDate: new Date().toISOString().slice(0, 10),
};

const NewStudentManager: React.FC<NewStudentManagerProps> = ({ onSave, onCancel, studentToEdit, classes, groups, sections, students, setStudentLogins }) => {
    const [formData, setFormData] = useState<Omit<Student, 'id' | 'studentId'>>(initialFormState);
    
    // Determine available sections based on the selected class
    const selectedClass = useMemo(() => classes.find(c => c.id === formData.classId), [formData.classId, classes]);
    const isClassSix = selectedClass?.numericName === 6;

    const availableSections = useMemo(() => {
        if (isClassSix) {
            return sections; // For class 6, show all sections
        }
        // For other classes, show only section 'ক'
        return sections.filter(s => s.name === 'ক');
    }, [isClassSix, sections]);
    
    useEffect(() => {
        if (studentToEdit) {
            const { id, studentId, ...editableData } = studentToEdit;
            setFormData(editableData);
        } else {
            setFormData({...initialFormState, classId: classes[0]?.id || 0, sectionId: sections[0]?.id || 0 });
        }
    }, [studentToEdit, classes, sections]);

    // Effect to auto-select section 'ক' if class is changed to something other than 6
    useEffect(() => {
        if (!isClassSix) {
            const currentSection = sections.find(s => s.id === formData.sectionId);
            if (currentSection && currentSection.name !== 'ক') {
                const sectionKa = sections.find(s => s.name === 'ক');
                if (sectionKa) {
                    setFormData(prev => ({ ...prev, sectionId: sectionKa.id }));
                }
            }
        }
    }, [formData.classId, isClassSix, sections, formData.sectionId]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'classId' || name === 'sectionId' || name === 'groupId' || name === 'roll' ? Number(value) : value }));
    };
    
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData(prev => ({ ...prev, photoUrl: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let studentId = studentToEdit ? studentToEdit.studentId : '';
        if (!studentToEdit) {
            const year = new Date().getFullYear();
            const studentsThisYear = students.filter(s => s.studentId.startsWith(String(year))).length;
            studentId = `${year}${(studentsThisYear + 1).toString().padStart(3, '0')}`;
        }
        
        const finalData: Student = {
            id: studentToEdit ? studentToEdit.id : Date.now(),
            studentId: studentId,
            ...formData,
            photoUrl: formData.photoUrl || `https://picsum.photos/seed/student${Date.now()}/100/100`,
        };

        // Create login only for new students
        if (!studentToEdit) {
            const newLogin: StudentLogin = {
                studentId: finalData.studentId,
                password: finalData.studentId, // Default password is student ID
                isActive: true,
            };
            setStudentLogins(prev => [newLogin, ...prev]);
        }
        
        onSave(finalData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Academic Information */}
            <fieldset className="border p-4 rounded-md">
                <legend className="px-2 font-semibold">একাডেমিক তথ্য</legend>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <SelectField label="ভর্তির শ্রেণী" name="classId" value={formData.classId} onChange={handleChange} options={classes.map(c => ({ value: c.id, label: c.name }))} required />
                    <SelectField label="শাখা" name="sectionId" value={formData.sectionId} onChange={handleChange} options={availableSections.map(s => ({ value: s.id, label: s.name }))} required />
                    <SelectField label="বিভাগ" name="groupId" value={formData.groupId || ''} onChange={handleChange} options={[{value: '', label: 'প্রযোজ্য নয়'}, ...groups.map(g => ({ value: g.id, label: g.name }))]} />
                    <InputField label="রোল নম্বর" name="roll" type="number" value={formData.roll} onChange={handleChange} required />
                </div>
            </fieldset>

             {/* Student Information */}
            <fieldset className="border p-4 rounded-md">
                <legend className="px-2 font-semibold">শিক্ষার্থীর তথ্য</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <InputField label="নাম (বাংলা)" name="nameBn" value={formData.nameBn} onChange={handleChange} required />
                     <InputField label="নাম (ইংরেজি)" name="nameEn" value={formData.nameEn} onChange={handleChange} required />
                     <InputField label="জন্ম তারিখ" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                     <SelectField label="লিঙ্গ" name="gender" value={formData.gender} onChange={handleChange} options={[{value: 'male', label: 'ছাত্র'}, {value: 'female', label: 'ছাত্রী'}]} required />
                     <SelectField label="ধর্ম" name="religion" value={formData.religion} onChange={handleChange} options={[{value: 'islam', label: 'ইসলাম'}, {value: 'hindu', label: 'হিন্দু'}]} required />
                     <InputField label="ভর্তির তারিখ" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} required />
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">শিক্ষার্থীর ছবি</label>
                        <div className="mt-1 flex items-center space-x-4">
                            <img 
                                src={formData.photoUrl || 'https://via.placeholder.com/100x100.png?text=No+Image'} 
                                alt="শিক্ষার্থীর ছবি" 
                                className="w-24 h-24 rounded-md object-cover bg-gray-100 border"
                            />
                            <div>
                                <input 
                                    type="file" 
                                    id="studentPhoto" 
                                    name="studentPhoto" 
                                    accept="image/*" 
                                    onChange={handlePhotoChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">প্রস্তাবিত সাইজ: ৩০০x৩০০ পিক্সেল।</p>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            
            {/* Guardian Information */}
             <fieldset className="border p-4 rounded-md">
                <legend className="px-2 font-semibold">অভিভাবকের তথ্য</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField label="পিতার নাম" name="fatherNameBn" value={formData.fatherNameBn} onChange={handleChange} required />
                    <InputField label="মাতার নাম" name="motherNameBn" value={formData.motherNameBn} onChange={handleChange} required />
                    <InputField label="অভিভাবকের মোবাইল" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} required />
                </div>
            </fieldset>
            
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    বাতিল
                </button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">
                    {studentToEdit ? 'তথ্য হালনাগাদ করুন' : 'সংরক্ষণ করুন'}
                </button>
            </div>
        </form>
    );
};

// Helper Components
const InputField = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
    </div>
);

const SelectField = ({ label, options, ...props }: { label: string, options: { value: string | number, label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select {...props} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

export default NewStudentManager;