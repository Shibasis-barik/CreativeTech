import { motion } from "framer-motion";
import {
  Check,
  Briefcase,
  Users,
  Building2,
} from "lucide-react";

const plans = [
  {
    title: "Project Based",
    icon: Briefcase,
    color: "from-cyan-500 to-blue-600",
    badge: "Most Popular",
    features: [
      "Fixed Scope",
      "Dedicated Project Manager",
      "Quality Assurance",
      "Deployment Support",
      "Documentation",
    ],
  },
  {
    title: "Dedicated Team",
    icon: Users,
    color: "from-indigo-500 to-violet-600",
    badge: "Recommended",
    features: [
      "Full-time Developers",
      "Weekly Sprint Delivery",
      "Daily Communication",
      "Agile Development",
      "Long-term Support",
    ],
  },
  {
    title: "Enterprise Partnership",
    icon: Building2,
    color: "from-emerald-500 to-green-600",
    badge: "Enterprise",
    features: [
      "Custom Architecture",
      "Cloud Infrastructure",
      "24×7 Support",
      "Security Compliance",
      "Dedicated Success Manager",
    ],
  },
];

export default function PricingModel() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">

      {/* Background Glow */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            ENGAGEMENT MODELS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Flexible Ways To Work With Us
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Choose the engagement model that best fits your business
            objectives, project scope and team requirements.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">

          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
              >
                {/* Top Gradient */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${plan.color}`}
                />

                {/* Badge */}
                <div className="absolute right-6 top-6 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {plan.badge}
                </div>

                {/* Icon */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${plan.color} text-white shadow-lg`}
                >
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {plan.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  Custom engagement tailored to your business.
                </p>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100">
                        <Check
                          size={14}
                          className="text-cyan-600"
                        />
                      </div>

                      <span className="text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="mt-10 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-105">
                  Request Proposal
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}