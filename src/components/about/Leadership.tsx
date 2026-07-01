import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

const team = [
  {
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
  },
  {
    name: "Michael Brown",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
  },
  {
    name: "Aisha Patel",
    role: "UI / UX Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
  },
  {
    name: "David Kim",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
  },
];

export default function Leadership() {
  return (
    <section className="relative overflow-hidden bg-white py-20">

      {/* Background Glow */}

      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >

          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR LEADERSHIP
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Meet Our Leadership Team
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Our experienced professionals combine innovation,
            technology and business expertise to deliver
            exceptional digital solutions.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {team.map((member, index) => (

            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="overflow-hidden">

                <img
                  src={member.image}
                  alt={member.name}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="text-xl font-bold text-slate-900">
                  {member.name}
                </h3>

                <p className="mt-2 text-cyan-600 font-medium">
                  {member.role}
                </p>

                <div className="mt-6 flex gap-3">

                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-cyan-500 hover:text-white">

                    <FaLinkedinIn size={18} />

                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-cyan-500 hover:text-white">

                    <Mail size={18} />

                  </button>

                </div>

              </div>

              {/* Gradient Bottom */}

              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}