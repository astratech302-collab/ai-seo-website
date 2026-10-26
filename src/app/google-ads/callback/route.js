import { NextResponse } from "next/server";
import { STATE_COOKIE, CONN_COOKIE, cookieOpts, mapper } from "@/lib/googleAds";
import { SITE_URL } from "@/config/site";

// Registered Google OAuth redirect URI (ADS_REDIRECT_URI = https://geobuild.in/google-ads/callback).
// Verifies the state belongs to THIS browser, forwards state+code to the mapper server-to-server,
// stores the resulting connection_id in an httpOnly cookie, then redirects to the UI.
export async function GET(request) {
  const q = new URL(request.url).searchParams;
  const state = q.get("state") || "";
  const done = (status) => {
    const res = NextResponse.redirect(new URL(`/google-ads?${status}`, SITE_URL));
    res.cookies.delete(STATE_COOKIE);
    return res;
  };

  if (!state || request.cookies.get(STATE_COOKIE)?.value !== state) return done("error=state");

  const params = new URLSearchParams({ state });
  if (q.get("code")) params.set("code", q.get("code"));
  if (q.get("error")) params.set("error", q.get("error"));

  try {
    const res = await mapper(`/oauth/callback?${params}`);
    if (!res.ok) return done("error=denied");
    const { connection_id } = await res.json();
    const out = done("connected=1");
    out.cookies.set(CONN_COOKIE, connection_id, cookieOpts(60 * 60 * 24 * 30));
    return out;
  } catch {
    return done("error=unreachable");
  }
}
