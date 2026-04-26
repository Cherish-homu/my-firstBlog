const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(rawUrl: string | undefined) {
  const candidate = rawUrl?.trim() || LOCAL_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  const normalized = normalizeSiteUrl(raw);

  try {
    return new URL(normalized);
  } catch {
    return new URL(LOCAL_SITE_URL);
  }
}
