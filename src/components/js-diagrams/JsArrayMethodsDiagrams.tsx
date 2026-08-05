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

// ─── Arrow chip ───────────────────────────────────────────────────────────────
function ArrayChip({ value, color, dimmed = false }: { value: string; color: string; dimmed?: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-bold font-mono text-white transition-all"
      style={{ background: dimmed ? "#9ca3af" : color, opacity: dimmed ? 0.45 : 1 }}
    >
      {value}
    </span>
  );
}

// ─── 1. Map Diagram ───────────────────────────────────────────────────────────
const MAP_EXAMPLES = [
  {
    label: "×2",
    desc: "គុណនឹង ២",
    input: [1, 2, 3, 4, 5],
    fn: (n: number) => n * 2,
    fnStr: "num => num * 2",
    color: "#3b82f6",
  },
  {
    label: "+10",
    desc: "បូក ១០",
    input: [1, 2, 3, 4, 5],
    fn: (n: number) => n + 10,
    fnStr: "num => num + 10",
    color: "#8b5cf6",
  },
  {
    label: "²",
    desc: "ស្វ័យគុណ",
    input: [1, 2, 3, 4, 5],
    fn: (n: number) => n * n,
    fnStr: "num => num ** 2",
    color: "#f97316",
  },
  {
    label: "string",
    desc: "បំប្លែងជា string",
    input: [1, 2, 3, 4, 5],
    fn: (n: number) => `"${n}"`,
    fnStr: 'num => `"${num}"`',
    color: "#22c55e",
  },
];

export function MapDiagram() {
  const [active, setActive] = useState(0);
  const ex = MAP_EXAMPLES[active];
  const output = ex.input.map((n) => ex.fn(n));

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {MAP_EXAMPLES.map((e, i) => (
          <button key={e.label} onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${active === i ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === i ? e.color : undefined }}>
            {e.label} — {e.desc}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`.map(${ex.fnStr})`} badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-5">
          {/* Visual flow */}
          <div className="space-y-3">
            {/* Input row */}
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">Input Array</div>
              <div className="flex flex-wrap gap-1.5">
                {ex.input.map((n, i) => <ArrayChip key={i} value={String(n)} color="#6b7280" />)}
              </div>
            </div>

            {/* Transform arrow */}
            <div className="flex items-center gap-2 pl-1">
              <div className="w-6 h-px" style={{ background: ex.color }} />
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full text-white" style={{ background: ex.color }}>
                .map()
              </span>
              <div className="flex-1 h-px" style={{ background: ex.color }} />
              <span className="text-[10px] text-gray-400 font-mono">{ex.fnStr}</span>
            </div>

            {/* Output row with per-item transform */}
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">New Array (ដើមមិនប្រែ)</div>
              <div className="flex flex-wrap gap-1.5">
                {output.map((n, i) => <ArrayChip key={i} value={String(n)} color={ex.color} />)}
              </div>
            </div>
          </div>

          {/* Step-by-step trace */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-3 py-2 bg-gray-50 dark:bg-gray-800">
              Step-by-step trace
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {ex.input.map((n, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-1.5 text-xs font-mono">
                  <span className="text-gray-400 w-14">index[{i}]</span>
                  <span className="text-gray-600 dark:text-gray-400">{n}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold" style={{ color: ex.color }}>{String(output[i])}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"// .map() always returns a NEW array of SAME length"}</div>
            <div><span className="text-blue-400">const</span> <span className="text-white">input</span> = [<span className="text-orange-300">{ex.input.join(", ")}</span>];</div>
            <div><span className="text-blue-400">const</span> <span className="text-white">output</span> = input.<span style={{ color: ex.color }}>map</span>(<span className="text-yellow-300">{ex.fnStr}</span>);</div>
            <div className="text-gray-400 mt-1">// output → [<span style={{ color: ex.color }}>{output.map(String).join(", ")}</span>]</div>
          </div>

          <div className="rounded-xl p-3 text-xs font-semibold bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
            📌 <strong>.map()</strong> ត្រឡប់ Array ថ្មីដែលមាន <strong>ចំនួន element ដូចគ្នា</strong> — Array ដើមមិនប្រែប្រួលឡើយ។
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── 2. Filter Diagram ─────────────────────────────────────────────────────────
const FILTER_EXAMPLES = [
  {
    label: "គូ (even)",
    input: [1, 2, 3, 4, 5, 6, 7, 8],
    fn: (n: number) => n % 2 === 0,
    fnStr: "num => num % 2 === 0",
    color: "#22c55e",
  },
  {
    label: "> 4",
    input: [1, 2, 3, 4, 5, 6, 7, 8],
    fn: (n: number) => n > 4,
    fnStr: "num => num > 4",
    color: "#f97316",
  },
  {
    label: "< 5",
    input: [1, 2, 3, 4, 5, 6, 7, 8],
    fn: (n: number) => n < 5,
    fnStr: "num => num < 5",
    color: "#8b5cf6",
  },
  {
    label: "3x (triple)",
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fn: (n: number) => n % 3 === 0,
    fnStr: "num => num % 3 === 0",
    color: "#ec4899",
  },
];

export function FilterDiagram() {
  const [active, setActive] = useState(0);
  const ex = FILTER_EXAMPLES[active];
  const passing = ex.input.filter(ex.fn);
  const failing = ex.input.filter((n) => !ex.fn(n));

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {FILTER_EXAMPLES.map((e, i) => (
          <button key={e.label} onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${active === i ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === i ? e.color : undefined }}>
            {e.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`.filter(${ex.fnStr})`} badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        <div className="p-6 space-y-5">
          {/* Visual: input with pass/fail coloring */}
          <div className="space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">Input Array — ចុចមើលការច្រោះ</div>
              <div className="flex flex-wrap gap-1.5">
                {ex.input.map((n, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <ArrayChip value={String(n)} color={ex.fn(n) ? ex.color : "#9ca3af"} dimmed={!ex.fn(n)} />
                    <span className="text-[9px] font-bold" style={{ color: ex.fn(n) ? ex.color : "#9ca3af" }}>
                      {ex.fn(n) ? "✓" : "✗"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-2 pl-1">
              <div className="w-6 h-px" style={{ background: ex.color }} />
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full text-white" style={{ background: ex.color }}>
                .filter()
              </span>
              <div className="flex-1 h-px" style={{ background: ex.color }} />
              <span className="text-[10px] text-gray-400 font-mono">{ex.fnStr}</span>
            </div>

            {/* Result */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color: ex.color }}>
                  ✅ ជ្រោះរួច ({passing.length})
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {passing.length > 0
                    ? passing.map((n, i) => <ArrayChip key={i} value={String(n)} color={ex.color} />)
                    : <span className="text-xs text-gray-400 italic">[] empty</span>}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5">
                  ❌ ច្រោះចេញ ({failing.length})
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {failing.map((n, i) => <ArrayChip key={i} value={String(n)} color="#9ca3af" dimmed />)}
                </div>
              </div>
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"// .filter() returns a SHORTER (or equal) array"}</div>
            <div><span className="text-blue-400">const</span> <span className="text-white">nums</span> = [<span className="text-orange-300">{ex.input.join(", ")}</span>];</div>
            <div><span className="text-blue-400">const</span> <span className="text-white">result</span> = nums.<span style={{ color: ex.color }}>filter</span>(<span className="text-yellow-300">{ex.fnStr}</span>);</div>
            <div className="text-gray-400 mt-1">// result → [<span style={{ color: ex.color }}>{passing.join(", ")}</span>]</div>
          </div>

          <div className="rounded-xl p-3 text-xs font-semibold bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
            📌 <strong>.filter()</strong> ត្រឡប់ Array ថ្មីដែលមាន <strong>element តិចជាង ឬស្មើ</strong> — element ណាដែល callback ត្រឡប់ <code className="bg-green-100 dark:bg-green-900 px-1 rounded">false</code> នឹងត្រូវច្រោះចេញ។
          </div>
        </div>
      </div>
    </div>
  );
}

