import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ message: "文章不存在" }, { status: 404 });
  }

  return NextResponse.json(post);
}
