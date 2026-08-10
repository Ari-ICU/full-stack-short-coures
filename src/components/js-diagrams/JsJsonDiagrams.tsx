"use client";

import { useState } from "react";

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

// ─── 1. JSON Format Diagram ───────────────────────────────────────────────────
const JSON_RULES = [
  { id: "dq",   label: 'Keys ត្រូវប្រើ ""',       good: '"name": "Sok"',       bad: "name: 'Sok'",          color: "#3b82f6" },
  { id: "str",  label: "String ត្រូវប្រើ double quotes", good: '"city": "Phnom Penh"', bad: "'city': 'Phnom Penh'", color: "#22c55e" },
  { id: "nofn", label: "គ្មាន Function",           good: '"age": 25',            bad: '"getAge": function(){}', color: "#f97316" },
  { id: "null", label: "null OK, undefined NO",    good: '"data": null',         bad: '"data": undefined',    color: "#a855f7" },
];

export function JsonFormatDiagram() {
  const [active, setActive] = useState(0);
  const rule = JSON_RULES[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="JSON Format Rules" badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />
        <div className="p-6 space-y-4">

          {/* Rule selector */}
          <div className="flex flex-wrap gap-2">
            {JSON_RULES.map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border-2 cursor-pointer transition-all ${active === i ? "text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
                style={{ background: active === i ? r.color : undefined }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Good vs Bad */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-3">
              <div className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400 mb-2">✅ ត្រឹមត្រូវ</div>
              <div className="bg-gray-900 rounded-lg p-2 text-xs font-mono text-green-400">{rule.good}</div>
            </div>
            <div className="rounded-xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-3">
              <div className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 mb-2">❌ មិនត្រឹមត្រូវ</div>
              <div className="bg-gray-900 rounded-lg p-2 text-xs font-mono text-red-400">{rule.bad}</div>
            </div>
          </div>

          {/* Full JSON example */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-0.5">
            <div className="text-gray-400 mb-1">{"// ✅ Valid JSON"}</div>
            <div className="text-white">{"{"}</div>
            <div className={`pl-4 transition-colors ${active === 0 ? "text-yellow-300 font-bold" : "text-gray-300"}`}>
              <span className="text-green-300">&quot;name&quot;</span>: <span className="text-yellow-300">&quot;Sok&quot;</span>,
            </div>
            <div className={`pl-4 transition-colors ${active === 2 ? "text-yellow-300 font-bold" : "text-gray-300"}`}>
              <span className="text-green-300">&quot;age&quot;</span>: <span className="text-orange-300">25</span>,
            </div>
            <div className={`pl-4 transition-colors ${active === 1 ? "text-yellow-300 font-bold" : "text-gray-300"}`}>
              <span className="text-green-300">&quot;city&quot;</span>: <span className="text-yellow-300">&quot;Phnom Penh&quot;</span>,
            </div>
            <div className={`pl-4 transition-colors ${active === 3 ? "text-yellow-300 font-bold" : "text-gray-300"}`}>
              <span className="text-green-300">&quot;data&quot;</span>: <span className="text-purple-400">null</span>
            </div>
            <div className="text-white">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. JSON.stringify() Diagram ─────────────────────────────────────────────
export function JsonStringifyDiagram() {
  const [name, setName]   = useState("Dara");
  const [age, setAge]     = useState(30);
  const [pretty, setPretty] = useState(false);
  const [ran, setRan]     = useState(false);

  const obj = { name, age };
  const result = pretty
    ? JSON.stringify(obj, null, 2)
    : JSON.stringify(obj);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="JSON.stringify() — Object → String" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-4">

          {/* Input controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 block mb-1">name</label>
              <input type="text" value={name}
                onChange={e => { setName(e.target.value); setRan(false); }}
                className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 block mb-1">age</label>
              <input type="number" value={age}
                onChange={e => { setAge(+e.target.value); setRan(false); }}
                className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Flow */}
          <div className="grid grid-cols-3 gap-2 items-center text-xs text-center">
            {/* JS Object */}
            <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-3">
              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase">JS Object</div>
              <div className="font-mono text-xs text-left space-y-0.5">
                <div className="text-gray-900 dark:text-gray-100">{"{"}</div>
                <div className="pl-3 text-gray-900 dark:text-gray-100">name: <span className="text-blue-600 dark:text-blue-400">&quot;{name}&quot;</span>,</div>
                <div className="pl-3 text-gray-900 dark:text-gray-100">age: <span className="text-orange-600 dark:text-orange-400">{age}</span></div>
                <div className="text-gray-900 dark:text-gray-100">{"}"}</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 text-center leading-tight">JSON.stringify()</div>
              <div className="text-xl text-blue-500">→</div>
              <div className="text-[9px] text-gray-900 dark:text-gray-100">Object to String</div>
            </div>

            {/* JSON String */}
            <div className={`rounded-xl border-2 p-3 transition-all ${ran ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20" : "border-gray-200 dark:border-gray-700"}`}>
              <div className="text-[10px] font-bold text-green-600 dark:text-green-400 mb-2 uppercase">JSON String</div>
              <div className={`font-mono text-[11px] break-all leading-relaxed ${ran ? "text-green-700 dark:text-green-300" : "text-gray-400"}`}>
                {ran ? result : '{"name":"...","age":...}'}
              </div>
            </div>
          </div>

          {/* Pretty toggle + type indicator */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">
              <input type="checkbox" checked={pretty} onChange={e => setPretty(e.target.checked)}
                className="w-3.5 h-3.5 accent-blue-500 cursor-pointer" />
              Pretty print (indent: 2)
            </label>
            {ran && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                typeof → &quot;string&quot;
              </span>
            )}
          </div>

          {/* Run / Reset */}
          <div className="flex justify-center gap-3">
            {!ran ? (
              <button onClick={() => setRan(true)}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all">
                ▶ JSON.stringify(user)
              </button>
            ) : (
              <button onClick={() => setRan(false)}
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

// ─── 3. JSON.parse() Diagram ──────────────────────────────────────────────────
const PRESETS = [
  { label: "User",    json: '{"name":"Alice","role":"Admin"}' },
  { label: "Product", json: '{"title":"Laptop","price":999}' },
  { label: "Array",   json: '[1,2,3,"hello",true]' },
];

export function JsonParseDiagram() {
  const [jsonInput, setJsonInput] = useState(PRESETS[0].json);
  const [parsed, setParsed]       = useState<unknown>(null);
  const [error, setError]         = useState("");
  const [ran, setRan]             = useState(false);

  function runParse() {
    try {
      const result = JSON.parse(jsonInput);
      setParsed(result);
      setError("");
      setRan(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setParsed(null);
      setRan(true);
    }
  }

  function reset() {
    setParsed(null);
    setError("");
    setRan(false);
  }

  const isValid = (() => { try { JSON.parse(jsonInput); return true; } catch { return false; } })();

  const renderValue = (v: unknown): string => {
    if (typeof v === "string") return `"${v}"`;
    if (v === null) return "null";
    return String(v);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="JSON.parse() — String → Object" badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        <div className="p-6 space-y-4">

          {/* Presets */}
          <div className="flex gap-2 flex-wrap">
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => { setJsonInput(p.json); reset(); }}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold border-2 cursor-pointer transition-all ${jsonInput === p.json ? "bg-green-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}>
                {p.label}
              </button>
            ))}
          </div>

          {/* JSON input */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 block mb-1">JSON String (ពី Server)</label>
            <textarea value={jsonInput}
              onChange={e => { setJsonInput(e.target.value); reset(); }}
              rows={2}
              className={`w-full rounded-lg border-2 px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none resize-none ${isValid ? "border-green-400" : "border-red-400"}`}
            />
            <div className={`text-[10px] font-bold mt-0.5 ${isValid ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
              {isValid ? "✅ Valid JSON" : "❌ Invalid JSON"}
            </div>
          </div>

          {/* Flow arrow */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="px-2 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-mono text-[11px]">String</span>
            <span className="text-green-500 text-lg">→</span>
            <span className="font-mono text-green-600 dark:text-green-400">JSON.parse()</span>
            <span className="text-green-500 text-lg">→</span>
            <span className="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-mono text-[11px]">Object / Array</span>
          </div>

          {/* Result */}
          {ran && !error && parsed !== null && (
            <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-3">
              <div className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400 mb-2">
                ✅ JS Object — typeof: &quot;{typeof parsed}&quot;
              </div>
              {Array.isArray(parsed) ? (
                <div className="flex flex-wrap gap-1.5">
                  {(parsed as unknown[]).map((v, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-xs font-mono text-gray-900 dark:text-gray-100">
                      [{i}]: {renderValue(v)}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(parsed as Record<string, unknown>).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-1.5 rounded-lg bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 px-2 py-1 text-xs font-mono">
                      <span className="text-blue-600 dark:text-blue-400">{k}</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-orange-600 dark:text-orange-400">{renderValue(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {ran && error && (
            <div className="rounded-xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-3 text-xs font-mono text-red-600 dark:text-red-400">
              ❌ SyntaxError: {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            {!ran ? (
              <button onClick={runParse}
                disabled={!isValid}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                ▶ JSON.parse(jsonString)
              </button>
            ) : (
              <button onClick={reset}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>

          <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 px-3 py-2 text-[11px] text-green-700 dark:text-green-300">
            💡 ពេលទទួល Response ពី API វាតែងតែជា JSON String — ត្រូវ <code className="font-mono bg-green-100 dark:bg-green-900/50 px-1 rounded">JSON.parse()</code> ដើម្បីប្រើបាន
          </div>
        </div>
      </div>
    </div>
  );
}
