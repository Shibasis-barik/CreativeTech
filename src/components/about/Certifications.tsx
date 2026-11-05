
import { motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";

import {
  Award,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Cloud,
  Server,
} from "lucide-react";

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

import SectionSkeleton from "../SectionSkeleton";

import {
  getAboutCertificationsTechnologies,
  type AboutCertificationTechnology,
  type AboutCertificationsTechnologiesSection,
} from "../../api/api";

// Icon component compatibility for Lucide and React Icons.
type IconComponent = ComponentType<any>;

interface CertificationStyle {
  icon: IconComponent;
  accent: string;
  ring: string;
}

interface TechnologyStyle {
  icon: IconComponent;
  color: string;
}

// Visual styles remain in React.
// Content comes from Django Admin.
const certificationStyles: Record<string, CertificationStyle> = {
  "ISO 9001:2015": {
    icon: Award,
    accent: "#F5B93F",
    ring: "from-amber-300 via-yellow-500 to-orange-500",
  },
  "ISO/IEC 27001": {
    icon: ShieldCheck,
    accent: "#38BDF8",
    ring: "from-cyan-300 via-sky-500 to-blue-600",
  },
  "OWASP Verified": {
    icon: ShieldAlert,
    accent: "#FB7185",
    ring: "from-rose-300 via-red-500 to-orange-600",
  },
  "Agile / Scrum": {
    icon: RefreshCw,
    accent: "#C084FC",
    ring: "from-violet-300 via-purple-500 to-fuchsia-600",
  },
};

const defaultCertificationStyle: CertificationStyle = {
  icon: Award,
  accent: "#38BDF8",
  ring: "from-cyan-300 via-sky-500 to-blue-600",
};

const technologyStyles: Record<string, TechnologyStyle> = {
  react: { icon: SiReact, color: "#61DAFB" },
  django: { icon: SiDjango, color: "#44B78B" },
  python: { icon: SiPython, color: "#3776AB" },
  "node.js": { icon: SiNodedotjs, color: "#339933" },
  nodejs: { icon: SiNodedotjs, color: "#339933" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  aws: { icon: Cloud, color: "#FF9900" },
  azure: { icon: Server, color: "#0089D6" },
  docker: { icon: SiDocker, color: "#2496ED" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  linux: { icon: SiLinux, color: "#FCC624" },
  git: { icon: SiGit, color: "#F05032" },
};

const defaultTechnologyStyle: TechnologyStyle = {
  icon: Cloud,
  color: "#38BDF8",
};

/** Small laurel-branch flourish drawn from primitives. */
function LaurelBranch({
  color,
  flip = false,
}: {
  color: string;
  flip?: boolean;
}) {
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
  cert: AboutCertificationTechnology;
  index: number;
}) {
  const style =
    certificationStyles[cert.name] || defaultCertificationStyle;

  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-200 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/20"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background: `radial-gradient(closest-side, ${style.accent}, transparent)`,
        }}
      />

      {/* Diagonal sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative flex flex-col items-center">
        {/* Rotating gradient ring */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-tr ${style.ring} opacity-70 blur-[6px]`}
          />

          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${style.ring} p-[2.5px]`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-950">
              {cert.image || cert.image_url ? (
                <img
                  src={cert.image || cert.image_url}
                  alt={cert.name}
                  className="h-12 w-12 object-contain"
                />
              ) : (
                <Icon
                  size={30}
                  color={style.accent}
                  strokeWidth={1.8}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <LaurelBranch color={style.accent} />

          <div>
            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">
              {cert.name}
            </h3>

            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {cert.description || "Certification"}
            </p>
          </div>

          <LaurelBranch color={style.accent} flip />
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [section, setSection] =
    useState<AboutCertificationsTechnologiesSection | null>(null);

  const [isSectionActive, setIsSectionActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);

  const scrollTimeout =
    useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Fetch Certifications & Technologies from Django.
  useEffect(() => {
    let isMounted = true;

    const fetchSection = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAboutCertificationsTechnologies();

        if (isMounted) {
          if (!response.is_active) {
            setIsSectionActive(false);
            return;
          }

          setSection(response);
        }
      } catch (err) {
        console.error(
          "Failed to load Certifications & Technologies:",
          err
        );

        if (isMounted) {
          setError(
            "Unable to load Certifications & Technologies."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSection();

    return () => {
      isMounted = false;
    };
  }, []);

  // Separate certification and technology records.
  const certifications = useMemo(
    () =>
      section?.items.filter(
        (item) =>
          item.category === "certification" && item.is_active
      ) || [],
    [section]
  );

  const technologies = useMemo(
    () =>
      section?.items.filter(
        (item) =>
          item.category === "technology" && item.is_active
      ) || [],
    [section]
  );

  // Reset carousel position when technology records change.
  useEffect(() => {
    setSelectedIndex(0);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }
  }, [technologies.length]);

  // Detect the currently centered technology.
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

  // Automatically move the technology carousel.
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

  const distances = useMemo(
    () =>
      technologies.map((_, i) =>
        Math.abs(i - selectedIndex)
      ),
    [technologies, selectedIndex]
  );

  if (loading) {
    return <SectionSkeleton variant="cards" tone="light" />;
  }

  if (!isSectionActive) return null;

  if (error || !section) {
    return (
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            {error || "Content is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900">
      {/* Animated gradient glow field */}
      <motion.div
        aria-hidden
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/4 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]"
      />

      <motion.div
        aria-hidden
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="pointer-events-none absolute right-1/4 bottom-0 h-[480px] w-[480px] translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading from Django Admin */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            {section.eyebrow}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
            {section.title}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
            {section.description}
          </p>
        </motion.div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <CertificationBadge
                key={cert.id}
                cert={cert}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-24">
            {/* <h3 className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-white sm:mb-12 sm:text-3xl">
              Technologies We Use
            </h3> */}

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
                  const style =
                    technologyStyles[
                      tech.name.trim().toLowerCase()
                    ] || defaultTechnologyStyle;

                  const Icon = style.icon;

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
                      className="flex shrink-0 snap-center flex-col items-center gap-3"
                      style={{ scrollSnapAlign: "center" }}
                    >
                      <motion.div
                        animate={{ scale, opacity }}
                        transition={{
                          type: "spring",
                          stiffness: 160,
                          damping: 20,
                        }}
                        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:shadow-none dark:ring-slate-700/60 sm:h-24 sm:w-24 md:h-28 md:w-28"
                      >
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
                              border: `2px solid ${style.color}`,
                              boxShadow: `0 0 24px 2px ${style.color}55`,
                            }}
                          />
                        )}

                        {tech.image || tech.image_url ? (
                          <img
                            src={tech.image || tech.image_url}
                            alt={tech.name}
                            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                          />
                        ) : (
                          <>
                            <Icon
                              size={38}
                              color={style.color}
                              className="sm:hidden"
                            />

                            <Icon
                              size={42}
                              color={style.color}
                              className="hidden sm:block"
                            />
                          </>
                        )}
                      </motion.div>

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
          </div>
        )}
      </div>
    </section>
  );
}
