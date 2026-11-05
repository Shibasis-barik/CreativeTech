import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function YouTubeLoadingBar() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoading = (event: Event) => {
      const customEvent =
        event as CustomEvent<{ loading: boolean }>;

      setLoading(Boolean(customEvent.detail?.loading));
    };

    window.addEventListener(
      "kt:api-loading",
      handleLoading
    );

    return () => {
      window.removeEventListener(
        "kt:api-loading",
        handleLoading
      );
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed left-0 right-0 top-0 z-[10000] h-[3px] overflow-hidden bg-white/10"
        >
          <motion.div
            className="h-full w-[32%] bg-[#FF0033] shadow-[0_0_12px_rgba(255,0,51,0.7)]"
            initial={{ x: "-110%" }}
            animate={{ x: "350%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}