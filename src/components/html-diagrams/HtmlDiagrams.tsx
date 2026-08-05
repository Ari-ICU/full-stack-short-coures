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

// ─── 1. Block vs Inline Diagram ───────────────────────────────────────────────
const BLOCK_ELEMENTS = ["<div>", "<p>", "<h1>", "<section>", "<ul>", "<form>"];
const INLINE_ELEMENTS = ["<span>", "<a>", "<strong>", "<em>", "<img>", "<code>"];

export function BlockInlineDiagram() {
  const [mode, setMode] = useState<"block" | "inline">("block");

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => setMode("block")}
          className={`px-5 py-2 rounded-xl text-sm font-bold border-2 cursor-pointer transition-all
            ${mode === "block"
              ? "bg-blue-600 border-transparent text-white shadow-md scale-105"
              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
        >
          Block Elements
        </button>
        <button
          onClick={() => setMode("inline")}
          className={`px-5 py-2 rounded-xl text-sm font-bold border-2 cursor-pointer transition-all
            ${mode === "inline"
              ? "bg-orange-500 border-transparent text-white shadow-md scale-105"
              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
        >
          Inline Elements
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label={mode === "block" ? "Block-level — ចាប់ផ្តើមបន្ទាត់ថ្មី, width 100%" : "Inline-level — នៅក្នុងបន្ទាត់, width = content"}
          badge={mode === "block"
            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
            : "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"}
        />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Live browser simulation */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Browser Output
            </div>
            <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-3 min-h-[140px]">
              {mode === "block" ? (
                <div className="space-y-1.5">
                  {["Element ១", "Element ២", "Element ៣"].map((label, i) => (
                    <div
                      key={i}
                      className="w-full rounded-lg px-3 py-2 text-xs font-semibold text-white text-center"
                      style={{ background: ["#3b82f6", "#6366f1", "#8b5cf6"][i] }}
                    >
                      {label} — ស៊ីបន្ទាត់ពេញ
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 items-start">
                  {["Element ១", "Element ២", "Element ៣", "Element ៤"].map((label, i) => (
                    <span
                      key={i}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white"
                      style={{ background: ["#f97316", "#ef4444", "#ec4899", "#f59e0b"][i] }}
                    >
                      {label}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 dark:text-gray-400 self-center">← ជាប់គ្នានៅក្នុងបន្ទាត់</span>
                </div>
              )}
            </div>
          </div>

          {/* Tag examples */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Tags ឧទាហរណ៍
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(mode === "block" ? BLOCK_ELEMENTS : INLINE_ELEMENTS).map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border-2
                    ${mode === "block"
                      ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                      : "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300"}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className={`mt-4 rounded-xl p-3 text-xs font-semibold
              ${mode === "block"
                ? "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200"
                : "bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200"}`}>
              {mode === "block"
                ? "📦 Block elements លាតសន្ធឹងពេញទំហំ (width: 100%) ហើយចាប់ផ្តើមនៅ​ bន្ទាត់ថ្មីជានិច្ច។"
                : "✍️ Inline elements ស៊ីទំហំត្រឹមអត្ថបទ ហើយរស់នៅក្នុងបន្ទាត់ជាមួយ content ផ្សេង។"}
            </div>
          </div>
        </div>

        {/* Code panel */}
        <div className="mx-6 mb-6 bg-gray-900 rounded-xl p-4 text-xs font-mono">
          {mode === "block" ? (
            <div className="space-y-1">
              <div className="text-gray-400">{"<!-- Block elements stack vertically -->"}</div>
              <div><span className="text-blue-400">{"<p>"}</span><span className="text-white">{"វត្ថុទី ១"}</span><span className="text-blue-400">{"</p>"}</span></div>
              <div><span className="text-blue-400">{"<p>"}</span><span className="text-white">{"វត្ថុទី ២"}</span><span className="text-blue-400">{"</p>"}</span></div>
              <div className="text-green-500 mt-1">{"/* result: each on its own line, full width */"}</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-gray-400">{"<!-- Inline elements flow horizontally -->"}</div>
              <div>
                <span className="text-orange-400">{"<span>"}</span>
                <span className="text-white">{"ពាក្យ ១"}</span>
                <span className="text-orange-400">{"</span>"}</span>
                <span className="text-orange-400">{" <span>"}</span>
                <span className="text-white">{"ពាក្យ ២"}</span>
                <span className="text-orange-400">{"</span>"}</span>
              </div>
              <div className="text-green-500 mt-1">{"/* result: side by side, content-width only */"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 2. div vs span Diagram ───────────────────────────────────────────────────
export function DivSpanDiagram() {
  const [active, setActive] = useState<"div" | "span">("div");

  const info = {
    div: {
      color: "#3b82f6",
      badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
      type: "Block",
      purpose: "រុំ​ content ធំៗ ឬ Sections",
      useCase: "Cards, layouts, sections",
      example: (
        <div className="space-y-1.5 text-xs">
          <div className="w-full rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 p-2 text-blue-800 dark:text-blue-200 font-mono">
            {"<div class=\"user-card\">"}
            <div className="pl-4 text-gray-700 dark:text-gray-300">{"<h2>ឈ្មោះ</h2>"}</div>
            <div className="pl-4 text-gray-700 dark:text-gray-300">{"<p>អាយុ</p>"}</div>
            {"</div>"}
          </div>
          <div className="w-full rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-2 text-center text-blue-700 dark:text-blue-300 font-bold text-[11px]">
            🔲 ស៊ីទំហំ 100% — ធ្លាក់បន្ទាត់ខ្លួនឯង
          </div>
        </div>
      ),
    },
    span: {
      color: "#f97316",
      badge: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
      type: "Inline",
      purpose: "រុំ​ text ខ្លីៗ​ ក្នុងប្រយោគ",
      useCase: "Highlight, color, style a word",
      example: (
        <div className="space-y-1.5 text-xs">
          <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 p-2 text-orange-800 dark:text-orange-200 font-mono leading-relaxed">
            {"<p>"}
            <div className="pl-4 text-gray-700 dark:text-gray-300">
              {"លេខ "}
              <span className="text-orange-600 dark:text-orange-400 font-bold">{"<span style=\"color:red\">"}សម្ងាត់{"</span>"}</span>
              {" របស់អ្នក"}
            </div>
            {"</p>"}
          </div>
          <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-2 text-center text-orange-700 dark:text-orange-300 font-bold text-[11px]">
            ✍️ នៅ​ in-line — មិនធ្លាក់ទៅបន្ទាត់ថ្មី
          </div>
        </div>
      ),
    },
  };

  const d = info[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-5">
        {(["div", "span"] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-5 py-2 rounded-xl text-sm font-bold font-mono border-2 cursor-pointer transition-all
              ${active === tag
                ? "border-transparent text-white shadow-md scale-105"
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === tag ? info[tag].color : undefined }}
          >
            {"<" + tag + ">"}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label={`<${active}> — ${d.type} Element`}
          badge={d.badge}
        />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Visual example */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Visual Example
            </div>
            {d.example}
          </div>

          {/* Properties */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs text-center">
              {[
                { label: "Type", value: d.type },
                { label: "Use Case", value: d.useCase },
              ].map((r) => (
                <div key={r.label} className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-3">
                  <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase font-bold mb-1">{r.label}</div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200 text-[11px]">{r.value}</div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-3 text-xs font-semibold"
              style={{ background: d.color + "18", color: d.color, border: `1px solid ${d.color}44` }}
            >
              🎯 {d.purpose}
            </div>

            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="text-gray-400">{"// when to choose"}</div>
              {active === "div" ? (
                <>
                  <div className="text-green-400">{"// ✅ grouping layout sections"}</div>
                  <div><span className="text-blue-400">{"<div"}</span> <span className="text-yellow-300">{"class"}</span><span className="text-white">{"=\"card\""}</span><span className="text-blue-400">{">"}</span></div>
                  <div className="pl-4"><span className="text-gray-300">{"... multiple elements ..."}</span></div>
                  <div><span className="text-blue-400">{"</div>"}</span></div>
                </>
              ) : (
                <>
                  <div className="text-green-400">{"// ✅ styling a word inline"}</div>
                  <div><span className="text-orange-400">{"<span"}</span> <span className="text-yellow-300">{"class"}</span><span className="text-white">{"=\"highlight\""}</span><span className="text-orange-400">{">"}</span></div>
                  <div className="pl-4"><span className="text-gray-300">{"ពាក្យតែមួយ"}</span></div>
                  <div><span className="text-orange-400">{"</span>"}</span></div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Comparison footer */}
        <div className="mx-6 mb-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-3 text-xs text-gray-700 dark:text-gray-300">
          <span className="font-bold">💡 Quick Rule: </span>
          ចង់រុំ <strong>content ធំៗ (sections/blocks)</strong> → ប្រើ{" "}
          <code className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 rounded">&lt;div&gt;</code>
          {" "}• ចង់រុំ <strong>ពាក្យ/text ខ្លីៗ</strong> ក្នុងប្រយោគ → ប្រើ{" "}
          <code className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-1 rounded">&lt;span&gt;</code>
        </div>
      </div>
    </div>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────
const HTML_DIAGRAMS: Record<string, React.ComponentType> = {
  blockinline:  BlockInlineDiagram,
  divspan:      DivSpanDiagram,
};

export function HtmlDiagram({ name }: { name: string }) {
  const Component = HTML_DIAGRAMS[name.toLowerCase().replace(/[^a-z]/g, "")];
  if (!Component) {
    return (
      <div className="not-prose my-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        Unknown HTML diagram: <code>{name}</code>
      </div>
    );
  }
  return <Component />;
}
