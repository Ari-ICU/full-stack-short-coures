"use client";

import { useState, useRef } from "react";

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

// ─── 1. DOM Tree Diagram ──────────────────────────────────────────────────────
const DOM_TREE = {
  tag: "document", color: "#6b7280", children: [
    {
      tag: "<html>", color: "#3b82f6", children: [
        {
          tag: "<head>", color: "#8b5cf6", children: [
            { tag: "<title>", color: "#a78bfa", children: [], desc: "Page Title" },
          ], desc: "Metadata"
        },
        {
          tag: "<body>", color: "#f97316", children: [
            {
              tag: "<div id=\"app\">", color: "#22c55e", children: [
                { tag: "<h1>", color: "#10b981", children: [], desc: "Heading" },
                { tag: "<p class=\"box\">", color: "#10b981", children: [], desc: "Paragraph" },
                { tag: "<button id=\"btn\">", color: "#10b981", children: [], desc: "Button" },
              ], desc: "App container"
            },
          ], desc: "Page content"
        },
      ]
    },
  ]
};

type TreeNode = { tag: string; color: string; children: TreeNode[]; desc?: string };

function TreeNodeView({ node, depth = 0, highlighted }: { node: TreeNode; depth?: number; highlighted: string }) {
  const isHighlighted = highlighted && node.tag.includes(highlighted);
  return (
    <div style={{ marginLeft: depth * 16 }} className="my-0.5">
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all
        ${isHighlighted ? "ring-2 ring-yellow-400 scale-105" : ""}`}
        style={{ background: node.color + "22", color: node.color, border: `1px solid ${node.color}44` }}>
        {node.tag}
        {node.desc && <span className="font-sans font-normal text-[10px] opacity-70 ml-1">{node.desc}</span>}
      </div>
      {node.children.map((c, i) => (
        <TreeNodeView key={i} node={c} depth={depth + 1} highlighted={highlighted} />
      ))}
    </div>
  );
}

export function DomTreeDiagram() {
  const [highlighted, setHighlighted] = useState("");
  const HIGHLIGHTS = [
    { label: "#btn",   match: "btn",   color: "#f59e0b" },
    { label: ".box",   match: "box",   color: "#22c55e" },
    { label: "h1",     match: "<h1>",  color: "#3b82f6" },
    { label: "#app",   match: "app",   color: "#f97316" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="DOM Tree — Browser parses HTML → JS Object Tree" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Tree */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">DOM Tree</div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-3 overflow-x-auto">
              <TreeNodeView node={DOM_TREE} highlighted={highlighted} />
            </div>
          </div>

          {/* querySelector hint */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Highlight a node</div>
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHTS.map((h) => (
                <button key={h.label} onClick={() => setHighlighted(highlighted === h.match ? "" : h.match)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border-2 cursor-pointer transition-all
                    ${highlighted === h.match ? "border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
                  style={{ background: highlighted === h.match ? h.color : undefined }}>
                  {h.label}
                </button>
              ))}
              {highlighted && <button onClick={() => setHighlighted("")} className="px-2 py-1.5 rounded-lg text-xs border border-gray-300 dark:border-gray-600 text-gray-500 cursor-pointer">✕</button>}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="text-gray-400">// JavaScript sees HTML as objects</div>
              <div><span className="text-blue-400">const</span> <span className="text-white">el</span> = document.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">"{highlighted || "selector"}"</span>);</div>
              <div className="text-gray-400 mt-1">// el is now a live JS object</div>
              <div className="text-gray-400">// you can read & write its properties</div>
            </div>
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-xs text-blue-800 dark:text-blue-200">
              💡 DOM គឺជា <strong>live object</strong> — ការផ្លាស់ប្តូរ JS ចេញមកឃើញភ្លាមៗនៅ Browser
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. DOM Select & Modify Diagram ──────────────────────────────────────────
type ModifyMode = "textContent" | "style.color" | "classList.add" | "classList.toggle";

const MODIFY_MODES: { id: ModifyMode; label: string; color: string; code: string }[] = [
  { id: "textContent",    label: "textContent",    color: "#3b82f6", code: 'el.textContent = "ថ្មី!";' },
  { id: "style.color",    label: "style.color",    color: "#f97316", code: 'el.style.color = "orange";' },
  { id: "classList.add",  label: "classList.add",  color: "#22c55e", code: 'el.classList.add("active");' },
  { id: "classList.toggle", label: "classList.toggle", color: "#8b5cf6", code: 'el.classList.toggle("dark");' },
];

export function DomModifyDiagram() {
  const [mode, setMode] = useState<ModifyMode>("textContent");
  const [applied, setApplied] = useState(false);
  const [toggled, setToggled] = useState(false);
  const m = MODIFY_MODES.find((x) => x.id === mode)!;

  function handleApply() {
    if (mode === "classList.toggle") {
      setToggled((t) => !t);
      setApplied(true);
    } else {
      setApplied(true);
    }
  }

  // Preview element style based on mode + applied state
  const previewText = mode === "textContent" && applied ? "ថ្មី!" : "ធាតុ HTML";
  const previewColor = mode === "style.color" && applied ? "#f97316" : undefined;
  const hasActive = mode === "classList.add" && applied;
  const hasDark = mode === "classList.toggle" && toggled;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {MODIFY_MODES.map((m) => (
          <button key={m.id} onClick={() => { setMode(m.id); setApplied(false); setToggled(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${mode === m.id ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: mode === m.id ? m.color : undefined }}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`el.${mode} — Modifying Elements`} badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">

          {/* Live preview element */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Live DOM Preview</div>
            <div className={`rounded-xl border-2 p-5 text-center transition-all duration-300
              ${hasDark ? "bg-gray-800 border-gray-600" : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"}`}>
              <div
                className={`text-sm font-bold transition-all duration-300 rounded-lg px-3 py-2
                  ${hasActive ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 ring-2 ring-green-400" : ""}
                  ${hasDark ? "text-white" : "text-gray-800 dark:text-gray-200"}`}
                style={{ color: previewColor }}>
                {previewText}
              </div>
              {hasActive && (
                <div className="mt-2 text-[10px] text-green-600 dark:text-green-400 font-mono">class="active" added ✅</div>
              )}
              {mode === "classList.toggle" && (
                <div className="mt-2 text-[10px] font-mono" style={{ color: m.color }}>
                  {toggled ? 'class="dark" — toggled ON' : 'class="" — toggled OFF'}
                </div>
              )}
            </div>
            <button onClick={handleApply}
              className="mt-3 w-full py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all hover:opacity-90"
              style={{ background: m.color }}>
              {mode === "classList.toggle" ? (toggled ? "▶ Toggle OFF" : "▶ Toggle ON") : "▶ Apply"}
            </button>
            {applied && mode !== "classList.toggle" && (
              <button onClick={() => setApplied(false)} className="mt-1.5 w-full py-1.5 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-500 cursor-pointer">
                ↺ Reset
              </button>
            )}
          </div>

          {/* Code */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 text-xs font-semibold" style={{ background: m.color + "18", color: m.color, border: `1px solid ${m.color}44` }}>
              🎯 {mode === "textContent" && "ផ្លាស់ប្តូរអត្ថបទក្នុង Element"}
              {mode === "style.color" && "ដាក់ CSS style ដោយផ្ទាល់"}
              {mode === "classList.add" && "បន្ថែម CSS class ទៅ Element"}
              {mode === "classList.toggle" && "ប្រើ toggle ដើម្បី add/remove class"}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="text-gray-400">{"// 1. Select"}</div>
              <div><span className="text-blue-400">const</span> <span className="text-white">el</span> = document.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">"h1"</span>);</div>
              <div className="text-gray-400 mt-1">{"// 2. Modify"}</div>
              <div style={{ color: m.color }} className="font-bold">{m.code}</div>
            </div>
            {mode === "classList.toggle" && (
              <div className="rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3 text-xs text-purple-800 dark:text-purple-200">
                💡 <code className="bg-purple-100 dark:bg-purple-900 px-1 rounded">toggle</code> = add if absent, remove if present
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. DOM Events Diagram (click + form submit with preventDefault) ─────────
export function DomEventsDiagram() {
  const [clickCount, setClickCount] = useState(0);
  const [formUsername, setFormUsername] = useState("");
  const [submitLog, setSubmitLog] = useState<string[]>([]);
  const [prevented, setPrevented] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFormSubmit(e: React.FormEvent) {
    if (prevented) {
      e.preventDefault();
      setSubmitLog((log) => [...log, `✅ e.preventDefault() → username="${formUsername}" (ទំព័រមិន refresh)`]);
      setFormUsername("");
    } else {
      // Let it submit (will refresh page in real scenario, but we'll simulate)
      e.preventDefault();
      setSubmitLog((log) => [...log, `❌ NO preventDefault() → page refresh (lost state) — username="${formUsername}"`]);
      setFormUsername("");
    }
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-3xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Event Listeners — addEventListener()" badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        <div className="p-6 space-y-6">

          {/* Click event demo */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300">
              1️⃣ Click Event
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <button onClick={() => setClickCount((c) => c + 1)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold cursor-pointer transition-all">
                  Click Me
                </button>
                <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  Clicks: <span className="font-bold text-blue-600 dark:text-blue-400">{clickCount}</span>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
                <div><span className="text-blue-400">const</span> <span className="text-white">btn</span> = document.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">"#btn"</span>);</div>
                <div><span className="text-white">btn</span>.<span className="text-blue-400">addEventListener</span>(<span className="text-green-300">"click"</span>, () ={">"} {"{"}</div>
                <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-green-300">"Clicked!"</span>);</div>
                <div>{"}"});</div>
              </div>
            </div>
          </div>

          {/* Form submit demo */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300">
              2️⃣ Form Submit + e.preventDefault()
            </div>
            <div className="p-4 space-y-3">
              {/* Toggle preventDefault */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 dark:text-gray-400">e.preventDefault():</span>
                <button onClick={() => setPrevented((p) => !p)}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-all
                    ${prevented ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                  {prevented ? "✅ ON (ណែនាំ)" : "❌ OFF"}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  placeholder="វាយឈ្មោះ..."
                  className="flex-1 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-green-500"
                />
                <button type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold cursor-pointer transition-all">
                  Submit
                </button>
              </form>

              {/* Log */}
              {submitLog.length > 0 && (
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-2 space-y-1 max-h-24 overflow-y-auto">
                  {submitLog.map((log, i) => (
                    <div key={i} className="text-[11px] font-mono text-gray-700 dark:text-gray-300">{log}</div>
                  ))}
                </div>
              )}

              {/* Code */}
              <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
                <div><span className="text-white">form</span>.<span className="text-blue-400">addEventListener</span>(<span className="text-green-300">"submit"</span>, (<span className="text-orange-300">e</span>) ={">"} {"{"}</div>
                {prevented && (
                  <div className="pl-4">
                    <span className="text-orange-300">e</span>.<span className="text-yellow-300">preventDefault</span>();
                    <span className="text-gray-400"> {"// ⭐ stop page reload"}</span>
                  </div>
                )}
                <div className="pl-4">
                  <span className="text-blue-400">const</span> <span className="text-white">val</span> = input.<span className="text-yellow-300">value</span>;
                </div>
                <div className="pl-4 text-white">
                  console.<span className="text-yellow-300">log</span>(<span className="text-green-300">`Hello, ${"{val}"}!`</span>);
                </div>
                <div>{"}"});</div>
              </div>

              <div className={`rounded-xl p-3 text-xs font-semibold
                ${prevented
                  ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                  : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"}`}>
                {prevented
                  ? "✅ e.preventDefault() ការពារទំព័រមិនអោយ refresh — JS គ្រប់គ្រងផ្ទាល់"
                  : "❌ គ្មាន e.preventDefault() — Form នឹង refresh ទំព័រ (បាត់ state)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
