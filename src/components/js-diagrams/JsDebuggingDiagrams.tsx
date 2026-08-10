"use client";

import { useState, useRef, useEffect } from "react";

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

// ─── 1. Console Methods Simulator ────────────────────────────────────────────
type ConsoleMethod = "log" | "warn" | "error" | "table";

const CONSOLE_EXAMPLES: Record<ConsoleMethod, { code: string; output: React.ReactNode }> = {
  log: {
    code: `const name = "Dara";\nconst age = 25;\nconsole.log("ឈ្មោះ:", name);\nconsole.log("អាយុ:", age);\nconsole.log({ name, age });`,
    output: null,
  },
  warn: {
    code: `const age = 15;\nif (age < 18) {\n  console.warn("⚠️ អ្នកប្រើប្រាស់មិនទាន់គ្រប់អាយុ");\n}`,
    output: null,
  },
  error: {
    code: `try {\n  callFakeAPI();\n} catch (err) {\n  console.error("❌ API Error:", err.message);\n}`,
    output: null,
  },
  table: {
    code: `const users = [\n  { id: 1, name: "Sok",  role: "Admin" },\n  { id: 2, name: "Dara", role: "User"  },\n  { id: 3, name: "Alice",role: "User"  },\n];\nconsole.table(users);`,
    output: null,
  },
};

const TABLE_DATA = [
  { id: 1, name: "Sok",   role: "Admin" },
  { id: 2, name: "Dara",  role: "User"  },
  { id: 3, name: "Alice", role: "User"  },
];

export function ConsoleMethodsDiagram() {
  const [method, setMethod] = useState<ConsoleMethod>("log");
  const [ran, setRan] = useState(false);

  const cfg = {
    log:   { color: "#e5e7eb", textColor: "#d1d5db", bg: "bg-gray-900",   label: "console.log()",   badge: "bg-gray-700 text-gray-200",   icon: "📋" },
    warn:  { color: "#fef08a", textColor: "#ca8a04",  bg: "bg-yellow-950", label: "console.warn()",  badge: "bg-yellow-800 text-yellow-200", icon: "⚠️" },
    error: { color: "#fecaca", textColor: "#dc2626",  bg: "bg-red-950",    label: "console.error()", badge: "bg-red-800 text-red-200",       icon: "❌" },
    table: { color: "#bbf7d0", textColor: "#16a34a",  bg: "bg-gray-900",   label: "console.table()", badge: "bg-green-800 text-green-200",   icon: "📊" },
  }[method];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Console Methods" badge="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300" />
        <div className="p-6 space-y-4">

          {/* Method tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["log", "warn", "error", "table"] as ConsoleMethod[]).map((m) => (
              <button key={m} onClick={() => { setMethod(m); setRan(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all font-mono ${
                  method === m
                    ? m === "log"   ? "bg-gray-700 border-transparent text-white"
                    : m === "warn"  ? "bg-yellow-500 border-transparent text-white"
                    : m === "error" ? "bg-red-600 border-transparent text-white"
                    :                 "bg-green-600 border-transparent text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                }`}>
                {m === "log" ? "📋" : m === "warn" ? "⚠️" : m === "error" ? "❌" : "📊"} .{m}()
              </button>
            ))}
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono">
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">{CONSOLE_EXAMPLES[method].code}</pre>
          </div>

          {/* Run button */}
          <div className="flex justify-center">
            <button onClick={() => setRan(true)}
              className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all">
              ▶ Run
            </button>
          </div>

          {/* DevTools output simulation */}
          {ran && (
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <div className="bg-gray-800 px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <span>Console</span>
                <span className="ml-auto text-gray-500">DevTools</span>
              </div>
              <div className={`p-3 space-y-1.5 ${cfg.bg}`}>
                {method === "log" && (
                  <>
                    <div className="flex gap-2 text-xs font-mono text-gray-300">
                      <span className="text-gray-500 shrink-0">›</span>
                      <span>ឈ្មោះ: <span className="text-green-300">&quot;Dara&quot;</span></span>
                    </div>
                    <div className="flex gap-2 text-xs font-mono text-gray-300">
                      <span className="text-gray-500 shrink-0">›</span>
                      <span>អាយុ: <span className="text-orange-300">25</span></span>
                    </div>
                    <div className="flex gap-2 text-xs font-mono text-gray-300">
                      <span className="text-gray-500 shrink-0">›</span>
                      <span className="text-blue-300">{"▶ {name: \"Dara\", age: 25}"}</span>
                    </div>
                  </>
                )}
                {method === "warn" && (
                  <div className="flex gap-2 text-xs font-mono items-start bg-yellow-900/40 border-l-2 border-yellow-400 px-2 py-1.5 rounded-r">
                    <span className="text-yellow-400 shrink-0">⚠</span>
                    <span className="text-yellow-300">⚠️ អ្នកប្រើប្រាស់មិនទាន់គ្រប់អាយុ</span>
                  </div>
                )}
                {method === "error" && (
                  <div className="flex gap-2 text-xs font-mono items-start bg-red-900/40 border-l-2 border-red-500 px-2 py-1.5 rounded-r">
                    <span className="text-red-400 shrink-0">✖</span>
                    <span className="text-red-300">❌ API Error: callFakeAPI is not defined</span>
                  </div>
                )}
                {method === "table" && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-gray-700">
                          {["(index)", "id", "name", "role"].map((h) => (
                            <th key={h} className="px-3 py-1.5 text-left text-[10px] font-bold text-green-300 border border-gray-600">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {TABLE_DATA.map((row, i) => (
                          <tr key={i} className="border-t border-gray-700 hover:bg-gray-800/50">
                            <td className="px-3 py-1 text-gray-500 border border-gray-700">{i}</td>
                            <td className="px-3 py-1 text-orange-300 border border-gray-700">{row.id}</td>
                            <td className="px-3 py-1 text-yellow-300 border border-gray-700">&quot;{row.name}&quot;</td>
                            <td className="px-3 py-1 text-green-300 border border-gray-700">&quot;{row.role}&quot;</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {ran && (
            <div className="flex justify-center">
              <button onClick={() => setRan(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 2. Breakpoints / DevTools Diagram ───────────────────────────────────────
const BP_LINES = [
  { n: 1,  code: "function calculateTotal(price, tax) {",          pausable: false },
  { n: 2,  code: "  let subtotal = price;",                         pausable: true  },
  { n: 3,  code: "  let discount = subtotal > 50 ? 10 : 0;",        pausable: true  },
  { n: 4,  code: "  let total = subtotal - discount + tax;",         pausable: true  },
  { n: 5,  code: "  return total;",                                  pausable: true  },
  { n: 6,  code: "}",                                                pausable: false },
];

const BP_SCOPE: Record<number, { label: string; vars: { name: string; value: string }[] }> = {
  2: { label: "After line 2", vars: [{ name: "price",    value: "100" }, { name: "tax",      value: "10"  }, { name: "subtotal", value: "100" }] },
  3: { label: "After line 3", vars: [{ name: "subtotal", value: "100" }, { name: "discount", value: "10"  }] },
  4: { label: "After line 4", vars: [{ name: "subtotal", value: "100" }, { name: "discount", value: "10"  }, { name: "total",    value: "100" }] },
  5: { label: "Return value", vars: [{ name: "return ←", value: "100" }] },
};

export function BreakpointsDiagram() {
  const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set([3]));
  const [paused, setPaused] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toggleBreakpoint(n: number) {
    if (paused !== null) return;
    setBreakpoints((prev) => {
      const s = new Set(prev);
      if (s.has(n)) {
        s.delete(n);
      } else {
        s.add(n);
      }
      return s;
    });
  }

  function runCode() {
    if (running) return;
    setPaused(null);
    setRunning(true);
    const bpLines = BP_LINES.filter((l) => l.pausable && breakpoints.has(l.n)).map((l) => l.n);
    if (bpLines.length === 0) {
      timerRef.current = setTimeout(() => { setRunning(false); }, 800);
      return;
    }
    timerRef.current = setTimeout(() => {
      setPaused(bpLines[0]);
      setRunning(false);
    }, 700);
  }

  function stepOver() {
    if (paused === null) return;
    const bpLines = BP_LINES.filter((l) => l.pausable && breakpoints.has(l.n)).map((l) => l.n);
    const idx = bpLines.indexOf(paused);
    if (idx < bpLines.length - 1) {
      setPaused(bpLines[idx + 1]);
    } else {
      setPaused(null);
    }
  }

  function resume() { setPaused(null); }
  function reset()  { setPaused(null); setRunning(false); }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const scopeData = paused ? BP_SCOPE[paused] : null;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="DevTools — Breakpoints & Scope Inspection" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-4">

          <div className="text-xs text-gray-600 dark:text-gray-400">
            ចុចលើ <strong>លេខបន្ទាត់</strong> ដើម្បីដាក់/លុប Breakpoint រួចចុច <strong>▶ Run</strong>
          </div>

          {/* Sources panel simulation */}
          <div className="rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center justify-between">
              <span>Sources — script.js</span>
              {paused !== null && (
                <span className="text-yellow-600 dark:text-yellow-400 animate-pulse font-semibold">⏸ Paused at line {paused}</span>
              )}
            </div>
            <div className="bg-gray-950 font-mono text-xs">
              {BP_LINES.map((line) => {
                const hasBp   = breakpoints.has(line.n);
                const isPaused = paused === line.n;
                return (
                  <div key={line.n}
                    className={`flex items-center gap-0 transition-all ${isPaused ? "bg-yellow-900/30" : ""}`}>
                    {/* Line number — clickable for breakpoint */}
                    <button
                      onClick={() => line.pausable && toggleBreakpoint(line.n)}
                      className={`w-8 shrink-0 text-right pr-2 py-1 text-[11px] transition-colors select-none ${
                        line.pausable ? "cursor-pointer hover:bg-gray-800" : "cursor-default"
                      } ${hasBp ? "text-red-400" : "text-gray-600"}`}>
                      {hasBp ? "🔴" : line.n}
                    </button>
                    {/* Pause indicator */}
                    <span className={`w-4 shrink-0 text-center text-[10px] ${isPaused ? "text-yellow-400" : "text-transparent"}`}>▶</span>
                    {/* Code */}
                    <span className={`py-1 pl-1 flex-1 ${isPaused ? "text-yellow-300 font-bold" : "text-gray-300"}`}>
                      {line.code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scope panel */}
          {scopeData && (
            <div className="rounded-xl border-2 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 overflow-hidden">
              <div className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-[10px] font-bold text-yellow-700 dark:text-yellow-300 uppercase tracking-wide">
                🔍 Scope — {scopeData.label}
              </div>
              <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {scopeData.vars.map((v) => (
                  <div key={v.name} className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-yellow-200 dark:border-yellow-800">
                    <div className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400">{v.name}</div>
                    <div className="text-sm font-bold font-mono text-orange-600 dark:text-orange-400">{v.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-2">
            {paused === null ? (
              <button onClick={runCode} disabled={running}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {running ? "⏳ Running..." : "▶ Run (F5)"}
              </button>
            ) : (
              <>
                <button onClick={stepOver}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all">
                  ⤵ Step Over (F10)
                </button>
                <button onClick={resume}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all">
                  ▶ Resume (F8)
                </button>
              </>
            )}
            <button onClick={reset}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
              ↺ Reset
            </button>
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-3 py-2 text-[11px] text-blue-700 dark:text-blue-300">
            💡 ពេល Paused, Chrome DevTools បង្ហាញ <strong>Variables ទាំងអស់</strong>នៅក្នុង Scope panel — អ្នកអាចឃើញ value ពិតប្រាកដនៅខណៈពេលនោះ
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. debugger Keyword — Step-Through ──────────────────────────────────────
const DEBUGGER_STEPS = [
  { line: 1, code: "function calculateTotal(price, tax) {",   vars: null,                                                                                    note: null },
  { line: 2, code: "  let subtotal = price;",                  vars: [{ n: "price", v: "100" }, { n: "tax", v: "10" }, { n: "subtotal", v: "100" }],          note: null },
  { line: 3, code: "  debugger; ← ⏸ PAUSED HERE",            vars: [{ n: "price", v: "100" }, { n: "tax", v: "10" }, { n: "subtotal", v: "100" }],          note: "Browser ឈប់ត្រង់ទីនេះ — DevTools បើកដោយស្វ័យប្រវត្តិ!" },
  { line: 4, code: "  let total = subtotal + tax;",            vars: [{ n: "subtotal", v: "100" }, { n: "tax", v: "10" }, { n: "total", v: "110" }],         note: null },
  { line: 5, code: "  return total;",                          vars: [{ n: "total", v: "110" }, { n: "return ←", v: "110" }],                                note: null },
  { line: 6, code: "}",                                        vars: null,                                                                                    note: null },
];

export function DebuggerKeywordDiagram() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() { timersRef.current.forEach(clearTimeout); timersRef.current = []; }

  function runDemo() {
    clearAll();
    setStep(-1);
    setRunning(true);
    // Animate lines 0–1 quickly, then pause at debugger (step 2), then wait for user
    [0, 1].forEach((i) => {
      const t = setTimeout(() => setStep(i), 300 + i * 500);
      timersRef.current.push(t);
    });
    const tPause = setTimeout(() => { setStep(2); setRunning(false); }, 1500);
    timersRef.current.push(tPause);
  }

  function stepOver() {
    if (step < DEBUGGER_STEPS.length - 1) setStep((s) => s + 1);
    else setStep(-1);
  }

  function resume() { setStep(DEBUGGER_STEPS.length - 1); }
  function reset()  { clearAll(); setStep(-1); setRunning(false); }

  useEffect(() => () => clearAll(), []);

  const current = step >= 0 ? DEBUGGER_STEPS[step] : null;
  const isPaused = step === 2 && !running;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="debugger — Keyword Pause" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">

          {/* Code with highlight */}
          <div className="rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wide flex justify-between">
              <span>script.js</span>
              {isPaused && <span className="text-purple-500 animate-pulse">⏸ Paused on debugger</span>}
              {running   && <span className="text-green-500 animate-pulse">▶ Running...</span>}
            </div>
            <div className="bg-gray-950 font-mono text-xs">
              {DEBUGGER_STEPS.map((s, i) => (
                <div key={i} className={`flex gap-2 px-3 py-0.5 transition-all duration-200 ${
                  i === step && i === 2 ? "bg-purple-900/40"
                  : i === step         ? "bg-indigo-900/30"
                  : i < step           ? "opacity-50"
                  :                      "opacity-30"
                }`}>
                  <span className={`w-4 shrink-0 text-[10px] ${i === step ? "text-yellow-400" : "text-transparent"}`}>▶</span>
                  <span className={`text-[10px] w-4 shrink-0 text-gray-600`}>{s.line}</span>
                  <span className={`${
                    i === step && i === 2 ? "text-purple-300 font-bold"
                    : i === step         ? "text-yellow-200 font-bold"
                    : i < step           ? "text-gray-400"
                    :                      "text-gray-600"
                  }`}>{s.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Variables panel — only show when paused/stepping */}
          {current?.vars && (
            <div className="rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/20 overflow-hidden">
              <div className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/40 text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                🔍 Variables at line {current.line}
              </div>
              <div className="p-3 flex flex-wrap gap-2">
                {current.vars.map((v) => (
                  <div key={v.n} className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-purple-200 dark:border-purple-800 text-xs font-mono">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{v.n}</span>
                    <span className="text-gray-400 mx-1">=</span>
                    <span className="text-orange-500 dark:text-orange-400 font-bold">{v.v}</span>
                  </div>
                ))}
              </div>
              {current.note && (
                <div className="mx-3 mb-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 px-3 py-2 text-[11px] text-purple-700 dark:text-purple-300 font-semibold">
                  💡 {current.note}
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-2">
            {step === -1 && !running && (
              <button onClick={runDemo}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 cursor-pointer transition-all">
                ▶ Run calculateTotal(100, 10)
              </button>
            )}
            {isPaused && (
              <>
                <button onClick={stepOver}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all">
                  ⤵ Step Over
                </button>
                <button onClick={resume}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all">
                  ▶ Resume
                </button>
              </>
            )}
            {step >= 0 && !running && !isPaused && step < DEBUGGER_STEPS.length - 1 && (
              <button onClick={stepOver}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all">
                ⤵ Step Over
              </button>
            )}
            {(step >= 0 || running) && (
              <button onClick={reset}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>

          <div className="rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 px-3 py-2 text-[11px] text-purple-700 dark:text-purple-300">
            💡 <code className="font-mono bg-purple-100 dark:bg-purple-900/50 px-1 rounded">debugger;</code> ដំណើរការ<strong>តែពេល DevTools បើក</strong>ប៉ុណ្ណោះ — ចងចាំ<strong>លុបចោល</strong>ពេលដាក់ Production!
          </div>
        </div>
      </div>
    </div>
  );
}
