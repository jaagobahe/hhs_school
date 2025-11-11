import React, { useState } from 'react';
import type { GalleryImage } from '../../types';
import TrashIcon from '../icons/TrashIcon';
import PencilIcon from '../icons/PencilIcon';
import PlusIcon from '../icons/PlusIcon';
import Modal from '../common/Modal';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface GalleryManagerProps {
    galleryImages: GalleryImage[];
    setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
}

const GalleryManager: React.FC<GalleryManagerProps> = ({ galleryImages, setGalleryImages }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
    const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);

    const openModalForNew = () => {
        setEditingImage(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (image: GalleryImage) => {
        setEditingImage(image);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (imageToDelete) {
            setGalleryImages(galleryImages.filter(image => image.id !== imageToDelete.id));
            setImageToDelete(null);
        }
    };

    const handleSave = (caption: string) => {
        if (editingImage) {
            setGalleryImages(galleryImages.map(img => img.id === editingImage.id ? { ...img, caption } : img));
        } else {
            const newImage: GalleryImage = {
                id: Date.now(),
                caption,
                imageUrl: `https://picsum.photos/seed/gallery${Date.now()}/500/300`,
            };
            setGalleryImages([newImage, ...galleryImages]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">গ্যালারি ব্যবস্থাপনা</h2>
                <button onClick={openModalForNew} className="inline-flex items-center py-2 px-4 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    নতুন ছবি
                </button>
            </div>

            {/* Existing Images */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">বিদ্যমান ছবিসমূহ</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image) => (
                        <div key={image.id} className="relative group">
                            <img src={image.imageUrl} alt={image.caption} className="w-full h-40 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-2">
                                <button onClick={() => openModalForEdit(image)} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-indigo-600 rounded-full hover:bg-indigo-700">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => setImageToDelete(image)} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-red-600 rounded-full hover:bg-red-700">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-xs text-center mt-1 text-gray-600 truncate">{image.caption}</p>
                        </div>
                    ))}
                </div>
            </div>

             <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingImage ? 'ছবির ক্যাপশন সম্পাদনা' : 'নতুন ছবি যোগ করুন'}
            >
                <ImageForm
                    image={editingImage}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            
            <ConfirmationDialog
                isOpen={!!imageToDelete}
                onClose={() => setImageToDelete(null)}
                onConfirm={confirmDelete}
                title="ছবি মুছে ফেলুন"
                message={<p>আপনি কি নিশ্চিতভাবে এই ছবিটি মুছে ফেলতে চান?</p>}
            />
        </div>
    );
};

// Form Component
interface ImageFormProps {
    image: GalleryImage | null;
    onSave: (caption: string) => void;
    onCancel: () => void;
}
const ImageForm: React.FC<ImageFormProps> = ({ image, onSave, onCancel }) => {
    const [caption, setCaption] = useState(image?.caption || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(caption);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">ছবির ক্যাপশন</label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            {!image && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">ছবি আপলোড</label>
                    <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50" />
                    <p className="text-xs text-gray-500 mt-1">নমুনা হিসেবে, একটি র‍্যান্ডম ছবি যুক্ত হবে।</p>
                </div>
            )}
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">বাতিল</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-secondary">{image ? 'আপডেট করুন' : 'যোগ করুন'}</button>
            </div>
        </form>
    );
};


export default GalleryManager;
