
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  getContactHero,
  type ContactHeroSection as ContactHeroData,
} from "../../api/api";

// ============================================================
// CONTACT HERO COMPONENT
// ============================================================

export default function ContactHero() {
  const [section, setSection] = useState<ContactHeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH CONTENT FROM DJANGO API
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchContactHero = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getContactHero();

        if (isMounted) {
          setSection(response);
        }
      } catch (err) {
        console.error("Failed to load Contact Hero:", err);

        if (isMounted) {
          setError("Unable to load Contact Hero content.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContactHero();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-cyan-300">
            Loading Contact...
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error || !section) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-slate-300">
            {error || "Contact content is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN CONTACT HERO
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-28">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />

      {/* Dotted Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">

        {/* Dynamic Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-cyan-300"
        >
          {section.eyebrow}
        </motion.span>

        {/* Dynamic Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-8 text-5xl font-bold text-white md:text-7xl"
        >
          {section.title}
        </motion.h1>

        {/* Dynamic Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300"
        >
          {section.description}
        </motion.p>

      </div>
    </section>
  );
}
