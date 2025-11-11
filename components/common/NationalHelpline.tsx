import React from 'react';
import DeviceMobileIcon from '../icons/DeviceMobileIcon';
import ShieldCheckIcon from '../icons/ShieldCheckIcon';
import ExclamationIcon from '../icons/ExclamationIcon';
import InformationCircleIcon from '../icons/InformationCircleIcon';
import OfficeBuildingIcon from '../icons/OfficeBuildingIcon';
import HeartIcon from '../icons/HeartIcon';
import ChildIcon from '../icons/ChildIcon';
import FireIcon from '../icons/FireIcon';

const helplineData = [
    { id: 1, name: 'সরকারি তথ্য ও সেবা', number: '৩৩৩', icon: <DeviceMobileIcon className="w-6 h-6 text-green-600" /> },
    { id: 2, name: 'জরুরী সেবা', number: '৯৯৯', icon: <ExclamationIcon className="w-6 h-6 text-red-500" /> },
    { id: 3, name: 'নারী ও শিশু নির্যাতন প্রতিরোধ', number: '১০৯', icon: <HeartIcon className="w-6 h-6 text-pink-500" /> },
    { id: 4, name: 'দুদক', number: '১০৬', icon: <ShieldCheckIcon className="w-6 h-6 text-blue-500" /> },
    { id: 5, name: 'দুর্যোগের আগাম বার্তা', number: '১০৯০', icon: <InformationCircleIcon className="w-6 h-6 text-yellow-500" /> },
    { id: 6, name: 'শিশুর সহায়তায় ফোন', number: '১০৯৮', icon: <ChildIcon className="w-6 h-6 text-teal-500" /> },
    { id: 8, name: 'ভূমি সেবা', number: '১৬১২২', icon: <OfficeBuildingIcon className="w-6 h-6 text-gray-500" /> },
    { id: 9, name: 'ফায়ার সার্ভিস হটলাইন', number: '১৬১৬৩', icon: <FireIcon className="w-6 h-6 text-orange-500" /> },
];

const NationalHelpline: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">জাতীয় হেল্পলাইন</h3>
            <ul className="mt-4">
                {helplineData.map(item => (
                     <li key={item.id} className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">{item.icon}</div>
                            <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                        </div>
                        <a href={`tel:${item.number.replace(/[^0-9]/g, '')}`} className="text-base font-bold text-brand-secondary font-tiro-bangla hover:underline">{item.number}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NationalHelpline;
