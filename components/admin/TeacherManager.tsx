import React, { useState, useEffect, useMemo } from 'react';
import type { Teacher, TeacherAssignment, Class, Section, Group, Subject } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface TeacherManagerProps {
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    classes: Class[];
    sections: Section[];
    groups: Group[];
    subjects: Subject[];
}

const initialFormState: Omit<Teacher, 'id'> = {
    name: '',
    designation: '',
    imageUrl: '',
    joiningDate: '',
    appointmentDate: '',
    education: '',
    email: '',
    phone: '',
    bio: '',
    assignments: [],
    facebookUrl: '',
    whatsappNumber: '',
};

const TeacherManager: React.FC<TeacherManagerProps> = ({ teachers, setTeachers, classes, sections, groups, subjects }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

    const openModalForNew = () => {
        setEditingTeacher(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (teacherToDelete) {
            setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
            setTeacherToDelete(null);
        }
    };
    
    const handleSave = (formData: Omit<Teacher, 'id'>) => {
        if (editingTeacher) {
            setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...formData, id: t.id } : t));
        } else {
            const newTeacher: Teacher = {
                id: Date.now(),
                ...formData,
                imageUrl: formData.imageUrl || `https://picsum.photos/seed/teacher${Date.now()}/200/200`,
            };
            setTeachers([newTeacher, ...teachers]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">শিক্ষক ব্যবস্থাপনা</h2>
                 <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন শিক্ষক
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান শিক্ষকবৃন্দ</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পদবি</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.designation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(teacher)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setTeacherToDelete(teacher)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
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
                title={editingTeacher ? 'শিক্ষকের তথ্য সম্পাদনা' : 'নতুন শিক্ষক যোগ করুন'}
                size="lg"
            >
                <TeacherForm
                    teacher={editingTeacher}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                    classes={classes}
                    sections={sections}
                    groups={groups}
                    subjects={subjects}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!teacherToDelete}
                onClose={() => setTeacherToDelete(null)}
                onConfirm={confirmDelete}
                title="শিক্ষক মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{teacherToDelete?.name}</strong> এর তথ্য মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface TeacherFormProps {
    teacher: Teacher | null;
    onSave: (data: Omit<Teacher, 'id'>) => void;
    onCancel: () => void;
    classes: Class[];
    sections: Section[];
    groups: Group[];
    subjects: Subject[];
}
const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onSave, onCancel, classes, sections, groups, subjects }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [newAssignment, setNewAssignment] = useState({ classId: classes[0]?.id || '', sectionId: sections[0]?.id || '', groupId: '', subjectId: '' });

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c])), [classes]);
    const sectionMap = useMemo(() => new Map(sections.map(s => [s.id, s.name])), [sections]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);
    const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);
    
    const isGroupApplicable = useMemo(() => {
        const selectedClass = classMap.get(Number(newAssignment.classId));
        return selectedClass && selectedClass.numericName >= 9;
    }, [newAssignment.classId, classMap]);
    
    const filteredSubjects = useMemo(() => {
        if (!newAssignment.classId) return [];
        return subjects.filter(sub => 
            sub.classId === Number(newAssignment.classId) &&
            (!isGroupApplicable || sub.groupId === null || sub.groupId === Number(newAssignment.groupId))
        );
    }, [subjects, newAssignment.classId, newAssignment.groupId, isGroupApplicable]);


    useEffect(() => {
        if (teacher) {
            setFormData({ ...initialFormState, ...teacher, assignments: teacher.assignments || [] });
        } else {
            setFormData(initialFormState);
        }
    }, [teacher]);

     useEffect(() => {
        if (!isGroupApplicable) {
            setNewAssignment(prev => ({ ...prev, groupId: '' }));
        }
        setNewAssignment(prev => ({...prev, subjectId: ''}));
    }, [newAssignment.classId, isGroupApplicable]);

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

    const handleNewAssignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAssignment(prev => ({...prev, [name]: value}));
    };
    
    const handleAddAssignment = () => {
        if (!newAssignment.classId || !newAssignment.sectionId || !newAssignment.subjectId) {
            alert("Please select class, section, and subject.");
            return;
        }
        const assignmentToAdd: TeacherAssignment = {
            classId: Number(newAssignment.classId),
            sectionId: Number(newAssignment.sectionId),
            subjectId: Number(newAssignment.subjectId),
            groupId: newAssignment.groupId ? Number(newAssignment.groupId) : null,
        };
        setFormData(prev => ({...prev, assignments: [...(prev.assignments || []), assignmentToAdd]}));
    };
    
    const handleRemoveAssignment = (index: number) => {
        setFormData(prev => ({...prev, assignments: prev.assignments?.filter((_, i) => i !== index) || [] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">শিক্ষকের নাম</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">পদবি</label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">শিক্ষাগত যোগ্যতা</label>
                    <input type="text" name="education" value={formData.education} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                 
                <div>
                    <label className="block text-sm font-medium text-gray-700">যোগদানের তারিখ</label>
                    <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">নিয়োগের তারিখ</label>
                    <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">ইমেইল</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">ফোন নম্বর</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">WhatsApp নম্বর</label>
                    <input type="tel" name="whatsappNumber" value={formData.whatsappNumber || ''} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="ঐচ্ছিক"/>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">ফেসবুক প্রোফাইল লিংক</label>
                    <input type="url" name="facebookUrl" value={formData.facebookUrl || ''} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://facebook.com/username"/>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">শিক্ষকের ছবি</label>
                    <div className="mt-1 flex items-center space-x-4">
                        <img 
                            src={formData.imageUrl || 'https://via.placeholder.com/100x100.png?text=No+Image'} 
                            alt="শিক্ষকের ছবি" 
                            className="w-24 h-24 rounded-md object-cover bg-gray-100 border"
                        />
                        <div>
                            <input 
                                type="file" 
                                id="teacherPhoto" 
                                name="teacherPhoto" 
                                accept="image/*" 
                                onChange={handlePhotoChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">প্রস্তাবিত সাইজ: ৩০০x৩০০ পিক্সেল।</p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700">সংক্ষিপ্ত পরিচিতি</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3}></textarea>
                </div>

                {/* Subject Assignments */}
                <div className="md:col-span-2 border-t pt-4 mt-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">বিষয় বন্টন</h4>
                    <div className="space-y-2 mb-4">
                        {formData.assignments?.map((ass, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                <span className="text-sm">{classMap.get(ass.classId)?.name} - {sectionMap.get(ass.sectionId)} | {subjectMap.get(ass.subjectId)} {ass.groupId ? `(${groupMap.get(ass.groupId)})` : ''}</span>
                                <button type="button" onClick={() => handleRemoveAssignment(index)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end p-3 border rounded-md bg-gray-50">
                        <SelectField label="শ্রেণী" name="classId" value={newAssignment.classId} onChange={handleNewAssignmentChange} options={classes.map(c=>({value: c.id, label: c.name}))} />
                        <SelectField label="শাখা" name="sectionId" value={newAssignment.sectionId} onChange={handleNewAssignmentChange} options={sections.map(s=>({value: s.id, label: s.name}))} />
                        <SelectField label="বিভাগ" name="groupId" value={newAssignment.groupId} onChange={handleNewAssignmentChange} options={[{value: '', label:'N/A'}, ...groups.map(g=>({value: g.id, label: g.name}))]} disabled={!isGroupApplicable} />
                        <SelectField label="বিষয়" name="subjectId" value={newAssignment.subjectId} onChange={handleNewAssignmentChange} options={filteredSubjects.map(s=>({value: s.id, label: s.name}))} />
                        <button type="button" onClick={handleAddAssignment} className="bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 text-sm h-10">যোগ করুন</button>
                    </div>
                </div>

            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{teacher ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: { value: string | number, label: string }[] }) => (
    <div>
        <label className="block text-xs font-medium text-gray-700">{props.label}</label>
        <select {...props} className="mt-1 block w-full pl-2 pr-8 py-2 border-gray-300 rounded-md text-sm">
             {props.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);


export default TeacherManager;