'use client';

import Link from "next/link";
import { products } from "@/data/products";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import Card from '@/components/Cards';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';


interface Testimony {
  id: string;
  name: string;
  message: string;
  createdAt?: Timestamp;
}

export default function HomePage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

 

  useEffect(() => {
    const fetchTestimonies = async () => {
      const q = query(collection(db, 'testimonies'), orderBy('createdAt', 'desc'), limit(4));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimony));
      setTestimonies(data);
    };
    fetchTestimonies();
  }, []);
const shuffledProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
   const [currentSlide, setCurrentSlide] = useState(0);
   
  // Quote rotation effect
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % 6); // Fixed from %5 to %6
  }, 8000);
  return () => clearInterval(interval);
}, []);


  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-green-600">Edenlife Homecare</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Natural healing solutions for your family&apos;s wellness journey
          </p>
        </div>
      </section>


<section className="py-12 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    

    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 120000, disableOnInteraction: false }}
      className="pb-12"
      loop={true}
    >
      {[
        { src: "/videos/video2.mp4",  },
        { src: "/videos/video1.mp4", },
        { src: "/videos/video3.mp4", },
      ].map((item, index) => (
        <SwiperSlide key={index}>
          <motion.div
            className="relative h-64 rounded-xl overflow-hidden shadow-lg bg-black"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <video
              controls
              className="object-cover w-full h-full rounded-xl"
              poster="/assets/edenlife official logo.jpg"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>

    <p className="text-gray-500 text-sm text-center mt-4">
 kindly watch out this first video
    </p>
  </div>
</section>
    {/* Featured Quote Section */}
    <section className="py-12 md:py-20 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <blockquote className="text-2xl md:text-3xl italic mb-6">
              {currentSlide === 0 && '"We offer holistic wellness through naturally approved remedies."'}
              {currentSlide === 1 && '"Are you suffering from cancer, diabetes, arthritis, ulcers, wounds, or blood pressure issues?"'}
              {currentSlide === 2 && '"There is hope. Contact us via WhatsApp, our contact form, or call directly in case of emergency."'}
              {currentSlide === 3 && '"Buy natural remedies from us at highly discounted prices."'}
              {currentSlide === 4 && '"If you don’t find the product you want, call us for confirmation or to be connected to a nearby seller."'}
              {currentSlide === 5 && '"Share your testimony to inspire others. If you have benefited from our services, let us know!"'}
            </blockquote>
            <cite className="text-lg block">
              {currentSlide === 0 && "EdenLife Homecare"}
              {currentSlide === 1 && "A Patient"}
              {currentSlide === 2 && "Tap the WhatsApp Icon"}
              {currentSlide === 3 && "Check the Products Page"}
              {currentSlide === 4 && "Call Us: 0102 930 605"}
              {currentSlide === 5 && "Submit Your Testimony"}
            </cite>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>

      {/* Media Gallery */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12"
            loop={true}
          >
            {[
              { img: "/assets/edenlife official logo.jpg", caption: "Welcome to EdenLife Homecare" },
              { img: "/assets/slide-three.jpg", caption: "Natural Healing. Trusted Care" },
              { img: "/assets/prodcts.jpg", caption: "Herbal Products for Wellness" },
              { img: "/assets/health is wealth.jpg", caption: "Home-Based Health Services" },
              { img: "/assets/oils.jpg", caption: "Pure Oils and Soaps" },
              { img: "/assets/edenlife team.jpg", caption: "Happy family" },
                    { img: "/assets/cakes.jpg", caption: "enjoy our organic cakes" },
                          { img: "/assets/juices.jpg", caption: "enjoy our natural juices" },
                                { img: "/assets/pilipili.jpg", caption: "very powerful remedy" },

            ].map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={item.img}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white text-xl font-bold">{item.caption}</h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Our Products", link: "/products", desc: "Explore natural wellness solutions" },
              { title: "Services", link: "/services", desc: "Discover our homecare services" },
              { title: "Contact Us", link: "/contact", desc: "Get in touch with our team" },
              { title: "FAQ", link: "/faq", desc: "Find answers to common questions" },
            ].map((item, i) => (
              <Link
                href={item.link}
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1 flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2 text-green-700">{item.title}</h3>
                <p className="text-gray-600 mt-auto">{item.desc} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-12 bg-white">
      <div className="text-center mt-4">
  <h2 className="text-2xl font-bold mb-2 text-blue-800">Our Featured Products</h2>
  <Link href="/products" className="text-lg font-medium text-blue-600 hover:underline">
    View All Products →
  </Link>
</div>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shuffledProducts.map(product => (
            <Card key={product.id} {...product} />
          ))}
        </div>
        <div className="text-center mt-4">
             <Link href="/products" className="text-green-600 hover:underline font-medium">
              View All Products →
            </Link>
          </div> 
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Client Testimonials</h2>
            <Link href="/testimonies" className="text-green-600 hover:underline font-medium">
              View All Testimonies →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonies.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2 line-clamp-4">
                      {truncateText(t.message, 200)}
                    </p>
                    <p className="text-sm font-bold text-green-600">— {t.name}</p>
                  </div>
                </div>
                <Link 
                  href={`/testimonies#${t.id}`} 
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  Read full testimony
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Natural Healing?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our range of herbal products and homecare services designed for your family&apos;s wellness.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}