import { z } from "zod";

import { categoryNames } from "@/lib/content/categories";

export const budgetRanges = [
  "До 5 000 грн",
  "5 000 – 15 000 грн",
  "15 000 – 40 000 грн",
  "Понад 40 000 грн",
  "Поки складно оцінити",
] as const;

export type BudgetRange = (typeof budgetRanges)[number];

const requiredText = (field: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, { message: `${field}: щонайменше ${min} символи.` })
    .max(max, { message: `${field}: не більше ${max} символів.` });

/**
 * Shared by the client (React Hook Form resolver) and the Server Action, so a
 * request that skips the browser is validated by exactly the same rules.
 */
export const leadSchema = z.object({
  name: requiredText("Ім’я", 2, 80),
  company: requiredText("Назва бізнесу", 2, 120),
  phone: z
    .string()
    .trim()
    .min(9, { message: "Вкажіть номер телефону — щонайменше 9 цифр." })
    .max(24, { message: "Номер задовгий." })
    .regex(/^[0-9+()\-\s]+$/, { message: "Телефон може містити лише цифри, пробіли та символи + ( ) -." }),
  telegram: z
    .string()
    .trim()
    .max(64, { message: "Username задовгий." })
    .regex(/^@?[A-Za-z0-9_]{4,32}$/, {
      message: "Формат username: 4–32 символи, латиниця, цифри або підкреслення.",
    })
    .optional()
    .or(z.literal("")),
  city: requiredText("Місто", 2, 80),
  /**
   * Kept as a plain string rather than `z.enum` so the select can start empty
   * and still report a helpful message instead of a type mismatch.
   */
  budget: z
    .string()
    .min(1, { message: "Оберіть орієнтовну суму закупівлі." })
    .refine((value) => (budgetRanges as readonly string[]).includes(value), {
      message: "Оберіть суму зі списку.",
    }),
  categories: z
    .array(z.string())
    .min(1, { message: "Оберіть хоча б одну категорію." })
    .refine((values) => values.every((value) => categoryNames.includes(value)), {
      message: "Невідома категорія.",
    }),
  comment: z
    .string()
    .trim()
    .max(1000, { message: "Коментар не більше 1000 символів." })
    .optional()
    .or(z.literal("")),
  consent: z.boolean().refine((value) => value, {
    message: "Потрібна згода на обробку персональних даних.",
  }),
  /**
   * Honeypot. It is hidden from real users, so any value means a bot — the
   * action treats a filled field as a silent no-op rather than an error, which
   * gives automated submitters no signal to adapt to.
   */
  website: z.string().optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadValues = z.output<typeof leadSchema>;

export type LeadFieldName = keyof LeadValues;

export type LeadActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<LeadFieldName, string>>;
    };
