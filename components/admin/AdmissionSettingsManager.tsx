import React, { useState, useEffect } from 'react';
import type { AdmissionSettings } from '../../types';
import ToggleSwitch from '../common/ToggleSwitch';

interface AdmissionSettingsManagerProps {
    settings: AdmissionSettings;
    setSettings: React.Dispatch<React.SetStateAction<AdmissionSettings>>;
}

const AdmissionSettingsManager: React.FC<AdmissionSettingsManagerProps> = ({ settings, setSettings }) => {
    const [localSettings, setLocalSettings] = useState<AdmissionSettings>(settings);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSettings(localSettings);
        setMessage('ভর্তি ফরমের সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ভর্তি ফরম সেটিংস</h2>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {message && (
                        <div className="bg-green-100 text-green-800 p-3 rounded-md text-center">{message}</div>
                    )}

                    <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-700">ভর্তি ফরম পাবলিক করুন</h3>
                        <ToggleSwitch
                            id="formEnabled"
                            checked={localSettings.formEnabled}
                            onChange={(checked) => setLocalSettings(prev => ({ ...prev, formEnabled: checked }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">আবেদন শুরুর তারিখ</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={localSettings.startDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">আবেদন শেষের তারিখ</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={localSettings.endDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="unavailableMessage" className="block text-sm font-medium text-gray-700">ফরম недоступ্য থাকাকালীন বার্তা</label>
                        <textarea
                            id="unavailableMessage"
                            name="unavailableMessage"
                            rows={4}
                            value={localSettings.unavailableMessage}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="যেমন: ভর্তি কার্যক্রম সাময়িকভাবে বন্ধ আছে। পুনরায় চালু হওয়ার জন্য অপেক্ষা করুন।"
                        ></textarea>
                    </div>

                    <div className="pt-5 text-right">
                        <button type="submit" className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary">
                            সংরক্ষণ করুন
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdmissionSettingsManager;
