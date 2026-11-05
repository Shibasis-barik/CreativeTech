
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Cpu,
  Sparkles,
  Cloud,
} from "lucide-react";
import { SiReact, SiPython, SiDocker } from "react-icons/si";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import SectionSkeleton from "../SectionSkeleton";

import {
  getAboutCTA,
  type AboutCTAStat,
  type AboutCTASection,
} from "../../api/api";

// ============================================================
// COUNT UP ANIMATION
// ============================================================

function useCountUp(
  target: number,
  active: boolean,
  duration = 1800
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame: number;
    let start: number | null = null;

    setValue(0);

    const tick = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }

      const progress = Math.min(
        (timestamp - start) / duration,
        1
      );

      // Ease-out cubic animation.
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

// ============================================================
// FLOATING TECHNOLOGY ICONS
// ============================================================

const floatingIcons = [
  {
    Icon: SiReact,
    color: "#61DAFB",
    top: "8%",
    left: "4%",
    size: 30,
    delay: 0,
  },
  {
    Icon: SiPython,
    color: "#3776AB",
    top: "18%",
    left: "90%",
    size: 26,
    delay: 0.6,
  },
  {
    Icon: SiDocker,
    color: "#2496ED",
    top: "78%",
    left: "6%",
    size: 28,
    delay: 1.2,
  },
  {
    Icon: Cloud,
    color: "#FF9900",
    top: "85%",
    left: "88%",
    size: 26,
    delay: 0.3,
  },
  {
    Icon: Cpu,
    color: "#22D3EE",
    top: "45%",
    left: "95%",
    size: 30,
    delay: 0.9,
  },
];

// ============================================================
// FRAMER MOTION VARIANTS
// ============================================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ============================================================
// PARTICLE FIELD
// ============================================================

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
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
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

// ============================================================
// ABOUT CTA COMPONENT
// ============================================================

export default function AboutCTA() {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  // Reference for scroll-triggered statistics animation.
  const statsRef = useRef<HTMLDivElement>(null);

  const [statsInView, setStatsInView] = useState(false);

  const [section, setSection] =
    useState<AboutCTASection | null>(null);
  const [isSectionActive, setIsSectionActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH CTA CONTENT FROM DJANGO API
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchCTA = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAboutCTA();

        if (isMounted) {
          if (!response.is_active) {
            setIsSectionActive(false);
            return;
          }

          setSection(response);
        }
      } catch (err) {
        console.error("Failed to load About CTA:", err);

        if (isMounted) {
          setError("Unable to load CTA content.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCTA();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE STATISTICS
  // ============================================================

  const stats =
    section?.stats
      ?.filter((stat) => stat.is_active)
      .sort(
        (a, b) => a.display_order - b.display_order
      ) || [];

  // ============================================================
  // SCROLL-TRIGGERED STATISTICS ANIMATION
  // ============================================================

  useEffect(() => {
    // Wait until API data has loaded.
    if (loading || stats.length === 0) {
      return;
    }

    const element = statsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);

          // Run the count-up animation only once.
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [loading, stats.length]);

  // ============================================================
  // MOUSE SPOTLIGHT EFFECT
  // ============================================================

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, {
    stiffness: 60,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 60,
    damping: 20,
  });

  const spotlightX = useTransform(
    springX,
    (v) => `${v * 100}%`
  );

  const spotlightY = useTransform(
    springY,
    (v) => `${v * 100}%`
  );

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x} ${y}, rgba(34,211,238,0.10), transparent 70%)`
  );

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <SectionSkeleton
        variant="cta"
        tone={theme === "dark" ? "dark" : "light"}
      />
    );
  }

  if (!isSectionActive) return null;

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error || !section) {
    return (
      <section className="bg-slate-50 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            {error || "CTA content is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN CTA SECTION
  // ============================================================

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-20 dark:bg-slate-950"
      style={{
        background:
          theme === "light"
            ? "linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%)"
            : "linear-gradient(180deg, #020617 0%, #0F172A 100%)",
      }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Animated gradient background */}
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
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating light effects */}
      <motion.div
        aria-hidden
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/25 blur-[130px]"
      />

      <motion.div
        aria-hidden
        animate={{
          y: [0, 30, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-blue-600/25 blur-[140px]"
      />

      {/* Animated light lines */}
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
            animate={{
              x: ["-10%", "10%", "-10%"],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.4,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <ParticleField />

      {/* Mouse spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: spotlightBackground,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">

        {/* Floating technology icons */}
        {floatingIcons.map(
          ({ Icon, color, top, left, size, delay }, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute hidden items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl lg:flex"
              style={{ top, left }}
              animate={{
                y: [0, -14, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              <Icon size={size} color={color} />
            </motion.div>
          )
        )}

        {/* =====================================================
            MAIN CTA CARD
        ===================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="relative rounded-[40px] border border-slate-200 bg-white/80 px-6 py-10 text-center shadow-[0_0_80px_-20px_rgba(34,211,238,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_0_120px_-20px_rgba(34,211,238,0.35)] sm:px-10 sm:py-12 lg:px-16 lg:py-14"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/[0.06] to-transparent" />

          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-xl sm:text-sm">
              <Sparkles
                size={16}
                className="text-cyan-300"
              />

              {section.eyebrow}
            </span>
          </motion.div>

          {/* Dynamic heading */}
          <motion.h2
            variants={itemVariants}
            className="relative mx-auto mt-6 max-w-3xl text-[28px] font-bold leading-[1.15] tracking-tight text-slate-900 dark:text-white md:text-[38px] lg:text-[52px]"
          >
            {section.title_prefix}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {section.title_highlight}
            </span>
          </motion.h2>

          {/* Dynamic description */}
          <motion.p
            variants={itemVariants}
            className="relative mx-auto mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base lg:text-lg"
          >
            {section.description}
          </motion.p>

          {/* =================================================
              DYNAMIC STATISTICS WITH SCROLL MOTION
          ================================================= */}

          {stats.length > 0 && (
            <motion.div
              ref={statsRef}
              variants={itemVariants}
              className="relative mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            >
              {stats.map((stat) => (
                <StatCard
                  key={stat.id}
                  stat={stat}
                  active={statsInView}
                />
              ))}
            </motion.div>
          )}

          {/* =================================================
              DYNAMIC BUTTONS
          ================================================= */}

          <motion.div
            variants={itemVariants}
            className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to={section.primary_button_url}>
              <motion.span
                whileHover={{
                  scale: 1.04,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 font-semibold text-slate-950 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_10px_50px_-8px_rgba(34,211,238,0.8)]"
              >
                {section.primary_button_text}

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.span>
            </Link>

            <Link to={section.secondary_button_url}>
              <motion.span
                whileHover={{
                  scale: 1.04,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-cyan-300/40 dark:hover:bg-white/10"
              >
                <Calendar size={18} />

                {section.secondary_button_text}
              </motion.span>
            </Link>
          </motion.div>

          {/* Dynamic bottom note */}
          {section.bottom_note && (
            <motion.p
              variants={itemVariants}
              className="relative mt-6 text-xs text-slate-500 sm:text-sm"
            >
              {section.bottom_note}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// STATISTICS CARD
// ============================================================

function StatCard({
  stat,
  active,
}: {
  stat: AboutCTAStat;
  active: boolean;
}) {
  const count = useCountUp(stat.target, active);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:px-4 sm:py-4">
      <p className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
        {count}
        {stat.suffix}
      </p>

      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        {stat.label}
      </p>
    </div>
  );
}
