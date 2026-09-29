import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createService,
  deleteService,
  getCurrentUser,
  getServices,
  updateService,
  type Service,
} from "../api/api";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  icon: "",
  is_active: true,
  display_order: 0,
};

export default function AdminServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] =
    useState<Service | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () =>
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  const loadServices = async () => {
    const token = getToken();

    if (!token) {
        navigate("/login", { replace: true });
        return;
    }

    try {
        setError("");

        const data = await getServices(token);

        setServices(data);
    } catch (err) {
        setError(
        err instanceof Error
            ? err.message
            : "Unable to load services.",
        );
    }
    };

  useEffect(() => {
    const initialize = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const user = await getCurrentUser(token);

        if (
          !user.permissions.includes(
            "manage_services",
          )
        ) {
          navigate("/admin", { replace: true });
          return;
        }

        await loadServices();
      } catch {
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [navigate]);

  const openCreateForm = () => {
    setEditingService(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const openEditForm = (service: Service) => {
    setEditingService(service);

    setForm({
      name: service.name,
      description: service.description,
      category: service.category,
      icon: service.icon,
      is_active: service.is_active,
      display_order: service.display_order,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingService(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingService) {
        await updateService(
          token,
          editingService.id,
          form,
        );

        setSuccess(
          "Service updated successfully.",
        );
      } else {
        await createService(token, form);

        setSuccess(
          "Service created successfully.",
        );
      }

      closeForm();
      await loadServices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save service.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service: Service) => {
    const confirmed = window.confirm(
      `Delete "${service.name}"?`,
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      await deleteService(token, service.id);

      setSuccess(
        "Service deleted successfully.",
      );

      await loadServices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete service.",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-8 text-white">
        Loading services...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Services
            </h1>

            <p className="mt-3 text-slate-400">
              Create and manage services displayed by
              Kreative Technology.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
            >
              Back
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              + Add Service
            </button>
          </div>
        </div>

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

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F1724]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-slate-400">
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-sm text-slate-400">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm text-slate-400">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-5">
                      <div className="font-medium">
                        {service.name}
                      </div>

                      <div className="mt-1 max-w-md text-sm text-slate-500">
                        {service.description}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {service.category || "—"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          service.is_active
                            ? "rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-300"
                            : "rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-sm text-red-300"
                        }
                      >
                        {service.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {service.display_order}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(service)
                          }
                          className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(service)
                          }
                          className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {services.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#0F1724] p-7">
              <h2 className="text-2xl font-bold">
                {editingService
                  ? "Edit Service"
                  : "Add Service"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Service Name
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      })
                    }
                    required
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Category
                    </label>

                    <input
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Icon
                    </label>

                    <input
                      value={form.icon}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          icon: e.target.value,
                        })
                      }
                      placeholder="Code"
                      className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Display Order
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.display_order}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          display_order:
                            Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  <label className="flex items-center gap-3 self-end pb-3 text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          is_active:
                            e.target.checked,
                        })
                      }
                      className="h-5 w-5 accent-cyan-500"
                    />

                    Active
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl border border-white/10 px-5 py-3 text-slate-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3 font-semibold"
                  >
                    {saving
                      ? "Saving..."
                      : editingService
                        ? "Update Service"
                        : "Create Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}