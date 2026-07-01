import { motion } from "framer-motion";
import {
  Clock3,
  CalendarDays,
  Headset,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

const schedule = [
  {
    day: "Monday - Friday",
    time: "9:00 AM - 6:00 PM",
    active: true,
  },
  {
    day: "Saturday",
    time: "10:00 AM - 3:00 PM",
    active: true,
  },
  {
    day: "Sunday",
    time: "Closed",
    active: false,
  },
];

const support = [
  {
    icon: Headset,
    title: "Technical Support",
    value: "24/7 Priority Support",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    value: "Mon - Sat",
    color: "from-emerald-500 to-green-600",
  },
];

export default function BusinessHours() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">

      {/* Background */}

      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            BUSINESS HOURS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            We're Available To Help
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Reach out during business hours or contact our support team
            for urgent assistance.
          </p>

        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Schedule */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >

            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white">

                <CalendarDays size={28} />

              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Office Schedule
              </h3>

            </div>

            <div className="space-y-5">

              {schedule.map((item) => (

                <div
                  key={item.day}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-5"
                >

                  <div className="flex items-center gap-3">

                    <Clock3 className="text-cyan-600" size={20} />

                    <span className="font-semibold text-slate-800">
                      {item.day}
                    </span>

                  </div>

                  <span
                    className={`font-medium ${
                      item.active
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.time}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Support */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >

            <h3 className="mb-8 text-2xl font-bold text-slate-900">
              Customer Support
            </h3>

            <div className="space-y-6">

              {support.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.title}
                    className="flex items-center gap-5 rounded-2xl border border-slate-200 p-5 transition hover:shadow-lg"
                  >

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white`}
                    >
                      <Icon size={24} />
                    </div>

                    <div>

                      <h4 className="font-semibold text-slate-900">
                        {item.title}
                      </h4>

                      <p className="text-slate-600">
                        {item.value}
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

            {/* Extra Features */}

            <div className="mt-10 rounded-2xl bg-slate-100 p-6">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-500" />

                <span className="font-semibold">
                  Average Response Time
                </span>

              </div>

              <p className="mt-3 text-slate-600">
                Less than <strong>2 Hours</strong> during
                business hours.
              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}