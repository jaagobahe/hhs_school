import React, { useState, useEffect } from 'react';
import type { Section } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface SectionManagerProps {
    sections: Section[];
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

const SectionManager: React.FC<SectionManagerProps> = ({ sections, setSections }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [sectionToDelete, setSectionToDelete] = useState<Section | null>(null);

    const openModalForNew = () => {
        setEditingSection(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (section: Section) => {
        setEditingSection(section);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (sectionToDelete) {
            setSections(sections.filter(s => s.id !== sectionToDelete.id));
            setSectionToDelete(null);
        }
    };
    
    const handleSave = (name: string) => {
        if (editingSection) {
            setSections(sections.map(s => s.id === editingSection.id ? { ...s, name } : s));
        } else {
            const newSection: Section = {
                id: Date.now(),
                name,
            };
            setSections([...sections, newSection]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">শাখা ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন শাখা
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান শাখাসমূহ</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শাখার নাম</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sections.map((section) => (
                                <tr key={section.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{section.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(section)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setSectionToDelete(section)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
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
                title={editingSection ? 'শাখা সম্পাদনা করুন' : 'নতুন শাখা যোগ করুন'}
            >
                <SectionForm
                    section={editingSection}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!sectionToDelete}
                onClose={() => setSectionToDelete(null)}
                onConfirm={confirmDelete}
                title="শাখা মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">'{sectionToDelete?.name}'</strong> শাখাটি মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface SectionFormProps {
    section: Section | null;
    onSave: (name: string) => void;
    onCancel: () => void;
}
const SectionForm: React.FC<SectionFormProps> = ({ section, onSave, onCancel }) => {
    const [name, setName] = useState(section?.name || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">শাখার নাম (যেমন: ক)</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
             <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{section ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

export default SectionManager;
