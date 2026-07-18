import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Globe,
} from "lucide-react";
import officeImg from "../../assets/about/officeImg.jpeg";

export default function Story() {
  return (
    <section className="relative overflow-hidden bg-white py-20">

      {/* Background Glow */}

      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

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
                src={officeImg}
                alt="Kreative Technology Office"
                className="h-[500px] w-full object-cover transition duration-700 hover:scale-110"
              />

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-8 left-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">

              <h3 className="text-4xl font-bold text-cyan-600">
                10+
              </h3>

              <p className="text-sm text-slate-600">
                Years of Experience
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
              OUR STORY
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              Building Future-Ready Digital Solutions
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Kreative Technology was founded with a vision to empower businesses, students, and organizations through innovative digital solutions. We specialize in software development, AI solutions, web technologies, cloud services, and IT consulting, helping our clients transform ideas into scalable and efficient technology solutions.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Along with delivering high-quality IT services, we are committed to nurturing future technology professionals through industry-focused training and internship programs. Our goal is to create lasting value by combining innovation, expertise, and a customer-first approach to build a smarter digital future.
            </p>

            {/* Stats */}

            {/* Stats */}

<div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">

  {[
    {
      icon: Building2,
      number: "150+",
      label: "Projects",
    },
    {
      icon: Users,
      number: "80+",
      label: "Clients",
    },
    {
      icon: Award,
      number: "25+",
      label: "Awards",
    },
    {
      icon: Globe,
      number: "12",
      label: "Countries",
    },
  ].map((item) => {

    const Icon = item.icon;

    return (

      <motion.div
        key={item.label}
        whileHover={{
          y: -6,
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-md
          hover:shadow-xl
          flex
          flex-col
          justify-center
          min-h-[150px]
        "
      >

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">

          <Icon
            className="text-cyan-600"
            size={20}
          />

        </div>

        <h3 className="mt-3 text-2xl font-bold text-slate-900">

          {item.number}

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