'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What services does EdenLife Homecare provide?",
    answer: "We offer management in lifestyle diseases (Cancers, diabetes, arthritis, Ulcers, Hight Blood pressure and much more) and lifestyle consultations focused on holistic healing. We also offer wide range of natural remedies, herbal products, and customized meal plans meeting your conditions. See some of our products on the ",
    linkText: "Products Page",
    linkHref: "/products"
  },
  {
    question: "How can I make an order?",
    answer: "You can order through our website. We support manual checkout through M-Pesa. Visit our ",
    linkText: "Order Section",
    linkHref: "/products"
  },
  {
    question: "How can I contact EdenLife for support or consultation?",
    answer: "Reach out through our bubling whatsAppapp icon,or  Contact form or call/text us directly. Use the ",
    linkText: "Contact Page",
    linkHref: "/contact"
  },
  {
    question: "Where can I read what others say about EdenLife?",
    answer: "You can read real-time testimonies from our clients at the ",
    linkText: "Testimonies Page",
    linkHref: "/testimonies"
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded shadow-sm bg-white"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full text-left p-4 font-semibold text-gray-800 hover:bg-emerald-50 transition"
            >
              {faq.question}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-4 pb-4 text-gray-700"
                >
                  <p>
                    {faq.answer}
                    <Link href={faq.linkHref} className="text-emerald-600 underline ml-1">
                      {faq.linkText}
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
