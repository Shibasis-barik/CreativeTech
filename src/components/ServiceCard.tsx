import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  color,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl p-5 shadow-md transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
    >
      {/* Top Gradient */}
      <div
        className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${color}`}
      />

      {/* Hover Glow */}
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-r ${color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
      />

      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-6`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-bold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

      {/* Button */}
      <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition-all group-hover:gap-3">
        Learn More
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </motion.div>
  );
}