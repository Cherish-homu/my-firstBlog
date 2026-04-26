"use client";

import { FormEvent, useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";

type SubmitState =
  | { type: "idle"; message: string }
  | { type: "error"; message: string };

const initialState: SubmitState = {
  type: "idle",
  message: "请输入后台账号和密码。"
};

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState(initialState);

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: String(formData.get("username") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      next: nextPath
    };

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string; redirectTo?: string };
      if (!response.ok) {
        setSubmitState({
          type: "error",
          message: result.message ?? "登录失败，请稍后重试。"
        });
        return;
      }

      router.replace((result.redirectTo ?? "/dashboard/messages") as Route);
      router.refresh();
    } catch {
      setSubmitState({
        type: "error",
        message: "网络请求失败，请检查服务是否正常。"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 p-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="username">
          账号
        </label>
        <input
          id="username"
          name="username"
          required
          autoComplete="username"
          className="w-full rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400"
          placeholder="例如：admin"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="password">
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400"
          placeholder="请输入密码"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 px-6 py-3 font-medium text-white shadow-lg shadow-fuchsia-900/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "登录中..." : "登录后台"}
      </button>

      <p
        className={
          submitState.type === "error" ? "text-sm text-rose-200" : "text-sm text-slate-200/80"
        }
      >
        {submitState.message}
      </p>
    </form>
  );
}
