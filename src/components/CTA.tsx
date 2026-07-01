import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-14">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-900"></div>

      {/* Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-10 lg:p-16 shadow-2xl"
        >

          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
                LET'S BUILD TOGETHER
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
                Ready to Transform
                <span className="text-cyan-400"> Your Business?</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                We help startups and enterprises build scalable software,
                cloud infrastructure, AI-powered applications, networking,
                and digital transformation solutions.
              </p>

              {/* Trust Points */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                {[
                  "Free Consultation",
                  "Fast Delivery",
                  "24/7 Support",
                  "Secure Solutions",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-2 text-white"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="text-sm">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* Right */}

            <div className="flex flex-col items-center justify-center rounded-3xl bg-white/10 p-8 backdrop-blur-lg">

              <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">

                  <Phone
                    size={34}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-6 text-3xl font-bold text-white">
                  Start Your Project
                </h3>

                <p className="mt-4 text-slate-300">
                  Schedule a free consultation with our experts today.
                </p>

              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-4 w-full">

                <button className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-white transition hover:bg-cyan-600">

                  Get Free Quote

                  <ArrowRight size={18} />

                </button>

                <button className="rounded-xl border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/10">
                  Book a Meeting
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}