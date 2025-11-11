import React from 'react';

interface ToggleSwitchProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    labelOn?: string;
    labelOff?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange, labelOn = 'On', labelOff = 'Off' }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <label htmlFor={id} className="flex items-center cursor-pointer" title={checked ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}>
            <div className="relative">
                <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={handleChange} />
                <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`}></div>
            </div>
        </label>
    );
};

export default ToggleSwitch;
