"use client";

import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--panel-muted)] px-4 text-sm font-medium text-[var(--text-primary)] shadow-[0_10px_30px_var(--shadow-soft)] transition hover:opacity-90"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="text-base">{theme === "light" ? "Light" : "Dark"}</span>
      <span className="inline-flex h-7 w-12 items-center rounded-full bg-[var(--surface-strong)] p-1">
        <span
          className={`h-5 w-5 rounded-full bg-[var(--accent-strong)] transition-transform ${
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
