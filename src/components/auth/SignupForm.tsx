import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
//   Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
      <div
          className="
  auth-card
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
  <div className="absolute inset-0 rounded-[34px] border border-cyan-400/20 pointer-events-none" />

      <div className="mb-8 text-center">

  <h2 className="text-4xl font-bold text-white">
    Create Account
  </h2>

  {/* <p className="mt-3 text-slate-400">
    Create your Kreative Technology account
  </p> */}

</div>

      <form className="mt-8 space-y-5">

        {/* Full Name */}

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>

          <div className="
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
">

            <User size={18} className="text-slate-400"/>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <div className="
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
">

            <Mail size={18} className="text-slate-400"/>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div>

        {/* Phone */}

        {/* <div>

          <label className="mb-2 block text-sm text-slate-300">
            Phone
          </label>

          <div className="
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
">

            <Phone size={18} className="text-slate-400"/>

            <input
              type="text"
              placeholder="+91 9876543210"
              className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div> */}

{/* Password & Confirm Password */}

<div className="grid gap-5 md:grid-cols-2">

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

      <Lock
        size={18}
        className="text-slate-400"
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff
            size={18}
            className="text-slate-400"
          />
        ) : (
          <Eye
            size={18}
            className="text-slate-400"
          />
        )}
      </button>

    </div>

  </div>

  {/* Confirm Password */}

  <div>

    <label className="mb-2 block text-sm text-slate-300">
      Confirm Password
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

      <Lock
        size={18}
        className="text-slate-400"
      />

      <input
        type={showConfirm ? "text" : "password"}
        placeholder="Confirm Password"
        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
      />

      <button
        type="button"
        onClick={() => setShowConfirm(!showConfirm)}
      >
        {showConfirm ? (
          <EyeOff
            size={18}
            className="text-slate-400"
          />
        ) : (
          <Eye
            size={18}
            className="text-slate-400"
          />
        )}
      </button>

    </div>

  </div>

</div>

        {/* Terms */}

        <label className="flex items-center gap-2 text-sm text-slate-300">

          <input
  type="checkbox"
  className="accent-cyan-500"
/>

          I agree to the Terms & Conditions

        </label>

        {/* Button */}

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
            
          Create Account
          <ArrowRight
  size={20}
  className="transition group-hover:translate-x-1"
/>
        </button>

      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-white/10"/>

        <span className="px-4 text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10"/>

      </div>

      <div className="grid grid-cols-2 gap-4">

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

      <p className="mt-8 text-center text-slate-400">

        Already have an account?{" "}

        <Link
          to="/login"
          className="font-semibold text-cyan-400"
        >
          Login
        </Link>

      </p>

    </div>
  );
}
