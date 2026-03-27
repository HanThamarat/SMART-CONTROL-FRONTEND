import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  colorClassName?: string;
  isLoading?: boolean;
};

export default function Button({
  type = "button",
  className = "",
  colorClassName = "bg-[var(--text-primary)] text-[var(--accent-contrast)]",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex h-12 w-full items-center justify-center rounded-2xl px-5 text-sm font-semibold transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--accent-strong)_18%,transparent)] disabled:cursor-not-allowed disabled:opacity-60 ${colorClassName} ${className}`.trim()}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
