import { cookies } from "next/headers";
import {
  CONN_COOKIE,
  STATE_COOKIE,
  configured,
  connectionId,
  cookieOpts,
  mapper,
} from "@/lib/googleAds";

// Same-origin gateway to the Google Ads mapper. The connection ID lives in an httpOnly
// cookie, so a browser can only act on the connection it connected itself.
// ponytail: cookie = identity. When customer login exists, store connection_id per user in the DB instead.

const ID_RE = /^[\w-]{8,100}$/;
const out = (data, status = 200) => Response.json(data, { status });
const relay = async (res) => out(await res.json().catch(() => ({})), res.status);

async function handle(request, { params }) {
  const { action } = await params;
  const method = request.method;
  if (!configured()) return out({ detail: "Google Ads is not configured" }, 503);

  try {
    if (action === "start" && method === "POST") {
      const res = await mapper("/oauth/start", { method: "POST" });
      if (res.status === 409) {
        // Mapper in mock mode (local dev): skip Google, create a synthetic connection.
        const mock = await mapper("/connections/mock", { method: "POST" });
        if (!mock.ok) return relay(mock);
        (await cookies()).set(CONN_COOKIE, (await mock.json()).connection_id, cookieOpts(60 * 60 * 24));
        return out({ connected: true });
      }
      if (!res.ok) return relay(res);
      const data = await res.json();
      const state = new URL(data.authorization_url).searchParams.get("state");
      (await cookies()).set(STATE_COOKIE, state, cookieOpts(600));
      return out({ authorization_url: data.authorization_url });
    }

    const id = await connectionId();
    if (action === "status" && method === "GET") return out({ connected: Boolean(id) });
    if (!id || !ID_RE.test(id)) return out({ detail: "Not connected" }, 401);
    const base = `/connections/${encodeURIComponent(id)}`;

    if (action === "accounts" && method === "GET") return relay(await mapper(`${base}/accounts`));
    if (action === "accounts" && method === "PUT") {
      const body = await request.json();
      return relay(await mapper(`${base}/accounts`, { method: "PUT", body: JSON.stringify(body) }));
    }
    if (action === "report" && method === "POST") {
      const { customer_id } = await request.json();
      return relay(
        await mapper(`${base}/reports`, {
          method: "POST",
          body: JSON.stringify({ customer_id, follow_redirects: false }),
        })
      );
    }
    if (action === "report" && method === "GET") {
      const { searchParams } = new URL(request.url);
      const reportId = searchParams.get("id");
      if (!ID_RE.test(reportId || "")) return out({ detail: "Bad report id" }, 422);
      const csv = searchParams.get("format") === "csv";
      const res = await mapper(`${base}/reports/${encodeURIComponent(reportId)}${csv ? "?format=csv" : ""}`);
      if (!csv || !res.ok) return relay(res);
      return new Response(await res.text(), {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="google-ads-landing-pages.csv"',
        },
      });
    }
    if (action === "disconnect" && method === "DELETE") {
      const res = await mapper(base, { method: "DELETE" });
      if (res.ok || res.status === 404) (await cookies()).delete(CONN_COOKIE);
      return relay(res);
    }
  } catch {
    return out({ detail: "Couldn't reach the Google Ads service. Please try again." }, 502);
  }
  return out({ detail: "Not found" }, 404);
}

export { handle as GET, handle as POST, handle as PUT, handle as DELETE };
