import React, { useState, useEffect } from 'react';
import MailIcon from './icons/MailIcon';
import ClockIcon from './icons/ClockIcon';
import CalendarIcon from './icons/CalendarIcon';

const TopBar: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('bn-BD', options).format(dateTime);
  };

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('bn-BD', options).format(dateTime);
  };

  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Desktop: Email on the left */}
        <div className="hidden md:flex items-center space-x-2">
          <MailIcon className="w-4 h-4" />
          <a href="mailto:info@hhs121629.edu.bd" className="hover:text-brand-accent whitespace-nowrap">
            info@hhs121629.edu.bd
          </a>
        </div>

        {/* Mobile: Date on the left */}
        <div className="flex md:hidden items-center space-x-1 font-tiro-bangla whitespace-nowrap">
           <CalendarIcon className="w-4 h-4" />
           <span>{formatDate()}</span>
        </div>

        {/* Right side content */}
        <div className="flex items-center space-x-4 font-tiro-bangla whitespace-nowrap">
          {/* Desktop: Date on the right */}
          <div className="hidden md:flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate()}</span>
          </div>

          {/* Mobile & Desktop: Time on the right */}
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{formatTime()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
