import React from 'react';
import type { StudentStat } from '../../types';

interface StatisticsTableProps {
    title: string;
    headers: string[];
    // FIX: Change data type to StudentStat[] to match the passed props.
    data: StudentStat[];
    headerColor: string;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ title, headers, data, headerColor }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{title}</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 font-tiro-bangla border">
                <thead className={headerColor}>
                    <tr>
                        {headers.map(header => (
                             <th key={header} scope="col" className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index} className="even:bg-gray-50">
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-center">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

interface StudentStatisticsPageProps {
    genderData: StudentStat[];
    islamData: StudentStat[];
    hinduData: StudentStat[];
}

const StudentStatisticsPage: React.FC<StudentStatisticsPageProps> = ({ genderData, islamData, hinduData }) => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">বিস্তারিত শিক্ষার্থী পরিসংখ্যান</h2>
                
                <StatisticsTable 
                    title="লিঙ্গ ভিত্তিক শিক্ষার্থী পরিসংখ্যান"
                    headers={['শ্রেণী', 'শাখা', 'ছাত্র', 'ছাত্রী', 'মোট']}
                    data={genderData}
                    headerColor="bg-green-700 text-white"
                />

                <StatisticsTable 
                    title="ধর্ম ভিত্তিক শিক্ষার্থী পরিসংখ্যান (ইসলামধর্ম)"
                    headers={['শ্রেণী', 'ছাত্র', 'ছাত্রী', 'মোট']}
                    data={islamData}
                    headerColor="bg-red-900 text-white"
                />

                <StatisticsTable 
                    title="ধর্ম ভিত্তিক শিক্ষার্থী পরিসংখ্যান (হিন্দুধর্ম)"
                    headers={['শ্রেণী', 'ছাত্র', 'ছাত্রী', 'মোট']}
                    data={hinduData}
                    headerColor="bg-blue-600 text-white"
                />
                
            </div>
        </div>
    );
};

export default StudentStatisticsPage;