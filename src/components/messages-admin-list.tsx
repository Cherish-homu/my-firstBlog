"use client";

import { useMemo, useState } from "react";

type MessageItem = {
  id: number;
  name: string;
  email: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

export function MessagesAdminList({ initialMessages }: { initialMessages: MessageItem[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [statusText, setStatusText] = useState("你可以在这里标记留言已读，或者直接删除留言。");

  const unreadCount = useMemo(
    () => messages.filter((message) => !message.isRead).length,
    [messages]
  );

  async function toggleRead(message: MessageItem) {
    setBusyId(message.id);
    try {
      const response = await fetch(`/api/messages/${message.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isRead: !message.isRead })
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatusText(result.message ?? "更新失败。");
        return;
      }

      setMessages((current) =>
        current.map((item) =>
          item.id === message.id ? { ...item, isRead: !item.isRead } : item
        )
      );
      setStatusText(result.message ?? "状态已更新。");
    } catch {
      setStatusText("网络请求失败，状态没有更新。");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteMessage(message: MessageItem) {
    const confirmed = window.confirm(`确定要删除 ${message.name} 的这条留言吗？`);
    if (!confirmed) return;

    setBusyId(message.id);
    try {
      const response = await fetch(`/api/messages/${message.id}`, {
        method: "DELETE"
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatusText(result.message ?? "删除失败。");
        return;
      }

      setMessages((current) => current.filter((item) => item.id !== message.id));
      setStatusText(result.message ?? "留言已删除。");
    } catch {
      setStatusText("网络请求失败，删除没有完成。");
    } finally {
      setBusyId(null);
    }
  }

  if (messages.length === 0) {
    return (
      <section className="glass-card p-8 text-slate-100/85">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>还没有留言。你可以先去 /contact 提交一条测试消息，再回来看后台。</p>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-pink-100/90">
            未读 0 / 总计 0
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="glass-card flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-100/85">{statusText}</p>
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-pink-100/90">
          未读 {unreadCount} / 总计 {messages.length}
        </span>
      </div>

      {messages.map((message) => (
        <article key={message.id} className="glass-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-white">{message.name}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    message.isRead
                      ? "bg-emerald-400/15 text-emerald-200"
                      : "bg-amber-400/15 text-amber-200"
                  }`}
                >
                  {message.isRead ? "已读" : "未读"}
                </span>
              </div>
              <p className="mt-1 text-sm text-pink-100/85">{message.email}</p>
            </div>
            <p className="text-sm text-slate-200/70">{formatDate(message.createdAt)}</p>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-100/85">
            {message.content}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={busyId === message.id}
              onClick={() => toggleRead(message)}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busyId === message.id
                ? "处理中..."
                : message.isRead
                  ? "标记为未读"
                  : "标记为已读"}
            </button>
            <button
              type="button"
              disabled={busyId === message.id}
              onClick={() => deleteMessage(message)}
              className="rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm text-rose-100 hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              删除留言
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
