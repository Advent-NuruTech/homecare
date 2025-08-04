'use client';

import Link from 'next/link';
import {  FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4 mt-10 border-t text-sm text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
    

        {/* Center - Navigation */}
        <div className="flex gap-4 text-green-700 font-medium">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex gap-4 text-green-700 text-lg">
          <a
            href="https://wa.me/254102930605"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-900"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:edenlifehomecare@gmail.com"
            className="hover:text-green-900"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
     
        </div>

            {/* Left - Copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-green-700">EdenLife HomeCare</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
