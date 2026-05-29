import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', isFooter = false }) => {
  const [imgError, setImgError] = useState(false);
  const logoHeight = isFooter ? 'h-[56px]' : 'h-[72px]';

  return (
    <Link to="/" className={`flex items-center gap-0.5 text-gray-900 hover:opacity-80 transition-opacity ${className}`}>
      {!imgError ? (
        <img 
          src="https://raw.githubusercontent.com/Lee-younju/growtalk-assets/main/Growtalk_logo3.png" 
          alt="GrowTalk logo" 
          className={`object-contain w-auto ${logoHeight} shrink-0`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`${isFooter ? 'w-10 h-10 rounded-lg' : 'w-12 h-12 rounded-xl'} bg-[#274236] flex items-center justify-center shrink-0 shadow-sm mr-2`}>
          <MessageSquare className={`${isFooter ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
        </div>
      )}
      <span className={`${isFooter ? 'text-[1.15rem]' : 'text-[1.4rem]'} font-bold tracking-tight text-gray-900`}>GrowTalk</span>
    </Link>
  );
};
