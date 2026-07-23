import { motion } from "framer-motion";
// import { PhoneCall, Mail, MapPin } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-28">

      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />
    
        <div
        className="absolute inset-0 opacity-10"
        style={{
            backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-cyan-300"
        >
          CONTACT US
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-5xl font-bold text-white md:text-7xl"
        >
          Let's Build Something Amazing Together
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300"
        >
          We'd love to hear about your project.
          Contact our experts today.
        </motion.p>

        {/* <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <PhoneCall className="mx-auto text-cyan-400" size={34} />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Call Us
            </h3>
            <p className="mt-2 text-slate-300">
              +91 XXXXX XXXXX
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <Mail className="mx-auto text-cyan-400" size={34} />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Email
            </h3>
            <p className="mt-2 text-slate-300">
              info@creativetech.com
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <MapPin className="mx-auto text-cyan-400" size={34} />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Office
            </h3>
            <p className="mt-2 text-slate-300">
              Plot No. 40/C, Mancheswar Industrial Estate, Zone-D, Sector-A, Mancheswar, Bhubaneswar, Odisha, 751010, India
            </p>
          </div>

        </div> */}

      </div>

    </section>
  );
}
