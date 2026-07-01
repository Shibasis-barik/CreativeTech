import { motion } from "framer-motion";
import {
  Rocket,
  Eye,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "Our Mission",
    icon: Rocket,
    color: "from-cyan-500 to-blue-600",
    description:
      "Deliver innovative, scalable and secure technology solutions that help businesses accelerate digital transformation and achieve sustainable growth.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    color: "from-indigo-500 to-violet-600",
    description:
      "Become a globally trusted technology partner by creating intelligent digital products that improve businesses and people's lives.",
  },
];

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            MISSION & VISION
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Driving Innovation With Purpose
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
            Our mission and vision guide every project we build,
            ensuring long-term value, innovation and customer success.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-2">

          {cards.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.2,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
              >

                {/* Top Border */}

                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.color}`}
                />

                {/* Glow */}

                <div
                  className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-r ${item.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                />

                {/* Icon */}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >

                  <Icon size={30} />

                </div>

                {/* Title */}

                <h3 className="mt-7 text-3xl font-bold text-slate-900">

                  {item.title}

                </h3>

                {/* Description */}

                <p className="mt-5 leading-8 text-slate-600">

                  {item.description}

                </p>

                {/* Button */}

                <button className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-600 transition group-hover:gap-3">

                  Learn More

                  <ArrowRight
                    size={18}
                  />

                </button>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}