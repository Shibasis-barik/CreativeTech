import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import serviceHeroImage from "../../assets/service/hero.png";

const particles = [
  ["left-[8%] top-[20%] bg-sky-300", 0], ["left-[18%] top-[73%] bg-violet-400", .8],
  ["left-[42%] top-[15%] bg-blue-400", 1.2], ["left-[61%] top-[23%] bg-cyan-300", .3],
  ["right-[12%] top-[19%] bg-violet-400", 1.6], ["right-[7%] top-[67%] bg-blue-300", .5],
];

export default function ServicesHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-73px)] overflow-hidden bg-[#030817] text-white" aria-labelledby="services-hero-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,rgba(18,101,255,.19),transparent_38%),radial-gradient(ellipse_at_4%_6%,rgba(20,113,255,.13),transparent_29%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(68,136,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(68,136,255,.1)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_82%,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[5%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-blue-600/20 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(1,5,16,.48)_100%)]" aria-hidden="true" />

      {particles.map(([position, delay], index) => (
        <motion.span key={index} className={`pointer-events-none absolute z-0 h-1.5 w-1.5 rounded-full ${position} shadow-[0_0_15px_4px_currentColor]`} animate={{ opacity: [.25, 1, .25], scale: [.7, 1.25, .7] }} transition={{ duration: 3.2, delay: Number(delay), repeat: Infinity, ease: "easeInOut" }} aria-hidden="true" />
      ))}

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-73px)] max-w-[1400px] items-center gap-12 px-6 py-24 sm:px-8 lg:translate-y-9 lg:grid-cols-[45fr_55fr] lg:gap-8 lg:py-10">
        <div className="max-w-[640px] text-center lg:text-left">
          {/* <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-gradient-to-r from-blue-600/45 to-indigo-500/35 px-4 py-2 text-sm font-bold text-sky-50 shadow-[0_0_24px_rgba(31,137,255,.38)] backdrop-blur-md"><Rocket className="h-4 w-4 text-cyan-300" />Trusted Technology Partner</motion.div> */}
          <motion.h1
            id="services-hero-title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .1 }}
            className="mt-7 text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.08] tracking-[-0.04em]"
          >
            Empowering Businesses
            <br />
            with{" "}
            <span className="bg-gradient-to-r from-[#1FB6FF] to-[#6C63FF] bg-clip-text text-transparent">
              AI &amp;
              <br />
              Modern Technology
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .22 }} className="mt-8 text-lg leading-8 text-slate-300 lg:text-[22px] lg:leading-8">We build scalable software, AI-powered applications, cloud infrastructure, cybersecurity, and digital transformation solutions that help businesses grow faster.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .34 }} className="mt-9 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link to="/contact" className="group inline-flex h-[60px] w-full items-center justify-center gap-5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 font-bold shadow-[0_14px_32px_rgba(18,106,255,.4)] transition duration-300 hover:-translate-y-1 hover:bg-[linear-gradient(90deg,#2563eb,#06b6d4,#4f46e5)] hover:shadow-[0_19px_38px_rgba(18,124,255,.62)] sm:w-[290px]">Get Free Consultation<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
            <a href="#service-grid" className="group inline-flex h-[60px] w-full items-center justify-center gap-5 rounded-2xl border border-white/15 bg-white/[.03] px-6 font-bold backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-400/70 hover:bg-sky-500/10 sm:w-[250px]">View Our Services<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .12 }} className="relative mx-auto flex w-full max-w-[760px] justify-center lg:justify-end">
          <motion.img src={serviceHeroImage} alt="Technology ecosystem featuring AI, cloud, cybersecurity, Python, React, and a software development dashboard" className="h-auto w-full max-w-[760px] drop-shadow-[0_28px_38px_rgba(0,0,0,.6)]" animate={{ y: [-13, 5, -13] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </div>
    </section>
  );
}
