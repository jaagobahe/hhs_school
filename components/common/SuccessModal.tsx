import React from 'react';
import Modal from './Modal';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="text-center py-4">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-700 text-lg leading-relaxed">{message}</p>
                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary transition-colors"
                    >
                        ঠিক আছে
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;
