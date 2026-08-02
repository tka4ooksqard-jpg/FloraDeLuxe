"use server";

import {
  leadSchema,
  type LeadActionState,
  type LeadFieldName,
  type LeadValues,
} from "@/lib/validation/lead";

/**
 * Delivery stub for wholesale enquiry leads.
 *
 * Not wired to any inbox, database or Telegram bot yet. The public site does
 * not render LeadForm — visitors order via Telegram CTA. Keep this action and
 * the Zod schema for the future go-live.
 *
 * To go live, implement `deliverLead` (e.g. Telegram Bot API) and mount
 * LeadForm again on home/contacts:
 *
 *   await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: formatLead(lead) }),
 *   });
 */
async function deliverLead(_lead: LeadValues): Promise<void> {
  throw new Error("Lead delivery is not configured.");
}

export async function submitLead(
  _previousState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name") ?? "",
    company: formData.get("company") ?? "",
    phone: formData.get("phone") ?? "",
    telegram: formData.get("telegram") ?? "",
    city: formData.get("city") ?? "",
    budget: formData.get("budget") ?? "",
    categories: formData.getAll("categories").map(String),
    comment: formData.get("comment") ?? "",
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<LeadFieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field as LeadFieldName] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Перевірте, будь ласка, виділені поля.",
      fieldErrors,
    };
  }

  // A filled honeypot is silently accepted so bots get no useful signal.
  if (parsed.data.website) {
    return { status: "success", message: "Дякуємо! Заявку прийнято." };
  }

  try {
    await deliverLead(parsed.data);
  } catch {
    return {
      status: "error",
      message: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть у Telegram.",
    };
  }

  return {
    status: "success",
    message:
      "Дякуємо! Заявку прийнято. Менеджер зв’яжеться з вами, щоб надіслати прайс і узгодити умови.",
  };
}
