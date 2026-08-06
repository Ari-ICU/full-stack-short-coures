"use client";

import { useState, useEffect, useRef } from "react";

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

// ─── 1. Sync vs Async Diagram ─────────────────────────────────────────────────
export function SyncAsyncDiagram() {
  const [mode, setMode] = useState<"sync" | "async">("sync");
  const [log, setLog] = useState<{ text: string; color: string }[]>([]);
  const [running, setRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimeouts() { timeoutRef.current.forEach(clearTimeout); timeoutRef.current = []; }

  function run() {
    clearTimeouts();
    setLog([]);
    setRunning(true);

    const push = (text: string, color: string, delay: number) => {
      const t = setTimeout(() => setLog(l => [...l, { text, color }]), delay);
      timeoutRef.current.push(t);
    };
    const done = setTimeout(() => setRunning(false), mode === "sync" ? 3200 : 2200);
    timeoutRef.current.push(done);

    if (mode === "sync") {
      push("▶ line 1: console.log('Start')",         "#22c55e", 100);
      push("⏳ line 2: fetchData() — ⚠️ BLOCKING 2s...", "#ef4444", 300);
      push("⏸ line 3: console.log('Middle') — waiting...", "#f97316", 400);
      push("⏸ line 4: console.log('End') — waiting...",    "#f97316", 500);
      push("✅ line 2 done: data received",           "#22c55e", 2300);
      push("▶ line 3: console.log('Middle')",         "#22c55e", 2400);
      push("▶ line 4: console.log('End')",            "#22c55e", 2600);
    } else {
      push("▶ line 1: console.log('Start')",          "#22c55e", 100);
      push("🚀 line 2: fetchData() async — non-blocking", "#6366f1", 300);
      push("▶ line 3: console.log('Middle') ← runs immediately!", "#22c55e", 500);
      push("▶ line 4: console.log('End') ← runs immediately!",    "#22c55e", 700);
      push("✅ line 2 done (after ~1.5s): data received", "#6366f1", 1800);
    }
  }

  function reset() { clearTimeouts(); setLog([]); setRunning(false); }
  useEffect(() => () => clearTimeouts(), []);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Sync vs Async" badge="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" />
        <div className="p-6 space-y-4">

          {/* Mode toggle */}
          <div className="flex gap-2">
            {(["sync", "async"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); reset(); }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all ${mode === m ? m === "sync" ? "bg-red-600 border-transparent text-white" : "bg-indigo-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}>
                {m === "sync" ? "🔴 Synchronous (Blocking)" : "🚀 Asynchronous (Non-blocking)"}
              </button>
            ))}
          </div>

          {/* Code preview */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div className="text-green-400">console.log(<span className="text-yellow-300">"Start"</span>);</div>
            <div className={mode === "sync" ? "text-red-400" : "text-indigo-400"}>
              {mode === "sync" ? "fetchData(); // ⚠️ blocks everything" : "await fetchData(); // 🚀 non-blocking"}
            </div>
            <div className="text-green-400">console.log(<span className="text-yellow-300">"Middle"</span>);</div>
            <div className="text-green-400">console.log(<span className="text-yellow-300">"End"</span>);</div>
          </div>

          {/* Execution log */}
          <div className="space-y-1 min-h-[7rem]">
            <div className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 tracking-widest mb-1">Execution log</div>
            {log.length === 0 && !running && (
              <div className="text-xs text-gray-900 dark:text-gray-100 italic">← ចុច Run ដើម្បីមើល</div>
            )}
            {log.map((l, i) => (
              <div key={i} className="text-xs font-mono px-2 py-1 rounded-lg bg-gray-50 dark:bg-gray-800" style={{ color: l.color }}>{l.text}</div>
            ))}
            {running && <div className="text-xs text-gray-400 italic animate-pulse">running...</div>}
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={run} disabled={running}
              className={`px-6 py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed ${mode === "sync" ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"}`}>
              ▶ Run ({mode})
            </button>
            {log.length > 0 && !running && (
              <button onClick={reset}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
