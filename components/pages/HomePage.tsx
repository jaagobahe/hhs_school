import React from 'react';
import type { Page, Teacher, Notice, GalleryImage } from '../../types';
import UsersIcon from '../icons/UsersIcon';
import TeacherCard from '../TeacherCard';
import BookOpenIcon from '../icons/BookOpenIcon';
import AcademicCapIcon from '../icons/AcademicCapIcon';
import AtomIcon from '../icons/AtomIcon';
import PersonIcon from '../icons/PersonIcon';
import NationalHelpline from '../common/NationalHelpline';
import ImageSlider from '../ImageSlider';
import ChartBarIcon from '../icons/ChartBarIcon';
import ClipboardListIcon from '../icons/ClipboardListIcon';
import PhotographIcon from '../icons/PhotographIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const NoticeItem: React.FC<{ date: string; title: string; }> = ({ date, title }) => (
    <li className="flex items-start space-x-3 py-3 border-b border-gray-200 last:border-b-0">
        <div className="flex-shrink-0 text-center bg-brand-secondary text-white rounded-md p-2">
            <p className="font-bold text-lg font-tiro-bangla">{date.split(' ')[0]}</p>
            <p className="text-xs">{date.split(' ').length > 1 ? date.split(' ')[1] : ''}</p>
        </div>
        <a href="#" className="text-gray-700 hover:text-brand-primary transition-colors">{title}</a>
    </li>
);

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
    <div className={`bg-white p-5 rounded-2xl shadow-lg text-center flex flex-col items-center justify-start transform hover:scale-105 transition-transform duration-300 ease-in-out h-full border ${className || ''}`}>
        <div className="bg-green-800 text-white rounded-full p-3 mb-3 flex-shrink-0">
            {icon}
        </div>
        <h4 className="text-sm md:text-lg lg:text-xl font-bold text-green-800 mb-2">{title}</h4>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
    </div>
);

const features = [
    {
        icon: <BookOpenIcon className="w-8 h-8" />,
        title: 'মানসম্মত শিক্ষা',
        description: 'আধুনিক শিক্ষা পদ্ধতি ও অভিজ্ঞ শিক্ষকমণ্ডলীর মাধ্যমে উন্নত শিক্ষা প্রদান'
    },
    {
        icon: <UsersIcon className="w-8 h-8" />,
        title: 'সহশিক্ষা কার্যক্রম',
        description: 'খেলাধুলা, সাংস্কৃতিক কর্মকাণ্ড ও বিভিন্ন প্রতিযোগিতার মাধ্যমে সার্বিক বিকাশ'
    },
    {
        icon: <AcademicCapIcon className="w-8 h-8" />,
        title: 'গৌরবময় ইতিহাস',
        description: <><span className="font-tiro-bangla">১৪০+</span> বছরের ঐতিহ্য নিয়ে এগিয়ে চলেছি শিক্ষার আলো ছড়িয়ে</>
    },
];

const departments = [
    {
        icon: <AtomIcon className="w-8 h-8" />,
        title: 'বিজ্ঞান বিভাগ',
    },
    {
        icon: <PersonIcon className="w-8 h-8" />,
        title: 'মানবিক বিভাগ',
    }
];

const StatsCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transform hover:-translate-y-2 transition-transform duration-300">
        <div className="text-3xl text-brand-primary">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-gray-800 font-tiro-bangla">{value}</p>
            <p className="text-gray-600">{label}</p>
        </div>
    </div>
);

const QuickLinkItem: React.FC<{ icon: React.ReactNode; label: string; page: Page; onNavigate: (page: Page) => void; }> = ({ icon, label, page, onNavigate }) => (
    <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate(page); }}
        className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-brand-secondary hover:text-white transition-colors group"
    >
        <div className="text-brand-primary group-hover:text-white">{icon}</div>
        <span className="ml-4 font-medium">{label}</span>
        <ChevronRightIcon className="w-5 h-5 ml-auto text-gray-400 group-hover:text-white" />
    </a>
);


interface HomePageProps {
    onNavigate: (page: Page) => void;
    onTeacherDetailsClick: (teacher: Teacher) => void;
    notices: Notice[];
    teachers: Teacher[];
    sliderImages: GalleryImage[];
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onTeacherDetailsClick, notices, teachers, sliderImages }) => {
    const headmaster = teachers.find(t => t.designation === 'প্রধান শিক্ষক');
    
    return (
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 space-y-12">

                {/* Image Slider Section */}
                <section>
                    <ImageSlider slides={sliderImages} />
                </section>
                
                {/* Statistics Section */}
                <section>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard icon={<UsersIcon className="w-10 h-10" />} label="মোট শিক্ষার্থী" value="৩৫২" />
                        <StatsCard icon={<AcademicCapIcon className="w-10 h-10" />} label="অভিজ্ঞ শিক্ষক" value="১৪" />
                        <StatsCard icon={<UsersIcon className="w-10 h-10" />} label="কর্মচারী" value="৩" />
                        <StatsCard icon={<ChartBarIcon className="w-10 h-10" />} label="পাশের হার (এসএসসি)" value="৯৭%" />
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* Headmaster's Message Section */}
                        {headmaster && (
                            <section className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">প্রধান শিক্ষকের বাণী</h3>
                                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                    <img src={headmaster.imageUrl} alt={headmaster.name} className="w-32 h-36 rounded-lg object-cover flex-shrink-0 border-4 border-gray-200" />
                                    <div className="text-left">
                                        <h4 className="text-xl font-bold text-gray-800">{headmaster.name}</h4>
                                        <p className="text-gray-600 mb-3">{headmaster.designation}</p>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            হরিপুর উচ্চ বিদ্যালয়ের পক্ষ থেকে সকলকে জানাই আন্তরিক শুভেচ্ছা ও অভিনন্দন। ঐতিহ্যবাহী এই শিক্ষা প্রতিষ্ঠানটি দীর্ঘদিন ধরে এই অঞ্চলে জ্ঞানের আলো ছড়িয়ে আসছে। আমরা শিক্ষার্থীদের শুধু পুঁথিগত বিদ্যায় শিক্ষিত করি না, বরং তাদের নৈতিক ও মানবিক মূল্যবোধ সম্পন্ন সুনাগরিক হিসেবে গড়ে তুলতে সর্বদা সচেষ্ট।
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}
                        
                        {/* Combined Features and Departments Section */}
                        <section className="p-6 rounded-lg">
                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {features.map((feature, index) => (
                                    <FeatureCard
                                        key={index}
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                        className={index === 2 ? "sm:col-span-1 col-span-2" : ""}
                                    />
                                ))}
                            </div>
                            
                            <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mt-10 mb-6">আমাদের রয়েছে</h3>
                            <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
                                {departments.map((dept, index) => (
                                    <FeatureCard
                                        key={index}
                                        icon={dept.icon}
                                        title={dept.title}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Teachers Section */}
                        <section>
                             <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-6">আমাদের শিক্ষকবৃন্দ</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 {teachers.slice(1, 5).map(teacher => (
                                     <TeacherCard key={teacher.id} teacher={teacher} onDetailsClick={onTeacherDetailsClick} />
                                 ))}
                             </div>
                             <div className="text-center mt-8">
                                <button onClick={() => onNavigate('teachers')} className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105">
                                    সকল শিক্ষক দেখুন
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Notice Board */}
                        <aside className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">নোটিশ বোর্ড</h3>
                            <ul className="space-y-2">
                                {notices.slice(0, 4).map(notice => (
                                    <NoticeItem key={notice.id} date={notice.date} title={notice.title} />
                                ))}
                            </ul>
                            <div className="text-right mt-4">
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('notices'); }} className="text-brand-secondary hover:underline">সকল নোটিশ</a>
                            </div>
                        </aside>

                        {/* National Helpline */}
                        <NationalHelpline />

                         {/* Quick Links Section */}
                        <aside className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-2xl font-semibold text-brand-primary border-b-2 border-brand-accent pb-2 mb-4">গুরুত্বপূর্ণ লিংক</h3>
                            <div className="space-y-3">
                                <QuickLinkItem icon={<ClipboardListIcon className="w-6 h-6"/>} label="ফলাফল" page="results" onNavigate={onNavigate} />
                                <QuickLinkItem icon={<AcademicCapIcon className="w-6 h-6"/>} label="ভর্তি তথ্য" page="admission" onNavigate={onNavigate} />
                                <QuickLinkItem icon={<PhotographIcon className="w-6 h-6"/>} label="ফটো গ্যালারি" page="gallery" onNavigate={onNavigate} />
                                <QuickLinkItem icon={<UsersIcon className="w-6 h-6"/>} label="শিক্ষকবৃন্দ" page="teachers" onNavigate={onNavigate} />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;