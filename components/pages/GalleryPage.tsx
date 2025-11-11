import React from 'react';
import type { GalleryImage } from '../../types';

interface GalleryPageProps {
    images: GalleryImage[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ images }) => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">ফটো গ্যালারি</h2>
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <figure>
                                <img
                                    alt={image.caption}
                                    src={image.imageUrl}
                                    className="w-full h-56 object-cover"
                                />
                                <figcaption className="p-4 text-center border-t border-gray-100 h-24 flex items-center justify-center">
                                    <p className="text-gray-800 font-medium">{image.caption}</p>
                                </figcaption>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
