import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SiReact,
  SiDjango,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMysql,
  SiTypescript,
  SiGit,
  SiLinux,
  SiNodedotjs,
} from "react-icons/si";
import { Cloud, CloudCog } from "lucide-react";

// npm i react-icons   (Simple Icons brand set used for authentic logos)
// NOTE: Simple Icons dropped the AWS and Azure marks for trademark reasons,
// so those two use styled lucide icons instead of brand logos.

const technologies = [
  { name: "React", icon: SiReact, color: "#22d3ee" },
  { name: "Node.js", icon: SiNodedotjs, color: "#3fa246" },
  { name: "Django", icon: SiDjango, color: "#2fb573" },
  { name: "Python", icon: SiPython, color: "#f5c542" },
  { name: "TypeScript", icon: SiTypescript, color: "#3b82f6" },
  { name: "AWS", icon: Cloud, color: "#f59e0b" },
  { name: "Azure", icon: CloudCog, color: "#22a3e6" },
  { name: "Docker", icon: SiDocker, color: "#2ab5f6" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#7c6ff0" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#3b82c4" },
  { name: "MySQL", icon: SiMysql, color: "#f97316" },
  { name: "Git", icon: SiGit, color: "#f2622e" },
  { name: "Linux", icon: SiLinux, color: "#f2c231" },
];

export default function TechStack() {
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
    <section className="relative overflow-hidden bg-slate-50 py-12 dark:bg-slate-900">
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            TECHNOLOGY STACK
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            Modern Technologies We Use
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
            We build scalable, secure and future-ready digital products using
            industry-leading technologies.
          </p>
        </motion.div>

        {/* Technologies */}
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
    </section>
  );
}
