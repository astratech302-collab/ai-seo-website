export const pct = (n) => `${n.toFixed(2)}%`;

/** Cover art for a case study: the lift and before/after columns on a flowing gradient. */
export default function CaseStudyCover({ study }) {
  return (
    <div className={`csc flow flow-${study.tone}`}>
      <div className="csc-card">
        <div className="csc-num">
          <strong>+{study.lift}%</strong>
          <span>conversion rate</span>
        </div>
        <div className="csc-cols">
          {[["Before", study.before], ["After", study.after]].map(([label, value]) => (
            <div key={label} className="csc-col">
              <b>{pct(value)}</b>
              {/* both columns start at zero, so the gap stays to proportion */}
              <i style={{ height: `${(value / study.after) * 72}px` }} aria-hidden />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .csc { display: flex; align-items: center; justify-content: center; min-height: 240px; padding: 28px 20px; }
        .csc-card { display: flex; align-items: flex-end; justify-content: space-between; gap: 22px; width: min(100%, 360px); background: var(--surface); border-radius: 18px; box-shadow: var(--shadow); padding: 22px 24px; }
        .csc-num { display: flex; flex-direction: column; align-self: center; }
        .csc-num strong { font-size: 46px; line-height: 1; font-weight: 450; letter-spacing: -0.035em; color: var(--ink); }
        .csc-num span { margin-top: 8px; font-size: 13px; color: var(--ink-2); }
        .csc-cols { display: flex; align-items: flex-end; gap: 12px; }
        .csc-col { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-2); }
        .csc-col b { font-weight: 600; color: var(--ink); }
        .csc-col i { display: block; width: 34px; border-radius: 8px 8px 3px 3px; background: var(--line); }
        .csc-col:last-child i { background: var(--grad); }
      `}</style>
    </div>
  );
}
