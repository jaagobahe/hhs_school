import React, { useState, useEffect, useCallback } from 'react';
import type { GalleryImage } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ImageSliderProps {
    slides: GalleryImage[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const isFirstSlide = prevIndex === 0;
            return isFirstSlide ? slides.length - 1 : prevIndex - 1;
        });
    }, [slides.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const isLastSlide = prevIndex === slides.length - 1;
            return isLastSlide ? 0 : prevIndex + 1;
        });
    }, [slides.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        if (slides.length < 2) return;
        const timer = setTimeout(goToNext, 3000); // প্রতি 3 সেকেন্ড পর স্লাইড পরিবর্তন হবে
        return () => clearTimeout(timer);
    }, [currentIndex, goToNext, slides.length]);


    return (
        <div className="h-[200px] md:h-[400px] w-full relative group rounded-lg overflow-hidden shadow-lg">
            {slides.map((slide, index) => (
                <div key={slide.id} className={`slide ${index === currentIndex ? 'active' : ''}`}>
                    <img src={slide.imageUrl} alt={slide.caption} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-0 p-4 md:bottom-0 md:p-8">
                        <h2 className="text-white text-xl md:text-3xl font-bold">{slide.caption}</h2>
                    </div>
                </div>
            ))}
            
            {/* Left Arrow */}
            <button 
                onClick={goToPrevious}
                className="slider-arrow absolute top-1/2 -translate-y-1/2 left-4 text-white p-2 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
            >
                <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            {/* Right Arrow */}
            <button 
                onClick={goToNext}
                className="slider-arrow absolute top-1/2 -translate-y-1/2 right-4 text-white p-2 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
            >
                <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Dots */}
            <div className="slider-dots absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, slideIndex) => (
                    <button 
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`dot w-3 h-3 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-gray-400'}`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;