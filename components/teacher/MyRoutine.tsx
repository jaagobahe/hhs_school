import React, { useMemo } from 'react';
import type { Teacher, Class, Section, Group, Subject } from '../../types';

interface MyRoutineProps {
    teacher: Teacher;
    classes: Class[];
    sections: Section[];
    groups: Group[];
    subjects: Subject[];
}

const MyRoutine: React.FC<MyRoutineProps> = ({ teacher, classes, sections, groups, subjects }) => {
    
    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    const sectionMap = useMemo(() => new Map(sections.map(s => [s.id, s.name])), [sections]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);
    const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);
    
    if (!teacher.assignments || teacher.assignments.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-semibold text-brand-primary">আমার রুটিন</h3>
                <p className="mt-4 text-gray-600">আপনার জন্য কোনো ক্লাস রুটিন এখনো তৈরি করা হয়নি।</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-brand-primary mb-4 border-b pb-4">আমার ক্লাস রুটিন</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শ্রেণী</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শাখা</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">বিষয়</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">বিভাগ</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {teacher.assignments.map((assignment, index) => {
                             const className = classMap.get(assignment.classId) || 'N/A';
                             const sectionName = sectionMap.get(assignment.sectionId) || 'N/A';
                             const subjectName = subjectMap.get(assignment.subjectId) || 'N/A';
                             const groupName = assignment.groupId ? groupMap.get(assignment.groupId) : 'সকলের জন্য';

                            return (
                                <tr key={index}>
                                    <td className="px-6 py-4 font-medium">{className}</td>
                                    <td className="px-6 py-4">{sectionName}</td>
                                    <td className="px-6 py-4">{subjectName}</td>
                                    <td className="px-6 py-4">{groupName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
             <p className="text-sm text-gray-500 mt-4">* এটি আপনার নির্ধারিত ক্লাসের তালিকা। সম্পূর্ণ সময়সূচী পেতে অফিস কক্ষে যোগাযোগ করুন।</p>
        </div>
    );
};

export default MyRoutine;