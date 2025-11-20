
import React from 'react';
import XIcon from '../icons/XIcon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    size?: 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null;

    const sizeClass = size === 'lg' ? 'modal-lg' : '';

    return (
        <div 
            className="modal-overlay"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`modal-content ${sizeClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-semibold text-brand-primary">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <XIcon />
                    </button>
                </div>
                <div className="p-6 flex-grow">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;