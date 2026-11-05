
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import officeLocationImage from "../../assets/officeImg.webp";

import {
  MapPin,
  Navigation,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

import {
  getContactOfficeLocation,
  type ContactOfficeLocationSection,
} from "../../api/api";

// ============================================================
// CONTACT OFFICE LOCATION COMPONENT
// ============================================================

export default function OfficeLocation() {
  const [section, setSection] =
    useState<ContactOfficeLocationSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH OFFICE LOCATION FROM DJANGO
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchOfficeLocation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getContactOfficeLocation();

        if (isMounted) {
          setSection(response);
        }
      } catch (err) {
        console.error(
          "Failed to load Contact Office Location:",
          err
        );

        if (isMounted) {
          setError("Unable to load office location information.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOfficeLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-slate-500">
            Loading office location...
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
      <section className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-slate-500">
            {error || "Office location is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // DYNAMIC IMAGE
  // ============================================================

  const officeImage = section.image_url || officeLocationImage;

  // ============================================================
  // DYNAMIC GOOGLE MAP URLS
  // ============================================================

  const mapEmbedUrl =
    section.map_embed_url ||
    `https://maps.google.com/maps?q=${encodeURIComponent(
      section.address
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl =
    section.directions_url ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      section.address
    )}`;

  // ============================================================
  // MAIN OFFICE LOCATION SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-white py-16">

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-[120px]" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ====================================================
            DYNAMIC HEADING
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            {section.eyebrow}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            {section.title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {section.description}
          </p>
        </motion.div>

        {/* ====================================================
            OFFICE CONTENT GRID
        ==================================================== */}

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ==================================================
              LEFT SIDE - OFFICE IMAGE
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={officeImage}
              alt={section.image_alt}
              loading="lazy"
              className="h-[620px] w-full object-cover transition duration-700 hover:scale-105"
            />
          </motion.div>

          {/* ==================================================
              RIGHT SIDE - OFFICE INFORMATION
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-2xl backdrop-blur-xl"
          >

            {/* =================================================
                COMPANY INFORMATION
            ================================================= */}

            <div className="flex items-center gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white shadow-lg">
                <Building2 size={34} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {section.company_name}
                </h3>

                <p className="text-slate-500">
                  {section.office_type}
                </p>
              </div>

            </div>

            {/* =================================================
                CONTACT INFORMATION CARDS
            ================================================= */}

            <div className="mt-4 space-y-2">

              {/* OFFICE ADDRESS */}

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">

                <MapPin
                  className="mt-1 shrink-0 text-cyan-600"
                  size={24}
                />

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Office Address
                  </h4>

                  <p className="mt-2 whitespace-pre-line leading-7 text-slate-600">
                    {section.address}
                  </p>
                </div>

              </div>

              {/* PHONE */}

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">

                <Phone
                  className="shrink-0 text-cyan-600"
                  size={22}
                />

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Phone
                  </h4>

                  <a
                    href={`tel:${section.phone.replace(/[^\d+]/g, "")}`}
                    className="text-slate-600 transition hover:text-cyan-600"
                  >
                    {section.phone}
                  </a>
                </div>

              </div>

              {/* EMAIL */}

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">

                <Mail
                  className="shrink-0 text-cyan-600"
                  size={22}
                />

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Email
                  </h4>

                  <a
                    href={`mailto:${section.email}`}
                    className="break-all text-slate-600 transition hover:text-cyan-600"
                  >
                    {section.email}
                  </a>
                </div>

              </div>

            </div>

            {/* =================================================
                GOOGLE MAP
            ================================================= */}

            <div className="mt-5 overflow-hidden rounded-xl shadow-lg">

              <iframe
                title={`${section.company_name} Office Location`}
                src={mapEmbedUrl}
                className="h-[168px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

            {/* =================================================
                GET DIRECTIONS BUTTON
            ================================================= */}

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-300/50"
            >
              <Navigation size={20} />

              {section.directions_button_text}
            </a>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
