import { useEffect, useState } from "react";
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

import {
  createMessage,
  getPublicServices,
  type Service,
} from "../../api/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getPublicServices();
        setServices(data);
      } catch (err) {
        console.error("Unable to load services:", err);
      } finally {
        setLoadingServices(false);
      }
    };

    loadServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear old messages while user is editing.
    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Validation
    if (!formData.full_name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.service) {
      setError("Please select a service.");
      return;
    }

    if (!formData.budget) {
      setError("Please select an estimated budget.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your project details.");
      return;
    }

    try {
      setSubmitting(true);

      await createMessage({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        budget: formData.budget,
        message: formData.message.trim(),
      });

      setSuccess(
        "Thank you! Your message has been sent successfully. Our team will contact you soon.",
      );

      // Reset form after successful submission.
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Glow */}

      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
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

                  <p className="font-medium text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Success Message */}

            {success && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}

            {/* Error Message */}

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
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
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    autoComplete="name"
                    disabled={submitting}
                    required
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    autoComplete="email"
                    disabled={submitting}
                    required
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
                  />
                </div>

                {/* Phone */}

                <div className="relative">
                  <Phone
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    autoComplete="tel"
                    disabled={submitting}
                    required
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
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
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    autoComplete="organization"
                    disabled={submitting}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
                  />
                </div>
              </div>

              {/* Service */}

              <div className="relative mt-6">
                <Briefcase
                  className="absolute left-4 top-4 z-10 text-slate-400"
                  size={20}
                />

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={loadingServices || submitting}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
                >
                  <option value="">
                    {loadingServices
                      ? "Loading Services..."
                      : "Select Service"}
                  </option>

                  {services.map((service) => (
                    <option
                      key={service.id}
                      value={service.name}
                    >
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}

              <div className="relative mt-6">
                <IndianRupee
                  className="absolute left-4 top-4 z-10 text-slate-400"
                  size={20}
                />

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
                >
                  <option value="">
                    Estimated Budget
                  </option>

                  <option value="Below ₹50K">
                    Below ₹50K
                  </option>

                  <option value="₹50K - ₹2L">
                    ₹50K - ₹2L
                  </option>

                  <option value="₹2L - ₹10L">
                    ₹2L - ₹10L
                  </option>

                  <option value="Above ₹10L">
                    Above ₹10L
                  </option>
                </select>
              </div>

              {/* Message */}

              <div className="relative mt-6">
                <MessageSquare
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your project..."
                  disabled={submitting}
                  required
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"
                ></textarea>
              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={submitting || loadingServices}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />

                {submitting
                  ? "Sending..."
                  : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}