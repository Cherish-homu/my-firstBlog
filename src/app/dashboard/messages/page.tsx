import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isValidAdminSessionToken } from "@/lib/admin-auth";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { MessagesAdminList } from "@/components/messages-admin-list";
import { SiteHeader } from "@/components/site-header";
import { getMessages } from "@/lib/messages";

export const metadata: Metadata = {
  title: "后台留言 | My AI Blog",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardMessagesPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionToken(sessionToken)) {
    redirect("/admin/login?next=/dashboard/messages");
  }

  const messages = await getMessages();
  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <div
      className="anime-shell min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/blog-bg.jpg')" }}
    >
      <div className="min-h-screen bg-[linear-gradient(180deg,rgba(20,24,48,0.62),rgba(14,17,37,0.9))]">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-pink-100/80">Mini Admin</p>
              <h1 className="mt-2 text-4xl font-bold text-white">后台留言助手</h1>
              <p className="mt-4 max-w-2xl text-slate-100/85">
                这里是你的第一个迷你后台页面。它会直接从 SQLite
                里读取访客提交的留言，帮助你理解“读取数据库 → 展示数据”这条完整链路。
              </p>
            </div>

            <div className="glass-card flex flex-col gap-4 px-6 py-4">
              <div>
                <p className="text-xs text-pink-100/80">总留言数</p>
                <p className="mt-1 text-3xl font-bold text-white">{messages.length}</p>
              </div>
              <div>
                <p className="text-xs text-pink-100/80">未读留言</p>
                <p className="mt-1 text-lg font-semibold text-amber-200">{unreadCount}</p>
              </div>
              <AdminLogoutButton />
            </div>
          </div>

          <MessagesAdminList
            initialMessages={messages.map((message) => ({
              ...message,
              createdAt: message.createdAt.toISOString()
            }))}
          />
        </main>
      </div>
    </div>
  );
}
