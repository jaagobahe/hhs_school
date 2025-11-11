import React, { useState, useMemo } from 'react';
import type { Student, Class, Group, Section, StudentLogin } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface AllStudentsManagerProps {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    onEditStudent: (student: Student) => void;
    classes: Class[];
    groups: Group[];
    sections: Section[];
    setStudentLogins: React.Dispatch<React.SetStateAction<StudentLogin[]>>;
}

const AllStudentsManager: React.FC<AllStudentsManagerProps> = ({ students, setStudents, onEditStudent, classes, groups, sections, setStudentLogins }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('');
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
    
    const confirmDelete = () => {
        if (studentToDelete) {
            setStudents(students.filter(s => s.id !== studentToDelete.id));
            // Also delete the student's login credentials
            setStudentLogins(prev => prev.filter(login => login.studentId !== studentToDelete.studentId));
            setStudentToDelete(null);
        }
    };
    
    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);
    const sectionMap = useMemo(() => new Map(sections.map(s => [s.id, s.name])), [sections]);
    
    const filteredStudents = useMemo(() => {
        return students
            .filter(student => {
                const searchLower = searchTerm.toLowerCase();
                return student.nameBn.includes(searchLower) || 
                       student.nameEn.toLowerCase().includes(searchLower) ||
                       student.studentId.includes(searchLower);
            })
            .filter(student => filterClass ? student.classId === Number(filterClass) : true);
    }, [students, searchTerm, filterClass]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">সকল শিক্ষার্থী</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                        type="text" 
                        placeholder="নাম বা আইডি দিয়ে খুঁজুন..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                        value={filterClass}
                        onChange={e => setFilterClass(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">সকল শ্রেণী</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                 </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ছবি</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">আইডি</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শ্রেণী</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">রোল</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পিতার নাম</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={student.photoUrl} alt={student.nameBn} className="w-10 h-10 rounded-full object-cover" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-tiro-bangla">{student.studentId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.nameBn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {classMap.get(student.classId) || 'N/A'} - {sectionMap.get(student.sectionId) || ''} ({student.groupId ? groupMap.get(student.groupId) : 'N/A'})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-tiro-bangla">{student.roll.toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fatherNameBn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => onEditStudent(student)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setStudentToDelete(student)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।</p>
                    </div>
                )}
            </div>

            <ConfirmationDialog
                isOpen={!!studentToDelete}
                onClose={() => setStudentToDelete(null)}
                onConfirm={confirmDelete}
                title="শিক্ষার্থী মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে শিক্ষার্থী <strong className="font-bold">{studentToDelete?.nameBn}</strong> (আইডি: {studentToDelete?.studentId}) কে মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

export default AllStudentsManager;