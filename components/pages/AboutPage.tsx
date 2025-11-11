import React from 'react';

const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold text-center text-brand-primary mb-8">{children}</h2>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-brand-secondary border-b-2 border-brand-accent pb-2 mb-4">{title}</h3>
        <div className="text-gray-700 space-y-4 leading-relaxed">
            {children}
        </div>
    </div>
);

const ApprovalInfoTables: React.FC = () => {
    const branchData = [
        { class: 'ষষ্ঠ', branch: 'খ', date: '০৩/০৫/২০০৩ ইং', approvedBy: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, দিনাজপুর।' }
    ];

    const subjectData = [
        { class: 'নবম', subject: 'কম্পিউটার শিক্ষা', date: '১২/০৭/২০০৩ ইং', approvedBy: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, দিনাজপুর।' }
    ];

    const groupData = [
        { class: 'নবম', group: 'বিজ্ঞান বিভাগ', date: '২৯/০৪/২০১০ ইং', approvedBy: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, দিনাজপুর।' },
        { class: 'দশম', group: 'বিজ্ঞান বিভাগ', date: '২৯/০৪/২০১০ ইং', approvedBy: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, দিনাজপুর।' }
    ];
    
    return (
        <div className="mt-12">
            {/* Branch Approval */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ষষ্ঠ শ্রেণির শাখা তথ্য</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-yellow-400 text-gray-800">
                            <tr>
                                <th className="py-2 px-3 border font-medium">শ্রেণী</th>
                                <th className="py-2 px-3 border font-medium">শাখা</th>
                                <th className="py-2 px-3 border font-medium">অনুমোদনের তারিখ</th>
                                <th className="py-2 px-3 border font-medium">অনুমোদন যে দিয়েছে</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {branchData.map((row, index) => (
                                <tr key={index} className="border-t text-center">
                                    <td className="py-2 px-3 border">{row.class}</td>
                                    <td className="py-2 px-3 border">{row.branch}</td>
                                    <td className="py-2 px-3 border font-tiro-bangla">{row.date}</td>
                                    <td className="py-2 px-3 border text-left">{row.approvedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Subject Approval */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">নবম শ্রেণির বিষয় অনুমোদনের তথ্য</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="py-2 px-3 border font-medium">শ্রেণী</th>
                                <th className="py-2 px-3 border font-medium">বিষয়</th>
                                <th className="py-2 px-3 border font-medium">অনুমোদনের তারিখ</th>
                                <th className="py-2 px-3 border font-medium">অনুমোদন যে দিয়েছে</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                             {subjectData.map((row, index) => (
                                <tr key={index} className="border-t text-center">
                                    <td className="py-2 px-3 border">{row.class}</td>
                                    <td className="py-2 px-3 border">{row.subject}</td>
                                    <td className="py-2 px-3 border font-tiro-bangla">{row.date}</td>
                                    <td className="py-2 px-3 border text-left">{row.approvedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Group Approval */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">নবম -দশম শ্রেণির বিভাগ অনুমোদনের তথ্য</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-2 px-3 border font-medium">শ্রেণী</th>
                                <th className="py-2 px-3 border font-medium">বিভাগ</th>
                                <th className="py-2 px-3 border font-medium">অনুমোদনের তারিখ</th>
                                <th className="py-2 px-3 border font-medium">অনুমোদন যে দিয়েছে</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                             {groupData.map((row, index) => (
                                <tr key={index} className="border-t text-center">
                                    <td className="py-2 px-3 border">{row.class}</td>
                                    <td className="py-2 px-3 border">{row.group}</td>
                                    <td className="py-2 px-3 border font-tiro-bangla">{row.date}</td>
                                    <td className="py-2 px-3 border text-left">{row.approvedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const AboutPage: React.FC = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <PageTitle>আমাদের সম্পর্কে</PageTitle>

                <Section title="প্রতিষ্ঠানের ইতিহাস">
                    <p>
                        গাইবান্ধা জেলার সুন্দরগঞ্জ উপজেলার একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান হরিপুর উচ্চ বিদ্যালয়। ১৮৮২ সালে প্রতিষ্ঠিত এই বিদ্যালয়টি দীর্ঘ পথ পরিক্রমায় এই অঞ্চলের অগণিত শিক্ষার্থীর জীবনে জ্ঞানের আলো জ্বালিয়েছে। অজপাড়াগাঁয়ে প্রতিষ্ঠিত হয়েও বিদ্যালয়টি তার স্বীয় মহিমায় উজ্জ্বল। প্রতিষ্ঠার পর থেকে অদ্যাবধি বিদ্যালয়টি এই এলাকার শিক্ষা ও সংস্কৃতি বিকাশে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।
                    </p>
                    <p>
                        অনেক জ্ঞানী-গুণী ব্যক্তিত্ব এই বিদ্যালয়ের শিক্ষার্থী ছিলেন, যারা পরবর্তীতে দেশ ও জাতির সেবায় নিজেদের নিয়োজিত করেছেন। সময়ের সাথে সাথে বিদ্যালয়টির অবকাঠামোগত উন্নয়ন সাধিত হয়েছে এবং বর্তমানে এটি একটি আধুনিক সুযোগ-সুবিধা সম্বলিত শিক্ষা প্রতিষ্ঠানে পরিণত হয়েছে।
                    </p>
                </Section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Section title="লক্ষ্য ও উদ্দেশ্য">
                        <ul className="list-disc list-inside space-y-2">
                            <li>শিক্ষার্থীদের মধ্যে নৈতিক ও মানবিক মূল্যবোধ সৃষ্টি করা।</li>
                            <li>আধুনিক ও যুগোপযোগী শিক্ষাদানের মাধ্যমে শিক্ষার্থীদের মেধার বিকাশ ঘটানো।</li>
                            <li>তথ্য ও প্রযুক্তি জ্ঞানে পারদর্শী করে তোলা।</li>
                            <li>শিক্ষার্থীদের সুপ্ত প্রতিভা বিকাশে সহায়ক ভূমিকা পালন করা।</li>
                            <li>দেশপ্রেমে উদ্বুদ্ধ করে সুনাগরিক হিসেবে গড়ে তোলা।</li>
                        </ul>
                    </Section>
                    <Section title="আমাদের ভবিষ্যৎ পরিকল্পনা">
                         <ul className="list-disc list-inside space-y-2">
                            <li>একটি আধুনিক কম্পিউটার ল্যাব স্থাপন করা।</li>
                            <li>বিজ্ঞানাগারকে আরও উন্নত ও সমৃদ্ধ করা।</li>
                            <li>মাল্টিমিডিয়া ক্লাসরুমের সংখ্যা বৃদ্ধি করা।</li>
                            <li>শিক্ষার্থীদের জন্য একটি সমৃদ্ধ লাইব্রেরি প্রতিষ্ঠা করা।</li>
                            <li>খেলাধুলার জন্য মাঠের উন্নয়ন সাধন করা।</li>
                        </ul>
                    </Section>
                </div>
                
                <ApprovalInfoTables />
            </div>
        </div>
    );
};

export default AboutPage;