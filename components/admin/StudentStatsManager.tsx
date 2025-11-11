import React from 'react';
import type { StudentStat } from '../../types';

interface EditableTableProps {
    title: string;
    data: StudentStat[];
    setData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    headers: string[];
    keys: (keyof StudentStat)[];
}

const EditableTable: React.FC<EditableTableProps> = ({ title, data, setData, headers, keys }) => {
    
    const handleDataChange = (rowIndex: number, key: keyof StudentStat, value: string) => {
        const newData = [...data];
        newData[rowIndex] = { ...newData[rowIndex], [key]: value };
        setData(newData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {keys.map((key) => (
                                    <td key={key} className="px-6 py-4 whitespace-nowrap">
                                        <input 
                                            type="text" 
                                            value={row[key] || ''} 
                                            onChange={(e) => handleDataChange(rowIndex, key, e.target.value)}
                                            className="w-full p-1 border border-gray-300 rounded-md text-sm" 
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


interface StudentStatsManagerProps {
    genderData: StudentStat[];
    setGenderData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    islamData: StudentStat[];
    setIslamData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
    hinduData: StudentStat[];
    setHinduData: React.Dispatch<React.SetStateAction<StudentStat[]>>;
}


const StudentStatsManager: React.FC<StudentStatsManagerProps> = ({
    genderData, setGenderData,
    islamData, setIslamData,
    hinduData, setHinduData
}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">শিক্ষার্থী পরিসংখ্যান ব্যবস্থাপনা</h2>
            
            <EditableTable 
                title="লিঙ্গ ভিত্তিক"
                data={genderData}
                setData={setGenderData}
                headers={['শ্রেণী', 'শাখা', 'ছাত্র', 'ছাত্রী', 'মোট']}
                keys={['class', 'section', 'male', 'female', 'total']}
            />
            
            <EditableTable 
                title="ধর্ম ভিত্তিক (ইসলাম)"
                data={islamData}
                setData={setIslamData}
                headers={['শ্রেণী', 'ছাত্র', 'ছাত্রী', 'মোট']}
                keys={['class', 'male', 'female', 'total']}
            />

             <EditableTable 
                title="ধর্ম ভিত্তিক (হিন্দুধর্ম)"
                data={hinduData}
                setData={setHinduData}
                headers={['শ্রেণী', 'ছাত্র', 'ছাত্রী', 'মোট']}
                keys={['class', 'male', 'female', 'total']}
            />
        </div>
    );
};

export default StudentStatsManager;
