import React, { useState, useMemo } from 'react';
import type { Student, Class, Section, Group } from '../../../types';
import DocumentPreview from './DocumentPreview';
import Modal from '../../common/Modal';

interface RecommendationLetterProps {
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
}

const RecommendationLetter: React.FC<RecommendationLetterProps> = ({ students, classes, sections, groups }) => {
    const [classId, setClassId] = useState<string>('');
    const [studentId, setStudentId] = useState<string>('');
    const [generatedStudent, setGeneratedStudent] = useState<Student | null>(null);

    const filteredStudents = useMemo(() => {
        if (!classId) return [];
        return students.filter(s => s.classId === Number(classId)).sort((a, b) => a.roll - b.roll);
    }, [students, classId]);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        const student = students.find(s => s.studentId === studentId);
        if (student) {
            setGeneratedStudent(student);
        }
    };

    const renderDocumentContent = (student: Student) => {
        return (
            <>
                <div className="text-center mb-8">
                    <img src="https://picsum.photos/seed/schoollogo/80/80" alt="লোগো" className="h-20 w-20 rounded-full mx-auto" />
                    <h1 className="text-3xl font-bold text-brand-primary mt-2">হরিপুর উচ্চ বিদ্যালয়</h1>
                    <p className="text-sm">EIIN: ১২১৬২৯, স্থাপিত: ১৮৮২</p>
                </div>
                <h2 className="text-2xl font-bold text-center underline my-10">প্রশংসা পত্র</h2>
                <div className="text-lg leading-loose mt-8" style={{ textJustify: 'inter-word', textAlign: 'justify' }}>
                    <p>
                        এই মর্মে প্রশংসা করা যাইতেছে যে, <span className="font-bold">{student.nameBn}</span>, 
                        পিতাঃ <span className="font-bold">{student.fatherNameBn}</span>, 
                        মাতাঃ <span className="font-bold">{student.motherNameBn}</span>,
                        অত্র বিদ্যালয়ের {classes.find(c => c.id === student.classId)?.name} শ্রেণীর একজন মেধাবী ছাত্র ছিল। 
                        তাহার রোল নম্বর {student.roll.toLocaleString('bn-BD', { useGrouping: false })}। 
                        সে লেখাপড়ায় অত্যন্ত মনোযোগী এবং প্রতিটি পরীক্ষায় কৃতিত্বের স্বাক্ষর রাখিয়াছে। 
                        সে খেলাধুলা ও অন্যান্য সহশিক্ষা কার্যক্রমেও সক্রিয়ভাবে অংশগ্রহণ করিয়াছে। 
                        তাহার আচরণ অত্যন্ত ভদ্র ও মার্জিত। সে শিক্ষক ও সহপাঠীদের নিকট অত্যন্ত প্রিয়।
                    </p>
                    <p className="mt-4">
                        আমরা তাহার উজ্জ্বল ভবিষ্যৎ ও সর্বাঙ্গীন সাফল্য কামনা করি।
                    </p>
                </div>
                <div className="flex justify-end mt-24">
                    <div className="text-center">
                        <img src="https://i.ibb.co/6wm0vQt/signature.png" alt="Signature" className="h-12" />
                        <p className="border-t-2 border-gray-700 pt-1 font-semibold">প্রধান শিক্ষক</p>
                    </div>
                </div>
            </>
        )
    };

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-brand-primary mb-6">প্রশংসা পত্র জেনারেট</h3>
                <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <label htmlFor="class-select" className="block text-sm font-medium text-gray-700">শ্রেণী নির্বাচন করুন</label>
                        <select id="class-select" value={classId} onChange={e => { setClassId(e.target.value); setStudentId(''); }} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                            <option value="">-- শ্রেণী --</option>
                            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="student-select" className="block text-sm font-medium text-gray-700">শিক্ষার্থী নির্বাচন করুন</label>
                        <select id="student-select" value={studentId} onChange={e => setStudentId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md" disabled={!classId} required>
                            <option value="">-- শিক্ষার্থী --</option>
                            {filteredStudents.map(s => <option key={s.id} value={s.studentId}>{s.roll.toLocaleString('bn-BD')} - {s.nameBn}</option>)}
                        </select>
                    </div>
                    <div className="text-right pt-4">
                        <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary" disabled={!studentId}>
                            জেনারেট করুন
                        </button>
                    </div>
                </form>
            </div>
            {generatedStudent && (
                 <Modal isOpen={!!generatedStudent} onClose={() => setGeneratedStudent(null)} title="জেনারেটেড ডকুমেন্ট" size="lg">
                    <DocumentPreview title="Recommendation-Letter" docId={generatedStudent.studentId}>
                        {renderDocumentContent(generatedStudent)}
                    </DocumentPreview>
                </Modal>
            )}
        </>
    );
};

export default RecommendationLetter;