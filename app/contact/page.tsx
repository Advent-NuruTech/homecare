'use client';

import ContactForm from '@/components/ContactForm';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-green-50 via-white to-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">Contact Us</h1>
        <p className="text-center text-lg mb-10">
          We’d love to hear from you! Please fill out the form below or reach us through one of the following methods.
        </p>

        {/* Contact Info Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="bg-white rounded shadow p-6 flex items-start gap-4 border-l-4 border-green-600">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Visit Us</h3>
              <p>Mamboleo, Kisumu, Kenya</p>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6 flex items-start gap-4 border-l-4 border-green-600">
            <FaPhoneAlt className="text-green-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p><a href="tel:+254759168209" className="text-blue-600 hover:underline">+254 102930605</a></p>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6 flex items-start gap-4 border-l-4 border-green-600">
            <FaEnvelope className="text-green-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Email Us</h3>
              <p><a href="mailto:edenlifehomecare@gmail.com" className="text-blue-600 hover:underline">edenlifehomecare@gmail.com</a></p>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6 flex items-start gap-4 border-l-4 border-green-600 sm:col-span-2">
            <FaWhatsapp className="text-green-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">WhatsApp</h3>
              <p>
                Message us on WhatsApp:{" "}
                <a
                  href="https://wa.me/254102930605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Click here to chat
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Location</h2>
          <div className="rounded shadow overflow-hidden">
            <iframe
              title="Mamboleo, Kisumu Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.763301373699!2d34.7917402143679!3d-0.06689153549965006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa59119e501f9%3A0x4f0f8609462b0a88!2sMamboleo%2C%20Kisumu%2C%20Kenya!5e0!3m2!1sen!2ske!4v1721724958223!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Send Us a Message</h2>
          <p className="mb-6 text-gray-600">Fill out the form below and we will get back to you shortly.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
