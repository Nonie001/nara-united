"use client";

import { useActionState } from "react";
import { Button } from "@/components/shared/Button";
import { submitContact, type ContactState } from "./actions";

const initial: ContactState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div>
        <label htmlFor="c-name" className="block text-sm font-medium mb-1">
          ชื่อ-นามสกุล <span className="text-nara-red">*</span>
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30"
        />
        {state.errors?.name?.[0] ? (
          <p className="mt-1 text-xs text-nara-red">{state.errors.name[0]}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="c-email" className="block text-sm font-medium mb-1">
          อีเมล <span className="text-nara-red">*</span>
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30"
        />
        {state.errors?.email?.[0] ? (
          <p className="mt-1 text-xs text-nara-red">{state.errors.email[0]}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="c-subject" className="block text-sm font-medium mb-1">
          หัวข้อ
        </label>
        <input
          id="c-subject"
          name="subject"
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30"
        />
      </div>

      <div>
        <label htmlFor="c-message" className="block text-sm font-medium mb-1">
          ข้อความ <span className="text-nara-red">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30"
        />
        {state.errors?.message?.[0] ? (
          <p className="mt-1 text-xs text-nara-red">
            {state.errors.message[0]}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
        </Button>
        {state.message ? (
          <span
            className={
              state.ok
                ? "text-sm text-green-700"
                : "text-sm text-nara-red"
            }
          >
            {state.message}
          </span>
        ) : null}
      </div>
    </form>
  );
}
