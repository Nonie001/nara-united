"use client";

import { useActionState } from "react";
import { Button } from "@/components/shared/Button";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          อีเมล
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          รหัสผ่าน
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30"
        />
      </div>

      {state.message ? (
        <p className="text-sm text-nara-red">{state.message}</p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </Button>
    </form>
  );
}
