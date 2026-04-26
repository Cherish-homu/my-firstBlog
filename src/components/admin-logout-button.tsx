"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleLogout}
      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "退出中..." : "退出登录"}
    </button>
  );
}
