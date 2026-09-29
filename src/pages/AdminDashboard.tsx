import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminDashboardStats from "../components/admin/AdminDashboardStats";
import { getCurrentUser } from "../api/api";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  permissions: string[];
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("user");

  navigate("/login", { replace: true });
};

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    getCurrentUser(token)
      .then((data) => {
        if (data.role !== "Admin") {
          navigate("/dashboard");
          return;
        }

        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");

        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        Loading admin panel...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}

        <aside className="hidden w-64 border-r border-white/10 bg-[#0F1724] p-6 lg:block">
          <div className="mb-10">
            <h1 className="text-2xl font-bold">
              Kreative Technology
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Administration Panel
            </p>
          </div>

          <nav className="space-y-2">
            <button className="w-full rounded-xl bg-cyan-500/10 px-4 py-3 text-left text-cyan-400">
              Dashboard
            </button>

            <button
                type="button"
                onClick={() => navigate("/admin/users")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5"
                >
                Users
            </button>

            <button
                type="button"
                onClick={() => navigate("/admin/roles")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5"
                >
                Roles
            </button>

            <button
                type="button"
                onClick={() => navigate("/admin/permissions")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5"
              >
                Permissions
            </button>

            <button
                type="button"
                onClick={() => navigate("/admin/services")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5"
              >
                Services
            </button>

            {/* <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5">
              Content
            </button> */}

            <button
                type="button"
                onClick={() => navigate("/admin/messages")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-white/5"
              >
                Messages
            </button>
            <button type="button" onClick={handleLogout} className="mt-8 w-full rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-left font-medium text-red-300 transition hover:bg-red-500/20 hover:text-red-200">
                Logout
            </button>
          </nav>
        </aside>

        {/* Main */}

        <main className="flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <AdminDashboardStats />
            <div className="mb-10">
              <p className="text-sm font-medium text-cyan-400">
                ADMINISTRATION
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                Welcome, {user.first_name || user.username}
              </h1>

              <p className="mt-3 text-slate-400">
                Manage your Kreative Technology platform.
              </p>
            </div>

            {/* Statistics */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#0F1724] p-6">
                <p className="text-sm text-slate-400">
                  Your Role
                </p>

                <p className="mt-3 text-2xl font-bold text-cyan-400">
                  {user.role}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F1724] p-6">
                <p className="text-sm text-slate-400">
                  Permissions
                </p>

                <p className="mt-3 text-2xl font-bold">
                  {user.permissions.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F1724] p-6">
                <p className="text-sm text-slate-400">
                  Account
                </p>

                <p className="mt-3 text-2xl font-bold">
                  Active
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F1724] p-6">
                <p className="text-sm text-slate-400">
                  Access
                </p>

                <p className="mt-3 text-2xl font-bold text-green-400">
                  Full
                </p>
              </div>
            </div>

            {/* Admin Welcome */}

            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-[#0F1724] p-8">
              <h2 className="text-2xl font-semibold">
                Admin Control Center
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                From this panel, administrators will be able to
                manage users, assign roles, control permissions,
                manage services, update website content, and
                handle incoming messages.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}