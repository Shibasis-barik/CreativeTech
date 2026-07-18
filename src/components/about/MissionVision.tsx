import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import MissionModal from "./MissionModal";
import type { MissionModalData } from "./MissionModal";

import missionImg1 from "../../assets/about/missionImg1.jpeg";
import missionImg2 from "../../assets/about/missionImg2.jpeg";
import visionImg1 from "../../assets/about/visionImg1.jpeg";
import visionImg2 from "../../assets/about/visionImg2.jpeg";

const cards = [
  {
    title: "Our Mission",
    color: "from-cyan-500 to-blue-600",
    images: [missionImg1, missionImg2],
    shortDescription:
      "Deliver innovative, scalable and secure technology solutions that help businesses accelerate digital transformation and achieve sustainable growth.",
    description:
      "At Kreative Technology, our mission is to empower businesses, organizations, and individuals through innovative, scalable, and secure technology solutions. We are committed to delivering high-quality software, intelligent web applications, AI-driven solutions, cloud services, and digital transformation strategies that help our clients improve efficiency, streamline operations, and achieve sustainable growth. By combining technical expertise, creativity, and a customer-first approach, we develop solutions that address real-world challenges and create lasting business value.\n\nBeyond technology services, we are dedicated to nurturing the next generation of IT professionals through industry-oriented training, internships, and hands-on project experience. Our goal is to bridge the gap between education and industry by equipping students with practical skills while continuously embracing emerging technologies to build a smarter, more connected, and digitally empowered future.",
  },
  {
    title: "Our Vision",
    color: "from-indigo-500 to-violet-600",
    images: [visionImg1, visionImg2],
    shortDescription:
      "Become a globally trusted technology partner by creating intelligent digital products that improve businesses and people's lives.",
    description:
      "At Kreative Technology, our vision is to become a globally trusted technology partner by delivering innovative digital solutions that empower businesses, organizations, and individuals to thrive in an ever-evolving digital world. We aspire to lead technological innovation through intelligent software, AI-powered applications, cloud technologies, and customer-focused services that create meaningful impact and long-term value. \n\nWe envision a future where technology is accessible, reliable, and transformative for everyone. By fostering innovation, continuous learning, and excellence, we aim to inspire the next generation of technology professionals while building solutions that enhance business growth, improve everyday experiences, and contribute to a smarter, more connected, and sustainable future.",
  },
];

const SLIDE_INTERVAL = 4000;

function SlidingCard({
  item,
  index,
  onLearnMore,
}: {
  item: (typeof cards)[number];
  index: number;
  onLearnMore: (data: MissionModalData) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % item.images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [item.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative h-[320px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
    >
      {/* Sliding background images */}
      <AnimatePresence mode="sync">
        <motion.img
          key={imgIndex}
          src={item.images[imgIndex]}
          alt={item.title}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: SLIDE_INTERVAL / 1000, ease: "linear" },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Dark tint under the glass so text stays readable over any part of the image */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Top Border */}
      <div
        className={`absolute left-0 top-0 z-20 h-1 w-full bg-gradient-to-r ${item.color}`}
      />

      {/* Glow */}
      <div
        className={`absolute -right-16 -top-16 z-10 h-48 w-48 rounded-full bg-gradient-to-r ${item.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-30`}
      />

      {/* Slide indicators */}
      <div className="absolute right-6 top-6 z-20 flex gap-2">
        {item.images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === imgIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Full-card glassmorphism panel */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end border border-white/10 bg-black/10 p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-2 leading-7 text-slate-100/90">
          {item.shortDescription}
        </p>

        <button
          onClick={() =>
            onLearnMore({
              title: item.title,
              description: item.description,
              image: item.images[imgIndex],
              color: item.color,
            })
          }
          className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300 transition group-hover:gap-3"
        >
          Learn More
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default function MissionVision() {
  const [activeCard, setActiveCard] = useState<MissionModalData | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20">
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            MISSION & VISION
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Driving Innovation With Purpose
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
            Our mission and vision guide every project we build, ensuring
            long-term value, innovation and customer success.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {cards.map((item, index) => (
            <SlidingCard
              key={item.title}
              item={item}
              index={index}
              onLearnMore={setActiveCard}
            />
          ))}
        </div>
      </div>

      {/* Popup modal */}
      <MissionModal data={activeCard} onClose={() => setActiveCard(null)} />
    </section>
  );
}