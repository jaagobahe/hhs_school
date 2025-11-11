import React, { useState, useMemo } from 'react';
import type { Student, Result, Subject, Class } from '../../types';
import StudentResultCard from '../StudentResultCard';
import Modal from '../common/Modal';
import EyeIcon from '../icons/EyeIcon';

interface StudentResultsViewerProps {
    student: Student;
    results: Result[];
    subjects: Subject[];
    classes: Class[];
}

const StudentResultsViewer: React.FC<StudentResultsViewerProps> = ({ student, results, subjects, classes }) => {
    const [selectedResult, setSelectedResult] = useState<Result | null>(null);

    const studentResults = useMemo(() => {
        return results.filter(r => r.studentId === student.studentId)
                      .sort((a, b) => b.year - a.year);
    }, [results, student.studentId]);

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-brand-primary mb-4 border-b pb-4">আমার পরীক্ষার ফলাফল</h3>
                {studentResults.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পরীক্ষার নাম</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">সাল</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {studentResults.map(result => (
                                    <tr key={result.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.exam}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-tiro-bangla">{result.year.toLocaleString('bn-BD')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button 
                                                onClick={() => setSelectedResult(result)} 
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                                            >
                                                <EyeIcon className="w-4 h-4 mr-2" />
                                                মার্কশিট দেখুন
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center py-8 text-gray-500">আপনার কোনো পরীক্ষার ফলাফল এখনো প্রকাশিত হয়নি।</p>
                )}
            </div>

            {selectedResult && (
                <Modal isOpen={true} onClose={() => setSelectedResult(null)} title="একাডেমিক ট্রান্সক্রিপ্ট" size="lg">
                    <StudentResultCard 
                        result={selectedResult}
                        student={student}
                        subjects={subjects}
                        classes={classes}
                    />
                </Modal>
            )}
        </div>
    );
};

export default StudentResultsViewer;