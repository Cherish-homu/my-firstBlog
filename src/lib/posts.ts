import { prisma } from "@/lib/prisma";
import { samplePosts } from "@/lib/sample-posts";

export async function getPublishedPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return samplePosts.map((post, index) => ({
      id: index + 1,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug }
    });
  } catch {
    const post = samplePosts.find((item) => item.slug === slug);
    if (!post) return null;

    return {
      id: 1,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
