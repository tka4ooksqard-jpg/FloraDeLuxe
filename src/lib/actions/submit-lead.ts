"use server";

import { siteConfig } from "@/lib/site-config";
import {
  leadSchema,
  type LeadActionState,
  type LeadFieldName,
  type LeadValues,
} from "@/lib/validation/lead";

const DEMO_FORM_MESSAGE =
  "Форма працює в тестовому режимі. Для замовлення напишіть нам у Telegram.";

/**
 * Delivery stub for wholesale enquiry leads.
 *
 * While `siteConfig.isDemo` is true the payload is validated and then discarded:
 * nothing is stored, emailed, or sent to Telegram. Personal data is never logged.
 *
 * To go live: implement real delivery here, then set `siteConfig.isDemo = false`
 * and `reviewsAreDemo = false`. Example Telegram Bot API call:
 *
 *   await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: formatLead(lead) }),
 *   });
 */
async function deliverLead(_lead: LeadValues): Promise<void> {
  if (siteConfig.isDemo) {
    // Keep a short pause so the pending UI remains observable during demos.
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  throw new Error("Lead delivery is not configured. Keep siteConfig.isDemo = true until go-live.");
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
    return siteConfig.isDemo
      ? { status: "demo", message: DEMO_FORM_MESSAGE }
      : { status: "success", message: "Дякуємо! Заявку прийнято." };
  }

  try {
    await deliverLead(parsed.data);
  } catch {
    return {
      status: "error",
      message: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть у Telegram.",
    };
  }

  if (siteConfig.isDemo) {
    return { status: "demo", message: DEMO_FORM_MESSAGE };
  }

  return {
    status: "success",
    message:
      "Дякуємо! Заявку прийнято. Менеджер зв’яжеться з вами, щоб надіслати прайс і узгодити умови.",
  };
}
