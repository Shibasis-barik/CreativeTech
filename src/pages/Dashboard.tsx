import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";

import { getCurrentUser } from "../api/api";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  permissions: string[];
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    getCurrentUser(token)
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user");

        navigate("/login", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    // Remove localStorage authentication data
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Remove sessionStorage authentication data
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");

    // Go back to login
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              KREATIVE TECHNOLOGY
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome, {user.first_name || user.username}
            </h1>

            <p className="mt-3 text-slate-400">
              Your account dashboard
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-2.5
                text-sm
                font-medium
                text-slate-300
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <Home size={17} />
              Home
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-500
                to-rose-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-red-500/20
                transition
                hover:-translate-y-0.5
              "
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>

        {/* User Information */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-[#0F1724] p-6">
            <p className="text-sm text-slate-400">
              Username
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {user.username}
            </h2>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-[#0F1724] p-6">
            <p className="text-sm text-slate-400">
              Email
            </p>

            <h2 className="mt-2 break-all text-xl font-semibold">
              {user.email}
            </h2>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-[#0F1724] p-6">
            <p className="text-sm text-slate-400">
              Role
            </p>

            <h2 className="mt-2 text-xl font-semibold text-cyan-400">
              {user.role}
            </h2>
          </div>
        </div>

        {/* Permissions */}
        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-[#0F1724] p-6">
          <h2 className="text-2xl font-semibold">
            Your Permissions
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {user.permissions.length > 0 ? (
              user.permissions.map((permission) => (
                <span
                  key={permission}
                  className="
                    rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-400/10
                    px-4
                    py-2
                    text-sm
                    text-cyan-300
                  "
                >
                  {permission}
                </span>
              ))
            ) : (
              <p className="text-slate-400">
                No special permissions assigned.
              </p>
            )}
          </div>
        </div>

        {/* Account Status */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0F1724] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Account Status
              </p>

              <p className="mt-2 font-semibold text-emerald-400">
                Active
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Account Type
              </p>

              <p className="mt-2 font-semibold text-slate-200">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}