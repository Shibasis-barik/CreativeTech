
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Clock3,
  CalendarDays,
  Headset,
  MessageCircle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import {
  getContactBusinessHours,
  type ContactBusinessHoursSection,
} from "../../api/api";

// ============================================================
// SUPPORT ICON MAPPING
// ============================================================

const supportIcons: Record<string, LucideIcon> = {
  headset: Headset,
  "message-circle": MessageCircle,
};

// ============================================================
// SUPPORT COLOR MAPPING
// Keep complete Tailwind classes for production builds.
// ============================================================

const supportColors: Record<string, string> = {
  "cyan-blue": "from-cyan-500 to-blue-600",
  "emerald-green": "from-emerald-500 to-green-600",
};

// ============================================================
// BUSINESS HOURS COMPONENT
// ============================================================

export default function BusinessHours() {
  const [section, setSection] =
    useState<ContactBusinessHoursSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH BUSINESS HOURS FROM DJANGO
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchBusinessHours = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getContactBusinessHours();

        if (isMounted) {
          setSection(response);
        }
      } catch (err) {
        console.error(
          "Failed to load Contact Business Hours:",
          err
        );

        if (isMounted) {
          setError("Unable to load business hours.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBusinessHours();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE SCHEDULE AND SUPPORT OPTIONS
  // ============================================================

  const schedule = useMemo(
    () =>
      section?.schedule
        ?.filter((item) => item.is_active)
        .sort(
          (a, b) => a.display_order - b.display_order
        ) || [],
    [section]
  );

  const supportOptions = useMemo(
    () =>
      section?.support_options
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
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500">
            Loading business hours...
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
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500">
            {error || "Business hours are currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN BUSINESS HOURS SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ====================================================
            DYNAMIC SECTION HEADING
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
            TWO COLUMN LAYOUT
        ==================================================== */}

        <div className="grid gap-10 lg:grid-cols-2">

          {/* ==================================================
              LEFT SIDE - OFFICE SCHEDULE
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >
            {/* Schedule Heading */}
            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white">
                <CalendarDays size={28} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {section.office_schedule_title}
              </h3>

            </div>

            {/* Dynamic Schedule */}
            <div className="space-y-5">

              {schedule.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">

                    <Clock3
                      className="shrink-0 text-cyan-600"
                      size={20}
                    />

                    <span className="font-semibold text-slate-800">
                      {item.day}
                    </span>

                  </div>

                  <span
                    className={`font-medium ${
                      item.is_open
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.time}
                  </span>

                </motion.div>
              ))}

              {schedule.length === 0 && (
                <p className="py-5 text-center text-slate-500">
                  No office schedule is currently available.
                </p>
              )}

            </div>
          </motion.div>

          {/* ==================================================
              RIGHT SIDE - CUSTOMER SUPPORT
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >

            {/* Support Heading */}
            <h3 className="mb-8 text-2xl font-bold text-slate-900">
              {section.support_title}
            </h3>

            {/* Dynamic Support Options */}
            <div className="space-y-6">

              {supportOptions.map((item) => {
                const Icon =
                  supportIcons[item.icon_key] || Headset;

                const color =
                  supportColors[item.color_key] ||
                  supportColors["cyan-blue"];

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-5 rounded-2xl border border-slate-200 p-5 transition hover:shadow-lg"
                  >

                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${color} text-white`}
                    >
                      <Icon size={24} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {item.title}
                      </h4>

                      <p className="text-slate-600">
                        {item.value}
                      </p>
                    </div>

                  </motion.div>
                );
              })}

              {supportOptions.length === 0 && (
                <p className="py-5 text-center text-slate-500">
                  No support options are currently available.
                </p>
              )}

            </div>

            {/* =================================================
                DYNAMIC RESPONSE TIME
            ================================================= */}

            <div className="mt-10 rounded-2xl bg-slate-100 p-6">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="shrink-0 text-green-500" />

                <span className="font-semibold text-slate-900">
                  {section.response_time_title}
                </span>

              </div>

              <p className="mt-3 text-slate-600">
                {section.response_time_prefix}{" "}

                <strong className="text-slate-900">
                  {section.response_time_value}
                </strong>{" "}

                {section.response_time_suffix}
              </p>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
