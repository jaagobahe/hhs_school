import React from 'react';
import type { AdhocCommitteeMember } from '../../types';

interface CommitteePageProps {
    adhocCommitteeMembers: AdhocCommitteeMember[];
}

const CommitteePage: React.FC<CommitteePageProps> = ({ adhocCommitteeMembers }) => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-brand-primary">কমিটির সদস্য</h2>
                    <p className="text-lg text-gray-600 mt-2">এডহক কমিটির তথ্য</p>
                </div>
                
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-base">
                            <thead className="bg-brand-primary text-white">
                                <tr>
                                    <th className="py-4 px-6 text-center font-semibold tracking-wider">ক্রমিক</th>
                                    <th className="py-4 px-6 text-left font-semibold tracking-wider">নির্বাচিত পদের নাম</th>
                                    <th className="py-4 px-6 text-left font-semibold tracking-wider">সদস্যের নাম</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {adhocCommitteeMembers.map((member, index) => (
                                    <tr 
                                        key={member.id} 
                                        className={`border-t border-gray-200 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                                    >
                                        <td className="py-4 px-6 text-center font-tiro-bangla font-semibold">
                                            {(index + 1).toLocaleString('bn-BD', { minimumIntegerDigits: 2 })}
                                        </td>
                                        <td className="py-4 px-6 text-left">{member.post}</td>
                                        <td className="py-4 px-6 text-left font-medium">{member.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <img 
                        src="https://picsum.photos/seed/committee-image/600/400" 
                        alt="কমিটি" 
                        className="mx-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommitteePage;
