import React, { useState } from 'react';
import Modal from './Modal';
import { PaymentSettings } from '../../types';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: (transactionId: string, gateway: string) => void;
    amount: number;
    paymentSettings: PaymentSettings;
}

type VerificationStatus = 'idle' | 'verifying' | 'success';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, amount, paymentSettings }) => {
    const [transactionId, setTransactionId] = useState('');
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
    const [error, setError] = useState('');

    const bKashSettings = paymentSettings.bKash;

    const handleVerify = () => {
        if (!transactionId.trim()) {
            setError('অনুগ্রহ করে একটি বৈধ ট্রানজেকশন আইডি দিন।');
            return;
        }
        setError('');
        setVerificationStatus('verifying');

        // Simulate API verification
        setTimeout(() => {
            setVerificationStatus('success');
            // After showing success message, submit and close
            setTimeout(() => {
                onPaymentSuccess(transactionId, 'bKash');
            }, 2000); // Wait 2 seconds with success message

        }, 1500); // Verification time
    };
    
    if (!bKashSettings.enabled) {
        return (
             <Modal isOpen={isOpen} onClose={onClose} title="পেমেন্ট недоступен">
                 <p className="text-center text-red-500">দুঃখিত, এই মুহূর্তে অনলাইন পেমেন্ট সাময়িকভাবে বন্ধ আছে।</p>
             </Modal>
        );
    }

    if (verificationStatus === 'success') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="পেমেন্ট সফল">
                <div className="text-center py-8">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">যাচাই সফল হয়েছে</h3>
                    <p className="text-gray-600 mt-2">আপনার আবেদনটি চূড়ান্তভাবে জমা দেওয়া হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।</p>
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="ভর্তি ফি পেমেন্ট">
            <div className="text-center">
                <p className="text-gray-600">আবেদন ফি</p>
                <p className="text-4xl font-bold text-brand-primary my-2 font-tiro-bangla">{amount.toLocaleString('bn-BD')} টাকা</p>
            </div>
            
            <div className="mt-4 p-4 bg-gray-100 rounded-lg animate-page-fade-in">
                <div className="flex items-center gap-4 mb-3">
                    <img src="https://i.ibb.co/fnbvy1W/bkash.png" alt="bKash" className="h-10"/>
                    <h4 className="font-semibold text-lg">বিকাশ পেমেন্টের নির্দেশাবলী</h4>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>আপনার বিকাশ অ্যাপ থেকে 'পেমেন্ট' অপশন সিলেক্ট করুন।</li>
                    <li>মার্চেন্ট নম্বর হিসেবে দিন: <strong className="text-brand-primary font-mono">{bKashSettings.merchantNumber}</strong></li>
                    <li>টাকার পরিমাণ দিন: <strong className="text-brand-primary font-tiro-bangla">{amount.toLocaleString('bn-BD')} টাকা</strong></li>
                    <li>রেফারেন্স হিসেবে আপনার নাম দিন।</li>
                    <li>পেমেন্ট সম্পন্ন করার পর প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচের বক্সে প্রদান করুন।</li>
                </ol>

                <div className="mt-6">
                    <label htmlFor="trxId" className="block text-sm font-medium text-gray-800">ট্রানজেকশন আইডি (TrxID)</label>
                    <input
                        type="text"
                        id="trxId"
                        value={transactionId}
                        onChange={(e) => { setTransactionId(e.target.value); setError(''); }}
                        className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="যেমন: 9A43G8D2F1"
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" disabled={verificationStatus === 'verifying'}>বাতিল</button>
                <button 
                    type="button" 
                    onClick={handleVerify} 
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    disabled={!transactionId || verificationStatus === 'verifying'}
                >
                    {verificationStatus === 'verifying' && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                    )}
                    {verificationStatus === 'verifying' ? 'যাচাই করা হচ্ছে...' : 'যাচাই ও সাবমিট করুন'}
                </button>
            </div>

        </Modal>
    );
};

export default PaymentModal;