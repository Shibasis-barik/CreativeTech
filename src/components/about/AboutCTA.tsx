import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 py-20">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Ready to Build Your Next Digital Solution?
        </h2>

        <p className="mt-6 text-lg text-cyan-100">
          Let's work together to create secure, scalable and innovative
          software solutions that drive your business forward.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <Link
            to="/contact"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-cyan-700 shadow-lg transition hover:scale-105"
          >
            Contact Us
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Services
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}