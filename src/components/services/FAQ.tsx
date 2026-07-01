import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer:
      "We work with Healthcare, Banking, Education, Retail, Manufacturing, Government, Logistics and Enterprise businesses.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "Our team specializes in React, Next.js, Django, Python, Node.js, TypeScript, AWS, Azure, Docker, Kubernetes, MySQL and PostgreSQL.",
  },
  {
    question: "How long does a software project take?",
    answer:
      "Depending on the complexity, projects typically range from 4 weeks to several months. We provide a detailed roadmap before development starts.",
  },
  {
    question: "Do you provide maintenance after deployment?",
    answer:
      "Yes. We offer continuous monitoring, maintenance, feature enhancements and technical support after project delivery.",
  },
  {
    question: "Can you work with our existing development team?",
    answer:
      "Absolutely. We can collaborate with your internal team or provide dedicated developers to accelerate your project.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}

      <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            FAQ
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Everything you need to know about our services.
          </p>

        </div>

        {/* Accordion */}

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <motion.div
              key={faq.question}
              layout
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between px-7 py-6 text-left"
              >

                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>

                <div className="rounded-full bg-slate-100 p-2">

                  {open === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}

                </div>

              </button>

              <AnimatePresence>

                {open === index && (

                  <motion.div
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

                    <div className="px-7 pb-7 text-slate-600 leading-7">

                      {faq.answer}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}