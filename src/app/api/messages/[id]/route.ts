import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { isAdminAuthenticatedFromRequest } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ message: "请先登录后台。" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ message: "无效的留言 id。" }, { status: 400 });
  }

  const body = (await request.json()) as { isRead?: boolean };

  if (typeof body.isRead !== "boolean") {
    return NextResponse.json({ message: "isRead 必须是布尔值。" }, { status: 400 });
  }

  try {
    const message = await prisma.message.update({
      where: { id: numericId },
      data: { isRead: body.isRead }
    });

    return NextResponse.json({
      message: body.isRead ? "留言已标记为已读。" : "留言已标记为未读。",
      data: message
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "留言不存在或已被删除。" }, { status: 404 });
    }

    return NextResponse.json({ message: "更新留言失败，请稍后重试。" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!isAdminAuthenticatedFromRequest(_request)) {
    return NextResponse.json({ message: "请先登录后台。" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ message: "无效的留言 id。" }, { status: 400 });
  }

  try {
    await prisma.message.delete({
      where: { id: numericId }
    });

    return NextResponse.json({
      message: "留言已删除。"
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "留言不存在或已被删除。" }, { status: 404 });
    }

    return NextResponse.json({ message: "删除留言失败，请稍后重试。" }, { status: 500 });
  }
}
