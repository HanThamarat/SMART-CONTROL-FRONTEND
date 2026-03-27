import type { ComponentProps } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function FormField({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: FormFieldProps) {
  const inputId = id ?? props.name;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <label className="block" htmlFor={inputId}>
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`h-12 w-full rounded-2xl border px-4 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 ${
          error
            ? "border-[var(--danger-border)] bg-[var(--danger-soft)] text-[var(--text-primary)] focus:border-[var(--danger-border)] focus:ring-[var(--danger-soft)]"
            : "border-[var(--border-soft)] bg-[var(--input-bg)] text-[var(--text-primary)] focus:border-[var(--accent-strong)] focus:ring-[color:color-mix(in_srgb,var(--accent-strong)_18%,transparent)]"
        } ${className}`.trim()}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-[var(--danger-text)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-2 text-sm text-[var(--text-muted)]">
          {hint}
        </p>
      ) : null}
    </label>
  );
}
