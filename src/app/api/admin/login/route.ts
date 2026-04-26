import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminCookieMaxAge,
  verifyAdminCredentials
} from "@/lib/admin-auth";

type LoginPayload = {
  username?: string;
  password?: string;
  next?: string;
};

function normalizeNextPath(nextValue: string | undefined) {
  if (!nextValue) return "/dashboard/messages";
  if (!nextValue.startsWith("/")) return "/dashboard/messages";
  if (nextValue.startsWith("//")) return "/dashboard/messages";
  if (nextValue.startsWith("/api")) return "/dashboard/messages";
  return nextValue;
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginPayload;

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");
  const redirectTo = normalizeNextPath(body.next);

  if (!username || !password) {
    return NextResponse.json({ message: "请输入账号和密码。" }, { status: 400 });
  }

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ message: "账号或密码错误。" }, { status: 401 });
  }

  const token = createAdminSessionToken(username);

  const response = NextResponse.json({
    message: "登录成功。",
    redirectTo
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminCookieMaxAge()
  });

  return response;
}
