import z from "zod";


export const WidgetFormSchema = z.object({
    widget_name:        z.string().min(3).max(20),
    widget_type:        z.number().min(1),
    min_value:          z.number(),
    max_value:          z.number(),
});

export const WidgetDTOSchema = z.object({
    widget_name:        z.string().min(3).max(20),
    widget_type:        z.number().min(1),
    widget_setting:     z.any(),
    status:             z.boolean(),
});

export const WidgetSchema = z.object({
  id: z.number().int().positive(),
  widget_name: z.string(),
  widget_type: z.number().int().nonnegative(),
  widget_setting: z.string(),
  status: z.boolean().default(true),
  created_at: z.date().or(z.string().datetime()),
  updated_at: z.date().or(z.string().datetime()),
  deleted_at: z.date().or(z.string().datetime()).nullable().optional(),
});

export const WidgetResponseSchema = z.object({
  id: z.number().int().positive(),
  widget_name: z.string(),
  widget_type: z.string(),
  widget_setting: z.any(),
  status: z.boolean(),
});

export type Widget = z.infer<typeof WidgetSchema>;
export type WidgetDTO = z.infer<typeof WidgetDTOSchema>;
export type WidgetForm = z.infer<typeof WidgetFormSchema>;
export type WidgetResponse = z.infer<typeof WidgetResponseSchema>;

