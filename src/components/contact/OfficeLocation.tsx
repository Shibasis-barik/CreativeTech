import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Building2,
  Phone,
  Mail,
//   Clock3,
} from "lucide-react";

export default function OfficeLocation() {
  return (
    <section className="relative overflow-hidden bg-white py-16">

      {/* Background Glow */}

      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            OUR OFFICE
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Visit Our Office
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            We'd love to meet you. Visit our office or schedule a
            meeting with our technology experts.
          </p>

        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl shadow-2xl"
          >

            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400"
              alt="Creative Technology Office"
              className="h-[620px] w-full object-cover transition duration-700 hover:scale-105"
            />

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl p-10 shadow-2xl"
          >

            {/* Company */}

            <div className="flex items-center gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg p-4">

                <Building2 size={34} />

              </div>

              <div>

                <h3 className="text-3xl font-bold text-slate-900">
                  Creative Technology
                </h3>

                <p className="text-slate-500">
                  Corporate Office
                </p>

              </div>

            </div>

            {/* Contact Cards */}

            <div className="mt-4 space-y-2">

              {/* Address */}

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">

                <MapPin
                  className="mt-1 text-cyan-600"
                  size={24}
                />

                <div>

                  <h4 className="font-semibold text-slate-900">
                    Office Address
                  </h4>

                  <p className="mt-2 leading-7 text-slate-600">

                    Plot No. 40/C, Mancheswar Industrial Estate, Zone-D,
                    <br />

                    Sector-A, Mancheswar, Bhubaneswar, Odisha 751010, India

                  </p>

                </div>

              </div>

              {/* Phone */}

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">

                <Phone
                  className="text-cyan-600"
                  size={22}
                />

                <div>

                  <h4 className="font-semibold text-slate-900">
                    Phone
                  </h4>

                  <p className="text-slate-600">
                    +91 XXXXX XXXXX
                  </p>

                </div>

              </div>

              {/* Email */}

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">

                <Mail
                  className="text-cyan-600"
                  size={22}
                />

                <div>

                  <h4 className="font-semibold text-slate-900">
                    Email
                  </h4>

                  <p className="text-slate-600">
                    info@creativetech.com
                  </p>

                </div>

              </div>

              {/* Office Hours */}

              {/* <div className="flex gap-4 rounded-2xl bg-slate-50 p-5">

                <Clock3
                  className="text-cyan-600"
                  size={22}
                />

                <div>

                  <h4 className="font-semibold text-slate-900">
                    Working Hours
                  </h4>

                  <p className="text-slate-600">

                    Monday - Friday
                    <br />

                    9:00 AM - 6:00 PM

                  </p>

                </div>

              </div> */}

            </div>

            {/* Google Map */}

            <div className="mt-5 overflow-hidden rounded-xl shadow-lg">

              <iframe
                title="Creative Technology Office"
                src="https://maps.google.com/maps?q=Plot%20No.%2040%2FC%2C%20Mancheswar%20Industrial%20Estate%2C%20Zone-D%20Sector-A%2C%20Mancheswar%2C%20Bhubaneswar%2C%20Odisha%20751010&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-42 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

            {/* Button */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+No.+40/C,+Mancheswar+Industrial+Estate,+Zone-D+Sector-A,+Mancheswar,+Bhubaneswar,+Odisha+751010"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-300/50"
            >

              <Navigation size={20} />

              Get Directions

            </a>

          </motion.div>

        </div>

      </div>

    </section>
  );
}