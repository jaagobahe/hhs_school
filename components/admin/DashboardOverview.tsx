import React from 'react';
import UsersIcon from '../icons/UsersIcon';
import NewspaperIcon from '../icons/NewspaperIcon';
import PhotographIcon from '../icons/PhotographIcon';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 border-l-4 ${color}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-800 font-tiro-bangla">{value}</p>
        </div>
    </div>
);


const DashboardOverview: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ওভারভিউ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="মোট শিক্ষার্থী" value="৩৫২" icon={<UsersIcon className="text-blue-500" />} color="border-blue-500" />
                 <StatCard title="মোট শিক্ষক" value="১৪" icon={<UsersIcon className="text-green-500" />} color="border-green-500" />
                 <StatCard title="মোট নোটিশ" value="৪" icon={<NewspaperIcon className="text-yellow-500" />} color="border-yellow-500" />
                 <StatCard title="গ্যালারি ছবি" value="১০" icon={<PhotographIcon className="text-purple-500" />} color="border-purple-500" />
            </div>
             <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">দ্রুত কার্য সম্পাদন</h3>
                <p className="text-gray-600">
                    বাম পাশের মেনু থেকে ওয়েবসাইটের নোটিশ, ফটো গ্যালারি এবং পরিচালনা কমিটির সদস্যদের তথ্য পরিবর্তন, পরিবর্ধন বা মুছে ফেলতে পারবেন।
                </p>
            </div>
        </div>
    );
};

export default DashboardOverview;