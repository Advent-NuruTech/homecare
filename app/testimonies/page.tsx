'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { motion } from 'framer-motion';

interface Testimony {
  id: string;
  name: string;
  message: string;
  createdAt: Timestamp | null;
}

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const q = query(collection(db, 'testimonies'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: Testimony[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Testimony, 'id'>; // proper typing
        results.push({
          id: doc.id,
          name: data.name || 'Anonymous',
          message: data.message || '',
          createdAt: (data.createdAt as Timestamp) || null,
        });
      });
      setTestimonies(results);
    });

    return () => unsubscribe();
  }, []);

  const toggleReadMore = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-emerald-700 mb-4">💬 What People Are Saying</h2>
        <p className="text-gray-700 text-lg">
          Hear from our happy families and clients. These testimonies reflect God’s grace through our loving care.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonies.map((testimony, index) => {
          const isExpanded = expandedIds.has(testimony.id);
          const displayText = isExpanded
            ? testimony.message
            : truncateText(testimony.message, 25);

          return (
            <motion.div
              key={testimony.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <p className="text-gray-600 italic mb-3">“{displayText}”</p>
              <button
                className="text-sm text-emerald-700 hover:underline font-medium self-start"
                onClick={() => toggleReadMore(testimony.id)}
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
              <p className="mt-4 font-semibold text-emerald-800">— {testimony.name}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-16"
      >
        <p className="text-gray-700 italic">
          “Let the redeemed of the Lord say so...” —{' '}
          <span className="text-emerald-700 font-medium">Psalm 107:2</span>
        </p>
      </motion.div>
    </div>
  );
}
