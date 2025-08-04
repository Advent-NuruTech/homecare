'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ServiceSection = ({ title, summary, details }: { title: string; summary: string; details: string }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 transition-all duration-300">
      <h3 className="text-xl font-semibold text-emerald-800 mb-2">{title}</h3>
      <p className="text-gray-700">
        {expanded ? details : summary}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-emerald-600 hover:text-emerald-800 font-medium underline"
      >
        {expanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-emerald-700 mb-4">🌿 – Our Services</h1>
        <p className="text-gray-700 text-lg">
          We offer holistic, natural, and personalized care tailored to your physical, mental, and spiritual well-being.
          We restore health and vitality through God’s original methods of healing: pure air, sunlight,
          abstemiousness, rest, exercise, proper diet, water, and trust in divine power.
        </p>
      </motion.div>
        <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        
        <div className="mt-6 bg-white shadow p-4 rounded-lg border-l-4 border-emerald-500 text-left">
          <p className="text-gray-700"><strong>📌 Consultation Fee</strong></p>
          <p className="text-gray-700 mt-1"><strong>🏥 Admission Fee (for inpatients):</strong> Ksh. 2,000</p>
          <p className="text-gray-700 mt-1"><strong>🛌 Inpatient Treatment Duration:</strong> 10 to 14 days</p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Consultation & Admission */}
        <ServiceSection
          title="💰 Consultation & Admission"
          summary="Learn about consultation and admission process."
      details={`🌿 At EdenLife HomeCare, every healing journey begins with a professional consultation. 

💰 **Consultation Fee**  
This covers a detailed health assessment where our natural health professionals listen to your symptoms, review your lifestyle, and identify root causes of illness. Based on this, a personalized care and treatment plan is crafted.

🏥 **Admission Fee – Ksh. 2,000 (for In-Patients):**  
Once the consultation reveals that your case requires in-patient care, this fee secures your space at our serene healing center. It also covers admission logistics, health file setup, and treatment preparation. This is  paid daily and covers meals, and supplies for your stay.

🛏 **In-Patient Program Duration – 10 to 14 Days:**  
Our in-patient clients receive supervised care that includes plant-based meals, hydrotherapy, lifestyle coaching, and rest in a quiet natural setting. The length of stay is determined by your condition and healing progress, ensuring a balance of treatment effectiveness and affordability.`}
/>

        {/* In-Patient Care */}
        <ServiceSection
          title="✅ In-Patient Care"
          summary="Natural treatment for 10–14 days with rest, therapy, and healthy meals."
          details="We provide 10–14 days of in-patient treatment under natural and supervised conditions, offering rest, healthy meals, hydrotherapy, physical exercise, and health counseling in a serene environment."
        />

        {/* Natural Treatments */}
        <ServiceSection
          title="🌿 Natural Treatments"
          summary="Body detox, sauna therapy, hydrotherapy, and more."
          details={`• Body Detoxification & Blood Cleansing\nFlush toxins using natural remedies, hydrotherapy, herbal treatments, and juicing.\n\n• Sauna Therapy\nSteam therapy to improve circulation and detoxification.\n\n• Nutritional Counseling\nTailored plant-based meal plans and education.\n\n• Hydrotherapy\nHealing water-based therapies for inflammation, pain, and circulation.`}
        />

        {/* Conditions We Address */}
        <ServiceSection
          title="🧬 Conditions We Address"
          summary="We address chronic, lifestyle, and infectious conditions, and much more "
          details={`🧠 Lifestyle Diseases:\n• Diabetes\n• Hypertension\n• Obesity\n• Cancer (supportive care)\n• Asthma\n• Insomnia\n• Depression\n• Hormonal imbalance\n• Liver/Kidney issues\n\n🦠 Infectious & Acute Diseases:\n• Malaria\n• Pneumonia\n• Typhoid\n• Chronic Fatigue\n• Ulcers\n• Skin Disorders and much more`}
        />

        {/* Education & Coaching */}
        <ServiceSection
          title="💬 Health Education & Lifestyle Coaching"
          summary="Daily lectures and Bible-based coaching for disease-free living."
          details={`• Daily health lectures\n• Personalized lifestyle wellness plans\n• Healthy cooking classes\n• Bible-based counseling and encouragement etc.`}
        />

        {/* Why Choose Us */}
        <ServiceSection
          title="🏡 Why Choose EdenLife?"
          summary="Learn what makes our services unique and impactful."
          details={`🌱 100% natural and non-invasive therapies\n🧘‍♂️ Quiet, serene, healing environment\n💡 Evidence-based, Bible-grounded approach\n💖 Compassionate and trained lifestyle therapists\n👨‍👩‍👧 Family-inclusive programs\n\n“And the leaves of the tree were for the healing of the nations.” – Revelation 22:2`}
        />

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md shadow hover:bg-emerald-700 transition"
          >
            📞 Contact Us to Begin Your Healing Journey
          </Link>
        </div>
          

           <p className="italic">
          “Bear ye one another’s burdens, and so fulfil the law of Christ.” <br />
          <span className="font-semibold text-emerald-700">— Galatians 6:2</span>
        </p>
        <p className="mt-4"></p>
      </div>
    </main>
  );
}
