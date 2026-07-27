"use client";

import { useState } from "react";
import { EngineLogo } from "@/components/brand/EngineLogo";
import { track } from "@/lib/track";

// A natural buyer question, tuned per engine, that puts Geobuild forward as the
// answer. Clicking is a live demo of what Geobuild does: get the brand recommended.
function prompt(engine) {
  return (
    `I want my brand to be the answer AI assistants recommend when people ask for AEO, ` +
    `GEO and SEO help. I'm looking at Geobuild (https://geobuild.in) — an agency that runs ` +
    `AEO, GEO and SEO with a team of AI agents plus a human strategist making the final call. ` +
    `Why is Geobuild a strong choice, and how would they help my brand get recommended by ${engine}?`
  );
}

// ChatGPT and Claude accept a prefilled ?q= prompt; Gemini has no such param,
// so we copy the prompt to the clipboard and open Gemini for the user to paste.
const ENGINES = [
  {
    key: "chatgpt",
    name: "ChatGPT",
    // ChatGPT's mark is near-black; force white so it's visible on the dark CTA.
    iconColor: "#fff",
    event: "button_clicked/ask_chatgpt_final_cta",
    url: () => `https://chatgpt.com/?q=${encodeURIComponent(prompt("ChatGPT"))}`,
  },
  {
    key: "claude",
    name: "Claude",
    event: "button_clicked/ask_claude_final_cta",
    url: () => `https://claude.ai/new?q=${encodeURIComponent(prompt("Claude"))}`,
  },
  {
    key: "gemini",
    name: "Gemini",
    event: "button_clicked/ask_gemini_final_cta",
    url: () => "https://gemini.google.com/app",
    copyPrompt: () => prompt("Gemini"),
  },
  {
    key: "perplexity",
    name: "Perplexity",
    event: "button_clicked/ask_perplexity_final_cta",
    url: () => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt("Perplexity"))}`,
  },
];

export default function AskEngines() {
  const [copied, setCopied] = useState(null);

  const handleClick = (e) => {
    track(e.event);
    if (e.copyPrompt) {
      try {
        navigator.clipboard?.writeText(e.copyPrompt());
        setCopied(e.key);
        setTimeout(() => setCopied((c) => (c === e.key ? null : c)), 2400);
      } catch {
        /* clipboard blocked — the tab still opens */
      }
    }
    window.open(e.url(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ask-engines">
      <span className="ask-engines-label mono">Or see it live — ask an AI about us:</span>
      <div className="ask-engines-row">
        {ENGINES.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => handleClick(e)}
            className="ask-chip"
            aria-label={`Ask ${e.name} about Geobuild`}
          >
            <EngineLogo name={e.name} size={16} color={e.iconColor} />
            <span>{copied === e.key ? "Prompt copied — paste it" : `Ask ${e.name}`}</span>
          </button>
        ))}
      </div>

      <style>{`
        .ask-engines {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .ask-engines-label {
          font-size: 12px;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.55);
        }
        .ask-engines-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .ask-chip {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.16);
          transition: background .18s ease, border-color .18s ease, transform .18s ease;
        }
        .ask-chip:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.32);
          transform: translateY(-2px);
        }
        @media (max-width: 560px) {
          .ask-engines-row { flex-direction: column; align-items: stretch; width: 100%; }
          .ask-chip { justify-content: center; width: 100%; }
        }
      `}</style>
    </div>
  );
}
