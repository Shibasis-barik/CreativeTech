
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  Bug,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import {
  getServicesDevelopmentProcess,
  type ServicesDevelopmentProcessSection,
} from "../../api/api";

// ============================================================
// DEVELOPMENT PROCESS ICON MAPPING
// ============================================================

const processIcons: Record<string, LucideIcon> = {
  search: Search,
  "clipboard-list": ClipboardList,
  "pen-tool": PenTool,
  code: Code2,
  bug: Bug,
  rocket: Rocket,
};

// ============================================================
// DEVELOPMENT PROCESS COLOR MAPPING
// Keep complete Tailwind classes so they are included in builds.
// ============================================================

const processColors: Record<string, string> = {
  "cyan-blue": "from-cyan-500 to-blue-600",
  "indigo-violet": "from-indigo-500 to-violet-600",
  "pink-rose": "from-pink-500 to-rose-600",
  "green-emerald": "from-green-500 to-emerald-600",
  "orange-amber": "from-orange-500 to-amber-500",
  "sky-cyan": "from-sky-500 to-cyan-600",
};

// ============================================================
// DEVELOPMENT PROCESS COMPONENT
// ============================================================

export default function DevelopmentProcess() {
  const [section, setSection] =
    useState<ServicesDevelopmentProcessSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH CONTENT FROM DJANGO API
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchDevelopmentProcess = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServicesDevelopmentProcess();

        if (isMounted) {
          setSection(response);
        }
      } catch (err) {
        console.error(
          "Failed to load Development Process:",
          err
        );

        if (isMounted) {
          setError("Unable to load Development Process.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDevelopmentProcess();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE STEPS IN DISPLAY ORDER
  // ============================================================

  const steps =
    section?.steps
      ?.filter((step) => step.is_active)
      .sort(
        (a, b) => a.display_order - b.display_order
      ) || [];

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500">
            Loading development process...
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error || !section) {
    return (
      <section className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500">
            {error || "Development process is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN DEVELOPMENT PROCESS SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

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
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            {section.eyebrow}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            {section.title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            {section.description}
          </p>
        </motion.div>

        {/* ====================================================
            DEVELOPMENT TIMELINE
        ==================================================== */}

        {steps.length > 0 ? (
          <div className="relative">

            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-10 hidden h-1 bg-slate-200 lg:block" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">

              {steps.map((item, index) => {
                const Icon =
                  processIcons[item.icon_key] || Search;

                const color =
                  processColors[item.color_key] ||
                  processColors["cyan-blue"];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="relative text-center"
                  >
                    {/* Animated Icon */}
                    <motion.div
                      className={`relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${color} text-white shadow-xl`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 15,
                      }}
                    >
                      <Icon size={32} />
                    </motion.div>

                    {/* Dynamic Title */}
                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    {/* Dynamic Description */}
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}

            </div>
          </div>
        ) : (
          <p className="py-8 text-center text-slate-500">
            No development process steps are currently available.
          </p>
        )}
      </div>
    </section>
  );
}
