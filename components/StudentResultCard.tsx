import React, { useMemo } from 'react';
import type { Result, Student, Subject, Class } from '../types';
import { getGradePoint, getGradeLetter, calculateTotalGpa } from './common/grading';

interface StudentResultCardProps {
    result: Result;
    student: Student;
    subjects: Subject[];
    classes: Class[];
}

const StudentResultCard: React.FC<StudentResultCardProps> = ({ result, student, subjects, classes }) => {
    
    const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);
    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);

    const processedMarks = useMemo(() => {
        return result.marks.map(mark => {
            const total = mark.cq + mark.mcq;
            const gpa = getGradePoint(total);
            const grade = getGradeLetter(total);
            const isOptional = result.isOptional ? result.isOptional(mark.subjectId) : false;
            return {
                ...mark,
                subjectName: subjectMap.get(mark.subjectId) || 'Unknown Subject',
                total,
                gpa,
                grade,
                isOptional
            };
        });
    }, [result.marks, subjectMap, result.isOptional]);

    const finalResult = useMemo(() => {
        const subjectGpas = processedMarks.map(m => ({ gpa: m.gpa, isOptional: m.isOptional }));
        return calculateTotalGpa(subjectGpas);
    }, [processedMarks]);

    return (
        <div className="bg-white border-4 border-brand-primary p-6 rounded-lg shadow-2xl font-hind-siliguri">
            <div className="text-center pb-4 border-b-2 border-gray-200">
                <h3 className="text-2xl font-bold text-brand-primary">হরিপুর উচ্চ বিদ্যালয়</h3>
                <p>একাডেমিক ট্রান্সক্রিপ্ট</p>
                <p className="font-semibold text-lg">{result.exam} পরীক্ষা - <span className="font-tiro-bangla">{result.year.toLocaleString('bn-BD', { useGrouping: false })}</span></p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                <div><span className="font-semibold">শিক্ষার্থীর নাম:</span> {student.nameBn}</div>
                <div><span className="font-semibold">আইডি:</span> <span className="font-tiro-bangla">{student.studentId}</span></div>
                <div><span className="font-semibold">রোল:</span> <span className="font-tiro-bangla">{student.roll.toLocaleString('bn-BD', { useGrouping: false })}</span></div>
                <div><span className="font-semibold">শ্রেণী:</span> {classMap.get(student.classId)}</div>
                <div><span className="font-semibold">পিতার নাম:</span> {student.fatherNameBn}</div>
                <div className={`font-bold text-xl ${finalResult.grade === 'F' ? 'text-red-500' : 'text-green-600'}`}>
                    ফলাফল: {finalResult.grade === 'F' ? 'অকৃতকার্য' : <>জি পি এ - <span className="font-tiro-bangla">{finalResult.gpa.toLocaleString('bn-BD', {minimumFractionDigits: 2})}</span></>}
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full border text-center">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">বিষয়</th>
                            <th className="p-2 border">পূর্ণ নম্বর</th>
                            <th className="p-2 border">প্রাপ্ত নম্বর</th>
                            <th className="p-2 border">গ্রেড লেটার</th>
                            <th className="p-2 border">গ্রেড পয়েন্ট</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedMarks.map(mark => (
                            <tr key={mark.subjectId} className="border-t">
                                <td className="p-2 border text-left">{mark.subjectName} {mark.isOptional && '(ঐচ্ছিক)'}</td>
                                <td className="p-2 border font-tiro-bangla">১০০</td>
                                <td className="p-2 border font-tiro-bangla">{mark.total.toLocaleString('bn-BD', { useGrouping: false })}</td>
                                <td className="p-2 border">{mark.grade}</td>
                                <td className="p-2 border font-tiro-bangla">{mark.gpa.toLocaleString('bn-BD', {minimumFractionDigits: 2})}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             <div className="text-xs text-gray-500 mt-4 text-center">
                এটি একটি সিস্টেম জেনারেটেড মার্কশিট । কোনো অসঙ্গতি থাকলে বিদ্যালয় কর্তৃপক্ষের সাথে যোগাযোগ করুন।
            </div>
        </div>
    );
};

export default StudentResultCard;