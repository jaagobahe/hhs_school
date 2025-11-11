import React, { useState, useMemo } from 'react';
import type { Student, Subject, Class, Section, Group, Result, Mark } from '../../types';
import { calculateTotalGpa, getGradePoint } from '../common/grading';
import MarkEntryModal from './MarkEntryModal';
import ResultViewModal from './ResultViewModal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import EyeIcon from '../icons/EyeIcon';
import PlusIcon from '../icons/PlusIcon';

interface ResultEntryManagerProps {
    students: Student[];
    subjects: Subject[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    results: Result[];
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

const examOptions = ["অর্ধ বার্ষিক", "বার্ষিক", "প্রাক নির্বাচনী"];

const ResultEntryManager: React.FC<ResultEntryManagerProps> = ({ students, subjects, classes, sections, groups, results, setResults }) => {
    const [exam, setExam] = useState(examOptions[0]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [classId, setClassId] = useState<number | ''>(classes[0]?.id || '');
    const [sectionId, setSectionId] = useState<number | ''>(sections[0]?.id || '');
    const [groupId, setGroupId] = useState<number | ''>('');
    
    const [isMarkEntryModalOpen, setIsMarkEntryModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [resultToDelete, setResultToDelete] = useState<Result | null>(null);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c])), [classes]);
    
    const isGroupApplicable = useMemo(() => {
        const selectedClass = classMap.get(Number(classId));
        return selectedClass && selectedClass.numericName >= 9;
    }, [classId, classMap]);
    
    const filteredStudents = useMemo(() => {
        if (!classId || !sectionId) return [];
        return students.filter(s => 
            s.classId === classId && 
            s.sectionId === sectionId &&
            (!isGroupApplicable || s.groupId === groupId)
        ).sort((a,b) => a.roll - b.roll);
    }, [students, classId, sectionId, groupId, isGroupApplicable]);

    const resultsMap = useMemo(() => {
        const map = new Map<string, Result>();
        results.forEach(r => {
            if (r.exam === exam && r.year === year) {
                map.set(r.studentId, r);
            }
        });
        return map;
    }, [results, exam, year]);
    
    const subjectsForClass = useMemo(() => {
         return subjects.filter(sub => 
            sub.classId === classId &&
            (!isGroupApplicable || sub.groupId === null || sub.groupId === groupId)
        );
    }, [subjects, classId, groupId, isGroupApplicable]);
    
    const handleOpenMarkEntry = (student: Student) => {
        setSelectedStudent(student);
        setIsMarkEntryModalOpen(true);
    };

    const handleOpenView = (student: Student) => {
        if (resultsMap.has(student.studentId)) {
            setSelectedStudent(student);
            setIsViewModalOpen(true);
        }
    };
    
    const handleSaveResult = (newResult: Result) => {
        setResults(prevResults => {
            const existingResultIndex = prevResults.findIndex(r => 
                r.studentId === newResult.studentId && 
                r.exam === newResult.exam && 
                r.year === newResult.year
            );

            if (existingResultIndex > -1) {
                const updatedResults = [...prevResults];
                updatedResults[existingResultIndex] = { ...prevResults[existingResultIndex], ...newResult };
                return updatedResults;
            } else {
                return [...prevResults, newResult];
            }
        });
        setIsMarkEntryModalOpen(false);
        setSelectedStudent(null);
    };

    const confirmDelete = () => {
        if (resultToDelete) {
            setResults(results.filter(r => r.id !== resultToDelete.id));
            setResultToDelete(null);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ফলাফল এন্ট্রি</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <SelectField label="পরীক্ষা" value={exam} onChange={e => setExam(e.target.value)} options={examOptions.map(o => ({ value: o, label: o }))} />
                    <InputField label="সাল" type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    <SelectField label="শ্রেণী" value={classId} onChange={e => setClassId(Number(e.target.value))} options={classes.map(c => ({ value: c.id, label: c.name }))} />
                    <SelectField label="শাখা" value={sectionId} onChange={e => setSectionId(Number(e.target.value))} options={sections.map(s => ({ value: s.id, label: s.name }))} />
                    <SelectField label="বিভাগ" value={groupId} onChange={e => setGroupId(Number(e.target.value))} options={[{value: '', label: 'প্রযোজ্য নয়'}, ...groups.map(g => ({ value: g.id, label: g.name }))]} disabled={!isGroupApplicable} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">রোল</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">ফলাফল</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 font-tiro-bangla">
                            {filteredStudents.map(student => {
                                const result = resultsMap.get(student.studentId);
                                const hasResult = !!result;
                                let displayInfo = 'দাখিল হয়নি';

                                if (hasResult) {
                                    const subjectGpas = result.marks.map(mark => {
                                        const total = mark.cq + mark.mcq;
                                        const point = getGradePoint(total);
                                        const isOptional = result.isOptional ? result.isOptional(mark.subjectId) : false;
                                        return { gpa: point, isOptional: isOptional };
                                    });
                                    const finalResult = calculateTotalGpa(subjectGpas);
                                    if (finalResult.grade === 'F') {
                                        displayInfo = 'অকৃতকার্য';
                                    } else {
                                        displayInfo = `GPA: ${finalResult.gpa.toLocaleString('bn-BD', { minimumFractionDigits: 2 })}`;
                                    }
                                }

                                return (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4">{student.roll.toLocaleString('bn-BD')}</td>
                                        <td className="px-6 py-4 font-hind-siliguri">{student.nameBn}</td>
                                        <td className="px-6 py-4 text-center">{displayInfo}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button onClick={() => handleOpenMarkEntry(student)} className={`p-2 rounded-md ${hasResult ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`} title={hasResult ? 'সম্পাদনা করুন' : 'নম্বর এন্ট্রি করুন'}>
                                                {hasResult ? <PencilIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4"/>}
                                            </button>
                                            {hasResult && (
                                                <>
                                                    <button onClick={() => handleOpenView(student)} className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200" title="মার্কশিট দেখুন">
                                                        <EyeIcon className="w-4 h-4"/>
                                                    </button>
                                                     <button onClick={() => setResultToDelete(result)} className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200" title="ফলাফল মুছে ফেলুন">
                                                        <TrashIcon className="w-4 h-4"/>
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                     {filteredStudents.length === 0 && <p className="text-center py-8 text-gray-500">অনুগ্রহ করে শ্রেণী ও শাখা নির্বাচন করুন অথবা এই সেকশনে কোনো শিক্ষার্থী নেই।</p>}
                 </div>
            </div>
            
            {isMarkEntryModalOpen && selectedStudent && (
                 <MarkEntryModal
                    student={selectedStudent}
                    subjects={subjectsForClass.filter(subject => {
                        if (selectedStudent.religion === 'hindu') return subject.name !== 'ইসলাম ধর্ম';
                        if (selectedStudent.religion === 'islam') return subject.name !== 'হিন্দু ধর্ম';
                        // For other religions, exclude both religious subjects
                        if (subject.name === 'ইসলাম ধর্ম' || subject.name === 'হিন্দু ধর্ম') return false;
                        return true;
                    })}
                    exam={exam}
                    year={year}
                    existingResult={resultsMap.get(selectedStudent.studentId) || null}
                    onSave={handleSaveResult}
                    onCancel={() => setIsMarkEntryModalOpen(false)}
                />
            )}

            {isViewModalOpen && selectedStudent && resultsMap.has(selectedStudent.studentId) && (
                <ResultViewModal
                    student={selectedStudent}
                    result={resultsMap.get(selectedStudent.studentId)!}
                    subjects={subjects}
                    classes={classes}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}

            <ConfirmationDialog
                isOpen={!!resultToDelete}
                onClose={() => setResultToDelete(null)}
                onConfirm={confirmDelete}
                title="ফলাফল মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে এই ফলাফলটি মুছে ফেলতে চান? এই পদক্ষেপটি পূর্বাবস্থায় ফেরানো যাবে না।</p>}
            />
        </div>
    );
};

// Helper Components
const InputField = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{props.label}</label>
        <input {...props} />
    </div>
);

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: { value: string | number, label: string }[] }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{props.label}</label>
        <select {...props} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary">
            {props.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

export default ResultEntryManager;