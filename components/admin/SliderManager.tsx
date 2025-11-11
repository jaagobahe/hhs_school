import React, { useState } from 'react';
import type { GalleryImage } from '../../types';
import TrashIcon from '../icons/TrashIcon';
import PencilIcon from '../icons/PencilIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface SliderManagerProps {
    sliderImages: GalleryImage[];
    setSliderImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
}

const SliderManager: React.FC<SliderManagerProps> = ({ sliderImages, setSliderImages }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<GalleryImage | null>(null);
    const [slideToDelete, setSlideToDelete] = useState<GalleryImage | null>(null);

    const openModalForNew = () => {
        setEditingSlide(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (slide: GalleryImage) => {
        setEditingSlide(slide);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (slideToDelete) {
            setSliderImages(sliderImages.filter(slide => slide.id !== slideToDelete.id));
            setSlideToDelete(null);
        }
    };
    
    const handleSave = (caption: string) => {
        if (editingSlide) {
            setSliderImages(sliderImages.map(slide => slide.id === editingSlide.id ? { ...slide, caption } : slide));
        } else {
            const newSlide: GalleryImage = {
                id: Date.now(),
                caption,
                imageUrl: `https://picsum.photos/seed/slide${Date.now()}/1200/500`,
            };
            setSliderImages([newSlide, ...sliderImages]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">স্লাইডার ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন স্লাইড
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান স্লাইডসমূহ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sliderImages.map((slide) => (
                        <div key={slide.id} className="relative group">
                            <img src={slide.imageUrl} alt={slide.caption} className="w-full h-40 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-2">
                                 <button onClick={() => openModalForEdit(slide)} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-indigo-600 rounded-full hover:bg-indigo-700">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => setSlideToDelete(slide)} className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 rounded-full">
                                    <TrashIcon />
                                </button>
                            </div>
                            <p className="text-xs text-center mt-1 text-gray-600 truncate">{slide.caption}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingSlide ? 'স্লাইড সম্পাদনা করুন' : 'নতুন স্লাইড যোগ করুন'}
            >
                <SliderForm
                    slide={editingSlide}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!slideToDelete}
                onClose={() => setSlideToDelete(null)}
                onConfirm={confirmDelete}
                title="স্লাইড মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে এই স্লাইডটি মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface SliderFormProps {
    slide: GalleryImage | null;
    onSave: (caption: string) => void;
    onCancel: () => void;
}
const SliderForm: React.FC<SliderFormProps> = ({ slide, onSave, onCancel }) => {
    const [caption, setCaption] = useState(slide?.caption || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(caption);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">ক্যাপশন</label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            {!slide && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">ছবি আপলোড</label>
                    <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50" />
                    <p className="text-xs text-gray-500 mt-1">নমুনা হিসেবে, একটি র‍্যান্ডম ছবি যুক্ত হবে।</p>
                </div>
            )}
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{slide ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};

export default SliderManager;
