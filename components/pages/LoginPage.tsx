import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import type { User, LoginRole } from '../../types';

interface LoginPageProps {
    role: LoginRole;
    onLoginSuccess: (user: User) => void;
    logoUrl: string;
}

// Mock database for admin
const mockUsers: User[] = [
    { id: 'admin', name: 'মান্যবর এডমিন', role: 'admin' },
];

const mockPasswords: Record<string, string> = {
    'admin': 'admin', // Admin password
};

const LoginPage: React.FC<LoginPageProps> = ({ role, onLoginSuccess, logoUrl }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const roleTranslations: Record<LoginRole, string> = {
        teacher: 'শিক্ষক',
        student: 'শিক্ষার্থী',
        admin: 'এডমিন',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (role === 'student') {
            const { data: loginInfo, error: loginError } = await supabase
                .from('student_logins')
                .select('*')
                .eq('student_id', id)
                .single();
            
            if (loginError || !loginInfo) {
                setError('আপনার আইডি বা পাসওয়ার্ড সঠিক নয়।');
                return;
            }

            if (loginInfo.password === password) {
                if (!loginInfo.is_active) {
                    setError('আপনার অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে। কর্তৃপক্ষের সাথে যোগাযোগ করুন।');
                    return;
                }
                const { data: studentInfo, error: studentError } = await supabase
                    .from('students')
                    .select('*')
                    .eq('student_id', id)
                    .single();
                
                if (studentInfo) {
                    const user: User = {
                        id: studentInfo.studentId,
                        name: studentInfo.nameBn,
                        role: 'student',
                    };
                    onLoginSuccess(user);
                } else {
                    setError('লগইন তথ্য সঠিক হলেও শিক্ষার্থীর তথ্য পাওয়া যায়নি।');
                }
            } else {
                setError('আপনার আইডি বা পাসওয়ার্ড সঠিক নয়।');
            }

        } else if (role === 'teacher') {
            const { data: teacherInfo, error: teacherError } = await supabase
                .from('teachers')
                .select('*')
                .eq('login_id', id)
                .single();
            
            if (teacherError || !teacherInfo) {
                setError('আপনার আইডি বা পাসওয়ার্ড সঠিক নয়।');
                return;
            }
            
            const correctPassword = teacherInfo.password || teacherInfo.login_id; // Use login_id as fallback
            if (correctPassword === password) {
                 const user: User = {
                    id: teacherInfo.login_id!,
                    name: teacherInfo.name,
                    role: 'teacher',
                };
                onLoginSuccess(user);
            } else {
                 setError('আপনার আইডি বা পাসওয়ার্ড সঠিক নয়।');
            }
        } else {
            // Admin login
            const user = mockUsers.find(u => u.id.toLowerCase() === id.toLowerCase() && u.role === role);
            if (user && mockPasswords[user.id] === password) {
                onLoginSuccess(user);
            } else {
                setError('আপনার আইডি বা পাসওয়ার্ড সঠিক নয়।');
            }
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <img className="mx-auto h-20 w-auto rounded-full" src={logoUrl} alt="লোগো" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        {roleTranslations[role]} লগইন
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        আপনার আইডি ও পাসওয়ার্ড দিয়ে প্রবেশ করুন
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="user-id" className="sr-only">আইডি</label>
                            <input
                                id="user-id"
                                name="id"
                                type="text"
                                required
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="font-tiro-bangla appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm"
                                placeholder={`${roleTranslations[role]} আইডি`}
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="sr-only">পাসওয়ার্ড</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="font-tiro-bangla appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary focus:z-10 sm:text-sm"
                                placeholder="পাসওয়ার্ড"
                            />
                        </div>
                    </div>

                    {error && <p className="text-center text-red-500 text-sm">{error}</p>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                মনে রাখুন
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-brand-primary hover:text-brand-secondary">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
                            লগইন করুন
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;