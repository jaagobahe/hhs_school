import React from 'react';
import type { Teacher } from '../types';
import PhoneIcon from './icons/PhoneIcon';
import MailIcon from './icons/MailIcon';
import FacebookIcon from './icons/FacebookIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface TeacherCardProps {
    teacher: Teacher;
    onDetailsClick: (teacher: Teacher) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onDetailsClick }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4 transition-shadow hover:shadow-xl w-full">
            <img src={teacher.imageUrl} alt={teacher.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-grow w-full text-center sm:text-left">
                <h4 className="text-lg font-bold text-gray-800">{teacher.name}</h4>
                <p className="text-gray-600 mb-2">{teacher.designation}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
                    <a href={`tel:${teacher.phone}`} aria-label={`${teacher.name} phone`} className="p-1.5 bg-brand-secondary text-white rounded-md hover:bg-brand-primary transition-colors">
                        <PhoneIcon className="w-4 h-4" />
                    </a>
                    <a href={`mailto:${teacher.email}`} aria-label={`${teacher.name} email`} className="p-1.5 bg-brand-secondary text-white rounded-md hover:bg-brand-primary transition-colors">
                        <MailIcon className="w-4 h-4" />
                    </a>
                    <a href={teacher.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" aria-label={`${teacher.name} facebook`} className="p-1.5 bg-brand-secondary text-white rounded-md hover:bg-brand-primary transition-colors">
                        <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a href={`https://wa.me/${teacher.whatsappNumber || teacher.phone}`} target="_blank" rel="noopener noreferrer" aria-label={`${teacher.name} whatsapp`} className="p-1.5 bg-brand-secondary text-white rounded-md hover:bg-brand-primary transition-colors">
                        <WhatsAppIcon className="w-4 h-4" />
                    </a>
                </div>
                <button 
                    onClick={() => onDetailsClick(teacher)}
                    className="inline-flex items-center text-sm font-medium text-indigo-700 bg-indigo-100 py-1.5 px-3 rounded-full hover:bg-indigo-200 transition-colors"
                >
                    বিস্তারিত <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    );
};

export default TeacherCard;