import { FiAlertTriangle, FiArrowUpRight, FiClock, FiCpu, FiZap } from "react-icons/fi";

const statCards = [
  {
    label: "Connected devices",
    value: "248",
    detail: "+12 this week",
    tone: "bg-[var(--success-soft)] text-[var(--success-text)]",
  },
  {
    label: "Critical alerts",
    value: "07",
    detail: "2 need response now",
    tone: "bg-[var(--danger-soft)] text-[var(--danger-text)]",
  },
  {
    label: "Automations running",
    value: "31",
    detail: "94.6% success rate",
    tone: "bg-[color:color-mix(in_srgb,var(--surface-strong)_88%,transparent)] text-[var(--text-primary)]",
  },
  {
    label: "Energy efficiency",
    value: "82%",
    detail: "Up 6.4% vs last month",
    tone: "bg-[color:color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)]",
  },
];

const liveAlerts = [
  {
    title: "Freezer line voltage drift",
    zone: "Factory A",
    time: "3 min ago",
    severity: "High",
  },
  {
    title: "Maintenance cycle completed",
    zone: "Water Treatment",
    time: "18 min ago",
    severity: "Info",
  },
  {
    title: "Backup generator test overdue",
    zone: "North Compound",
    time: "42 min ago",
    severity: "Medium",
  },
];

const operations = [
  { title: "Production floor", status: "Nominal", load: "96 sensors" },
  { title: "Cold storage", status: "Monitoring", load: "48 sensors" },
  { title: "HQ facilities", status: "Stable", load: "32 sensors" },
  { title: "Remote substations", status: "Attention", load: "72 sensors" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-[var(--text-primary)] px-6 py-7 text-[var(--accent-contrast)] sm:px-8 sm:py-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
              Management dashboard
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              One control surface for your entire smart operations stack.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
              Monitor fleet health, review incidents, and coordinate operators
              without leaving the dashboard workspace.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900"
            >
              Open incident room
              <FiArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/8 px-5 py-3 text-sm font-semibold text-white"
            >
              Review automation rules
              <FiZap className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {statCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-5 shadow-[0_18px_40px_var(--shadow-soft)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-[var(--text-muted)]">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {card.value}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${card.tone}`}>
                {card.detail}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <article className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-6 shadow-[0_18px_40px_var(--shadow-soft)]">
          <div className="flex flex-col gap-4 border-b border-[var(--border-soft)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Facility performance
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Operational zones
              </h3>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Updated every 5 minutes from edge gateways.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {operations.map((operation, index) => (
              <div
                key={operation.title}
                className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[color:color-mix(in_srgb,var(--panel-muted)_88%,transparent)] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--surface-strong)_82%,transparent)] text-[var(--text-primary)]">
                    <FiCpu className="h-5 w-5" />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      operation.status === "Attention"
                        ? "bg-[var(--danger-soft)] text-[var(--danger-text)]"
                        : "bg-[var(--success-soft)] text-[var(--success-text)]"
                    }`}
                  >
                    {operation.status}
                  </span>
                </div>

                <h4 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                  {operation.title}
                </h4>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {operation.load}
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
                    <span>Utilization</span>
                    <span>{88 - index * 7}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[color:color-mix(in_srgb,var(--surface-strong)_60%,transparent)]">
                    <div
                      className="h-2 rounded-full bg-[var(--accent)]"
                      style={{ width: `${88 - index * 7}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-6 shadow-[0_18px_40px_var(--shadow-soft)]">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border-soft)] pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Command queue
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Live alerts
              </h3>
            </div>
            <span className="rounded-full bg-[var(--danger-soft)] px-3 py-1 text-xs font-semibold text-[var(--danger-text)]">
              Escalation active
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {liveAlerts.map((alert) => (
              <div
                key={alert.title}
                className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[color:color-mix(in_srgb,var(--panel-muted)_88%,transparent)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--danger-soft)] text-[var(--danger-text)]">
                      <FiAlertTriangle className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                        {alert.title}
                      </h4>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {alert.zone}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[var(--border-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">
                    {alert.severity}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-2">
                    <FiClock className="h-3.5 w-3.5" />
                    {alert.time}
                  </span>
                  <button
                    type="button"
                    className="font-semibold text-[var(--accent)]"
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
