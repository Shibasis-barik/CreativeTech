import { motion } from "framer-motion";
import {
  HeartPulse,
  Landmark,
  GraduationCap,
  ShoppingBag,
  Factory,
  Truck,
  Building2,
  Building,
  ArrowUpRight,
} from "lucide-react";

const industries = [
  {
    title: "Healthcare",
    slug: "healthcare",
    icon: HeartPulse,
    accent: "#fb7185",
    glow: "rgba(251, 113, 133, 0.55)",
    ring: "from-rose-400 via-red-500 to-rose-600",
  },
  {
    title: "Banking & Finance",
    slug: "banking-finance",
    icon: Landmark,
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.55)",
    ring: "from-emerald-400 via-green-500 to-emerald-600",
  },
  {
    title: "Education",
    slug: "education",
    icon: GraduationCap,
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.55)",
    ring: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    title: "Retail & E-Commerce",
    slug: "retail-ecommerce",
    icon: ShoppingBag,
    accent: "#fb923c",
    glow: "rgba(251, 146, 60, 0.55)",
    ring: "from-amber-400 via-orange-500 to-amber-600",
  },
  {
    title: "Manufacturing",
    slug: "manufacturing",
    icon: Factory,
    accent: "#c084fc",
    glow: "rgba(192, 132, 252, 0.55)",
    ring: "from-violet-400 via-purple-500 to-fuchsia-600",
  },
  {
    title: "Logistics",
    slug: "logistics",
    icon: Truck,
    accent: "#818cf8",
    glow: "rgba(129, 140, 248, 0.55)",
    ring: "from-indigo-400 via-blue-500 to-indigo-600",
  },
  {
    title: "Corporate",
    slug: "corporate",
    icon: Building2,
    accent: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.55)",
    ring: "from-cyan-400 via-teal-500 to-blue-600",
  },
  {
    title: "Government",
    slug: "government",
    icon: Building,
    accent: "#e2e8f0",
    glow: "rgba(226, 232, 240, 0.4)",
    ring: "from-slate-300 via-slate-500 to-slate-700",
  },
];

export default function Industries() {
  return (
    <section className="relative overflow-hidden bg-[#05070f] py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      {/* faint dot grid, echoes the reference's dotted card backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            INDUSTRIES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white">
            Industries We Empower
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            We deliver tailored technology solutions across multiple
            industries, helping organizations innovate, automate and grow.
          </p>
        </motion.div>

        {/* Cards — alternate in from left / right as they scroll into view */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item, index) => {
            const Icon = item.icon;
            const fromLeft = index % 2 === 0;

            return (
              <motion.a
                key={item.title}
                href={`/industries/${item.slug}`}
                initial={{ opacity: 0, x: fromLeft ? -70 : 70, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
              >
                {/* ambient neon bloom that intensifies on hover */}
                <div
                  className="pointer-events-none absolute -inset-16 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background: `radial-gradient(closest-side, ${item.glow}, transparent)`,
                  }}
                />

                {/* diagonal sheen sweep, matches the glassy card in the reference */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* thin glowing top edge */}
                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: item.accent, boxShadow: `0 0 12px 1px ${item.accent}` }}
                />

                <div className="relative flex flex-col items-center text-center">
                  {/* icon medallion with a slow-rotating neon ring, echoing the looping light-trails in the reference */}
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${item.ring} opacity-70 blur-[7px]`}
                    />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.ring} p-[2.5px]`}>
                      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0a0d18] transition duration-500 group-hover:scale-105 group-hover:rotate-6">
                        <Icon size={30} color={item.accent} strokeWidth={1.9} />
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Digital solutions designed specifically for this industry.
                  </p>

                  <span
                    className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold opacity-0 transition-all duration-300 group-hover:opacity-100"
                    style={{ color: item.accent }}
                  >
                    Explore <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}