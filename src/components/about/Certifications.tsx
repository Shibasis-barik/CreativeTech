import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { Award, RefreshCw, ShieldAlert, ShieldCheck, Cloud, Server } from "lucide-react";

import {
  SiReact,
  SiDjango,
  SiPython,
  SiNodedotjs,
  SiTypescript,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiLinux,
  SiGit,
} from "react-icons/si";

const certifications = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management",
    icon: Award,
    accent: "#F5B93F",
    ring: "from-amber-300 via-yellow-500 to-orange-500",
  },
  {
    code: "ISO/IEC 27001",
    title: "Information Security",
    icon: ShieldCheck,
    accent: "#38BDF8",
    ring: "from-cyan-300 via-sky-500 to-blue-600",
  },
  {
    code: "OWASP Verified",
    title: "Application Security",
    icon: ShieldAlert,
    accent: "#FB7185",
    ring: "from-rose-300 via-red-500 to-orange-600",
  },
  {
    code: "Agile / Scrum",
    title: "Delivery Framework",
    icon: RefreshCw,
    accent: "#C084FC",
    ring: "from-violet-300 via-purple-500 to-fuchsia-600",
  },
];

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Django", icon: SiDjango, color: "#44B78B" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "AWS", icon: Cloud, color: "#FF9900" },
  { name: "Azure", icon: Server, color: "#0089D6" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

/** Small laurel-branch flourish drawn from primitives — the section's signature motif. */
function LaurelBranch({ color, flip = false }: { color: string; flip?: boolean }) {
  const leaves = Array.from({ length: 5 });
  return (
    <svg
      width="34"
      height="46"
      viewBox="0 0 34 46"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M17 2 C 10 12, 8 26, 15 44"
        stroke={color}
        strokeOpacity={0.55}
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
      />
      {leaves.map((_, i) => {
        const t = i / (leaves.length - 1);
        const y = 6 + t * 34;
        const x = 15 - t * 3;
        const rotate = -35 - t * 10;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="5.5"
            ry="2.4"
            fill={color}
            fillOpacity={0.45 + t * 0.15}
            transform={`rotate(${rotate} ${x} ${y})`}
          />
        );
      })}
    </svg>
  );
}

function CertificationBadge({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const Icon = cert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-200 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/20"
    >
      {/* ambient glow that blooms on hover */}
      <div
        className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: `radial-gradient(closest-side, ${cert.accent}, transparent)` }}
      />

      {/* diagonal sheen sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative flex flex-col items-center">
        {/* rotating conic ring behind the medallion */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 rounded-full bg-gradient-to-tr ${cert.ring} opacity-70 blur-[6px]`}
          />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${cert.ring} p-[2.5px]`}>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-950">
              <Icon size={30} color={cert.accent} strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <LaurelBranch color={cert.accent} />
          <div>
            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">{cert.code}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {cert.title}
            </p>
          </div>
          <LaurelBranch color={cert.accent} flip />
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      isUserScrolling.current = true;
      window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        isUserScrolling.current = false;
      }, 200);

      const children = Array.from(container.children) as HTMLElement[];
      if (!children.length) return;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - containerCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      setSelectedIndex(closestIndex);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const target = container?.children[index] as HTMLElement | undefined;
    if (!container || !target) return;

    const targetScrollLeft =
      target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    setSelectedIndex(index);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isUserScrolling.current) return;
      const next = (selectedIndex + 1) % technologies.length;
      scrollToIndex(next);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [selectedIndex]);

  const distances = useMemo(
    () => technologies.map((_, i) => Math.abs(i - selectedIndex)),
    [selectedIndex],
  );

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900">
      {/* animated gradient glow field */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute right-1/4 bottom-0 h-[480px] w-[480px] translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            CERTIFICATIONS & TECHNOLOGIES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
            Trusted Technologies & Best Practices
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
            We follow industry standards and use modern technologies
            to deliver secure, scalable and high-performance solutions.
          </p>
        </motion.div>

        {/* Certifications */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <CertificationBadge key={cert.code} cert={cert} index={index} />
          ))}
        </div>

        {/* Technologies */}
        <div className="mt-24">
          <h3 className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-white sm:mb-12 sm:text-3xl">
            Technologies We Use
          </h3>

          <div className="relative mx-auto max-w-6xl">
            <div
              ref={scrollRef}
              className="scrollbar-hide flex gap-5 overflow-x-auto px-6 py-6 sm:gap-8"
              style={{
                scrollSnapType: "x mandatory",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              }}
            >
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                const active = index === selectedIndex;
                const distance = distances[index];
                const scale = Math.max(1.15 - distance * 0.15, 0.62);
                const opacity = Math.max(1 - distance * 0.22, 0.3);

                return (
                  <motion.button
                    key={tech.name}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    className="flex shrink-0 snap-center flex-col items-center gap-3"
                    style={{ scrollSnapAlign: "center" }}
                  >
                    <motion.div
                      animate={{ scale, opacity }}
                      transition={{ type: "spring", stiffness: 160, damping: 20 }}
                      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 shadow-sm dark:bg-slate-900/80 dark:ring-slate-700/60 dark:shadow-none sm:h-24 sm:w-24 md:h-28 md:w-28"
                    >
                      {active && (
                        <motion.div
                          layoutId="tech-active-ring"
                          transition={{ type: "spring", stiffness: 200, damping: 24 }}
                          className="absolute -inset-1 rounded-full"
                          style={{
                            border: `2px solid ${tech.color}`,
                            boxShadow: `0 0 24px 2px ${tech.color}55`,
                          }}
                        />
                      )}
                      <Icon size={38} color={tech.color} className="sm:hidden" />
                      <Icon size={42} color={tech.color} className="hidden sm:block" />
                    </motion.div>
                    <span
                      className={`text-xs font-medium transition-opacity duration-300 sm:text-sm ${
                        active ? "text-slate-900 dark:text-white opacity-100" : "text-slate-500 dark:text-slate-400 opacity-70"
                      }`}
                    >
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
