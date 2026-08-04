import { useState } from "react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="auth-card rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-2xl">

      <h2 className="text-3xl font-bold text-white">
        Forgot Password
      </h2>

      <p className="mt-3 text-slate-400 leading-7">
        Enter your email address and we'll send you
        a password reset link.
      </p>

      <div className="mt-8">

        <label className="mb-2 block text-sm text-slate-300">
          Email Address
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">

          <Mail
            size={18}
            className="text-slate-400"
          />

          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
          />

        </div>

      </div>

      <button
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition hover:scale-[1.02]"
      >

        Send Reset Link

        <ArrowRight size={18}/>

      </button>

      <Link
        to="/login"
        className="mt-8 flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300"
      >

        <ArrowLeft size={18}/>

        Back to Login

      </Link>

    </div>
  );
}
