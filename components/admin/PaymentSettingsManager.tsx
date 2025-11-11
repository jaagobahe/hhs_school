import React, { useState, useEffect, useMemo } from 'react';
import type { PaymentSettings, OnlineAdmission, Class } from '../../types';
import ToggleSwitch from '../common/ToggleSwitch';
import PaymentReceiptModal from './PaymentReceiptModal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import EyeIcon from '../icons/EyeIcon';
import PrinterIcon from '../icons/PrinterIcon';
import TrashIcon from '../icons/TrashIcon';
import DownloadIcon from '../icons/DownloadIcon';

interface PaymentSettingsManagerProps {
    settings: PaymentSettings;
    setSettings: React.Dispatch<React.SetStateAction<PaymentSettings>>;
    onlineAdmissions: OnlineAdmission[];
    classes: Class[];
    setOnlineAdmissions: React.Dispatch<React.SetStateAction<OnlineAdmission[]>>;
}

const PaymentSettingsManager: React.FC<PaymentSettingsManagerProps> = ({ settings, setSettings, onlineAdmissions, classes, setOnlineAdmissions }) => {
    const [localSettings, setLocalSettings] = useState<PaymentSettings>(settings);
    const [message, setMessage] = useState('');

    // States for modals
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<OnlineAdmission | null>(null);
    const [paymentToDelete, setPaymentToDelete] = useState<OnlineAdmission | null>(null);

    const classMap = useMemo(() => new Map(classes.map(c => [c.id, c.name])), [classes]);

    const successfulPayments = useMemo(() => {
        return onlineAdmissions.filter(app => app.paymentStatus === 'paid')
                               .sort((a, b) => new Date(b.paymentDate || 0).getTime() - new Date(a.paymentDate || 0).getTime());
    }, [onlineAdmissions]);


    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleBKashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setLocalSettings(prev => ({
            ...prev,
            bKash: {
                ...prev.bKash,
                [name]: type === 'checkbox' ? checked : value,
            }
        }));
    };

    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSettings(prev => ({
            ...prev,
            admissionFee: Number(e.target.value)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSettings(localSettings);
        setMessage('সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleViewReceipt = (payment: OnlineAdmission) => {
        setSelectedPayment(payment);
        setIsReceiptModalOpen(true);
    };

    const confirmDeletePayment = () => {
        if (paymentToDelete) {
            setOnlineAdmissions(prev =>
                prev.map(app =>
                    app.id === paymentToDelete.id
                        ? {
                            ...app,
                            paymentStatus: 'pending',
                            paymentGateway: undefined,
                            paymentTransactionId: undefined,
                            paymentDate: undefined,
                        }
                        : app
                )
            );
            setPaymentToDelete(null);
            setMessage('পেমেন্ট সফলভাবে মুছে ফেলা হয়েছে। আবেদনটি এখন অপরিশোধিত অবস্থায় আছে।');
            setTimeout(() => setMessage(''), 4000);
        }
    };


    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">পেমেন্ট গেটওয়ে সেটিংস</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {message && (
                        <div className="bg-green-100 text-green-800 p-3 rounded-md text-center">{message}</div>
                    )}
                    
                    {/* General Settings */}
                    <section>
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">সাধারণ সেটিংস</h3>
                        <div className="max-w-sm">
                            <label htmlFor="admissionFee" className="block text-sm font-medium text-gray-700">ভর্তি ফরমের মূল্য (BDT)</label>
                            <input
                                type="number"
                                id="admissionFee"
                                name="admissionFee"
                                value={localSettings.admissionFee}
                                onChange={handleFeeChange}
                                className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </section>

                    {/* bKash Settings */}
                    <section>
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">বিকাশ পেমেন্ট গেটওয়ে</h3>
                            <ToggleSwitch
                                id="bKash-enabled-toggle"
                                checked={localSettings.bKash.enabled}
                                onChange={(checked) => setLocalSettings(prev => ({...prev, bKash: {...prev.bKash, enabled: checked}}))}
                            />
                        </div>
                        {localSettings.bKash.enabled && (
                             <div className="space-y-4 animate-page-fade-in">
                                 <div className="flex items-center space-x-4">
                                    <label htmlFor="bKash-sandboxMode-toggle" className="block text-sm font-medium text-gray-700">স্যান্ডবক্স মোড</label>
                                    <ToggleSwitch
                                        id="bKash-sandboxMode-toggle"
                                        checked={localSettings.bKash.sandboxMode}
                                        onChange={(checked) => setLocalSettings(prev => ({...prev, bKash: {...prev.bKash, sandboxMode: checked}}))}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="মার্চেন্ট নম্বর" name="merchantNumber" value={localSettings.bKash.merchantNumber || ''} onChange={handleBKashChange} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                    <InputField label="ইউজারনেম" name="username" value={localSettings.bKash.username || ''} onChange={handleBKashChange} />
                                    <InputField label="অ্যাপ কী (App Key)" name="appKey" value={localSettings.bKash.appKey || ''} onChange={handleBKashChange} />
                                    <InputField label="অ্যাপ সিক্রেট (App Secret)" name="appSecret" type="password" value={localSettings.bKash.appSecret || ''} onChange={handleBKashChange} />
                                    <InputField label="পাসওয়ার্ড" name="password" type="password" value={localSettings.bKash.password || ''} onChange={handleBKashChange} />
                                </div>
                             </div>
                        )}
                    </section>
                    
                    <div className="pt-5 text-right">
                        <button type="submit" className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary">
                            পরিবর্তন সংরক্ষণ করুন
                        </button>
                    </div>
                </form>

                 {/* Payment History Section */}
                <section className="mt-12">
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">ভর্তি পেমেন্টের ইতিহাস</h3>
                    {successfulPayments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ছাত্রের নাম</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">শ্রেণী</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">গেটওয়ে</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">TrxID</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">টাকা</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">তারিখ</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 font-tiro-bangla">
                                    {successfulPayments.map(payment => (
                                        <tr key={payment.id}>
                                            <td className="px-4 py-4 whitespace-nowrap font-hind-siliguri">{payment.studentNameBn}</td>
                                            <td className="px-4 py-4 whitespace-nowrap font-hind-siliguri">{classMap.get(payment.admissionClassId)}</td>
                                            <td className="px-4 py-4 whitespace-nowrap font-sans">{payment.paymentGateway}</td>
                                            <td className="px-4 py-4 whitespace-nowrap font-mono">{payment.paymentTransactionId}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right">{payment.paymentAmount?.toLocaleString('bn-BD')}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleString('bn-BD') : 'N/A'}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right space-x-1">
                                                <button onClick={() => handleViewReceipt(payment)} className="p-1 text-blue-600 hover:text-blue-800" title="রশিদ দেখুন"><EyeIcon className="w-5 h-5" /></button>
                                                <button onClick={() => handleViewReceipt(payment)} className="p-1 text-gray-600 hover:text-gray-800" title="প্রিন্ট করুন"><PrinterIcon className="w-5 h-5" /></button>
                                                <button onClick={() => handleViewReceipt(payment)} className="p-1 text-green-600 hover:text-green-800" title="PDF হিসাবে সংরক্ষণ করুন"><DownloadIcon className="w-5 h-5" /></button>
                                                <button onClick={() => setPaymentToDelete(payment)} className="p-1 text-red-600 hover:text-red-800" title="পেমেন্ট মুছুন"><TrashIcon className="w-5 h-5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-6">
                            <p>এখনও কোনো সফল পেমেন্টের তথ্য পাওয়া যায়নি।</p>
                        </div>
                    )}
                </section>
            </div>

            {isReceiptModalOpen && (
                <PaymentReceiptModal 
                    isOpen={isReceiptModalOpen}
                    onClose={() => setIsReceiptModalOpen(false)}
                    admission={selectedPayment}
                    classes={classes}
                />
            )}
             <ConfirmationDialog 
                isOpen={!!paymentToDelete}
                onClose={() => setPaymentToDelete(null)}
                onConfirm={confirmDeletePayment}
                title="পেমেন্ট মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে এই পেমেন্টটি মুছে ফেলতে চান? এটি করলে আবেদনটি 'অপরিশোধিত' স্ট্যাটাসে ফিরে যাবে।</p>}
            />

        </div>
    );
};

const InputField: React.FC<{ label: string } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            {...props}
            id={props.id || props.name}
            className={props.className || "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"}
        />
    </div>
);

export default PaymentSettingsManager;