import { useEffect, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  KeyRound,
  ShieldCheck,
  Users,
  UserCheck,
} from "lucide-react";

import {
  getAdminDashboardStats,
  type AdminDashboardStats as DashboardStats,
} from "../../api/api";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
}

function getToken() {
  return (
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F1724] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-4xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      const token = getToken();

      if (!token) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAdminDashboardStats(token);
        setStats(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard statistics.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
        {error}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const cards: StatCardProps[] = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: Users,
      description: `${stats.active_users} active users`,
    },
    {
      title: "Active Users",
      value: stats.active_users,
      icon: UserCheck,
      description: "Currently active accounts",
    },
    {
      title: "Total Services",
      value: stats.total_services,
      icon: BriefcaseBusiness,
      description: `${stats.active_services} active services`,
    },
    {
      title: "Active Services",
      value: stats.active_services,
      icon: Activity,
      description: "Visible public services",
    },
    {
      title: "Total Roles",
      value: stats.total_roles,
      icon: ShieldCheck,
      description: "Configured application roles",
    },
    {
      title: "Permissions",
      value: stats.total_permissions,
      icon: KeyRound,
      description: "Available account permissions",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-medium text-cyan-400">
          SYSTEM OVERVIEW
        </p>

        <h2 className="mt-1 text-2xl font-bold text-white">
          Dashboard Statistics
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}