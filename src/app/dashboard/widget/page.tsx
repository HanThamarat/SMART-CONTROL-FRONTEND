"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/button";
import WidgetModal from "@/app/dashboard/widget/content/modal";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { findAllWidgets, widgetSelector } from "@/app/store/slice/widgetSlice";
import { useSelector } from "react-redux";

type WidgetSetting = {
  current_value?: number;
  max_value?: number;
  min_value?: number;
};

export default function WidgetPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [widgetValues, setWidgetValues] = useState<Record<number, number>>({});
  const dispatch = useAppDispatch();
  const { widgets, loading } = useSelector(widgetSelector);
  const hasWidgets = Array.isArray(widgets) && widgets.length > 0;
  const skeletonCards = Array.from({ length: 6 });

  useEffect(() => {
    dispatch(findAllWidgets());
  }, [dispatch]);

  return (
    <>
      <div className="flex w-full flex-col gap-5">
        <section className="overflow-hidden rounded-[2rem] bg-[var(--text-primary)] px-6 py-7 text-[var(--accent-contrast)] sm:px-8 sm:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
                Widget Management
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Manage the widget catalog used across your control dashboard.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
                Create, organize, and prepare widgets for monitoring,
                automation, and operator workflows.
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            className="sm:w-auto"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Widget
          </Button>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? skeletonCards.map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-5 shadow-[0_18px_42px_var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-full max-w-[12rem]">
                      <div className="h-3 w-24 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                      <div className="mt-3 h-7 w-full animate-pulse rounded-full bg-[var(--surface-strong)]" />
                    </div>
                    <div className="h-7 w-20 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-[var(--panel-muted)] p-4">
                    <div className="flex items-end justify-between gap-4">
                      <div className="w-full max-w-[8rem]">
                        <div className="h-3 w-20 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                        <div className="mt-3 h-10 w-24 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                      </div>
                      <div className="w-16">
                        <div className="ml-auto h-3 w-14 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                        <div className="mt-2 ml-auto h-3 w-14 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                      </div>
                    </div>

                    <div className="mt-5 h-3 animate-pulse overflow-hidden rounded-full bg-[var(--surface-strong)]" />
                    <div className="mt-5 h-2 animate-pulse rounded-full bg-[var(--surface-strong)]" />
                  </div>
                </div>
              ))
            : null}

          {!loading && !hasWidgets ? (
            <div className="md:col-span-2 xl:col-span-3">
              <div className="rounded-[1.9rem] border border-dashed border-[var(--border-soft)] bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--accent)_12%,transparent),transparent_45%),var(--panel-muted)] px-6 py-12 text-center shadow-[0_18px_42px_var(--shadow-soft)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] text-2xl text-[var(--accent)] shadow-[0_14px_30px_var(--shadow-soft)]">
                  W
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  No widgets ready yet
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                  There are no widget cards to display right now. Create a new
                  widget to start monitoring and controlling device values from
                  this dashboard.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button
                    className="sm:w-auto"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Create First Widget
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {!loading && hasWidgets && widgets.map((widget) => {
            const widgetSetting = (widget.widget_setting ?? {}) as WidgetSetting;
            const minValue = Number(widgetSetting.min_value ?? 0);
            const maxValue = Number(widgetSetting.max_value ?? 100);
            const currentValue =
              widgetValues[widget.id] ?? Number(widgetSetting.current_value ?? 0);
            const progress = maxValue > minValue
              ? ((currentValue - minValue) / (maxValue - minValue)) * 100
              : 0;

            return (
              <article
                key={widget.id}
                className="overflow-hidden rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-5 shadow-[0_18px_42px_var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      {widget.widget_type}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                      {widget.widget_name}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      widget.status
                        ? "bg-[var(--success-soft)] text-[var(--success-text)]"
                        : "bg-[var(--danger-soft)] text-[var(--danger-text)]"
                    }`}
                  >
                    {widget.status ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-[var(--panel-muted)] p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Current Value
                      </p>
                      <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                        {currentValue}
                      </p>
                    </div>
                    <div className="text-right text-xs text-[var(--text-muted)]">
                      <p>Min {minValue}</p>
                      <p className="mt-1">Max {maxValue}</p>
                    </div>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--surface-strong)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]"
                      style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={currentValue}
                    onChange={(event) =>
                      setWidgetValues((current) => ({
                        ...current,
                        [widget.id]: Number(event.target.value),
                      }))
                    }
                    className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-[var(--accent)]"
                  />
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <WidgetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
