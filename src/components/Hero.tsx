import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, CloudCog, ShieldHalf } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/**
 * KREEATIVE TECHNOLOGY — Hero
 *
 * Design direction: "engineering schematic"
 * A deep ink ground with a faint blueprint grid, an amber signal
 * accent, and reference-coded system panels (SYS-01/02/03) standing
 * in for the old generic floating cards. The carousel becomes a
 * single "viewport" panel framed like an instrument readout rather
 * than a photo slider.
 *
 * Palette
 *  --ink:      #0B0F14  (ground)
 *  --paper:    #F4F1E8  (panel / type on dark)
 *  --signal:   #FF7A33  (single accent — use sparingly)
 *  --steel:    #6E8AA6  (secondary line / supporting accent)
 *  --line:     #1E2730  (hairlines on dark)
 *  --muted:    #93A0AC  (secondary text)
 *
 * Type
 *  Display: "Fraunces" (serif, high-contrast, used large + restrained)
 *  Utility: "JetBrains Mono" (eyebrows, ref codes, captions)
 *  Body:    "Inter" (paragraph copy)
 */

const images = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900",
  "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900",
];

const systems = [
  {
    code: "SYS-01",
    icon: Terminal,
    label: "Software Engineering",
    detail: "React · Django · iOS",
  },
  {
    code: "SYS-02",
    icon: CloudCog,
    label: "Cloud Infrastructure",
    detail: "AWS · Azure · Terraform",
  },
  {
    code: "SYS-03",
    icon: ShieldHalf,
    label: "Security & Surveillance",
    detail: "Zero-trust · CCTV ops",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen bg-[#0B0F14] text-[#F4F1E8] overflow-hidden">
      {/* Blueprint grid ground — clipped to the section, never to its children */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#6E8AA6 1px, transparent 1px), linear-gradient(90deg, #6E8AA6 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Faint radial wash behind the signature panel */}
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[640px] w-[640px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#FF7A33]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:py-20">
        {/* Left — thesis */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-[#FF7A33]">
            <span className="h-px w-8 bg-[#FF7A33]" />
            KREEATIVE TECHNOLOGY — SYSTEMS STUDIO
          </div> */}

          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight lg:text-7xl">
            We engineer the
            <span className="block italic text-[#FF7A33]">systems</span>
            behind growing businesses.
          </h1>

          <p className="mt-8 max-w-md text-lg leading-8 text-[#93A0AC]">
            Software, cloud infrastructure, and security built as one
            connected stack — not three separate vendors. From first
            architecture diagram to production rollout.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="group flex items-center gap-2 rounded-full bg-[#F4F1E8] px-7 py-4 font-semibold text-[#0B0F14] transition hover:bg-[#FF7A33] hover:text-[#0B0F14]">
              Start a project
              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <button className="rounded-full border border-[#1E2730] px-7 py-4 font-semibold text-[#F4F1E8] transition hover:border-[#6E8AA6]">
              View our work
            </button>
          </div>

          <div className="mt-14 flex gap-10 border-t border-[#1E2730] pt-6 font-mono text-xs tracking-wide text-[#93A0AC]">
            <div>
              <p className="text-2xl font-semibold text-[#F4F1E8]">120+</p>
              SYSTEMS SHIPPED
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#F4F1E8]">99.9%</p>
              UPTIME MANAGED
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#F4F1E8]">24/7</p>
              OPS COVERAGE
            </div>
          </div>
        </motion.div>

        {/* Right — instrument viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-4 sm:mx-10"
        >
          <div className="relative rounded-[28px] border border-[#1E2730] bg-[#10161D] p-3 shadow-2xl">
            {/* readout header bar */}
            <div className="flex items-center justify-between px-3 pb-3 font-mono text-[11px] tracking-widest text-[#6E8AA6]">
              <span>VIEWPORT — LIVE</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A33]" />
                ONLINE
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                pagination={{ clickable: true }}
                autoplay={{ delay: 3200, disableOnInteraction: false }}
                loop
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt=""
                      className="h-[320px] w-full object-cover grayscale-[15%] sm:h-[360px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* corner brackets, instrument styling */}
              <span className="pointer-events-none absolute left-3 top-3 z-10 h-5 w-5 border-l-2 border-t-2 border-[#FF7A33]/70" />
              <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-5 w-5 border-b-2 border-r-2 border-[#FF7A33]/70" />

              {/* scanline gradient so the slider reads as an instrument feed, not a photo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent" />
            </div>

            {/* Docked systems strip — reads as a status readout, not loose cards */}
            <div className="mt-3 grid grid-cols-3 divide-x divide-[#1E2730] overflow-hidden rounded-2xl border border-[#1E2730] bg-[#0B0F14]">
              {systems.map(({ code, icon: Icon, label, detail }, i) => (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex flex-col gap-2 px-4 py-4"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-[#FF7A33]" />
                    <span className="font-mono text-[10px] tracking-widest text-[#6E8AA6]">
                      {code}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-tight text-[#F4F1E8]">
                    {label}
                  </p>
                  <span className="font-mono text-[11px] text-[#5A6470]">
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}