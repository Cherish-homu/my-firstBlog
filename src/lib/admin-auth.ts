import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const ADMIN_SESSION_COOKIE = "admin_session";

type AdminSessionPayload = {
  username: string;
  iat: number;
  exp: number;
};

function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const secret =
    process.env.ADMIN_SESSION_SECRET ?? "dev-only-change-this-secret-at-least-32-chars";

  return { username, password, secret };
}

function sign(value: string) {
  const { secret } = getAdminConfig();
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function parseSession(token: string | undefined): AdminSessionPayload | null {
  if (!token) return null;

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const expectedSignature = sign(payloadPart);
  const givenBuffer = Buffer.from(signaturePart);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    givenBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(givenBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"));

    if (
      typeof payload?.username !== "string" ||
      typeof payload?.iat !== "number" ||
      typeof payload?.exp !== "number"
    ) {
      return null;
    }

    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;

  for (const part of cookieHeader.split(";")) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (rawKey !== name) continue;
    return decodeURIComponent(rest.join("="));
  }

  return undefined;
}

export function createAdminSessionToken(username: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    username,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS
  };

  const payloadPart = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(payloadPart);
  return `${payloadPart}.${signature}`;
}

export function isValidAdminSessionToken(token: string | undefined) {
  const payload = parseSession(token);
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) return false;

  return true;
}

export function isAdminAuthenticatedFromRequest(request: Request) {
  const token = getCookieValue(request.headers.get("cookie"), ADMIN_SESSION_COOKIE);
  return isValidAdminSessionToken(token);
}

export function verifyAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();
  return username === config.username && password === config.password;
}

export function getAdminCookieMaxAge() {
  return SESSION_MAX_AGE_SECONDS;
}

export function usingDefaultAdminCredentials() {
  const config = getAdminConfig();
  return (
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_SESSION_SECRET ||
    config.username === "admin" ||
    config.password === "admin123" ||
    config.secret === "dev-only-change-this-secret-at-least-32-chars"
  );
}
