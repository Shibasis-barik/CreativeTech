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

const images = [
  aboutImg1,
  aboutImg2,
  aboutImg3,
  aboutImg4,
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden py-32">

      {/* Background Slider */}

      <div className="absolute inset-0">

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop
          speed={1200}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`About ${index + 1}`}
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

        {/* <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-cyan-300 backdrop-blur-md"
        >
          ABOUT KREATIVE TECHNOLOGY
        </motion.span> */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-7xl"
        >
          Empowering Innovation
          <br />

          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Driving Digital Success
          </span>

        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-200"
        >
          Kreative Technology delivers enterprise software,
          AI-powered applications,
          cloud infrastructure,
          networking,
          cybersecurity,
          and digital transformation solutions
          that help businesses innovate,
          scale,
          and succeed in the digital era.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >

          <Link
            to="/contact"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
          >
            Contact Us
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
          >
            Our Services

            <ArrowRight size={18} />

          </Link>

        </motion.div>

      </div>

    </section>
  );
}