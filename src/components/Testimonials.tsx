import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Send, Loader2, MessageSquareQuote } from "lucide-react";

import {
  getHomePageContent,
  submitTestimonial,
  type HomeTestimonialsSection,
} from "../api/api";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

const initialForm = {
  name: "",
  designation: "",
  company: "",
  review: "",
  rating: 5,
};

export default function Testimonials() {
  const [section, setSection] = useState<HomeTestimonialsSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTestimonials() {
      try {
        const content = await getHomePageContent();
        if (!cancelled) setSection(content.testimonials_section ?? null);
      } catch (error) {
        console.error("Failed to load homepage testimonials:", error);
        if (!cancelled) setSection(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  const testimonials = (section?.testimonials ?? []).filter(
    (testimonial) => testimonial.is_active,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionError("");
    setSubmissionMessage("");

    try {
      const result = await submitTestimonial({ ...form, photo });
      setSubmissionMessage(result.detail);
      setForm(initialForm);
      setPhoto(null);
      setFileInputKey((value) => value + 1);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to submit your testimonial. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    setSubmissionError("");
    const selected = event.target.files?.[0] ?? null;

    if (!selected) {
      setPhoto(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(selected.type)) {
      setSubmissionError("Please choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      setPhoto(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setSubmissionError("Your photo must be 5 MB or smaller.");
      event.target.value = "";
      setPhoto(null);
      return;
    }

    setPhoto(selected);
  }

  if (isLoading || !section || !section.is_active) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
            {section.eyebrow}
          </span>
          <h2 className="mt-5 text-4xl font-bold text-slate-900 sm:text-5xl">
            {section.title}
          </h2>
          {section.description && (
            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
              {section.description}
            </p>
          )}
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-cyan-300 hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute right-6 top-6 opacity-10 transition group-hover:opacity-20">
                  <Quote size={70} className="text-cyan-600" aria-hidden="true" />
                </div>
                <div aria-label={`${item.rating} out of 5 stars`} title={`${item.rating} out of 5 stars`} className="flex gap-1">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={18}
                      aria-hidden="true"
                      className={starIndex < item.rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}
                    />
                  ))}
                </div>
                <p className="relative mt-6 flex-1 whitespace-pre-line leading-8 text-slate-600 italic">
                  “{item.review}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  {item.photo_url ? (
                    <img
                      src={item.photo_url}
                      alt={`${item.name} profile`}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-cyan-100"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white ring-4 ring-cyan-100">
                      {getInitials(item.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    {item.designation && <p className="text-sm text-slate-500">{item.designation}</p>}
                    {item.company && <p className="text-sm font-semibold text-cyan-600">{item.company}</p>}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
            There are no published testimonials yet. Have worked with us? Share your experience below.
          </div>
        )}

        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-cyan-100 p-3 text-cyan-700">
                <MessageSquareQuote size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Share Your Experience</h3>
                <p className="mt-1 text-sm text-slate-600">Tell others about your experience with Kreative Technology.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsFormOpen((open) => !open);
                setSubmissionError("");
                setSubmissionMessage("");
              }}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:brightness-110"
            >
              {isFormOpen ? "Close Form" : "Write a Testimonial"}
            </button>
          </div>

          {submissionMessage && (
            <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              {submissionMessage}
            </div>
          )}
          {submissionError && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {submissionError}
            </div>
          )}

          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mt-7 space-y-5 border-t border-slate-200 pt-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Full name <span className="text-red-500">*</span>
                  <input
                    required
                    maxLength={150}
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your name"
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Designation
                  <input
                    maxLength={150}
                    value={form.designation}
                    onChange={(event) => setForm({ ...form, designation: event.target.value })}
                    placeholder="e.g. Project Manager"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  Company
                  <input
                    maxLength={150}
                    value={form.company}
                    onChange={(event) => setForm({ ...form, company: event.target.value })}
                    placeholder="Company or organization"
                    autoComplete="organization"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-slate-700">Your rating <span className="text-red-500">*</span></legend>
                <div className="mt-2 flex items-center gap-2" role="radiogroup" aria-label="Choose a rating from 1 to 5 stars">
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={form.rating === value}
                        aria-label={`${value} star${value > 1 ? "s" : ""}`}
                        onClick={() => setForm({ ...form, rating: value })}
                        className="cursor-pointer rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <Star size={28} className={value <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"} />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-sm text-slate-500">{form.rating} out of 5</span>
                </div>
              </fieldset>

              <label className="block text-sm font-medium text-slate-700">
                Your review <span className="text-red-500">*</span>
                <textarea
                  required
                  minLength={20}
                  maxLength={3000}
                  rows={5}
                  value={form.review}
                  onChange={(event) => setForm({ ...form, review: event.target.value })}
                  placeholder="Share your experience (at least 20 characters)"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <span className="mt-1 block text-right text-xs text-slate-500">{form.review.length}/3000</span>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Profile photo (optional)
                <input
                  key={fileInputKey}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="mt-2 block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-cyan-50 file:px-4 file:py-3 file:font-semibold file:text-cyan-700 hover:file:bg-cyan-100"
                />
                <span className="mt-1 block text-xs text-slate-500">JPG, PNG, or WebP. Maximum 5 MB.</span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </button>
              <p className="text-xs leading-5 text-slate-500">
                Submissions are reviewed by our team before they appear publicly on the website.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
