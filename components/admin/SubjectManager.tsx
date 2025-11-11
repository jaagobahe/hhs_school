import React, { useState, useEffect, useMemo } from 'react';
import type { Subject, Class, Group } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface SubjectManagerProps {
    subjects: Subject[];
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
    classes: Class[];
    groups: Group[];
}

const SubjectManager: React.FC<SubjectManagerProps> = ({ subjects, setSubjects, classes, groups }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);

    const groupedSubjects = useMemo(() => {
        const result: { [classId: number]: { general: Subject[], byGroup: { [groupId: number]: Subject[] } } } = {};
        
        subjects.forEach(subject => {
            if (!result[subject.classId]) {
                result[subject.classId] = { general: [], byGroup: {} };
            }

            if (subject.groupId === null) {
                result[subject.classId].general.push(subject);
            } else {
                if (!result[subject.classId].byGroup[subject.groupId]) {
                    result[subject.classId].byGroup[subject.groupId] = [];
                }
                result[subject.classId].byGroup[subject.groupId].push(subject);
            }
        });
        return result;
    }, [subjects]);


    const openModalForNew = () => {
        setEditingSubject(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (subject: Subject) => {
        setEditingSubject(subject);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (subjectToDelete) {
            setSubjects(subjects.filter(s => s.id !== subjectToDelete.id));
            setSubjectToDelete(null);
        }
    };
    
    const handleSave = (subjectData: Omit<Subject, 'id'>) => {
        if (editingSubject) {
            setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...editingSubject, ...subjectData } : s));
        } else {
            const newSubject: Subject = {
                id: Date.now(),
                ...subjectData,
            };
            setSubjects([...subjects, newSubject]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">বিষয় ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন বিষয়
                </button>
            </div>

            <div className="space-y-8">
                {classes.map(cls => (
                    <div key={cls.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-brand-primary mb-4 border-b pb-2">{classMap.get(cls.id)} শ্রেণী</h3>
                        
                        {/* General Subjects */}
                        {groupedSubjects[cls.id]?.general?.length > 0 && (
                             <div>
                                <h4 className="text-md font-semibold text-gray-600 mb-2">সাধারণ বিষয়</h4>
                                <SubjectList subjects={groupedSubjects[cls.id].general} onEdit={openModalForEdit} onDelete={setSubjectToDelete} />
                            </div>
                        )}

                        {/* Group Subjects */}
                        {Object.keys(groupedSubjects[cls.id]?.byGroup || {}).map(groupIdStr => {
                            const groupId = Number(groupIdStr);
                            return (
                                <div key={groupId} className="mt-4">
                                     <h4 className="text-md font-semibold text-gray-600 mb-2">{groupMap.get(groupId)} বিভাগ</h4>
                                     <SubjectList subjects={groupedSubjects[cls.id].byGroup[groupId]} onEdit={openModalForEdit} onDelete={setSubjectToDelete} />
                                </div>
                            );
                        })}

                        {!groupedSubjects[cls.id] && <p className="text-gray-500 text-sm">এই শ্রেণীর জন্য কোনো বিষয় যোগ করা হয়নি।</p>}
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingSubject ? 'বিষয় সম্পাদনা করুন' : 'নতুন বিষয় যোগ করুন'}
            >
                <SubjectForm
                    subject={editingSubject}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                    classes={classes}
                    groups={groups}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!subjectToDelete}
                onClose={() => setSubjectToDelete(null)}
                onConfirm={confirmDelete}
                title="বিষয় মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{subjectToDelete?.name}</strong> বিষয়টি মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

const SubjectList: React.FC<{ subjects: Subject[], onEdit: (s: Subject) => void, onDelete: (s: Subject) => void }> = ({ subjects, onEdit, onDelete }) => (
    <ul className="divide-y divide-gray-200">
        {subjects.map(subject => (
            <li key={subject.id} className="py-2 flex justify-between items-center">
                <span className="text-gray-800">{subject.name}</span>
                <div className="space-x-2">
                    <button onClick={() => onEdit(subject)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(subject)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon className="w-4 h-4"/></button>
                </div>
            </li>
        ))}
    </ul>
);


// Form Component
interface SubjectFormProps {
    subject: Subject | null;
    onSave: (data: Omit<Subject, 'id'>) => void;
    onCancel: () => void;
    classes: Class[];
    groups: Group[];
}
const SubjectForm: React.FC<SubjectFormProps> = ({ subject, onSave, onCancel, classes, groups }) => {
    const [name, setName] = useState('');
    const [classId, setClassId] = useState<number | ''>('');
    const [groupId, setGroupId] = useState<number | ''>('');

    const selectedClass = useMemo(() => classes.find(c => c.id === classId), [classId, classes]);
    const isGroupApplicable = selectedClass ? selectedClass.numericName >= 9 : false;

    useEffect(() => {
        if (subject) {
            setName(subject.name);
            setClassId(subject.classId);
            setGroupId(subject.groupId ?? '');
        } else {
            setName('');
            setClassId(classes[0]?.id || '');
            setGroupId('');
        }
    }, [subject, classes]);

    useEffect(() => {
        if (!isGroupApplicable) {
            setGroupId('');
        }
    }, [isGroupApplicable]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!classId) return;
        onSave({ name, classId, groupId: groupId === '' ? null : Number(groupId) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">বিষয়ের নাম</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">শ্রেণী</label>
                <select value={classId} onChange={e => setClassId(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md" required>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">বিভাগ</label>
                <select 
                    value={groupId} 
                    onChange={e => setGroupId(Number(e.target.value))} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md disabled:bg-gray-100"
                    disabled={!isGroupApplicable}
                >
                    <option value="">সাধারণ বিষয়</option>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                {!isGroupApplicable && <p className="text-xs text-gray-500 mt-1">নবম ও দশম শ্রেণীর জন্য বিভাগ প্রযোজ্য।</p>}
            </div>
             <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{subject ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

export default SubjectManager;
