import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-28">

      {/* Background Glow */}
      <div className="absolute -top-20 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300"
        >
          ABOUT KREATIVE TECHNOLOGY
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
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
          transition={{ delay: .3 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300"
        >
          Kreative Technology delivers enterprise software,
          AI-powered applications, cloud infrastructure,
          networking, cybersecurity and digital transformation
          solutions for modern businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .5 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >

          <Link
            to="/contact"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
          >
            Contact Us
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-lg transition hover:bg-white/10"
          >
            Our Services

            <ArrowRight size={18} />

          </Link>

        </motion.div>

      </div>
    </section>
  );
}