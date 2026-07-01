import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-xl border-b border-white/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <motion.div
            whileHover={{ rotate: 10, scale: 1.08 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"
          >
            CT
          </motion.div>

          <div>
            <h2
              className={`text-xl font-bold transition ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Creative Technology
            </h2>

            <p
              className={`text-xs ${
                scrolled ? "text-slate-500" : "text-slate-300"
              }`}
            >
              Software • Cloud • AI
            </p>
          </div>

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium transition duration-300 ${
                  scrolled
                    ? "text-slate-700 hover:text-cyan-600"
                    : "text-white hover:text-cyan-300"
                } ${isActive ? "text-cyan-500" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {/* CTA Button */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-cyan-400/40"
          >
            Sign Up
            <ArrowRight size={18} />
          </motion.button>

        </div>

        {/* Mobile */}

        <button
          className={`md:hidden ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200 mt-4"
          >

            <div className="flex flex-col px-6 py-6 gap-5">

              {navLinks.map((item) => (
                <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
    `group relative font-medium transition duration-300 ${
      scrolled
        ? "text-slate-700 hover:text-cyan-600"
        : "text-white hover:text-cyan-300"
    } ${isActive ? "text-cyan-500" : ""}`
  }
>
  {({ isActive }) => (
    <>
      {item.name}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-500 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </>
  )}
</NavLink>
              ))}

              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold">
                Sign Up
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  );
}