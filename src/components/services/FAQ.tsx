
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import {
  getServicesFAQ,
  type ServicesFAQSection,
} from "../../api/api";

// ============================================================
// FAQ COMPONENT
// ============================================================

export default function FAQ() {
  const [section, setSection] =
    useState<ServicesFAQSection | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // ============================================================
  // FETCH FAQ CONTENT FROM DJANGO
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServicesFAQ();

        if (isMounted) {
          setSection(response);
        }
      } catch (err) {
        console.error("Failed to load Services FAQs:", err);

        if (isMounted) {
          setError("Unable to load FAQ content.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFAQs();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ACTIVE FAQS IN DISPLAY ORDER
  // ============================================================

  const faqs = useMemo(
    () =>
      section?.faqs
        ?.filter((faq) => faq.is_active)
        .sort(
          (a, b) => a.display_order - b.display_order
        ) || [],
    [section]
  );

  // ============================================================
  // OPEN FIRST FAQ BY DEFAULT
  // ============================================================

  useEffect(() => {
    if (faqs.length === 0) {
      setOpenFaqId(null);
      return;
    }

    setOpenFaqId((currentId) => {
      // Preserve the currently open FAQ if it is still active.
      if (
        currentId !== null &&
        faqs.some((faq) => faq.id === currentId)
      ) {
        return currentId;
      }

      // Otherwise open the first active FAQ.
      return faqs[0].id;
    });
  }, [faqs]);

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-slate-500">
            Loading FAQs...
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
      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-slate-500">
            {error || "FAQ content is currently unavailable."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN FAQ SECTION
  // ============================================================

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* ====================================================
            DYNAMIC HEADING
        ==================================================== */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            {section.eyebrow}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            {section.title}
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            {section.description}
          </p>

        </div>

        {/* ====================================================
            DYNAMIC FAQ ACCORDION
        ==================================================== */}

        {faqs.length > 0 ? (
          <div className="space-y-5">

            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  layout
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
                >

                  {/* Question Button */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() =>
                      setOpenFaqId(
                        isOpen ? null : faq.id
                      )
                    }
                    className="flex w-full items-center justify-between px-7 py-6 text-left"
                  >

                    <span className="text-lg font-semibold text-slate-900">
                      {faq.question}
                    </span>

                    {/* Plus / Minus Icon */}
                    <div className="ml-4 shrink-0 rounded-full bg-slate-100 p-2">

                      {isOpen ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}

                    </div>

                  </button>

                  {/* Animated Answer */}
                  <AnimatePresence initial={false}>

                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        key={`answer-${faq.id}`}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >

                        <div className="px-7 pb-7 leading-7 text-slate-600">
                          {faq.answer}
                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </motion.div>
              );
            })}

          </div>
        ) : (
          <p className="py-8 text-center text-slate-500">
            No frequently asked questions are currently available.
          </p>
        )}

      </div>
    </section>
  );
}
