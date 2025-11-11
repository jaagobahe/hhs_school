import React, { useState, useEffect } from 'react';
import type { AdhocCommitteeMember } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface CommitteeManagerProps {
    committeeMembers: AdhocCommitteeMember[];
    setCommitteeMembers: React.Dispatch<React.SetStateAction<AdhocCommitteeMember[]>>;
}

const CommitteeManager: React.FC<CommitteeManagerProps> = ({ committeeMembers, setCommitteeMembers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<AdhocCommitteeMember | null>(null);
    const [memberToDelete, setMemberToDelete] = useState<AdhocCommitteeMember | null>(null);

    const openModalForNew = () => {
        setEditingMember(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (member: AdhocCommitteeMember) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (memberToDelete) {
            setCommitteeMembers(committeeMembers.filter(m => m.id !== memberToDelete.id));
            setMemberToDelete(null);
        }
    };
    
    const handleSave = (memberData: Omit<AdhocCommitteeMember, 'id'>) => {
        if (editingMember) {
            setCommitteeMembers(committeeMembers.map(m => m.id === editingMember.id ? { ...editingMember, ...memberData } : m));
        } else {
            const newMember: AdhocCommitteeMember = {
                id: Date.now(),
                ...memberData,
            };
            setCommitteeMembers([...committeeMembers, newMember]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">কমিটি ব্যবস্থাপনা</h2>
                 <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন সদস্য
                </button>
            </div>

            {/* Existing Members Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান সদস্যসমূহ</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ক্রমিক</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">পদের নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">সদস্যের নাম</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {committeeMembers.map((member, index) => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(index + 1).toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{member.post}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(member)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => setMemberToDelete(member)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"><TrashIcon className="w-5 h-5" /></button>
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
                title={editingMember ? 'সদস্য সম্পাদনা করুন' : 'নতুন সদস্য যোগ করুন'}
            >
                <CommitteeForm
                    member={editingMember}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!memberToDelete}
                onClose={() => setMemberToDelete(null)}
                onConfirm={confirmDelete}
                title="সদস্য মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে এই সদস্য <strong className="font-bold">{memberToDelete?.name}</strong> কে মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};


// Form Component
interface CommitteeFormProps {
    member: AdhocCommitteeMember | null;
    onSave: (data: Omit<AdhocCommitteeMember, 'id'>) => void;
    onCancel: () => void;
}
const CommitteeForm: React.FC<CommitteeFormProps> = ({ member, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [post, setPost] = useState('');

    useEffect(() => {
        if (member) {
            setName(member.name);
            setPost(member.post);
        } else {
            setName('');
            setPost('');
        }
    }, [member]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, post });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">সদস্যের নাম</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">পদবি</label>
                <input type="text" value={post} onChange={e => setPost(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{member ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

export default CommitteeManager;
