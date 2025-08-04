'use client';

import { useState } from 'react';
import { FaFacebookF, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

interface ShareButtonProps {
  url: string;
  text: string;
  ariaLabel?: string;
}

const ShareButton = ({ url, text, ariaLabel = "Share options" }: ShareButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const links = [
    {
      icon: <FaFacebookF aria-hidden="true" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Share on Facebook',
    },
    {
      icon: <FaWhatsapp aria-hidden="true" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      label: 'Share on WhatsApp',
    },
    {
      icon: <FaXTwitter aria-hidden="true" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      label: 'Share on Twitter/X',
    },
  ];

  const toggleOptions = () => setShowOptions(!showOptions);

  return (
  <div className="relative inline-block z-50">
      <button
        onClick={toggleOptions}
        aria-expanded={showOptions}
        aria-haspopup="true"
        aria-label={ariaLabel}
        className="p-2 text-gray-700 hover:text-green-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>

      {showOptions && (
        <div 
          className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
        >
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              aria-label={item.label}
            >
              <span className="mr-3 text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareButton;