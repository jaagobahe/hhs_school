import React, { useState, useMemo } from 'react';
import type { Student, Class, Section, Group, IDCardRequest } from '../../types';
import IDCard from './IDCard';
import PrinterIcon from '../icons/PrinterIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';
import SearchIcon from '../icons/SearchIcon';

interface IDCardManagerProps {
    students: Student[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    idCardRequests: IDCardRequest[];
    setIdCardRequests: React.Dispatch<React.SetStateAction<IDCardRequest[]>>;
}

const IDCardManager: React.FC<IDCardManagerProps> = ({ students, classes, sections, groups, idCardRequests, setIdCardRequests }) => {
    const [activeTab, setActiveTab] = useState<'batch' | 'single' | 'requests'>('batch');
    
    // Batch state
    const [classId, setClassId] = useState<string>('');
    const [sectionId, setSectionId] = useState<string>('');
    const [groupId, setGroupId] = useState<string>('');
    const [generatedStudents, setGeneratedStudents] = useState<Student[]>([]);

    // Single state
    const [singleClassId, setSingleClassId] = useState<string>('');
    const [singleSectionId, setSingleSectionId] = useState<string>('');
    const [singleGroupId, setSingleGroupId] = useState<string>('');
    const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);
    
    const studentMap = useMemo(() => new Map(students.map(s => [s.studentId, s])), [students]);
    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);

    const handleGenerateBatch = () => {
        if (!classId) {
            alert('অনুগ্রহ করে একটি শ্রেণী নির্বাচন করুন।');
            return;
        }
        const filtered = students.filter(s =>
            s.classId === Number(classId) &&
            (!sectionId || s.sectionId === Number(sectionId)) &&
            (!groupId || s.groupId === Number(groupId))
        ).sort((a, b) => a.roll - b.roll);
        setGeneratedStudents(filtered);
    };
    
    const handlePrintAll = () => {
        window.print();
    };

    const singleFilteredStudents = useMemo(() => {
        if (!singleClassId) return [];
        return students.filter(s =>
            s.classId === Number(singleClassId) &&
            (!singleSectionId || s.sectionId === Number(singleSectionId)) &&
            (!singleGroupId || s.groupId === Number(singleGroupId))
        ).sort((a, b) => a.roll - b.roll);
    }, [students, singleClassId, singleSectionId, singleGroupId]);
    
    const handleRequestAction = (requestId: number, newStatus: 'approved' | 'rejected') => {
        setIdCardRequests(prev => prev.map(req => req.id === requestId ? {...req, status: newStatus} : req));
    };

    const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
        }
    };
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">আইডি কার্ড ব্যবস্থাপনা (শিক্ষার্থী)</h2>
            
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <TabButton name="ব্যাচ জেনারেট" tabKey="batch" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="সিঙ্গেল জেনারেট" tabKey="single" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="আইডি কার্ড রিকুয়েস্ট" tabKey="requests" activeTab={activeTab} setActiveTab={setActiveTab} count={idCardRequests.filter(r => r.status === 'pending').length} />
                </nav>
            </div>

            {activeTab === 'batch' && (
                <div>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                             <Select label="শ্রেণী" value={classId} onChange={e => setClassId(e.target.value)} options={classes.map(c => ({ value: c.id, label: c.name }))} />
                             <Select label="শাখা (ঐচ্ছিক)" value={sectionId} onChange={e => setSectionId(e.target.value)} options={sections.map(s => ({ value: s.id, label: s.name }))} />
                             <Select label="বিভাগ (ঐচ্ছিক)" value={groupId} onChange={e => setGroupId(e.target.value)} options={groups.map(g => ({ value: g.id, label: g.name }))} />
                            <button onClick={handleGenerateBatch} className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-secondary h-10">জেনারেট করুন</button>
                        </div>
                    </div>
                     {generatedStudents.length > 0 && (
                        <div className="flex justify-end mb-4 no-print">
                            <button onClick={handlePrintAll} className="inline-flex items-center py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                                <PrinterIcon className="w-5 h-5 mr-2" />
                                সকল কার্ড প্রিন্ট করুন
                            </button>
                        </div>
                    )}
                    <div id="id-card-printable-area" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 justify-items-center">
                        {generatedStudents.map(student => (
                            <IDCard key={student.id} student={student} classes={classes} sections={sections} groups={groups} />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'single' && (
                <div>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
                        <p className="font-semibold mb-2 text-gray-700">শিক্ষার্থী ফিল্টার করুন</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Select label="শ্রেণী" value={singleClassId} onChange={e => { setSingleClassId(e.target.value); setSelectedStudentForCard(null); }} options={classes.map(c => ({ value: c.id, label: c.name }))} />
                            <Select label="শাখা (ঐচ্ছিক)" value={singleSectionId} onChange={e => { setSingleSectionId(e.target.value); setSelectedStudentForCard(null); }} options={sections.map(s => ({ value: s.id, label: s.name }))} />
                            <Select label="বিভাগ (ঐচ্ছিক)" value={singleGroupId} onChange={e => { setSingleGroupId(e.target.value); setSelectedStudentForCard(null); }} options={groups.map(g => ({ value: g.id, label: g.name }))} />
                        </div>
                    </div>

                    {singleClassId && !selectedStudentForCard && (
                        <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto mb-8 animate-page-fade-in">
                            <h4 className="font-semibold mb-3 text-gray-800">শিক্ষার্থীদের তালিকা ({singleFilteredStudents.length.toLocaleString('bn-BD')} জন)</h4>
                            <div className="max-h-80 overflow-y-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                     <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">রোল</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {singleFilteredStudents.map(student => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 font-tiro-bangla">{student.roll.toLocaleString('bn-BD')}</td>
                                                <td className="px-4 py-2">{student.nameBn}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <button
                                                        onClick={() => setSelectedStudentForCard(student)}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200"
                                                    >
                                                        কার্ড দেখুন
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {singleFilteredStudents.length === 0 && <p className="text-center py-4 text-gray-500">এই ফিল্টারে কোনো শিক্ষার্থী পাওয়া যায়নি।</p>}
                            </div>
                        </div>
                    )}

                    {selectedStudentForCard && (
                        <div className="animate-page-fade-in">
                            <div className="text-center mb-4 no-print">
                                <button onClick={() => setSelectedStudentForCard(null)} className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md">
                                    ← তালিকায় ফিরে যান
                                </button>
                            </div>
                            <div className="flex justify-center mt-2">
                                <IDCard student={selectedStudentForCard} classes={classes} sections={sections} groups={groups} isSingleView={true} />
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {activeTab === 'requests' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শিক্ষার্থীর নাম</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">শ্রেণী</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">আবেদনের তারিখ</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">স্ট্যাটাস</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                                </tr>
                            </thead>
                             <tbody className="bg-white divide-y divide-gray-200">
                                {idCardRequests.map(req => {
                                    const student = studentMap.get(req.studentId);
                                    if (!student) return null;
                                    return (
                                        <tr key={req.id}>
                                            <td className="px-6 py-4">{student.nameBn}</td>
                                            <td className="px-6 py-4">{classMap.get(student.classId)}</td>
                                            <td className="px-6 py-4 font-tiro-bangla">{new Date(req.requestDate).toLocaleDateString('bn-BD')}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(req.status)}`}>
                                                    {req.status === 'pending' ? 'বিচারাধীন' : req.status === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                {req.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleRequestAction(req.id, 'approved')} className="text-green-600 hover:text-green-900 p-1" title="অনুমোদন"><CheckCircleIcon /></button>
                                                        <button onClick={() => handleRequestAction(req.id, 'rejected')} className="text-red-600 hover:text-red-900 p-1" title="প্রত্যাখ্যান"><XCircleIcon /></button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Components
const TabButton: React.FC<{ name: string, tabKey: 'batch' | 'single' |'requests', activeTab: string, setActiveTab: (k: 'batch' | 'single' | 'requests') => void, count?: number }> = ({ name, tabKey, activeTab, setActiveTab, count }) => {
    const isActive = activeTab === tabKey;
    return (
        <button
            onClick={() => setActiveTab(tabKey)}
            className={`flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${isActive ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
            {name}
            {count && count > 0 && <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{count}</span>}
        </button>
    );
}

const Select: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: { value: number | string, label: string }[] }> = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select value={value} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md h-10">
            <option value="">{label === 'শ্রেণী' ? 'নির্বাচন করুন' : 'সকল'}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

export default IDCardManager;
