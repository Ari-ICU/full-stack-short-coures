"use client";

import { useState } from "react";
import { DomTreeDiagram, DomModifyDiagram, DomEventsDiagram } from "./JsDomDiagrams";
import { DomCreateDiagram, DomAppendDiagram, DomRemoveReplaceDiagram } from "./JsDomUpdateDiagrams";
import { EventListenerDiagram, EventObjectDiagram, PreventDefaultDiagram } from "./JsEventsDiagrams";
import { TryCatchFlowDiagram, FinallyDiagram, ThrowCustomErrorDiagram } from "./JsErrorHandlingDiagrams";
import { SetTimeoutDiagram, SetIntervalDiagram, ClearIntervalDiagram, ClearTimeoutDiagram } from "./JsTimersDiagrams";
import { NamedExportDiagram, DefaultExportDiagram, CombinedImportDiagram } from "./JsModulesDiagrams";
import { JsonFormatDiagram, JsonStringifyDiagram, JsonParseDiagram } from "./JsJsonDiagrams";
import { LocalStorageBasicDiagram, LocalStorageJsonDiagram } from "./JsLocalStorageDiagrams";
import { SyncAsyncDiagram, PromiseStatesDiagram, AsyncAwaitDiagram } from "./JsAsyncDiagrams";
import { FetchFlowDiagram, FetchStatusCodesDiagram, FetchDomRenderDiagram } from "./JsFetchDiagrams";
import { ClassBlueprintDiagram, ThisKeywordDiagram, InheritanceDiagram } from "./JsClassesDiagrams";
import { ConsoleMethodsDiagram, BreakpointsDiagram, DebuggerKeywordDiagram } from "./JsDebuggingDiagrams";

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

// ─── 1. Data Types Diagram ────────────────────────────────────────────────────
const JS_TYPES = [
  { name: "string",    color: "#22c55e", example: '"Hello, World!"',  desc: "អក្សរ — ស្ថិតក្នុង quotes" },
  { name: "number",    color: "#3b82f6", example: "42 / 3.14 / -5",   desc: "លេខ integer ឬ float" },
  { name: "boolean",   color: "#f97316", example: "true / false",      desc: "តែ ២ តម្លៃ: true ឬ false" },
  { name: "null",      color: "#a855f7", example: "null",              desc: "ចង្អុលទំនេរ — ចេតនា" },
  { name: "undefined", color: "#6b7280", example: "undefined",         desc: "variable ប្រកាសប៉ុន្តែ មិនទាន់ assign" },
  { name: "object",    color: "#ec4899", example: "{ name: 'Kim' }",   desc: "Key-value pairs" },
  { name: "array",     color: "#14b8a6", example: "[1, 2, 3]",         desc: "List of values" },
];

export function DataTypesDiagram() {
  const [active, setActive] = useState(0);
  const t = JS_TYPES[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        {JS_TYPES.map((type, i) => (
          <button key={type.name} onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer
              ${active === i ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === i ? type.color : undefined }}>
            {type.name}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`typeof → "${t.name}"`} badge="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Visual */}
          <div className="rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-white"
            style={{ background: t.color }}>
            <div className="text-2xl font-bold font-mono">{t.example}</div>
            <div className="text-xs opacity-80 text-center">{t.desc}</div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Usage</div>
            <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
              <div className="text-gray-400">{"// declare"}</div>
              {t.name === "string" && <>
                <div className="text-green-400">const name = <span className="text-yellow-300">&quot;Hello&quot;</span>;</div>
                <div className="text-green-400">const msg = <span className="text-yellow-300">`Hi, ${"{name}"}`</span>;</div>
              </>}
              {t.name === "number" && <>
                <div className="text-blue-400">const age = <span className="text-orange-300">25</span>;</div>
                <div className="text-blue-400">const pi = <span className="text-orange-300">3.14</span>;</div>
              </>}
              {t.name === "boolean" && <>
                <div className="text-orange-400">const isLoggedIn = <span className="text-purple-300">true</span>;</div>
                <div className="text-orange-400">const isEmpty = <span className="text-purple-300">false</span>;</div>
              </>}
              {t.name === "null" && <>
                <div className="text-purple-400">let user = <span className="text-gray-300">null</span>; <span className="text-gray-500">{"// empty"}</span></div>
              </>}
              {t.name === "undefined" && <>
                <div className="text-gray-400">let score; <span className="text-gray-500">{"// undefined"}</span></div>
                <div className="text-gray-400">console.log(score); <span className="text-gray-500">{"// undefined"}</span></div>
              </>}
              {t.name === "object" && <>
                <div className="text-pink-400">const user = {"{"}</div>
                <div className="text-pink-400 pl-4">name: <span className="text-yellow-300">&quot;Kim&quot;</span>,</div>
                <div className="text-pink-400 pl-4">age: <span className="text-orange-300">25</span></div>
                <div className="text-pink-400">{"}"};</div>
              </>}
              {t.name === "array" && <>
                <div className="text-teal-400">const nums = [<span className="text-orange-300">1, 2, 3</span>];</div>
                <div className="text-teal-400">nums[<span className="text-orange-300">0</span>]; <span className="text-gray-500">{"// 1"}</span></div>
              </>}
              <div className="text-gray-400 mt-1">typeof value → <span style={{ color: t.color }}>&quot;{t.name}&quot;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Variables Diagram ─────────────────────────────────────────────────────
export function VariablesDiagram() {
  const [keyword, setKeyword] = useState<"var" | "let" | "const">("let");

  const info = {
    var:   { color: "#ef4444", scope: "Function", reassign: true,  redeclare: true,  hoisted: true,  desc: "❌ Avoid — unpredictable scope, hoisted" },
    let:   { color: "#3b82f6", scope: "Block {}",  reassign: true,  redeclare: false, hoisted: false, desc: "✅ Default choice — block scope, reassignable" },
    const: { color: "#22c55e", scope: "Block {}",  reassign: false, redeclare: false, hoisted: false, desc: "✅ Prefer — block scope, immutable binding" },
  };
  const d = info[keyword];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex justify-center gap-3 mb-4">
        {(["var","let","const"] as const).map(k => (
          <button key={k} onClick={() => setKeyword(k)}
            className={`px-4 py-2 rounded-lg text-sm font-bold border-2 cursor-pointer transition-all
              ${keyword === k ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: keyword === k ? d.color : undefined }}>
            {k}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={keyword} badge="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300" />
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
            {[
              { label: "Scope", value: d.scope },
              { label: "Reassign", value: d.reassign ? "✅ Yes" : "❌ No" },
              { label: "Redeclare", value: d.redeclare ? "✅ Yes" : "❌ No" },
              { label: "Hoisted", value: d.hoisted ? "⚠️ Yes" : "✅ No" },
            ].map(r => (
              <div key={r.label} className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-3">
                <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase font-bold mb-1">{r.label}</div>
                <div className="font-bold text-gray-800 dark:text-gray-200 text-[11px]">{r.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3 text-xs font-semibold" style={{ background: d.color + "22", color: d.color, border: `1px solid ${d.color}44` }}>
            {d.desc}
          </div>

          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1.5">
            <div className="text-gray-400">{"// "}{keyword} examples</div>
            {keyword === "const" && <>
              <div><span style={{ color: d.color }}>const</span> <span className="text-white">PI</span> = <span className="text-orange-300">3.14</span>;</div>
              <div><span style={{ color: d.color }}>const</span> <span className="text-white">user</span> = {"{"} name: <span className="text-yellow-300">&quot;Kim&quot;</span> {"}"};</div>
              <div className="text-gray-400">user.name = <span className="text-yellow-300">&quot;Lee&quot;</span>; <span className="text-green-500">{"// ✅ OK (object mutation)"}</span></div>
              <div className="text-red-400">user = {"{}"}; <span className="text-gray-500">{"// ❌ Error: reassignment"}</span></div>
            </>}
            {keyword === "let" && <>
              <div><span style={{ color: d.color }}>let</span> <span className="text-white">count</span> = <span className="text-orange-300">0</span>;</div>
              <div className="text-white">count = <span className="text-orange-300">1</span>; <span className="text-green-500">{"// ✅ OK"}</span></div>
              <div className="text-red-400"><span style={{ color: d.color }}>let</span> count = <span className="text-orange-300">2</span>; <span className="text-gray-500">{"// ❌ Error: redeclare"}</span></div>
            </>}
            {keyword === "var" && <>
              <div><span style={{ color: d.color }}>var</span> <span className="text-white">x</span> = <span className="text-orange-300">1</span>;</div>
              <div><span style={{ color: d.color }}>var</span> <span className="text-white">x</span> = <span className="text-orange-300">2</span>; <span className="text-yellow-400">{"// ⚠️ no error"}</span></div>
              <div className="text-yellow-400">console.log(y); <span className="text-gray-500">{"// undefined (hoisted)"}</span></div>
              <div><span style={{ color: d.color }}>var</span> <span className="text-white">y</span> = <span className="text-orange-300">5</span>;</div>
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Functions Diagram ─────────────────────────────────────────────────────
type FnStyle = "declaration" | "expression" | "arrow";

export function FunctionsDiagram() {
  const [style, setStyle] = useState<FnStyle>("declaration");
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const result = a + b;

  const code: Record<FnStyle, string> = {
    declaration: `function add(a, b) {\n  return a + b;\n}\n\nadd(${a}, ${b}); // ${result}`,
    expression:  `const add = function(a, b) {\n  return a + b;\n};\n\nadd(${a}, ${b}); // ${result}`,
    arrow:       `const add = (a, b) => a + b;\n\nadd(${a}, ${b}); // ${result}`,
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {(["declaration","expression","arrow"] as FnStyle[]).map(s => (
          <button key={s} onClick={() => setStyle(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${style === s ? "bg-yellow-500 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`Function ${style}`} badge="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-700 dark:text-gray-300 w-8">a =</span>
              <input type="range" min={0} max={20} value={a} onChange={e => setA(+e.target.value)} className="flex-1 accent-yellow-500 h-1.5 cursor-pointer" />
              <span className="text-xs font-bold text-yellow-600 w-6">{a}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-700 dark:text-gray-300 w-8">b =</span>
              <input type="range" min={0} max={20} value={b} onChange={e => setB(+e.target.value)} className="flex-1 accent-yellow-500 h-1.5 cursor-pointer" />
              <span className="text-xs font-bold text-yellow-600 w-6">{b}</span>
            </div>
            <div className="rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-3 text-center">
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">add({a}, {b}) returns</div>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">{result}</div>
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono">
            <pre className="text-green-400 whitespace-pre-wrap">{code[style]}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Arithmetic Operators Diagram ──────────────────────────────────────────
type ArithOp = "+" | "-" | "*" | "/" | "%" | "**";

const ARITH_OPS: { op: ArithOp; label: string; color: string; name: string }[] = [
  { op: "+",  label: "+",  color: "#22c55e", name: "បូក (Add)" },
  { op: "-",  label: "-",  color: "#3b82f6", name: "ដក (Subtract)" },
  { op: "*",  label: "×",  color: "#f97316", name: "គុណ (Multiply)" },
  { op: "/",  label: "÷",  color: "#a855f7", name: "ចែក (Divide)" },
  { op: "%",  label: "%",  color: "#ec4899", name: "សំណល់ (Modulo)" },
  { op: "**", label: "**", color: "#14b8a6", name: "ស្វ័យគុណ (Exponent)" },
];

function calcArith(a: number, b: number, op: ArithOp): number | string {
  if (op === "/" && b === 0) return "Infinity";
  if (op === "%" && b === 0) return "NaN";
  switch (op) {
    case "+":  return a + b;
    case "-":  return a - b;
    case "*":  return a * b;
    case "/":  return parseFloat((a / b).toFixed(4));
    case "%":  return a % b;
    case "**": return Math.pow(a, b);
  }
}

export function ArithmeticDiagram() {
  const [op, setOp]   = useState<ArithOp>("+");
  const [a, setA]     = useState(10);
  const [b, setB]     = useState(3);
  const current = ARITH_OPS.find(o => o.op === op)!;
  const result  = calcArith(a, b, op);

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Op buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {ARITH_OPS.map(o => (
          <button key={o.op} onClick={() => setOp(o.op)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 cursor-pointer transition-all
              ${op === o.op ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: op === o.op ? current.color : undefined }}>
            {o.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`${a} ${current.op} ${b} = ${result}`} badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Sliders */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-mono text-gray-800 dark:text-gray-200 mb-1">
                <span>a</span><span className="font-bold" style={{ color: current.color }}>{a}</span>
              </div>
              <input type="range" min={0} max={20} value={a}
                onChange={e => setA(+e.target.value)}
                className="w-full h-2 rounded-full cursor-pointer accent-current"
                style={{ accentColor: current.color }} />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono text-gray-800 dark:text-gray-200 mb-1">
                <span>b</span><span className="font-bold" style={{ color: current.color }}>{b}</span>
              </div>
              <input type="range" min={0} max={20} value={b}
                onChange={e => setB(+e.target.value)}
                className="w-full h-2 rounded-full cursor-pointer"
                style={{ accentColor: current.color }} />
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: current.color + "18", border: `1px solid ${current.color}44` }}>
              <div className="text-xs mb-1" style={{ color: current.color }}>{current.name}</div>
              <div className="text-4xl font-bold" style={{ color: current.color }}>{String(result)}</div>
            </div>
          </div>
          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1.5">
            <div className="text-gray-400">{"// JavaScript"}</div>
            <div><span className="text-blue-400">let</span> <span className="text-white">a</span> = <span className="text-orange-300">{a}</span>;</div>
            <div><span className="text-blue-400">let</span> <span className="text-white">b</span> = <span className="text-orange-300">{b}</span>;</div>
            <div className="mt-2">
              <span className="text-white">a <span style={{ color: current.color }}>{current.op}</span> b</span>
              <span className="text-gray-400">{" // "}</span>
              <span style={{ color: current.color }}>{String(result)}</span>
            </div>
            {op === "%" && <div className="text-gray-500 text-[10px] mt-2">{a} ÷ {b} = {Math.floor(a/b)} remainder {a % b}</div>}
            {op === "**" && <div className="text-gray-500 text-[10px] mt-2">{a} × {a} × … ({b} times)</div>}
            {op === "+" && <div className="text-gray-500 text-[10px] mt-2">&quot;hello&quot; + &quot;world&quot; = &quot;helloworld&quot; (string concat)</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. Comparison Operators Diagram (== vs ===) ──────────────────────────────
const COMPARE_PAIRS: { left: string; right: string; loose: boolean; strict: boolean; note: string }[] = [
  { left: "5",       right: '"5"',       loose: true,  strict: false, note: '"5" ត្រូវបំប្លែងជា Number' },
  { left: "0",       right: "false",     loose: true,  strict: false, note: "false ត្រូវបំប្លែងជា 0" },
  { left: "null",    right: "undefined", loose: true,  strict: false, note: "special JS rule" },
  { left: '"0"',     right: "false",     loose: true,  strict: false, note: "both coerce → 0" },
  { left: "5",       right: "5",         loose: true,  strict: true,  note: "same value & type" },
  { left: '"hello"', right: '"hello"',   loose: true,  strict: true,  note: "same string" },
];

export function ComparisonDiagram() {
  const [active, setActive] = useState(0);
  const pair = COMPARE_PAIRS[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {COMPARE_PAIRS.map((p, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border-2 cursor-pointer transition-all
              ${active === i ? "bg-indigo-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {p.left} == {p.right}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="== vs ===" badge="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* == card */}
          <div className="rounded-xl border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4">
            <div className="text-xs font-bold mb-2 text-red-600 dark:text-red-400 uppercase tracking-wide">Loose ==</div>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono mb-3">
              <span className="text-orange-300">{pair.left}</span>
              <span className="text-yellow-400"> == </span>
              <span className="text-orange-300">{pair.right}</span>
              <span className="text-gray-400">{" // "}</span>
              <span className={pair.loose ? "text-green-400" : "text-red-400"}>{String(pair.loose)}</span>
            </div>
            <div className="text-[11px] font-semibold rounded-lg px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              {pair.loose && !pair.strict ? `⚠️ Type Coercion: ${pair.note}` : pair.loose ? "✅ true — values match" : "false"}
            </div>
          </div>
          {/* === card */}
          <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4">
            <div className="text-xs font-bold mb-2 text-green-600 dark:text-green-400 uppercase tracking-wide">Strict ===</div>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono mb-3">
              <span className="text-orange-300">{pair.left}</span>
              <span className="text-green-400"> === </span>
              <span className="text-orange-300">{pair.right}</span>
              <span className="text-gray-400">{" // "}</span>
              <span className={pair.strict ? "text-green-400" : "text-red-400"}>{String(pair.strict)}</span>
            </div>
            <div className="text-[11px] font-semibold rounded-lg px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              {pair.strict ? "✅ true — same value & type" : "✅ false — no coercion, types differ"}
            </div>
          </div>
        </div>
        <div className="mx-6 mb-6 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 p-3 text-xs text-indigo-800 dark:text-indigo-300">
          <span className="font-bold">💡 Best Practice:</span> ត្រូវប្រើ <code className="bg-indigo-100 dark:bg-indigo-900 px-1 rounded">===</code> ជានិច្ច — វាពិនិត្យទាំង <strong>Value</strong> និង <strong>Type</strong> ដោយគ្មាន Type Coercion។
        </div>
      </div>
    </div>
  );
}

// ─── 6. Logical Operators Diagram ────────────────────────────────────────────
const TruthBadge = ({ val }: { val: boolean }) => (
  <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${val ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"}`}>
    {String(val)}
  </span>
);

export function LogicalDiagram() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  const and = a && b;
  const or  = a || b;
  const notA = !a;



  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Toggle inputs */}
      <div className="flex justify-center gap-6 mb-5">
        {([["a", a, setA], ["b", b, setB]] as [string, boolean, (v: boolean) => void][]).map(([label, val, set]) => (
          <button key={label} onClick={() => set(!val)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all font-bold text-sm
              ${val ? "border-green-400 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300" : "border-red-300 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"}`}>
            <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{label} =</span>
            <span>{String(val)}</span>
            <span className="text-[10px] opacity-60">click to toggle</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Logical Operators" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">

          {/* AND */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <code className="text-sm font-bold text-purple-600 dark:text-purple-400">a && b</code>
              <TruthBadge val={!!and} />
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono">
              <span className={a ? "text-green-400" : "text-red-400"}>{String(a)}</span>
              <span className="text-purple-400"> && </span>
              <span className={b ? "text-green-400" : "text-red-400"}>{String(b)}</span>
              <span className="text-gray-400">{" // "}</span>
              <span className={and ? "text-green-400" : "text-red-400"}>{String(and)}</span>
            </div>
            <div className="mt-2 text-[11px] text-gray-800 dark:text-gray-200">ពិត លុះត្រាតែ <strong>ទាំងពីរ</strong> ពិតទាំងអស់</div>
          </div>

          {/* OR */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <code className="text-sm font-bold text-blue-600 dark:text-blue-400">a || b</code>
              <TruthBadge val={!!or} />
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono">
              <span className={a ? "text-green-400" : "text-red-400"}>{String(a)}</span>
              <span className="text-blue-400"> || </span>
              <span className={b ? "text-green-400" : "text-red-400"}>{String(b)}</span>
              <span className="text-gray-400">{" // "}</span>
              <span className={or ? "text-green-400" : "text-red-400"}>{String(or)}</span>
            </div>
            <div className="mt-2 text-[11px] text-gray-800 dark:text-gray-200">ពិត បើ <strong>មួយណា</strong>ក៏បានពិត</div>
          </div>

          {/* NOT */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <code className="text-sm font-bold text-orange-600 dark:text-orange-400">!a</code>
              <TruthBadge val={notA} />
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono">
              <span className="text-orange-400">!</span>
              <span className={a ? "text-green-400" : "text-red-400"}>{String(a)}</span>
              <span className="text-gray-400">{" // "}</span>
              <span className={notA ? "text-green-400" : "text-red-400"}>{String(notA)}</span>
            </div>
            <div className="mt-2 text-[11px] text-gray-800 dark:text-gray-200">បញ្ច្រាស (flip) — true → false, false → true</div>
          </div>

          {/* Truth table mini */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-3 overflow-x-auto">
            <div className="text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-300 font-bold mb-2">Truth Table</div>
            <table className="w-full text-xs text-center font-mono">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase">
                  <th className="px-2 py-1">a</th><th className="px-2 py-1">b</th>
                  <th className="px-2 py-1 text-purple-400">a&amp;&amp;b</th>
                  <th className="px-2 py-1 text-blue-400">a||b</th>
                  <th className="px-2 py-1 text-orange-400">!a</th>
                </tr>
              </thead>
              <tbody>
                {[[true,true],[true,false],[false,true],[false,false]].map(([ra, rb]) => {
                  const isActive = ra === a && rb === b;
                  return (
                    <tr key={`${ra}${rb}`} className={isActive ? "bg-yellow-100 dark:bg-yellow-900/20 font-bold" : ""}>
                      <td className={`px-2 py-1 ${ra ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{String(ra)}</td>
                      <td className={`px-2 py-1 ${rb ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{String(rb)}</td>
                      <td className={`px-2 py-1 ${(ra && rb) ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{String(ra && rb)}</td>
                      <td className={`px-2 py-1 ${(ra || rb) ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{String(ra || rb)}</td>
                      <td className={`px-2 py-1 ${!ra ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{String(!ra)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 7. Modern Operators Diagram (?? and ?.) ──────────────────────────────────
type NullishVal = "null" | "undefined" | '"Guest"' | "0" | '""' | "false";

const NULLISH_OPTIONS: { label: NullishVal; isNullish: boolean }[] = [
  { label: "null",      isNullish: true  },
  { label: "undefined", isNullish: true  },
  { label: '"Guest"',   isNullish: false },
  { label: "0",         isNullish: false },
  { label: '""',        isNullish: false },
  { label: "false",     isNullish: false },
];

export function ModernOperatorsDiagram() {
  const [nullishVal, setNullishVal] = useState<NullishVal>("null");
  const [hasAddress, setHasAddress] = useState(false);

  const chosen = NULLISH_OPTIONS.find(o => o.label === nullishVal)!;
  const qqResult = chosen.isNullish ? '"Default"' : nullishVal;
  const chainResult = hasAddress ? '"Phnom Penh"' : "undefined";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto space-y-4">

        {/* ?? section */}
        <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <PanelHeader label="Nullish Coalescing ??" badge="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" />
          <div className="p-5 space-y-4">
            <div className="text-xs text-gray-800 dark:text-gray-200 mb-1">
              ជ្រើស value សម្រាប់ <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">username</code>:
            </div>
            <div className="flex flex-wrap gap-2">
              {NULLISH_OPTIONS.map(o => (
                <button key={o.label} onClick={() => setNullishVal(o.label)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border-2 cursor-pointer transition-all
                    ${nullishVal === o.label
                      ? o.isNullish ? "bg-red-500 border-transparent text-white" : "bg-teal-600 border-transparent text-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                  {o.label}
                </button>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1.5">
              <div><span className="text-blue-400">let</span> <span className="text-white">username</span> = <span className={chosen.isNullish ? "text-red-400" : "text-yellow-300"}>{nullishVal}</span>;</div>
              <div><span className="text-blue-400">let</span> <span className="text-white">display</span> = <span className={chosen.isNullish ? "text-red-400" : "text-yellow-300"}>{nullishVal}</span><span className="text-teal-400"> ?? </span><span className="text-yellow-300">&quot;Default&quot;</span>;</div>
              <div className="mt-1 text-gray-400">{"// display → "}<span className={chosen.isNullish ? "text-red-400" : "text-teal-400"}>{qqResult}</span></div>
            </div>

            <div className={`rounded-lg p-3 text-xs font-semibold ${chosen.isNullish ? "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300" : "bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300"}`}>
              {chosen.isNullish
                ? `⚠️ ${nullishVal} is nullish → falls back to "Default"`
                : `✅ ${nullishVal} is NOT nullish (even if falsy) → keeps original value`}
            </div>
          </div>
        </div>

        {/* ?. section */}
        <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <PanelHeader label="Optional Chaining ?." badge="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" />
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-800 dark:text-gray-200">user.address មាន?</span>
              <button onClick={() => setHasAddress(h => !h)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
                  ${hasAddress ? "bg-green-600 border-transparent text-white" : "bg-red-500 border-transparent text-white"}`}>
                {hasAddress ? "✅ មាន address" : "❌ គ្មាន address"}
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1.5">
              <div><span className="text-blue-400">let</span> <span className="text-white">user</span> = {"{"}</div>
              <div className="pl-4"><span className="text-yellow-300">name</span>: <span className="text-green-400">&quot;Sok&quot;</span>,</div>
              {hasAddress && <div className="pl-4 text-teal-400">address: {"{ city: "}<span className="text-green-400">&quot;Phnom Penh&quot;</span>{" }"}</div>}
              <div>{"}"}</div>
              <div className="mt-2">
                <span className="text-white">user</span>
                <span className="text-violet-400">?.</span>
                <span className="text-white">address</span>
                <span className="text-violet-400">?.</span>
                <span className="text-white">city</span>
                <span className="text-gray-400">{" // "}</span>
                <span className={hasAddress ? "text-green-400" : "text-orange-300"}>{chainResult}</span>
              </div>
            </div>

            <div className={`rounded-lg p-3 text-xs font-semibold ${hasAddress ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300" : "bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"}`}>
              {hasAddress
                ? "✅ address មាន → ទាញ city បានត្រឹមត្រូវ"
                : "✅ address គ្មាន → returns undefined (គ្មាន Error)"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 8. Implicit Type Conversion Diagram ─────────────────────────────────────
const IMPLICIT_CASES: { expr: string; result: string; note: string; trap: boolean }[] = [
  { expr: '"5" + 2',    result: '"52"',  note: '+ ជាមួយ String → concat ជំនួស add', trap: true  },
  { expr: '"5" + "2"',  result: '"52"',  note: 'String + String → concat',           trap: true  },
  { expr: '"5" - 2',    result: '3',     note: '- ប្រែ String ទៅ Number',             trap: false },
  { expr: '"5" * 2',    result: '10',    note: '* ប្រែ String ទៅ Number',             trap: false },
  { expr: '"5" / 2',    result: '2.5',   note: '/ ប្រែ String ទៅ Number',             trap: false },
  { expr: '"abc" - 1',  result: 'NaN',   note: '"abc" មិនអាចប្រែទៅ Number',          trap: true  },
  { expr: 'true + 1',   result: '2',     note: 'true → 1',                            trap: true  },
  { expr: 'false + 1',  result: '1',     note: 'false → 0',                           trap: true  },
];

export function ImplicitConversionDiagram() {
  const [active, setActive] = useState(0);
  const c = IMPLICIT_CASES[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {IMPLICIT_CASES.map((item, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold border-2 cursor-pointer transition-all
              ${active === i
                ? item.trap ? "bg-red-500 border-transparent text-white shadow-md" : "bg-green-600 border-transparent text-white shadow-md"
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {item.expr}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`${c.expr} → ${c.result}`} badge={c.trap ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400" : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"} />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
          {/* Visual result */}
          <div className={`rounded-xl p-6 flex flex-col items-center justify-center gap-3 ${c.trap ? "bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800" : "bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800"}`}>
            <div className={`text-3xl font-bold font-mono ${c.trap ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-300"}`}>
              {c.result}
            </div>
            <div className={`text-xs text-center font-semibold px-3 py-1.5 rounded-lg ${c.trap ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"}`}>
              {c.trap ? "⚠️ " : "✅ "}{c.note}
            </div>
          </div>
          {/* Code block */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-2">
            <div className="text-gray-400">{"// Implicit conversion"}</div>
            <div>
              <span className="text-white">console.log(</span>
              <span className={c.trap ? "text-red-400" : "text-yellow-300"}>{c.expr}</span>
              <span className="text-white">);</span>
            </div>
            <div className="text-gray-400">{"// → "}<span className={c.trap ? "text-red-400" : "text-green-400"}>{c.result}</span></div>
            {c.trap && (
              <div className="mt-3 rounded-lg bg-red-950/40 border border-red-700 p-2 text-red-400 text-[10px]">
                ⚠️ Unexpected! ប្រើ Explicit Conversion ជំនួស
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini cheatsheet */}
      <div className="mt-4 w-full max-w-2xl mx-auto rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4">
        <div className="text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-300 font-bold mb-3">Quick Reference: + operator</div>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          {[
            { expr: '"5" + 2',   res: '"52"',  bad: true  },
            { expr: '"5" - 2',   res: '3',     bad: false },
            { expr: '"5" * 2',   res: '10',    bad: false },
            { expr: '"5" / 2',   res: '2.5',   bad: false },
          ].map(r => (
            <div key={r.expr} className={`flex justify-between items-center px-2 py-1 rounded ${r.bad ? "bg-red-50 dark:bg-red-950/20" : "bg-green-50 dark:bg-green-950/20"}`}>
              <span className="text-gray-800 dark:text-gray-200">{r.expr}</span>
              <span className={r.bad ? "text-red-600 dark:text-red-400 font-bold" : "text-green-600 dark:text-green-400 font-bold"}>→ {r.res}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 9. Explicit Conversion Diagram ─────────────────────────────────────────
type ExplicitTarget = "Number" | "String" | "Boolean";

const EXPLICIT_INPUTS: { val: string; toNumber: string; toString: string; toBoolean: string }[] = [
  { val: '"100"',     toNumber: "100",   toString: '"100"',         toBoolean: "true"  },
  { val: '"3.14"',    toNumber: "3.14",  toString: '"3.14"',        toBoolean: "true"  },
  { val: '"Hello"',   toNumber: "NaN",   toString: '"Hello"',       toBoolean: "true"  },
  { val: '""',        toNumber: "0",     toString: '""',            toBoolean: "false" },
  { val: "true",      toNumber: "1",     toString: '"true"',        toBoolean: "true"  },
  { val: "false",     toNumber: "0",     toString: '"false"',       toBoolean: "false" },
  { val: "null",      toNumber: "0",     toString: '"null"',        toBoolean: "false" },
  { val: "undefined", toNumber: "NaN",   toString: '"undefined"',   toBoolean: "false" },
];

export function ExplicitConversionDiagram() {
  const [fn, setFn]         = useState<ExplicitTarget>("Number");
  const [inputIdx, setInputIdx] = useState(0);
  const row = EXPLICIT_INPUTS[inputIdx];

  const result = fn === "Number" ? row.toNumber : fn === "String" ? row.toString : row.toBoolean;
  const isNaN_ = result === "NaN";
  const colorMap: Record<ExplicitTarget, string> = {
    Number:  "#3b82f6",
    String:  "#22c55e",
    Boolean: "#f97316",
  };
  const col = colorMap[fn];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex justify-center gap-3 mb-4">
        {(["Number", "String", "Boolean"] as ExplicitTarget[]).map(f => (
          <button key={f} onClick={() => setFn(f)}
            className={`px-4 py-2 rounded-lg text-sm font-bold border-2 cursor-pointer transition-all
              ${fn === f ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: fn === f ? col : undefined }}>
            {f}()
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {EXPLICIT_INPUTS.map((r, i) => (
          <button key={i} onClick={() => setInputIdx(i)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border-2 cursor-pointer transition-all
              ${inputIdx === i ? "border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: inputIdx === i ? col : undefined }}>
            {r.val}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`${fn}(${row.val}) → ${result}`} badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
          <div className="rounded-xl p-5 flex flex-col items-center justify-center gap-3 border-2"
            style={{ background: col + "12", borderColor: col + "44" }}>
            <div className="text-xs font-bold uppercase tracking-wide" style={{ color: col }}>{fn}()</div>
            <div className="text-4xl font-bold font-mono" style={{ color: col }}>{result}</div>
            {isNaN_ && <div className="text-xs text-red-500 font-semibold">⚠️ Not a Number — cannot convert</div>}
            {fn === "Boolean" && (
              <div className={`text-xs font-semibold px-2 py-1 rounded ${result === "true" ? "bg-green-100 dark:bg-green-900/30 text-green-700" : "bg-red-100 dark:bg-red-900/30 text-red-600"}`}>
                {result === "true" ? "✅ Truthy" : "❌ Falsy"}
              </div>
            )}
          </div>
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1.5">
            <div className="text-gray-400">{"// Explicit conversion"}</div>
            <div><span style={{ color: col }}>{fn}</span><span className="text-white">({row.val})</span></div>
            <div className="text-gray-400">{"// → "}<span style={{ color: col }}>{result}</span></div>
            <div className="mt-3 pt-3 border-t border-gray-700 space-y-1">
              <div className="text-gray-500 text-[10px] uppercase tracking-wide mb-1">all conversions</div>
              <div><span className="text-blue-400">Number</span>({row.val}) → <span className="text-orange-300">{row.toNumber}</span></div>
              <div><span className="text-green-400">String</span>({row.val}) → <span className="text-yellow-300">{row.toString}</span></div>
              <div><span className="text-orange-400">Boolean</span>({row.val}) → <span className={row.toBoolean === "true" ? "text-green-400" : "text-red-400"}>{row.toBoolean}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 10. parseInt / parseFloat Diagram ───────────────────────────────────────
const PARSE_INPUTS = [
  { val: '"20px"',      int: "20",   float: "20",   note: "ទាញលេខខាងដើម, drop suffix" },
  { val: '"10.5"',      int: "10",   float: "10.5", note: "parseInt កាត់ decimal" },
  { val: '"10.5rem"',   int: "10",   float: "10.5", note: "parseFloat រក្សា decimal" },
  { val: '"3.99 kg"',   int: "3",    float: "3.99", note: "stop at non-numeric char" },
  { val: '"px20"',      int: "NaN",  float: "NaN",  note: "លេខត្រូវនៅដើម!" },
  { val: '"width: 20"', int: "NaN",  float: "NaN",  note: "text ខាងដើម → NaN" },
  { val: '"007"',       int: "7",    float: "7",    note: "leading zeros OK" },
];

export function ParseIntDiagram() {
  const [idx, setIdx] = useState(0);
  const r = PARSE_INPUTS[idx];
  const intIsNaN   = r.int  === "NaN";
  const floatIsNaN = r.float === "NaN";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {PARSE_INPUTS.map((item, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border-2 cursor-pointer transition-all
              ${idx === i ? "bg-violet-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {item.val}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="parseInt vs parseFloat" badge="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" />
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-xl border-2 p-4 ${intIsNaN ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20" : "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20"}`}>
              <div className="text-xs font-bold mb-2 text-blue-600 dark:text-blue-400">parseInt()</div>
              <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono mb-2">
                <div><span className="text-blue-400">parseInt</span>({r.val})</div>
                <div className="text-gray-400">{"// → "}<span className={intIsNaN ? "text-red-400" : "text-orange-300"}>{r.int}</span></div>
              </div>
              <div className={`text-[11px] font-semibold ${intIsNaN ? "text-red-600 dark:text-red-400" : "text-blue-700 dark:text-blue-300"}`}>
                {intIsNaN ? "❌ NaN — no leading digit" : `✅ Integer → ${r.int}`}
              </div>
            </div>
            <div className={`rounded-xl border-2 p-4 ${floatIsNaN ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20" : "border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/20"}`}>
              <div className="text-xs font-bold mb-2 text-violet-600 dark:text-violet-400">parseFloat()</div>
              <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono mb-2">
                <div><span className="text-violet-400">parseFloat</span>({r.val})</div>
                <div className="text-gray-400">{"// → "}<span className={floatIsNaN ? "text-red-400" : "text-yellow-300"}>{r.float}</span></div>
              </div>
              <div className={`text-[11px] font-semibold ${floatIsNaN ? "text-red-600 dark:text-red-400" : "text-violet-700 dark:text-violet-300"}`}>
                {floatIsNaN ? "❌ NaN — no leading digit" : `✅ Decimal → ${r.float}`}
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-800 dark:text-amber-300 font-semibold">
            💡 {r.note}
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-3 text-xs font-mono">
            <div className="text-gray-500 text-[10px] uppercase tracking-wide mb-2">vs Number()</div>
            <div>
              <span className="text-blue-400">Number</span>({r.val}) →{" "}
              <span className="text-red-400">NaN</span>
              {(r.val.includes("px") || r.val.includes("rem") || r.val.includes("kg") || r.val.includes("width")) &&
                <span className="text-gray-500"> ← any non-numeric char causes NaN</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 18. Object CRUD Diagram ──────────────────────────────────────────────────
type ObjEntry = { key: string; value: string | number | boolean };

const INITIAL_OBJ: ObjEntry[] = [
  { key: "name",    value: "John"  },
  { key: "age",     value: 20      },
  { key: "isAdmin", value: false   },
];

type CrudOp = "read" | "update" | "add" | "delete";

export function ObjectCrudDiagram() {
  const [entries, setEntries] = useState<ObjEntry[]>(INITIAL_OBJ);
  const [op, setOp]           = useState<CrudOp>("read");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [notation, setNotation]   = useState<"dot" | "bracket">("dot");

  const activeEntry = entries.find(e => e.key === activeKey);

  const handleDelete = (key: string) => {
    setEntries(es => es.filter(e => e.key !== key));
    if (activeKey === key) setActiveKey(null);
  };

  const handleUpdate = (key: string, val: string) => {
    const parsed = val === "true" ? true : val === "false" ? false : isNaN(Number(val)) ? val : Number(val);
    setEntries(es => es.map(e => e.key === key ? { ...e, value: parsed } : e));
  };

  const handleAdd = () => {
    const key = `prop${entries.length + 1}`;
    setEntries(es => [...es, { key, value: "newValue" }]);
    setActiveKey(key);
    setOp("read");
  };

  const OBJ_COL: Record<CrudOp, string> = { read: "#3b82f6", update: "#f97316", add: "#22c55e", delete: "#ef4444" };
  const col = OBJ_COL[op];

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Op tabs */}
      <div className="flex justify-center gap-2 mb-4">
        {(["read","update","add","delete"] as CrudOp[]).map(o => (
          <button key={o} onClick={() => { setOp(o); if (o === "add") handleAdd(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all uppercase tracking-wide
              ${op === o ? "border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: op === o ? OBJ_COL[o] : undefined }}>
            {o}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`Object — ${op}`} badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-4">
          {/* Notation toggle (read mode) */}
          {op === "read" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-800 dark:text-gray-200">Notation:</span>
              {(["dot","bracket"] as const).map(n => (
                <button key={n} onClick={() => setNotation(n)}
                  className={`px-2.5 py-1 rounded-lg border-2 font-bold cursor-pointer transition-all
                    ${notation === n ? "bg-blue-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-500 bg-white dark:bg-gray-800"}`}>
                  {n === "dot" ? "Dot (.)" : "Bracket ([])"}
                </button>
              ))}
            </div>
          )}

          {/* Object visual */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 space-y-2">
            <div className="text-xs font-mono text-gray-500 mb-1"><span className="text-blue-400">const</span> <span className="text-white">user</span> = {"{"}</div>
            {entries.map(e => (
              <div key={e.key} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border cursor-pointer transition-all text-xs font-mono
                ${activeKey === e.key ? "border-current shadow-sm" : "border-transparent hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-800"}`}
                style={activeKey === e.key ? { borderColor: col + "88", background: col + "10" } : {}}
                onClick={() => setActiveKey(activeKey === e.key ? null : e.key)}>
                <span className="text-yellow-500 flex-1">{e.key}:</span>
                {op === "update" && activeKey === e.key
                  ? <input autoFocus className="flex-1 bg-gray-800 text-green-400 px-2 py-0.5 rounded border border-orange-400 outline-none text-xs font-mono"
                      defaultValue={String(e.value)}
                      onBlur={ev => handleUpdate(e.key, ev.target.value)}
                      onKeyDown={ev => ev.key === "Enter" && handleUpdate(e.key, (ev.target as HTMLInputElement).value)} />
                  : <span className={typeof e.value === "string" ? "text-green-400 flex-1" : typeof e.value === "number" ? "text-orange-300 flex-1" : "text-purple-400 flex-1"}>
                      {typeof e.value === "string" ? `"${e.value}"` : String(e.value)}
                    </span>}
                {op === "delete" && (
                  <button onClick={ev => { ev.stopPropagation(); handleDelete(e.key); }}
                    className="ml-auto text-red-400 hover:text-red-600 font-bold px-1 cursor-pointer">✕</button>
                )}
              </div>
            ))}
            <div className="text-xs font-mono text-gray-500">{"}"}</div>
          </div>

          {/* Live code output */}
          {activeEntry && op === "read" && (
            <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
              <div className="text-gray-400">{"// "}{notation} notation</div>
              {notation === "dot"
                ? <div><span className="text-white">user.</span><span style={{ color: col }}>{activeEntry.key}</span><span className="text-gray-400">{" // → "}</span><span className="text-yellow-300">{typeof activeEntry.value === "string" ? `"${activeEntry.value}"` : String(activeEntry.value)}</span></div>
                : <div><span className="text-white">user[</span><span className="text-yellow-300">&quot;{activeEntry.key}&quot;</span><span className="text-white">]</span><span className="text-gray-400">{" // → "}</span><span className="text-yellow-300">{typeof activeEntry.value === "string" ? `"${activeEntry.value}"` : String(activeEntry.value)}</span></div>}
            </div>
          )}
          {op === "update" && (
            <div className="rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-3 text-xs text-orange-700 dark:text-orange-300 font-semibold">
              👆 ចុច property ហើយកែតម្លៃ → Enter ដើម្បីរក្សា
            </div>
          )}
          {op === "delete" && (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 text-xs text-red-700 dark:text-red-300 font-semibold">
              👆 ចុច ✕ ដើម្បីលុប property · ប្រើ <code className="bg-red-100 dark:bg-red-900 px-1 rounded">delete user.key</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 19. Object Methods Diagram ───────────────────────────────────────────────
export function ObjectMethodsDiagram() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(5);
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  const methods: { name: string; fn: (a: number, b: number) => number; color: string; label: string }[] = [
    { name: "add",      fn: (a,b) => a + b,              color: "#22c55e", label: "add(a, b)" },
    { name: "subtract", fn: (a,b) => a - b,              color: "#3b82f6", label: "subtract(a, b)" },
    { name: "multiply", fn: (a,b) => a * b,              color: "#f97316", label: "multiply(a, b)" },
    { name: "divide",   fn: (a,b) => b === 0 ? NaN : parseFloat((a/b).toFixed(3)), color: "#a855f7", label: "divide(a, b)" },
  ];

  const active = methods.find(m => m.name === activeMethod);
  const result = active ? active.fn(a, b) : null;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Object Methods" badge="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" />
        <div className="p-6 space-y-5">
          {/* Sliders */}
          <div className="grid grid-cols-2 gap-4">
            {[{ lbl: "a", val: a, set: setA }, { lbl: "b", val: b, set: setB }].map(s => (
              <div key={s.lbl}>
                <div className="flex justify-between text-xs font-mono text-gray-800 dark:text-gray-200 mb-1">
                  <span>{s.lbl}</span><span className="font-bold text-yellow-600">{s.val}</span>
                </div>
                <input type="range" min={0} max={20} value={s.val} onChange={e => s.set(+e.target.value)}
                  className="w-full h-2 rounded-full cursor-pointer accent-yellow-500" />
              </div>
            ))}
          </div>

          {/* Method buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {methods.map(m => (
              <button key={m.name} onClick={() => setActiveMethod(activeMethod === m.name ? null : m.name)}
                className={`py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
                  ${activeMethod === m.name ? "border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
                style={{ background: activeMethod === m.name ? m.color : undefined }}>
                {m.name}()
              </button>
            ))}
          </div>

          {/* Result */}
          {active && result !== null && (
            <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: active.color + "44", background: active.color + "10" }}>
              <div className="text-xs font-mono text-gray-500 mb-1">calculator.{active.label.replace("(a, b)", `(${a}, ${b})`)}</div>
              <div className="text-4xl font-bold font-mono" style={{ color: active.color }}>{isNaN(result as number) ? "NaN" : String(result)}</div>
            </div>
          )}

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-0.5">
            <div><span className="text-blue-400">const</span> <span className="text-white">calculator</span> = {"{"}</div>
            {methods.map(m => (
              <div key={m.name} className={`pl-4 transition-opacity ${activeMethod === m.name ? "opacity-100" : "opacity-40"}`}>
                <span style={{ color: m.color }}>{m.name}</span>
                <span className="text-white">(a, b) {"{"} </span>
                <span className="text-blue-400">return</span>
                <span className="text-white"> a {m.name === "add" ? "+" : m.name === "subtract" ? "-" : m.name === "multiply" ? "*" : "/"} b; {"}"}</span>
              </div>
            ))}
            <div className="text-white">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 20. Object Destructuring Diagram ────────────────────────────────────────
const DESTRUCT_OBJ = { fullName: "Alice", score: 95, grade: "A", city: "Phnom Penh" };

export function ObjectDestructuringDiagram() {
  const [selected, setSelected] = useState<string[]>(["fullName", "score"]);
  const keys = Object.keys(DESTRUCT_OBJ) as (keyof typeof DESTRUCT_OBJ)[];

  const toggle = (k: string) =>
    setSelected(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Object Destructuring" badge="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" />
        <div className="p-6 space-y-5">
          {/* Key selector */}
          <div className="space-y-2">
            <div className="text-xs text-gray-800 dark:text-gray-200 font-semibold">ជ្រើស keys ដើម្បី destructure:</div>
            <div className="flex flex-wrap gap-2">
              {keys.map(k => (
                <button key={k} onClick={() => toggle(k)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
                    ${selected.includes(k) ? "bg-violet-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Old way */}
            <div className="rounded-xl border-2 border-red-200 dark:border-red-800 overflow-hidden">
              <div className="px-3 py-1.5 bg-red-50 dark:bg-red-950/30 text-[10px] uppercase font-bold text-red-600 dark:text-red-400">❌ ចាស់ (verbose)</div>
              <div className="bg-gray-900 p-3 text-xs font-mono space-y-0.5">
                {selected.length === 0
                  ? <div className="text-gray-500">{"// ជ្រើស key ខាងលើ"}</div>
                  : selected.map(k => (
                    <div key={k}>
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-white">{k}</span> ={" "}
                      <span className="text-white">student.</span>
                      <span className="text-yellow-300">{k}</span>;
                    </div>
                  ))}
              </div>
            </div>

            {/* Destructuring */}
            <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 overflow-hidden">
              <div className="px-3 py-1.5 bg-violet-50 dark:bg-violet-950/30 text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400">✅ Destructuring (ES6)</div>
              <div className="bg-gray-900 p-3 text-xs font-mono">
                {selected.length === 0
                  ? <div className="text-gray-500">{"// ជ្រើស key ខាងលើ"}</div>
                  : <>
                    <span className="text-blue-400">const</span>
                    <span className="text-white"> {"{"} </span>
                    {selected.map((k, i) => (
                      <span key={k}><span className="text-violet-400">{k}</span>{i < selected.length - 1 ? <span className="text-white">, </span> : null}</span>
                    ))}
                    <span className="text-white"> {"}"} = student;</span>
                  </>}
              </div>
            </div>
          </div>

          {/* Result values */}
          {selected.length > 0 && (
            <div className="rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 p-4 space-y-1.5">
              <div className="text-[10px] text-violet-500 uppercase font-bold mb-2">Extracted variables</div>
              {selected.map(k => (
                <div key={k} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-violet-400 font-bold w-24">{k}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-yellow-300">{typeof DESTRUCT_OBJ[k as keyof typeof DESTRUCT_OBJ] === "string" ? `"${DESTRUCT_OBJ[k as keyof typeof DESTRUCT_OBJ]}"` : DESTRUCT_OBJ[k as keyof typeof DESTRUCT_OBJ]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 21. Spread Operator Diagram ──────────────────────────────────────────────
export function ObjectSpreadDiagram() {
  const base   = { theme: "light", notifications: true, language: "km" };
  const [overrides, setOverrides] = useState<Record<string, string | boolean>>({ theme: "dark" });

  const result = { ...base, ...overrides };

  const toggleOverride = (k: string) => {
    setOverrides(prev => {
      const next = { ...prev };
      if (k in next) delete next[k]; else next[k] = k === "theme" ? "dark" : k === "notifications" ? false : "en";
      return next;
    });
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Spread Operator (...)" badge="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" />
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Base object */}
            <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-[10px] uppercase font-bold text-gray-500 tracking-wide">defaultSettings</div>
              <div className="p-3 space-y-1.5">
                {Object.entries(base).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-xs font-mono px-2 py-1 rounded bg-gray-50 dark:bg-gray-800">
                    <span className="text-yellow-500">{k}:</span>
                    <span className="text-green-400">{typeof v === "string" ? `"${v}"` : String(v)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overrides */}
            <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 overflow-hidden">
              <div className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950/30 text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400">overrides (toggle)</div>
              <div className="p-3 space-y-1.5">
                {Object.entries(base).map(([k, v]) => {
                  const isOverridden = k in overrides;
                  const newVal = overrides[k];
                  return (
                    <button key={k} onClick={() => toggleOverride(k)}
                      className={`w-full flex items-center justify-between text-xs font-mono px-2 py-1.5 rounded-lg border-2 cursor-pointer transition-all
                        ${isOverridden ? "border-teal-400 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/20" : "border-transparent bg-gray-50 dark:bg-gray-800 opacity-40"}`}>
                      <span className={isOverridden ? "text-teal-600 dark:text-teal-400 font-bold" : "text-yellow-500"}>{k}:</span>
                      <span className={isOverridden ? "text-teal-400 font-bold" : "text-green-400"}>
                        {isOverridden ? (typeof newVal === "string" ? `"${newVal}"` : String(newVal)) : (typeof v === "string" ? `"${v}"` : String(v))}
                        {isOverridden && <span className="ml-1 text-[9px] text-teal-500">overwrite ✕</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Merged result */}
          <div className="rounded-xl border-2 border-teal-300 dark:border-teal-700 overflow-hidden">
            <div className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950/20 text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300">
              {"{"} ...defaultSettings, ...overrides {"}"} = mySettings
            </div>
            <div className="p-3 space-y-1.5">
              {Object.entries(result).map(([k, v]) => {
                const isOverridden = k in overrides;
                return (
                  <div key={k} className={`flex items-center justify-between text-xs font-mono px-2 py-1.5 rounded-lg ${isOverridden ? "bg-teal-50 dark:bg-teal-950/30" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <span className="text-yellow-500">{k}:</span>
                    <div className="flex items-center gap-2">
                      <span className={isOverridden ? "text-teal-400 font-bold" : "text-green-400"}>
                        {typeof v === "string" ? `"${v}"` : String(v)}
                      </span>
                      {isOverridden && <span className="text-[9px] px-1 py-0.5 rounded bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">overwritten</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-0.5">
            <div><span className="text-blue-400">const</span> <span className="text-white">mySettings</span> = {"{"}</div>
            <div className="pl-4"><span className="text-teal-400">...defaultSettings</span><span className="text-white">,</span></div>
            {Object.entries(overrides).map(([k, v]) => (
              <div key={k} className="pl-4">
                <span className="text-yellow-300">{k}</span>: <span className="text-teal-400">{typeof v === "string" ? `"${v}"` : String(v)}</span>,
              </div>
            ))}
            <div className="text-white">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 24. Array Destructuring Diagram ─────────────────────────────────────────
const DESTRUCT_COLORS = ["red", "green", "blue", "black"];

export function ArrayDestructuringDiagram() {
  const [picks, setPicks] = useState<(number | "skip")[]>([0, 1]);

  const toggle = (i: number) => {
    setPicks(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i);
      if (prev.includes("skip") && prev[prev.length - 1] === "skip") return [...prev.filter(x => x !== "skip"), i];
      return [...prev, i];
    });
  };

  const toggleSkip = () => {
    setPicks(prev => prev.includes("skip") ? prev.filter(x => x !== "skip") : [...prev, "skip"]);
  };

  // Build destructuring pattern
  const maxIdx = Math.max(...picks.filter((p): p is number => p !== "skip"));
  const pattern: string[] = [];
  for (let i = 0; i <= (maxIdx >= 0 ? maxIdx : -1); i++) {
    if (picks.includes(i)) pattern.push(`color${i + 1}`);
    else pattern.push("");
  }
  const patternStr = pattern.join(", ");

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Array Destructuring" badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        <div className="p-6 space-y-5">

          {/* Array visual */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-300 font-bold mb-2">ជ្រើស index ដើម្បី extract:</div>
            <div className="flex flex-wrap gap-2">
              {DESTRUCT_COLORS.map((color, i) => (
                <button key={i} onClick={() => toggle(i)}
                  className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 cursor-pointer transition-all text-xs font-bold
                    ${picks.includes(i) ? "border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 bg-white dark:bg-gray-800"}`}
                  style={{ background: picks.includes(i) ? color : undefined }}>
                  <span className="text-[9px] font-mono text-current opacity-70">[{i}]</span>
                  &quot;{color}&quot;
                </button>
              ))}
              <button onClick={toggleSkip}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 cursor-pointer transition-all text-xs font-bold
                  ${picks.includes("skip") ? "bg-gray-600 border-transparent text-white" : "border-dashed border-gray-300 dark:border-gray-600 text-gray-400 bg-white dark:bg-gray-800"}`}>
                <span className="text-[9px] opacity-70">skip ,</span>
                រំលង
              </button>
            </div>
          </div>

          {/* Side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-red-200 dark:border-red-800 overflow-hidden">
              <div className="px-3 py-1.5 bg-red-50 dark:bg-red-950/30 text-[10px] uppercase font-bold text-red-500">❌ ចាស់</div>
              <div className="bg-gray-900 p-3 text-xs font-mono space-y-0.5">
                {picks.filter((p): p is number => p !== "skip").map(i => (
                  <div key={i}>
                    <span className="text-blue-400">const</span> <span className="text-white">color{i + 1}</span> = <span className="text-white">colors[</span><span className="text-orange-300">{i}</span><span className="text-white">];</span>
                  </div>
                ))}
                {picks.filter((p): p is number => p !== "skip").length === 0 && <div className="text-gray-500">{"// ជ្រើស index"}</div>}
              </div>
            </div>
            <div className="rounded-xl border-2 border-green-200 dark:border-green-800 overflow-hidden">
              <div className="px-3 py-1.5 bg-green-50 dark:bg-green-950/30 text-[10px] uppercase font-bold text-green-600">✅ Destructuring</div>
              <div className="bg-gray-900 p-3 text-xs font-mono">
                {picks.filter((p): p is number => p !== "skip").length === 0
                  ? <div className="text-gray-500">{"// ជ្រើស index"}</div>
                  : <div>
                    <span className="text-blue-400">const</span> <span className="text-white">[</span>
                    <span className="text-green-400">{patternStr}</span>
                    <span className="text-white">] = colors;</span>
                  </div>}
              </div>
            </div>
          </div>

          {/* Result values */}
          {picks.filter((p): p is number => p !== "skip").length > 0 && (
            <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 space-y-1.5">
              <div className="text-[10px] text-green-500 uppercase font-bold mb-1">Extracted variables</div>
              {picks.filter((p): p is number => p !== "skip").map(i => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-green-400 font-bold w-20">color{i + 1}</span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-0.5 rounded text-white text-[11px] font-bold" style={{ background: DESTRUCT_COLORS[i] }}>
                    &quot;{DESTRUCT_COLORS[i]}&quot;
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 25. Array Spread Diagram ─────────────────────────────────────────────────
export function ArraySpreadDiagram() {
  const [arr1, setArr1] = useState(["Sok", "Sao"]);
  const [arr2, setArr2] = useState(["Dara", "Chea"]);
  const [extras, setExtras] = useState(["Minea"]);

  const POOL1 = ["Sok", "Sao", "Kim", "Ly"];
  const POOL2 = ["Dara", "Chea", "Rith", "Vann"];

  const merged = [...arr1, ...arr2, ...extras];

  const toggleArr = (
    pool: string[],
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => setArr(a => a.includes(item) ? a.filter(x => x !== item) : [...a, item]);

  const ItemChip = ({ label, color, active }: { label: string; color: string; active: boolean }) => (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${active ? "text-white" : "opacity-40 border-gray-200 dark:border-gray-700 text-gray-500"}`}
      style={active ? { borderColor: color, background: color + "22", color } : {}}>
      &quot;{label}&quot;
    </span>
  );

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Spread Operator — Arrays" badge="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" />
        <div className="p-6 space-y-5">

          {/* Two source arrays */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "oldUsers", pool: POOL1, arr: arr1, setArr: setArr1, color: "#3b82f6" },
              { label: "newUsers", pool: POOL2, arr: arr2, setArr: setArr2, color: "#f97316" },
            ].map(({ label, pool, arr, setArr, color }) => (
              <div key={label} className="rounded-xl border-2 p-3 space-y-2" style={{ borderColor: color + "44" }}>
                <div className="text-[10px] uppercase font-bold" style={{ color }}>{label}</div>
                <div className="flex flex-wrap gap-1.5">
                  {pool.map(item => (
                    <button key={item} onClick={() => toggleArr(pool, arr, setArr, item)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
                        ${arr.includes(item) ? "text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-400 opacity-50 bg-white dark:bg-gray-800"}`}
                      style={{ background: arr.includes(item) ? color : undefined }}>
                      &quot;{item}&quot;
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Extras */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-gray-800 dark:text-gray-200 font-semibold">Extra items:</span>
            {["Minea", "Bopha", "Srey"].map(item => (
              <button key={item} onClick={() => setExtras(e => e.includes(item) ? e.filter(x => x !== item) : [...e, item])}
                className={`px-2.5 py-1 rounded-lg border-2 font-bold cursor-pointer transition-all
                  ${extras.includes(item) ? "bg-violet-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-400 bg-white dark:bg-gray-800"}`}>
                &quot;{item}&quot;
              </button>
            ))}
          </div>

          {/* Merged result */}
          <div className="rounded-xl border-2 border-teal-300 dark:border-teal-700 overflow-hidden">
            <div className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950/20 text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300">
              [...oldUsers, ...newUsers{extras.length > 0 ? ", ...extras" : ""}] = allUsers ({merged.length} items)
            </div>
            <div className="p-3 flex flex-wrap gap-1.5">
              {arr1.map(i => <ItemChip key={i} label={i} color="#3b82f6" active />)}
              {arr2.map(i => <ItemChip key={i} label={i} color="#f97316" active />)}
              {extras.map(i => <ItemChip key={i} label={i} color="#7c3aed" active />)}
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-0.5">
            <div><span className="text-blue-400">const</span> <span className="text-white">oldUsers</span> = [<span className="text-blue-400">{arr1.map(i => `"${i}"`).join(", ")}</span>];</div>
            <div><span className="text-blue-400">const</span> <span className="text-white">newUsers</span> = [<span className="text-orange-400">{arr2.map(i => `"${i}"`).join(", ")}</span>];</div>
            <div className="mt-1">
              <span className="text-blue-400">const</span> <span className="text-white">allUsers</span> = [
              <span className="text-teal-400">...oldUsers</span>, <span className="text-teal-400">...newUsers</span>
              {extras.length > 0 && <span>, <span className="text-violet-400">{extras.map(e => `"${e}"`).join(", ")}</span></span>}
              ];
            </div>
            <div className="text-gray-500 mt-1">{"// ["}{merged.map(i => `"${i}"`).join(", ")}]</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const JS_DIAGRAMS: Record<string, React.ComponentType> = {
  jsdatatypes:               DataTypesDiagram,
  jsvariables:               VariablesDiagram,
  jsfunctions:               FunctionsDiagram,
  jsarithmetic:              ArithmeticDiagram,
  jscomparison:              ComparisonDiagram,
  jslogical:                 LogicalDiagram,
  jsmodernoperators:         ModernOperatorsDiagram,
  jsimplicitconversion:      ImplicitConversionDiagram,
  jsexplicitconversion:      ExplicitConversionDiagram,
  jsparseint:                ParseIntDiagram,
  jsobjectcrud:              ObjectCrudDiagram,
  jsobjectmethods:           ObjectMethodsDiagram,
  jsobjectdestructuring:     ObjectDestructuringDiagram,
  jsobjectspread:            ObjectSpreadDiagram,
  jsarraydestructuring:      ArrayDestructuringDiagram,
  jsarrayspread:             ArraySpreadDiagram,
  jsdomtree:                 DomTreeDiagram,
  jsdomselect:               DomModifyDiagram,
  jsdomevents:               DomEventsDiagram,
  jsdomcreate:               DomCreateDiagram,
  jsdomappend:               DomAppendDiagram,
  jsdomremove:               DomRemoveReplaceDiagram,
  jseventlistener:           EventListenerDiagram,
  jseventobject:             EventObjectDiagram,
  jspreventdefault:          PreventDefaultDiagram,
  jstrycatch:                TryCatchFlowDiagram,
  jsfinally:                 FinallyDiagram,
  jsthrowerror:              ThrowCustomErrorDiagram,
  jssettimeout:              SetTimeoutDiagram,
  jssetinterval:             SetIntervalDiagram,
  jsclearinterval:           ClearIntervalDiagram,
  jscleartimeout:            ClearTimeoutDiagram,
  jsnamedexport:             NamedExportDiagram,
  jsdefaultexport:           DefaultExportDiagram,
  jscombinedimport:          CombinedImportDiagram,
  jsjsonformat:              JsonFormatDiagram,
  jsjsonstringify:           JsonStringifyDiagram,
  jsjsonparse:               JsonParseDiagram,
  jslsbasic:                 LocalStorageBasicDiagram,
  jslsjson:                  LocalStorageJsonDiagram,
  jssyncasync:               SyncAsyncDiagram,
  jspromisestates:           PromiseStatesDiagram,
  jsasyncawait:              AsyncAwaitDiagram,
  jsfetchflow:               FetchFlowDiagram,
  jsfetchstatuscodes:        FetchStatusCodesDiagram,
  jsfetchdomrender:          FetchDomRenderDiagram,
  jsclassblueprint:          ClassBlueprintDiagram,
  jsthiskeyword:             ThisKeywordDiagram,
  jsinheritance:             InheritanceDiagram,
  jsconsolemethods:          ConsoleMethodsDiagram,
  jsbreakpoints:             BreakpointsDiagram,
  jsdebuggerkeyword:         DebuggerKeywordDiagram,
};

export function JsDiagram({ name }: { name: string }) {
  const Component = JS_DIAGRAMS[name.toLowerCase().replace(/[^a-z]/g, "")];
  if (!Component) {
    return (
      <div className="not-prose my-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        Unknown JS diagram: <code>{name}</code>
      </div>
    );
  }
  return <Component />;
}
