import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="
      relative
      rounded-[34px]
      border
      border-cyan-400/30
      bg-[#0F1724]/85
      p-10
      backdrop-blur-3xl
      shadow-[0_0_80px_rgba(0,180,255,.25)]
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 rounded-[34px] border border-cyan-400/20 pointer-events-none" />

      {/* Logo */}

      <div className="mb-8 flex flex-col items-center">

        {/* <img
          src={logo}
          alt="Logo"
          className="h-16 w-auto"
        /> */}

        <h3 className="mt-4 text-4xl font-bold text-white">
          Sign In
        </h3>

        <p className="mt-2 text-center text-slate-400">
          Login to your Kreative Technology account
        </p>

      </div>

      <form className="space-y-6">

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <div
            className="
            flex
            items-center
            rounded-2xl
            border
            border-cyan-400/20
            bg-[#111827]
            px-5
            transition
            focus-within:border-cyan-400
            focus-within:shadow-[0_0_20px_rgba(6,182,212,.35)]
            "
          >
            <Mail className="text-slate-400" size={20} />

            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />
          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <div
            className="
            flex
            items-center
            rounded-2xl
            border
            border-cyan-400/20
            bg-[#111827]
            px-5
            transition
            focus-within:border-cyan-400
            focus-within:shadow-[0_0_20px_rgba(6,182,212,.35)]
            "
          >
            <Lock className="text-slate-400" size={20} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-slate-400" size={20} />
              ) : (
                <Eye className="text-slate-400" size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="flex items-center justify-between text-sm">

          <label className="flex items-center gap-2 text-slate-300">

            <input
              type="checkbox"
              className="accent-cyan-500"
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}

        <button
          className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-cyan-400
          via-sky-500
          to-blue-600
          py-4
          text-lg
          font-semibold
          text-white
          shadow-[0_0_30px_rgba(59,130,246,.45)]
          transition
          hover:scale-[1.02]
          "
        >
          Sign In

          <ArrowRight
            size={20}
            className="transition group-hover:translate-x-1"
          />

        </button>

      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-white/10" />

        <span className="px-4 text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />

      </div>

      {/* Social Login */}

    <div className="grid grid-cols-2 gap-4">

    {/* Google */}

    <button
        className="
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-white
        py-3.5
        font-semibold
        text-slate-800
        transition
        hover:scale-[1.02]
        hover:shadow-lg
        "
    >
        <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        className="h-5 w-5"
        alt="Google"
        />

        <span className="hidden sm:block">
        Google
        </span>

    </button>

    {/* GitHub */}

    <button
        className="
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        py-3.5
        font-semibold
        text-white
        transition
        hover:bg-slate-800
        hover:scale-[1.02]
        "
    >
        <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
        className="h-5 w-5 invert"
        alt="GitHub"
        />

        <span className="hidden sm:block">
        GitHub
        </span>

    </button>

    </div>

      {/* Bottom */}

      <p className="mt-8 text-center text-slate-400">

        Don't have an account?

        <Link
          to="/signup"
          className="ml-2 font-semibold text-cyan-400"
        >
          Sign Up
        </Link>

      </p>

    </div>
  );
}