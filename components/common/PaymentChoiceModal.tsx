import React from 'react';
import Modal from './Modal';

interface PaymentChoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPayOnline: () => void;
    onPayOffline: () => void;
    amount: number;
}

const PaymentChoiceModal: React.FC<PaymentChoiceModalProps> = ({ isOpen, onClose, onPayOnline, onPayOffline, amount }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="পেমেন্ট পদ্ধতি নির্বাচন করুন">
            <div className="text-center">
                <p className="text-gray-600">আপনার আবেদনটি প্রায় সম্পন্ন। অনুগ্রহ করে আবেদন ফি পরিশোধ করুন।</p>
                <p className="text-4xl font-bold text-brand-primary my-4 font-tiro-bangla">
                    {amount.toLocaleString('bn-BD')} টাকা
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={onPayOnline}
                        className="w-full p-4 border-2 border-green-500 rounded-lg text-left hover:bg-green-50 transition-all duration-200"
                    >
                        <h4 className="font-bold text-lg text-green-700">অনলাইনে পেমেন্ট করুন</h4>
                        <p className="text-sm text-gray-600 mt-1">বিকাশের মাধ্যমে এখনই পেমেন্ট করে আবেদন চূড়ান্ত করুন।</p>
                    </button>
                    <button
                        onClick={onPayOffline}
                        className="w-full p-4 border-2 border-blue-500 rounded-lg text-left hover:bg-blue-50 transition-all duration-200"
                    >
                        <h4 className="font-bold text-lg text-blue-700">অফিসে পেমেন্ট করুন</h4>
                        <p className="text-sm text-gray-600 mt-1">আবেদন জমা দিন এবং পরে বিদ্যালয় অফিসে এসে পেমেন্ট সম্পন্ন করুন।</p>
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentChoiceModal;