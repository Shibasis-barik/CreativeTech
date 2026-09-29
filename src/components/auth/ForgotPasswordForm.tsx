import { useState, type FormEvent } from "react";
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { requestPasswordReset } from "../../api/api";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await requestPasswordReset(trimmedEmail);

      setSuccess(
        "If an account exists for this email, a password reset link has been sent.",
      );

      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to process your password reset request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white">
        Forgot Password
      </h2>

      <p className="mt-3 leading-7 text-slate-400">
        Enter your email address and we'll send you a password reset link.
      </p>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <label className="mb-2 block text-sm text-slate-300">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">
            <Mail size={18} className="text-slate-400" />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              disabled={loading}
              className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500 disabled:opacity-60"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Reset Link
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <Link
        to="/login"
        className="mt-8 flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300"
      >
        <ArrowLeft size={18} />
        Back to Login
      </Link>
    </div>
  );
}