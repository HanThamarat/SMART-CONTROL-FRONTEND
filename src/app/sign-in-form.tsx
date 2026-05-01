"use client";

import FormField from "@/app/components/form-field";
import Button from "@/app/components/button";
import ThemeToggle from "@/app/components/theme-toggle";
import { useToast } from "@/app/components/toast-provider";
import { authDTOEntityShema, authDTOEntityType } from "@/types/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "./hooks/appDispatch";
import { credentialAuth } from "./store/slice/authSlice";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";

export default function SignInForm() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<authDTOEntityType>({ resolver: zodResolver(authDTOEntityShema) });

  const onSubmit: SubmitHandler<authDTOEntityType> = async (data) => {
    setIsLoading(true);
    
    const response: any = await dispatch(credentialAuth(data));

    if (response.payload.status) {
      toast({
       variant: "success",
       title: "Signin successfully.",
       description: `Welcome back, ${data.credential}. Your dashboard is getting ready.`
      });
      Cookies.set('authToken', response.payload?.data?.authToken);
      setIsLoading(false);
     window.location.assign(`${process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL}/dashboard`);
    } else {
      toast({
       variant: "error",
       title: "Signin failed.",
       description: `Have something worning.`
      });
      setIsLoading(false);
    }
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

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  <FormField
                    type="text"
                    label="Email"
                    placeholder="operator@smartcontrol.com"
                    error={errors.credential?.message}
                    {...register("credential")}
                  />

                  <div className="space-y-2">
                    <FormField
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      error={errors.password?.message}
                      className="mt-0"
                      {...register("password")}
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

                  <Button
                    type="submit"
                    colorClassName="bg-[var(--text-primary)] text-[var(--accent-contrast)]"
                    isLoading={isLoading}
                  >
                    Enter Dashboard
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
