"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import DashboardNav from "@/app/dashboard/dashboard-nav";

type DashboardShellProps = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardShell({ children }: DashboardShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1800px] flex-col gap-4 px-3 py-3 sm:px-5 lg:flex-row lg:gap-5 lg:px-6 lg:py-5">
      <div className="flex items-center justify-between rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--panel-elevated)] px-4 py-3 shadow-[0_14px_32px_var(--shadow-soft)] backdrop-blur lg:hidden">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            Smart Control
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
            Management Dashboard
          </p>
        </div>

        <button
          type="button"
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-[var(--panel-bg)] text-[var(--text-primary)]"
        >
          {isNavOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      <div className="hidden lg:sticky lg:top-5 lg:block lg:h-[calc(100vh-2.5rem)] lg:w-[260px] lg:flex-none">
        <DashboardNav />
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isNavOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-950/35 backdrop-blur-[2px] transition-opacity duration-200 ${
            isNavOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setIsNavOpen(false)}
          className="absolute inset-0"
        />
        <div
          className={`absolute bottom-3 left-3 top-3 z-10 w-[min(82vw,280px)] transition-transform duration-200 ease-out ${
            isNavOpen ? "translate-x-0" : "-translate-x-[110%]"
          }`}
        >
          <DashboardNav onNavigate={() => setIsNavOpen(false)} />
        </div>
      </div>

      <div className="min-w-0 flex-1 rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--panel-muted)] p-[1px] shadow-[0_24px_60px_var(--shadow-soft)] backdrop-blur">
        <section className="min-h-full rounded-[calc(1.5rem-1px)] bg-[var(--panel-bg)] p-4 sm:p-5 lg:p-6">
          {children}
        </section>
      </div>
    </div>
  );
}
