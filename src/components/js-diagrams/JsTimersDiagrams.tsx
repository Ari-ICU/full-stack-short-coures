"use client";

import { useState, useEffect, useRef } from "react";

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

// ─── 1. setTimeout Diagram ────────────────────────────────────────────────────
export function SetTimeoutDiagram() {
  const [delay, setDelay] = useState(3);
  const [phase, setPhase] = useState<"idle" | "waiting" | "fired">("idle");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    if (phase === "waiting") return;
    setPhase("waiting");
    setElapsed(0);

    tickRef.current = setInterval(() => {
      setElapsed((e) => e + 100);
    }, 100);

    timerRef.current = setTimeout(() => {
      clearInterval(tickRef.current!);
      setPhase("fired");
    }, delay * 1000);
  }

  function reset() {
    clearTimeout(timerRef.current!);
    clearInterval(tickRef.current!);
    setPhase("idle");
    setElapsed(0);
  }

  useEffect(() => () => { clearTimeout(timerRef.current!); clearInterval(tickRef.current!); }, []);

  const progress = Math.min((elapsed / (delay * 1000)) * 100, 100);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="setTimeout — ពន្យារពេល" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-5">

          {/* Delay selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-gray-900 dark:text-gray-100">delay (ms)</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{delay * 1000} ms = {delay}s</span>
            </div>
            <input type="range" min={1} max={5} value={delay}
              onChange={(e) => { reset(); setDelay(+e.target.value); }}
              className="w-full h-2 rounded-full cursor-pointer accent-blue-500"
              disabled={phase === "waiting"}
            />
            <div className="flex justify-between text-[10px] text-gray-900 dark:text-gray-100 font-mono">
              <span>1000ms</span><span>2000ms</span><span>3000ms</span><span>4000ms</span><span>5000ms</span>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
              <span>ដំណើរការ</span>
              <span>{phase === "waiting" ? `${(elapsed/1000).toFixed(1)}s / ${delay}s` : phase === "fired" ? `${delay}s — ចប់!` : "0s"}</span>
            </div>
            <div className="h-6 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
              <div
                className="h-full rounded-full transition-none flex items-center justify-end pr-2"
                style={{
                  width: `${progress}%`,
                  background: phase === "fired" ? "#22c55e" : "#3b82f6",
                  transition: phase === "waiting" ? "width 0.1s linear" : "none",
                }}
              >
                {progress > 15 && (
                  <span className="text-white text-[10px] font-bold">
                    {phase === "fired" ? "✅ fired!" : "⏳"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Flow steps */}
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
            {[
              { step: "① setTimeout(fn,", step2: `${delay*1000})`, active: phase !== "idle", color: "blue" },
              { step: "② រង់ចាំ", step2: `${delay} វិនាទី...`, active: phase === "waiting", color: "orange" },
              { step: "③ fn() runs!", step2: "showPopup()", active: phase === "fired", color: "green" },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl border-2 p-2 font-mono transition-all duration-300 ${
                s.active
                  ? s.color === "blue"   ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300"
                  : s.color === "orange" ? "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-300"
                  :                        "border-green-400 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-300"
                  : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 opacity-40"
              }`}>
                <div className="font-bold">{s.step}</div>
                <div className="opacity-80">{s.step2}</div>
              </div>
            ))}
          </div>

          {/* Output */}
          <div className={`rounded-xl px-4 py-2.5 text-xs font-mono border transition-all ${
            phase === "fired"
              ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          }`}>
            <span className="text-[10px] uppercase font-bold opacity-60 mr-2">console:</span>
            {phase === "fired" ? `✅ "សូមស្វាគមន៍! មានចង់ចុះឈ្មោះទេ?" (after ${delay}s)` : phase === "waiting" ? "⏳ រង់ចាំ..." : "— (មិនទាន់ run)"}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {phase === "idle" && (
              <button onClick={start}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all">
                ▶ setTimeout(fn, {delay * 1000})
              </button>
            )}
            {phase === "waiting" && (
              <button onClick={reset}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ✕ clearTimeout
              </button>
            )}
            {phase === "fired" && (
              <button onClick={reset}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-3 py-2 text-[11px] text-blue-700 dark:text-blue-300">
            💡 កូដខាងក្រោម <code className="font-mono bg-blue-100 dark:bg-blue-900/50 px-1 rounded">setTimeout</code> នឹងបន្ត<strong>ភ្លាម</strong> — មិនរង់ចាំ {delay} វិនាទីនោះឡើយ!
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. setInterval Diagram ───────────────────────────────────────────────────
export function SetIntervalDiagram() {
  const [running, setRunning] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(0);

  function start() {
    if (running) return;
    setRunning(true);
    countRef.current = 0;
    setTicks([]);
    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      setTicks((t) => [...t.slice(-7), countRef.current]);
    }, speed);
  }

  function stop() {
    clearInterval(intervalRef.current!);
    setRunning(false);
  }

  function reset() {
    stop();
    setTicks([]);
    countRef.current = 0;
  }

  useEffect(() => () => clearInterval(intervalRef.current!), []);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="setInterval — ច្រំដែលៗ" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-5">

          {/* Speed selector */}
          <div className="flex gap-2 justify-center">
            {[500, 1000, 2000].map((ms) => (
              <button key={ms} onClick={() => { reset(); setSpeed(ms); }}
                disabled={running}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed
                  ${speed === ms ? "bg-purple-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}>
                {ms}ms
              </button>
            ))}
          </div>

          {/* Tick visualizer */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 tracking-widest">Tick log</div>
            <div className="flex gap-1.5 flex-wrap min-h-[2.5rem] items-center">
              {ticks.length === 0 && (
                <span className="text-xs text-gray-900 dark:text-gray-100 italic">— ចុច Start ដើម្បីចាប់ផ្តើម</span>
              )}
              {ticks.map((t, i) => (
                <span key={i}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white transition-all ${
                    i === ticks.length - 1 ? "scale-125 bg-purple-500" : "bg-purple-400/70"
                  }`}>
                  {t}
                </span>
              ))}
              {running && (
                <span className="w-9 h-9 rounded-xl border-2 border-dashed border-purple-400 animate-pulse flex items-center justify-center text-purple-400 text-xs">
                  ...
                </span>
              )}
            </div>
          </div>

          {/* Code display */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"// ដំណើរការរៀងរាល់"} <span className="text-purple-400">{speed}ms</span></div>
            <div><span className="text-blue-400">const</span> <span className="text-white">id</span> = <span className="text-yellow-300">setInterval</span>(<span className="text-orange-300">() =&gt;</span> {"{"}</div>
            <div className="pl-4"><span className="text-white">count++</span>;</div>
            <div className="pl-4"><span className={`transition-colors ${running ? "text-green-400" : "text-gray-500"}`}>console.<span className="text-yellow-300">log</span>(<span className="text-green-300">&quot;Tick!&quot;</span>, count);</span></div>
            <div>{"}"}, <span className="text-purple-400">{speed}</span>);</div>
            {ticks.length > 0 && <div className="text-green-400 mt-1">{"// → Tick! " + ticks.length}</div>}
          </div>

          {/* Status */}
          <div className={`rounded-xl px-3 py-2 text-[11px] font-semibold border ${
            running
              ? "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
              : ticks.length > 0
                ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          }`}>
            {running
              ? `⚡ រត់ — Tick #${ticks[ticks.length - 1] ?? 0} (រៀងរាល់ ${speed}ms)`
              : ticks.length > 0
                ? `⏹ បានបញ្ឈប់ — Ticks សរុប: ${ticks[ticks.length - 1] ?? 0}`
                : "⬜ មិនទាន់ start — ប្រើ clearInterval(id) ដើម្បីបញ្ឈប់"}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {!running ? (
              <button onClick={start}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 cursor-pointer transition-all">
                ▶ setInterval(fn, {speed})
              </button>
            ) : (
              <button onClick={stop}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-all">
                ⏹ clearInterval(id)
              </button>
            )}
            {ticks.length > 0 && !running && (
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

// ─── 3. clearInterval — auto-stop at N ───────────────────────────────────────
export function ClearIntervalDiagram() {
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [limit, setLimit] = useState(5);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(0);

  function start() {
    if (running) return;
    setRunning(true);
    setStopped(false);
    setCount(0);
    countRef.current = 0;

    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      setCount(countRef.current);
      if (countRef.current >= limit) {
        clearInterval(intervalRef.current!);
        setRunning(false);
        setStopped(true);
      }
    }, 800);
  }

  function reset() {
    clearInterval(intervalRef.current!);
    setRunning(false);
    setStopped(false);
    setCount(0);
    countRef.current = 0;
  }

  useEffect(() => () => clearInterval(intervalRef.current!), []);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="clearInterval — បញ្ឈប់ setInterval" badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />
        <div className="p-6 space-y-5">

          {/* Limit selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-900 dark:text-gray-100 font-mono shrink-0">stop at count =</span>
            <div className="flex gap-1.5">
              {[3, 5, 8].map((n) => (
                <button key={n} onClick={() => { reset(); setLimit(n); }}
                  disabled={running}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed
                    ${limit === n ? "bg-orange-500 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-900 bg-white dark:bg-gray-800"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Counter dots */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 tracking-widest">ការរាប់</div>
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: limit }).map((_, i) => {
                const filled = i < count;
                const isLast  = i === limit - 1 && stopped;
                return (
                  <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                    isLast  ? "bg-red-500 border-red-400 text-white scale-110" :
                    filled  ? "bg-orange-500 border-orange-400 text-white" :
                    running && i === count ? "border-orange-400 border-dashed text-orange-400 animate-pulse" :
                    "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  }`}>
                    {isLast ? "🛑" : filled ? i + 1 : i + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div><span className="text-blue-400">const</span> <span className="text-white">timerId</span> = <span className="text-yellow-300">setInterval</span>(<span className="text-orange-300">() =&gt;</span> {"{"}</div>
            <div className="pl-4"><span className="text-white">count++</span>;</div>
            <div className="pl-4 text-gray-300">if (count === <span className="text-purple-400">{limit}</span>) {"{"}</div>
            <div className={`pl-8 transition-colors ${stopped ? "text-red-400 font-bold" : "text-gray-500"}`}>
              clearInterval(timerId);
            </div>
            <div className={`pl-8 transition-colors ${stopped ? "text-green-400" : "text-gray-500"}`}>
              console.log(&quot;បញ្ឈប់ការរាប់!&quot;);
            </div>
            <div className="pl-4 text-gray-300">{"}"}</div>
            <div>{"}"}, <span className="text-purple-400">800</span>);</div>
            {stopped && <div className="text-green-400 mt-1">{"// ✅ clearInterval ត្រូវបានហៅ — timer បញ្ឈប់"}</div>}
          </div>

          {/* Status */}
          <div className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-mono border ${
            stopped
              ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
              : running
                ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}>
            <span className={stopped ? "text-red-600 dark:text-red-400" : running ? "text-orange-600 dark:text-orange-400" : "text-gray-900 dark:text-gray-100"}>
              {stopped ? "🛑 clearInterval ត្រូវបានហៅ!" : running ? `⚡ count = ${count}` : "⬜ ready"}
            </span>
            <span className="text-gray-900 dark:text-gray-100">{count} / {limit}</span>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {!running && !stopped && (
              <button onClick={start}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer transition-all">
                ▶ Start (stop at {limit})
              </button>
            )}
            {(running || stopped) && (
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

// ─── 4. clearTimeout — cancel before it fires ────────────────────────────────
export function ClearTimeoutDiagram() {
  const [delay] = useState(5);
  const [phase, setPhase] = useState<"idle" | "waiting" | "cancelled" | "fired">("idle");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    setPhase("waiting");
    setElapsed(0);
    tickRef.current = setInterval(() => setElapsed((e) => e + 100), 100);
    timerRef.current = setTimeout(() => {
      clearInterval(tickRef.current!);
      setPhase("fired");
    }, delay * 1000);
  }

  function cancel() {
    clearTimeout(timerRef.current!);
    clearInterval(tickRef.current!);
    setPhase("cancelled");
  }

  function reset() {
    clearTimeout(timerRef.current!);
    clearInterval(tickRef.current!);
    setPhase("idle");
    setElapsed(0);
  }

  useEffect(() => () => { clearTimeout(timerRef.current!); clearInterval(tickRef.current!); }, []);

  const progress = Math.min((elapsed / (delay * 1000)) * 100, 100);

  const steps = [
    { label: "① setTimeout(fn, 5000)", desc: "ចុះឈ្មោះ timer", active: phase !== "idle", color: "#3b82f6" },
    { label: "② រង់ចាំ 5s...", desc: "timer កំពុងដំណើរការ", active: phase === "waiting", color: "#f97316" },
    { label: phase === "cancelled" ? "③ clearTimeout! ✕" : "③ fn() fires", desc: phase === "cancelled" ? "cancelled!" : "message shows", active: phase === "cancelled" || phase === "fired", color: phase === "cancelled" ? "#ef4444" : "#22c55e" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="clearTimeout — Cancel មុនពេលវា Fire" badge="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" />
        <div className="p-6 space-y-5">

          {/* Timeline */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
              <span>Timer progress</span>
              <span>
                {phase === "cancelled" ? `❌ Cancelled at ${(elapsed/1000).toFixed(1)}s` :
                 phase === "fired"     ? "✅ Fired at 5s" :
                 phase === "waiting"   ? `${(elapsed/1000).toFixed(1)}s / 5s` : "0s / 5s"}
              </span>
            </div>
            <div className="h-6 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
              <div
                className="h-full rounded-full flex items-center justify-end pr-2"
                style={{
                  width: `${progress}%`,
                  background: phase === "cancelled" ? "#ef4444" : phase === "fired" ? "#22c55e" : "#f97316",
                  transition: phase === "waiting" ? "width 0.1s linear" : "none",
                }}
              >
                {progress > 10 && (
                  <span className="text-white text-[10px] font-bold">
                    {phase === "cancelled" ? "✕" : phase === "fired" ? "✅" : "⏳"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
            {steps.map((s, i) => (
              <div key={i} className={`rounded-xl border-2 p-2 transition-all duration-300 ${
                s.active ? "opacity-100 scale-[1.02]" : "opacity-30"
              }`} style={{ borderColor: s.active ? s.color : "#374151", background: s.active ? s.color + "18" : "transparent" }}>
                <div className="font-mono font-bold" style={{ color: s.active ? s.color : "#6b7280" }}>{s.label}</div>
                <div className="mt-0.5 opacity-75" style={{ color: s.active ? s.color : "#6b7280" }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div><span className="text-blue-400">const</span> <span className="text-white">myTimeout</span> = <span className="text-yellow-300">setTimeout</span>(<span className="text-orange-300">() =&gt;</span> {"{"}</div>
            <div className={`pl-4 transition-colors ${phase === "fired" ? "text-green-400" : phase === "cancelled" ? "line-through text-gray-600" : "text-gray-400"}`}>
              console.log(&quot;មិនទាន់ដល់ពេលផង ត្រូវគេ Cancel!&quot;);
            </div>
            <div>{"}"}, <span className="text-purple-400">5000</span>);</div>
            <div className="mt-1 text-gray-400">{"// ..."}</div>
            <div className={`transition-colors ${phase === "cancelled" ? "text-red-400 font-bold" : "text-gray-500"}`}>
              <span className="text-yellow-300">clearTimeout</span>(myTimeout); <span className="text-gray-500">{"// Cancel!"}</span>
            </div>
          </div>

          {/* Output */}
          <div className={`rounded-xl px-4 py-2.5 text-xs font-mono border transition-all ${
            phase === "cancelled"
              ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
              : phase === "fired"
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          }`}>
            <span className="text-[10px] uppercase font-bold opacity-60 mr-2">console:</span>
            {phase === "cancelled" ? "❌ (ស្ងាត់ — clearTimeout បានលុបចោល)" :
             phase === "fired"     ? '✅ "មិនទាន់ដល់ពេលផង ត្រូវគេ Cancel!" (fired!)' :
             phase === "waiting"   ? "⏳ រង់ចាំ..." : "— (មិនទាន់ run)"}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {phase === "idle" && (
              <button onClick={start}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer transition-all">
                ▶ Start (5s timer)
              </button>
            )}
            {phase === "waiting" && (
              <button onClick={cancel}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 cursor-pointer transition-all animate-pulse">
                ✕ clearTimeout(myTimeout)
              </button>
            )}
            {(phase === "cancelled" || phase === "fired") && (
              <button onClick={reset}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Try again
              </button>
            )}
          </div>

          <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-3 py-2 text-[11px] text-red-700 dark:text-red-300">
            💡 ចុច <strong>Start</strong> ហើយ<strong>ចុច Cancel</strong> មុនពេល 5s ដើម្បីឃើញ clearTimeout ដំណើរការ — ឬរង់ចាំ 5s ដើម្បីឃើញ fn ដំណើរការ
          </div>
        </div>
      </div>
    </div>
  );
}
