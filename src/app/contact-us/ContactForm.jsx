"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CALENDLY_URL } from "@/config/site";

// Accepts bare domains (acme.com), www., and full URLs with optional path/query.
// Scheme is optional in input but normalised to https:// before sending to the API.
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/[\w\-./?%&=#]*)?$/;

const BUDGETS = ["Under $1,000/mo", "$1,000–2,500/mo", "$2,500–5,000/mo", "$5,000+/mo"];

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

function ensureCalendly() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.Calendly) return resolve();
    if (!document.getElementById("calendly-widget-js")) {
      const s = document.createElement("script");
      s.id = "calendly-widget-js";
      s.src = WIDGET_JS;
      s.async = true;
      s.onerror = () => reject(new Error("widget.js failed to load"));
      document.head.appendChild(s);
    }
    const start = Date.now();
    const t = setInterval(() => {
      if (window.Calendly) {
        clearInterval(t);
        resolve();
      } else if (Date.now() - start > 8000) {
        clearInterval(t);
        reject(new Error("Calendly never loaded"));
      }
    }, 50);
  });
}

function CalendlyInline({ prefillUrl }) {
  const [el, setEl] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!el) return;
    let cancelled = false;
    let raf;

    const inject = (attempt = 0) => {
      if (cancelled) return;
      const hasSize = el.offsetWidth > 0;
      if (!hasSize && attempt < 30) {
        raf = requestAnimationFrame(() => inject(attempt + 1));
        return;
      }
      el.innerHTML = "";
      window.Calendly.initInlineWidget({ url: prefillUrl, parentElement: el });
      setReady(true);
    };

    ensureCalendly()
      .then(() => { if (!cancelled) raf = requestAnimationFrame(() => inject()); })
      .catch((err) => console.error("[Calendly]", err));

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      el.innerHTML = "";
      setReady(false);
    };
  }, [el, prefillUrl]);

  return (
    <>
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <style>{`.gs-cal-embed iframe { width: 100%; height: 100%; border: 0; }`}</style>
      <div style={{ position: "relative" }}>
        {!ready && (
          <div
            className="mono"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink-3)",
              fontSize: 13,
              minHeight: 200,
            }}
          >
            Loading calendar…
          </div>
        )}
        <div
          ref={setEl}
          className="gs-cal-embed"
          style={{ width: "100%", height: "min(90vh, 820px)" }}
          aria-label="Calendly scheduling calendar"
        />
      </div>
    </>
  );
}

function InputField({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        style={{
          fontSize: 13.5,
          fontWeight: 500,
          color: "var(--ink)",
          display: "flex",
          gap: 3,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--brand)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const fieldStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1px solid var(--line)",
  background: "#fff",
  fontSize: 14.5,
  color: "var(--ink)",
  outline: "none",
  transition: "border-color .15s",
  boxSizing: "border-box",
};

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    website: "",
    email: "",
    phone: "",
    budget: "",
    context: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const calendarRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function normalizeUrl(url) {
    const trimmed = url.trim();
    if (!trimmed) return trimmed;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  function validate() {
    const e = {};
    if (!form.website.trim()) {
      e.website = "Required";
    } else if (!URL_RE.test(form.website.trim())) {
      e.website = "Enter a valid website (e.g. acme.com)";
    }
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.budget) e.budget = "Required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError("");
    setLoading(true);

    const body = {
      email: form.email.trim(),
      website_url: normalizeUrl(form.website),
      inbound_source: "organic",
      marketing_spend: form.budget,
      ...(form.phone.trim() && { phone: form.phone.trim() }),
      ...(form.context.trim() && { inbound_metadata: { additional_notes: form.context.trim() } }),
    };

    try {
      const res = await fetch("/api/website-inbound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail ?? `Server error (${res.status})`);
      }
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setStep(2);
  }

  useEffect(() => {
    if (step === 2 && calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const prefillUrl =
    step === 2
      ? `${CALENDLY_URL}?email=${encodeURIComponent(form.email)}`
      : null;

  return (
    <div style={{ background: "var(--surface-soft)" }}>
      <div
        className="wrap"
        style={{
          paddingTop: 56,
          paddingBottom: 80,
        }}
      >
        {/* Step 1: Form */}
        {step === 1 && (
          <div
            className="gs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* Left: intro */}
            <div>
              <span
                className="eyebrow"
                style={{ color: "var(--brand-600)", display: "block", marginBottom: 14 }}
              >
                Before we meet
              </span>
              <h1
                style={{
                  fontSize: "clamp(30px, 3.8vw, 46px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                }}
              >
                Tell us about your brand
              </h1>
<div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "30-minute focused strategy session",
                  "We audit your AI visibility beforehand",
                  "No sales pressure — just a real plan",
                  "Free for qualified brands",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "var(--brand-tint)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--brand-600)",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontSize: 14.5, color: "var(--ink-2)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid var(--line)",
                padding: "36px 32px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", lineHeight: 1.15 }}>
                  Book a demo
                </h2>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.55 }}>
                  Share a few details and we'll come prepared with a custom plan for your brand.
                </p>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {/* Row 1: Website URL + Work email */}
                  <div
                    className="gs-two-col"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                  >
                    <InputField label="Website URL" required>
                      <input
                        type="text"
                        value={form.website}
                        onChange={set("website")}
                        placeholder="acme.com"
                        style={{
                          ...fieldStyle,
                          borderColor: errors.website ? "var(--brand)" : "var(--line)",
                        }}
                      />
                      {errors.website && (
                        <span style={{ fontSize: 12, color: "var(--brand)" }}>{errors.website}</span>
                      )}
                    </InputField>

                    <InputField label="Work email" required>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@acme.com"
                        style={{
                          ...fieldStyle,
                          borderColor: errors.email ? "var(--brand)" : "var(--line)",
                        }}
                      />
                      {errors.email && (
                        <span style={{ fontSize: 12, color: "var(--brand)" }}>{errors.email}</span>
                      )}
                    </InputField>
                  </div>

                  {/* Row 2: Monthly marketing budget (mandatory) */}
                  <InputField label="Monthly marketing budget" required>
                    <select
                      value={form.budget}
                      onChange={set("budget")}
                      style={{
                        ...fieldStyle,
                        borderColor: errors.budget ? "var(--brand)" : "var(--line)",
                        appearance: "none",
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        paddingRight: 36,
                      }}
                    >
                      <option value="">Select budget…</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <span style={{ fontSize: 12, color: "var(--brand)" }}>{errors.budget}</span>
                    )}
                  </InputField>

                  {/* Row 3: Phone number (optional) */}
                  <InputField label="Phone number (optional)">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98765 43210"
                      style={{ ...fieldStyle }}
                    />
                  </InputField>

                  <InputField label="Anything we should know before the call? (optional)">
                    <textarea
                      value={form.context}
                      onChange={set("context")}
                      placeholder="e.g. competitors you're worried about, content already published, specific AI engines you're not showing up on…"
                      rows={3}
                      style={{
                        ...fieldStyle,
                        resize: "vertical",
                        minHeight: 84,
                        lineHeight: 1.5,
                        fontFamily: "inherit",
                      }}
                    />
                  </InputField>

                  {apiError && (
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: "rgba(255,90,31,0.07)",
                        border: "1px solid rgba(255,90,31,0.25)",
                        fontSize: 13.5,
                        color: "var(--brand-600)",
                        lineHeight: 1.5,
                      }}
                    >
                      {apiError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                      marginTop: 4,
                      padding: "14px 24px",
                      fontSize: 15.5,
                      justifyContent: "center",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Submitting…" : "Pick my time"}
                    {!loading && <span className="arr">→</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Calendly */}
        {step === 2 && (
          <div ref={calendarRef}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span
                className="eyebrow"
                style={{ color: "var(--brand-600)", display: "block", marginBottom: 14 }}
              >
                Almost there
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                }}
              >
                Pick a time that works for you
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--ink-2)", marginTop: 12, lineHeight: 1.55 }}>
                We'll review everything you shared and arrive prepared.
              </p>
              <button
                onClick={() => setStep(1)}
                style={{
                  marginTop: 14,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-3)",
                  fontSize: 13.5,
                  textDecoration: "underline",
                  textDecorationColor: "var(--line)",
                }}
              >
                ← Edit my details
              </button>
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid var(--line)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <CalendlyInline prefillUrl={prefillUrl} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .gs-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .gs-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
