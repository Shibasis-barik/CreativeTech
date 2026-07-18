import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  Award,
  BadgeCheck,
  Cloud,
  CloudCog,
  ShieldCheck,
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

const certifications = [
  {
    title: "ISO Standards",
    icon: Award,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Cyber Security",
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Quality Assurance",
    icon: BadgeCheck,
    color: "from-green-500 to-emerald-600",
  },
];

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Django", icon: SiDjango, color: "#44B78B" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "AWS", icon: Cloud, color: "#FF9900" },
  { name: "Azure", icon: CloudCog, color: "#0089D6" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

export default function Certifications() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
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

    const targetScrollLeft = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    setSelectedIndex(index);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const next = (selectedIndex + 1) % technologies.length;
      scrollToIndex(next);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [selectedIndex]);

  return (
    <section className="bg-slate-900 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
            CERTIFICATIONS & TECHNOLOGIES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white">
            Trusted Technologies & Best Practices
          </h2>

          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            We follow industry standards and use modern technologies
            to deliver secure, scalable and high-performance solutions.
          </p>

        </motion.div>

        {/* Certifications */}

        <div className="grid gap-6 md:grid-cols-3">

          {certifications.map((item) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center shadow-lg"
              >

                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white`}
                >

                  <Icon size={30} />

                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {item.title}
                </h3>

              </motion.div>

            );

          })}

        </div>

        {/* Technologies */}

        <div className="mt-20">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"></div>

          <h3 className="mb-12 text-center text-3xl font-bold text-white">
            Technologies We Use
          </h3>

          <div className="mx-auto max-w-6xl px-2 py-8">
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto px-2 py-4 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                const active = index === selectedIndex;

                return (
                  <motion.button
                    key={tech.name}
                    type="button"
                    whileHover={{ scale: 1.06 }}
                    onClick={() => scrollToIndex(index)}
                    className="shrink-0 snap-center flex flex-col items-center gap-3"
                    style={{ scrollSnapAlign: "center" }}
                  >
                    <motion.div
                      animate={{
                        scale: active ? 1 : 0.75,
                        opacity: active ? 1 : 0.45,
                      }}
                      transition={{ type: "spring", stiffness: 140, damping: 18 }}
                      className={`flex h-24 w-24 items-center justify-center rounded-full bg-slate-900/80 ring-1 ring-slate-700/60 transition-all duration-300 md:h-28 md:w-28 ${
                        active
                          ? "ring-cyan-400/80"
                          : "ring-slate-700/60"
                      }`}
                    >
                      <Icon size={42} color={tech.color} />
                    </motion.div>
                    <span className={`text-sm font-medium transition-opacity duration-300 ${
                      active ? "text-white opacity-100" : "text-slate-400 opacity-70"
                    }`}>
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {technologies.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-10 bg-cyan-400"
                    : "w-3 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}