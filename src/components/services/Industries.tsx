
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionSkeleton from "../SectionSkeleton";

import {
  HeartPulse,
  Landmark,
  GraduationCap,
  ShoppingBag,
  Factory,
  Truck,
  Building2,
  Building,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import {
  getServicesIndustries,
  type ServicesIndustry,
  type ServicesIndustriesSection,
} from "../../api/api";

// ============================================================
// INDUSTRY ICON MAPPING
// ============================================================

const industryIcons: Record<string, LucideIcon> = {
  "heart-pulse": HeartPulse,
  landmark: Landmark,
  "graduation-cap": GraduationCap,
  "shopping-bag": ShoppingBag,
  factory: Factory,
  truck: Truck,
  "building-2": Building2,
  building: Building,
};

// ============================================================
// INDUSTRY GRADIENT MAPPING
// Keep complete Tailwind classes for production builds.
// ============================================================

const industryRings: Record<string, string> = {
  "rose-red": "from-rose-400 via-red-500 to-rose-600",
  "emerald-green": "from-emerald-400 via-green-500 to-emerald-600",
  "cyan-blue": "from-cyan-400 via-sky-500 to-blue-600",
  "amber-orange": "from-amber-400 via-orange-500 to-amber-600",
  "violet-purple": "from-violet-400 via-purple-500 to-fuchsia-600",
  "indigo-blue": "from-indigo-400 via-blue-500 to-indigo-600",
  "cyan-teal": "from-cyan-400 via-teal-500 to-blue-600",
  slate: "from-slate-300 via-slate-500 to-slate-700",
};

const defaultRing = industryRings["cyan-blue"];

// ============================================================
// INDUSTRIES COMPONENT
// ============================================================

export default function Industries() {
  const [section, setSection] =
    useState<ServicesIndustriesSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSectionActive, setIsSectionActive] = useState(true);

  // ============================================================
  // FETCH INDUSTRIES FROM DJANGO API
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchIndustries = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServicesIndustries();

        if (isMounted) {
          if (!response.is_active) {
            setIsSectionActive(false);
            return;
          }

          setSection(response);
        }
      } catch (err) {
        console.error("Failed to load Services Industries:", err);

        if (isMounted) {
          setError("Unable to load Industries content.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIndustries();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE INDUSTRIES IN DISPLAY ORDER
  // ============================================================

  const industries = useMemo<ServicesIndustry[]>(
    () =>
      section?.industries
        ?.filter((item) => item.is_active)
        .sort(
          (a, b) => a.display_order - b.display_order
        ) || [],
    [section]
  );

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <SectionSkeleton
        variant="cards"
        tone="dark"
      />
    );
  }

  if (!isSectionActive) return null;

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error || !section) {
    return (
      <section className="relative overflow-hidden bg-[#05070f] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-400">
            {error || "Industries content is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN INDUSTRIES SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-[#05070f] py-24">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[130px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

      {/* Faint dotted background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ====================================================
            DYNAMIC HEADING
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            {section.eyebrow}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white">
            {section.title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {section.description}
          </p>
        </motion.div>

        {/* ====================================================
            INDUSTRY CARDS
        ==================================================== */}

        {industries.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((item, index) => {
              const Icon =
                industryIcons[item.icon_key] || Building;

              const ring =
                industryRings[item.ring_key] || defaultRing;

              const fromLeft = index % 2 === 0;

              // Use custom URL when supplied.
              // Otherwise, use the industry detail route.
              const href =
                item.link_url?.trim() ||
                `/industries/${item.slug}`;

              return (
                <motion.a
                  key={item.id}
                  href={href}
                  initial={{
                    opacity: 0,
                    x: fromLeft ? -70 : 70,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
                >
                  {/* Ambient neon glow */}
                  <div
                    className="pointer-events-none absolute -inset-16 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                    style={{
                      background: `radial-gradient(closest-side, ${item.glow_color}, transparent)`,
                    }}
                  />

                  {/* Diagonal sheen sweep */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {/* Glowing top edge */}
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: item.accent_color,
                      boxShadow: `0 0 12px 1px ${item.accent_color}`,
                    }}
                  />

                  <div className="relative flex flex-col items-center text-center">

                    {/* Animated icon medallion */}
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${ring} opacity-70 blur-[7px]`}
                      />

                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ring} p-[2.5px]`}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0a0d18] transition duration-500 group-hover:scale-105 group-hover:rotate-6">
                          <Icon
                            size={30}
                            color={item.accent_color}
                            strokeWidth={1.9}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dynamic industry title */}
                    <h3 className="mt-6 text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    {/* Dynamic description */}
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>

                    {/* Explore link */}
                    <span
                      className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold opacity-0 transition-all duration-300 group-hover:opacity-100"
                      style={{
                        color: item.accent_color,
                      }}
                    >
                      {item.link_text || "Explore"}

                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-slate-400">
            No industries are currently available.
          </p>
        )}
      </div>
    </section>
  );
}
