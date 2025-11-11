import React, { useState, useMemo } from 'react';
import type { Student, Class, Section, Group } from '../../../types';
import DocumentPreview from './DocumentPreview';
import Modal from '../../common/Modal';

interface TransferCertificateProps {
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
}

const TransferCertificate: React.FC<TransferCertificateProps> = ({ students, classes, sections, groups }) => {
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
        const admissionYear = new Date(student.admissionDate).getFullYear().toLocaleString('bn-BD', { useGrouping: false });
        const currentYear = new Date().getFullYear().toLocaleString('bn-BD', { useGrouping: false });
        const dob = new Date(student.dob).toLocaleDateString('bn-BD');

        return (
            <>
                <div className="text-center mb-8">
                    <img src="https://picsum.photos/seed/schoollogo/80/80" alt="লোগো" className="h-20 w-20 rounded-full mx-auto" />
                    <h1 className="text-3xl font-bold text-brand-primary mt-2">হরিপুর উচ্চ বিদ্যালয়</h1>
                    <p className="text-sm">EIIN: ১২১৬২৯, স্থাপিত: ১৮৮২</p>
                </div>
                <h2 className="text-2xl font-bold text-center underline my-8">ছাড়পত্র</h2>
                <div className="flex justify-between text-sm mb-8">
                    <span>ক্রমিক নং: ............</span>
                    <span>তারিখ: {new Date().toLocaleDateString('bn-BD')}</span>
                </div>
                <div className="text-lg leading-loose mt-4" style={{ textJustify: 'inter-word', textAlign: 'justify' }}>
                    <p>
                        এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <span className="font-bold">{student.nameBn}</span>, 
                        পিতাঃ <span className="font-bold">{student.fatherNameBn}</span>, 
                        মাতাঃ <span className="font-bold">{student.motherNameBn}</span>,
                        অত্র বিদ্যালয়ের {classes.find(c => c.id === student.classId)?.name} শ্রেণীর একজন নিয়মিত ছাত্র ছিল। 
                        তাহার জন্ম তারিখ {dob}। সে {admissionYear} সালে অত্র বিদ্যালয়ে ভর্তি হইয়া {currentYear} সাল পর্যন্ত অধ্যয়ন করিয়াছে। 
                        তাহার পরীক্ষার রোল নম্বর ছিল {student.roll.toLocaleString('bn-BD', { useGrouping: false })}।
                    </p>
                    <p className="mt-4">
                         বিদ্যালয়ের अभिलेख অনুযায়ী তাহার নৈতিক চরিত্র উন্নত এবং সে विद्यालयের কোনো পাওনা পরিশোধ করিতে বাকি নাই।
                    </p>
                    <p className="mt-4">
                        আমরা তাহার উজ্জ্বল ভবিষ্যৎ কামনা করি।
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
    }

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-brand-primary mb-6">ছাড়পত্র জেনারেট</h3>
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
                    <DocumentPreview title="Transfer-Certificate" docId={generatedStudent.studentId}>
                        {renderDocumentContent(generatedStudent)}
                    </DocumentPreview>
                </Modal>
            )}
        </>
    );
};

export default TransferCertificate;