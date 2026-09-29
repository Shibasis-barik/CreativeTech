import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  getRolePermissions,
  getRoles,
  updateRolePermissions,
  type Role,
} from "../api/api";

const permissionOptions = [
  {
    code: "manage_users",
    label: "Manage Users",
  },
  {
    code: "manage_roles",
    label: "Manage Roles",
  },
  {
    code: "manage_services",
    label: "Manage Services",
  },
  {
    code: "manage_content",
    label: "Manage Content",
  },
  {
    code: "manage_messages",
    label: "Manage Messages",
  },
];

export default function AdminPermissions() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(
    null,
  );

  const [selectedPermissions, setSelectedPermissions] = useState<
    string[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    );
  };

  useEffect(() => {
    const loadRoles = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);

        if (
          !currentUser.permissions.includes(
            "manage_roles",
          )
        ) {
          navigate("/admin", { replace: true });
          return;
        }

        const roleData = await getRoles(token);

        setRoles(roleData);

        if (roleData.length > 0) {
          setSelectedRoleId(roleData[0].id);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load roles.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, [navigate]);

  useEffect(() => {
    if (selectedRoleId === null) return;

    const loadRolePermissions = async () => {
      const token = getToken();

      if (!token) return;

      try {
        setError("");

        const data = await getRolePermissions(
          token,
          selectedRoleId,
        );

        setSelectedPermissions(data.permissions);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load role permissions.",
        );
      }
    };

    loadRolePermissions();
  }, [selectedRoleId]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((current) => {
      if (current.includes(permission)) {
        return current.filter(
          (item) => item !== permission,
        );
      }

      return [...current, permission];
    });
  };

  const handleSave = async () => {
    if (selectedRoleId === null) return;

    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateRolePermissions(
        token,
        selectedRoleId,
        selectedPermissions,
      );

      setSuccess(
        "Role permissions updated successfully.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update permissions.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-8 text-white">
        Loading permissions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white lg:p-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Permissions
            </h1>

            <p className="mt-3 text-slate-400">
              Assign permissions to each role.
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

        {/* Messages */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Role selector */}

        <div className="rounded-2xl border border-white/10 bg-[#0F1724] p-6">
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Select Role
          </label>

          <select
            value={selectedRoleId ?? ""}
            onChange={(e) =>
              setSelectedRoleId(
                Number(e.target.value),
              )
            }
            className="w-full rounded-xl border border-cyan-400/20 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
          >
            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
              >
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Permissions */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0F1724] p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Role Permissions
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Choose what this role is allowed to do.
            </p>
          </div>

          <div className="space-y-3">
            {permissionOptions.map((permission) => {
              const checked =
                selectedPermissions.includes(
                  permission.code,
                );

              const selectedRole = roles.find(
                (role) =>
                  role.id === selectedRoleId,
              );

              const isProtectedAdminPermission =
                selectedRole?.name === "Admin" &&
                permission.code === "manage_roles";

              return (
                <label
                  key={permission.code}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition hover:bg-white/[0.05]"
                >
                  <div>
                    <p className="font-medium text-white">
                      {permission.label}
                    </p>

                    <p className="mt-1 text-sm text-cyan-300">
                      {permission.code}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={
                      isProtectedAdminPermission ||
                      saving
                    }
                    onChange={() =>
                      togglePermission(
                        permission.code,
                      )
                    }
                    className="h-5 w-5 accent-cyan-500"
                  />
                </label>
              );
            })}
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Permissions"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}