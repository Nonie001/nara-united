"use client";

import { useActionState } from "react";
import { Button } from "@/components/shared/Button";
import { submitContact, type ContactState } from "./actions";

const initial: ContactState = {};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-nara-ink placeholder:text-gray-400 transition focus:border-nara-gold focus:outline-none focus:ring-2 focus:ring-nara-gold/30";

const labelClass =
  "block text-[11px] font-bold tracking-[0.18em] uppercase text-nara-ink mb-1.5";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="c-name"
          name="name"
          label="ชื่อ-นามสกุล"
          required
          error={state.errors?.name?.[0]}
        />
        <Field
          id="c-email"
          name="email"
          label="อีเมล"
          type="email"
          required
          error={state.errors?.email?.[0]}
        />
      </div>

      <Field id="c-subject" name="subject" label="หัวข้อ" />

      <div>
        <label htmlFor="c-message" className={labelClass}>
          ข้อความ{" "}
          <span className="text-nara-red normal-case tracking-normal">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          className={inputClass}
          placeholder="พิมพ์ข้อความของคุณ…"
        />
        {state.errors?.message?.[0] ? (
          <p className="mt-1.5 text-xs text-nara-red font-medium">
            {state.errors.message[0]}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังส่ง..." : "ส่งข้อความ →"}
        </Button>
        {state.message ? (
          <span
            className={
              state.ok
                ? "text-sm text-green-700 font-medium"
                : "text-sm text-nara-red font-medium"
            }
          >
            {state.message}
          </span>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="text-nara-red normal-case tracking-normal"> *</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className={inputClass}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-nara-red font-medium">{error}</p>
      ) : null}
    </div>
  );
}
