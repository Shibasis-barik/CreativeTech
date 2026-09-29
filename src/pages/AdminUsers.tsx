import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  changeUserRole,
  getCurrentUser,
  getRoles,
  getUsers,
  type AdminUser,
  type Role,
} from "../api/api";


export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    role: string;
    permissions: string[];
    } | null>(null);

  const getToken = () => {
    return (
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    );
  };

  const loadData = async () => {
    const token = getToken();

    if (!token) {
        navigate("/login", { replace: true });
        return;
    }

    try {
        setLoading(true);
        setError("");

        const [usersData, rolesData, currentUserData] =
        await Promise.all([
            getUsers(token),
            getRoles(token),
            getCurrentUser(token),
        ]);

        setUsers(usersData);
        setRoles(rolesData);
        setCurrentUser(currentUserData);
    } catch (err) {
        setError(
        err instanceof Error
            ? err.message
            : "Unable to load users.",
        );
    } finally {
        setLoading(false);
    }
    };

  useEffect(() => {
    loadData();
  }, []);

  const openRoleDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "User");
    setError("");
    setSuccess("");
  };

  const closeRoleDialog = () => {
    if (saving) return;

    setSelectedUser(null);
    setSelectedRole("");
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !selectedRole) {
      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await changeUserRole(
        token,
        selectedUser.id,
        selectedRole,
      );

      setSuccess(
        `${selectedUser.username}'s role was changed to ${selectedRole}.`,
      );

      setSelectedUser(null);
      setSelectedRole("");

      await loadData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change user role.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-8 text-white">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Users
            </h1>

            <p className="mt-3 text-slate-400">
              View and manage registered users.
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

        {/* Success */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Users table */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F1724]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-white/10 bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-5">
                      <div className="font-medium">
                        {user.first_name || user.username}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        @{user.username}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                        {user.role || "User"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          user.is_active
                            ? "rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-300"
                            : "rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-sm text-red-300"
                        }
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {currentUser?.permissions.includes("manage_roles") && (
                        <button
                            type="button"
                            onClick={() => openRoleDialog(user)}
                            className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
                        >
                            Change Role
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-slate-400"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Dialog */}

        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-[#0F1724] p-7 shadow-[0_0_60px_rgba(0,180,255,.2)]">
              <h2 className="text-2xl font-bold text-white">
                Change User Role
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Change the role for{" "}
                <span className="font-semibold text-white">
                  {selectedUser.username}
                </span>
                .
              </p>

              <div className="mt-6">
                <label className="mb-2 block text-sm text-slate-300">
                  Role
                </label>

                <select
                  value={selectedRole}
                  onChange={(e) =>
                    setSelectedRole(e.target.value)
                  }
                  disabled={saving}
                  className="w-full rounded-xl border border-cyan-400/20 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
                >
                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.name}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeRoleDialog}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleRoleChange}
                  disabled={saving}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-2.5 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Role"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}