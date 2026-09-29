import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRoles, type Role } from "../api/api";

export default function AdminRoles() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    getRoles(token)
      .then((data) => {
        setRoles(data);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load roles.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-8 text-white">
        Loading roles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Roles
            </h1>

            <p className="mt-3 text-slate-400">
              View the roles available in Kreative Technology.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-2xl border border-white/10 bg-[#0F1724] p-6 transition hover:border-cyan-400/30 hover:bg-[#111b2b]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {role.name}
                </h2>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                  Role
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Role ID: {role.id}
              </p>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-300">
                  Permissions
                </p>

                {role.permissions.length > 0 ? (
                  <div className="space-y-2">
                    {role.permissions.map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <span className="text-green-400">✓</span>
                        <span>
                          {permission
                            .replace("manage_", "Manage ")
                            .replace("_", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No special permissions.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}