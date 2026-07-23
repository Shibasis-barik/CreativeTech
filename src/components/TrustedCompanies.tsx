import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, FileText, X, Check } from "lucide-react";

/* ---------------------------------------------------------------- */
/*  Custom glass-rendered technology glyphs                          */
/*  (generic shapes — not brand logos — styled to read as glass/3D)  */
/* ---------------------------------------------------------------- */

function CloudGlyph({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9">
      <defs>
        <linearGradient id={`cloud-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="100%" stopColor="white" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path
        d="M20 42a10 10 0 0 1-1-19.9A13 13 0 0 1 44 20a9 9 0 0 1-1 22H20z"
        fill={`url(#cloud-${tone})`}
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
    </svg>
  );
}

function ServerGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9">
      <rect x="14" y="14" width="36" height="10" rx="3" fill="white" fillOpacity="0.9" />
      <rect x="14" y="27" width="36" height="10" rx="3" fill="white" fillOpacity="0.7" />
      <rect x="14" y="40" width="36" height="10" rx="3" fill="white" fillOpacity="0.5" />
      <circle cx="20" cy="19" r="1.6" fill="currentColor" />
      <circle cx="20" cy="32" r="1.6" fill="currentColor" />
      <circle cx="20" cy="45" r="1.6" fill="currentColor" />
    </svg>
  );
}

function NetworkGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9">
      <circle cx="32" cy="18" r="6" fill="white" fillOpacity="0.9" />
      <circle cx="16" cy="46" r="6" fill="white" fillOpacity="0.7" />
      <circle cx="48" cy="46" r="6" fill="white" fillOpacity="0.7" />
      <path d="M28 22 L19 41 M36 22 L45 41 M22 46 H42" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  );
}

function ChipGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9">
      <rect x="18" y="18" width="28" height="28" rx="4" fill="white" fillOpacity="0.85" />
      <rect x="26" y="26" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      {[14, 22, 30, 38].map((y) => (
        <g key={y}>
          <line x1="10" y1={y} x2="18" y2={y} stroke="white" strokeOpacity="0.8" strokeWidth="2" />
          <line x1="46" y1={y} x2="54" y2={y} stroke="white" strokeOpacity="0.8" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

function DatabaseGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9">
      <ellipse cx="32" cy="18" rx="16" ry="6" fill="white" fillOpacity="0.9" />
      <path d="M16 18 V46 a16 6 0 0 0 32 0 V18" fill="white" fillOpacity="0.35" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
      <path d="M16 32 a16 6 0 0 0 32 0" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="1" />
    </svg>
  );
}

const technologies = [
  {
    name: "Microsoft Azure",
    category: "Cloud Platform",
    glyph: <CloudGlyph tone="azure" />,
    gradient: "from-sky-400 via-blue-500 to-blue-600",
    glow: "rgba(59,130,246,0.45)",
    description:
      "Enterprise-grade cloud infrastructure with global scale, hybrid deployment, and built-in compliance.",
    features: [
      "Global data center footprint across 60+ regions",
      "Hybrid and multi-cloud deployment support",
      "Built-in enterprise compliance & governance",
      "Integrated identity and access management",
    ],
  },
  {
    name: "Google Cloud",
    category: "Cloud Computing",
    glyph: <CloudGlyph tone="gcp" />,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glow: "rgba(16,185,129,0.4)",
    description:
      "Data-driven cloud computing with industry-leading AI, analytics, and container orchestration.",
    features: [
      "Industry-leading AI and machine learning tooling",
      "Managed Kubernetes and container orchestration",
      "Real-time analytics at petabyte scale",
      "Sustainable, carbon-neutral infrastructure",
    ],
  },
  {
    name: "Amazon AWS",
    category: "Infrastructure",
    glyph: <ServerGlyph />,
    gradient: "from-orange-400 via-amber-500 to-orange-600",
    glow: "rgba(249,115,22,0.4)",
    description:
      "Elastic, resilient infrastructure powering mission-critical workloads at any scale.",
    features: [
      "Elastic compute that scales in seconds",
      "99.99% availability SLA on core services",
      "Deep ecosystem of managed services",
      "Pay-as-you-go enterprise pricing",
    ],
  },
  {
    name: "Cisco",
    category: "Networking",
    glyph: <NetworkGlyph />,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    glow: "rgba(6,182,212,0.4)",
    description:
      "Secure, high-performance networking that keeps distributed enterprise teams connected.",
    features: [
      "Zero-trust network access by default",
      "SD-WAN for distributed enterprise teams",
      "Advanced threat detection and response",
      "Unified management across sites",
    ],
  },
  {
    name: "IBM",
    category: "Enterprise Solutions",
    glyph: <ChipGlyph />,
    gradient: "from-indigo-400 via-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.4)",
    description:
      "AI-accelerated enterprise systems built for governance, security, and scale.",
    features: [
      "AI-accelerated enterprise workflows",
      "Built-in data governance and lineage",
      "Hybrid cloud and mainframe integration",
      "Enterprise-grade security certifications",
    ],
  },
  {
    name: "Oracle",
    category: "Database",
    glyph: <DatabaseGlyph />,
    gradient: "from-rose-400 via-red-500 to-rose-600",
    glow: "rgba(244,63,94,0.4)",
    description:
      "Battle-tested database engines delivering performance for the world's largest workloads.",
    features: [
      "Autonomous database with self-tuning performance",
      "Mission-critical uptime and disaster recovery",
      "Best-in-class transaction throughput",
      "Enterprise support for regulated industries",
    ],
  },
];

/* ---------------------------------------------------------------- */
/*  Card with tilt / parallax + glow-border hover                    */
/* ---------------------------------------------------------------- */

function TechCard({
  tech,
  index,
  onOpen,
}: {
  tech: (typeof technologies)[number];
  index: number;
  onOpen: (tech: (typeof technologies)[number]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const iconX = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });
  const iconY = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="group relative flex h-full min-h-[276px] flex-col overflow-hidden rounded-[20px] border border-white/70 bg-white/70 p-5 shadow-[0_10px_28px_-14px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-6"
      >
        {/* glowing gradient border on hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br ${tech.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          style={{
            padding: "1.5px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* glow underneath, intensifies on hover */}
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: tech.glow }}
        />

        {/* faint always-on gradient wash */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br ${tech.gradient} opacity-[0.04]`}
        />

        {/* Icon */}
        <motion.div
          style={{ x: iconX, y: iconY, translateZ: 40 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4.5 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tech.gradient} text-white shadow-lg`}
            style={{
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -8px 16px rgba(0,0,0,0.15), 0 18px 30px -10px rgba(15,23,42,0.35)",
            }}
          >
            {tech.glyph}
            <div className="pointer-events-none absolute left-2 top-2 h-5 w-8 rounded-full bg-white/50 blur-md" />
          </motion.div>
        </motion.div>

        {/* Name */}
        <h3 className="relative mt-4 text-lg font-bold tracking-tight text-slate-900">
          {tech.name}
        </h3>

        {/* Category pill */}
        <span className="relative mt-1.5 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/70 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
          {tech.category}
        </span>

        {/* Description */}
        <p className="relative mt-3 flex-1 text-sm leading-5 text-slate-500">
          {tech.description}
        </p>

        {/* CTA */}
        <div className="relative mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOpen(tech)}
            className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${tech.gradient} px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer`}
            style={{
              boxShadow: hovered
                ? `0 8px 24px -4px ${tech.glow}`
                : "0 4px 12px -4px rgba(15,23,42,0.15)",
            }}
          >
            Explore Platform
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => onOpen(tech)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <FileText size={13} />
            Docs
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/*  Section                                                           */
/* ---------------------------------------------------------------- */

export default function TrustedCompanies() {
  const [selected, setSelected] = useState<(typeof technologies)[number] | null>(null);

  useEffect(() => {
    if (!selected) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/60 to-white py-16 sm:py-20">
      {/* Background blobs */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-cyan-300/25 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-blue-400/20 blur-[120px]"
      />

      {/* subtle technology grid */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-14 text-center"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/30 blur-[100px]" />
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Trusted Technologies by Leading Companies
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Powering businesses with cutting-edge technology
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Enterprise-grade solutions trusted by leading companies worldwide
            to drive innovation, enhance security, and optimize performance.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      {/* ---------------- Popup modal ---------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            {/* content box */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.name}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-[24px] border border-white/70 bg-white/90 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] backdrop-blur-2xl"
            >
              {/* accent wash */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${selected.gradient} opacity-[0.05]`}
              />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
                style={{ background: selected.glow }}
              />

              {/* close button */}
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={16} />
              </button>

              {/* icon */}
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${selected.gradient} text-white shadow-lg`}
                style={{
                  boxShadow:
                    "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -8px 16px rgba(0,0,0,0.15), 0 14px 26px -10px rgba(15,23,42,0.35)",
                }}
              >
                {selected.glyph}
              </div>

              <h3 className="relative mt-5 text-2xl font-bold tracking-tight text-slate-900">
                {selected.name}
              </h3>
              <span className="relative mt-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600">
                {selected.category}
              </span>

              <p className="relative mt-4 text-sm leading-6 text-slate-600">
                {selected.description}
              </p>

              {/* related content box */}
              <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-sm">

  {/* Decorative Glow */}
  <div
    className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${selected.gradient} opacity-10 blur-3xl`}
  />

  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
    Key Capabilities
  </h4>

  <ul className="mt-5 space-y-4">
    {selected.features.map((feature) => (
      <li
        key={feature}
        className="flex items-start gap-3 rounded-xl transition-all duration-300"
      >
        <div
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${selected.gradient} shadow-md`}
        >
          <Check
            size={12}
            strokeWidth={3}
            className="text-white"
          />
        </div>

        <p className="text-[15px] leading-7 font-medium text-slate-700">
          {feature}
        </p>
      </li>
    ))}
  </ul>
</div>

              {/* <div className="relative mt-7 flex items-center gap-3">
                <button
                  type="button"
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r ${selected.gradient} px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-xl`}
                >
                  Explore Platform
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Close
                </button>
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
