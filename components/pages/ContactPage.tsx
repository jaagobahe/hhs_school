import React from 'react';
import MailIcon from '../icons/MailIcon';

const ContactPage: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('আপনার বার্তাটি পাঠানোর কার্যকারিতা শীঘ্রই যুক্ত করা হবে।');
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-brand-primary mb-10">যোগাযোগ করুন</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info and Map */}
                    <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-brand-secondary border-b-2 border-brand-accent pb-2 mb-4">আমাদের ঠিকানা</h3>
                            <p className="text-gray-700">হরিপুর উচ্চ বিদ্যালয়</p>
                            <p className="text-gray-700">ডাকঘর: হরিপুর, উপজেলা: সুন্দরগঞ্জ, জেলা: গাইবান্ধা।</p>
                            <div className="flex items-center space-x-2 mt-4">
                               <MailIcon className="w-5 h-5 text-brand-primary" />
                                <a href="mailto:info@hhs121629.edu.bd" className="text-gray-700 hover:text-brand-primary">
                                    info@hhs121629.edu.bd
                                </a>
                            </div>
                        </div>
                        <div>
                           <div className="aspect-w-16 aspect-h-9 mt-3">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.971216260714!2d89.46820231502462!3d25.93608198355755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e25e8348545e8b%3A0x6a2c3b8c34f8a84!2sHaripur%20High%20School!5e0!3m2!1sen!2sbd!4v1672583810123!5m2!1sen!2sbd" 
                                    width="100%" 
                                    height="300" 
                                    style={{border:0}} 
                                    allowFullScreen={true}
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="School Location">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-brand-secondary border-b-2 border-brand-accent pb-2 mb-4">বার্তা পাঠান</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">আপনার নাম</label>
                                <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">আপনার ইমেইল</label>
                                <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary" />
                            </div>
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">বিষয়</label>
                                <input type="text" id="subject" name="subject" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">আপনার বার্তা</label>
                                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
                            </div>
                            <div className="text-left">
                                <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
                                    বার্তা পাঠান
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;