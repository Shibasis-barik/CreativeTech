import { useEffect, useMemo, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import SectionSkeleton from "../SectionSkeleton";
import {
  Check,
  Briefcase,
  Users,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getServicesPricing,
  type ServicesPricingSection,
} from "../../api/api";

// ============================================================
// PRICING ICON MAPPING
// ============================================================

type PricingIcon = ComponentType<{ size?: number }>;

const pricingIcons: Record<string, PricingIcon> = {
  briefcase: Briefcase,
  users: Users,
  "building-2": Building2,
};

// ============================================================
// PRICING GRADIENT MAPPING
// Keep complete Tailwind classes for production builds.
// ============================================================

const pricingColors: Record<string, string> = {
  "cyan-blue": "from-cyan-500 to-blue-600",
  "indigo-violet": "from-indigo-500 to-violet-600",
  "emerald-green": "from-emerald-500 to-green-600",
};

const defaultColor = pricingColors["cyan-blue"];

// ============================================================
// PRICING MODEL COMPONENT
// ============================================================

export default function PricingModel() {
  const [section, setSection] =
    useState<ServicesPricingSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSectionActive, setIsSectionActive] = useState(true);

  // ============================================================
  // FETCH PRICING CONTENT FROM DJANGO
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchPricing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServicesPricing();

        if (isMounted) {
          if (!response.is_active) {
            setIsSectionActive(false);
            return;
          }

          setSection(response);
        }
      } catch (err) {
        console.error("Failed to load Services Pricing:", err);

        if (isMounted) {
          setError("Unable to load pricing content.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPricing();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE PLANS AND FEATURES
  // ============================================================

  const plans = useMemo(
    () =>
      section?.plans
        ?.filter((plan) => plan.is_active)
        .sort(
          (a, b) => a.display_order - b.display_order
        )
        .map((plan) => ({
          ...plan,
          features: plan.features
            .filter((feature) => feature.is_active)
            .sort(
              (a, b) => a.display_order - b.display_order
            ),
        })) || [],
    [section]
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
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-slate-500">
            {error || "Pricing content is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN PRICING SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

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
            PRICING CARDS
        ==================================================== */}

        {plans.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3">

            {plans.map((plan, index) => {
              const Icon =
                pricingIcons[plan.icon_key] || Briefcase;

              const color =
                pricingColors[plan.color_key] || defaultColor;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
                >
                  {/* Top Gradient */}
                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${color}`}
                  />

                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute right-6 top-6 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                      {plan.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${color} text-white shadow-lg`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Dynamic Title */}
                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    {plan.title}
                  </h3>

                  {/* Dynamic Description */}
                  <p className="mt-2 text-slate-500">
                    {plan.description}
                  </p>

                  {/* Dynamic Features */}
                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100">
                          <Check
                            size={14}
                            className="text-cyan-600"
                          />
                        </div>

                        <span className="text-slate-600">
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Button */}
                  <Link
                    to={plan.button_url || "/contact"}
                    className={`mt-10 flex w-full items-center justify-center rounded-xl bg-gradient-to-r ${color} py-3 font-semibold text-white transition hover:scale-105`}
                  >
                    {plan.button_text}
                  </Link>
                </motion.div>
              );
            })}

          </div>
        ) : (
          <p className="py-8 text-center text-slate-500">
            No pricing plans are currently available.
          </p>
        )}
      </div>
    </section>
  );
}
