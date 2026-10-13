import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import MissionModal from "./MissionModal";
import type { MissionModalData } from "./MissionModal";

import missionImg1 from "../../assets/about/missionImg1.jpeg";
import missionImg2 from "../../assets/about/missionImg2.jpeg";
import visionImg1 from "../../assets/about/visionImg1.jpeg";
import visionImg2 from "../../assets/about/visionImg2.jpeg";
import {
  getAboutMissionVisionContent,
  type AboutMissionVisionCardContent,
  type AboutMissionVisionContent,
} from "../../api/api";

type SlideImage = {
  id: number;
  src: string;
  alt: string;
};

type MissionVisionCard = {
  id: number;
  kind: "mission" | "vision";
  title: string;
  color: string;
  shortDescription: string;
  description: string;
  images: SlideImage[];
  displayOrder: number;
};

const defaultImages: Record<"mission" | "vision", SlideImage[]> = {
  mission: [
    { id: 1, src: missionImg1, alt: "Our mission" },
    { id: 2, src: missionImg2, alt: "Mission in action" },
  ],
  vision: [
    { id: 3, src: visionImg1, alt: "Our vision" },
    { id: 4, src: visionImg2, alt: "Our vision for the future" },
  ],
};

const fallbackCards: MissionVisionCard[] = [
  {
    id: 1,
    kind: "mission",
    title: "Our Mission",
    color: "from-cyan-500 to-blue-600",
    shortDescription:
      "Deliver innovative, scalable and secure technology solutions that help businesses accelerate digital transformation and achieve sustainable growth.",
    description:
      "At Kreative Technology, our mission is to empower businesses, organizations, and individuals through innovative, scalable, and secure technology solutions. We are committed to delivering high-quality software, intelligent web applications, AI-driven solutions, cloud services, and digital transformation strategies that help our clients improve efficiency, streamline operations, and achieve sustainable growth. By combining technical expertise, creativity, and a customer-first approach, we develop solutions that address real-world challenges and create lasting business value.\n\nBeyond technology services, we are dedicated to nurturing the next generation of IT professionals through industry-oriented training, internships, and hands-on project experience. Our goal is to bridge the gap between education and industry by equipping students with practical skills while continuously embracing emerging technologies to build a smarter, more connected, and digitally empowered future.",
    images: defaultImages.mission,
    displayOrder: 1,
  },
  {
    id: 2,
    kind: "vision",
    title: "Our Vision",
    color: "from-indigo-500 to-violet-600",
    shortDescription:
      "Become a globally trusted technology partner by creating intelligent digital products that improve businesses and people's lives.",
    description:
      "At Kreative Technology, our vision is to become a globally trusted technology partner by delivering innovative digital solutions that empower businesses, organizations, and individuals to thrive in an ever-evolving digital world. We aspire to lead technological innovation through intelligent software, AI-powered applications, cloud technologies, and customer-focused services that create meaningful impact and long-term value.\n\nWe envision a future where technology is accessible, reliable, and transformative for everyone. By fostering innovation, continuous learning, and excellence, we aim to inspire the next generation of technology professionals while building solutions that enhance business growth, improve everyday experiences, and contribute to a smarter, more connected, and sustainable future.",
    images: defaultImages.vision,
    displayOrder: 2,
  },
];

const fallbackSection: AboutMissionVisionContent = {
  id: 0,
  eyebrow: "MISSION & VISION",
  title: "Driving Innovation With Purpose",
  description:
    "Our mission and vision guide every project we build, ensuring long-term value, innovation and customer success.",
  is_active: true,
  cards: [],
  created_at: "",
  updated_at: "",
};

const SLIDE_INTERVAL = 4000;

function mapApiCard(item: AboutMissionVisionCardContent): MissionVisionCard {
  const kind: "mission" | "vision" = item.kind === "vision" ? "vision" : "mission";
  const apiImages: SlideImage[] = item.images
    .filter((image) => image.is_active && Boolean(image.image_src))
    .sort((a, b) => a.display_order - b.display_order)
    .map((image) => ({
      id: image.id,
      src: image.image_src as string,
      alt: image.alt_text || item.title,
    }));

  return {
    id: item.id,
    kind,
    title: item.title,
    color: item.color || (kind === "mission" ? "from-cyan-500 to-blue-600" : "from-indigo-500 to-violet-600"),
    shortDescription: item.short_description,
    description: item.description,
    images: apiImages.length > 0 ? apiImages : defaultImages[kind],
    displayOrder: item.display_order,
  };
}

function SlidingCard({
  item,
  index,
  onLearnMore,
}: {
  item: MissionVisionCard;
  index: number;
  onLearnMore: (data: MissionModalData) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = item.images.length > 0 ? item.images : defaultImages[item.kind];

  useEffect(() => {
    setImgIndex(0);
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setImgIndex((previous) => (previous + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [images.length, item.id]);

  const currentImage = images[imgIndex] ?? images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative h-[320px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={currentImage.id}
          src={currentImage.src}
          alt={currentImage.alt || item.title}
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

      <div className="absolute inset-0 bg-black/15" />
      <div className={`absolute left-0 top-0 z-20 h-1 w-full bg-gradient-to-r ${item.color}`} />
      <div className={`absolute -right-16 -top-16 z-10 h-48 w-48 rounded-full bg-gradient-to-r ${item.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-30`} />

      <div className="absolute right-6 top-6 z-20 flex gap-2">
        {images.map((image, imageIndex) => (
          <span
            key={image.id}
            className={`h-1.5 rounded-full transition-all duration-500 ${imageIndex === imgIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end border border-white/10 bg-black/10 p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">{item.title}</h3>
        <p className="mt-3 line-clamp-2 leading-7 text-slate-100/90">{item.shortDescription}</p>
        <button
          onClick={() =>
            onLearnMore({
              title: item.title,
              description: item.description,
              image: currentImage.src,
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
  const [section, setSection] = useState<AboutMissionVisionContent>(fallbackSection);
  const [cards, setCards] = useState<MissionVisionCard[]>(fallbackCards);

  useEffect(() => {
    let isMounted = true;

    getAboutMissionVisionContent()
      .then((data) => {
        if (!isMounted || !data.is_active) return;
        setSection(data);
        const activeCards = data.cards
          .filter((item) => item.is_active)
          .sort((a, b) => a.display_order - b.display_order)
          .map(mapApiCard);
        if (activeCards.length > 0) setCards(activeCards);
      })
      .catch((error: unknown) => {
        console.error("Failed to load About Mission & Vision content:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleCards = useMemo(
    () => cards.slice().sort((a, b) => a.displayOrder - b.displayOrder),
    [cards],
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20">
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            {section.eyebrow}
          </span>
          <h2 className="mt-5 text-4xl font-bold text-slate-900">{section.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {section.description}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {visibleCards.map((item, index) => (
            <SlidingCard key={item.id} item={item} index={index} onLearnMore={setActiveCard} />
          ))}
        </div>
      </div>

      <MissionModal data={activeCard} onClose={() => setActiveCard(null)} />
    </section>
  );
}
