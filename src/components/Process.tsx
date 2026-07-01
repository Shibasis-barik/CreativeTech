import { motion } from "framer-motion";
import {
  Search,
  ClipboardList,
  Code2,
  Bug,
  Rocket,
  ArrowRight,
} from "lucide-react";

const process = [
  {
    title: "Discovery",
    description: "Understanding business goals and requirements.",
    icon: Search,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Planning",
    description: "Creating architecture, roadmap and delivery plan.",
    icon: ClipboardList,
    color: "from-indigo-500 to-violet-600",
  },
  {
    title: "Development",
    description: "Building scalable and secure digital solutions.",
    icon: Code2,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Testing",
    description: "Quality assurance, security and performance testing.",
    icon: Bug,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Deployment",
    description: "Launching with monitoring and ongoing support.",
    icon: Rocket,
    color: "from-pink-500 to-rose-600",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR PROCESS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            How We Build Digital Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            A streamlined workflow focused on delivering reliable,
            scalable and high-quality technology solutions.
          </p>
        </motion.div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

          {process.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className="relative group"
              >
                <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition group-hover:gap-3">
                    Learn More
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </div>

                {/* Arrow Connector */}
                {index < process.length - 1 && (
                  <div className="absolute top-1/2 -right-6 hidden xl:flex -translate-y-1/2 items-center">
                    <ArrowRight
                      size={24}
                      className="text-cyan-400"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}