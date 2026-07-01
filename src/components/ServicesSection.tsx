import {
  Code2,
  Cloud,
  ShieldCheck,
  Server,
  Monitor,
  GraduationCap,
} from "lucide-react";

import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: <Code2 size={28} />,
    title: "Software Development",
    description:
      "Custom web applications, enterprise software and scalable digital platforms.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Cloud size={28} />,
    title: "Cloud Solutions",
    description:
      "Cloud migration, AWS, Azure and Google Cloud infrastructure.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Cyber Security",
    description:
      "Protect your business with modern security and compliance solutions.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <Server size={28} />,
    title: "IT Infrastructure",
    description:
      "Networking, virtualization, servers and enterprise infrastructure.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: <Monitor size={28} />,
    title: "CCTV & Surveillance",
    description:
      "Advanced monitoring systems with remote access and analytics.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Corporate Training",
    description:
      "Professional training in Python, React, AI and Cloud technologies.",
    color: "from-pink-500 to-rose-600",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20">

      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-12 text-center">

          <span className="inline-block rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
            OUR SERVICES
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            Innovative IT Solutions
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            We provide end-to-end digital transformation services for
            startups, SMEs and enterprise businesses.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service) => (

            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
            />

          ))}

        </div>

      </div>

    </section>
  );
}