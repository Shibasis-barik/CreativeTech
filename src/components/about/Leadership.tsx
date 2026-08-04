import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  side: "left" | "right";
}

const sideTeam: TeamMember[] = [
  {
    name: "Michael Brown",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    side: "left",
  },
  {
    name: "Aisha Patel",
    role: "UI / UX Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    side: "left",
  },
  {
    name: "David Kim",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    side: "right",
  },
  {
    name: "Emily Zhang",
    role: "Head of Client Success",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200",
    side: "right",
  },
];

const featured = {
  name: "Sarah Johnson",
  role: "Chief Executive Officer",
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
};

interface SideCardProps {
  item: TeamMember;
  index: number;
}

function SideCard({ item, index }: SideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: item.side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/40 dark:border-slate-700/60 dark:bg-gradient-to-b dark:from-slate-800/60 dark:to-slate-900/60"
    >
      <div className="flex items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
        />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
          <p className="text-xs text-cyan-400">{item.role}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white dark:border-slate-700 dark:text-slate-300">
          <FaLinkedinIn size={14} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white dark:border-slate-700 dark:text-slate-300">
          <Mail size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  const left = sideTeam.filter((t) => t.side === "left");
  const right = sideTeam.filter((t) => t.side === "right");

  return (
    <section className="relative overflow-hidden bg-transparent py-24 dark:bg-[#0a0f1a]">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Leadership
          </span>
          <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Meet the Team Behind
            <br />
            Secure{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Our experienced professionals combine innovation, technology and
            business expertise to deliver exceptional digital solutions.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
        </motion.div>

        {/* Grid */}
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.4fr_1fr]">
          {/* Left column */}
          <div className="grid gap-6">
            {left.map((item, i) => (
              <SideCard key={item.name} item={item} index={i} />
            ))}
          </div>

          {/* Center featured card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl backdrop-blur-sm dark:border-slate-700/60 dark:bg-gradient-to-br dark:from-slate-800/70 dark:via-slate-900/70 dark:to-slate-950/70 sm:p-8"
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full ring-4 ring-cyan-500/10 sm:h-44 sm:w-44">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {featured.name}
                </h3>
                <p className="mt-1 text-sm text-cyan-400">{featured.role}</p>
                <div className="mt-6 flex justify-center gap-3 sm:justify-start">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white dark:border-slate-700 dark:text-slate-300">
                    <FaLinkedinIn size={18} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-cyan-500 hover:bg-cyan-500 hover:text-white dark:border-slate-700 dark:text-slate-300">
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="grid gap-6">
            {right.map((item, i) => (
              <SideCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
