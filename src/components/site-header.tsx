import type { Route } from "next";
import Link from "next/link";

const links = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/about", label: "关于我" },
  { href: "/contact", label: "留言板" },
  { href: "/dashboard/messages", label: "后台" },
  { href: "/assistant", label: "AI 助手" }
] satisfies Array<{ href: Route; label: string }>;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/45 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-300/40 bg-gradient-to-br from-pink-300/50 via-violet-300/35 to-sky-300/40 text-sm shadow-lg shadow-pink-500/10">
            ✦
          </span>
          <span>
            My AI Blog
            <span className="ml-2 text-sm font-normal text-pink-200/80">二次元模式</span>
          </span>
        </Link>
        <nav className="flex gap-5 text-sm text-slate-200">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
