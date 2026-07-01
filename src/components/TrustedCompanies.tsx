import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  Cpu,
  ShieldCheck,
  Globe,
  Code2,
  ArrowRight,
} from "lucide-react";

const technologies = [
  {
    name: "Microsoft Azure",
    category: "Cloud Platform",
    icon: <Cloud size={28} />,
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "Google Cloud",
    category: "Cloud Computing",
    icon: <Globe size={28} />,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Amazon AWS",
    category: "Infrastructure",
    icon: <Database size={28} />,
    color: "from-orange-400 to-amber-500",
  },
  {
    name: "Cisco",
    category: "Networking",
    icon: <ShieldCheck size={28} />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "IBM",
    category: "Enterprise Solutions",
    icon: <Cpu size={28} />,
    color: "from-indigo-500 to-violet-600",
  },
  {
    name: "Oracle",
    category: "Database",
    icon: <Code2 size={28} />,
    color: "from-red-500 to-rose-600",
  },
];

export default function TrustedCompanies() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20">

      {/* Background Glow */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Trusted Technologies by Leading Companies
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Powering Businesses with Cutting-Edge Technology
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Our enterprise-grade solutions are trusted by leading companies
            worldwide to drive innovation, enhance security, and optimize
            performance across industries.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {technologies.map((tech, index) => (

            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .08,
              }}
              whileHover={{
                y: -8,
              }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
            >

              <div className={`h-1.5 bg-gradient-to-r ${tech.color}`} />

              <div className="flex flex-1 flex-col p-6">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${tech.color} text-white shadow-md transition duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {tech.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {tech.name}
                </h3>

                <span className="mt-2 inline-block w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {tech.category}
                </span>

                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                  Enterprise-grade solutions built with reliability,
                  scalability and security for modern businesses.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition group-hover:text-cyan-600">
                  Learn More

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}