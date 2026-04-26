export const samplePosts = [
  {
    slug: "my-first-backend-note",
    title: "我第一次理解后端到底在做什么",
    excerpt: "用最简单的话解释接口、数据库和服务器在一个博客项目里的角色。",
    content:
      "后端可以理解为网站背后的大脑。前端负责展示页面，后端负责处理数据、保存文章、返回接口结果。对博客来说，后端最重要的工作包括读取文章列表、保存留言、以及管理文章内容。",
    tags: ["后端", "入门"]
  },
  {
    slug: "what-is-an-agent",
    title: "Agent 是什么：从博客助手开始理解",
    excerpt: "不用复杂概念，只从一个博客问答助手出发理解 agent。",
    content:
      "最简单的 agent 可以理解为：大模型 + 工具 + 规则。比如访客问博客里有哪些入门文章，AI 可以先调用搜索文章的工具，再整理成自然语言回答。",
    tags: ["Agent", "AI"]
  }
];
