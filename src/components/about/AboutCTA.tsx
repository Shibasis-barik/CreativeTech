import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { ArrowRight, Calendar, Cpu, Sparkles, Cloud } from "lucide-react";
import { SiReact, SiPython, SiDocker } from "react-icons/si";
import { Link } from "react-router-dom";

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

const stats = [
  { target: 100, suffix: "+", label: "Projects delivered" },
  { target: 50, suffix: "+", label: "Enterprise clients" },
  { target: 99, suffix: "%", label: "Client satisfaction" },
  { target: 24, suffix: "/7", label: "Support" },
];

const floatingIcons = [
  { Icon: SiReact, color: "#61DAFB", top: "8%", left: "4%", size: 30, delay: 0 },
  { Icon: SiPython, color: "#3776AB", top: "18%", left: "90%", size: 26, delay: 0.6 },
  { Icon: SiDocker, color: "#2496ED", top: "78%", left: "6%", size: 28, delay: 1.2 },
  { Icon: Cloud, color: "#FF9900", top: "85%", left: "88%", size: 26, delay: 0.3 },
  { Icon: Cpu, color: "#22D3EE", top: "45%", left: "95%", size: 30, delay: 0.9 },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: (i * 37 + 11) % 100,
  left: (i * 61 + 17) % 100,
  size: 1 + (i % 3),
  duration: 6 + ((i * 3) % 8),
  delay: (i * 0.7) % 5,
}));

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/40"
          style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function AboutCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const spotlightX = useTransform(springX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(springY, (v) => `${v * 100}%`);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{ background: "linear-gradient(180deg, #020617 0%, #0F172A 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(60% 50% at 20% 20%, rgba(34,211,238,0.14), transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(59,130,246,0.14), transparent 60%)",
            "radial-gradient(60% 50% at 30% 30%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(50% 50% at 70% 60%, rgba(59,130,246,0.18), transparent 60%)",
            "radial-gradient(60% 50% at 20% 20%, rgba(34,211,238,0.14), transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(59,130,246,0.14), transparent 60%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/25 blur-[130px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-blue-600/25 blur-[140px]"
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[140%] -rotate-6"
            style={{
              top: `${20 + i * 28}%`,
              left: "-20%",
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.35), transparent)",
            }}
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.4,
            }}
          />
        ))}
      </div>

      <ParticleField />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(500px circle at ${x} ${y}, rgba(34,211,238,0.10), transparent 70%)`,
          ),
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {floatingIcons.map(({ Icon, color, top, left, size, delay }, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute hidden items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl lg:flex"
            style={{ top, left }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon size={size} color={color} />
          </motion.div>
        ))}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-[40px] border border-white/10 bg-white/[0.04] px-6 py-10 text-center shadow-[0_0_120px_-20px_rgba(34,211,238,0.35)] backdrop-blur-2xl sm:px-10 sm:py-12 lg:px-16 lg:py-14"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/[0.06] to-transparent" />

          <motion.div variants={itemVariants} className="relative flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-xl sm:text-sm">
              <Sparkles size={16} className="text-cyan-300" />
              Let&apos;s build something amazing
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="relative mx-auto mt-6 max-w-3xl text-[28px] font-bold leading-[1.15] tracking-tight text-white md:text-[38px] lg:text-[52px]"
          >
            Transform your ideas into{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              powerful digital experiences
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="relative mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base lg:text-lg"
          >
            From AI-powered applications and enterprise software to cloud
            infrastructure and cybersecurity, we build scalable digital
            solutions that accelerate business growth.
          </motion.p>

          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="relative mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} active={statsInView} />
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 font-semibold text-slate-950 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_10px_50px_-8px_rgba(34,211,238,0.8)]"
              >
                Start your project
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.span>
            </Link>

            <Link to="/contact#consultation">
              <motion.span
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/40 hover:bg-white/10"
              >
                <Calendar size={18} />
                Schedule a consultation
              </motion.span>
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="relative mt-6 text-xs text-slate-500 sm:text-sm"
          >
            No hidden costs &bull; Free consultation &bull; Fast project delivery
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  active,
}: {
  stat: (typeof stats)[number];
  active: boolean;
}) {
  const count = useCountUp(stat.target, active);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3.5 backdrop-blur-xl sm:px-4 sm:py-4">
      <p className="text-xl font-bold text-white sm:text-2xl">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
    </div>
  );
}
