"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/app/components/theme-toggle";
import Button from "@/app/components/button";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  FiCpu,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";

type DashboardNavProps = {
  onNavigate?: () => void;
};

const navigationItems = [
  { href: "/dashboard", label: "Overview", icon: FiGrid },
  { href: "/dashboard/widget", label: "Widget", icon: FiCpu },
];

export default function DashboardNav({ onNavigate }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("authToken");
    onNavigate?.();
    router.replace("/");
    router.refresh();
  };

  return (
    <aside className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--panel-elevated)] p-3 shadow-[0_20px_50px_var(--shadow-soft)] backdrop-blur">
      <div className="space-y-5">
        <div className="rounded-[1.25rem] bg-[var(--text-primary)] px-4 py-5 text-[var(--accent-contrast)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
            Smart Control
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            Management
          </h1>
          <p className="mt-2 text-xs leading-5 text-white/72">
            Control devices, alerts, and operators from one workspace.
          </p>
        </div>

        <nav className="space-y-2">
          {navigationItems.map(({ href, label, icon: Icon }) => {
            const isOverview = href === "/dashboard";
            const isActive = isOverview
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "border-transparent bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_14px_28px_var(--shadow-soft)]"
                    : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-soft)] hover:bg-[var(--panel-bg)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                    isActive
                      ? "bg-white/14"
                      : "bg-[color:color-mix(in_srgb,var(--surface-strong)_72%,transparent)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Live control mode
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                Alerts and operator updates remain visible across all dashboard
                views.
              </p>
            </div>
            <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.16)]" />
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Workspace theme
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Adjust appearance for the control room display.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <Button
          className="sm:w-full"
          colorClassName="border border-[var(--border-soft)] bg-[var(--panel-bg)] text-[var(--danger-text)]"
          isLoading={isLoggingOut}
          onClick={handleLogout}
        >
          <span className="inline-flex items-center gap-2">
            <FiLogOut className="h-4 w-4" />
            Logout
          </span>
        </Button>
      </div>
    </aside>
  );
}
