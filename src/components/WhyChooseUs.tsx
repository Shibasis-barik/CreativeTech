import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import {
  getHomePageContent,
  type HomePageContent,
} from "../api/api";

const featureIcons: Record<string, LucideIcon> = {
  ShieldCheck,
  Users,
  Clock,
  Award,
};

export default function WhyChooseUs() {
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);

  useEffect(() => {
    const loadHomeContent = async () => {
      try {
        const data = await getHomePageContent();
        setHomeContent(data);
      } catch (error) {
        console.error("Failed to load Why Choose Us content:", error);
      }
    };

    loadHomeContent();
  }, []);

  const section = homeContent?.why_choose_section;

  // Hide the section when CMS has disabled it.
  if (section && !section.is_active) {
    return null;
  }

  // Keep the section out of the UI until the CMS data is loaded.
  if (!section) {
    return null;
  }

  const features = [...section.features]
    .filter((item) => item.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order,
    );

  const trustPoints = [...section.trust_points]
    .filter((item) => item.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order,
    );

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
            {section.eyebrow}
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
            {section.title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {section.description}
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
              {section.trust_title}
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              {section.trust_description}
            </p>

            <div className="mt-6 space-y-3">

              {trustPoints.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="text-cyan-600"
                  />

                  <span className="text-sm text-slate-700">
                    {item.text}
                  </span>

                </div>

              ))}

            </div>

            <a
              href={section.learn_more_link || "/about"}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >

              {section.learn_more_text}

              <ArrowRight size={16} />

            </a>

          </motion.div>

          {/* Right Side */}

          <div className="grid gap-4 sm:grid-cols-2">

            {features.map((item) => {

              const Icon =
                featureIcons[item.icon] ?? ShieldCheck;

              return (

                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-4 shadow-md backdrop-blur-lg transition-all duration-300 hover:border-cyan-300 hover:shadow-xl"
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
                    {item.description}
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