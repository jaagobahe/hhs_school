import React from 'react';

interface SiteSettingsManagerProps {
    logoUrl: string;
    setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const SiteSettingsManager: React.FC<SiteSettingsManagerProps> = ({ logoUrl, setLogoUrl }) => {

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">সাইট সেটিংস</h2>
            <form className="bg-white p-8 rounded-lg shadow-md space-y-8">
                {/* Basic Info */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">মৌলিক তথ্য</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">স্কুলের নাম</label>
                            <input type="text" defaultValue="হরিপুর উচ্চ বিদ্যালয়" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">স্থাপিত সাল</label>
                            <input type="text" defaultValue="১৮৮২" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-tiro-bangla" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">স্কুলের লোগো</label>
                            <div className="mt-1 flex items-center space-x-4">
                                <img src={logoUrl} alt="Current Logo" className="h-16 w-16 rounded-full bg-gray-100 object-cover border" />
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Homepage Stats */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">হোমপেজ পরিসংখ্যান</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">শিক্ষার্থী</label>
                            <input type="text" defaultValue="৩৫২" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-tiro-bangla" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">শিক্ষক</label>
                            <input type="text" defaultValue="১৪" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-tiro-bangla" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">পাশের হার</label>
                            <input type="text" defaultValue="৯৫%" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-tiro-bangla" />
                        </div>
                    </div>
                </section>

                {/* Headmaster's Message */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">প্রধান শিক্ষকের বাণী</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">বাণী</label>
                        <textarea rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                            হরিপুর উচ্চ বিদ্যালয়ের পক্ষ থেকে সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন। ঐতিহ্যবাহী এই শিক্ষা প্রতিষ্ঠানটি দীর্ঘদিন ধরে এই অঞ্চলে জ্ঞানের আলো ছড়িয়ে আসছে। আমরা শিক্ষার্থীদের শুধু পুঁথিগত বিদ্যায় শিক্ষিত করি না, বরং তাদের নৈতিক ও মানবিক মূল্যবোধ সম্পন্ন সুনাগরিক হিসেবে গড়ে তুলতে সর্বদা সচেষ্ট।
                        </textarea>
                    </div>
                </section>

                <div className="pt-5 text-right">
                    <button type="submit" className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary">
                        পরিবর্তন সংরক্ষণ করুন
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettingsManager;