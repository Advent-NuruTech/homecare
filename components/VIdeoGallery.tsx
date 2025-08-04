import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import type { Swiper as SwiperType } from 'swiper';

import { Pagination, Autoplay } from 'swiper/modules'; // ✅ fixed

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';

export default function VideoGallery() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const videos = [
    { src: "/videos/video2.mp4", caption: "Detox Healing Journey" },
    { src: "/videos/video1.mp4", caption: "Patient Testimony: Natural Recovery" },
    { src: "/videos/video3.mp4", caption: "Sauna & Herbal Bath Benefits" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-emerald-800 mb-6 text-center">
          🎥 EdenLife Video Gallery
        </h2>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
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
          {videos.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="relative h-64 rounded-xl overflow-hidden shadow-lg bg-black"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="object-cover w-full h-full rounded-xl cursor-pointer"
                  poster="/assets/video-thumbnail.jpg"
                  onClick={() => {
                    const clickedVideo = videoRefs.current[index];
                    swiperRef.current?.autoplay?.stop();

                    videoRefs.current.forEach((video, i) => {
                      if (video && i !== index) {
                        video.pause();
                        video.currentTime = 0;
                        video.muted = true;
                        video.loop = true;
                      }
                    });

                    if (clickedVideo) {
                      clickedVideo.currentTime = 0;
                      clickedVideo.muted = false;
                      clickedVideo.loop = false;
                      clickedVideo.play();
                    }
                  }}
                  onPlay={() => swiperRef.current?.autoplay?.stop()}
                  onPause={() => swiperRef.current?.autoplay?.start()}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-center py-2 px-3">
                  <h3 className="text-sm font-semibold">{item.caption}</h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="text-gray-500 text-sm text-center mt-4">
          📌 View more videos on our{" "}
          <a
            href="https://www.youtube.com/@edenlifehomecare"
            className="text-emerald-700 underline hover:text-emerald-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube Channel
          </a>
        </p>
      </div>
    </section>
  );
}
