import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  CalendarDays,
  Mail,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-16">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900" />

      {/* Glow */}

      <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-[100px]" />

      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-300/20 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/20 bg-white/10 p-8 md:p-10 text-center backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,.3)]"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">

            <Sparkles size={16} />

            Let's Build Your Future

          </div>

          {/* Heading */}

          <h2 className="mt-6 text-3xl font-bold leading-tight text-white md:text-5xl">

            Ready To Start
            <br />

            Your Next Project?

          </h2>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">

            Whether you need software development,
            AI solutions,
            cloud migration,
            cybersecurity,
            or digital transformation,
            we're ready to help.

          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-cyan-700 shadow-lg transition hover:scale-105"
            >
              <PhoneCall size={18} />
              Contact Us
            </Link>

            <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20">
              <CalendarDays size={18} />
              Book Consultation
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20">
              <Mail size={18} />
              Email Us
            </button>

          </div>

          {/* Stats */}

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">

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

                <h3 className="text-2xl font-bold text-white">

                  {item.value}

                </h3>

                <p className="mt-1 text-sm text-slate-300">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

          {/* Bottom Link */}

          <div className="mt-8">

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-base font-semibold text-cyan-200 transition-all hover:gap-4"
            >

              Start Your Digital Journey

              <ArrowRight size={18} />

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}