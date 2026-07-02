import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Solutions",
    desc: "Enterprise-grade security.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Experienced professionals.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    desc: "On-time project execution.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Award,
    title: "Quality First",
    desc: "Clean code & best practices.",
    color: "from-violet-500 to-purple-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 lg:py-20">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >

          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            WHY CHOOSE US
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
            Delivering Reliable IT Solutions
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
            We combine innovation, expertise and modern technology to
            deliver scalable digital solutions.
          </p>

        </motion.div>

        {/* Content */}

        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <h3 className="text-2xl font-bold text-slate-900">
              Why Businesses Trust Kreative Technology
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              We help startups and enterprises build secure software,
              cloud infrastructure and AI-powered business solutions.
            </p>

            <div className="mt-6 space-y-3">

              {[
                "Experienced Engineers",
                "AI & Cloud Experts",
                "24×7 Technical Support",
                "Agile Development",
                "Enterprise Security",
                "100% Client Focus",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="text-cyan-600"
                  />

                  <span className="text-sm text-slate-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105">

              Learn More

              <ArrowRight size={16} />

            </button>

          </motion.div>

          {/* Right Side */}

          <div className="grid gap-4 sm:grid-cols-2">

            {features.map((item) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white/80 backdrop-blur-lg p-4 shadow-md transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
                >

                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.color}`}
                  />

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${item.color} text-white shadow-lg transition group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <Icon size={18} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-slate-600">
                    {item.desc}
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