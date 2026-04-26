import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <div className="anime-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold text-white">关于我</h1>
        <div className="glass-card mt-6 space-y-4 p-6 text-slate-100/85">
          <p>你好，我正在学习如何用真实项目掌握前端、后端和 AI 应用开发。</p>
          <p>
            这个博客会记录我的学习笔记、项目经历，以及我如何一步步构建一个简单的 AI
            博客助手。
          </p>
        </div>
      </main>
    </div>
  );
}
