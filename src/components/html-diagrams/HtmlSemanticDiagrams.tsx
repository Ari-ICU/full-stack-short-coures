"use client";

import { useState } from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────────
function PanelHeader({ label, badge }: { label: string; badge: string }) {
  return (
    <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <code className={`text-xs font-bold px-2 py-0.5 rounded ${badge}`}>{label}</code>
    </div>
  );
}

// ─── 1. Semantic vs Non-Semantic Diagram ──────────────────────────────────────
export function SemanticVsNonSemanticDiagram() {
  const [mode, setMode] = useState<"nonsemantic" | "semantic">("nonsemantic");

  const nonSemanticBlocks = [
    { tag: '<div id="header">', color: "#6b7280", label: "header" },
    { tag: '<div id="nav">',    color: "#6b7280", label: "nav" },
    { tag: '<div id="main">',   color: "#6b7280", label: "main" },
    { tag: '<div id="sidebar">',color: "#6b7280", label: "sidebar" },
    { tag: '<div id="footer">', color: "#6b7280", label: "footer" },
  ];

  const semanticBlocks = [
    { tag: "<header>",  color: "#3b82f6", label: "header",  desc: "ចំណងជើង / Logo" },
    { tag: "<nav>",     color: "#8b5cf6", label: "nav",     desc: "Navigation Menu" },
    { tag: "<main>",    color: "#22c55e", label: "main",    desc: "Content គោល" },
    { tag: "<aside>",   color: "#f97316", label: "aside",   desc: "Sidebar" },
    { tag: "<footer>",  color: "#ec4899", label: "footer",  desc: "Copyright / Links" },
  ];

  const blocks = mode === "semantic" ? semanticBlocks : nonSemanticBlocks;

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => setMode("nonsemantic")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
            ${mode === "nonsemantic"
              ? "bg-gray-600 border-transparent text-white shadow-md scale-105"
              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
        >
          ❌ Non-Semantic (div soup)
        </button>
        <button
          onClick={() => setMode("semantic")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
            ${mode === "semantic"
              ? "bg-green-600 border-transparent text-white shadow-md scale-105"
              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
        >
          ✅ Semantic HTML5
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label={mode === "semantic" ? "Semantic — Browser & Google ដឹងអត្ថន័យ" : "Non-semantic — Browser មិនដឹងអ្វីទេ"}
          badge={mode === "semantic"
            ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}
        />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Visual page */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Page Structure
            </div>
            <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-2 space-y-1.5">
              {blocks.map((b, i) => (
                <div
                  key={i}
                  className="w-full rounded-lg px-3 py-2 text-[11px] font-mono font-bold text-white flex justify-between items-center"
                  style={{ background: b.color, opacity: mode === "nonsemantic" ? 0.7 : 1 }}
                >
                  <span>{b.tag}</span>
                  {mode === "semantic" && (
                    <span className="text-[10px] font-sans opacity-80">
                      {"desc" in b ? (b as typeof semanticBlocks[0]).desc : ""}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Understanding panel */}
          <div className="space-y-3">
            <div className={`rounded-xl p-3 text-xs font-semibold
              ${mode === "semantic"
                ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"}`}>
              {mode === "semantic"
                ? "✅ Google, Browser, Screen Reader — ទាំងអស់ \"ដឹង\" ថា ផ្នែកនីមួយៗ ធ្វើអ្វី"
                : "❌ Google ឃើញតែ <div> ជាច្រើន — វាមិនដឹងថា ណាជា header, ណាជា content គោល"}
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              {[
                { label: "SEO",         val: mode === "semantic" ? "✅ Good" : "❌ Poor" },
                { label: "a11y",        val: mode === "semantic" ? "✅ Good" : "❌ Poor" },
                { label: "Readable",    val: mode === "semantic" ? "✅ Yes"  : "⚠️ Hard" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-2">
                  <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-0.5">{s.label}</div>
                  <div className="font-bold text-gray-800 dark:text-gray-200">{s.val}</div>
                </div>
              ))}
            </div>

            {/* Code snippet */}
            <div className="bg-gray-900 rounded-xl p-3 text-[11px] font-mono space-y-0.5">
              {mode === "nonsemantic" ? (
                <>
                  <div className="text-gray-400">{"<!-- ❌ div soup — no meaning -->"}</div>
                  <div><span className="text-red-400">{"<div"}</span> <span className="text-yellow-300">id</span><span className="text-white">="header"</span><span className="text-red-400">{">"}</span><span className="text-gray-300">...</span><span className="text-red-400">{"</div>"}</span></div>
                  <div><span className="text-red-400">{"<div"}</span> <span className="text-yellow-300">id</span><span className="text-white">="nav"</span><span className="text-red-400">{">"}</span><span className="text-gray-300">...</span><span className="text-red-400">{"</div>"}</span></div>
                  <div><span className="text-red-400">{"<div"}</span> <span className="text-yellow-300">id</span><span className="text-white">="content"</span><span className="text-red-400">{">"}</span><span className="text-gray-300">...</span><span className="text-red-400">{"</div>"}</span></div>
                </>
              ) : (
                <>
                  <div className="text-gray-400">{"<!-- ✅ semantic — meaning is clear -->"}</div>
                  <div><span className="text-blue-400">{"<header>"}</span><span className="text-gray-300">...</span><span className="text-blue-400">{"</header>"}</span></div>
                  <div><span className="text-purple-400">{"<nav>"}</span><span className="text-gray-300">...</span><span className="text-purple-400">{"</nav>"}</span></div>
                  <div><span className="text-green-400">{"<main>"}</span><span className="text-gray-300">...</span><span className="text-green-400">{"</main>"}</span></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Semantic Layout Anatomy Diagram ───────────────────────────────────────
const TAGS = [
  { id: "header",  color: "#3b82f6", label: "<header>",  km: "ចំណងជើង, Logo, Intro",        tip: "ជាទូទៅផ្ទុក <h1> + <nav>. អាចមានក្នុង <article> ផងដែរ" },
  { id: "nav",     color: "#8b5cf6", label: "<nav>",     km: "Navigation Links",              tip: "Menu, breadcrumbs — Links ដែលសំខាន់" },
  { id: "main",    color: "#22c55e", label: "<main>",    km: "Content គោល",                   tip: "មានតែ ONE <main> ក្នុងទំព័រ — Content ពិសេសសម្រាប់ទំព័រនេះ" },
  { id: "article", color: "#f59e0b", label: "<article>", km: "អត្ថបទឯករាជ្យ (Blog Post)",  tip: "អាចយកទៅប្រើនៅកន្លែងផ្សេងដោយឯករាជ្យ — blog post, news, comment" },
  { id: "section", color: "#06b6d4", label: "<section>", km: "ផ្នែកមួយនៃ Content",          tip: "ជាទូទៅមាន <h2> ឬ <h3> ខ្លួនឯង — ផ្នែក 'អំពីយើង', 'សេវាកម្ម'" },
  { id: "aside",   color: "#f97316", label: "<aside>",   km: "Sidebar / Content ពាក់ព័ន្ធ", tip: "Content ដែលគាំទ្រ Main content — ads, related links, author bio" },
  { id: "footer",  color: "#ec4899", label: "<footer>",  km: "Copyright, Links ខាងក្រោម",   tip: "ផ្នែកចុងក្រោយ — copyright, contact, social media links" },
] as const;

type TagId = typeof TAGS[number]["id"];

export function SemanticLayoutDiagram() {
  const [active, setActive] = useState<TagId>("header");
  const activeTag = TAGS.find((t) => t.id === active)!;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="Semantic Page Layout — ចុចលើ Tag ដើម្បីស្វែងយល់"
          badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
        />

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Page anatomy visual */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Page Structure
            </div>

            {/* Visual layout */}
            <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/40 p-2 space-y-1.5 text-[11px] font-mono font-bold text-white">
              {/* header */}
              <button
                onClick={() => setActive("header")}
                className="w-full rounded-lg px-3 py-2 text-left transition-all cursor-pointer"
                style={{
                  background: TAGS[0].color,
                  outline: active === "header" ? `3px solid white` : "none",
                  outlineOffset: "2px",
                  opacity: active === "header" ? 1 : 0.65,
                }}
              >
                &lt;header&gt;
              </button>

              {/* nav */}
              <button
                onClick={() => setActive("nav")}
                className="w-full rounded-lg px-3 py-2 text-left transition-all cursor-pointer"
                style={{
                  background: TAGS[1].color,
                  outline: active === "nav" ? `3px solid white` : "none",
                  outlineOffset: "2px",
                  opacity: active === "nav" ? 1 : 0.65,
                }}
              >
                &lt;nav&gt;
              </button>

              {/* main + aside row */}
              <div className="flex gap-1.5">
                <div className="flex-1 space-y-1.5">
                  {/* main */}
                  <button
                    onClick={() => setActive("main")}
                    className="w-full rounded-lg px-3 py-2 text-left transition-all cursor-pointer"
                    style={{
                      background: TAGS[2].color,
                      outline: active === "main" ? `3px solid white` : "none",
                      outlineOffset: "2px",
                      opacity: active === "main" ? 1 : 0.65,
                    }}
                  >
                    &lt;main&gt;
                  </button>
                  {/* article */}
                  <button
                    onClick={() => setActive("article")}
                    className="w-full rounded-lg px-3 py-1.5 text-left transition-all cursor-pointer ml-2"
                    style={{
                      background: TAGS[3].color,
                      outline: active === "article" ? `3px solid white` : "none",
                      outlineOffset: "2px",
                      opacity: active === "article" ? 1 : 0.65,
                    }}
                  >
                    &lt;article&gt;
                  </button>
                  {/* section */}
                  <button
                    onClick={() => setActive("section")}
                    className="w-full rounded-lg px-3 py-1.5 text-left transition-all cursor-pointer ml-4"
                    style={{
                      background: TAGS[4].color,
                      outline: active === "section" ? `3px solid white` : "none",
                      outlineOffset: "2px",
                      opacity: active === "section" ? 1 : 0.65,
                    }}
                  >
                    &lt;section&gt;
                  </button>
                </div>
                {/* aside */}
                <button
                  onClick={() => setActive("aside")}
                  className="w-16 rounded-lg px-2 py-3 text-center transition-all cursor-pointer text-[10px] leading-tight"
                  style={{
                    background: TAGS[5].color,
                    outline: active === "aside" ? `3px solid white` : "none",
                    outlineOffset: "2px",
                    opacity: active === "aside" ? 1 : 0.65,
                  }}
                >
                  &lt;aside&gt;
                </button>
              </div>

              {/* footer */}
              <button
                onClick={() => setActive("footer")}
                className="w-full rounded-lg px-3 py-2 text-left transition-all cursor-pointer"
                style={{
                  background: TAGS[6].color,
                  outline: active === "footer" ? `3px solid white` : "none",
                  outlineOffset: "2px",
                  opacity: active === "footer" ? 1 : 0.65,
                }}
              >
                &lt;footer&gt;
              </button>
            </div>
          </div>

          {/* Tag detail panel */}
          <div className="space-y-3">
            {/* Active tag badge */}
            <div
              className="rounded-xl px-4 py-3 text-white font-bold text-sm"
              style={{ background: activeTag.color }}
            >
              {activeTag.label}
            </div>

            {/* Description */}
            <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-3 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                ការប្រើប្រាស់
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {activeTag.km}
              </div>
            </div>

            {/* Tip */}
            <div
              className="rounded-xl p-3 text-xs"
              style={{
                background: activeTag.color + "18",
                color: activeTag.color,
                border: `1px solid ${activeTag.color}44`,
              }}
            >
              💡 {activeTag.tip}
            </div>

            {/* All tags quick reference */}
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-white cursor-pointer transition-all"
                  style={{
                    background: t.color,
                    opacity: active === t.id ? 1 : 0.45,
                    transform: active === t.id ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
