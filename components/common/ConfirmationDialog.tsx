import React from 'react';
import Modal from './Modal';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-6">
                <div className="text-gray-700">{message}</div>
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        বাতিল
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        নিশ্চিত করুন
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
