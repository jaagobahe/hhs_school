import React, { useState } from 'react';
import type { Teacher } from '../../../types';
import DocumentPreview from './DocumentPreview';
import Modal from '../../common/Modal';

interface TestimonialTeacherProps {
    teachers: Teacher[];
}

const TestimonialTeacher: React.FC<TestimonialTeacherProps> = ({ teachers }) => {
    const [teacherId, setTeacherId] = useState<string>('');
    const [generatedTeacher, setGeneratedTeacher] = useState<Teacher | null>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        const teacher = teachers.find(t => t.id === Number(teacherId));
        if (teacher) {
            setGeneratedTeacher(teacher);
        }
    };

    const renderDocumentContent = (teacher: Teacher) => {
        const joiningDate = new Date(teacher.joiningDate).toLocaleDateString('bn-BD');

        return (
            <>
                 <div className="text-center mb-8">
                    <img src="https://picsum.photos/seed/schoollogo/80/80" alt="লোগো" className="h-20 w-20 rounded-full mx-auto" />
                    <h1 className="text-3xl font-bold text-brand-primary mt-2">হরিপুর উচ্চ বিদ্যালয়</h1>
                    <p className="text-sm">EIIN: ১২১৬২৯, স্থাপিত: ১৮৮২</p>
                    <p className="text-sm">উজাড় বোচাগাড়ী, সুন্দরগঞ্জ, গাইবান্ধা।</p>
                </div>
                <h2 className="text-2xl font-bold text-center underline my-10">প্রত্যয়ন পত্র</h2>
                <div className="text-lg leading-loose mt-8" style={{ textJustify: 'inter-word', textAlign: 'justify' }}>
                    <p>
                        এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <span className="font-bold">{teacher.name}</span>, 
                        পদবিঃ <span className="font-bold">{teacher.designation}</span>, 
                        এই বিদ্যালয়ে {joiningDate} তারিখ হইতে অদ্যাবধি কর্মরত আছেন। 
                        আমার জানামতে তিনি একজন সৎ, নিষ্ঠাবান ও পরিশ্রমী শিক্ষক। তাহার উপর অর্পিত সকল দায়িত্ব তিনি সততা ও নিষ্ঠার সাথে পালন করেন।
                    </p>
                    <p className="mt-4">
                        আমি তাহার সর্বাঙ্গীন উন্নতি ও উজ্জ্বল ভবিষ্যৎ কামনা করি।
                    </p>
                </div>
                <div className="flex justify-end mt-24">
                    <div className="text-center">
                        <img src="https://i.ibb.co/6wm0vQt/signature.png" alt="Signature" className="h-12" />
                        <p className="border-t-2 border-gray-700 pt-1 font-semibold">প্রধান শিক্ষক</p>
                        <p>হরিপুর উচ্চ বিদ্যালয়</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-brand-primary mb-6">শিক্ষকের প্রত্যয়ন পত্র</h3>
                <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <label htmlFor="teacher-select" className="block text-sm font-medium text-gray-700">শিক্ষক নির্বাচন করুন</label>
                        <select id="teacher-select" value={teacherId} onChange={e => setTeacherId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md" required>
                            <option value="">-- শিক্ষক --</option>
                            {teachers.map(t => <option key={t.id} value={t.id}>{t.name} - {t.designation}</option>)}
                        </select>
                    </div>
                    <div className="text-right pt-4">
                        <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary" disabled={!teacherId}>
                            জেনারেট করুন
                        </button>
                    </div>
                </form>
            </div>
            {generatedTeacher && (
                <Modal isOpen={!!generatedTeacher} onClose={() => setGeneratedTeacher(null)} title="জেনারেটেড ডকুমেন্ট" size="lg">
                    <DocumentPreview title="Teacher-Testimonial" docId={generatedTeacher.id}>
                        {renderDocumentContent(generatedTeacher)}
                    </DocumentPreview>
                </Modal>
            )}
        </>
    );
};

export default TestimonialTeacher;