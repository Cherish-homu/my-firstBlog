"use client";

import { useState } from "react";

type SubmitState =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialState: SubmitState = {
  type: "idle",
  message: "填写后点击提交，你的留言会保存到数据库里。"
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>(initialState);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitState(initialState);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmitState({
          type: "error",
          message: result.message ?? "提交失败，请稍后再试。"
        });
        return;
      }

      setSubmitState({
        type: "success",
        message: result.message ?? "留言提交成功。"
      });
      const form = document.getElementById("contact-form") as HTMLFormElement | null;
      form?.reset();
    } catch {
      setSubmitState({
        type: "error",
        message: "网络请求失败，请检查服务是否正在运行。"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="glass-card space-y-5 p-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="name">
          你的名字
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400"
          placeholder="例如：Cherish"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="email">
          邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400"
          placeholder="例如：you@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="content">
          留言内容
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={6}
          className="w-full rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400"
          placeholder="例如：你好，我很喜欢你的博客，想和你交流 Next.js / 后端 / Agent 学习路线。"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 px-6 py-3 font-medium text-white shadow-lg shadow-fuchsia-900/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "提交中..." : "提交留言"}
      </button>

      <p
        className={
          submitState.type === "error"
            ? "text-sm text-rose-200"
            : submitState.type === "success"
              ? "text-sm text-emerald-200"
              : "text-sm text-slate-200/80"
        }
      >
        {submitState.message}
      </p>
    </form>
  );
}
