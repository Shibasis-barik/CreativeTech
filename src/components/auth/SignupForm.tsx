import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  AtSign,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { register } from "../../api/api";

export default function SignupForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName = fullName.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // -----------------------------
    // Frontend validation
    // -----------------------------

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedUsername) {
      setError("Please enter a username.");
      return;
    }

    if (trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(trimmedUsername)) {
      setError(
        "Username can contain only letters, numbers, dots, underscores, and hyphens.",
      );
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    // -----------------------------
    // Split full name
    // -----------------------------

    const nameParts = trimmedName.split(/\s+/);

    const first_name = nameParts[0] || "";
    const last_name =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // -----------------------------
    // Register
    // -----------------------------

    try {
      setLoading(true);

      await register({
        username: trimmedUsername,
        email: trimmedEmail,
        password,
        first_name,
        last_name,
      });

      setSuccess(
        "Account created successfully. Redirecting to login...",
      );

      // Small delay so the user can see success message.
      window.setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        auth-card
        relative
        rounded-[34px]
        border
        border-cyan-400/30
        bg-[#0F1724]/85
        p-6
        backdrop-blur-3xl
        shadow-[0_0_80px_rgba(0,180,255,.25)]
        sm:p-8
        lg:p-10
      "
    >
      {/* Glow border */}
      <div className="pointer-events-none absolute inset-0 rounded-[34px] border border-cyan-400/20" />

      {/* Header */}
      <div className="relative mb-8 text-center">
        <h2 className="text-4xl font-bold text-white">
          Create Account
        </h2>

        <p className="mt-3 text-slate-400">
          Create your Kreative Technology account
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="relative mb-5 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p>{error}</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="relative mb-5 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p>{success}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative mt-8 space-y-5"
      >
        {/* Full Name + Username */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
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
              <User
                size={18}
                className="shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                disabled={loading}
                className="
                  w-full
                  bg-transparent
                  px-4
                  py-4
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Username
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
              <AtSign
                size={18}
                className="shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                autoComplete="username"
                disabled={loading}
                className="
                  w-full
                  bg-transparent
                  px-4
                  py-4
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>
          </div>
        </div>

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
            <Mail
              size={18}
              className="shrink-0 text-slate-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              autoComplete="email"
              disabled={loading}
              className="
                w-full
                bg-transparent
                px-4
                py-4
                text-white
                outline-none
                placeholder:text-slate-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>
        </div>

        {/* Password + Confirm Password */}
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
                className="shrink-0 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                disabled={loading}
                className="
                  w-full
                  bg-transparent
                  px-4
                  py-4
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="text-slate-400 transition hover:text-cyan-400 disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
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
                className="shrink-0 text-slate-400"
              />

              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm Password"
                autoComplete="new-password"
                disabled={loading}
                className="
                  w-full
                  bg-transparent
                  px-4
                  py-4
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirm((value) => !value)}
                disabled={loading}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="text-slate-400 transition hover:text-cyan-400 disabled:opacity-50"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) =>
              setAcceptedTerms(e.target.checked)
            }
            disabled={loading}
            className="mt-1 h-4 w-4 accent-cyan-500"
          />

          <span>
            I agree to the{" "}
            <button
              type="button"
              className="font-medium text-cyan-400 hover:text-cyan-300"
              onClick={(e) => e.preventDefault()}
            >
              Terms & Conditions
            </button>
          </span>
        </label>

        {/* Create Account */}
        <button
          type="submit"
          disabled={loading}
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
            disabled:cursor-not-allowed
            disabled:opacity-70
            disabled:hover:scale-100
          "
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Creating Account...
            </>
          ) : (
            <>
              Create Account

              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </>
          )}
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

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          disabled
          title="Google signup will be added later"
          className="
            flex
            cursor-not-allowed
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-white
            py-3.5
            font-semibold
            text-slate-800
            opacity-60
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
          type="button"
          disabled
          title="GitHub signup will be added later"
          className="
            flex
            cursor-not-allowed
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
            opacity-60
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

      {/* Login */}
      <p className="mt-8 text-center text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          Login
        </Link>
      </p>
    </div>
  );
}