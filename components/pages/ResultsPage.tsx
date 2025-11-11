import React, { useState, useMemo } from 'react';
import type { SscResult, Result, Student, Subject, Class } from '../../types';
import StudentResultCard from '../StudentResultCard';
import SearchIcon from '../icons/SearchIcon';

interface ResultsPageProps {
    sscResults: SscResult[];
    results: Result[];
    students: Student[];
    subjects: Subject[];
    classes: Class[];
}

const individualExams = [
    { value: 'অর্ধ বার্ষিক', label: 'অর্ধ-বার্ষিক পরীক্ষা' },
    { value: 'বার্ষিক', label: 'বার্ষিক পরীক্ষা' },
    { value: 'প্রাক নির্বাচনী', label: 'প্রাক-নির্বাচনী পরীক্ষা' },
];

const ResultsPage: React.FC<ResultsPageProps> = ({ sscResults, results, students, subjects, classes }) => {
    const [exam, setExam] = useState(individualExams[0].value);
    const [year, setYear] = useState(2025);
    const [roll, setRoll] = useState('');
    const [searchClassId, setSearchClassId] = useState<string>(classes[0]?.id.toString() || '');
    const [foundResult, setFoundResult] = useState<Result | null>(null);
    const [searched, setSearched] = useState(false);

    const studentMap = useMemo(() => new Map(students.map(s => [s.studentId, s])), [students]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
        setFoundResult(null); 

        if (!searchClassId || !roll) {
            return;
        }

        const student = students.find(s => 
            s.classId === Number(searchClassId) && 
            s.roll === Number(roll)
        );

        if (student) {
            const result = results.find(r => 
                r.studentId === student.studentId && 
                r.exam === exam && 
                r.year === Number(year)
            );
            setFoundResult(result || null);
        } else {
            setFoundResult(null);
        }
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">ফলাফল</h2>

                {/* Individual Result Search */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-16 border border-gray-200">
                    <h3 className="text-2xl font-bold text-center text-brand-secondary mb-8">শিক্ষার্থীর ফলাফল অনুসন্ধান</h3>
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label htmlFor="exam-select" className="block text-sm font-medium text-gray-700 mb-1">পরীক্ষা</label>
                                <select id="exam-select" value={exam} onChange={e => setExam(e.target.value)} className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm rounded-md shadow-sm font-tiro-bangla">
                                    {individualExams.map(ex => (
                                        <option key={ex.value} value={ex.value}>{ex.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="year-input" className="block text-sm font-medium text-gray-700 mb-1">সাল</label>
                                <input id="year-input" type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm font-tiro-bangla" placeholder="যেমন: ২০২৫"/>
                            </div>
                            <div>
                                <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-1">শ্রেণী</label>
                                <select id="class-select" value={searchClassId} onChange={e => setSearchClassId(e.target.value)} className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm rounded-md shadow-sm font-tiro-bangla">
                                    {classes.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="roll-input" className="block text-sm font-medium text-gray-700 mb-1">রোল নম্বর</label>
                                <input id="roll-input" type="text" value={roll} onChange={e => setRoll(e.target.value)} className="block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm font-tiro-bangla" placeholder="যেমন: ১" />
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <button type="submit" className="inline-flex items-center justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105">
                                <SearchIcon className="w-5 h-5 mr-3 -ml-1" />
                                ফলাফল দেখুন
                            </button>
                        </div>
                    </form>
                    
                    {searched && (
                        <div className="mt-8">
                            {foundResult && studentMap.has(foundResult.studentId) ? (
                                <StudentResultCard 
                                    result={foundResult} 
                                    student={studentMap.get(foundResult.studentId)!}
                                    subjects={subjects}
                                    classes={classes}
                                />
                            ) : (
                                <p className="text-center text-red-600 bg-red-100 p-4 rounded-md">দুঃখিত, আপনার দেওয়া তথ্যের সাথে মিলে এমন কোনো ফলাফল পাওয়া যায়নি।</p>
                            )}
                        </div>
                    )}

                </div>


                {/* SSC Results */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-center text-brand-secondary mb-6">এস.এস.সি পরীক্ষার ফলাফল</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3.5 px-4 text-sm font-semibold text-gray-700">সাল</th>
                                    <th className="py-3.5 px-4 text-sm font-semibold text-gray-700">মোট পরীক্ষার্থী</th>
                                    <th className="py-3.5 px-4 text-sm font-semibold text-gray-700">কৃতকার্য</th>
                                    <th className="py-3.5 px-4 text-sm font-semibold text-gray-700">পাশের হার</th>
                                    <th className="py-3.5 px-4 text-sm font-semibold text-gray-700">জিপিএ-৫</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {sscResults.map((result, index) => (
                                    <tr key={result.year} className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'} hover:bg-yellow-50`}>
                                        <td className="whitespace-nowrap py-4 px-4 text-sm font-bold text-brand-primary font-tiro-bangla">
                                            {result.year.toLocaleString('bn-BD', { useGrouping: false })}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-800 font-tiro-bangla">
                                            {result.candidates.toLocaleString('bn-BD', { useGrouping: false })}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-800 font-tiro-bangla">
                                            {result.passed.toLocaleString('bn-BD', { useGrouping: false })}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-800 font-tiro-bangla">
                                            {result.passRate.toLocaleString('bn-BD', { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-800 font-tiro-bangla">
                                            {result.gpa5.toLocaleString('bn-BD', { useGrouping: false })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;