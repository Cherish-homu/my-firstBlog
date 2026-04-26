import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";
import { SiteHeader } from "@/components/site-header";
import { usingDefaultAdminCredentials } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "后台登录 | My AI Blog",
  robots: {
    index: false,
    follow: false
  }
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

function normalizeNextPath(nextValue: string | undefined) {
  if (!nextValue) return "/dashboard/messages";
  if (!nextValue.startsWith("/")) return "/dashboard/messages";
  if (nextValue.startsWith("//")) return "/dashboard/messages";
  return nextValue;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = normalizeNextPath(params.next);
  const showDefaultHint = usingDefaultAdminCredentials();

  return (
    <div
      className="anime-shell min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/blog-bg.jpg')" }}
    >
      <div className="min-h-screen bg-[linear-gradient(180deg,rgba(20,24,48,0.58),rgba(14,17,37,0.9))]">
        <SiteHeader />
        <main className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass-card p-8">
            <p className="text-sm text-pink-100/80">Admin Login</p>
            <h1 className="mt-3 text-4xl font-bold text-white">后台登录</h1>
            <p className="mt-5 text-lg leading-8 text-slate-100/85">
              你现在需要先登录，才能访问留言后台和执行留言管理操作。
            </p>

            {showDefaultHint ? (
              <div className="mt-8 rounded-2xl border border-amber-200/20 bg-amber-300/10 p-4 text-sm text-amber-100/90">
                当前使用默认开发账号：
                <code className="mx-1 rounded bg-slate-900/40 px-1.5 py-0.5">admin</code>/
                <code className="mx-1 rounded bg-slate-900/40 px-1.5 py-0.5">admin123</code>
                。建议尽快在
                <code className="mx-1 rounded bg-slate-900/40 px-1.5 py-0.5">.env</code>
                里改成你自己的账号密码。
              </div>
            ) : null}
          </section>

          <AdminLoginForm nextPath={nextPath} />
        </main>
      </div>
    </div>
  );
}
