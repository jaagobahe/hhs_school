import React, { useState, useMemo } from 'react';
import type { Student, Class, Section, Group } from '../../../types';
import PrinterIcon from '../../icons/PrinterIcon';

interface AdmitCardProps {
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
}

const examOptions = ["অর্ধ বার্ষিক", "বার্ষিক", "প্রাক নির্বাচনী"];

const AdmitCard: React.FC<AdmitCardProps> = ({ students, classes, sections, groups }) => {
    const [exam, setExam] = useState(examOptions[0]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [classId, setClassId] = useState<string>('');
    const [sectionId, setSectionId] = useState<string>('');
    const [groupId, setGroupId] = useState<string>('');
    const [generatedStudents, setGeneratedStudents] = useState<Student[]>([]);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);
    const sectionMap = useMemo(() => new Map(sections.map(s => [s.id, s.name])), [sections]);
    const groupMap = useMemo(() => new Map(groups.map(g => [g.id, g.name])), [groups]);
    
    const isGroupApplicable = useMemo(() => {
        const selectedClass = classes.find(c => c.id === Number(classId));
        return selectedClass && selectedClass.numericName >= 9;
    }, [classId, classes]);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!classId) {
            alert('অনুগ্রহ করে একটি শ্রেণী নির্বাচন করুন।');
            return;
        }
        const filtered = students.filter(s =>
            s.classId === Number(classId) &&
            (!sectionId || s.sectionId === Number(sectionId)) &&
            (!isGroupApplicable || !groupId || s.groupId === Number(groupId))
        ).sort((a, b) => a.roll - b.roll);
        setGeneratedStudents(filtered);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 no-print">
                <form onSubmit={handleGenerate} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
                    <Select label="পরীক্ষা" value={exam} onChange={e => setExam(e.target.value)} options={examOptions.map(o => ({ value: o, label: o }))} />
                    <InputField label="সাল" type="number" value={year} onChange={e => setYear(Number(e.target.value))} />
                    <Select label="শ্রেণী" value={classId} onChange={e => setClassId(e.target.value)} options={classes.map(c => ({ value: c.id, label: c.name }))} required />
                    <Select label="শাখা" value={sectionId} onChange={e => setSectionId(e.target.value)} options={sections.map(s => ({ value: s.id, label: s.name }))} />
                    <Select label="বিভাগ" value={groupId} onChange={e => setGroupId(e.target.value)} options={groups.map(g => ({ value: g.id, label: g.name }))} disabled={!isGroupApplicable} />
                    <button type="submit" className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-secondary h-10">জেনারেট করুন</button>
                </form>
            </div>

            {generatedStudents.length > 0 && (
                <div className="flex justify-end mb-4 no-print">
                    <button onClick={handlePrint} className="inline-flex items-center py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                        <PrinterIcon className="w-5 h-5 mr-2" />
                        সকল কার্ড প্রিন্ট করুন
                    </button>
                </div>
            )}
            
            <div id="admit-card-printable-grid" className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-8 justify-items-center">
                {generatedStudents.map(student => (
                    <div key={student.id} className="w-full h-full bg-white p-2 font-hind-siliguri relative overflow-hidden admit-card-item flex flex-col">
                        <div className="text-center pb-2 border-b-2 border-gray-400">
                             <img src="https://picsum.photos/seed/schoollogo/60/60" alt="লোগো" className="h-12 w-12 rounded-full mx-auto mb-1" />
                            <h1 className="text-xl font-bold text-brand-primary">হরিপুর উচ্চ বিদ্যালয়</h1>
                            <p className="font-semibold text-md">প্রবেশ পত্র - {exam} পরীক্ষা, {year.toLocaleString('bn-BD', { useGrouping: false })}</p>
                        </div>
                        <div className="flex-grow flex items-start pt-3">
                            <div className="w-3/4 space-y-1 text-sm">
                                <InfoRow label="শিক্ষার্থীর নাম" value={student.nameBn} />
                                <InfoRow label="পিতার নাম" value={student.fatherNameBn} />
                                <InfoRow label="শ্রেণী" value={classMap.get(student.classId) || ''} />
                                <InfoRow label="শাখা" value={sectionMap.get(student.sectionId) || ''} />
                                <InfoRow label="বিভাগ" value={student.groupId ? groupMap.get(student.groupId) : 'প্রযোজ্য নয়'} />
                                <InfoRow label="রোল নং" value={student.roll.toLocaleString('bn-BD', { useGrouping: false })} />
                            </div>
                            <div className="w-1/4 flex flex-col items-center pl-2">
                                <img src={student.photoUrl} alt="Student" className="w-24 h-28 object-cover border-2 border-gray-300 p-0.5" />
                            </div>
                        </div>
                        <div className="flex justify-between items-end mt-auto pt-2 text-xs">
                            <p className="border-t-2 border-gray-400 px-2 pt-1">শ্রেণী শিক্ষকের স্বাক্ষর</p>
                            <p className="border-t-2 border-gray-400 px-2 pt-1 font-semibold">প্রধান শিক্ষকের স্বাক্ষর</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const InfoRow: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="flex">
        <p className="w-2/5 font-semibold text-gray-600">{label}</p>
        <p className="w-3/5 font-medium text-gray-900">: {value}</p>
    </div>
);
const Select: React.FC<{ label: string, options: { value: string | number, label: string }[], [key: string]: any }> = ({ label, options, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select {...props} className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md">
            <option value="">{label === 'শ্রেণী' ? 'নির্বাচন' : 'সকল'}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);
const InputField: React.FC<{ label: string } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input {...props} className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md" />
    </div>
);

export default AdmitCard;