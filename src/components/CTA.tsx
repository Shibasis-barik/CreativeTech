import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  X,
  Send,
  Loader2,
} from "lucide-react";
import BookMeetingModal from "./BookMeetingModal";
import { createMessage } from "../api/api";

type QuoteForm = {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const initialForm: QuoteForm = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const services = [
  "Web Development",
  "Software Development",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Mobile App Development",
  "IT Consulting",
  "Other",
];

const budgets = [
  "Under ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹3,00,000",
  "₹3,00,000 - ₹5,00,000",
  "Above ₹5,00,000",
  "Not decided yet",
];

export default function CTA() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [form, setForm] = useState<QuoteForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  useEffect(() => {
    if (!isQuoteOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        setIsQuoteOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isQuoteOpen, isSubmitting]);

  const openQuoteModal = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsQuoteOpen(true);
  };

  const closeQuoteModal = () => {
    if (isSubmitting) return;

    setIsQuoteOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const updateField = (
    field: keyof QuoteForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createMessage(form);

      setSuccessMessage(
        "Thank you! Your quote request has been submitted successfully. Our team will contact you soon.",
      );
      setForm(initialForm);
    } catch (error) {
      console.error("Quote submission failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-14 dark:bg-none">
        {/* Background */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-900 dark:block"></div>

        {/* Glow */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:shadow-2xl lg:p-16"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* Left */}
              <div>
                <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  LET'S BUILD TOGETHER
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 dark:text-white lg:text-6xl">
                  Ready to Transform
                  <span className="text-cyan-400"> Your Business?</span>
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                  We help startups and enterprises build scalable software,
                  cloud infrastructure, AI-powered applications, networking,
                  and digital transformation solutions.
                </p>

                {/* Trust Points */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    "Free Consultation",
                    "Fast Delivery",
                    "24/7 Support",
                    "Secure Solutions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-slate-700 dark:text-white"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-cyan-400"
                      />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-100/80 p-8 backdrop-blur-lg dark:bg-white/10">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">
                    <Phone size={34} className="text-white" />
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                    Start Your Project
                  </h3>

                  <p className="mt-4 text-slate-600 dark:text-slate-300">
                    Schedule a free consultation with our experts today.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex w-full flex-col gap-4">
                  <button
                    type="button"
                    onClick={openQuoteModal}
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Get Free Quote
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMeetingOpen(true)}
                    className="rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                  >
                    Book a Meeting
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get Free Quote Modal */}
      {isQuoteOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeQuoteModal();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/95">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                  Free Consultation
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  Get a Free Quote
                </h2>
              </div>

              <button
                type="button"
                onClick={closeQuoteModal}
                disabled={isSubmitting}
                aria-label="Close quote form"
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {successMessage ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                    <CheckCircle2
                      size={42}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Request Submitted!
                  </h3>

                  <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
                    {successMessage}
                  </p>

                  <button
                    type="button"
                    onClick={closeQuoteModal}
                    className="mt-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="quote-full-name"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="quote-full-name"
                        type="text"
                        required
                        value={form.full_name}
                        onChange={(event) =>
                          updateField("full_name", event.target.value)
                        }
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quote-email"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quote-phone"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quote-company"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Company Name
                      </label>
                      <input
                        id="quote-company"
                        type="text"
                        value={form.company}
                        onChange={(event) =>
                          updateField("company", event.target.value)
                        }
                        placeholder="Company name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quote-service"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="quote-service"
                        required
                        value={form.service}
                        onChange={(event) =>
                          updateField("service", event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-budget"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Estimated Budget
                      </label>
                      <select
                        id="quote-budget"
                        value={form.budget}
                        onChange={(event) =>
                          updateField("budget", event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="">Select a budget</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-message"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Project Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="quote-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Tell us about your project, goals, timeline, and requirements..."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeQuoteModal}
                      disabled={isSubmitting}
                      className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
      <BookMeetingModal
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
      />
    </>
  );
}
