import React, { useState, useEffect } from 'react';
import type { Notice } from '../../types';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';
import DownloadIcon from '../icons/DownloadIcon';

interface NoticeManagerProps {
    notices: Notice[];
    setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
}

const NoticeManager: React.FC<NoticeManagerProps> = ({ notices, setNotices }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);
    
    const openModalForNew = () => {
        setEditingNotice(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (notice: Notice) => {
        setEditingNotice(notice);
        setIsModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (noticeToDelete) {
            setNotices(notices.filter(n => n.id !== noticeToDelete.id));
            setNoticeToDelete(null);
        }
    };

    const handleSave = (noticeData: Omit<Notice, 'id'>) => {
        if (editingNotice) {
            const updatedNotice: Notice = {
                ...editingNotice,
                ...noticeData,
            };
            setNotices(notices.map(n => (n.id === updatedNotice.id ? updatedNotice : n)));
        } else {
            const newNotice: Notice = {
                id: Date.now(),
                ...noticeData,
            };
            setNotices([newNotice, ...notices]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">নোটিশ ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন নোটিশ
                </button>
            </div>

            {/* Existing Notices Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান নোটিশসমূহ</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিরোনাম</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">পদক্ষেপ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {notices.map((notice) => (
                                <tr key={notice.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-tiro-bangla">{notice.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {notice.title}
                                        {notice.fileUrl && <span title={notice.fileName || 'ফাইল সংযুক্ত আছে'}><DownloadIcon className="w-4 h-4 inline-block ml-2 text-green-600" /></span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {notice.isUrgent && (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                জরুরী
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => openModalForEdit(notice)} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => setNoticeToDelete(notice)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"><TrashIcon className="w-5 h-5" /></button>
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
                title={editingNotice ? 'নোটিশ সম্পাদনা করুন' : 'নতুন নোটিশ যোগ করুন'}
            >
                <NoticeForm
                    notice={editingNotice}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!noticeToDelete}
                onClose={() => setNoticeToDelete(null)}
                onConfirm={confirmDelete}
                title="নোটিশ মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে এই নোটিশটি <strong className="font-bold">{noticeToDelete?.title}</strong> মুছে ফেলতে চান?</p>}
            />

        </div>
    );
};


// Form Component for Modal
interface NoticeFormProps {
    notice: Notice | null;
    onSave: (data: Omit<Notice, 'id'>) => void;
    onCancel: () => void;
}

const NoticeForm: React.FC<NoticeFormProps> = ({ notice, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [details, setDetails] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (notice) {
            setTitle(notice.title);
            setDate(new Date().toISOString().slice(0, 10)); 
            setDetails(notice.details);
            setIsUrgent(notice.isUrgent || false);
            setFileUrl(notice.fileUrl || '');
            setFileName(notice.fileName || '');
        } else {
            setTitle('');
            setDate(new Date().toISOString().slice(0, 10));
            setDetails('');
            setIsUrgent(false);
            setFileUrl('');
            setFileName('');
        }
    }, [notice]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileUrl(event.target?.result as string);
                setFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setFileUrl('');
        setFileName('');
        const fileInput = document.getElementById('notice-file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedDate = new Date(date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' });
        onSave({ title, date: formattedDate, details, isUrgent, fileUrl, fileName });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="notice-title" className="block text-sm font-medium text-gray-700">নোটিশের শিরোনাম</label>
                <input type="text" id="notice-title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary" required />
            </div>
            <div>
                <label htmlFor="notice-date" className="block text-sm font-medium text-gray-700">প্রকাশের তারিখ</label>
                <input type="date" id="notice-date" value={date} onChange={e => setDate(e.target.value)} className="font-tiro-bangla mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
                <label htmlFor="notice-details" className="block text-sm font-medium text-gray-700">বিস্তারিত</label>
                <textarea id="notice-details" value={details} onChange={e => setDetails(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
            </div>
             <div>
                <label htmlFor="notice-file" className="block text-sm font-medium text-gray-700">ফাইল আপলোড (ঐচ্ছিক)</label>
                <input
                    type="file"
                    id="notice-file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"
                />
                {fileName && (
                    <div className="mt-2 flex items-center justify-between text-sm bg-gray-100 p-2 rounded-md">
                        <span className="text-gray-700 truncate">
                            <DownloadIcon className="w-4 h-4 inline-block mr-2" />
                            {fileName}
                        </span>
                        <button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 font-semibold">মুছে ফেলুন</button>
                    </div>
                )}
            </div>
            <div className="flex items-center">
                <input
                    id="notice-isUrgent"
                    name="isUrgent"
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-300 rounded"
                />
                <label htmlFor="notice-isUrgent" className="ml-2 block text-sm text-gray-900">
                    এটি একটি জরুরী নোটিশ
                </label>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{notice ? 'আপডেট করুন' : 'প্রকাশ করুন'}</button>
            </div>
        </form>
    );
};

export default NoticeManager;