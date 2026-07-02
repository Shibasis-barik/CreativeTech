import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit Sharma",
    company: "ABC Technologies",
    role: "CEO",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Kreative Technology delivered an outstanding enterprise solution. Their team was highly professional, responsive, and completed everything ahead of schedule.",
  },
  {
    name: "Priya Das",
    company: "XYZ Solutions",
    role: "Project Manager",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Excellent communication, modern UI design, and exceptional technical expertise. We highly recommend Kreative Technology.",
  },
  {
    name: "Rahul Verma",
    company: "Innovate Pvt Ltd",
    role: "CTO",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Their React and Django expertise helped us launch our platform quickly with excellent performance and security.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
            CLIENT TESTIMONIALS
          </span>

          <h2 className="mt-5 text-5xl font-bold text-slate-900">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            We build long-term partnerships by delivering quality,
            innovation, and reliable support.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-8 shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
            >

              {/* Quote Icon */}

              <div className="absolute right-6 top-6 opacity-10 group-hover:opacity-20 transition">

                <Quote
                  size={70}
                  className="text-cyan-600"
                />

              </div>

              {/* Rating */}

              <div className="flex gap-1">

                {[...Array(5)].map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                ))}

              </div>

              {/* Review */}

              <p className="mt-6 leading-8 text-slate-600 italic">

                "{item.review}"

              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover ring-4 ring-cyan-100"
                />

                <div>

                  <h3 className="font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>

                  <p className="text-sm font-semibold text-cyan-600">
                    {item.company}
                  </p>

                </div>

              </div>

              {/* Bottom Gradient */}

              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}