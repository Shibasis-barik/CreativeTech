import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpeg";
import ThemeToggle from "./ThemeToggle";

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
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
      scrolled
      ? "bg-white/80 backdrop-blur-xl shadow-xl border-b border-slate-200 py-2 dark:bg-slate-950/80 dark:border-slate-700"
      : "bg-white/75 backdrop-blur-xl border-b border-slate-200 py-3 dark:bg-slate-900/40 dark:border-white/10"
    }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-white/95 p-2 shadow-xl"
          >
            <img
              src={logo}
              alt="Kreative Technology"
              className="h-8 w-auto"
            />
          </motion.div>

          <div>
            <h2
              className={`text-xl font-bold transition ${
                "text-slate-900 dark:text-white"
              }`}
            >
              Kreative Technology
            </h2>

            <p
              className={`text-xs ${
                "text-slate-500 dark:text-slate-200"
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
                  ? "text-slate-800 hover:text-cyan-600 dark:text-slate-100"
                  : "text-slate-800 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
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

          <ThemeToggle />

          {/* CTA Button */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-cyan-400/40"
            >
              Log In
              <ArrowRight size={18} />
            </Link>
          </motion.div>

        </div>

        {/* Mobile */}

        <button
          className={`md:hidden ${
            "text-slate-900 dark:text-white"
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
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200 mt-4 dark:bg-slate-950/95 dark:border-slate-700"
          >

            <div className="flex flex-col px-6 py-6 gap-5">

              {navLinks.map((item) => (
                <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
    `group relative font-medium transition duration-300 ${
      scrolled
        ? "text-slate-700 hover:text-cyan-600 dark:text-slate-100"
        : "text-slate-700 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
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

              <div className="flex items-center justify-between">
                <ThemeToggle />
                <Link
                to="/login"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg"
              >
                Login
              </Link>
              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  );
}
