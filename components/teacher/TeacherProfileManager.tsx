import React, { useState } from 'react';
import type { Teacher } from '../../types';
import PencilIcon from '../icons/PencilIcon';

interface TeacherProfileManagerProps {
    teacher: Teacher;
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

const InfoRow: React.FC<{ label: string; value: string | undefined | null; isNumeric?: boolean }> = ({ label, value, isNumeric }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className={`mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ${isNumeric ? 'font-tiro-bangla' : ''}`}>{value || 'N/A'}</dd>
    </div>
);


const TeacherProfileManager: React.FC<TeacherProfileManagerProps> = ({ teacher, setTeachers }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        phone: teacher.phone,
        email: teacher.email,
        bio: teacher.bio,
        imageUrl: teacher.imageUrl,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setTeachers(prev => prev.map(t => t.id === teacher.id ? { ...t, ...formData } : t));
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
                    <img src={formData.imageUrl} alt={teacher.name} className="w-40 h-40 rounded-full object-cover border-4 border-brand-secondary shadow-lg" />
                    {isEditing && (
                         <div className="mt-4 w-full">
                            <label className="block text-sm font-medium text-gray-700 text-center">ছবি পরিবর্তন করুন</label>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50"/>
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <dl className="divide-y divide-gray-200">
                        <InfoRow label="পূর্ণ নাম" value={teacher.name} />
                        <InfoRow label="পদবি" value={teacher.designation} />
                        <InfoRow label="শিক্ষাগত যোগ্যতা" value={teacher.education} />
                        
                        {isEditing ? (
                             <>
                                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium text-gray-500">মোবাইল</dt>
                                    <dd className="mt-1 sm:mt-0 sm:col-span-2"><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="font-tiro-bangla w-full p-1 border border-gray-300 rounded-md"/></dd>
                                </div>
                                <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                     <dt className="text-sm font-medium text-gray-500">ইমেইল</dt>
                                     <dd className="mt-1 sm:mt-0 sm:col-span-2"><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-1 border border-gray-300 rounded-md"/></dd>
                                </div>
                                 <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                     <dt className="text-sm font-medium text-gray-500">সংক্ষিপ্ত পরিচিতি</dt>
                                     <dd className="mt-1 sm:mt-0 sm:col-span-2"><textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full p-1 border border-gray-300 rounded-md"></textarea></dd>
                                </div>
                             </>
                        ) : (
                            <>
                                <InfoRow label="মোবাইল" value={teacher.phone} isNumeric />
                                <InfoRow label="ইমেইল" value={teacher.email} />
                                <InfoRow label="সংক্ষিপ্ত পরিচিতি" value={teacher.bio} />
                            </>
                        )}
                        <InfoRow label="যোগদানের তারিখ" value={new Date(teacher.joiningDate).toLocaleDateString('bn-BD')} isNumeric />
                    </dl>
                </div>
            </div>

            {isEditing && (
                <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                    <button onClick={() => { setIsEditing(false); setFormData({ phone: teacher.phone, email: teacher.email, bio: teacher.bio, imageUrl: teacher.imageUrl }) }} className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg">
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

export default TeacherProfileManager;