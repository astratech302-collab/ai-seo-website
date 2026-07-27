"use client";

import { track } from "@/lib/track";

/** Social share row for a blog post. Opens the network's share intent in a new
 *  tab (the user completes the share). Fires a Mixpanel event per network. */
export default function ShareRow({ url, title }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { key: "twitter", label: "Share on X", color: "#000000", href: `https://x.com/intent/tweet?url=${u}&text=${t}`,
      icon: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65z" /> },
    { key: "linkedin", label: "Share on LinkedIn", color: "#0A66C2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /> },
    { key: "facebook", label: "Share on Facebook", color: "#1877F2", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" /> },
    { key: "email", label: "Share by email", color: "var(--brand)", href: `mailto:?subject=${t}&body=${u}`,
      icon: <path d="M22 4H2v16h20V4zM4 6h16v.5l-8 5-8-5V6zm0 3.3 8 5 8-5V18H4V9.3z" /> },
  ];

  return (
    <div className="share-row">
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="share-btn"
          style={{ "--sh-hover": l.color }}
          onClick={() => track(`link_clicked/share_${l.key}_blog_post`, { url })}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{l.icon}</svg>
        </a>
      ))}
      <style>{`
        .share-row { display: flex; gap: 10px; }
        .share-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid var(--line); color: var(--ink-2);
          transition: color .18s ease, border-color .18s ease, background .18s ease;
        }
        .share-btn:hover {
          color: var(--sh-hover, var(--brand));
          border-color: var(--sh-hover, var(--brand));
          background: var(--surface-soft);
        }
      `}</style>
    </div>
  );
}
