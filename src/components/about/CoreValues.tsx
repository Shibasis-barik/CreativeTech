import { motion } from "framer-motion";
import {
  Building2,
  Rocket,
  Users,
  Trophy,
  Globe,
} from "lucide-react";

const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    desc: "Started with a vision to deliver innovative software solutions.",
    icon: Building2,
  },
  {
    year: "2020",
    title: "First Enterprise Client",
    desc: "Successfully delivered enterprise-grade applications.",
    icon: Rocket,
  },
  {
    year: "2022",
    title: "Team Expansion",
    desc: "Expanded our engineering and cloud infrastructure teams.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Industry Recognition",
    desc: "Recognized for delivering modern digital transformation projects.",
    icon: Trophy,
  },
  {
    year: "2025",
    title: "Global Growth",
    desc: "Serving clients across multiple industries worldwide.",
    icon: Globe,
  },
];

export default function Timeline() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR JOURNEY
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Company Timeline
          </h2>
        </div>

        <div className="relative">

          <div className="absolute left-6 top-0 h-full w-1 bg-cyan-200"></div>

          <div className="space-y-10">

            {timeline.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6"
                >

                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                    <Icon size={22} />
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-md flex-1">

                    <span className="text-cyan-600 font-bold">
                      {item.year}
                    </span>

                    <h3 className="mt-2 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-slate-600">
                      {item.desc}
                    </p>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
}