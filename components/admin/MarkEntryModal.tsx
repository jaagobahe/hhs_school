import React, { useState, useEffect, useMemo } from 'react';
import type { Student, Subject, Result, Mark } from '../../types';
import Modal from '../common/Modal';
import { getGradePoint, getGradeLetter, calculateTotalGpa } from '../common/grading';

interface MarkEntryModalProps {
    student: Student;
    subjects: Subject[];
    exam: string;
    year: number;
    existingResult: Result | null;
    onSave: (result: Result) => void;
    onCancel: () => void;
}

// Defines the structure for mark inputs and their calculated values
type MarkInput = {
    cq: number;
    mcq: number;
    total: number;
    grade: string;
};

// Defines the structure for validation errors
type MarkError = {
    cq?: string;
    mcq?: string;
};

// Improved MarkEntryModal with real-time validation, GPA calculation, and a better UI.
const MarkEntryModal: React.FC<MarkEntryModalProps> = ({ student, subjects, exam, year, existingResult, onSave, onCancel }) => {
    // State to hold the marks for each subject. Using a Map for efficient lookups.
    const [marks, setMarks] = useState<Map<number, MarkInput>>(new Map());
    // State to hold validation errors for each subject.
    const [errors, setErrors] = useState<Map<number, MarkError>>(new Map());

    // Effect to initialize the marks state from existing results or set up a clean slate.
    useEffect(() => {
        const initialMarks = new Map<number, MarkInput>();
        subjects.forEach(subject => {
            const existingMark = existingResult?.marks.find(m => m.subjectId === subject.id);
            const cq = existingMark?.cq || 0;
            const mcq = existingMark?.mcq || 0;
            const total = cq + mcq;
            const grade = getGradeLetter(total);
            initialMarks.set(subject.id, { cq, mcq, total, grade });
        });
        setMarks(initialMarks);
    }, [existingResult, subjects]);

    // Memoized calculation for the overall GPA, which updates whenever marks change.
    const finalResult = useMemo(() => {
        if (marks.size === 0) return { gpa: 0, grade: 'N/A' };

        const subjectGpas = Array.from(marks.entries()).map(([subjectId, mark]) => {
            const isOptional = student.groupId === 1 && (
                (student.classId === 10 && subjectId === 10) || // Higher Math Class 10
                (student.classId === 9 && subjectId === 50)     // Higher Math Class 9
            );
            return {
                gpa: getGradePoint(mark.total),
                isOptional: isOptional,
            };
        });

        return calculateTotalGpa(subjectGpas);
    }, [marks, student.classId, student.groupId]);
    
    // Memoized value to check if there are any validation errors.
    const hasErrors = useMemo(() => {
        for (const error of errors.values()) {
            if (error.cq || error.mcq) return true;
        }
        return false;
    }, [errors]);

    // Validates the marks for a single subject and updates the error state.
    const validateMark = (subjectId: number, mark: MarkInput) => {
        const newErrors = new Map(errors);
        const subjectErrors: MarkError = {};
        
        if (mark.cq < 0 || mark.cq > 70) {
            subjectErrors.cq = '0-70 এর মধ্যে হতে হবে';
        }
        if (mark.mcq < 0 || mark.mcq > 30) {
            subjectErrors.mcq = '0-30 এর মধ্যে হতে হবে';
        }

        if (Object.keys(subjectErrors).length > 0) {
            newErrors.set(subjectId, subjectErrors);
        } else {
            newErrors.delete(subjectId);
        }
        setErrors(newErrors);
    };

    // Handles changes in mark input fields, updates state, and triggers validation.
    const handleMarkChange = (subjectId: number, field: 'cq' | 'mcq', value: string) => {
        const numValue = value === '' ? 0 : parseInt(value, 10);
        
        if (isNaN(numValue)) return; // Ignore non-numeric input
    
        const newMarks = new Map(marks);
        const currentMark = newMarks.get(subjectId) || { cq: 0, mcq: 0, total: 0, grade: 'F' };
        
        // Create a new object to avoid state mutation. This explicit approach is more robust.
        const nextMark: MarkInput = {
            cq: field === 'cq' ? numValue : currentMark.cq,
            mcq: field === 'mcq' ? numValue : currentMark.mcq,
            total: 0, // will be recalculated
            grade: 'F', // will be recalculated
        };
        nextMark.total = nextMark.cq + nextMark.mcq;
        nextMark.grade = getGradeLetter(nextMark.total);
    
        newMarks.set(subjectId, nextMark);
        setMarks(newMarks);
        
        validateMark(subjectId, nextMark);
    };


    // Handles the final submission of the form.
    const handleSubmit = () => {
        // Run validation for all fields one last time
        let isValid = true;
        marks.forEach((mark, subjectId) => {
            const subjectErrors: MarkError = {};
            if (mark.cq < 0 || mark.cq > 70) { subjectErrors.cq = '0-70'; isValid = false; }
            if (mark.mcq < 0 || mark.mcq > 30) { subjectErrors.mcq = '0-30'; isValid = false; }
            if(!isValid) errors.set(subjectId, subjectErrors);
        });

        if (!isValid) {
            setErrors(new Map(errors));
            return;
        }

        // FIX: Explicitly type `mark` to `MarkInput` to resolve type inference issue.
        const marksArray: Mark[] = Array.from(marks.entries()).map(([subjectId, mark]: [number, MarkInput]) => ({
            subjectId,
            cq: mark.cq,
            mcq: mark.mcq,
        }));

        const resultData: Result = {
            id: existingResult?.id || Date.now(),
            studentId: student.studentId,
            exam,
            year,
            marks: marksArray,
            isOptional: (subjectId: number): boolean => {
                if (student.groupId !== 1) return false;
                return (student.classId === 10 && subjectId === 10) || (student.classId === 9 && subjectId === 50);
            },
        };
        onSave(resultData);
    };

    return (
        <Modal
            isOpen={true}
            onClose={onCancel}
            title={<>{student.nameBn} (রোল: <span className="font-tiro-bangla">{student.roll.toLocaleString('bn-BD')}</span>) - নম্বর এন্ট্রি</>}
            size="lg"
        >
            <div className="max-h-[60vh] overflow-y-auto pr-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">বিষয়</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">লিখিত (৭০)</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">বহুনির্বাচনি (৩০)</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">মোট (১০০)</th>
                             <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">গ্রেড</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 font-tiro-bangla">
                        {subjects.map(subject => {
                            const mark = marks.get(subject.id) || { cq: 0, mcq: 0, total: 0, grade: 'F' };
                            const error = errors.get(subject.id) || {};
                            return (
                                <tr key={subject.id}>
                                    <td className="px-4 py-2 whitespace-nowrap font-hind-siliguri font-medium">{subject.name}</td>
                                    <td className="px-4 py-2">
                                        <MarkInputComponent 
                                            value={mark.cq}
                                            onChange={e => handleMarkChange(subject.id, 'cq', e.target.value)}
                                            error={error.cq}
                                            max={70}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                         <MarkInputComponent 
                                            value={mark.mcq}
                                            onChange={e => handleMarkChange(subject.id, 'mcq', e.target.value)}
                                            error={error.mcq}
                                            max={30}
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center font-semibold text-lg">
                                        {mark.total.toLocaleString('bn-BD')}
                                    </td>
                                    <td className="px-4 py-2 text-center font-semibold text-lg font-sans">
                                        {mark.grade}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center pt-4 mt-4 border-t">
                <div className="font-bold text-xl font-tiro-bangla">
                    <span>সর্বমোট GPA: </span>
                    <span className={finalResult.grade === 'F' ? 'text-red-600' : 'text-green-600'}>
                        {finalResult.grade === 'F' ? 'F' : finalResult.gpa.toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
                    </span>
                </div>
                <div className="flex space-x-3">
                    <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                    <button 
                        type="button" 
                        onClick={handleSubmit} 
                        className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                        disabled={hasErrors}
                    >
                        সংরক্ষণ করুন
                    </button>
                </div>
            </div>
             {hasErrors && <p className="text-red-500 text-sm text-right mt-2">অনুগ্রহ করে সকল ভুল সংশোধন করুন।</p>}
        </Modal>
    );
};

// A sub-component for the mark input field to handle styling and error display.
const MarkInputComponent: React.FC<{
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    max: number;
}> = ({ value, onChange, error, max }) => (
    <div className="relative flex flex-col items-center">
        <input
            type="number"
            value={value === 0 ? '' : value}
            onChange={onChange}
            min="0"
            max={max}
            className={`font-tiro-bangla w-24 p-1 text-center border rounded-md ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
            aria-invalid={!!error}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
);


export default MarkEntryModal;
