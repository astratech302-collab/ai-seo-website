"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STORE_URL_KEY } from "@/config/site";
import { track } from "@/lib/track";

/**
 * Hero call to action: type a store URL, press the arrow, land on the contact page.
 * The URL is carried over (sessionStorage, not the address bar) to prefill the form.
 */
export default function StoreUrlForm() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    const value = url.trim();
    try {
      if (value) sessionStorage.setItem(STORE_URL_KEY, value);
      else sessionStorage.removeItem(STORE_URL_KEY);
    } catch {
      /* storage unavailable: the contact form simply starts empty */
    }
    track("form_submitted/store_url_hero", { has_url: Boolean(value) });
    router.push("/contact-us");
  };

  return (
    <form className="suf" onSubmit={submit}>
      <div className="suf-box">
        <input
          type="text"
          inputMode="url"
          autoComplete="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourstore.com"
          aria-label="Your store URL"
        />
        <button type="submit" aria-label="Continue to book a demo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <p>Enter your store URL to book a demo.</p>
      <style>{`
        .suf { max-width: 460px; margin: 0 auto; }
        .suf-box { display: flex; align-items: center; gap: 8px; padding: 7px 7px 7px 20px; border-radius: 18px; background: color-mix(in srgb, var(--surface) 86%, transparent); border: 1px solid var(--surface); box-shadow: var(--shadow); transition: box-shadow .2s ease, background .2s ease; }
        .suf-box:focus-within { background: var(--surface); box-shadow: 0 0 0 3px var(--brand), var(--shadow); }
        .suf input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font: inherit; font-size: 17px; color: var(--ink); }
        .suf input::placeholder { color: var(--ink-3); }
        .suf button { flex-shrink: 0; width: 52px; height: 52px; border: 0; border-radius: 13px; background: var(--ink); color: var(--surface); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .suf button svg { transition: transform .2s ease; }
        .suf button:hover svg { transform: translateX(3px); }
        .suf button:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
        .suf p { margin-top: 14px; font-size: 14.5px; color: var(--ink); opacity: .75; }
      `}</style>
    </form>
  );
}
