import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  BadgeCheck,
//   Cpu,
//   Cloud,
//   Code2,
} from "lucide-react";

const certifications = [
  {
    title: "ISO Standards",
    icon: Award,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Cyber Security",
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Quality Assurance",
    icon: BadgeCheck,
    color: "from-green-500 to-emerald-600",
  },
];

const technologies = [
  "React",
  "Django",
  "Python",
  "Node.js",
  "TypeScript",
  "AWS",
  "Azure",
  "Docker",
  "MySQL",
  "PostgreSQL",
  "Linux",
  "Git",
];

export default function Certifications() {
  return (
    <section className="bg-slate-900 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
            CERTIFICATIONS & TECHNOLOGIES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white">
            Trusted Technologies & Best Practices
          </h2>

          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            We follow industry standards and use modern technologies
            to deliver secure, scalable and high-performance solutions.
          </p>

        </motion.div>

        {/* Certifications */}

        <div className="grid gap-6 md:grid-cols-3">

          {certifications.map((item) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center shadow-lg"
              >

                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white`}
                >

                  <Icon size={30} />

                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {item.title}
                </h3>

              </motion.div>

            );

          })}

        </div>

        {/* Technologies */}

        <div className="mt-16">

          <h3 className="text-center text-2xl font-bold text-white mb-8">
            Technologies We Use
          </h3>

          <div className="flex flex-wrap justify-center gap-4">

            {technologies.map((tech) => (

              <span
                key={tech}
                className="rounded-full border border-slate-600 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}