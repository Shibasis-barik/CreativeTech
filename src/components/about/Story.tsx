import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Globe,
  type LucideIcon,
} from "lucide-react";
import officeImg from "../../assets/about/officeImg.jpeg";
import {
  getAboutStoryContent,
  type AboutStoryContent,
  type AboutStoryStat,
} from "../../api/api";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Users,
  Award,
  Globe,
};

const fallbackStats: AboutStoryStat[] = [
  { id: 1, icon: "Building2", value: "150+", label: "Projects", display_order: 1, is_active: true },
  { id: 2, icon: "Users", value: "80+", label: "Clients", display_order: 2, is_active: true },
  { id: 3, icon: "Award", value: "25+", label: "Awards", display_order: 3, is_active: true },
  { id: 4, icon: "Globe", value: "12", label: "Countries", display_order: 4, is_active: true },
];

const fallbackStory: AboutStoryContent = {
  id: 0,
  eyebrow: "OUR STORY",
  title: "Building Future-Ready Digital Solutions",
  paragraph_one:
    "Kreative Technology was founded with a vision to empower businesses, students, and organizations through innovative digital solutions. We specialize in software development, AI solutions, web technologies, cloud services, and IT consulting, helping our clients transform ideas into scalable and efficient technology solutions.",
  paragraph_two:
    "Along with delivering high-quality IT services, we are committed to nurturing future technology professionals through industry-focused training and internship programs. Our goal is to create lasting value by combining innovation, expertise, and a customer-first approach to build a smarter digital future.",
  image_src: null,
  image_url: "",
  experience_value: "10+",
  experience_label: "Years of Experience",
  is_active: true,
  stats: fallbackStats,
  created_at: "",
  updated_at: "",
};

export default function Story() {
  const [story, setStory] = useState<AboutStoryContent>(fallbackStory);

  useEffect(() => {
    let isMounted = true;

    getAboutStoryContent()
      .then((data) => {
        if (isMounted && data.is_active) {
          setStory({
            ...data,
            stats: data.stats.length > 0 ? data.stats : fallbackStats,
          });
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load About Story content:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const storyImage = story.image_src || story.image_url || officeImg;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

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
                src={storyImage}
                alt="Kreative Technology Office"
                className="h-[500px] w-full object-cover transition duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-8 left-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-4xl font-bold text-cyan-600">
                {story.experience_value}
              </h3>
              <p className="text-sm text-slate-600">
                {story.experience_label}
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
              {story.eyebrow}
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              {story.title}
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              {story.paragraph_one}
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              {story.paragraph_two}
            </p>

            {/* Editable Story Statistics */}
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {story.stats
                .filter((item) => item.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((item) => {
                  const Icon = iconMap[item.icon] || Award;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ duration: 0.25 }}
                      className="flex min-h-[150px] flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-md hover:shadow-xl"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
                        <Icon className="text-cyan-600" size={20} />
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-slate-900">
                        {item.value}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
