"use client";

import FormField from "@/components/form-field";
import ThemeToggle from "@/components/theme-toggle";
import { useToast } from "@/components/toast-provider";

const fieldErrors = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const { toast } = useToast();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    toast({
      variant: "success",
      title: "Signed in request captured",
      description: email
        ? `Welcome back, ${email}. Your dashboard is getting ready.`
        : "Your dashboard is getting ready.",
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--surface-base)] text-[var(--text-primary)]">
      <div className="relative isolate min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--surface-glow-a),_transparent_30%),radial-gradient(circle_at_bottom_right,_var(--surface-glow-b),_transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(var(--surface-overlay)_1px,transparent_1px),linear-gradient(90deg,var(--surface-overlay)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <section className="w-full max-w-xl">
            <div className="mb-5 flex justify-end">
              <ThemeToggle />
            </div>

            <div className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel-muted)] p-[1px] shadow-[0_24px_80px_var(--shadow-strong)] backdrop-blur">
              <div className="rounded-[calc(2rem-1px)] bg-[var(--panel-bg)] p-8 md:p-10">
                <div className="space-y-3">
                  <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--panel-bg)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Smart Control Platform
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
                    Welcome back
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Sign in
                  </h1>
                  <p className="text-sm leading-6 text-[var(--text-muted)]">
                    Use your operator account to continue to the smart control
                    console.
                  </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <FormField
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="operator@smartcontrol.com"
                    error={fieldErrors.email}
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Password
                      </span>
                      <a
                        href="#"
                        className="text-sm font-medium text-[var(--accent)] transition hover:opacity-75"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <FormField
                      type="password"
                      name="password"
                      label=""
                      placeholder="Enter your password"
                      error={fieldErrors.password}
                      className="mt-0"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
                    <label className="inline-flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-[var(--border-soft)] bg-[var(--input-bg)] text-[var(--accent-strong)] focus:ring-[color:color-mix(in_srgb,var(--accent-strong)_18%,transparent)]"
                      />
                      Keep me signed in
                    </label>
                    <span className="rounded-full bg-[var(--success-soft)] px-3 py-1 font-medium text-[var(--success-text)]">
                      Protected session
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--text-primary)] px-5 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--accent-strong)_18%,transparent)]"
                  >
                    Enter Dashboard
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
