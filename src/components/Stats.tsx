import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Users,
  Award,
  Headset,
} from "lucide-react";

const stats = [
  {
    number: "150+",
    title: "Projects",
    description: "Enterprise solutions delivered.",
    icon: BriefcaseBusiness,
    color: "from-cyan-500 to-blue-600",
  },
  {
    number: "80+",
    title: "Clients",
    description: "Businesses trust our expertise.",
    icon: Users,
    color: "from-emerald-500 to-green-600",
  },
  {
    number: "10+",
    title: "Experience",
    description: "Years in software development.",
    icon: Award,
    color: "from-orange-500 to-yellow-500",
  },
  {
    number: "24/7",
    title: "Support",
    description: "Dedicated technical assistance.",
    icon: Headset,
    color: "from-violet-500 to-purple-600",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20">

      {/* Background Glow */}
      <div className="absolute -top-10 -left-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="absolute -bottom-10 -right-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >

          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR ACHIEVEMENTS
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
            Numbers That Speak
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We build modern software solutions trusted by startups,
            SMEs and enterprises.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-lg p-5 shadow-md transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
              >

                {/* Top Gradient */}

                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.color}`}
                ></div>

                {/* Top Section */}

                <div className="flex items-center justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <Icon size={20} />
                  </div>

                  <h2 className="text-3xl font-extrabold text-slate-900">
                    {item.number}
                  </h2>

                </div>

                {/* Title */}

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                {/* Hover Glow */}

                <div
                  className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-r ${item.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                ></div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}