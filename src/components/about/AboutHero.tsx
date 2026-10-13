import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import aboutImg1 from "../../assets/about/about_img1.jpeg";
import aboutImg2 from "../../assets/about/about_img2.jpeg";
import aboutImg3 from "../../assets/about/about_img3.jpeg";
import aboutImg4 from "../../assets/about/about_img4.jpeg";

import {
  getAboutHeroContent,
  type AboutHeroContent,
} from "../../api/api";

const fallbackImages = [
  { src: aboutImg1, alt: "About Kreative Technology 1" },
  { src: aboutImg2, alt: "About Kreative Technology 2" },
  { src: aboutImg3, alt: "About Kreative Technology 3" },
  { src: aboutImg4, alt: "About Kreative Technology 4" },
];

const fallbackContent = {
  title_line_one: "Empowering Innovation",
  title_line_two: "Driving Digital Success",
  description:
    "Kreative Technology delivers enterprise software, AI-powered applications, cloud infrastructure, networking, cybersecurity, and digital transformation solutions that help businesses innovate, scale, and succeed in the digital era.",
  primary_button_text: "Contact Us",
  primary_button_link: "/contact",
  secondary_button_text: "Our Services",
  secondary_button_link: "/services",
};

export default function AboutHero() {
  const [content, setContent] = useState<AboutHeroContent | null>(null);

  useEffect(() => {
    let cancelled = false;

    getAboutHeroContent()
      .then((data) => {
        if (!cancelled) {
          setContent(data);
        }
      })
      .catch((error: unknown) => {
        // Keep the existing visual content available if the API is offline.
        console.error("Unable to load About Hero content:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const apiImages = (content?.images ?? [])
    .filter((image) => Boolean(image.image_src))
    .map((image) => ({
      src: image.image_src as string,
      alt: image.alt_text || "About Kreative Technology",
      id: image.id,
    }));

  const imagesToDisplay = apiImages.length > 0
    ? apiImages
    : fallbackImages;

  const titleLineOne = content?.title_line_one || fallbackContent.title_line_one;
  const titleLineTwo = content?.title_line_two || fallbackContent.title_line_two;
  const description = content?.description || fallbackContent.description;
  const primaryButtonText = content?.primary_button_text || fallbackContent.primary_button_text;
  const primaryButtonLink = content?.primary_button_link || fallbackContent.primary_button_link;
  const secondaryButtonText = content?.secondary_button_text || fallbackContent.secondary_button_text;
  const secondaryButtonLink = content?.secondary_button_link || fallbackContent.secondary_button_link;

  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={imagesToDisplay.length > 1}
          speed={1200}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {imagesToDisplay.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.src}
                alt={image.alt || `About ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-blue-950/70" />

      {/* Glow */}
      <div className="absolute -top-20 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-7xl"
        >
          {titleLineOne}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {titleLineTwo}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl whitespace-pre-line text-lg leading-8 text-slate-200"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link
            to={primaryButtonLink}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
          >
            {primaryButtonText}
          </Link>

          <Link
            to={secondaryButtonLink}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
          >
            {secondaryButtonText}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
