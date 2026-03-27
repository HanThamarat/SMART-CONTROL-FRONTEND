"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import Button from "@/app/components/button";
import FormField from "@/app/components/form-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { WidgetDTO, WidgetForm, WidgetFormSchema } from "@/types/widget";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { createNewWidget } from "@/app/store/slice/widgetSlice";
import { useToast } from "@/app/components/toast-provider";

type WidgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WidgetModal({
  isOpen,
  onClose,
}: WidgetModalProps) {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WidgetForm>({
    resolver: zodResolver(WidgetFormSchema),
    defaultValues: {
      widget_name: "",
      widget_type: 1,
      min_value: 0,
      max_value: 100,
    },
  });

  const onSubmit: SubmitHandler<WidgetForm> = async (data) => {
        const prepareData: WidgetDTO = {
            widget_name: data.widget_name,
            widget_type: data.widget_type,
            widget_setting: {
                min_value: data.min_value,
                max_value: data.max_value,
                current_value: 50,
            },
            status: isEnabled,
        };

        const response: any = await dispatch(createNewWidget(prepareData));
        
        if (response.payload.status) {
            toast({
              variant: "success",
              title: "Widget created successfully.",
              description: `${prepareData.widget_name} has been added.`,
            });
            onClose();
        } else {
            toast({
              variant: "error",
              title: "Create widget failed.",
              description: response.payload?.error ?? "Have something worning.",
            });
        }
  };
  

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

 

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <button
        type="button"
        aria-label="Close create widget modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[3px]"
      />

      <section className="relative z-10 w-full max-w-2xl rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--panel-bg)] p-6 shadow-[0_28px_90px_var(--shadow-strong)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Widget
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Create New Widget
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Define the widget metadata and deployment settings for the
              dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--panel-muted)] text-[var(--text-primary)]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Widget Name *"
              placeholder="Please enter widget name"
              {...register("widget_name")}
              error={errors.widget_name?.message}
            />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                Widget Type
              </span>
              <select
                {...register("widget_type", { valueAsNumber: true })}
                className="h-12 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-strong)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--accent-strong)_18%,transparent)]"
              >
                <option value={1}>Control</option>
              </select>
              {errors.widget_type?.message ? (
                <p className="mt-2 text-sm text-[var(--danger-text)]">
                  {errors.widget_type.message}
                </p>
              ) : null}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Min Value *"
              type="number"
              placeholder="Please enter min value"
              {...register("min_value", { valueAsNumber: true })}
              error={errors.min_value?.message}
            />
            <FormField
              type="number"
              label="Max Value *"
              placeholder="Please enter max value"
              {...register("max_value", { valueAsNumber: true })}
               error={errors.max_value?.message}
            />
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--panel-muted)] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Widget Status
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Turn the widget on or off before saving it.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => setIsEnabled((current) => !current)}
                className={`inline-flex h-11 w-[74px] items-center rounded-full border p-1 transition ${
                  isEnabled
                    ? "border-transparent bg-[var(--accent)]"
                    : "border-[var(--border-soft)] bg-[var(--surface-strong)]"
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-slate-900 transition-transform ${
                    isEnabled ? "translate-x-[30px]" : "translate-x-0"
                  }`}
                >
                  {isEnabled ? "On" : "Off"}
                </span>
              </button>
            </div>
          </div>

          {/* <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
              Description
            </span>
            <textarea
              name="description"
              rows={5}
              placeholder="Describe the widget purpose and where it should be used."
              className="w-full rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-strong)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--accent-strong)_18%,transparent)]"
            />
          </label> */}

          <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-soft)] pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="sm:w-auto"
              colorClassName="border border-[var(--border-soft)] bg-transparent text-[var(--text-primary)]"
            >
              Cancel
            </Button>
            <Button type="submit" className="sm:w-auto">
              Save Widget
            </Button>
          </div>
        </form>
      </section>
    </div>,
    document.body
  );
}
