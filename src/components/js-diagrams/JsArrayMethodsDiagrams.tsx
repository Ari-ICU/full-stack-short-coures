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
