/** Mac-style browser chrome around a product mockup. Purely presentational. */
export default function BrowserWindow({ url, title, children, className = "" }) {
  return (
    <div className={`bw ${className}`}>
      <div className="bw-bar" aria-hidden>
        <span className="bw-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="bw-url">{url}</span>
        {title && <span className="bw-title">{title}</span>}
      </div>
      <div className="bw-body">{children}</div>
      <style>{`
        .bw { background: color-mix(in srgb, var(--surface) 94%, transparent); border: 1px solid var(--line); border-radius: 20px; box-shadow: var(--shadow); overflow: hidden; text-align: left; }
        .bw-bar { display: flex; align-items: center; gap: 16px; padding: 13px 18px; border-bottom: 1px solid var(--line-soft); font-size: 13.5px; color: var(--ink-3); white-space: nowrap; }
        .bw-dots { display: inline-flex; gap: 8px; }
        .bw-dots i { width: 12px; height: 12px; border-radius: 99px; background: var(--flow-pink-4); }
        .bw-dots i:nth-child(2) { background: var(--flow-blue-3); }
        .bw-dots i:nth-child(3) { background: var(--flow-mint-4); }
        .bw-url { background: var(--surface-muted); border-radius: 99px; padding: 4px 14px; color: var(--ink-2); overflow: hidden; text-overflow: ellipsis; }
        .bw-title { overflow: hidden; text-overflow: ellipsis; }
        .bw-body { padding: 14px; }
        @media (max-width: 560px) { .bw-title { display: none; } .bw-body { padding: 8px; } }
      `}</style>
    </div>
  );
}
