import React, { useState } from 'react';
import type { Teacher } from '../../types';

interface TeacherSettingsManagerProps {
    teacher: Teacher;
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

const TeacherSettingsManager: React.FC<TeacherSettingsManagerProps> = ({ teacher, setTeachers }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const correctCurrentPassword = teacher.password || teacher.loginId;
        if (currentPassword !== correctCurrentPassword) {
            setMessage({ type: 'error', text: 'আপনার বর্তমান পাসওয়ার্ডটি সঠিক নয়।' });
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।' });
            return;
        }

        // Update the teacher's password in the main state
        setTeachers(prevTeachers =>
            prevTeachers.map(t =>
                t.id === teacher.id ? { ...t, password: newPassword } : t
            )
        );

        setMessage({ type: 'success', text: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-brand-primary mb-6 border-b pb-4">পাসওয়ার্ড পরিবর্তন করুন</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        বর্তমান পাসওয়ার্ড
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        নতুন পাসওয়ার্ড
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        নতুন পাসওয়ার্ড নিশ্চিত করুন
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {message && (
                    <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div className="pt-5 text-right">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary"
                    >
                        পাসওয়ার্ড পরিবর্তন করুন
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeacherSettingsManager;
