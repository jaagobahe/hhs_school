import React, { useState } from 'react';
import type { Teacher } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import ToggleSwitch from '../common/ToggleSwitch';

interface TeacherLoginManagerProps {
    teachers: Teacher[];
}

const TeacherLoginManager: React.FC<TeacherLoginManagerProps> = ({ teachers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [password, setPassword] = useState('');
    
    // State to manage active/inactive status. Defaulting all to active.
    const [teacherLoginStatus, setTeacherLoginStatus] = useState<Map<number, boolean>>(
        new Map(teachers.map(t => [t.id, true]))
    );
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

    const handleEdit = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setPassword(''); // Clear password field for security
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (selectedTeacher) {
            console.log(`Password for ${selectedTeacher.name} updated to: ${password}`);
            alert('পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে (সিমুলেশন)।');
        }
        setIsModalOpen(false);
        setSelectedTeacher(null);
        setPassword('');
    };
    
    const handleToggleStatus = (teacherId: number, isActive: boolean) => {
        const newStatus = new Map(teacherLoginStatus);
        newStatus.set(teacherId, isActive);
        setTeacherLoginStatus(newStatus);
    };

    const confirmDelete = () => {
        if (teacherToDelete) {
            const newStatus = new Map(teacherLoginStatus);
            newStatus.delete(teacherToDelete.id);
            setTeacherLoginStatus(newStatus);
            alert(`${teacherToDelete.name} এর লগইন তথ্য মুছে ফেলা হয়েছে (সিমুলেশন)।`);
            setTeacherToDelete(null);
        }
    };

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">শিক্ষক লগইন তথ্য</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পদবি</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">লগইন আইডি</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">অবস্থা</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 font-tiro-bangla">
                            {teachers.map((teacher) => {
                                const isActive = teacherLoginStatus.get(teacher.id) ?? false;
                                return (
                                    <tr key={teacher.id}>
                                        <td className="px-6 py-4 whitespace-nowrap font-hind-siliguri">{teacher.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-hind-siliguri">{teacher.designation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-sans">{teacher.loginId || teacher.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end space-x-2">
                                            <ToggleSwitch 
                                                id={`teacher-status-${teacher.id}`}
                                                checked={isActive}
                                                onChange={(checked) => handleToggleStatus(teacher.id, checked)}
                                            />
                                            <button onClick={() => handleEdit(teacher)} className="text-indigo-600 hover:text-indigo-900 p-1" title="পাসওয়ার্ড পরিবর্তন করুন">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                             <button onClick={() => setTeacherToDelete(teacher)} className="text-red-600 hover:text-red-900 p-1" title="লগইন মুছে ফেলুন">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="পাসওয়ার্ড পরিবর্তন">
                {selectedTeacher && (
                     <div className="space-y-4">
                        <p>শিক্ষক: <strong className="font-semibold">{selectedTeacher.name}</strong></p>
                        <p>লগইন আইডি: <strong className="font-semibold">{selectedTeacher.loginId}</strong></p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড</label>
                            <input 
                                type="text" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-200 rounded-md">বাতিল</button>
                            <button type="button" onClick={handleSave} className="px-6 py-2 bg-brand-primary text-white rounded-md">সংরক্ষণ</button>
                        </div>
                    </div>
                )}
            </Modal>
             <ConfirmationDialog
                isOpen={!!teacherToDelete}
                onClose={() => setTeacherToDelete(null)}
                onConfirm={confirmDelete}
                title="লগইন মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{teacherToDelete?.name}</strong> এর লগইন তথ্য মুছে ফেলতে চান? (এটি শুধুমাত্র সিমুলেশন, আসল ডেটাবেস প্রভাবিত হবে না)</p>}
            />
        </div>
    );
};

export default TeacherLoginManager;