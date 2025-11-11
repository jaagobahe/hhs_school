import React, { useState, useMemo, useEffect } from 'react';
import type { Student, Teacher, Class, Section, Group, StudentLogin } from '../../types';

type RecipientType = 'student' | 'teacher' | 'specific';
type TemplateType = 'admission' | 'password' | 'notice' | 'custom';
type GatewayProvider = 'custom' | 'twilio';

// --- API Simulation & Implementation ---
/**
 * একটি বাস্তব SMS API কলের অনুকরণ করে (কাস্টম গেটওয়ের জন্য) অথবা Twilio API কল করে।
 * @param recipients ফোন নম্বরের একটি অ্যারে।
 * @param message পাঠানোর জন্য বার্তা।
 * @param settings গেটওয়ে সেটিংস।
 * @returns একটি Promise যা সফল বা ব্যর্থতার বার্তা দিয়ে resolve করে।
 */
async function sendSmsApi(
    recipients: string[], 
    message: string,
    settings: {
        provider: GatewayProvider;
        custom: { apiKey: string; senderId: string; apiUrl: string };
        twilio: { accountSid: string; authToken: string; phoneNumber: string };
    }
): Promise<{ success: boolean; message: string }> {
    console.log("Attempting to send SMS with settings:", { recipients, message, provider: settings.provider });

    if (settings.provider === 'twilio') {
        // --- Real Twilio API Integration ---
        const { accountSid, authToken, phoneNumber } = settings.twilio;
        if (!accountSid || !authToken || !phoneNumber) {
            return { success: false, message: 'বার্তা পাঠানো ব্যর্থ হয়েছে। অনুগ্রহ করে Twilio Account SID, Auth Token, এবং Phone Number সেট করুন।' };
        }

        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        
        // NOTE: In a real-world application, the Auth Token should NEVER be exposed on the client-side.
        // This API call should be made from a secure backend server.
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(`${accountSid}:${authToken}`));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        try {
            const sendPromises = recipients.map(recipient => {
                const body = new URLSearchParams();
                body.append('To', recipient);
                body.append('From', phoneNumber);
                body.append('Body', message);

                return fetch(twilioUrl, {
                    method: 'POST',
                    headers: headers,
                    body: body,
                }).then(async response => {
                    if (!response.ok) {
                        const errorData = await response.json();
                        // Throw an error to be caught by Promise.all
                        throw new Error(`Twilio Error ${errorData.code}: ${errorData.message}`);
                    }
                    return response.json();
                });
            });

            await Promise.all(sendPromises);

            return { success: true, message: `${recipients.length.toLocaleString('bn-BD')} জন প্রাপককে বার্তা সফলভাবে পাঠানো হয়েছে (Twilio এর মাধ্যমে)।` };

        } catch (error: any) {
            console.error("Twilio API Error:", error);
            return { success: false, message: `Twilio API Error: ${error.message}` };
        }
    } else { // 'custom' provider simulation
        if (!settings.custom.apiKey) {
            return Promise.resolve({ success: false, message: 'বার্তা পাঠানো ব্যর্থ হয়েছে। অনুগ্রহ করে মেসেজ গেটওয়ে সেটিংস থেকে একটি বৈধ API কী সেট করুন।' });
        }
        // Simulating a delay for the custom provider
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, message: `${recipients.length.toLocaleString('bn-BD')} জন প্রাপককে বার্তা সফলভাবে পাঠানো হয়েছে (সিমুলেশন)।` });
            }, 1500);
        });
    }
}


// Main Component
const SmsSettingsManager: React.FC<{
    students: Student[];
    teachers: Teacher[];
    classes: Class[];
    sections: Section[];
    groups: Group[];
    studentLogins: StudentLogin[];
}> = ({ students, teachers, classes, sections, groups, studentLogins }) => {
    const [recipientType, setRecipientType] = useState<RecipientType>('student');
    const [template, setTemplate] = useState<TemplateType>('custom');
    
    // Student Filters
    const [filterClass, setFilterClass] = useState<string>('');
    const [filterSection, setFilterSection] = useState<string>('');
    const [selectedStudent, setSelectedStudent] = useState<string>('all'); // 'all' or studentId

    // Teacher Filter
    const [selectedTeacher, setSelectedTeacher] = useState<string>('all'); // 'all' or teacher.id
    
    // Specific Number
    const [specificNumber, setSpecificNumber] = useState('');
    
    // Message
    const [messageBody, setMessageBody] = useState('');

    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- Gateway Settings State ---
    const [gatewayProvider, setGatewayProvider] = useState<GatewayProvider>(() => (localStorage.getItem('smsGatewayProvider') as GatewayProvider) || 'twilio');
    // Custom Gateway States
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('smsApiKey') || '');
    const [senderId, setSenderId] = useState(() => localStorage.getItem('smsSenderId') || '');
    const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('smsApiUrl') || '');
    // Twilio States with pre-filled values
    const [twilioAccountSid, setTwilioAccountSid] = useState(() => localStorage.getItem('twilioAccountSid') || 'AC53602326d13292ceb710b305bdabb458');
    const [twilioAuthToken, setTwilioAuthToken] = useState(() => localStorage.getItem('twilioAuthToken') || '0a6ee90459a40bdc594d56e598cbdba7');
    const [twilioPhoneNumber, setTwilioPhoneNumber] = useState(() => localStorage.getItem('twilioPhoneNumber') || '+18782511088');


    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c])), [classes]);
    const studentsMap = useMemo(() => new Map(students.map(s => [s.studentId, s])), [students]);
    const teachersMap = useMemo(() => new Map(teachers.map(t => [t.id, t])), [teachers]);

    const filteredStudents = useMemo(() => {
        if (!filterClass) return [];
        return students.filter(s => 
            s.classId === Number(filterClass) &&
            (!filterSection || s.sectionId === Number(filterSection))
        );
    }, [students, filterClass, filterSection]);

    const studentLoginsMap = useMemo(() => new Map(studentLogins.map(l => [l.studentId, l])), [studentLogins]);
    
    
    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTemplate(e.target.value as TemplateType);
    };

    useEffect(() => {
        const student = (recipientType === 'student' && selectedStudent !== 'all') ? studentsMap.get(selectedStudent) : null;
        
        if (template === 'custom') {
            return;
        }

        let newBody = '';

        switch(template) {
            case 'admission':
                newBody = student
                    ? `প্রিয় অভিভাবক, আপনার সন্তান ${student.nameBn}-এর ভর্তি হরিপুর উচ্চ বিদ্যালয়ে সম্পন্ন হয়েছে। ধন্যবাদ।`
                    : 'প্রিয় অভিভাবক, আপনার সন্তান [নাম]-এর ভর্তি হরিপুর উচ্চ বিদ্যালয়ে সম্পন্ন হয়েছে। ধন্যবাদ।';
                break;
            case 'password':
                if (student) {
                    const login = studentLoginsMap.get(selectedStudent);
                    const password = login?.password || '[পাসওয়ার্ড পাওয়া যায়নি]';
                    newBody = `প্রিয় ${student.nameBn}, আপনার অ্যাকাউন্টের ইউজার আইডি: ${student.studentId} এবং পাসওয়ার্ড: ${password}।`;
                } else {
                    newBody = 'প্রিয় [নাম], আপনার অ্যাকাউন্টের ইউজার আইডি: [আইডি] এবং পাসওয়ার্ড: [পাসওয়ার্ড]।';
                }
                break;
            case 'notice':
                 newBody = 'হরিপুর উচ্চ বিদ্যালয়ের জরুরি বিজ্ঞপ্তি: ';
                 break;
            default:
                newBody = '';
                break;
        }

        setMessageBody(newBody);
    }, [template, selectedStudent, recipientType, studentsMap, studentLoginsMap]);
    
    const handleSendSms = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(null);
        setIsLoading(true);

        if(!messageBody) {
            setStatusMessage({ type: 'error', text: 'অনুগ্রহ করে বার্তার বিষয়বস্তু লিখুন।' });
            setIsLoading(false);
            return;
        }

        let recipientNumbers: string[] = [];
        switch(recipientType) {
            case 'student':
                if (selectedStudent === 'all') {
                    recipientNumbers = filteredStudents.map(s => s.fatherPhone).filter(Boolean);
                } else {
                    const student = studentsMap.get(selectedStudent);
                    if (student?.fatherPhone) {
                        recipientNumbers.push(student.fatherPhone);
                    }
                }
                break;
            case 'teacher':
                 if (selectedTeacher === 'all') {
                    recipientNumbers = teachers.map(t => t.phone).filter(Boolean);
                 } else {
                    const teacher = teachersMap.get(Number(selectedTeacher));
                    if (teacher?.phone) {
                        recipientNumbers.push(teacher.phone);
                    }
                 }
                break;
            case 'specific':
                if (specificNumber) recipientNumbers.push(specificNumber);
                break;
        }

        if (recipientNumbers.length === 0) {
            setStatusMessage({ type: 'error', text: 'কোনো বৈধ প্রাপকের নম্বর পাওয়া যায়নি।' });
            setIsLoading(false);
            return;
        }

        try {
            const settings = {
                provider: gatewayProvider,
                custom: { apiKey, senderId, apiUrl },
                twilio: { accountSid: twilioAccountSid, authToken: twilioAuthToken, phoneNumber: twilioPhoneNumber }
            };
            const result = await sendSmsApi(recipientNumbers, messageBody, settings);
            
            if (result.success) {
                setStatusMessage({ type: 'success', text: result.message });
            } else {
                setStatusMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            console.error("Failed to send SMS:", error);
            setStatusMessage({ type: 'error', text: 'বার্তা পাঠাতে একটি অপ্রত্যাশিত ত্রুটি হয়েছে।' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(null);
        localStorage.setItem('smsGatewayProvider', gatewayProvider);
        if (gatewayProvider === 'twilio') {
            localStorage.setItem('twilioAccountSid', twilioAccountSid);
            localStorage.setItem('twilioAuthToken', twilioAuthToken);
            localStorage.setItem('twilioPhoneNumber', twilioPhoneNumber);
        } else {
            localStorage.setItem('smsApiKey', apiKey);
            localStorage.setItem('smsSenderId', senderId);
            localStorage.setItem('smsApiUrl', apiUrl);
        }
        setStatusMessage({ type: 'success', text: 'গেটওয়ে সেটিংস সফলভাবে ব্রাউজারে সংরক্ষণ করা হয়েছে।' });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">এসএমএস ব্যবস্থাপনা</h2>
            
            {/* Gateway Settings Section */}
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <form onSubmit={handleSaveSettings}>
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">মেসেজ গেটওয়ে সেটিংস</h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">গেটওয়ে প্রোভাইডার</label>
                        <select value={gatewayProvider} onChange={e => setGatewayProvider(e.target.value as GatewayProvider)} className="mt-1 block w-full md:w-1/3 pl-3 pr-10 py-2 border-gray-300 rounded-md">
                            <option value="custom">কাস্টম</option>
                            <option value="twilio">Twilio</option>
                        </select>
                    </div>

                    {gatewayProvider === 'custom' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-page-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">API কী</label>
                                <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="আপনার SMS প্রোভাইডারের API কী" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">সেন্ডার আইডি</label>
                                <input type="text" value={senderId} onChange={e => setSenderId(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="যেমন: 880123456789" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">API URL</label>
                                <input type="text" value={apiUrl} onChange={e => setApiUrl(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://api.sms-provider.com/send" />
                            </div>
                        </div>
                    )}
                    
                    {gatewayProvider === 'twilio' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-page-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Account SID</label>
                                <input type="text" value={twilioAccountSid} onChange={e => setTwilioAccountSid(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Twilio Account SID" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Auth Token</label>
                                <input type="password" value={twilioAuthToken} onChange={e => setTwilioAuthToken(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Twilio Auth Token" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Twilio Phone Number</label>
                                <input type="text" value={twilioPhoneNumber} onChange={e => setTwilioPhoneNumber(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="+1234567890" />
                            </div>
                        </div>
                    )}

                     <div className="text-right mt-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            সেটিংস সংরক্ষণ করুন
                        </button>
                    </div>
                </form>
            </div>


            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSendSms}>
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">বার্তা পাঠান</h3>
                    
                    {/* Recipient Type */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">প্রাপক নির্বাচন করুন</label>
                        <div className="flex space-x-4">
                            <RadioOption name="recipientType" value="student" checked={recipientType === 'student'} onChange={() => setRecipientType('student')} label="শিক্ষার্থী" />
                            <RadioOption name="recipientType" value="teacher" checked={recipientType === 'teacher'} onChange={() => setRecipientType('teacher')} label="শিক্ষক" />
                            <RadioOption name="recipientType" value="specific" checked={recipientType === 'specific'} onChange={() => setRecipientType('specific')} label="নির্দিষ্ট নম্বর" />
                        </div>
                    </div>

                    {/* Recipient Filters */}
                    {recipientType === 'student' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md bg-gray-50">
                            <Select label="শ্রেণী" value={filterClass} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterClass(e.target.value)} options={classes.map(c => ({value: c.id, label: c.name}))} required/>
                            <Select label="শাখা (ঐচ্ছিক)" value={filterSection} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterSection(e.target.value)} options={sections.map(s => ({value: s.id, label: s.name}))}/>
                            <Select label="শিক্ষার্থী" value={selectedStudent} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)} options={[{value:'all', label: `সকল শিক্ষার্থী (${filteredStudents.length.toLocaleString('bn-BD')} জন)`}, ...filteredStudents.map(s => ({value: s.studentId, label: `${s.roll.toLocaleString('bn-BD')} - ${s.nameBn}`})) ]} disabled={!filterClass} />
                        </div>
                    )}
                     {recipientType === 'teacher' && (
                        <div className="mb-4 p-4 border rounded-md bg-gray-50">
                            <Select label="শিক্ষক" value={selectedTeacher} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTeacher(e.target.value)} options={[{value: 'all', label: `সকল শিক্ষক (${teachers.length.toLocaleString('bn-BD')} জন)`}, ...teachers.map(t => ({value: t.id, label: t.name}))]} />
                        </div>
                    )}
                    {recipientType === 'specific' && (
                        <div className="mb-4 p-4 border rounded-md bg-gray-50">
                            <label className="block text-sm font-medium text-gray-700">মোবাইল নম্বর</label>
                            <input type="text" value={specificNumber} onChange={e => setSpecificNumber(e.target.value)} className="font-tiro-bangla mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md" placeholder="01..."/>
                        </div>
                    )}

                    {/* Message Body */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                         <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">বার্তা টেমপ্লেট</label>
                            <select value={template} onChange={handleTemplateChange} className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md">
                                <option value="custom">কাস্টম বার্তা</option>
                                <option value="admission">ভর্তি অনুমোদন</option>
                                <option value="password">পাসওয়ার্ড তথ্য</option>
                                <option value="notice">সাধারণ নোটিশ</option>
                            </select>
                         </div>
                         <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">বার্তার বিষয়বস্তু</label>
                             <textarea value={messageBody} onChange={e => setMessageBody(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
                             <p className="text-xs text-gray-500 mt-1">প্লেসহোল্ডার ব্যবহার করতে পারেন: [নাম], [আইডি], [পাসওয়ার্ড], [শ্রেণী]</p>
                         </div>
                    </div>
                    
                    {statusMessage && (
                        <div className={`p-4 rounded-md text-sm mb-4 ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {statusMessage.text}
                        </div>
                    )}

                    {/* Submit Button */}
                     <div className="text-right">
                        <button 
                            type="submit" 
                            className="inline-flex justify-center items-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                           {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    পাঠানো হচ্ছে...
                                </>
                           ) : (
                            'বার্তা পাঠান'
                           )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Helper Components
const RadioOption: React.FC<{name: string, value: string, checked: boolean, onChange: () => void, label: string}> = ({name, value, checked, onChange, label}) => (
    <label className="flex items-center space-x-2 cursor-pointer">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="h-4 w-4 text-brand-primary focus:ring-brand-secondary"/>
        <span>{label}</span>
    </label>
);

const Select: React.FC<{ label: string, options: { value: string | number, label: string }[], [key: string]: any }> = ({ label, options, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select {...props} className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md disabled:bg-gray-200">
            <option value="">নির্বাচন করুন</option>
             {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);


export default SmsSettingsManager;