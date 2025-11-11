import React, { useState } from 'react';
import type { Teacher, StaffMember } from '../../types';
import StaffIdCard from './StaffIdCard';
import PrinterIcon from '../icons/PrinterIcon';

interface StaffIdCardManagerProps {
    teachers: Teacher[];
    staff: StaffMember[];
}

const StaffIdCardManager: React.FC<StaffIdCardManagerProps> = ({ teachers, staff }) => {
    const [activeTab, setActiveTab] = useState<'teachers' | 'staff'>('teachers');
    const [generatedPeople, setGeneratedPeople] = useState<(Teacher | StaffMember)[]>([]);

    const handleGenerateAll = () => {
        setGeneratedPeople(activeTab === 'teachers' ? teachers : staff);
    };

    const handleGenerateSingle = (person: Teacher | StaffMember) => {
        setGeneratedPeople([person]);
    };

    const handlePrintAll = () => {
        window.print();
    };

    const currentList = activeTab === 'teachers' ? teachers : staff;

    return (
        <div>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <TabButton name="শিক্ষক" tabKey="teachers" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="কর্মচারী" tabKey="staff" activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel: List */}
                <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{activeTab === 'teachers' ? 'শিক্ষক তালিকা' : 'কর্মচারী তালিকা'}</h3>
                        <button onClick={handleGenerateAll} className="bg-brand-secondary text-white px-3 py-1.5 rounded-md text-sm hover:bg-brand-primary">
                            সকল কার্ড জেনারেট
                        </button>
                    </div>
                    <ul className="max-h-96 overflow-y-auto divide-y divide-gray-200">
                        {currentList.map(person => (
                            <li key={person.id} className="py-2 flex justify-between items-center">
                                <span>{person.name}</span>
                                <button onClick={() => handleGenerateSingle(person)} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-md hover:bg-blue-200">
                                    কার্ড দেখুন
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Right Panel: Generated Cards */}
                <div className="lg:col-span-2">
                    {generatedPeople.length > 0 && (
                        <div className="flex justify-end mb-4 no-print">
                            <button onClick={handlePrintAll} className="inline-flex items-center py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                                <PrinterIcon className="w-5 h-5 mr-2" />
                                সকল কার্ড প্রিন্ট করুন
                            </button>
                        </div>
                    )}
                    <div id="id-card-printable-area" className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-12 justify-items-center">
                        {generatedPeople.map(person => (
                            <StaffIdCard key={person.id} person={person} />
                        ))}
                    </div>
                    {generatedPeople.length === 0 && (
                        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-8">
                            <p className="text-gray-500">কার্ড জেনারেট করতে তালিকা থেকে নির্বাচন করুন।</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{ name: string; tabKey: 'teachers' | 'staff'; activeTab: string; setActiveTab: (k: 'teachers' | 'staff') => void; }> = ({ name, tabKey, activeTab, setActiveTab }) => {
    const isActive = activeTab === tabKey;
    return (
        <button
            onClick={() => setActiveTab(tabKey)}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${isActive ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
            {name}
        </button>
    );
}

export default StaffIdCardManager;
