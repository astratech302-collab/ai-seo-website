import { cookies } from "next/headers";

// Server-side only: talks to the Google Ads mapper service (google-ads-mapper/).
// The X-API-Key never reaches the browser.
const BASE = process.env.GOOGLE_ADS_MAPPER_URL;
const KEY = process.env.GOOGLE_ADS_MAPPER_KEY;

export const CONN_COOKIE = "gads_conn";
export const STATE_COOKIE = "gads_state";

export const cookieOpts = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge,
});

export const configured = () => Boolean(BASE && KEY);

export async function mapper(path, init = {}) {
  return fetch(`${BASE}${path}`, {
    ...init,
    headers: { "X-API-Key": KEY, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
    signal: AbortSignal.timeout(130_000), // reports are synchronous, can take ~2 min
  });
}

export async function connectionId() {
  return (await cookies()).get(CONN_COOKIE)?.value;
}
