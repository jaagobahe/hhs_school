import React, { useState, useEffect } from 'react';
import type { OnlineAdmission, Class } from '../../types';

interface AdmissionDetailsFormProps {
    application: OnlineAdmission;
    onSave: (application: OnlineAdmission) => void;
    onCancel: () => void;
    classes: Class[];
}

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const FormField: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-gray-800">{value}</p>
    </div>
);

const InputField: React.FC<{ label: string; name: keyof OnlineAdmission; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, name, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type="text" id={name} name={name} value={value} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
    </div>
);


const AdmissionDetailsForm: React.FC<AdmissionDetailsFormProps> = ({ application, onSave, onCancel, classes }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<OnlineAdmission>(application);

    useEffect(() => {
        setFormData(application);
    }, [application]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'admissionClassId' ? Number(value) : value }));
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="space-y-6">
                <div className="flex items-start space-x-6">
                    <img src={formData.studentPhotoUrl || 'https://via.placeholder.com/100x100.png?text=No+Image'} alt="student" className="w-28 h-28 rounded-lg object-cover border"/>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{formData.studentNameBn}</h2>
                        <p className="text-gray-600">{formData.studentNameEn}</p>
                    </div>
                </div>
                
                <FormSection title="শিক্ষার্থীর তথ্য">
                    <FormField label="ভর্তির শ্রেণী" value={classes.find(c => c.id === formData.admissionClassId)?.name || 'N/A'}/>
                    <FormField label="লিঙ্গ" value={formData.gender === 'male' ? 'ছাত্র' : 'ছাত্রী'}/>
                    <FormField label="জন্ম তারিখ" value={new Date(formData.dob).toLocaleDateString('bn-BD')}/>
                    <FormField label="ধর্ম" value={formData.religion === 'islam' ? 'ইসলাম' : 'হিন্দু'}/>
                    <FormField label="জন্ম নিবন্ধন" value={formData.birthCertNo}/>
                </FormSection>

                <FormSection title="অভিভাবকের তথ্য">
                    <FormField label="পিতার নাম (বাংলা)" value={formData.fatherNameBn}/>
                    <FormField label="পিতার নাম (ইংরেজি)" value={formData.fatherNameEn}/>
                    <FormField label="পিতার মোবাইল" value={formData.fatherPhone}/>
                    <FormField label="মাতার নাম (বাংলা)" value={formData.motherNameBn}/>
                </FormSection>

                <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                    <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বন্ধ করুন</button>
                    <button type="button" onClick={() => setIsEditing(true)} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">সম্পাদনা</button>
                </div>
            </div>
        );
    }
    
    // Editing View
    return (
         <div className="space-y-4">
            <FormSection title="শিক্ষার্থীর তথ্য">
                <InputField label="নাম (বাংলা)" name="studentNameBn" value={formData.studentNameBn} onChange={handleChange} />
                <InputField label="নাম (ইংরেজি)" name="studentNameEn" value={formData.studentNameEn} onChange={handleChange} />
                 <div>
                    <label className="block text-sm font-medium text-gray-700">ভর্তির শ্রেণী</label>
                    <select name="admissionClassId" value={formData.admissionClassId} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">জন্ম তারিখ</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
            </FormSection>
             <FormSection title="অভিভাবকের তথ্য">
                <InputField label="পিতার নাম (বাংলা)" name="fatherNameBn" value={formData.fatherNameBn} onChange={handleChange} />
                <InputField label="পিতার মোবাইল" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} />
                <InputField label="মাতার নাম (বাংলা)" name="motherNameBn" value={formData.motherNameBn} onChange={handleChange} />
             </FormSection>
             <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="button" onClick={handleSave} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">সংরক্ষণ</button>
            </div>
         </div>
    );
};

export default AdmissionDetailsForm;
