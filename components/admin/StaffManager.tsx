import React, { useState, useEffect } from 'react';
import type { StaffMember } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface StaffManagerProps {
    staff: StaffMember[];
    setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
}

const StaffManager: React.FC<StaffManagerProps> = ({ staff, setStaff }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
    const [staffToDelete, setStaffToDelete] = useState<StaffMember | null>(null);

    const openModalForNew = () => {
        setEditingStaff(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (member: StaffMember) => {
        setEditingStaff(member);
        setIsModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (staffToDelete) {
            setStaff(staff.filter(s => s.id !== staffToDelete.id));
            setStaffToDelete(null);
        }
    };
    
    const handleSave = (staffData: Omit<StaffMember, 'id'>) => {
        if (editingStaff) {
            setStaff(staff.map(s => s.id === editingStaff.id ? { ...editingStaff, ...staffData } : s));
        } else {
            const newStaff: StaffMember = {
                id: Date.now(),
                ...staffData,
                imageUrl: staffData.imageUrl || `https://picsum.photos/seed/staff${Date.now()}/200/200`,
            };
            setStaff([newStaff, ...staff]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">কর্মচারী ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন কর্মচারী
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান কর্মচারীবৃন্দ</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পদবি</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">যোগদানের তারিখ</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {staff.map((member) => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.designation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-tiro-bangla">{new Date(member.joiningDate).toLocaleDateString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(member)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setStaffToDelete(member)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStaff ? 'কর্মচারীর তথ্য সম্পাদনা' : 'নতুন কর্মচারী যোগ করুন'}
            >
                <StaffForm
                    staffMember={editingStaff}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!staffToDelete}
                onClose={() => setStaffToDelete(null)}
                onConfirm={confirmDelete}
                title="কর্মচারী মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{staffToDelete?.name}</strong> এর তথ্য মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface StaffFormProps {
    staffMember: StaffMember | null;
    onSave: (data: Omit<StaffMember, 'id'>) => void;
    onCancel: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ staffMember, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<StaffMember, 'id'>>({
        name: '',
        designation: '',
        joiningDate: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (staffMember) {
            setFormData(staffMember);
        } else {
            setFormData({
                name: '',
                designation: '',
                joiningDate: new Date().toISOString().slice(0, 10),
                imageUrl: '',
            });
        }
    }, [staffMember]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
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


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">কর্মচারীর নাম</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">পদবি</label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">যোগদানের তারিখ</label>
                    <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">কর্মচারীর ছবি</label>
                    <div className="mt-1 flex items-center space-x-4">
                        <img 
                            src={formData.imageUrl || 'https://via.placeholder.com/100x100.png?text=No+Image'} 
                            alt="কর্মচারীর ছবি" 
                            className="w-24 h-24 rounded-md object-cover bg-gray-100 border"
                        />
                        <div>
                            <input 
                                type="file" 
                                id="staffPhoto" 
                                name="staffPhoto" 
                                accept="image/*" 
                                onChange={handlePhotoChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">প্রস্তাবিত সাইজ: ৩০০x৩০০ পিক্সেল।</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{staffMember ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

export default StaffManager;