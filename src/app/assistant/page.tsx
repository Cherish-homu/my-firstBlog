import { SiteHeader } from "@/components/site-header";

const prompts = [
  "这位作者写过哪些和后端入门相关的文章？",
  "请用简单的话解释一下 agent 是什么。",
  "如果我是新手，先看哪篇文章比较好？"
];

export default function AssistantPage() {
  return (
    <div className="anime-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold text-white">AI 博客助手</h1>
        <p className="mt-4 text-slate-200">
          这里会是我们后面要做的亮点功能：让访客能直接问你的博客内容。
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="glass-card p-6">
            <label className="mb-3 block text-sm font-medium text-slate-100">你的问题</label>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-white/15 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-400"
              placeholder="例如：请推荐 2 篇适合后端新手的文章"
              disabled
            />
            <button
              className="mt-4 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 px-5 py-3 text-sm font-medium text-white opacity-90"
              disabled
            >
              下一步我们再接入 OpenAI
            </button>
          </section>

          <aside className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">示例提问</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-100/85">
              {prompts.map((prompt) => (
                <li key={prompt} className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                  {prompt}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
