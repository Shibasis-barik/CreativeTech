import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-28">

      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />
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
          OUR SERVICES
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-5xl font-extrabold text-white md:text-7xl"
        >
          Innovative IT Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300"
        >
          We deliver enterprise software, AI solutions,
          cloud infrastructure, cybersecurity,
          networking and digital transformation services.
        </motion.p>

        <div className="mt-10 flex justify-center gap-5">

          <Link
            to="/contact"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white hover:scale-105 transition"
          >
            Start Project
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white hover:bg-white/10"
          >
            Learn More
            <ArrowRight size={18}/>
          </Link>

        </div>

      </div>

    </section>
  );
}
