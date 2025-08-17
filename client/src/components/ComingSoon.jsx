import React from 'react';
import { Clock } from 'lucide-react';
import ComingSoon1 from '../assets/Icons/comingsoon.svg'; // Adjust the path as necessary

const ComingSoon = () => {

  return (
    <div className="h-[100%] flex flex-col items-center justify-center px-4">
    <img src = {ComingSoon1} className="h-[40%]" />
      <div className="flex items-center gap-4 mt-8 mb-4">
        <Clock size={40} className="text-purple-600 animate-pulse" strokeWidth={2.5} />
        <h1 className="text-4xl md:text-5xl font-medium text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>Coming Soon</h1>
      </div>

      <p className="text-gray-600 text-center max-w-md text-sm md:text-base">
        We’re working hard to bring something amazing to you. Stay tuned for updates.
      </p>

      {/* <BackButton /> */}
    </div>
  );
};

export default ComingSoon;
