import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ServicesCTA() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900"></div>

      {/* Glow */}

      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-300/20 blur-[120px]" />

      {/* Floating Circle */}

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute left-20 top-20 h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute right-32 bottom-20 h-20 w-20 rounded-full bg-cyan-300/10 backdrop-blur-xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="rounded-[36px] border border-white/20 bg-white/10 p-12 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,.35)]"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white">

            <Sparkles size={18} />

            Let's Build Something Amazing

          </div>

          {/* Title */}

          <h2 className="mt-8 text-4xl font-bold text-white md:text-6xl">

            Ready To Transform
            <br />

            Your Business?

          </h2>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-200">

            Whether you're planning a new application,
            cloud migration,
            AI integration,
            cybersecurity upgrade,
            or enterprise software,
            our experts are ready to help.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-6">

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-cyan-700 shadow-xl transition duration-300 hover:scale-105"
            >

              <PhoneCall size={20} />

              Contact Us

            </Link>

            <button className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/20">

              <CalendarDays size={20} />

              Schedule Consultation

            </button>

          </div>

          {/* Bottom Stats */}

          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">

            {[
              {
                value: "150+",
                label: "Projects",
              },
              {
                value: "80+",
                label: "Clients",
              },
              {
                value: "10+",
                label: "Years",
              },
              {
                value: "24/7",
                label: "Support",
              },
            ].map((item) => (

              <div key={item.label}>

                <h3 className="text-3xl font-bold text-white">

                  {item.value}

                </h3>

                <p className="mt-2 text-slate-300">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

          {/* Bottom Button */}

          <div className="mt-12">

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-lg font-semibold text-cyan-200 transition hover:gap-5"
            >

              Start Your Project Today

              <ArrowRight size={20} />

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}