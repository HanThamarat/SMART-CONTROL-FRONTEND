
import DashboardShell from "@/app/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)]">
      <div className="relative isolate min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--surface-glow-a),_transparent_28%),radial-gradient(circle_at_bottom_right,_var(--surface-glow-b),_transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(var(--surface-overlay)_1px,transparent_1px),linear-gradient(90deg,var(--surface-overlay)_1px,transparent_1px)] [background-size:72px_72px]" />

        <DashboardShell>{children}</DashboardShell>
      </div>
    </main>
  );
}
