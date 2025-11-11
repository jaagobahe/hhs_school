import React, { useState, useEffect } from 'react';
import type { SscResult } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface ResultsManagerProps {
    sscResults: SscResult[];
    setSscResults: React.Dispatch<React.SetStateAction<SscResult[]>>;
}

const initialFormState: SscResult = { year: new Date().getFullYear(), candidates: 0, passed: 0, passRate: 0, gpa5: 0 };

const ResultsManager: React.FC<ResultsManagerProps> = ({ sscResults, setSscResults }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResult, setEditingResult] = useState<SscResult | null>(null);
    const [resultToDelete, setResultToDelete] = useState<SscResult | null>(null);

    const openModalForNew = () => {
        setEditingResult(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (result: SscResult) => {
        setEditingResult(result);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (resultToDelete) {
            setSscResults(sscResults.filter(r => r.year !== resultToDelete.year));
            setResultToDelete(null);
        }
    };
    
    const handleSave = (formData: SscResult) => {
        if (editingResult) {
            setSscResults(sscResults.map(r => r.year === editingResult.year ? formData : r));
        } else {
             if (sscResults.find(r => r.year === formData.year)) {
                alert(`${formData.year} সালের ফলাফল ইতিমধ্যে বিদ্যমান।`);
                return;
            }
            setSscResults([formData, ...sscResults].sort((a, b) => b.year - a.year));
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">ফলাফল ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন ফলাফল
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান ফলাফলসমূহ</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">সাল</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">মোট পরীক্ষার্থী</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">কৃতকার্য</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পাশের হার</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">জিপিএ-৫</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sscResults.map((result) => (
                                <tr key={result.year}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{result.year.toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{result.candidates.toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{result.passed.toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{result.passRate.toLocaleString('bn-BD')}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{result.gpa5.toLocaleString('bn-BD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(result)} className="text-indigo-600 hover:text-indigo-900 p-1"><PencilIcon /></button>
                                        <button onClick={() => setResultToDelete(result)} className="text-red-600 hover:text-red-900 p-1"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

             <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingResult ? 'ফলাফল সম্পাদনা করুন' : 'নতুন ফলাফল যোগ করুন'}
            >
                <ResultForm
                    result={editingResult}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!resultToDelete}
                onClose={() => setResultToDelete(null)}
                onConfirm={confirmDelete}
                title="ফলাফল মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে <strong className="font-bold">{resultToDelete?.year.toLocaleString('bn-BD')}</strong> সালের ফলাফল মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface ResultFormProps {
    result: SscResult | null;
    onSave: (data: SscResult) => void;
    onCancel: () => void;
}
const ResultForm: React.FC<ResultFormProps> = ({ result, onSave, onCancel }) => {
    const [formData, setFormData] = useState<SscResult>(initialFormState);

    useEffect(() => {
        if (result) {
            setFormData(result);
        } else {
            setFormData(initialFormState);
        }
    }, [result]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: Number(value) };

        if (name === 'passed' || name === 'candidates') {
            if (newFormData.candidates > 0) {
                newFormData.passRate = parseFloat(((newFormData.passed / newFormData.candidates) * 100).toFixed(2));
            } else {
                newFormData.passRate = 0;
            }
        }
        setFormData(newFormData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">সাল</label>
                    <input type="number" name="year" value={formData.year} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" disabled={!!result} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">মোট পরীক্ষার্থী</label>
                    <input type="number" name="candidates" value={formData.candidates} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">কৃতকার্য</label>
                    <input type="number" name="passed" value={formData.passed} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">পাশের হার (%)</label>
                    <input type="number" name="passRate" value={formData.passRate} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">জিপিএ-৫</label>
                    <input type="number" name="gpa5" value={formData.gpa5} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{result ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

export default ResultsManager;
