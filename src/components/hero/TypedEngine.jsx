"use client";

/* eslint-disable react-hooks/set-state-in-effect -- self-scheduling, timer-driven typewriter state machine */
import { useEffect, useState } from "react";
import { EngineLogo } from "@/components/brand/EngineLogo";
import { TYPE_ENGINES } from "@/data/engines";

/**
 * Types and deletes AI engine names in a loop, with the engine logo and a
 * gradient-filled name + blinking caret. Used inside the hero headline.
 */
export default function TypedEngine() {
  const words = TYPE_ENGINES;
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[wi];
    if (!del && txt === w) {
      const t = setTimeout(() => setDel(true), 1500);
      return () => clearTimeout(t);
    }
    if (del && txt === "") {
      setDel(false);
      setWi((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setTxt(w.slice(0, txt.length + (del ? -1 : 1)));
      },
      del ? 45 : 90
    );
    return () => clearTimeout(t);
  }, [txt, del, wi, words]);

  return (
    <span style={{ position: "relative", display: "inline-block", verticalAlign: "baseline" }}>
      <span style={{ visibility: "hidden" }} aria-hidden>
        <span style={{ display: "inline-flex", width: "0.85em", marginRight: "0.2em" }} />
        {longest}
      </span>
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          whiteSpace: "nowrap",
          display: "inline-flex",
          alignItems: "baseline",
        }}
      >
        <span
          className="hl-logo"
          style={{
            display: "inline-flex",
            width: "0.85em",
            height: "0.85em",
            marginRight: "0.2em",
            transform: "translateY(0.08em)",
          }}
        >
          <EngineLogo name={words[wi]} size={64} />
        </span>
        <span className="text-grad">{txt}</span>
        <span className="type-caret" aria-hidden />
      </span>
    </span>
  );
}
