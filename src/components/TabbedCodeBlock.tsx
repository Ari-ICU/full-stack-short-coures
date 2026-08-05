"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

// ─── Language meta ────────────────────────────────────────────────────────────
const LANGUAGE_LABELS: Record<string, string> = {
  html:       "HTML",
  css:        "CSS",
  javascript: "JavaScript",
  js:         "JavaScript",
  typescript: "TypeScript",
  ts:         "TypeScript",
  tsx:        "TSX",
  jsx:        "JSX",
  json:       "JSON",
  python:     "Python",
  bash:       "Bash",
  sh:         "Shell",
  sql:        "SQL",
  text:       "Text",
};

const LANGUAGE_COLORS: Record<string, { tab: string; active: string; badge: string }> = {
  html:       { tab: "text-orange-400", active: "border-orange-400 text-orange-400", badge: "text-orange-400 bg-orange-400/10" },
  css:        { tab: "text-pink-400",   active: "border-pink-400 text-pink-400",     badge: "text-pink-400 bg-pink-400/10"     },
  javascript: { tab: "text-yellow-300", active: "border-yellow-300 text-yellow-300", badge: "text-yellow-300 bg-yellow-300/10" },
  js:         { tab: "text-yellow-300", active: "border-yellow-300 text-yellow-300", badge: "text-yellow-300 bg-yellow-300/10" },
  typescript: { tab: "text-blue-400",   active: "border-blue-400 text-blue-400",     badge: "text-blue-400 bg-blue-400/10"     },
  ts:         { tab: "text-blue-400",   active: "border-blue-400 text-blue-400",     badge: "text-blue-400 bg-blue-400/10"     },
  tsx:        { tab: "text-cyan-400",   active: "border-cyan-400 text-cyan-400",     badge: "text-cyan-400 bg-cyan-400/10"     },
  jsx:        { tab: "text-cyan-400",   active: "border-cyan-400 text-cyan-400",     badge: "text-cyan-400 bg-cyan-400/10"     },
  python:     { tab: "text-yellow-400", active: "border-yellow-400 text-yellow-400", badge: "text-yellow-400 bg-yellow-400/10" },
  bash:       { tab: "text-green-400",  active: "border-green-400 text-green-400",   badge: "text-green-400 bg-green-400/10"   },
  json:       { tab: "text-orange-300", active: "border-orange-300 text-orange-300", badge: "text-orange-300 bg-orange-300/10" },
};

function getLangMeta(lang: string) {
  const key = lang.toLowerCase();
  return {
    label: LANGUAGE_LABELS[key] ?? lang.toUpperCase(),
    colors: LANGUAGE_COLORS[key] ?? { tab: "text-gray-400", active: "border-gray-400 text-gray-400", badge: "text-gray-400 bg-gray-400/10" },
  };
}

// ─── Parse the raw tabs block content ─────────────────────────────────────────
// Format per tab: first line = language, rest = code, separated by \n---\n
export interface TabEntry {
  lang: string;
  code: string;
}

export function parseTabs(raw: string): TabEntry[] {
  return raw
    .split(/\n---\n/)
    .map((chunk) => {
      const lines = chunk.trim().split("\n");
      const lang = lines[0].trim().toLowerCase();
      const code = lines.slice(1).join("\n").trim();
      return { lang, code };
    })
    .filter((t) => t.lang && t.code);
}

// ─── Single code pane ─────────────────────────────────────────────────────────
function CodePane({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const meta = getLangMeta(lang);
  const normalizedLang = lang === "js" ? "javascript" : lang === "ts" ? "typescript" : lang;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* ignore */}
  }

  return (
    <div className="relative">
      {/* copy button */}
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className={`absolute top-3 right-4 z-10 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-150
          ${copied
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-white/5 text-[#637e9a] border border-transparent hover:bg-white/10 hover:text-white hover:border-white/10"}`}
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </>
        )}
      </button>

      <Highlight theme={themes.nightOwl} code={code} language={normalizedLang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto text-[0.82rem] leading-6`}
            style={{ ...style, margin: 0, padding: "1rem 0", background: "#011627" }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className="px-5 hover:bg-white/[0.03] transition-colors"
              >
                <span
                  className="inline-block w-8 mr-4 text-right text-[#2d4a66] select-none text-xs leading-6"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

// ─── Main TabbedCodeBlock ─────────────────────────────────────────────────────
export function TabbedCodeBlock({ raw }: { raw: string }) {
  const tabs = parseTabs(raw);
  const [active, setActive] = useState(0);

  if (tabs.length === 0) return null;
  if (tabs.length === 1) {
    // Single tab — render as plain CodeBlock-style
    const { lang, code } = tabs[0];
    const meta = getLangMeta(lang);
    return (
      <div className="not-prose my-6 rounded-xl overflow-hidden border border-[#1e2d40] shadow-xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#011627] border-b border-[#1e2d40]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md font-mono ${meta.colors.badge}`}>{meta.label}</span>
          <div className="w-16" />
        </div>
        <CodePane lang={lang} code={code} />
      </div>
    );
  }

  const current = tabs[active];

  return (
    <div className="not-prose my-6 rounded-xl overflow-hidden border border-[#1e2d40] shadow-xl">
      {/* Tab bar */}
      <div className="flex items-center bg-[#011627] border-b border-[#1e2d40] overflow-x-auto">
        {/* traffic lights */}
        <div className="flex gap-1.5 px-4 py-2.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Tabs */}
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab, i) => {
            const meta = getLangMeta(tab.lang);
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold font-mono whitespace-nowrap border-b-2 transition-all cursor-pointer
                  ${isActive
                    ? `${meta.colors.active} bg-white/[0.04]`
                    : "border-transparent text-[#637e9a] hover:text-gray-300 hover:bg-white/[0.02]"}`}
              >
                {/* Language icon dot */}
                <span className={`w-2 h-2 rounded-full ${isActive ? "" : "opacity-50"}`}
                  style={{ background: isActive ? "currentColor" : "#637e9a" }} />
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code pane */}
      <CodePane key={active} lang={current.lang} code={current.code} />
    </div>
  );
}
