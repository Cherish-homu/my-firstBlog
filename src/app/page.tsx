import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <div
      className="anime-shell min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/blog-bg.jpg')" }}
    >
      <div className="min-h-screen bg-[linear-gradient(180deg,rgba(20,24,48,0.48),rgba(14,17,37,0.84))]">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-6 py-16">
          <section className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-pink-200/40 bg-white/10 px-4 py-1.5 text-sm text-pink-100 shadow-lg shadow-pink-500/10 backdrop-blur-md">
                ✨ 从 0 开始做个人博客
              </span>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                用一个真实项目，
                <span className="bg-gradient-to-r from-pink-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">
                  同时学习前端、后端和 Agent。
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-100/90">
                这个博客会展示我的文章、项目、联系方式，以及一个简单的 AI
                博客助手。它也是我学习全栈开发的第一站。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 px-6 py-3 font-medium text-white shadow-lg shadow-fuchsia-900/30 hover:brightness-110"
                >
                  阅读文章
                </Link>
                <Link
                  href="/assistant"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium text-slate-50 backdrop-blur-md hover:border-white/60 hover:bg-white/15"
                >
                  体验 AI 助手
                </Link>
              </div>

              <div className="grid max-w-2xl gap-4 pt-4 sm:grid-cols-3">
                {[
                  ["粉白霓虹", "视觉风格更像轻小说/动画主页"],
                  ["玻璃拟态", "卡片半透明，和背景角色更融合"],
                  ["AI 看板娘感", "后面还可以加对话助手气泡"]
                ].map(([title, desc]) => (
                  <div key={title} className="glass-card rounded-2xl p-4">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-2 text-xs leading-6 text-slate-100/80">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">第一版功能目标</h2>
                <span className="rounded-full bg-pink-300/20 px-3 py-1 text-xs text-pink-100">
                  Magical Dev
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-100/90">
                <li>• 博客首页、列表页、详情页</li>
                <li>• SQLite + Prisma 存储文章</li>
                <li>• 留言接口</li>
                <li>• 一个简单的博客问答助手</li>
              </ul>
            </div>
          </section>

          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">示例文章</h2>
              <Link href="/blog" className="text-sm text-pink-100 hover:text-white">
                查看全部 →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.slice(0, 2).map((post) => (
                <article key={post.slug} className="glass-card p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100">
                      #blog
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100">
                      #learning
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-100/85">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-block text-sm text-pink-100 hover:text-white"
                  >
                    阅读详情 →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
