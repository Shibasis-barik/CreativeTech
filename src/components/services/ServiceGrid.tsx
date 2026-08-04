import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Braces,
  FileJson,
  Cloud,
  CloudCog,
  Boxes,
  ShieldCheck,
  Lock,
  Wifi,
  Server,
  Database,
  HardDrive,
  Monitor,
  Camera,
  ScanEye,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import backgroundImg from "../../assets/service/backgroundImg.png";
import { useTheme } from "../../hooks/useTheme";

const services = [
  {
    title: "Software Development",
    description:
      "Custom web applications, enterprise software, APIs and scalable digital platforms.",
    icon: Code2,
    accent: "#159ce9",
    shadow: "rgba(21, 156, 233, 0.45)",
    tech: ["React", "Django", "Node", "Flutter"],
    decor: [Braces, FileJson, Code2],
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud migration, DevOps, AWS, Azure and Google Cloud infrastructure.",
    icon: Cloud,
    accent: "#6e54ef",
    shadow: "rgba(110, 84, 239, 0.45)",
    tech: ["AWS", "Azure", "Docker", "Kubernetes"],
    decor: [Cloud, CloudCog, Boxes],
  },
  {
    title: "Cyber Security",
    description:
      "Protect your business with enterprise-grade security and compliance.",
    icon: ShieldCheck,
    accent: "#16cc76",
    shadow: "rgba(22, 204, 118, 0.5)",
    tech: ["Firewall", "SOC", "SIEM", "PenTest"],
    decor: [ShieldCheck, Lock, Wifi],
  },
  {
    title: "IT Infrastructure",
    description:
      "Enterprise networking, servers, virtualization and monitoring.",
    icon: Server,
    accent: "#ff8a0a",
    shadow: "rgba(255, 138, 10, 0.45)",
    tech: ["Cisco", "VMware", "Linux", "Storage"],
    decor: [Server, Database, HardDrive],
  },
  {
    title: "CCTV Surveillance",
    description: "Modern surveillance systems with AI-powered monitoring.",
    icon: Monitor,
    accent: "#a82df0",
    shadow: "rgba(168, 45, 240, 0.48)",
    tech: ["IP Camera", "NVR", "Access", "Analytics"],
    decor: [Camera, ScanEye, Monitor],
  },
  {
    title: "Corporate Training",
    description:
      "Upskill your teams in AI, Cloud, Python and Full Stack Development.",
    icon: GraduationCap,
    accent: "#f01766",
    shadow: "rgba(240, 23, 102, 0.45)",
    tech: ["Python", "React", "AI", "Cloud"],
    decor: [GraduationCap, BookOpen, Sparkles],
  },
];

export default function ServiceGrid() {
  const { theme } = useTheme();

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 dark:bg-[#050b1d]"
      style={{
        backgroundImage:
          theme === "dark"
            ? `linear-gradient(rgba(3, 8, 27, 0.75), rgba(3, 8, 27, 0.92)), url(${backgroundImg})`
            : "none",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(28,75,159,0.13),transparent_48%)]" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative mb-14 text-center"
      >
        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
          WHAT WE OFFER
        </span>

        <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white lg:text-5xl">
          Premium Technology Services
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          End-to-end technology solutions that help startups, enterprises and
          organizations accelerate digital transformation.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-[1770px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const [DecorA, DecorB, DecorC] = service.decor;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative min-h-[300px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-colors duration-300 hover:border-[--accent] dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(10,18,42,0.92),rgba(6,11,28,0.95))] dark:shadow-[0_16px_38px_rgba(0,0,0,0.35)] sm:p-6"
                style={
                  {
                    "--accent": service.accent,
                    boxShadow: `0 16px 38px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.03)`,
                  } as React.CSSProperties
                }
              >
                {/* top accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: service.accent }}
                />

                {/* soft glow */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: service.accent }}
                />

                {/* decorative illustration cluster, top-right */}
                <div className="pointer-events-none absolute right-3 top-3 h-20 w-28 opacity-90">
                  <DecorA
                    className="absolute right-0 top-0 h-11 w-11 -rotate-6 transition duration-500 group-hover:scale-105"
                    style={{ color: service.accent, opacity: 0.9 }}
                    strokeWidth={1.4}
                  />
                  <DecorB
                    className="absolute right-11 top-2 h-7 w-7 rotate-12 transition duration-500 group-hover:scale-110"
                    style={{ color: service.accent, opacity: 0.55 }}
                    strokeWidth={1.4}
                  />
                  <DecorC
                    className="absolute right-4 top-11 h-6 w-6 -rotate-3 transition duration-500 group-hover:scale-110"
                    style={{ color: "#ffffff", opacity: 0.25 }}
                    strokeWidth={1.4}
                  />
                </div>

                {/* icon badge */}
                <div
                  className="relative flex h-[48px] w-[48px] items-center justify-center rounded-xl text-white transition duration-500 group-hover:scale-105 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}, #0c52dc)`,
                    boxShadow: `0 10px 20px ${service.shadow}`,
                  }}
                >
                  <Icon size={24} strokeWidth={2.25} />
                </div>

                <h3 className="relative mt-5 text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-slate-900 dark:text-white sm:text-[21px]">
                  {service.title}
                </h3>
                <p className="relative mt-3 max-w-[28rem] text-[13.5px] leading-6 text-slate-600 dark:text-slate-300 sm:text-[14.5px]">
                  {service.description}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11.5px] font-bold text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.08] dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="relative mt-5 inline-flex items-center gap-1.5 text-[14px] font-extrabold transition-all duration-300 hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#09132e]"
                  style={{ color: service.accent }}
                >
                  Learn More{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
