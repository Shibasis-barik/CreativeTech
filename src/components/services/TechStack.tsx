import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Server,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const technologies = [
  {
    name: "React",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Django",
    icon: Database,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Python",
    icon: Cpu,
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "AWS",
    icon: Cloud,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Azure",
    icon: Cloud,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Docker",
    icon: Server,
    color: "from-sky-500 to-cyan-500",
  },
  {
    name: "Kubernetes",
    icon: ShieldCheck,
    color: "from-indigo-500 to-violet-600",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "MySQL",
    icon: Database,
    color: "from-orange-400 to-red-500",
  },
  {
    name: "TypeScript",
    icon: Code2,
    color: "from-blue-500 to-sky-600",
  },
  {
    name: "Git",
    icon: Cpu,
    color: "from-red-500 to-orange-600",
  },
  {
    name: "Linux",
    icon: Server,
    color: "from-slate-700 to-slate-900",
  },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >

          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
            TECHNOLOGY STACK
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white lg:text-5xl">
            Modern Technologies We Use
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            We build scalable, secure and future-ready digital products
            using industry-leading technologies.
          </p>

        </motion.div>

        {/* Technology Grid */}

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

          {technologies.map((tech, index) => {

            const Icon = tech.icon;

            return (

              <motion.div
                key={tech.name}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="group rounded-2xl border border-slate-700 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400 hover:bg-white/10"
              >

                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${tech.color} text-white shadow-lg`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="mt-5 text-center text-lg font-bold text-white">
                  {tech.name}
                </h3>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}