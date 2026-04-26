import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  return (
    <div
      className="anime-shell min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/blog-bg.jpg')" }}
    >
      <div className="min-h-screen bg-[linear-gradient(180deg,rgba(20,24,48,0.58),rgba(14,17,37,0.9))]">
        <SiteHeader />
        <main className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass-card p-8">
            <p className="text-sm text-pink-100/80">Contact Me</p>
            <h1 className="mt-3 text-4xl font-bold text-white">给我留言</h1>
            <p className="mt-5 text-lg leading-8 text-slate-100/85">
              这一页是你博客里的第一个“真正可交互的后端功能”。
              访客填写表单后，数据会发到你的 API，再由后端保存进 SQLite 数据库。
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-100/80">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                1. 前端表单收集 name / email / content
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                2. POST 到 <code>/api/contact</code>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                3. 后端把数据写进 Message 表
              </div>
            </div>
          </section>

          <ContactForm />
        </main>
      </div>
    </div>
  );
}
