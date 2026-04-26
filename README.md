# My AI Blog

一个面向新手的全栈个人博客项目：

- Next.js
- Tailwind CSS
- Prisma
- SQLite
- OpenAI（稍后接入）

## 当前进度

目前已经手动创建了项目骨架。由于网络问题，依赖还没有下载安装。

## 下一步

1. 安装依赖：`npm install`
2. 复制环境变量：`cp .env.example .env`
3. 初始化数据库：`npx prisma migrate dev --name init`
4. 启动开发环境：`npm run dev`

## 后台登录

- 登录页：`/admin/login`
- 后台页：`/dashboard/messages`
- 账号密码从 `.env` 的 `ADMIN_USERNAME` / `ADMIN_PASSWORD` 读取

## 搜索引擎收录准备

- 自动生成站点地图：`/sitemap.xml`
- 自动生成爬虫规则：`/robots.txt`
- 站点域名来源：`.env` 的 `NEXT_PUBLIC_SITE_URL`
