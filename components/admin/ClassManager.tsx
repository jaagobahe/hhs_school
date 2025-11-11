import React, { useState, useEffect } from 'react';
import type { Class } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface ClassManagerProps {
    classes: Class[];
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

const ClassManager: React.FC<ClassManagerProps> = ({ classes, setClasses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [classToDelete, setClassToDelete] = useState<Class | null>(null);

    const openModalForNew = () => {
        setEditingClass(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (cls: Class) => {
        setEditingClass(cls);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (classToDelete) {
            setClasses(classes.filter(c => c.id !== classToDelete.id));
            setClassToDelete(null);
        }
    };
    
    const handleSave = (classData: Omit<Class, 'id'>) => {
        if (editingClass) {
            setClasses(classes.map(c => c.id === editingClass.id ? { ...editingClass, ...classData } : c));
        } else {
            const newClass: Class = {
                id: Date.now(),
                ...classData,
            };
            setClasses([...classes, newClass].sort((a, b) => a.numericName - b.numericName));
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">শ্রেণী ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন শ্রেণী
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান শ্রেণীসমূহ</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">সাংখ্যিক মান</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {classes.map((cls) => (
                                <tr key={cls.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cls.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cls.numericName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(cls)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setClassToDelete(cls)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
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
                title={editingClass ? 'শ্রেণী সম্পাদনা করুন' : 'নতুন শ্রেণী যোগ করুন'}
            >
                <ClassForm
                    cls={editingClass}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!classToDelete}
                onClose={() => setClassToDelete(null)}
                onConfirm={confirmDelete}
                title="শ্রেণী মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{classToDelete?.name}</strong> শ্রেণীটি মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface ClassFormProps {
    cls: Class | null;
    onSave: (data: Omit<Class, 'id'>) => void;
    onCancel: () => void;
}
const ClassForm: React.FC<ClassFormProps> = ({ cls, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [numericName, setNumericName] = useState('');

    useEffect(() => {
        if (cls) {
            setName(cls.name);
            setNumericName(String(cls.numericName));
        } else {
            setName('');
            setNumericName('');
        }
    }, [cls]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, numericName: Number(numericName) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">শ্রেণীর নাম (যেমন: ষষ্ঠ)</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">সাংখ্যিক মান (যেমন: 6)</label>
                <input type="number" value={numericName} onChange={e => setNumericName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{cls ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};


export default ClassManager;
