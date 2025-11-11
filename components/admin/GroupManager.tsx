import React, { useState, useEffect } from 'react';
import type { Group } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface GroupManagerProps {
    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const GroupManager: React.FC<GroupManagerProps> = ({ groups, setGroups }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<Group | null>(null);
    const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);

    const openModalForNew = () => {
        setEditingGroup(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (group: Group) => {
        setEditingGroup(group);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (groupToDelete) {
            setGroups(groups.filter(g => g.id !== groupToDelete.id));
            setGroupToDelete(null);
        }
    };
    
    const handleSave = (name: string) => {
        if (editingGroup) {
            setGroups(groups.map(g => g.id === editingGroup.id ? { ...g, name } : g));
        } else {
            const newGroup: Group = {
                id: Date.now(),
                name,
            };
            setGroups([...groups, newGroup]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">বিভাগ ব্যবস্থাপনা</h2>
                 <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন বিভাগ
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান বিভাগসমূহ</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">বিভাগের নাম</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {groups.map((group) => (
                                <tr key={group.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(group)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setGroupToDelete(group)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
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
                title={editingGroup ? 'বিভাগ সম্পাদনা করুন' : 'নতুন বিভাগ যোগ করুন'}
            >
                <GroupForm
                    group={editingGroup}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!groupToDelete}
                onClose={() => setGroupToDelete(null)}
                onConfirm={confirmDelete}
                title="বিভাগ মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{groupToDelete?.name}</strong> বিভাগটি মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface GroupFormProps {
    group: Group | null;
    onSave: (name: string) => void;
    onCancel: () => void;
}
const GroupForm: React.FC<GroupFormProps> = ({ group, onSave, onCancel }) => {
    const [name, setName] = useState(group?.name || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">বিভাগের নাম (যেমন: বিজ্ঞান)</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
             <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{group ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};


export default GroupManager;
