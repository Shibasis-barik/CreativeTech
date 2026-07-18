import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  Users,
  HeartHandshake,
  Rocket,
  Sparkles,
} from "lucide-react";

const values = [
  {
    step: "01",
    title: "Innovation",
    icon: Lightbulb,
    color: "from-yellow-400 to-orange-500",
    desc: "We embrace creativity and build innovative digital solutions.",
  },
  {
    step: "02",
    title: "Integrity",
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-600",
    desc: "Honesty and transparency guide everything we do.",
  },
  {
    step: "03",
    title: "Collaboration",
    icon: Users,
    color: "from-emerald-500 to-green-600",
    desc: "We work closely with clients to achieve shared success.",
  },
  {
    step: "04",
    title: "Excellence",
    icon: Sparkles,
    color: "from-purple-500 to-fuchsia-600",
    desc: "We strive for excellence in every project we deliver.",
  },
  {
    step: "05",
    title: "Commitment",
    icon: HeartHandshake,
    color: "from-rose-500 to-pink-600",
    desc: "Delivering quality and long-term value, always.",
  },
  {
    step: "06",
    title: "Growth",
    icon: Rocket,
    color: "from-indigo-500 to-violet-600",
    desc: "Helping businesses scale through modern technology.",
  },
];

// Position each card on the circle, starting from the top (-90deg), evenly spaced
function getPosition(index: number, total: number, radius: number) {
  const angle = (index * (360 / total) - 90) * (Math.PI / 180);
  return {
    left: `${50 + radius * Math.cos(angle)}%`,
    top: `${50 + radius * Math.sin(angle)}%`,
  };
}

function GlassCard({
  item,
  index,
}: {
  item: (typeof values)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 3.6 + (index % 3) * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.25,
      }}
      whileHover={{ scale: 1.06, y: -12 }}
      className="group relative w-36 overflow-hidden rounded-2xl border border-white/50 bg-white/40 p-4 text-center shadow-[0_8px_28px_rgba(31,41,55,0.15)] backdrop-blur-xl transition-colors duration-300 hover:border-white/80 hover:bg-white/60 sm:w-44 sm:p-5"
    >
      {/* Glass sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

      {/* Step number */}
      <span className="absolute right-3 top-3 text-[10px] font-bold tracking-wide text-slate-400">
        {item.step}
      </span>

      {/* Icon */}
      <div
        className={`relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg transition group-hover:rotate-6 group-hover:scale-110 sm:h-12 sm:w-12`}
      >
        <Icon size={20} />
      </div>

      <h3 className="relative mt-3 text-sm font-bold text-slate-900 sm:text-base">
        {item.title}
      </h3>

      <p className="relative mt-1.5 hidden text-xs leading-5 text-slate-600 sm:block">
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function CoreValues() {
  const radius = 40; // percent of container

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20">
      {/* Background Glow */}
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            CORE VALUES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Principles That Guide Our Success
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Our values define how we work, innovate and build lasting
            relationships with our clients.
          </p>
        </motion.div>

        {/* Circular process — desktop / tablet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto hidden aspect-square max-w-[640px] sm:block"
        >
          {/* Rotating dashed ring */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#67c9f0"
              strokeOpacity={0.4}
              strokeWidth={0.6}
              strokeDasharray="1.5 3.5"
            />
          </motion.svg>

          {/* Central gradient orb */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 blur-2xl"
          />
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/60 bg-white/50 text-center shadow-lg backdrop-blur-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              Our
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              Values
            </span>
          </div>

          {/* Cards positioned around the circle */}
          {values.map((item, index) => {
            const pos = getPosition(index, values.length, radius);
            return (
              <div
                key={item.title}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={pos}
              >
                <GlassCard item={item} index={index} />
              </div>
            );
          })}
        </motion.div>

        {/* Stacked fallback — mobile */}
        <div className="grid grid-cols-1 gap-5 sm:hidden">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/50 p-5 shadow-md backdrop-blur-xl"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}