"use server";

import {
  leadSchema,
  type LeadActionState,
  type LeadFieldName,
  type LeadValues,
} from "@/lib/validation/lead";

/**
 * Mock submit handler for the wholesale enquiry form.
 *
 * The payload is validated server-side with the same Zod schema the browser
 * uses, then intentionally dropped: there is no inbox, database or Telegram
 * bot wired up yet. Personal data is never logged.
 *
 * To go live, implement `deliverLead` below — for example by calling the
 * Telegram Bot API with a token from the environment:
 *
 *   await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: formatLead(lead) }),
 *   });
 */
async function deliverLead(_lead: LeadValues): Promise<void> {
  // Simulates network latency so the loading state is observable in the UI.
  await new Promise((resolve) => setTimeout(resolve, 700));
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
