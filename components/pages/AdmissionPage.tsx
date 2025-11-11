import React, { useState, useMemo } from 'react';
import { supabase } from '../../supabaseClient';
import type { Class, OnlineAdmission, AdmissionSettings } from '../../types';
import IdentificationIcon from '../icons/IdentificationIcon';
import CalendarIcon from '../icons/CalendarIcon';
import PhoneIcon from '../icons/PhoneIcon';
import AcademicCapIcon from '../icons/AcademicCapIcon';

// Helper Components
const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-8">
        <h3 className="text-xl font-semibold text-brand-secondary border-b-2 border-brand-accent pb-2 mb-6">{title}</h3>
        {children}
    </div>
);

const LabeledIconInput: React.FC<{
    icon: React.ReactNode;
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}> = ({ icon, id, name, label, type = 'text', placeholder, value, onChange, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {icon}
            </div>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="font-tiro-bangla block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"
            />
        </div>
    </div>
);

const RadioCard: React.FC<{
    id: string, name: string, value: string, label: string, 
    checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}> = ({ id, name, value, label, checked, onChange }) => (
    <label htmlFor={id} className={`block w-full text-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
        checked 
        ? 'border-brand-primary bg-blue-50 text-brand-primary font-semibold' 
        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
    }`}>
        <input 
            type="radio" 
            id={id} 
            name={name} 
            value={value} 
            className="hidden" 
            checked={checked}
            onChange={onChange}
        />
        {label}
    </label>
);

interface AdmissionPageProps {
    classes: Class[];
    setOnlineAdmissions: React.Dispatch<React.SetStateAction<OnlineAdmission[]>>;
    admissionSettings: AdmissionSettings;
}

const initialFormData: Omit<OnlineAdmission, 'id' | 'status' | 'studentPhotoUrl'> = {
    studentNameBn: '', studentNameEn: '', dob: '', birthCertNo: '',
    gender: 'male', religion: 'islam', admissionClassId: 6,
    fatherNameBn: '', fatherNameEn: '', fatherNid: '', fatherPhone: '',
    motherNameBn: '', motherNameEn: '', motherNid: '', motherPhone: '',
    presentAddress: '', permanentAddress: '',
    prevSchool: '', prevClass: '', prevResult: ''
};

const AdmissionPage: React.FC<AdmissionPageProps> = ({ classes, setOnlineAdmissions, admissionSettings }) => {
    const [formData, setFormData] = useState(initialFormData);

    const isFormAvailable = useMemo(() => {
        if (!admissionSettings.formEnabled) {
            return false;
        }
        const now = new Date();
        now.setHours(0, 0, 0, 0); 

        const start = new Date(admissionSettings.startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(admissionSettings.endDate);
        end.setHours(0, 0, 0, 0);

        return now >= start && now <= end;
    }, [admissionSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'admissionClassId' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const admissionDataForDb = {
            status: 'pending',
            student_name_bn: formData.studentNameBn,
            student_name_en: formData.studentNameEn,
            dob: formData.dob,
            birth_cert_no: formData.birthCertNo,
            gender: formData.gender,
            religion: formData.religion,
            admission_class_id: formData.admissionClassId,
            father_name_bn: formData.fatherNameBn,
            father_name_en: formData.fatherNameEn,
            father_nid: formData.fatherNid,
            father_phone: formData.fatherPhone,
            mother_name_bn: formData.motherNameBn,
            mother_name_en: formData.motherNameEn,
            mother_nid: formData.motherNid,
            mother_phone: formData.motherPhone,
            present_address: formData.presentAddress,
            permanent_address: formData.permanentAddress,
            prev_school: formData.prevSchool || null,
            prev_class: formData.prevClass || null,
            prev_result: formData.prevResult || null,
        };
        
        const { data, error } = await supabase
            .from('online_admissions')
            .insert([admissionDataForDb])
            .select()
            .single();

        if (error) {
            console.error('Error submitting admission:', error);
            alert('আপনার আবেদন জমা দিতে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        } else if (data) {
            setOnlineAdmissions(prev => [data, ...prev]);
            alert('আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে। বিদ্যালয় কর্তৃপক্ষ শীঘ্রই আপনার সাথে যোগাযোগ করবে।');
            setFormData(initialFormData); // Reset form
        }
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">ভর্তি</h2>
                
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                     <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-primary">
                        <h3 className="text-xl font-semibold text-brand-secondary mb-3">ভর্তির নিয়মাবলী</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                            <li>ষষ্ঠ শ্রেণিতে ভর্তির জন্য সরকারি নিয়ম অনুযায়ী ভর্তি পরীক্ষা অনুষ্ঠিত হবে।</li>
                            <li>অন্যান্য শ্রেণিতে শূন্য আসন সাপেক্ষে ভর্তি পরীক্ষার মাধ্যমে ভর্তি নেওয়া হবে।</li>
                            <li>ভর্তি পরীক্ষার ফলাফল বিদ্যালয়ের নোটিশ বোর্ডে এবং ওয়েবসাইটে প্রকাশ করা হবে।</li>
                            <li>চূড়ান্তভাবে নির্বাচিত শিক্ষার্থীদের নির্ধারিত সময়ের মধ্যে ভর্তি সম্পন্ন করতে হবে।</li>
                        </ol>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-accent">
                        <h3 className="text-xl font-semibold text-brand-secondary mb-3">প্রয়োজনীয় কাগজপত্র</h3>
                         <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                            <li>শিক্ষার্থীর জন্ম নিবন্ধনের সত্যায়িত ফটোকপি।</li>
                            <li>অভিভাবকের জাতীয় পরিচয়পত্রের সত্যায়িত ফটোকপি।</li>
                            <li>পূর্ববর্তী শ্রেণির পরীক্ষার নম্বরপত্র/ প্রশংসাপত্র।</li>
                            <li>শিক্ষার্থীর ২ কপি পাসপোর্ট সাইজের রঙিন ছবি।</li>
                        </ul>
                    </div>
                </div>

                {isFormAvailable ? (
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-page-fade-in">
                        <h2 className="text-2xl font-bold text-center text-brand-primary mb-8">অনলাইন ভর্তি আবেদন ফরম</h2>

                        <form onSubmit={handleSubmit}>
                            
                            <FormSection title="শিক্ষার্থীর তথ্য">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="শিক্ষার্থীর নাম (বাংলায়)" id="studentNameBn" name="studentNameBn" placeholder="সম্পূর্ণ নাম লিখুন" value={formData.studentNameBn} onChange={handleChange}/>
                                    <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="শিক্ষার্থীর নাম (ইংরেজিতে)" id="studentNameEn" name="studentNameEn" placeholder="Capital Letter-এ লিখুন" value={formData.studentNameEn} onChange={handleChange}/>
                                    <LabeledIconInput icon={<CalendarIcon className="w-5 h-5" />} label="জন্ম তারিখ" id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange}/>
                                    <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="জন্ম নিবন্ধন নম্বর" id="birthCertNo" name="birthCertNo" placeholder="১৭ ডিজিটের নম্বর" value={formData.birthCertNo} onChange={handleChange}/>
                                    
                                    <div className="md:col-span-2">
                                         <label className="block text-sm font-medium text-gray-700 mb-1">লিঙ্গ</label>
                                         <div className="grid grid-cols-2 gap-3">
                                            <RadioCard id="gender_male" name="gender" value="male" label="ছেলে" checked={formData.gender === 'male'} onChange={handleChange} />
                                            <RadioCard id="gender_female" name="gender" value="female" label="মেয়ে" checked={formData.gender === 'female'} onChange={handleChange} />
                                         </div>
                                    </div>

                                    <div className="md:col-span-2">
                                         <label className="block text-sm font-medium text-gray-700 mb-1">ধর্ম</label>
                                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <RadioCard id="religion_islam" name="religion" value="islam" label="ইসলাম" checked={formData.religion === 'islam'} onChange={handleChange} />
                                            <RadioCard id="religion_hindu" name="religion" value="hindu" label="হিন্দু" checked={formData.religion === 'hindu'} onChange={handleChange} />
                                            <RadioCard id="religion_buddhist" name="religion" value="buddhist" label="বৌদ্ধ" checked={formData.religion === 'buddhist'} onChange={handleChange} />
                                            <RadioCard id="religion_christian" name="religion" value="christian" label="খ্রিষ্টান" checked={formData.religion === 'christian'} onChange={handleChange} />
                                         </div>
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label htmlFor="admissionClassId" className="block text-sm font-medium text-gray-700 mb-1">যে শ্রেণিতে ভর্তি হতে ইচ্ছুক</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                            {classes.filter(c => c.numericName < 10).map(c => (
                                                <RadioCard 
                                                    key={c.id}
                                                    id={`class_${c.id}`}
                                                    name="admissionClassId"
                                                    value={String(c.id)}
                                                    label={c.name}
                                                    checked={formData.admissionClassId === c.id}
                                                    onChange={handleChange}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FormSection>

                            <FormSection title="অভিভাবকের তথ্য">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                   <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="পিতার নাম (বাংলায়)" id="fatherNameBn" name="fatherNameBn" value={formData.fatherNameBn} onChange={handleChange} />
                                   <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="পিতার নাম (ইংরেজিতে)" id="fatherNameEn" name="fatherNameEn" value={formData.fatherNameEn} onChange={handleChange} />
                                   <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="পিতার জাতীয় পরিচয়পত্র নম্বর" id="fatherNid" name="fatherNid" value={formData.fatherNid} onChange={handleChange} />
                                   <LabeledIconInput icon={<PhoneIcon className="w-5 h-5" />} label="পিতার মোবাইল নম্বর" id="fatherPhone" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} />
                                   <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="মাতার নাম (বাংলায়)" id="motherNameBn" name="motherNameBn" value={formData.motherNameBn} onChange={handleChange} />
                                   <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="মাতার নাম (ইংরেজিতে)" id="motherNameEn" name="motherNameEn" value={formData.motherNameEn} onChange={handleChange} />
                                   <LabeledIconInput icon={<IdentificationIcon className="w-5 h-5" />} label="মাতার জাতীয় পরিচয়পত্র নম্বর" id="motherNid" name="motherNid" value={formData.motherNid} onChange={handleChange} />
                                   <LabeledIconInput icon={<PhoneIcon className="w-5 h-5" />} label="মাতার মোবাইল নম্বর" id="motherPhone" name="motherPhone" value={formData.motherPhone} onChange={handleChange} />
                               </div>
                            </FormSection>

                             <FormSection title="ঠিকানা">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="presentAddress" className="block text-sm font-medium text-gray-700">বর্তমান ঠিকানা</label>
                                        <textarea id="presentAddress" name="presentAddress" rows={3} required placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" value={formData.presentAddress} onChange={handleChange} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">স্থায়ী ঠিকানা</label>
                                        <textarea id="permanentAddress" name="permanentAddress" rows={3} required placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" value={formData.permanentAddress} onChange={handleChange} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
                                    </div>
                                </div>
                            </FormSection>

                            <FormSection title="পূর্ববর্তী স্কুলের তথ্য (প্রযোজ্য ক্ষেত্রে)">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="md:col-span-2">
                                        <LabeledIconInput icon={<AcademicCapIcon className="w-5 h-5" />} label="পূর্ববর্তী স্কুলের নাম" id="prevSchool" name="prevSchool" value={formData.prevSchool!} onChange={handleChange} required={false}/>
                                    </div>
                                    <LabeledIconInput icon={<AcademicCapIcon className="w-5 h-5" />} label="সর্বশেষ পঠিত শ্রেণি" id="prevClass" name="prevClass" value={formData.prevClass!} onChange={handleChange} required={false} />
                                    <LabeledIconInput icon={<AcademicCapIcon className="w-5 h-5" />} label="পরীক্ষার ফলাফল (জি.পি.এ)" id="prevResult" name="prevResult" value={formData.prevResult!} onChange={handleChange} required={false} />
                                </div>
                            </FormSection>

                            <div className="mt-10 text-center">
                                <button type="submit" className="inline-flex justify-center py-3 px-12 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-300 transform hover:scale-105">
                                    আবেদন জমা দিন
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center animate-page-fade-in">
                        <h2 className="text-2xl font-bold text-brand-primary mb-4">ভর্তি কার্যক্রম</h2>
                        <p className="text-gray-700 text-lg">
                            {admissionSettings.unavailableMessage}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdmissionPage;