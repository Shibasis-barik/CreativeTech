import { motion } from "framer-motion";
import {
  HeartPulse,
  Landmark,
  GraduationCap,
  ShoppingBag,
  Factory,
  Truck,
  Building2,
  Building,
} from "lucide-react";

const industries = [
  {
    title: "Healthcare",
    icon: HeartPulse,
    color: "from-red-500 to-rose-600",
  },
  {
    title: "Banking & Finance",
    icon: Landmark,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Education",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Retail & E-Commerce",
    icon: ShoppingBag,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Manufacturing",
    icon: Factory,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Logistics",
    icon: Truck,
    color: "from-sky-500 to-indigo-600",
  },
  {
    title: "Corporate",
    icon: Building2,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Government",
    icon: Building,
    color: "from-slate-600 to-slate-900",
  },
];

export default function Industries() {
  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            INDUSTRIES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Industries We Empower
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            We deliver tailored technology solutions across multiple
            industries, helping organizations innovate, automate and grow.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {industries.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
              >

                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg transition group-hover:rotate-6 group-hover:scale-110`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 text-center text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                  Digital solutions designed specifically for this industry.
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}