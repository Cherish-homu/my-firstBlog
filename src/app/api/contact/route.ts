import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ContactPayload = {
  name?: string;
  email?: string;
  content?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  const name = body.name?.trim();
  const email = body.email?.trim();
  const content = body.content?.trim();

  if (!name || !email || !content) {
    return NextResponse.json(
      { message: "名字、邮箱和留言内容都不能为空。" },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json({ message: "请输入正确的邮箱地址。" }, { status: 400 });
  }

  await prisma.message.create({
    data: {
      name,
      email,
      content
    }
  });

  return NextResponse.json({
    message: "留言已成功保存到数据库。"
  });
}
