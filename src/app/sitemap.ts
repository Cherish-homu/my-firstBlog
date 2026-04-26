import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getPublishedPosts();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: new URL("/blog", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: new URL("/about", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: new URL("/contact", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: new URL("/assistant", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    }
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
    lastModified: post.updatedAt ?? post.createdAt ?? now,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [...staticPages, ...postPages];
}
