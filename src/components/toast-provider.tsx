"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import type { IconType } from "react-icons";

type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = ToastInput & {
  id: string;
  isClosing: boolean;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastVariant,
  { badge: string; ring: string; glow: string; icon: IconType }
> = {
  success: {
    badge: "bg-emerald-500/14 text-emerald-500",
    ring: "border-emerald-400/30",
    glow: "from-emerald-400/20 via-transparent to-transparent",
    icon: FiCheckCircle,
  },
  error: {
    badge: "bg-rose-500/14 text-rose-500",
    ring: "border-rose-400/30",
    glow: "from-rose-400/20 via-transparent to-transparent",
    icon: FiAlertCircle,
  },
  info: {
    badge: "bg-cyan-500/14 text-cyan-500",
    ring: "border-cyan-400/30",
    glow: "from-cyan-400/20 via-transparent to-transparent",
    icon: FiInfo,
  },
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef<Map<string, number>>(new Map());
  const removalTimeoutsRef = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );

    const displayTimeout = timeoutsRef.current.get(id);
    if (displayTimeout) {
      window.clearTimeout(displayTimeout);
      timeoutsRef.current.delete(id);
    }

    if (removalTimeoutsRef.current.has(id)) {
      return;
    }

    const removalTimeout = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
      removalTimeoutsRef.current.delete(id);
    }, 220);

    removalTimeoutsRef.current.set(id, removalTimeout);
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "info",
      duration = 3200,
    }: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      setToasts((current) => [
        ...current,
        { id, title, description, variant, duration, isClosing: false },
      ]);

      const timeout = window.setTimeout(() => {
        dismiss(id);
      }, duration);

      timeoutsRef.current.set(id, timeout);
    },
    [dismiss]
  );

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    const removalTimeouts = removalTimeoutsRef.current;

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.clear();
      removalTimeouts.forEach((timeout) => window.clearTimeout(timeout));
      removalTimeouts.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      toast,
      dismiss,
    }),
    [toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(92vw,24rem)] flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toastItem) => {
          const style = toastStyles[toastItem.variant ?? "info"];
          const Icon = style.icon;

          return (
            <div
              key={toastItem.id}
              className={`pointer-events-auto relative overflow-hidden rounded-[1.5rem] border bg-[var(--panel-elevated)] text-[var(--text-primary)] shadow-[0_24px_80px_var(--shadow-strong)] backdrop-blur ${
                toastItem.isClosing
                  ? "animate-[toast-out_220ms_cubic-bezier(.4,0,1,1)_forwards]"
                  : "animate-[toast-in_220ms_cubic-bezier(.22,1,.36,1)]"
              } ${style.ring}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow}`}
              />
              <div className="relative flex items-start gap-4 p-4">
                <div
                  className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold ${style.badge}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {toastItem.title}
                  </p>
                  {toastItem.description ? (
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                      {toastItem.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(toastItem.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--text-primary)]"
                  aria-label="Dismiss notification"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
