"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";

const ERRORS = {
  state: "That connection attempt expired or came from another browser. Please try again.",
  denied: "Google access wasn't granted. Please try again.",
  unreachable: "Couldn't reach the server. Please try again.",
};

async function api(path, init) {
  const res = await fetch(`/api/google-ads/${path}`, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.detail || "Something went wrong"), { status: res.status });
  return data;
}
const json = (method, body) => ({ method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

export default function GoogleAdsConnect() {
  const [connected, setConnected] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [picked, setPicked] = useState([]);
  const [report, setReport] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const fail = (e) => {
    if (e.status === 401) setConnected(false);
    setError(e.message);
  };

  const loadAccounts = async () => {
    const list = await api("accounts");
    setAccounts(list);
    setPicked(list.filter((a) => !a.manager).slice(0, 1).map((a) => a.customer_id));
  };

  useEffect(() => {
    api("status")
      .then(async (s) => {
        const err = new URLSearchParams(window.location.search).get("error");
        if (err) setError(ERRORS[err] || ERRORS.denied);
        setConnected(s.connected);
        if (s.connected) await loadAccounts();
      })
      .catch((e) => {
        setConnected(false);
        fail(e);
      });
  }, []);

  const run = (label, fn) => async () => {
    setBusy(label);
    setError("");
    try {
      await fn();
    } catch (e) {
      fail(e);
    }
    setBusy("");
  };

  const connect = run("connect", async () => {
    track("button_clicked/connect_google_ads_google_ads_page");
    const { authorization_url, connected } = await api("start", { method: "POST" });
    if (connected) {
      setConnected(true);
      await loadAccounts();
      return;
    }
    window.location.assign(authorization_url);
  });

  const generate = run("report", async () => {
    track("button_clicked/generate_report_google_ads_page", { accounts: picked.length });
    await api("accounts", json("PUT", { customer_ids: picked }));
    const results = [];
    for (const customer_id of picked) {
      const r = await api("report", json("POST", { customer_id }));
      results.push({ customer_id, report_id: r.report_id, report: r.report });
    }
    setReport(results);
  });

  const disconnect = run("disconnect", async () => {
    track("button_clicked/disconnect_google_ads_page");
    await api("disconnect", { method: "DELETE" });
    setConnected(false);
    setAccounts([]);
    setReport(null);
  });

  const card = { border: "1px solid var(--line)", borderRadius: "var(--r)", padding: 24, marginBottom: 24 };

  if (connected === null) return <p style={{ color: "var(--ink-2)" }}>Loading…</p>;

  return (
    <div>
      {error && (
        <p role="alert" style={{ ...card, borderColor: "var(--brand)", color: "var(--ink-2)" }}>
          {error}
        </p>
      )}

      {!connected ? (
        <div style={card}>
          <button className="btn btn-primary" onClick={connect} disabled={busy === "connect"}>
            {busy === "connect" ? "Redirecting…" : "Connect Google Ads"}
          </button>
        </div>
      ) : (
        <>
          <div style={card}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Choose accounts to share</h2>
            {accounts.map((a) => (
              <label key={a.customer_id} style={{ display: "block", marginBottom: 8, opacity: a.manager ? 0.5 : 1 }}>
                <input
                  type="checkbox"
                  disabled={a.manager}
                  checked={picked.includes(a.customer_id)}
                  onChange={(e) =>
                    setPicked((p) => (e.target.checked ? [...p, a.customer_id] : p.filter((x) => x !== a.customer_id)))
                  }
                />{" "}
                {a.name} <span className="mono">({a.customer_id})</span>
                {a.manager && " — manager account, pick its child accounts"}
              </label>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button className="btn btn-primary" onClick={generate} disabled={!picked.length || busy === "report"}>
                {busy === "report" ? "Generating (can take a minute)…" : "Generate report"}
              </button>
              <button className="btn btn-ghost" onClick={disconnect} disabled={busy === "disconnect"}>
                Disconnect
              </button>
            </div>
          </div>

          {report?.map(({ customer_id, report_id, report: r }) => (
            <div key={report_id} style={card}>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                Account <span className="mono">{customer_id}</span> — {r.landing_pages.length} landing pages,{" "}
                {r.unmapped_ads.length} unmapped
              </h2>
              <ul style={{ marginBottom: 16 }}>
                {r.landing_pages.map((lp) => (
                  <li key={lp.normalized_key} style={{ marginBottom: 4 }}>
                    <span className="mono">{lp.landing_page}</span> — {lp.ad_count} ad{lp.ad_count === 1 ? "" : "s"}
                  </li>
                ))}
              </ul>
              <a
                className="btn btn-ghost"
                href={`/api/google-ads/report?id=${encodeURIComponent(report_id)}&format=csv`}
                onClick={() => track("link_clicked/download_csv_google_ads_page")}
              >
                Download CSV
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
