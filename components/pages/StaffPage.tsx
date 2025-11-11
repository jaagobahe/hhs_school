import React from 'react';
import type { StaffMember } from '../../types';

interface StaffPageProps {
    staff: StaffMember[];
}

const StaffCard: React.FC<{ member: StaffMember }> = ({ member }) => (
    <div className="bg-white rounded-lg shadow-lg text-center p-6 transform hover:-translate-y-2 transition-transform duration-300">
        <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-brand-accent shadow-md" />
        <h4 className="mt-4 text-lg font-semibold text-gray-800">{member.name}</h4>
        <p className="text-brand-secondary">{member.designation}</p>
    </div>
);


const StaffPage: React.FC<StaffPageProps> = ({ staff }) => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">বিদ্যালয়ের কর্মচারীবৃন্দ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {staff.map((member) => (
                        <StaffCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffPage;
