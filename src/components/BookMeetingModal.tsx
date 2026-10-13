import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  Video,
  X,
  Building2,
} from "lucide-react";

import {
  createMeetingBooking,
  getMeetingAvailability,
  type MeetingPlatform,
  type MeetingSlot,
} from "../api/api";

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingForm {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
}

const initialForm: BookingForm = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  topic: "",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export default function BookMeetingModal({
  isOpen,
  onClose,
}: BookMeetingModalProps) {
  const [slots, setSlots] = useState<MeetingSlot[]>([]);
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(
    null,
  );
  const [selectedPlatformId, setSelectedPlatformId] = useState<
    number | null
  >(null);

  const [form, setForm] = useState<BookingForm>(initialForm);

  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successBooking, setSuccessBooking] = useState<{
    id: number;
    slot: MeetingSlot;
    platform: MeetingPlatform;
    meetingLink: string;
    calendarEventUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadAvailability = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessBooking(null);

      try {
        const data = await getMeetingAvailability();

        const availableSlots = data.slots.filter(
          (slot) => !slot.is_booked,
        );

        setSlots(availableSlots);
        setTimezone(data.timezone);

        const dates = [...new Set(
          availableSlots.map((slot) => slot.date),
        )].sort();

        const firstDate = dates[0] ?? "";

        setSelectedDate(firstDate);

        const firstSlot = availableSlots.find(
          (slot) => slot.date === firstDate,
        );

        setSelectedSlotId(firstSlot?.id ?? null);

        setSelectedPlatformId(
          firstSlot?.platforms[0]?.id ?? null,
        );
      } catch (error) {
        console.error(
          "Failed to load meeting availability:",
          error,
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load meeting availability.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailability();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const availableDates = useMemo(() => {
    return [...new Set(
      slots.map((slot) => slot.date),
    )].sort();
  }, [slots]);

  const selectedDateSlots = useMemo(() => {
    return slots.filter(
      (slot) => slot.date === selectedDate,
    );
  }, [slots, selectedDate]);

  const selectedSlot =
    selectedDateSlots.find(
      (slot) => slot.id === selectedSlotId,
    ) ?? null;

  const selectedPlatform =
    selectedSlot?.platforms.find(
      (platform) =>
        platform.id === selectedPlatformId,
    ) ?? null;

  const updateForm = (
    field: keyof BookingForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);

    const firstSlot = slots.find(
      (slot) => slot.date === date,
    );

    setSelectedSlotId(firstSlot?.id ?? null);

    setSelectedPlatformId(
      firstSlot?.platforms[0]?.id ?? null,
    );

    setErrorMessage("");
  };

  const selectSlot = (slot: MeetingSlot) => {
    setSelectedSlotId(slot.id);

    setSelectedPlatformId(
      slot.platforms[0]?.id ?? null,
    );

    setErrorMessage("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!selectedSlot || !selectedPlatform) {
      setErrorMessage(
        "Please select a date, time and meeting platform.",
      );
      return;
    }

    setIsBooking(true);
    setErrorMessage("");

    try {
      const booking = (await createMeetingBooking({
        slot: selectedSlot.id,
        platform: selectedPlatform.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        topic: form.topic,
      })) as Awaited<ReturnType<typeof createMeetingBooking>> & {
        meeting_link?: string | null;
        calendar_event_url?: string | null;
        google_event_id?: string | null;
      };

      setSuccessBooking({
        id: booking.id,
        slot: selectedSlot,
        platform: selectedPlatform,
        meetingLink: booking.meeting_link ?? "",
        calendarEventUrl: booking.calendar_event_url ?? "",
      });

      setForm(initialForm);
    } catch (error) {
      console.error(
        "Meeting booking failed:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to book this meeting.",
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isBooking
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
      >
        {/* Header */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-slate-900/95">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <CalendarDays size={18} />

              <span className="text-sm font-semibold uppercase tracking-wide">
                Free Consultation
              </span>
            </div>

            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Book a Meeting
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Select a date, time and meeting platform.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isBooking}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 sm:p-8">

          {/* Success */}

          {successBooking ? (
            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2
                  size={44}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                Meeting Booked!
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Your meeting has been confirmed.
              </p>

              <div className="mt-7 w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left dark:border-white/10 dark:bg-white/5">

                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={20}
                    className="text-cyan-600"
                  />

                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatLongDate(
                      successBooking.slot.date,
                    )}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Clock3
                    size={20}
                    className="text-cyan-600"
                  />

                  <span className="text-slate-700 dark:text-slate-200">
                    {formatTime(
                      successBooking.slot.start_time,
                    )}{" "}
                    –{" "}
                    {formatTime(
                      successBooking.slot.end_time,
                    )}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Video
                    size={20}
                    className="text-cyan-600"
                  />

                  <span className="text-slate-700 dark:text-slate-200">
                    {successBooking.platform.name}
                  </span>
                </div>

                <p className="mt-5 text-xs text-slate-500">
                  Booking ID: #{successBooking.id}
                  {" · "}
                  Timezone: {timezone}
                </p>
              </div>

              {successBooking.meetingLink ? (
                <a
                  href={successBooking.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <Video size={18} />
                  Join {successBooking.platform.name}
                </a>
              ) : (
                <p className="mt-5 max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  Your booking has been saved, but the API did not return a meeting link. Please check the booking API response or contact us before the meeting.
                </p>
              )}

              {successBooking.calendarEventUrl && (
                <a
                  href={successBooking.calendarEventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  <CalendarDays size={16} />
                  View Calendar Event
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 font-semibold text-white"
              >
                Done
              </button>
            </div>
          ) : isLoading ? (

            /* Loading */

            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

              <Loader2
                size={42}
                className="animate-spin text-cyan-500"
              />

              <p className="mt-4 font-semibold text-slate-900 dark:text-white">
                Loading available meetings...
              </p>

            </div>

          ) : slots.length === 0 ? (

            /* No slots */

            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

              <CalendarDays
                size={48}
                className="text-slate-400"
              />

              <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                No meetings available
              </h3>

              <p className="mt-2 max-w-md text-slate-500">
                There are currently no available meeting slots.
              </p>

              {errorMessage && (
                <p className="mt-4 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-7 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
              >
                Close
              </button>
            </div>

          ) : (

            /* Scheduler */

            <form
              onSubmit={handleSubmit}
              className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div>

                {/* DATE */}

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  1. Select a date
                </h3>

                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {availableDates.map((date) => {
                    const active =
                      date === selectedDate;

                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() =>
                          selectDate(date)
                        }
                        className={`min-w-[130px] cursor-pointer pointer-events-auto rounded-2xl border px-4 py-3 text-left transition ${
                          active
                            ? "border-cyan-500 bg-cyan-50 !text-slate-900 shadow-md dark:bg-cyan-500/10 dark:!text-white"
                            : "border-slate-200 bg-white !text-slate-900 hover:border-cyan-300 dark:border-white/10 dark:bg-white/5 dark:!text-white"
                        }`}
                      >
                        <div
                          className={`text-xs font-semibold ${
                            active
                              ? "!text-cyan-700 dark:!text-cyan-300"
                              : "!text-slate-500 dark:!text-slate-400"
                          }`}
                        >
                          {formatDate(date)}
                        </div>

                        <div className="mt-1 text-sm font-bold !text-slate-900 dark:!text-white">
                          {date}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* TIME */}

                <h3 className="mt-8 text-lg font-bold text-slate-900 dark:text-white">
                  2. Select a time
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {selectedDateSlots.map((slot) => {
                    const active =
                      slot.id === selectedSlotId;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() =>
                          selectSlot(slot)
                        }
                        className={`cursor-pointer pointer-events-auto rounded-2xl border p-4 text-left transition ${
                        active
                            ? "border-cyan-500 bg-cyan-50 text-slate-900 shadow-md dark:bg-cyan-500/10 dark:text-white"
                            : "border-slate-200 bg-white text-slate-900 hover:border-cyan-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold !text-slate-900 dark:!text-white">
                          <Clock3
                            size={17}
                            className="text-cyan-600"
                          />

                          {formatTime(
                            slot.start_time,
                          )}{" "}
                          –{" "}
                          {formatTime(
                            slot.end_time,
                          )}
                        </div>

                        {slot.notes && (
                          <p className="mt-2 text-xs !text-slate-500 dark:!text-slate-400">
                            {slot.notes}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* PLATFORM */}

                <h3 className="mt-8 text-lg font-bold text-slate-900 dark:text-white">
                  3. Select a platform
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {(selectedSlot?.platforms ?? []).map(
                    (platform) => {
                      const active =
                        platform.id ===
                        selectedPlatformId;

                      return (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() =>
                            setSelectedPlatformId(
                              platform.id,
                            )
                          }
                          className={`cursor-pointer pointer-events-auto rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-cyan-500 bg-cyan-50 !text-slate-900 shadow-md dark:bg-cyan-500/10 dark:!text-white"
                              : "border-slate-200 bg-white !text-slate-900 hover:border-cyan-300 dark:border-white/10 dark:bg-white/5 dark:!text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold !text-slate-900 dark:!text-white">
                            <Video
                              size={17}
                              className="text-cyan-600"
                            />

                            {platform.name}
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* DETAILS */}

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

                <h3 className="text-lg font-bold text-slate-900">
                  4. Your details
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  We'll use these details for your meeting confirmation.
                </p>

                <div className="mt-5 space-y-4">

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Full Name *
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        required
                        type="text"
                        value={form.full_name}
                        onChange={(event) =>
                          updateForm(
                            "full_name",
                            event.target.value,
                          )
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Email *
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          updateForm(
                            "email",
                            event.target.value,
                          )
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Phone
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateForm(
                            "phone",
                            event.target.value,
                          )
                        }
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Company
                    </label>

                    <div className="relative">
                      <Building2
                        size={17}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        type="text"
                        value={form.company}
                        onChange={(event) =>
                          updateForm(
                            "company",
                            event.target.value,
                          )
                        }
                        placeholder="Company name"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Meeting Topic *
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={17}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        required
                        type="text"
                        value={form.topic}
                        onChange={(event) =>
                          updateForm(
                            "topic",
                            event.target.value,
                          )
                        }
                        placeholder="What would you like to discuss?"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                </div>

                {selectedSlot && selectedPlatform && (
                  <div className="mt-5 rounded-2xl bg-white p-4">

                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">
                      Selected meeting
                    </p>

                    <p className="mt-2 text-sm font-bold text-slate-900">
                      {formatDate(
                        selectedSlot.date,
                      )}{" "}
                      ·{" "}
                      {formatTime(
                        selectedSlot.start_time,
                      )}{" "}
                      –{" "}
                      {formatTime(
                        selectedSlot.end_time,
                      )}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {selectedPlatform.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {timezone}
                    </p>
                  </div>
                )}

                {errorMessage && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    isBooking ||
                    !selectedSlot ||
                    !selectedPlatform
                  }
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isBooking ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Booking...
                    </>
                  ) : (
                    <>
                      Confirm Meeting
                      <CalendarDays size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}