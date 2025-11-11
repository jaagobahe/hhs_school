
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold border-b-2 border-brand-accent pb-2">হরিপুর উচ্চ বিদ্যালয়</h3>
            <p>ইআইআইএন: <span className="font-tiro-bangla">১২১৬২৯</span></p>
            <p>ঠিকানা: উজান বোচাগাড়ী, সুন্দরগঞ্জ, গাইবান্ধা।</p>
            <p>ইমেইল: info@hhs121629.edu.bd</p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold border-b-2 border-brand-accent pb-2">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-accent transition-colors">শিক্ষা বোর্ড</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">ব্যানবেইস</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">শিক্ষা মন্ত্রণালয়</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">শিক্ষক বাতায়ন</a></li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-brand-accent pb-2">অবস্থান</h3>
             <div className="aspect-w-16 aspect-h-9 mt-3">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.971216260714!2d89.46820231502462!3d25.93608198355755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e25e8348545e8b%3A0x6a2c3b8c34f8a84!2sHaripur%20High%20School!5e0!3m2!1sen!2sbd!4v1672583810123!5m2!1sen!2sbd" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location">
                </iframe>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; <span className="font-tiro-bangla">{new Date().getFullYear()}</span> হরিপুর উচ্চ বিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
