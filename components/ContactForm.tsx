'use client';

import { useState } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      setStatus('success');
      setStatusMsg('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setStatusMsg('Oops! Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md max-w-xl mx-auto border border-green-200 dark:border-green-800">
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-2 text-center">Contact EdenLife Homecare</h2>

      <input
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Full Name"
        required
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        name="email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email Address"
        required
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        name="phone"
        type="tel"
        onChange={handleChange}
        value={formData.phone}
        placeholder="Phone Number"
        required
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <textarea
        name="message"
        onChange={handleChange}
        value={formData.message}
        placeholder="Type your message here..."
        required
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
      />

      <button
        type="submit"
        className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold flex items-center justify-center gap-2"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? <FaSpinner className="animate-spin" /> : 'Send Message'}
      </button>

      {status !== 'idle' && (
        <div
          className={`text-center mt-2 text-sm flex items-center justify-center gap-2 ${
            status === 'success'
              ? 'text-green-600'
              : status === 'error'
              ? 'text-red-600'
              : ''
          }`}
        >
          {status === 'success' && <FaCheckCircle />}
          {status === 'error' && <FaExclamationTriangle />}
          {statusMsg}
        </div>
      )}
    </form>
  );
}
