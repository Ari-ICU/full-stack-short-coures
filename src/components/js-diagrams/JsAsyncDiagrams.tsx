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
            <div className="text-green-400">console.log(<span className="text-yellow-300">&quot;Start&quot;</span>);</div>
            <div className={mode === "sync" ? "text-red-400" : "text-indigo-400"}>
              {mode === "sync" ? "fetchData(); // ⚠️ blocks everything" : "await fetchData(); // 🚀 non-blocking"}
            </div>
            <div className="text-green-400">console.log(<span className="text-yellow-300">&quot;Middle&quot;</span>);</div>
            <div className="text-green-400">console.log(<span className="text-yellow-300">&quot;End&quot;</span>);</div>
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

// ─── 2. Promise States Diagram ────────────────────────────────────────────────
export function PromiseStatesDiagram() {
  const [state, setState] = useState<"pending" | "fulfilled" | "rejected">("pending");
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function simulate(result: "fulfilled" | "rejected") {
    setState("pending");
    setRunning(true);
    timerRef.current = setTimeout(() => {
      setState(result);
      setRunning(false);
    }, 1500);
  }

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState("pending");
    setRunning(false);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const stateConfig = {
    pending:   { color: "#f97316", bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-300 dark:border-orange-700", label: "⏳ Pending", desc: "កំពុងរង់ចាំ — ទិន្នន័យមិនទាន់មក" },
    fulfilled: { color: "#22c55e", bg: "bg-green-50 dark:bg-green-950/20",   border: "border-green-300 dark:border-green-700",   label: "✅ Fulfilled", desc: "ជោគជ័យ — ទិន្នន័យបានមក!" },
    rejected:  { color: "#ef4444", bg: "bg-red-50 dark:bg-red-950/20",       border: "border-red-300 dark:border-red-700",       label: "❌ Rejected", desc: "បរាជ័យ — មាន Error!" },
  };
  const cfg = stateConfig[state];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Promise — Pending / Fulfilled / Rejected" badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />
        <div className="p-6 space-y-5">

          {/* States flow */}
          <div className="flex items-center gap-2 text-[10px] font-bold">
            {(["pending", "fulfilled", "rejected"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-900 dark:text-gray-100">{s === "fulfilled" ? "→" : "→"}</span>}
                <div className={`px-2 py-1 rounded-lg border-2 transition-all ${state === s ? `${stateConfig[s].bg} ${stateConfig[s].border}` : "border-gray-200 dark:border-gray-700 opacity-40"}`}
                  style={{ color: state === s ? stateConfig[s].color : undefined }}>
                  {stateConfig[s].label}
                </div>
              </div>
            ))}
          </div>

          {/* Big state display */}
          <div className={`rounded-xl border-2 p-5 text-center transition-all ${cfg.bg} ${cfg.border}`}>
            <div className="text-3xl font-bold mb-1" style={{ color: cfg.color }}>{cfg.label}</div>
            <div className="text-xs font-semibold" style={{ color: cfg.color }}>{cfg.desc}</div>
            {running && <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 animate-pulse">⏳ Promise is pending...</div>}
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div><span className="text-blue-400">const</span> <span className="text-white">promise</span> = <span className="text-yellow-300">fetchData</span>();</div>
            <div className={`transition-colors ${state === "pending" ? "text-orange-400 font-bold" : "text-gray-500"}`}>
              {"// ⏳ Pending — រង់ចាំ..."}
            </div>
            <div className={`transition-colors ${state === "fulfilled" ? "text-green-400 font-bold" : "text-gray-500"}`}>
              .then(data =&gt; console.log(data)); {"// ✅ Fulfilled"}
            </div>
            <div className={`transition-colors ${state === "rejected" ? "text-red-400 font-bold" : "text-gray-500"}`}>
              .catch(err =&gt; console.log(err)); {"// ❌ Rejected"}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            <button onClick={() => simulate("fulfilled")} disabled={running}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              ✅ Resolve (success)
            </button>
            <button onClick={() => simulate("rejected")} disabled={running}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              ❌ Reject (error)
            </button>
            {!running && state !== "pending" && (
              <button onClick={reset}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. async/await Flow Diagram ─────────────────────────────────────────────
export function AsyncAwaitDiagram() {
  const [result, setResult] = useState<"success" | "error">("success");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const steps = [
    { label: "① async function fetchUserData() called",        color: "#6366f1" },
    { label: "② console.log('ចាប់ផ្តើមទាញយក...')",           color: "#6366f1" },
    { label: "③ await getServerData() — ផ្អាករង់ចាំ...",      color: "#f97316" },
    { label: "④ code outside continues running immediately",    color: "#22c55e" },
    result === "success"
      ? { label: "⑤ ✅ data received → console.log(data)",     color: "#22c55e" }
      : { label: "⑤ ❌ error! → catch block runs",             color: "#ef4444" },
  ];

  function runDemo() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStep(-1);
    setRunning(true);
    steps.forEach((_, i) => {
      const t = setTimeout(() => {
        setStep(i);
        if (i === steps.length - 1) setTimeout(() => setRunning(false), 400);
      }, 400 + i * 700);
      timersRef.current.push(t);
    });
  }

  function reset() {
    timersRef.current.forEach(clearTimeout);
    setStep(-1);
    setRunning(false);
  }

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="async / await — Execution Flow" badge="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" />
        <div className="p-6 space-y-4">

          {/* Result selector */}
          <div className="flex gap-2">
            <button onClick={() => { setResult("success"); reset(); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all ${result === "success" ? "bg-green-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}>
              ✅ Success path
            </button>
            <button onClick={() => { setResult("error"); reset(); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all ${result === "error" ? "bg-red-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}>
              ❌ Error path
            </button>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border-2 text-xs font-mono transition-all duration-300 ${
                i === step ? "scale-[1.02]" : i < step ? "opacity-60" : "opacity-30"
              }`} style={{
                borderColor: i <= step ? s.color : "#374151",
                background: i === step ? s.color + "18" : "transparent",
                color: i <= step ? s.color : "#6b7280",
              }}>
                <span className="font-bold shrink-0">{i === step && running ? "▶" : i < step ? "✓" : "○"}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Console output */}
          {step >= 0 && (
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="text-gray-400 mb-1">{"// console output:"}</div>
              {step >= 1 && <div className="text-indigo-400">ចាប់ផ្តើមទាញយកទិន្នន័យ...</div>}
              {step >= 3 && <div className="text-green-400">ខ្ញុំជាកូដខាងក្រៅ ខ្ញុំរត់មុនហើយ!</div>}
              {step >= 4 && result === "success" && <div className="text-green-400">ទទួលបានទិន្នន័យ: {"{ name: 'Sok', age: 25 }"}</div>}
              {step >= 4 && result === "error"   && <div className="text-red-400">បរាជ័យ: Network Error</div>}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button onClick={runDemo} disabled={running}
              className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              ▶ Run fetchUserData()
            </button>
            {step >= 0 && !running && (
              <button onClick={reset}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>

          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 px-3 py-2 text-[11px] text-indigo-700 dark:text-indigo-300">
            💡 <code className="font-mono bg-indigo-100 dark:bg-indigo-900/50 px-1 rounded">await</code> ផ្អាករង់ចាំ<strong>តែ function ខាងក្នុង</strong> — កូដខាងក្រៅ (step ④) បន្ត<strong>ភ្លាម</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
