'use client';
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const sections = [
  {
    title: 'Who We Are',
    content:
      'EDEN LIFE HOME CARE is a registered Community-Based Organisation (CBO) in Kenya, recognized as a Center of Excellence dedicated to palliative health care and community empowerment through holistic, compassionate, and accessible services.',
  },
  {
    title: 'Our Vision',
    content:
      'To alleviate suffering and promote wellness within the community by delivering high-quality palliative care, chronic illness management, and sustainable empowerment initiatives.',
  },
  {
    title: 'Our Objectives',
    content: `
1. Provide Specialized Care – To deliver compassionate care and treatment to individuals living with chronic illnesses.

2. Empower and Educate – To reduce suffering in the community through comprehensive support and education, in order to combat lifestyle-related illiteracy and raise awareness of health challenges.

3. Promote Holistic Wellness – To support and empower individuals through natural therapies, lifestyle coaching, and integrated holistic wellness programs that are inclusive and accessible to all.
    `,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-12 md:px-20 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700 mb-4">EDEN LIFE HOME CARE</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Community-Based Organisation (CBO) – Healing Naturally. Living Fully.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="rounded-2xl bg-white p-6 shadow-lg border-l-4 border-green-500 whitespace-pre-line"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index + 1}
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-2">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </motion.div>
        ))}
      </div>

      
    </main>
  );
}
