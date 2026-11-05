import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { motion } from "framer-motion";

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

import SectionSkeleton from "../SectionSkeleton";

import { Cloud, CloudCog } from "lucide-react";

import {
  getServicesTechStack,
  type ServicesTechnology,
  type ServicesTechStackSection,
} from "../../api/api";

// ============================================================
// TECHNOLOGY ICON MAPPING
// ============================================================

type IconComponent = ComponentType<any>;

const technologyIcons: Record<string, IconComponent> = {
  react: SiReact,
  nodejs: SiNodedotjs,
  django: SiDjango,
  python: SiPython,
  typescript: SiTypescript,
  aws: Cloud,
  azure: CloudCog,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  git: SiGit,
  linux: SiLinux,
  other: Cloud,
};

// ============================================================
// TECH STACK COMPONENT
// ============================================================

export default function TechStack() {
  const [section, setSection] =
    useState<ServicesTechStackSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSectionActive, setIsSectionActive] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);

  const scrollTimeout =
    useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ============================================================
  // FETCH TECH STACK CONTENT FROM DJANGO
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchTechStack = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServicesTechStack();

        if (isMounted) {
          if (!response.is_active) {
            setIsSectionActive(false);
            return;
          }

          setSection(response);
        }
      } catch (err) {
        console.error("Failed to load Services Tech Stack:", err);

        if (isMounted) {
          setError("Unable to load technology stack.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTechStack();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE TECHNOLOGIES
  // ============================================================

  const technologies = useMemo<ServicesTechnology[]>(
    () =>
      section?.technologies
        ?.filter((tech) => tech.is_active)
        .sort(
          (a, b) => a.display_order - b.display_order
        ) || [],
    [section]
  );

  // ============================================================
  // RESET CAROUSEL WHEN TECHNOLOGIES CHANGE
  // ============================================================

  useEffect(() => {
    setSelectedIndex(0);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }
  }, [technologies.length]);

  // ============================================================
  // DETECT CURRENTLY CENTERED TECHNOLOGY
  // ============================================================

  useEffect(() => {
    const container = scrollRef.current;

    if (!container || technologies.length === 0) return;

    const handleScroll = () => {
      isUserScrolling.current = true;

      window.clearTimeout(scrollTimeout.current);

      scrollTimeout.current = window.setTimeout(() => {
        isUserScrolling.current = false;
      }, 200);

      const children = Array.from(
        container.children
      ) as HTMLElement[];

      if (!children.length) return;

      const containerCenter =
        container.scrollLeft + container.clientWidth / 2;

      let closestIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      children.forEach((child, index) => {
        const childCenter =
          child.offsetLeft + child.offsetWidth / 2;

        const distance = Math.abs(
          childCenter - containerCenter
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      setSelectedIndex(closestIndex);
    };

    handleScroll();

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollTimeout.current);
    };
  }, [technologies.length]);

  // ============================================================
  // SCROLL TO SELECTED TECHNOLOGY
  // ============================================================

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;

    const target = container?.children[
      index
    ] as HTMLElement | undefined;

    if (!container || !target) return;

    const targetScrollLeft =
      target.offsetLeft -
      (container.clientWidth - target.clientWidth) / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    setSelectedIndex(index);
  };

  // ============================================================
  // AUTOMATIC CAROUSEL SCROLLING
  // ============================================================

  useEffect(() => {
    if (technologies.length <= 1) return;

    const intervalId = window.setInterval(() => {
      if (isUserScrolling.current) return;

      const next =
        (selectedIndex + 1) % technologies.length;

      scrollToIndex(next);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [selectedIndex, technologies.length]);

  // ============================================================
  // ACTIVE ITEM SCALE AND OPACITY
  // ============================================================

  const distances = useMemo(
    () =>
      technologies.map((_, index) =>
        Math.abs(index - selectedIndex)
      ),
    [technologies, selectedIndex]
  );

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <SectionSkeleton
        variant="cards"
        tone="light"
      />
    );
  }

  if (!isSectionActive) return null;

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error || !section) {
    return (
      <section className="relative overflow-hidden bg-slate-50 py-12 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            {error || "Technology stack is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN TECH STACK SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-slate-50 py-12 dark:bg-slate-900">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ====================================================
            DYNAMIC HEADING
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            {section.eyebrow}
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            {section.title}
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
            {section.description}
          </p>
        </motion.div>

        {/* ====================================================
            TECHNOLOGY CAROUSEL
        ==================================================== */}

        {technologies.length > 0 && (
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
                const Icon =
                  technologyIcons[tech.icon_key] || Cloud;

                const active = index === selectedIndex;

                const distance = distances[index] ?? 0;

                const scale = Math.max(
                  1.15 - distance * 0.15,
                  0.62
                );

                const opacity = Math.max(
                  1 - distance * 0.22,
                  0.3
                );

                return (
                  <motion.button
                    key={tech.id}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Select ${tech.name}`}
                    aria-pressed={active}
                    className="flex shrink-0 snap-center flex-col items-center gap-3"
                    style={{
                      scrollSnapAlign: "center",
                    }}
                  >
                    <motion.div
                      animate={{
                        scale,
                        opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 20,
                      }}
                      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:shadow-none dark:ring-slate-700/60 sm:h-24 sm:w-24 md:h-28 md:w-28"
                    >
                      {/* Active glowing ring */}
                      {active && (
                        <motion.div
                          layoutId="tech-active-ring"
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 24,
                          }}
                          className="absolute -inset-1 rounded-full"
                          style={{
                            border: `2px solid ${tech.color}`,
                            boxShadow: `0 0 24px 2px ${tech.color}55`,
                          }}
                        />
                      )}

                      {/* Technology icon */}
                      <Icon
                        size={38}
                        color={tech.color}
                        className="sm:hidden"
                      />

                      <Icon
                        size={42}
                        color={tech.color}
                        className="hidden sm:block"
                      />
                    </motion.div>

                    {/* Technology name */}
                    <span
                      className={`text-xs font-medium transition-opacity duration-300 sm:text-sm ${
                        active
                          ? "text-slate-900 opacity-100 dark:text-white"
                          : "text-slate-500 opacity-70 dark:text-slate-400"
                      }`}
                    >
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty technology state */}
        {technologies.length === 0 && (
          <p className="py-8 text-center text-slate-500 dark:text-slate-400">
            No technologies are currently available.
          </p>
        )}
      </div>
    </section>
  );
}
