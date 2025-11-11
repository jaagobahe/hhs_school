import React, { useState, useMemo } from 'react';
import type { Student, Class, Section, Group, StudentLogin } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import ToggleSwitch from '../common/ToggleSwitch';
import ChevronDownIcon from '../icons/ChevronDownIcon';

interface StudentLoginManagerProps {
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    studentLogins: StudentLogin[];
    setStudentLogins: React.Dispatch<React.SetStateAction<StudentLogin[]>>;
}

// Type for the filter state
type ActiveFilter = {
    type: 'class' | 'section' | 'group';
    classId: number;
    subId?: number; // for sectionId or groupId
    label: string; // for displaying the active filter
};


const StudentLoginManager: React.FC<StudentLoginManagerProps> = ({ students, classes, sections, groups, studentLogins, setStudentLogins }) => {
    // State for the active filter button/sub-button
    const [activeFilter, setActiveFilter] = useState<ActiveFilter | null>(null);
    // State to manage which class dropdown is open (6, 9, or 10)
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [password, setPassword] = useState('');
    
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
    
    const loginMap = useMemo(() => new Map(studentLogins.map(l => [l.studentId, l])), [studentLogins]);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    
    // Updated filtering logic based on the new activeFilter state
    const filteredStudents = useMemo(() => {
        if (!activeFilter) {
            return []; // Show nothing by default until a filter is selected
        }
        return students.filter(student => {
            if (student.classId !== activeFilter.classId) {
                return false;
            }
            if (activeFilter.type === 'section' && student.sectionId !== activeFilter.subId) {
                return false;
            }
            if (activeFilter.type === 'group' && student.groupId !== activeFilter.subId) {
                return false;
            }
            return true;
        }).sort((a,b) => a.roll - b.roll);
    }, [students, activeFilter]);


    // Handlers for modal
    const handleEdit = (student: Student) => {
        setSelectedStudent(student);
        const login = loginMap.get(student.studentId);
        setPassword(login?.password || student.studentId);
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (selectedStudent) {
            setStudentLogins(prev => prev.map(login => 
                login.studentId === selectedStudent.studentId
                ? { ...login, password: password }
                : login
            ));
            alert('পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।');
        }
        setIsModalOpen(false);
        setSelectedStudent(null);
        setPassword('');
    };
    
    const handleToggleStatus = (studentId: string, isActive: boolean) => {
        setStudentLogins(prev => prev.map(login =>
            login.studentId === studentId
            ? { ...login, isActive }
            : login
        ));
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            setStudentLogins(prev => prev.filter(login => login.studentId !== studentToDelete.studentId));
            alert(`${studentToDelete.nameBn} এর লগইন তথ্য মুছে ফেলা হয়েছে।`);
            setStudentToDelete(null);
        }
    };


    // Handler to set the active filter
    const handleFilterClick = (filter: ActiveFilter) => {
        setActiveFilter(filter);
    };

    // Handler to toggle class dropdowns
    const toggleDropdown = (classId: number) => {
        setOpenDropdown(prev => (prev === classId ? null : classId));
    };

    // Helper to generate a consistent label for the filter
    const getFilterLabel = (cls: Class, subLabel?: string) => `${cls.name} শ্রেণী ${subLabel ? `- ${subLabel}` : ''}`;

    return (
        <div>
             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                 <h3 className="text-xl font-semibold text-gray-700 mb-4">শ্রেণী নির্বাচন করুন</h3>
                 <div className="flex flex-wrap gap-4 items-start">
                    {classes.sort((a,b) => a.numericName - b.numericName).map(cls => {
                        // Class 6 with sections
                        if (cls.numericName === 6) {
                            return (
                                <div key={cls.id} className="relative">
                                    <button onClick={() => toggleDropdown(cls.id)} className="flex items-center justify-between w-full px-4 py-2 text-left bg-gray-100 rounded-md hover:bg-gray-200">
                                        <span>{cls.name} শ্রেণী</span>
                                        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${openDropdown === cls.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openDropdown === cls.id && (
                                        <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md z-10 p-2 space-y-1">
                                            {sections.map(sec => {
                                                const filter: ActiveFilter = { type: 'section', classId: cls.id, subId: sec.id, label: getFilterLabel(cls, `শাখা ${sec.name}`) };
                                                return <FilterButton key={sec.id} filter={filter} activeFilter={activeFilter} onClick={handleFilterClick} />;
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        // Classes 9 & 10 with groups
                        if (cls.numericName === 9 || cls.numericName === 10) {
                             return (
                                <div key={cls.id} className="relative">
                                    <button onClick={() => toggleDropdown(cls.id)} className="flex items-center justify-between w-full px-4 py-2 text-left bg-gray-100 rounded-md hover:bg-gray-200">
                                        <span>{cls.name} শ্রেণী</span>
                                        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${openDropdown === cls.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openDropdown === cls.id && (
                                        <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md z-10 p-2 space-y-1">
                                            {groups.map(grp => {
                                                const filter: ActiveFilter = { type: 'group', classId: cls.id, subId: grp.id, label: getFilterLabel(cls, grp.name) };
                                                return <FilterButton key={grp.id} filter={filter} activeFilter={activeFilter} onClick={handleFilterClick} />;
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        // Other classes (7, 8)
                        const filter: ActiveFilter = { type: 'class', classId: cls.id, label: getFilterLabel(cls) };
                        return <FilterButton key={cls.id} filter={filter} activeFilter={activeFilter} onClick={handleFilterClick} isDirectButton={true} />;
                    })}
                 </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    শিক্ষার্থী লগইন তথ্য {activeFilter ? `(${activeFilter.label})` : ''}
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Table Head */}
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">রোল</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">লগইন আইডি</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">অবস্থা</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200 font-tiro-bangla">
                            {filteredStudents.map((student) => {
                                const login = loginMap.get(student.studentId);
                                if (!login) {
                                    return null;
                                }
                                const isActive = login.isActive;
                                return (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-hind-siliguri">{student.nameBn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.roll.toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{student.studentId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end space-x-2">
                                         <ToggleSwitch 
                                            id={`student-status-${student.id}`}
                                            checked={isActive}
                                            onChange={(checked) => handleToggleStatus(student.studentId, checked)}
                                        />
                                        <button onClick={() => handleEdit(student)} className="text-indigo-600 hover:text-indigo-900 p-1" title="পাসওয়ার্ড পরিবর্তন করুন">
                                            <PencilIcon className="w-5 h-5"/>
                                        </button>
                                         <button onClick={() => setStudentToDelete(student)} className="text-red-600 hover:text-red-900 p-1" title="লগইন মুছে ফেলুন">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    </td>
                                </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                     {activeFilter && filteredStudents.length === 0 && <p className="text-center py-8 text-gray-500">এই ফিল্টারে কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।</p>}
                     {!activeFilter && <p className="text-center py-8 text-gray-500">অনুগ্রহ করে একটি শ্রেণী নির্বাচন করুন।</p>}
                </div>
            </div>
            
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="পাসওয়ার্ড পরিবর্তন">
                {selectedStudent && (
                     <div className="space-y-4">
                        <p>শিক্ষার্থী: <strong className="font-semibold">{selectedStudent.nameBn}</strong></p>
                         <p className="font-tiro-bangla">আইডি: <strong className="font-semibold">{selectedStudent.studentId}</strong></p>
                        <div>
                            <label htmlFor="student-password" className="block text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input 
                                    id="student-password"
                                    type="text" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="font-tiro-bangla flex-1 block w-full min-w-0 px-3 py-2 border border-gray-300 rounded-none rounded-l-md focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPassword(selectedStudent.studentId)}
                                    className="relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary"
                                >
                                    <span>আইডি-তে রিসেট করুন</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                            <button type="button" onClick={handleSave} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">সংরক্ষণ</button>
                        </div>
                    </div>
                )}
            </Modal>
             <ConfirmationDialog
                isOpen={!!studentToDelete}
                onClose={() => setStudentToDelete(null)}
                onConfirm={confirmDelete}
                title="লগইন মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে শিক্ষার্থী <strong className="font-bold">{studentToDelete?.nameBn}</strong> এর লগইন তথ্য মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Helper component for filter buttons to avoid repetition
const FilterButton: React.FC<{
    filter: ActiveFilter;
    activeFilter: ActiveFilter | null;
    onClick: (filter: ActiveFilter) => void;
    isDirectButton?: boolean;
}> = ({ filter, activeFilter, onClick, isDirectButton }) => {
    const isActive = activeFilter?.label === filter.label;
    const baseClasses = isDirectButton
        ? "px-4 py-2 rounded-md"
        : "w-full text-left px-3 py-2 rounded-md text-sm";
    const activeClasses = "bg-brand-primary text-white";
    const inactiveClasses = "bg-gray-100 hover:bg-gray-200 text-gray-800";
    
    return (
        <button
            onClick={() => onClick(filter)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {isDirectButton ? filter.label : filter.label.split('- ')[1]}
        </button>
    );
};

export default StudentLoginManager;