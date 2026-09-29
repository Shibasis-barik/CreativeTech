import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  Archive,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileSpreadsheet,
  Mail,
  MessageSquare,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import * as XLSX from "xlsx";

import {
  deleteMessage,
  getCurrentUser,
  getMessages,
  updateMessage,
  type Message,
} from "../api/api";

const PAGE_SIZE = 5;

function getToken() {
  return (
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStatusClasses(status: Message["status"]) {
  switch (status) {
    case "new":
      return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";

    case "read":
      return "border-blue-400/20 bg-blue-400/10 text-blue-300";

    case "replied":
      return "border-green-400/20 bg-green-500/10 text-green-300";

    case "archived":
      return "border-slate-400/20 bg-slate-500/10 text-slate-300";

    default:
      return "border-white/10 bg-white/5 text-slate-300";
  }
}

type MessageFilter =
  | "all"
  | "new"
  | "read"
  | "replied"
  | "archived";

export default function AdminMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  const [filter, setFilter] =
    useState<MessageFilter>("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMessages = useCallback(
    async (showRefresh = false) => {
      const token = getToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const currentUser = await getCurrentUser(token);

        const canManageMessages =
          currentUser.role === "Admin" ||
          currentUser.permissions.includes(
            "manage_messages",
          );

        if (!canManageMessages) {
          navigate("/admin", { replace: true });
          return;
        }

        const data = await getMessages(token);

        setMessages(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load messages.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const filteredMessages = useMemo(() => {
    if (filter === "all") {
      return messages;
    }

    return messages.filter(
      (message) => message.status === filter,
    );
  }, [messages, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredMessages.length / PAGE_SIZE,
    ),
  );

  const paginatedMessages = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PAGE_SIZE;

    return filteredMessages.slice(
      startIndex,
      startIndex + PAGE_SIZE,
    );
  }, [filteredMessages, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const newCount = messages.filter(
    (message) => message.status === "new",
  ).length;

  const readCount = messages.filter(
    (message) => message.status === "read",
  ).length;

  const repliedCount = messages.filter(
    (message) => message.status === "replied",
  ).length;

  // const archivedCount = messages.filter(
  //   (message) => message.status === "archived",
  // ).length;

  const handleFilterChange = (
    nextFilter: MessageFilter,
  ) => {
    setFilter(nextFilter);
    setCurrentPage(1);
    setSelectedMessage(null);
    setSuccess("");
    setError("");
  };

  const handleStatusChange = async (
    message: Message,
    status: Message["status"],
  ) => {
    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setError("");
      setSuccess("");

      const updated = await updateMessage(
        token,
        message.id,
        { status },
      );

      setMessages((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );

      setSelectedMessage((current) =>
        current &&
        current.id === updated.id
          ? updated
          : current,
      );

      setSuccess(
        `Message marked as ${status}.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update message.",
      );
    }
  };

  const handleDelete = async (
    message: Message,
  ) => {
    const confirmed = window.confirm(
      `Delete the message from "${message.full_name}"?`,
    );

    if (!confirmed) {
      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteMessage(
        token,
        message.id,
      );

      setMessages((current) =>
        current.filter(
          (item) => item.id !== message.id,
        ),
      );

      setSelectedMessage(null);

      setSuccess(
        "Message deleted successfully.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete message.",
      );
    }
  };

  const exportMessagesToCSV = () => {
    if (messages.length === 0) {
      setError(
        "There are no messages to export.",
      );
      return;
    }

    setError("");
    setSuccess("");

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Service",
      "Budget",
      "Message",
      "Status",
      "Created At",
      "Updated At",
    ];

    const escapeCsv = (
      value: unknown,
    ) => {
      const text = String(
        value ?? "",
      );

      return `"${text.replace(
        /"/g,
        '""',
      )}"`;
    };

    const rows = messages.map(
      (message) => [
        message.id,
        message.full_name,
        message.email,
        message.phone,
        message.company,
        message.service,
        message.budget,
        message.message,
        message.status,
        formatDate(
          message.created_at,
        ),
        formatDate(
          message.updated_at,
        ),
      ],
    );

    const csvContent = [
      headers
        .map(escapeCsv)
        .join(","),
      ...rows.map((row) =>
        row
          .map(escapeCsv)
          .join(","),
      ),
    ].join("\r\n");

    const blob = new Blob(
      ["\uFEFF" + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `kreative-technology-messages-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setSuccess(
      "Messages exported to CSV successfully.",
    );
  };

  const exportMessagesToExcel = () => {
    if (messages.length === 0) {
      setError(
        "There are no messages to export.",
      );
      return;
    }

    setError("");
    setSuccess("");

    const exportData =
      messages.map((message, index) => ({
        "S.No.": messages.length - index,
        "Database ID": message.id,
        "Full Name":
          message.full_name,
        Email: message.email,
        Phone: message.phone,
        Company: message.company,
        Service: message.service,
        Budget: message.budget,
        Message: message.message,
        Status: message.status,
        "Created At":
          formatDate(
            message.created_at,
          ),
        "Updated At":
          formatDate(
            message.updated_at,
          ),
      }));

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData,
      );

    worksheet["!cols"] = [
      { wch: 8 },   // S.No.
      { wch: 12 },  // Database ID
      { wch: 22 },  // Full Name
      { wch: 30 },  // Email
      { wch: 18 },  // Phone
      { wch: 22 },  // Company
      { wch: 25 },  // Service
      { wch: 18 },  // Budget
      { wch: 55 },  // Message
      { wch: 14 },  // Status
      { wch: 24 },  // Created At
      { wch: 24 },  // Updated At
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Messages",
    );

    XLSX.writeFile(
      workbook,
      `kreative-technology-messages-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`,
    );

    setSuccess(
      "Messages exported to Excel successfully.",
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-56 animate-pulse rounded-lg bg-white/5" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/5"
              />
            ))}
          </div>

          <div className="mt-8 h-80 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Messages
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Manage enquiries and project
              messages submitted through the
              Kreative Technology contact form.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                navigate("/admin")
              }
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() =>
                loadMessages(true)
              }
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-2.5 text-sm text-cyan-300 transition hover:bg-cyan-400/20 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>
          </div>
        </div>

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* STAT CARDS */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* ALL */}

          <button
            type="button"
            onClick={() =>
              handleFilterChange("all")
            }
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "all"
                ? "border-cyan-400/30 bg-cyan-400/10"
                : "border-white/10 bg-[#0F1724] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                All Messages
              </p>

              <MessageSquare
                size={20}
                className="text-cyan-300"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {messages.length}
            </p>
          </button>

          {/* NEW */}

          <button
            type="button"
            onClick={() =>
              handleFilterChange("new")
            }
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "new"
                ? "border-cyan-400/30 bg-cyan-400/10"
                : "border-white/10 bg-[#0F1724] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                New
              </p>

              <Mail
                size={20}
                className="text-cyan-300"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {newCount}
            </p>
          </button>

          {/* READ */}

          <button
            type="button"
            onClick={() =>
              handleFilterChange("read")
            }
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "read"
                ? "border-blue-400/30 bg-blue-400/10"
                : "border-white/10 bg-[#0F1724] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Read
              </p>

              <Eye
                size={20}
                className="text-blue-300"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {readCount}
            </p>
          </button>

          {/* REPLIED */}

          <button
            type="button"
            onClick={() =>
              handleFilterChange("replied")
            }
            className={`rounded-2xl border p-5 text-left transition ${
              filter === "replied"
                ? "border-green-400/30 bg-green-500/10"
                : "border-white/10 bg-[#0F1724] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Replied
              </p>

              <Check
                size={20}
                className="text-green-300"
              />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {repliedCount}
            </p>
          </button>
        </div>

        {/* FILTER BUTTONS */}

        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["new", "New"],
              ["read", "Read"],
              ["replied", "Replied"],
              ["archived", "Archived"],
            ] as const
          ).map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  handleFilterChange(
                    value,
                  )
                }
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  filter === value
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>

        {/* MESSAGE CONTAINER */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F1724]">
          {/* MESSAGE HEADER */}

          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Contact Messages
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredMessages.length}{" "}
                  message
                  {filteredMessages.length !==
                  1
                    ? "s"
                    : ""}
                </p>
              </div>

              {/* EXPORT BUTTONS */}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={
                    exportMessagesToCSV
                  }
                  disabled={
                    messages.length === 0
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download size={16} />
                  Export CSV
                </button>

                <button
                  type="button"
                  onClick={
                    exportMessagesToExcel
                  }
                  disabled={
                    messages.length === 0
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FileSpreadsheet
                    size={16}
                  />
                  Export Excel
                </button>
              </div>
            </div>
          </div>

          {/* EMPTY */}

          {filteredMessages.length ===
          0 ? (
            <div className="px-6 py-16 text-center">
              <MessageSquare
                size={40}
                className="mx-auto text-slate-600"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-300">
                No messages found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                There are no messages in
                this category.
              </p>
            </div>
          ) : (
            <>
              {/* MESSAGE LIST */}

              <div className="divide-y divide-white/10">
                {paginatedMessages.map(
                  (message) => (
                    <div
                      key={message.id}
                      className="p-6 transition hover:bg-white/[0.02]"
                    >
                      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div className="min-w-0 flex-1">
                          {/* Name + status */}

                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-semibold text-white">
                              {
                                message.full_name
                              }
                            </h3>

                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
                                message.status,
                              )}`}
                            >
                              {
                                message.status
                              }
                            </span>
                          </div>

                          {/* Contact information */}

                          <div className="mt-2 flex flex-col gap-1 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:gap-x-5">
                            <span>
                              {
                                message.email
                              }
                            </span>

                            {message.phone && (
                              <span>
                                {
                                  message.phone
                                }
                              </span>
                            )}

                            {message.company && (
                              <span>
                                {
                                  message.company
                                }
                              </span>
                            )}
                          </div>

                          {/* Service + Budget */}

                          <div className="mt-4 flex flex-wrap gap-2">
                            {message.service && (
                              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                                {
                                  message.service
                                }
                              </span>
                            )}

                            {message.budget && (
                              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                                {
                                  message.budget
                                }
                              </span>
                            )}
                          </div>

                          {/* Message preview */}

                          <p className="mt-4 line-clamp-2 max-w-4xl text-sm leading-6 text-slate-400">
                            {
                              message.message
                            }
                          </p>

                          {/* Date */}

                          <p className="mt-3 text-xs text-slate-600">
                            {formatDate(
                              message.created_at,
                            )}
                          </p>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-wrap gap-2 xl:max-w-sm xl:justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedMessage(
                                message,
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300 transition hover:bg-cyan-400/20"
                          >
                            <Eye
                              size={15}
                            />
                            View
                          </button>

                          {message.status ===
                            "new" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  message,
                                  "read",
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-sm text-blue-300 transition hover:bg-blue-400/20"
                            >
                              <Check
                                size={15}
                              />
                              Read
                            </button>
                          )}

                          {message.status !==
                            "replied" &&
                            message.status !==
                              "archived" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    message,
                                    "replied",
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-sm text-green-300 transition hover:bg-green-500/20"
                              >
                                <Mail
                                  size={15}
                                />
                                Replied
                              </button>
                            )}

                          {message.status !==
                            "archived" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  message,
                                  "archived",
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
                            >
                              <Archive
                                size={15}
                              />
                              Archive
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                message,
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                          >
                            <Trash2
                              size={15}
                            />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* PAGINATION */}

              {filteredMessages.length >
                PAGE_SIZE && (
                <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="text-slate-300">
                      {(currentPage - 1) *
                        PAGE_SIZE +
                        1}
                    </span>{" "}
                    -{" "}
                    <span className="text-slate-300">
                      {Math.min(
                        currentPage *
                          PAGE_SIZE,
                        filteredMessages.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-slate-300">
                      {
                        filteredMessages.length
                      }
                    </span>{" "}
                    messages
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.max(
                              1,
                              page - 1,
                            ),
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft
                        size={16}
                      />
                      Previous
                    </button>

                    <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                      Page{" "}
                      {currentPage} of{" "}
                      {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.min(
                              totalPages,
                              page + 1,
                            ),
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Next
                      <ChevronRight
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MESSAGE DETAILS MODAL */}

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0F1724] shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-sm font-medium text-cyan-400">
                  MESSAGE DETAILS
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {
                    selectedMessage.full_name
                  }
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-200">
                    {
                      selectedMessage.email
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-slate-200">
                    {
                      selectedMessage.phone ||
                      "—"
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Company
                  </p>

                  <p className="mt-1 text-sm text-slate-200">
                    {
                      selectedMessage.company ||
                      "—"
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Service
                  </p>

                  <p className="mt-1 text-sm text-slate-200">
                    {
                      selectedMessage.service ||
                      "—"
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Budget
                  </p>

                  <p className="mt-1 text-sm text-slate-200">
                    {
                      selectedMessage.budget ||
                      "—"
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
                      selectedMessage.status,
                    )}`}
                  >
                    {
                      selectedMessage.status
                    }
                  </span>
                </div>
              </div>

              {/* MESSAGE */}

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Message
                </p>

                <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="whitespace-pre-wrap leading-7 text-slate-300">
                    {
                      selectedMessage.message
                    }
                  </p>
                </div>
              </div>

              {/* MODAL ACTIONS */}

              <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {selectedMessage.status ===
                  "new" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        selectedMessage,
                        "read",
                      )
                    }
                    className="rounded-lg border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 transition hover:bg-blue-400/20"
                  >
                    Mark Read
                  </button>
                )}

                {selectedMessage.status !==
                  "replied" &&
                  selectedMessage.status !==
                    "archived" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          selectedMessage,
                          "replied",
                        )
                      }
                      className="rounded-lg border border-green-400/20 bg-green-500/10 px-4 py-2 text-sm text-green-300 transition hover:bg-green-500/20"
                    >
                      Mark Replied
                    </button>
                  )}

                {selectedMessage.status !==
                  "archived" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        selectedMessage,
                        "archived",
                      )
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
                  >
                    Archive
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      selectedMessage,
                    )
                  }
                  className="rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}