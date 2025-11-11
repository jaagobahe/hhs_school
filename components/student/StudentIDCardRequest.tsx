import React from 'react';
import type { Student, IDCardRequest, Class, Section, Group } from '../../types';
import IDCard from '../admin/IDCard';

interface StudentIDCardRequestProps {
    student: Student;
    idCardRequests: IDCardRequest[];
    setIdCardRequests: React.Dispatch<React.SetStateAction<IDCardRequest[]>>;
    classes: Class[];
    sections: Section[];
    groups: Group[];
}

const StudentIDCardRequest: React.FC<StudentIDCardRequestProps> = ({ student, idCardRequests, setIdCardRequests, classes, sections, groups }) => {
    
    const existingRequest = idCardRequests.find(req => req.studentId === student.studentId);

    const handleRequest = () => {
        if (existingRequest) {
            alert('আপনি ইতোমধ্যে একটি আবেদন করেছেন।');
            return;
        }

        const newRequest: IDCardRequest = {
            id: Date.now(),
            studentId: student.studentId,
            requestDate: new Date().toISOString(),
            status: 'pending',
        };

        setIdCardRequests(prev => [newRequest, ...prev]);
        alert('আপনার আইডি কার্ডের আবেদন সফলভাবে জমা হয়েছে।');
    };

    if (existingRequest?.status === 'approved') {
        return (
             <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-semibold text-brand-primary mb-4">আমার আইডি কার্ড</h3>
                <div className="my-6 p-4 rounded-md bg-green-100 text-green-800">
                    <p className="font-semibold">আপনার আবেদনটি অনুমোদিত হয়েছে। আপনি এখান থেকে কার্ডটি ডাউনলোড বা প্রিন্ট করতে পারেন। ফিজিক্যাল কার্ডের জন্য অফিসে যোগাযোগ করুন।</p>
                </div>

                <div className="flex justify-center mt-8">
                     <IDCard 
                        student={student} 
                        classes={classes} 
                        sections={sections} 
                        groups={groups} 
                        isSingleView={true} 
                    />
                </div>
            </div>
        )
    }

    const getStatusInfo = () => {
        if (!existingRequest) {
            return {
                text: 'আপনার কোনো আইডি কার্ড আবেদন নেই।',
                badge: 'bg-gray-100 text-gray-800'
            };
        }
        switch (existingRequest.status) {
            case 'pending': return { text: 'আপনার আবেদনটি পর্যালোচনার জন্য অপেক্ষমাণ আছে।', badge: 'bg-yellow-100 text-yellow-800' };
            case 'rejected': return { text: 'আপনার আবেদনটি প্রত্যাখ্যান করা হয়েছে। বিস্তারিত জানতে অফিসে যোগাযোগ করুন।', badge: 'bg-red-100 text-red-800' };
            default: return { text: '', badge: '' }; // Should not happen for 'approved' as it is handled above
        }
    };

    const statusInfo = getStatusInfo();
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-brand-primary mb-4">আইডি কার্ড আবেদন</h3>

            <div className="my-6 p-4 rounded-md">
                <p className="text-lg font-medium">আবেদনের অবস্থা</p>
                {statusInfo.text && (
                    <p className={`mt-2 text-base font-semibold px-4 py-2 inline-block rounded-full ${statusInfo.badge}`}>
                        {statusInfo.text}
                    </p>
                )}
            </div>
            
            {!existingRequest && (
                <div>
                     <p className="text-gray-600 mb-4">আপনার যদি আইডি কার্ডের প্রয়োজন হয়, তবে নিচের বাটনে ক্লিক করে আবেদন করুন।</p>
                    <button 
                        onClick={handleRequest}
                        className="py-2 px-6 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary transition-colors"
                    >
                        নতুন আইডি কার্ডের জন্য আবেদন করুন
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentIDCardRequest;