"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { CtaArrow } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldMessage, Input, Label, Select, Textarea } from "@/components/ui/field";
import { submitLead } from "@/lib/actions/submit-lead";
import { categoryNames } from "@/lib/content/categories";
import { ctaLabels } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";
import {
  budgetRanges,
  leadSchema,
  type LeadActionState,
  type LeadFieldName,
  type LeadValues,
} from "@/lib/validation/lead";
import { cn } from "@/lib/utils";

const defaultValues: LeadValues = {
  name: "",
  company: "",
  phone: "",
  telegram: "",
  city: "",
  budget: "",
  categories: [],
  comment: "",
  consent: false,
  website: "",
};

export function LeadForm() {
  const formId = useId();
  const [state, setState] = useState<LeadActionState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues,
    mode: "onTouched",
  });

  const fieldId = (name: LeadFieldName) => `${formId}-${name}`;
  const messageId = (name: LeadFieldName) => `${formId}-${name}-message`;

  const describedBy = (name: LeadFieldName, hasHint = false) =>
    errors[name] || hasHint ? messageId(name) : undefined;

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("company", values.company);
    formData.set("phone", values.phone);
    formData.set("telegram", values.telegram ?? "");
    formData.set("city", values.city);
    formData.set("budget", values.budget);
    formData.set("comment", values.comment ?? "");
    formData.set("consent", String(values.consent));
    formData.set("website", values.website ?? "");
    for (const category of values.categories) {
      formData.append("categories", category);
    }

    startTransition(async () => {
      const result = await submitLead({ status: "idle" }, formData);
      setState(result);

      if (result.status === "error" && result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          setError(field as LeadFieldName, { type: "server", message });
        }
      }

      if (result.status === "success") {
        reset(defaultValues);
      }
    });
  });

  return (
    <section
      id="lead-form"
      aria-labelledby="lead-form-title"
      className="section-canvas-light relative scroll-mt-24"
    >
      <div className="container-hero section-y relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="lead-form-title"
              eyebrow="Заявка"
              title="Отримати умови співпраці"
              description="Залиште контакти — менеджер надішле актуальний прайс і узгодить умови під ваш формат закупівлі."
            />

            <Reveal delay={100} className="mt-8">
              <div className="group relative aspect-4/5 max-w-md overflow-hidden rounded-[1.75rem]">
                <Image
                  src={sceneImages.finalCta.src}
                  alt={sceneImages.finalCta.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="media-grade media-zoom object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-7">
              <ul className="text-muted space-y-3 text-[0.9375rem] leading-relaxed">
                <li>Відповідаємо в робочий час у Telegram або телефоном.</li>
                <li>Прайс надсилається без зобов’язань щодо замовлення.</li>
                <li>
                  Дані використовуються лише для зв’язку — деталі в{" "}
                  <Link
                    href="/privacy"
                    className="text-bordeaux underline decoration-1 underline-offset-4"
                  >
                    політиці конфіденційності
                  </Link>
                  .
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <form
              noValidate
              onSubmit={onSubmit}
              className="rounded-[1.75rem] border border-[rgba(35,7,13,0.08)] bg-[rgba(246,243,239,0.78)] p-6 shadow-soft backdrop-blur-[18px] sm:p-8"
            >
              {/* Honeypot: hidden from users and assistive tech, visible to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={fieldId("website")}>Не заповнюйте це поле</label>
                <input
                  id={fieldId("website")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor={fieldId("name")}>Ім’я *</Label>
                  <Input
                    id={fieldId("name")}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy("name")}
                    {...register("name")}
                  />
                  <FieldMessage id={messageId("name")} message={errors.name?.message} />
                </div>

                <div>
                  <Label htmlFor={fieldId("company")}>Назва магазину / бізнесу *</Label>
                  <Input
                    id={fieldId("company")}
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={describedBy("company")}
                    {...register("company")}
                  />
                  <FieldMessage id={messageId("company")} message={errors.company?.message} />
                </div>

                <div>
                  <Label htmlFor={fieldId("phone")}>Телефон *</Label>
                  <Input
                    id={fieldId("phone")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+380 __ ___ __ __"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={describedBy("phone")}
                    {...register("phone")}
                  />
                  <FieldMessage id={messageId("phone")} message={errors.phone?.message} />
                </div>

                <div>
                  <Label htmlFor={fieldId("telegram")}>Telegram username</Label>
                  <Input
                    id={fieldId("telegram")}
                    placeholder="@username"
                    autoComplete="off"
                    aria-invalid={Boolean(errors.telegram)}
                    aria-describedby={describedBy("telegram", true)}
                    {...register("telegram")}
                  />
                  <FieldMessage
                    id={messageId("telegram")}
                    message={errors.telegram?.message}
                    hint="Необов’язково — але так відповідь буде швидшою."
                  />
                </div>

                <div>
                  <Label htmlFor={fieldId("city")}>Місто *</Label>
                  <Input
                    id={fieldId("city")}
                    autoComplete="address-level2"
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={describedBy("city")}
                    {...register("city")}
                  />
                  <FieldMessage id={messageId("city")} message={errors.city?.message} />
                </div>

                <div>
                  <Label htmlFor={fieldId("budget")}>Орієнтовна сума закупівлі *</Label>
                  <Select
                    id={fieldId("budget")}
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={describedBy("budget")}
                    {...register("budget")}
                  >
                    <option value="">Оберіть діапазон</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </Select>
                  <FieldMessage id={messageId("budget")} message={errors.budget?.message} />
                </div>
              </div>

              <fieldset className="mt-6">
                <legend className="text-graphite mb-3 text-sm font-medium">
                  Категорії, які цікавлять *
                </legend>
                <Controller
                  control={control}
                  name="categories"
                  render={({ field }) => (
                    <div
                      className="flex flex-wrap gap-2"
                      aria-describedby={describedBy("categories")}
                    >
                      {categoryNames.map((category) => {
                        const checked = field.value.includes(category);
                        return (
                          <label
                            key={category}
                            className={cn(
                              "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-[14px] border px-4 py-2",
                              "text-[0.9375rem] transition-colors duration-300",
                              checked
                                ? "border-[rgba(213,175,99,0.45)] bg-[rgba(213,175,99,0.1)] text-bordeaux-deep"
                                : "border-line-strong text-graphite hover:border-[rgba(213,175,99,0.35)]",
                            )}
                          >
                            <Checkbox
                              checked={checked}
                              aria-invalid={Boolean(errors.categories)}
                              onCheckedChange={(value) => {
                                field.onChange(
                                  value === true
                                    ? [...field.value, category]
                                    : field.value.filter((item) => item !== category),
                                );
                              }}
                              onBlur={field.onBlur}
                            />
                            {category}
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
                <FieldMessage id={messageId("categories")} message={errors.categories?.message} />
              </fieldset>

              <div className="mt-6">
                <Label htmlFor={fieldId("comment")}>Коментар</Label>
                <Textarea
                  id={fieldId("comment")}
                  rows={4}
                  placeholder="Формат закупівлі, періодичність, побажання щодо позицій…"
                  aria-invalid={Boolean(errors.comment)}
                  aria-describedby={describedBy("comment")}
                  {...register("comment")}
                />
                <FieldMessage id={messageId("comment")} message={errors.comment?.message} />
              </div>

              <div className="mt-6">
                <Controller
                  control={control}
                  name="consent"
                  render={({ field }) => (
                    <label className="text-graphite flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed">
                      <span className="pt-0.5">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(value) => field.onChange(value === true)}
                          onBlur={field.onBlur}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={describedBy("consent")}
                        />
                      </span>
                      <span>
                        Погоджуюсь на обробку персональних даних відповідно до{" "}
                        <Link
                          href="/privacy"
                          className="text-bordeaux underline decoration-1 underline-offset-4"
                        >
                          політики конфіденційності
                        </Link>
                        .
                      </span>
                    </label>
                  )}
                />
                <FieldMessage id={messageId("consent")} message={errors.consent?.message} />
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" disabled={isPending} className="sm:w-auto">
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" />
                      Надсилаємо…
                    </>
                  ) : (
                    <>
                      {ctaLabels.terms}
                      <CtaArrow />
                    </>
                  )}
                </Button>
                <p className="text-muted text-[0.8125rem] leading-relaxed">
                  Поля, позначені *, обов’язкові.
                </p>
              </div>

              {/* Single live region announcing loading, success and error states. */}
              <div aria-live="polite" aria-atomic="true" className="mt-5 empty:mt-0">
                {isPending ? <p className="sr-only">Надсилаємо заявку…</p> : null}

                {!isPending && state.status === "success" ? (
                  <p className="border-forest/25 bg-forest/[0.06] text-forest flex items-start gap-3 rounded-[var(--radius-tile)] border p-4 text-[0.9375rem] leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    {state.message}
                  </p>
                ) : null}

                {!isPending && state.status === "error" ? (
                  <p className="border-bordeaux/30 bg-bordeaux/[0.05] text-bordeaux flex items-start gap-3 rounded-[var(--radius-tile)] border p-4 text-[0.9375rem] leading-relaxed">
                    <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    {state.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
