import { useState, type FormEvent } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { confirmPasswordReset } from "../../api/api";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const { uid, token } = useParams<{
    uid: string;
    token: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!uid || !token) {
      setError("Invalid or incomplete reset link.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await confirmPasswordReset(
        uid,
        token,
        password,
      );

      setSuccess(
        "Your password has been reset successfully. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset your password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white">
        Reset Password
      </h2>

      <p className="mt-3 leading-7 text-slate-400">
        Enter your new password below.
      </p>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={18} className="mt-0.5" />
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <CheckCircle2 size={18} className="mt-0.5" />
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Password */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            New Password
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">
            <Lock size={18} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              autoComplete="new-password"
              disabled={loading}
              className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((value) => !value)
              }
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

        {/* Confirm */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-[#111827] px-4">
            <Lock size={18} className="text-slate-400" />

            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              disabled={loading}
              className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm((value) => !value)
              }
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

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Resetting...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <Link
        to="/login"
        className="mt-8 flex items-center justify-center text-cyan-400 hover:text-cyan-300"
      >
        Back to Login
      </Link>
    </div>
  );
}