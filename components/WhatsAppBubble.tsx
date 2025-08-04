// components/WhatsAppBubble.tsx
'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppBubble() {
  const whatsappNumber = '254102930605';
  const preFilledMessage = encodeURIComponent("Hello EdenLife 👋, I'm from your website. I would like to inquire about... ");

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${preFilledMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <div className="relative">
        {/* Pulsing circle */}
        <span className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-green-500 opacity-75"></span>
        
        {/* Actual bubble */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:scale-105 transition-transform">
          <FaWhatsapp size={24} />
        </div>
      </div>
    </Link>
  );
}
