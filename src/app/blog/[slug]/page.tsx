import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getPostBySlug } from "@/lib/posts";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="anime-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/blog" className="text-sm text-pink-100/90 hover:text-white">
          ← 返回博客列表
        </Link>

        <article className="glass-card mt-6 p-8">
          <p className="text-sm text-pink-100/80">文章详情</p>
          <h1 className="mt-3 text-4xl font-bold text-white">{post.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-100/85">{post.excerpt}</p>
          <div className="mt-8 h-px bg-white/10" />
          <div className="prose prose-invert mt-8 max-w-none prose-p:text-slate-100/85">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
    </div>
  );
}
