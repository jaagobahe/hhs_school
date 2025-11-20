import React, { useState, useMemo, useEffect } from 'react';
import type { Teacher, Student, Class, Section, Group, Subject, Result, Mark } from '../../types';
import { getGradeLetter } from '../common/grading';

interface MyStudentsProps {
    teacher: Teacher;
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    subjects: Subject[];
    results: Result[];
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

const examOptions = ["অর্ধ বার্ষিক", "বার্ষিক", "প্রাক নির্বাচনী"];

const MyStudents: React.FC<MyStudentsProps> = ({ teacher, students, classes, sections, groups, subjects, results, setResults }) => {
    const [selectedAssignmentIndex, setSelectedAssignmentIndex] = useState<string>('0');
    const [exam, setExam] = useState(examOptions[0]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [marks, setMarks] = useState<Map<string, { cq: string, mcq: string }>>(new Map());

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    const sectionMap = useMemo(() => new Map(sections.map(s => [s.id, s.name])), [sections]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);
    const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);
    
    const selectedAssignment = useMemo(() => {
        if (!teacher.assignments || teacher.assignments.length === 0) return null;
        return teacher.assignments[parseInt(selectedAssignmentIndex)];
    }, [teacher.assignments, selectedAssignmentIndex]);

    const selectedSubjectName = useMemo(() => {
        if (!selectedAssignment) return null;
        return subjectMap.get(selectedAssignment.subjectId);
    }, [selectedAssignment, subjectMap]);

    const filteredStudents = useMemo(() => {
        if (!selectedAssignment) return [];
        return students.filter(student => 
            student.classId === selectedAssignment.classId &&
            student.sectionId === selectedAssignment.sectionId &&
            (selectedAssignment.groupId === undefined || selectedAssignment.groupId === null || student.groupId === selectedAssignment.groupId)
        ).sort((a,b) => a.roll - b.roll);
    }, [students, selectedAssignment]);

    useEffect(() => {
        const newMarks = new Map<string, { cq: string, mcq: string }>();
        if (selectedAssignment) {
            filteredStudents.forEach(student => {
                const studentResult = results.find(r => r.studentId === student.studentId && r.exam === exam && r.year === year);
                const subjectMark = studentResult?.marks.find(m => m.subjectId === selectedAssignment.subjectId);
                newMarks.set(student.studentId, {
                    cq: subjectMark?.cq.toString() || '',
                    mcq: subjectMark?.mcq.toString() || '',
                });
            });
        }
        setMarks(newMarks);
    }, [filteredStudents, results, exam, year, selectedAssignment]);

    const handleMarkChange = (studentId: string, field: 'cq' | 'mcq', value: string) => {
        const newMarks = new Map(marks);
        const currentMarks: { cq: string, mcq: string } = newMarks.get(studentId) || { cq: '', mcq: '' };
        
        const newMark = {
            cq: field === 'cq' ? value : currentMarks.cq,
            mcq: field === 'mcq' ? value : currentMarks.mcq,
        };

        newMarks.set(studentId, newMark);
        setMarks(newMarks);
    };

    const handleSaveAll = () => {
        setResults(prevResults => {
            const updatedResults = [...prevResults];

            filteredStudents.forEach(student => {
                const studentMarks = marks.get(student.studentId);
                if (!studentMarks || (studentMarks.cq === '' && studentMarks.mcq === '')) return;

                const cq = parseInt(studentMarks.cq, 10) || 0;
                const mcq = parseInt(studentMarks.mcq, 10) || 0;
                
                let resultIndex = updatedResults.findIndex(r => r.studentId === student.studentId && r.exam === exam && r.year === year);
                
                let newResult: Result;
                if (resultIndex === -1) {
                    newResult = {
                        id: Date.now() + Math.random(),
                        studentId: student.studentId,
                        exam,
                        year,
                        marks: [],
                    };
                } else {
                    // Create a deep enough copy to avoid direct state mutation.
                    const existingResult = updatedResults[resultIndex];
                    newResult = {
                        ...existingResult,
                        marks: [...existingResult.marks], // Create a new array for marks
                    };
                }

                const markIndex = newResult.marks.findIndex(m => m.subjectId === selectedAssignment!.subjectId);
                const newMark: Mark = { subjectId: selectedAssignment!.subjectId, cq, mcq };

                if (markIndex === -1) {
                    newResult.marks.push(newMark);
                } else {
                    newResult.marks[markIndex] = newMark;
                }

                if (resultIndex === -1) {
                    updatedResults.push(newResult);
                } else {
                    updatedResults[resultIndex] = newResult;
                }
            });
            return updatedResults;
        });
        alert('সকল শিক্ষার্থীর নম্বর সফলভাবে সংরক্ষণ করা হয়েছে।');
    };

    if (!teacher.assignments || teacher.assignments.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-semibold text-brand-primary">আমার ছাত্রছাত্রী</h3>
                <p className="mt-4 text-gray-600">আপনাকে এখনো কোনো ক্লাসের দায়িত্ব দেওয়া হয়নি।</p>
            </div>
        );
    }
    
    return (
        <div>
             <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <label htmlFor="assignment-select" className="block text-sm font-medium text-gray-700 mb-1">ক্লাস ও বিষয়</label>
                         <select 
                            id="assignment-select"
                            value={selectedAssignmentIndex}
                            onChange={(e) => setSelectedAssignmentIndex(e.target.value)}
                            className="w-full h-10 pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                         >
                             {teacher.assignments.map((assignment, index) => {
                                 const className = classMap.get(assignment.classId) || '';
                                 const sectionName = sectionMap.get(assignment.sectionId) || '';
                                 const subjectName = subjectMap.get(assignment.subjectId) || '';
                                 const groupName = assignment.groupId ? `(${groupMap.get(assignment.groupId)})` : '';
                                 return <option key={index} value={index}>{`${className} - ${sectionName} | ${subjectName} ${groupName}`}</option>;
                             })}
                         </select>
                     </div>
                     <div>
                         <label htmlFor="exam-select" className="block text-sm font-medium text-gray-700 mb-1">পরীক্ষা</label>
                         <select id="exam-select" value={exam} onChange={e => setExam(e.target.value)} className="w-full h-10 pl-3 pr-10 py-2 border border-gray-300 rounded-md">
                            {examOptions.map(o => <option key={o} value={o}>{o}</option>)}
                         </select>
                     </div>
                     <div>
                         <label htmlFor="year-input" className="block text-sm font-medium text-gray-700 mb-1">সাল</label>
                         <input id="year-input" type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="font-tiro-bangla w-full h-10 px-3 py-2 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">নম্বর এন্ট্রি শিট ({filteredStudents.length.toLocaleString('bn-BD')} জন)</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">রোল</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">লিখিত (৭০)</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">বহুনির্বাচনি (৩০)</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">মোট (১০০)</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">গ্রেড</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 font-tiro-bangla">
                            {filteredStudents.map(student => {
                                const studentMarks = marks.get(student.studentId) || { cq: '', mcq: '' };
                                const cq = parseInt(studentMarks.cq, 10) || 0;
                                const mcq = parseInt(studentMarks.mcq, 10) || 0;
                                const total = cq + mcq;
                                const grade = getGradeLetter(total);

                                const isIslamicSubject = selectedSubjectName === 'ইসলাম ধর্ম';
                                const isHinduSubject = selectedSubjectName === 'হিন্দু ধর্ম';
                                const isEntryDisabled = 
                                    (student.religion === 'hindu' && isIslamicSubject) ||
                                    (student.religion === 'islam' && isHinduSubject);
                                
                                return (
                                <tr key={student.id}>
                                    <td className="px-4 py-2 font-tiro-bangla">{student.roll.toLocaleString('bn-BD')}</td>
                                    <td className="px-4 py-2 font-hind-siliguri font-medium">{student.nameBn}</td>
                                    <td className="px-4 py-2"><input type="number" value={studentMarks.cq} onChange={e => handleMarkChange(student.studentId, 'cq', e.target.value)} className="font-tiro-bangla w-20 p-1 text-center border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed" disabled={isEntryDisabled}/></td>
                                    <td className="px-4 py-2"><input type="number" value={studentMarks.mcq} onChange={e => handleMarkChange(student.studentId, 'mcq', e.target.value)} className="font-tiro-bangla w-20 p-1 text-center border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed" disabled={isEntryDisabled}/></td>
                                    <td className="px-4 py-2 text-center font-semibold">{total > 0 ? total.toLocaleString('bn-BD') : ''}</td>
                                    <td className="px-4 py-2 text-center font-semibold font-sans">{total > 0 ? grade : ''}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={handleSaveAll} className="py-2 px-6 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                        সকল নম্বর সংরক্ষণ করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyStudents;