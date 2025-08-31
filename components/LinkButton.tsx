
import React from 'react';

interface LinkButtonProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, text, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center w-full p-4 bg-neutral-900 text-white rounded-xl shadow-lg hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
    >
      <div className="absolute left-4 w-6 h-6">{icon}</div>
      <span className="font-semibold text-sm sm:text-base">{text}</span>
    </a>
  );
};

export default LinkButton;
