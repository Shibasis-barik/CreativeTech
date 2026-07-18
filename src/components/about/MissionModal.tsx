import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface MissionModalData {
  title: string;
  description: string;
  image: string;
  color: string;
}

interface MissionModalProps {
  data: MissionModalData | null;
  onClose: () => void;
}

export default function MissionModal({ data, onClose }: MissionModalProps) {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/20 bg-white shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
              <img
                src={data.image}
                alt={data.title}
                className="h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent`}
              />
              <div
                className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${data.color}`}
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {data.title}
              </h3>
              <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
                {data.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}