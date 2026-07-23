import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Cloud,
  Cpu,
  Database,
  ShieldCheck,
  Share2,
  Laptop,
  Smartphone,
  BarChart3,
  Briefcase,
  Users,
  Trophy,
  Headset,
  type LucideIcon,
} from "lucide-react";

interface CountUpNumberProps {
  value: number | null;
  suffix?: string;
  display?: string;
  inView: boolean;
  className?: string;
}

interface TechNodeProps {
  icon: LucideIcon;
  style: CSSProperties;
  seed: number;
}

interface Achievement {
  id: string;
  value: number | null;
  suffix?: string;
  display?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  pos: CSSProperties;
}

interface AchievementCardProps {
  item: Achievement;
  index: number;
}

interface MobileCardProps {
  item: Achievement;
  index: number;
}

/* ---------------------------------------------------------------- */
/*  Data                                                             */
/* ---------------------------------------------------------------- */

const achievements: Achievement[] = [
  {
    id: "projects",
    value: 150,
    suffix: "+",
    title: "Projects Delivered",
    description: "Enterprise systems shipped end to end.",
    icon: Briefcase,
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    glow: "rgba(6,182,212,0.45)",
    pos: { top: "4%", left: "3%" },
  },
  {
    id: "clients",
    value: 80,
    suffix: "+",
    title: "Global Clients",
    description: "Enterprises across 20+ countries.",
    icon: Users,
    gradient: "from-blue-400 via-indigo-500 to-blue-700",
    glow: "rgba(37,99,235,0.45)",
    pos: { top: "4%", right: "3%" },
  },
  {
    id: "experience",
    value: 10,
    suffix: "+",
    title: "Years Experience",
    description: "Building mission critical software.",
    icon: Trophy,
    gradient: "from-amber-300 via-orange-400 to-amber-600",
    glow: "rgba(245,158,11,0.4)",
    pos: { bottom: "4%", left: "3%" },
  },
  {
    id: "support",
    value: null,
    display: "24/7",
    title: "Support",
    description: "Always-on technical assistance.",
    icon: Headset,
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    glow: "rgba(147,51,234,0.4)",
    pos: { bottom: "4%", right: "3%" },
  },
];

const techNodes: { id: string; icon: LucideIcon; pos: CSSProperties }[] = [
  { id: "cloud", icon: Cloud, pos: { top: "6%", left: "50%" } },
  { id: "chip", icon: Cpu, pos: { top: "22%", left: "70%" } },
  { id: "database", icon: Database, pos: { top: "50%", left: "72%" } },
  { id: "shield", icon: ShieldCheck, pos: { top: "78%", left: "70%" } },
  { id: "node", icon: Share2, pos: { top: "94%", left: "50%" } },
  { id: "laptop", icon: Laptop, pos: { top: "78%", left: "30%" } },
  { id: "mobile", icon: Smartphone, pos: { top: "50%", left: "28%" } },
  { id: "dashboard", icon: BarChart3, pos: { top: "22%", left: "30%" } },
];

/* ---------------------------------------------------------------- */
/*  Small building blocks                                            */
/* ---------------------------------------------------------------- */

function CountUpNumber({ value, suffix, display, inView, className }: CountUpNumberProps) {
  const [text, setText] = useState(display ?? "0");
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || value === null) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span className={className}>{display ?? `${text}${suffix}`}</span>;
}

/* Glassy / chrome 3D-style icon badge used on the tech nodes floating
   around the globe. Layered gradients + inset highlights fake depth. */
function TechNode({ icon: Icon, style, seed }: TechNodeProps) {
  return (
    <motion.div
      className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      style={style}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 5 + (seed % 3),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/70"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(219,234,254,0.55) 45%, rgba(148,197,240,0.4))",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(59,130,246,0.15), 0 12px 20px -6px rgba(15,23,42,0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Icon size={17} strokeWidth={1.75} className="text-slate-700" />
      </div>
    </motion.div>
  );
}

/* The holographic globe centerpiece */
function Globe() {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      {/* Ambient glow behind everything */}
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/30 blur-[70px]" />

      {/* Rotating outer ring */}
      <motion.svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="110"
          cy="110"
          r="104"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.25"
          strokeDasharray="2 8"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Glass sphere */}
      <div
        className="relative h-[170px] w-[170px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95), rgba(165,220,255,0.5) 28%, rgba(37,99,235,0.45) 58%, rgba(8,20,45,0.6) 100%)",
          boxShadow:
            "inset -16px -16px 46px rgba(8,20,45,0.45), inset 14px 14px 40px rgba(255,255,255,0.55), 0 26px 60px -10px rgba(6,182,212,0.5)",
        }}
      >
        {/* Latitude / longitude wireframe */}
        <svg viewBox="0 0 170 170" className="absolute inset-0 h-full w-full">
          {[12, 32, 55, 80].map((ry, i) => (
            <ellipse
              key={i}
              cx="85"
              cy="85"
              rx="80"
              ry={ry}
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.6"
            />
          ))}
          <ellipse
            cx="85"
            cy="85"
            rx="36"
            ry="80"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />
          <ellipse
            cx="85"
            cy="85"
            rx="80"
            ry="80"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.6"
          />
          {/* glowing connection nodes */}
          {[
            [44, 36],
            [116, 33],
            [24, 91],
            [140, 85],
            [58, 134],
            [110, 128],
            [85, 18],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="2"
              fill="#67E8F9"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </svg>

        {/* Specular highlight */}
        <div className="absolute left-5 top-4 h-9 w-12 rounded-full bg-white/70 blur-lg" />
      </div>
    </div>
  );
}

/* Achievement card floating around the globe, connected by a glow line */
function AchievementCard({ item, index }: AchievementCardProps) {
  const Icon = item.icon;
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-30 w-[168px] lg:w-[178px]"
      style={item.pos}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5.5 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ y: -10, scale: 1.04 }}
        className="group relative overflow-hidden rounded-[18px] border border-white/70 bg-white/70 p-4 shadow-[0_14px_32px_-12px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.35)]"
      >
        {/* glow ring on hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          style={{
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* reflection sheen sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]">
          <div className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
        </div>

        {/* floating glow behind icon */}
        <div
          className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 rounded-full opacity-70 blur-xl"
          style={{ background: item.glow }}
        />

        <div
          className={`relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
        >
          <Icon size={17} strokeWidth={1.9} />
        </div>

        <CountUpNumber
          value={item.value}
          suffix={item.suffix}
          display={item.display}
          inView={inView}
          className="relative mt-3 block bg-gradient-to-br from-cyan-700 to-blue-700 bg-clip-text text-[24px] font-extrabold leading-none tracking-tight text-transparent dark:from-cyan-200 dark:to-blue-300"
        />

        <h3 className="relative mt-1.5 text-[12.5px] font-bold tracking-tight text-slate-900">
          {item.title}
        </h3>
        <p className="relative mt-0.5 text-[11px] leading-4 text-slate-500">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* Connecting glow lines from each corner card to the globe center */
function ConnectorLines() {
  const paths = [
    "M 120 70 C 240 70, 300 130, 360 190",
    "M 740 70 C 620 70, 560 130, 500 190",
    "M 120 400 C 240 400, 300 340, 360 280",
    "M 740 400 C 620 400, 560 340, 500 280",
  ];
  return (
    <svg
      viewBox="0 0 860 470"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* Ambient floating particles in the background */
function Particles() {
  const dots = Array.from({ length: 12 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 137) % 100;
        const delay = (i % 7) * 0.6;
        const duration = 8 + (i % 5);
        const size = 2.5 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan-400/40"
            style={{ left: `${left}%`, bottom: "-10px", width: size, height: size }}
            animate={{ y: [-0, -500], opacity: [0, 0.8, 0] }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}

/* Mobile achievement card (simplified, no absolute positioning) */
function MobileCard({ item, index }: MobileCardProps) {
  const Icon = item.icon;
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative overflow-hidden rounded-[18px] border border-white/70 bg-white/70 p-4 shadow-[0_8px_22px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-md`}
      >
        <Icon size={17} strokeWidth={1.9} />
      </div>
      <CountUpNumber
        value={item.value}
        suffix={item.suffix}
        display={item.display}
        inView={inView}
        className="mt-3 block bg-gradient-to-br from-cyan-700 to-blue-700 bg-clip-text text-[26px] font-extrabold leading-none tracking-tight text-transparent dark:from-cyan-200 dark:to-blue-300"
      />
      <h3 className="mt-1.5 text-[13px] font-bold tracking-tight text-slate-900">
        {item.title}
      </h3>
      <p className="mt-0.5 text-[12px] leading-5 text-slate-500">{item.description}</p>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/*  Main section                                                     */
/* ---------------------------------------------------------------- */

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white py-12 sm:py-16">
      {/* Mesh gradient / lighting */}
      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[110px]" />
      <div className="absolute -right-40 top-1/3 h-[380px] w-[380px] rounded-full bg-blue-400/20 blur-[110px]" />
      <div className="absolute bottom-[-140px] left-1/3 h-[340px] w-[340px] rounded-full bg-indigo-300/20 blur-[110px]" />

      {/* Minimal technology grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 80%)",
        }}
      />

      <Particles />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Our Achievements
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Numbers that power global enterprise
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            A connected technology platform trusted by startups, SMEs, and
            enterprises around the world.
          </p>
        </motion.div>

        {/* ---------------- Desktop: 3D showcase ---------------- */}
        <div className="relative mx-auto hidden h-[400px] max-w-[860px] lg:block">
          <ConnectorLines />
          <Globe />
          {techNodes.map((n, i) => (
            <TechNode key={n.id} icon={n.icon} style={n.pos} seed={i} />
          ))}
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ---------------- Mobile / tablet fallback ---------------- */}
        <div className="lg:hidden">
          <div className="relative mx-auto mb-8 flex h-[220px] w-[220px] items-center justify-center sm:h-[250px] sm:w-[250px]">
            <Globe />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((item, i) => (
              <MobileCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
