import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Rocket, Users, Trophy, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  side: "left" | "right";
}

const timeline: TimelineItem[] = [
  {
    year: "2018",
    title: "Company Founded",
    desc: "Started with a vision to deliver innovative software solutions.",
    icon: Building2,
    side: "left",
  },
  {
    year: "2020",
    title: "First Enterprise Client",
    desc: "Successfully delivered enterprise-grade applications.",
    icon: Rocket,
    side: "right",
  },
  {
    year: "2022",
    title: "Team Expansion",
    desc: "Expanded our engineering and cloud infrastructure teams.",
    icon: Users,
    side: "left",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    desc: "Recognized for delivering modern digital transformation projects.",
    icon: Trophy,
    side: "right",
  },
  {
    year: "2025",
    title: "Global Growth",
    desc: "Serving clients across multiple industries worldwide.",
    icon: Globe,
    side: "left",
  },
];

function Node({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="relative flex h-16 w-16 items-center justify-center"
    >
      {/* Soft outer glow rings */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-blue-300/40 blur-md"
      />
      <div className="absolute inset-[-6px] rounded-full border-2 border-white/70" />
      {/* Node body */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-white shadow-[0_0_18px_rgba(56,132,247,0.55)] ring-4 ring-white">
        <Icon size={24} />
      </div>
    </motion.div>
  );
}

function CardContent({ item }: { item: TimelineItem }) {
  return (
    <>
      <span className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 text-sm font-bold text-white">
        {item.year}
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>

      <p className="mt-2 leading-6 text-slate-500">{item.desc}</p>
    </>
  );
}

function Card({
  item,
  containerRef,
  side,
}: {
  item: TimelineItem;
  containerRef: React.RefObject<HTMLDivElement | null>;
  side: "left" | "right";
}) {
  const [isDragging, setIsDragging] = useState(false);

  // Real-time drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Two trailing echoes that lag behind at different speeds, creating a tail
  const trailX1 = useSpring(x, { stiffness: 260, damping: 24 });
  const trailY1 = useSpring(y, { stiffness: 260, damping: 24 });
  const trailX2 = useSpring(x, { stiffness: 120, damping: 22 });
  const trailY2 = useSpring(y, { stiffness: 120, damping: 22 });

  const cardBox = (
    <div className="relative w-full max-w-sm">
      {/* Trail echo 2 - furthest behind */}
      <motion.div
        style={{ x: trailX2, y: trailY2 }}
        animate={{ opacity: isDragging ? 0.25 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-cyan-200 bg-cyan-50/60"
      />
      {/* Trail echo 1 - closer behind */}
      <motion.div
        style={{ x: trailX1, y: trailY1 }}
        animate={{ opacity: isDragging ? 0.45 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-cyan-200 bg-cyan-50/70"
      />

      {/* Draggable card */}
      <motion.div
        drag
        style={{ x, y }}
        dragConstraints={containerRef}
        dragElastic={0.15}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 420, bounceDamping: 24 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 w-full cursor-grab touch-none rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(30,64,175,0.15)] transition-colors duration-300 hover:border-cyan-300 hover:shadow-[0_16px_36px_-12px_rgba(30,64,175,0.25)] active:cursor-grabbing"
      >
        <CardContent item={item} />
      </motion.div>
    </div>
  );

  // The dotted connector stays pinned to the node on one end, while the
  // other end tracks the card's live drag position — so it stretches and
  // rotates as you drag, staying attached at both ends.
  const cardEndX = useTransform(x, (v) => (side === "left" ? v : 40 + v));
  const cardEndY = useTransform(y, (v) => 40 + v);
  const nodeAnchorX = side === "left" ? 40 : 0;

  const connector = (
    <svg
      width={40}
      height={80}
      viewBox="0 0 40 80"
      className="shrink-0 overflow-visible"
    >
      <motion.line
        x1={nodeAnchorX}
        y1={40}
        x2={cardEndX}
        y2={cardEndY}
        stroke="#93c5fd"
        strokeWidth={2}
        strokeDasharray="1 7"
        strokeLinecap="round"
      />
    </svg>
  );

  return side === "left" ? (
    <div className="flex items-center gap-3">
      {cardBox}
      {connector}
    </div>
  ) : (
    <div className="flex items-center gap-3">
      {connector}
      {cardBox}
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-slate-50 py-24"
    >
      {/* Decorative corner blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-300 to-blue-400 opacity-50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 opacity-50 blur-2xl" />
      <div className="pointer-events-none absolute right-6 top-[62%] h-14 w-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-60 blur-sm" />

      {/* Dot grid patterns */}
      <div
        className="pointer-events-none absolute right-10 top-10 h-40 w-40 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #93c5fd 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-24 left-10 h-40 w-40 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #93c5fd 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Scattered dots */}
      <div className="pointer-events-none absolute left-[16%] top-[16%] h-2.5 w-2.5 rounded-full bg-sky-300" />
      <div className="pointer-events-none absolute right-[14%] top-[24%] h-2.5 w-2.5 rounded-full bg-blue-300" />
      <div className="pointer-events-none absolute left-[1%] top-[24%] h-2 w-2 rounded-full bg-blue-200" />
      <div className="pointer-events-none absolute left-[12%] top-[45%] h-2 w-2 rounded-full bg-sky-300" />
      <div className="pointer-events-none absolute right-[30%] bottom-[16%] h-1.5 w-1.5 rounded-full bg-blue-300" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR JOURNEY
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Company Timeline
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Our journey of growth, innovation, and delivering value to businesses worldwide.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-300 via-sky-500 to-blue-600" />
          <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full bg-blue-400/30 blur-md" />

          <div className="flex flex-col gap-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: item.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                {/* Left slot */}
                <div className="flex w-1/2 justify-end pr-4">
                  {item.side === "left" && (
                    <Card item={item} containerRef={containerRef} side="left" />
                  )}
                </div>

                {/* Node */}
                <div className="absolute left-1/2 z-10 -translate-x-1/2">
                  <Node icon={item.icon} />
                </div>

                {/* Right slot */}
                <div className="flex w-1/2 justify-start pl-4">
                  {item.side === "right" && (
                    <Card item={item} containerRef={containerRef} side="right" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}