import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Terminal,
  CloudCog,
  ShieldHalf,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { getHomePageContent, type HomePageContent } from "../api/api";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const iconMap = {
  Terminal,
  CloudCog,
  ShieldHalf,
};

export default function Hero() {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadHomeContent = async () => {
      try {
        const data = await getHomePageContent();

        if (mounted) {
          setContent(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load home content:", err);

        if (mounted) {
          setError("Unable to load homepage content.");
        }
      }
    };

    loadHomeContent();

    return () => {
      mounted = false;
    };
  }, []);

  const images = useMemo(() => {
    if (!content) {
      return [];
    }

    return content.hero_images
      .filter((item) => item.is_active && item.image_src)
      .sort((a, b) => a.display_order - b.display_order);
  }, [content]);

  const stats = useMemo(() => {
    if (!content) {
      return [];
    }

    return content.stats
      .filter((item) => item.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }, [content]);

  const systems = useMemo(() => {
    if (!content) {
      return [];
    }

    return content.hero_systems
      .filter((item) => item.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }, [content]);

  if (!content) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6 text-[#F4F1E8]">
        <div className="text-center">
          <p className="font-mono text-xs tracking-widest text-[#6E8AA6]">
            {error || "LOADING HOMEPAGE..."}
          </p>

          {error && (
            <p className="mt-3 text-sm text-[#93A0AC]">
              Please make sure the Django backend is running.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate w-full min-h-screen overflow-x-hidden bg-[#0B0F14] text-[#F4F1E8]">
      {/* Blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#6E8AA6 1px, transparent 1px), linear-gradient(90deg, #6E8AA6 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[640px] w-[640px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#FF7A33]/10 blur-[120px]" />

      {/* Swiper styling */}
      <style>{`
        .viewport-swiper .swiper-pagination-bullet {
          background: #6E8AA6;
          opacity: 0.5;
          width: 5px;
          height: 5px;
          transition: all 0.25s ease;
        }

        .viewport-swiper .swiper-pagination-bullet-active {
          background: #FF7A33;
          opacity: 1;
          width: 16px;
          border-radius: 3px;
        }
      `}</style>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Dynamic Hero Title */}
          <h1 className="mt-12 break-words font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:mt-6 lg:text-7xl lg:leading-[1.05]">
            {content.hero_title.split(/(\bsystems\b)/gi).map(
              (part, index) =>
                part.toLowerCase() === "systems" ? (
                  <span
                    key={index}
                    className="block italic text-[#FF7A33]"
                  >
                    {part}
                  </span>
                ) : (
                  <span key={index}>{part}</span>
                ),
            )}
          </h1>

          {/* Dynamic Description */}
          <p className="mt-6 max-w-md text-base leading-7 text-[#93A0AC] sm:mt-8 sm:text-lg sm:leading-8">
            {content.hero_description}
          </p>

          {/* Dynamic Buttons */}
          <div className="mt-8 flex flex-nowrap items-center gap-2 sm:mt-10 sm:gap-4">
            <Link
              to={content.hero_primary_button_link}
              className="group flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#F4F1E8] px-3 py-3 text-xs font-semibold text-[#0B0F14] transition hover:bg-[#FF7A33] hover:text-[#0B0F14] xs:px-4 xs:text-sm sm:flex-none sm:gap-2 sm:px-7 sm:py-4 sm:text-base"
            >
              {content.hero_primary_button_text}

              <ArrowUpRight
                size={16}
                className="shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-[18px]"
              />
            </Link>

            <Link
              to={content.hero_secondary_button_link}
              className="flex-1 whitespace-nowrap rounded-full border border-[#1E2730] px-3 py-3 text-xs font-semibold text-[#F4F1E8] transition hover:border-[#6E8AA6] xs:px-4 xs:text-sm sm:flex-none sm:px-7 sm:py-4 sm:text-base"
            >
              {content.hero_secondary_button_text}
            </Link>
          </div>

          {/* Dynamic Stats */}
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#1E2730] pt-6 font-mono text-[10px] tracking-wide text-[#93A0AC] sm:gap-6 sm:text-xs lg:mt-14 lg:flex lg:gap-10">
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="text-lg font-semibold text-[#F4F1E8] sm:text-2xl">
                  {stat.value}
                </p>

                {stat.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full"
        >
          <div className="relative w-full rounded-2xl border border-[#1E2730] bg-[#10161D] p-2.5 shadow-2xl sm:rounded-[28px] sm:p-3">
            <div className="flex items-center justify-between px-2 pb-2.5 font-mono text-[10px] tracking-widest text-[#6E8AA6] sm:px-3 sm:pb-3 sm:text-[11px]">
              <span>VIEWPORT — LIVE</span>

              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A33]" />
                ONLINE
              </span>
            </div>

            <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl">
              <Swiper
                className="viewport-swiper"
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3200,
                  disableOnInteraction: false,
                }}
                loop={images.length > 1}
              >
                {images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="relative h-[220px] w-full xs:h-[260px] sm:h-[320px] lg:h-[360px]">
                      <img
                        src={image.image_src || ""}
                        alt={image.alt_text || ""}
                        className="h-full w-full object-cover"
                        style={{
                          filter:
                            "grayscale(35%) contrast(1.08) brightness(0.92)",
                        }}
                      />

                      <div
                        className="pointer-events-none absolute inset-0 mix-blend-multiply"
                        style={{
                          background:
                            "linear-gradient(160deg, rgba(11,15,20,0.05) 0%, rgba(11,15,20,0.55) 100%)",
                        }}
                      />

                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(180deg, #000 0px, transparent 1px, transparent 3px)",
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <span className="pointer-events-none absolute left-2 top-2 z-10 h-4 w-4 border-l-2 border-t-2 border-[#FF7A33]/70 sm:left-3 sm:top-3 sm:h-5 sm:w-5" />

              <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-4 w-4 border-b-2 border-r-2 border-[#FF7A33]/70 sm:bottom-3 sm:right-3 sm:h-5 sm:w-5" />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0B0F14_130%)] opacity-80" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent" />
            </div>
          </div>

          {/* Dynamic Systems */}
          {systems[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.4 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              }}
              className="absolute -left-4 -top-6 z-20 w-32 rotate-[-4deg] rounded-xl border border-[#1E2730] bg-[#0B0F14]/90 p-3 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md transition hover:-translate-y-1 hover:rotate-0 sm:-left-8 sm:-top-9 sm:w-40 sm:rounded-2xl sm:p-4"
            >
              {(() => {
                const Icon =
                  iconMap[systems[0].icon as keyof typeof iconMap] ||
                  Terminal;

                return (
                  <>
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-[#FF7A33] sm:size-[14px]" />

                      <span className="font-mono text-[9px] tracking-widest text-[#6E8AA6] sm:text-[10px]">
                        {systems[0].code}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs font-semibold leading-tight text-[#F4F1E8] sm:text-sm">
                      {systems[0].label}
                    </p>

                    <span className="mt-1 block font-mono text-[9px] leading-snug text-[#5A6470] sm:text-[11px]">
                      {systems[0].detail}
                    </span>
                  </>
                );
              })()}
            </motion.div>
          )}

          {systems[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.55 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              className="absolute -right-8 top-[36%] z-20 w-32 -translate-y-1/2 rotate-[3deg] rounded-xl border border-[#1E2730] bg-[#0B0F14]/90 p-3 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md transition hover:-translate-y-[calc(50%+4px)] hover:rotate-0 sm:-right-12 sm:top-[38%] sm:w-40 sm:rounded-2xl sm:p-4"
            >
              {(() => {
                const Icon =
                  iconMap[systems[1].icon as keyof typeof iconMap] ||
                  CloudCog;

                return (
                  <>
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-[#FF7A33] sm:size-[14px]" />

                      <span className="font-mono text-[9px] tracking-widest text-[#6E8AA6] sm:text-[10px]">
                        {systems[1].code}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs font-semibold leading-tight text-[#F4F1E8] sm:text-sm">
                      {systems[1].label}
                    </p>

                    <span className="mt-1 block font-mono text-[9px] leading-snug text-[#5A6470] sm:text-[11px]">
                      {systems[1].detail}
                    </span>
                  </>
                );
              })()}
            </motion.div>
          )}

          {systems[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.7 },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                },
              }}
              className="absolute -bottom-8 -left-2 z-20 w-32 rotate-[-2deg] rounded-xl border border-[#1E2730] bg-[#0B0F14]/90 p-3 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md transition hover:-translate-y-1 hover:rotate-0 sm:-bottom-10 sm:-left-4 sm:w-40 sm:rounded-2xl sm:p-4"
            >
              {(() => {
                const Icon =
                  iconMap[systems[2].icon as keyof typeof iconMap] ||
                  ShieldHalf;

                return (
                  <>
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-[#FF7A33] sm:size-[14px]" />

                      <span className="font-mono text-[9px] tracking-widest text-[#6E8AA6] sm:text-[10px]">
                        {systems[2].code}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs font-semibold leading-tight text-[#F4F1E8] sm:text-sm">
                      {systems[2].label}
                    </p>

                    <span className="mt-1 block font-mono text-[9px] leading-snug text-[#5A6470] sm:text-[11px]">
                      {systems[2].detail}
                    </span>
                  </>
                );
              })()}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}