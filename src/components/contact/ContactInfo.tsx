import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
} from "lucide-react";

import { FaLinkedinIn } from "react-icons/fa";

const contactInfo = [
  {
    title: "Call Us",
    value: "+91 XXXXX XXXXX",
    icon: Phone,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Email",
    value: "info@kreativetech.com",
    icon: Mail,
    color: "from-indigo-500 to-violet-600",
  },
  {
    title: "Office",
    value: "Mancheswar, Bhubaneswar, Odisha",
    icon: MapPin,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Working Hours",
    value: "Mon - Sat | 9:00 AM - 6:00 PM",
    icon: Clock,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Website",
    value: "www.kreativetech.com",
    icon: Globe,
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "LinkedIn",
    value: "Kreative Technology",
    icon: FaLinkedinIn,
    color: "from-sky-500 to-cyan-600",
  },
];

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            CONTACT DETAILS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Get In Touch With Our Experts
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Reach out through your preferred communication channel.
            We're ready to discuss your next project.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {contactInfo.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-500 hover:border-cyan-300 hover:shadow-xl"
              >

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-600 break-words">
                  {item.value}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}