import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  IndianRupee,
  MessageSquare,
  Send,
} from "lucide-react";

export default function ContactForm() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Glow */}

      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              SEND A MESSAGE
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900">
              Let's Discuss Your Next Project
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Fill out the form and our team will get back to you within
              24 hours with the best solution for your business.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "Free Consultation",
                "Enterprise Solutions",
                "Dedicated Support",
                "Quick Response",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="h-3 w-3 rounded-full bg-cyan-500"></div>

                  <p className="text-slate-700 font-medium">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
          >

            <div className="grid gap-6 md:grid-cols-2">

              {/* Name */}

              <div className="relative">

                <User
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
                />

              </div>

              {/* Email */}

              <div className="relative">

                <Mail
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
                />

              </div>

              {/* Phone */}

              <div className="relative">

                <Phone
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
                />

              </div>

              {/* Company */}

              <div className="relative">

                <Building2
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
                />

              </div>

            </div>

            {/* Service */}

            <div className="relative mt-6">

              <Briefcase
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <select className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500">

                <option>Select Service</option>

                <option>Software Development</option>

                <option>Cloud Solutions</option>

                <option>Cyber Security</option>

                <option>Networking</option>

                <option>AI Solutions</option>

                <option>Training</option>

              </select>

            </div>

            {/* Budget */}

            <div className="relative mt-6">

              <IndianRupee
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <select className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500">

                <option>Estimated Budget</option>

                <option>Below ₹50K</option>

                <option>₹50K - ₹2L</option>

                <option>₹2L - ₹10L</option>

                <option>Above ₹10L</option>

              </select>

            </div>

            {/* Message */}

            <div className="relative mt-6">

              <MessageSquare
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <textarea
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
              ></textarea>

            </div>

            {/* Button */}

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02]"
            >

              <Send size={18} />

              Send Message

            </button>

          </motion.form>

        </div>

      </div>

    </section>
  );
}