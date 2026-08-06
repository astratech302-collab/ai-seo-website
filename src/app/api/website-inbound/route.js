import { API_URL } from "@/config/site";

// Same-origin proxy for the inbound-lead endpoint.
// The browser can't POST to api.geobuild.in directly: the API's CORS allowlist
// only contains localhost, so the preflight 400s in production and fetch fails.
// Forwarding server-side sidesteps CORS entirely (no preflight, no Origin check).
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ detail: "Invalid request body" }, { status: 400 });
  }

  let upstream;
  try {
    upstream = await fetch(`${API_URL}/website-inbound`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { detail: "Couldn't reach the server. Please try again." },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => ({}));
  return Response.json(data, { status: upstream.status });
}
