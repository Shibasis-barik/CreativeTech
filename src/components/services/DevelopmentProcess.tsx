import { motion } from "framer-motion";
import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  Bug,
  Rocket,
} from "lucide-react";

const process = [
  {
    title: "Discovery",
    icon: Search,
    color: "from-cyan-500 to-blue-600",
    description: "Understanding business requirements and goals.",
  },
  {
    title: "Planning",
    icon: ClipboardList,
    color: "from-indigo-500 to-violet-600",
    description: "Creating project roadmap and architecture.",
  },
  {
    title: "UI / UX Design",
    icon: PenTool,
    color: "from-pink-500 to-rose-600",
    description: "Crafting modern and user-friendly interfaces.",
  },
  {
    title: "Development",
    icon: Code2,
    color: "from-green-500 to-emerald-600",
    description: "Building scalable applications with best practices.",
  },
  {
    title: "Testing",
    icon: Bug,
    color: "from-orange-500 to-amber-500",
    description: "Ensuring security, quality and performance.",
  },
  {
    title: "Deployment",
    icon: Rocket,
    color: "from-sky-500 to-cyan-600",
    description: "Launching and monitoring production systems.",
  },
];

export default function DevelopmentProcess() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">

      {/* Background Glow */}

      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR PROCESS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            How We Deliver Projects
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            A transparent and agile development process that ensures
            high-quality results and on-time delivery.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative">

          {/* Line */}

          <div className="absolute left-0 right-0 top-10 hidden lg:block h-1 bg-slate-200"></div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">

            {process.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative text-center"
                >

                  {/* Icon */}

                  <div
                    className={`relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-white shadow-xl`}
                  >
                    <Icon size={32} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}