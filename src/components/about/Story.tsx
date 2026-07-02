import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Globe,
} from "lucide-react";

export default function Story() {
  return (
    <section className="relative overflow-hidden bg-white py-20">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
                alt="Office"
                className="h-[500px] w-full object-cover transition duration-700 hover:scale-110"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-8 left-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">

              <h3 className="text-4xl font-bold text-cyan-600">
                10+
              </h3>

              <p className="text-sm text-slate-600">
                Years of Experience
              </p>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              OUR STORY
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              Building Future-Ready Digital Solutions
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Kreative Technology was founded with a mission to help
              organizations embrace digital transformation through
              innovative software, cloud technologies, artificial
              intelligence and enterprise IT services.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Today we partner with startups, SMEs and enterprises to
              deliver secure, scalable and high-performance technology
              solutions that create measurable business value.
            </p>

            {/* Stats */}

            <div className="mt-10 grid grid-cols-2 gap-5">

              {[
                {
                  icon: Building2,
                  number: "150+",
                  label: "Projects",
                },
                {
                  icon: Users,
                  number: "80+",
                  label: "Clients",
                },
                {
                  icon: Award,
                  number: "25+",
                  label: "Awards",
                },
                {
                  icon: Globe,
                  number: "12",
                  label: "Countries",
                },
              ].map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    <Icon
                      className="text-cyan-600"
                      size={24}
                    />

                    <h3 className="mt-3 text-2xl font-bold">
                      {item.number}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.label}
                    </p>

                  </div>

                );

              })}

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}