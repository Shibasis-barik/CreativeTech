import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cloud,
  ShieldCheck,
  Server,
  Monitor,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    title: "Software Development",
    description:
      "Custom web applications, enterprise software, APIs and scalable digital platforms.",
    icon: Code2,
    color: "from-cyan-500 to-blue-600",
    tech: ["React", "Django", "Node", "Flutter"],
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud migration, DevOps, AWS, Azure and Google Cloud infrastructure.",
    icon: Cloud,
    color: "from-sky-500 to-indigo-600",
    tech: ["AWS", "Azure", "Docker", "Kubernetes"],
  },
  {
    title: "Cyber Security",
    description:
      "Protect your business with enterprise-grade security and compliance.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-600",
    tech: ["Firewall", "SOC", "SIEM", "PenTest"],
  },
  {
    title: "IT Infrastructure",
    description:
      "Enterprise networking, servers, virtualization and monitoring.",
    icon: Server,
    color: "from-orange-500 to-amber-500",
    tech: ["Cisco", "VMware", "Linux", "Storage"],
  },
  {
    title: "CCTV Surveillance",
    description:
      "Modern surveillance systems with AI-powered monitoring.",
    icon: Monitor,
    color: "from-purple-500 to-violet-600",
    tech: ["IP Camera", "NVR", "Access", "Analytics"],
  },
  {
    title: "Corporate Training",
    description:
      "Upskill your teams in AI, Cloud, Python and Full Stack Development.",
    icon: GraduationCap,
    color: "from-rose-500 to-pink-600",
    tech: ["Python", "React", "AI", "Cloud"],
  },
];

export default function ServiceGrid() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            WHAT WE OFFER
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            Premium Technology Services
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            End-to-end technology solutions that help startups,
            enterprises and organizations accelerate digital transformation.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
              >

                {/* Top Border */}

                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${service.color}`}
                />

                {/* Glow */}

                <div
                  className={`absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-r ${service.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                />

                {/* Icon */}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg transition duration-500 group-hover:rotate-6 group-hover:scale-110`}
                >

                  <Icon size={30} />

                </div>

                {/* Title */}

                <h3 className="mt-7 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                {/* Description */}

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>

                {/* Tech */}

                <div className="mt-6 flex flex-wrap gap-2">

                  {service.tech.map((tech) => (

                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

                {/* Button */}

                <button className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-600 transition group-hover:gap-3">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
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