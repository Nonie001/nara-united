"use client";

import { useActionState } from "react";
import { Button } from "@/components/shared/Button";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-nara-ink placeholder:text-gray-400 transition focus:border-nara-gold focus:outline-none focus:ring-2 focus:ring-nara-gold/30";

const labelClass =
  "block text-[11px] font-bold tracking-[0.18em] uppercase text-nara-ink mb-1.5";

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}

      <div>
        <label htmlFor="email" className={labelClass}>
          อีเมล
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          รหัสผ่าน
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state.message ? (
        <p className="text-sm text-nara-red font-medium">{state.message}</p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </Button>
    </form>
  );
}
