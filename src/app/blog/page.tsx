import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="anime-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold text-white">博客文章</h1>
        <p className="mt-4 text-slate-200">
          现在这里优先读取数据库；如果数据库还没初始化，会自动回退到示例文章。
        </p>

        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card p-6">
              <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-slate-100/85">{post.excerpt}</p>
              <p className="mt-4 text-sm text-pink-100/80">slug: {post.slug}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                阅读详情
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
