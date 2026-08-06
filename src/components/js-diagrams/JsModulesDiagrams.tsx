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

// ─── File chip ────────────────────────────────────────────────────────────────
function FileChip({ name, active, color, onClick }: { name: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border-2 cursor-pointer transition-all ${active ? "text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
      style={{ background: active ? color : undefined }}>
      📄 {name}
    </button>
  );
}

// ─── 1. Named Export Diagram ──────────────────────────────────────────────────
export function NamedExportDiagram() {
  const [activeFile, setActiveFile] = useState<"math" | "app">("math");
  const [imported, setImported] = useState<string[]>([]);

  function toggleImport(name: string) {
    setImported(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  }

  const exports = [
    { name: "PI",  value: "3.14",          color: "#3b82f6" },
    { name: "add", value: "(a,b) => a+b",  color: "#22c55e" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Named Export { }" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-4">

          {/* File switcher */}
          <div className="flex gap-2">
            <FileChip name="math.js" active={activeFile === "math"} color="#3b82f6" onClick={() => setActiveFile("math")} />
            <FileChip name="app.js"  active={activeFile === "app"}  color="#6366f1" onClick={() => setActiveFile("app")} />
          </div>

          {/* math.js view */}
          {activeFile === "math" && (
            <div className="space-y-3">
              <div className="text-xs text-gray-900 dark:text-gray-100 font-semibold">ជ្រើសយកអ្វីដែលចង់ export:</div>
              <div className="flex gap-2 flex-wrap">
                {exports.map(e => (
                  <button key={e.name} onClick={() => toggleImport(e.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border-2 cursor-pointer transition-all ${imported.includes(e.name) ? "text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
                    style={{ background: imported.includes(e.name) ? e.color : undefined }}>
                    export {e.name}
                  </button>
                ))}
              </div>
              <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
                {exports.map(e => (
                  <div key={e.name} className={`transition-colors ${imported.includes(e.name) ? "text-green-400" : "text-gray-500"}`}>
                    <span className="text-blue-400">export const</span> <span className="text-white">{e.name}</span> = <span style={{ color: e.color }}>{e.value}</span>;
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* app.js view */}
          {activeFile === "app" && (
            <div className="space-y-3">
              <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
                <div>
                  <span className="text-blue-400">import</span>
                  <span className="text-yellow-300"> {"{ "}{imported.length > 0 ? imported.join(", ") : "..."}{" }"}</span>
                  <span className="text-blue-400"> from </span>
                  <span className="text-green-300">'./math.js'</span>;
                </div>
                {imported.includes("PI") && (
                  <div className="text-gray-300 mt-1">console.log(<span className="text-green-300">"PI:"</span>, <span className="text-blue-300">PI</span>); <span className="text-gray-500">// 3.14</span></div>
                )}
                {imported.includes("add") && (
                  <div className="text-gray-300">console.log(<span className="text-green-300">"add:"</span>, <span className="text-blue-300">add</span>(10, 5)); <span className="text-gray-500">// 15</span></div>
                )}
              </div>
              {imported.length === 0 && (
                <div className="text-xs text-gray-900 dark:text-gray-100 italic">← ចូលទៅ math.js ហើយ export អ្វីមួយ</div>
              )}
            </div>
          )}

          {/* Flow arrows */}
          {imported.length > 0 && (
            <div className="flex items-center gap-2 text-[11px] font-bold flex-wrap">
              <span className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-mono">math.js</span>
              <span className="text-gray-900 dark:text-gray-100">→ exports → </span>
              {imported.map(n => (
                <span key={n} className="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-mono">{n}</span>
              ))}
              <span className="text-gray-900 dark:text-gray-100">→ </span>
              <span className="px-2 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-mono">app.js</span>
            </div>
          )}

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-3 py-2 text-[11px] text-blue-700 dark:text-blue-300">
            💡 Named export ត្រូវប្រើ <code className="font-mono bg-blue-100 dark:bg-blue-900/50 px-1 rounded">{"{ }"}</code> ពេល import — ហើយឈ្មោះត្រូវស្ថិតនៅ<strong>ដូចគ្នា</strong>ជានិច្ច
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Default Export Diagram ────────────────────────────────────────────────
export function DefaultExportDiagram() {
  const [importName, setImportName] = useState("User");
  const [activeFile, setActiveFile] = useState<"user" | "app">("user");
  const [called, setCalled] = useState(false);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Default Export" badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        <div className="p-6 space-y-4">

          {/* File switcher */}
          <div className="flex gap-2">
            <FileChip name="User.js" active={activeFile === "user"} color="#22c55e" onClick={() => setActiveFile("user")} />
            <FileChip name="app.js"  active={activeFile === "app"}  color="#6366f1" onClick={() => setActiveFile("app")} />
          </div>

          {/* User.js */}
          {activeFile === "user" && (
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div><span className="text-blue-400">class</span> <span className="text-yellow-300">User</span> {"{"}</div>
              <div className="pl-4"><span className="text-blue-400">constructor</span>(<span className="text-orange-300">name</span>) {"{"}</div>
              <div className="pl-8"><span className="text-white">this.name</span> = <span className="text-orange-300">name</span>;</div>
              <div className="pl-4">{"}"}</div>
              <div>{"}"}</div>
              <div className="mt-1 text-green-400"><span className="text-blue-400">export default</span> <span className="text-yellow-300">User</span>; <span className="text-gray-500">// default — no {"{ }"}</span></div>
            </div>
          )}

          {/* app.js */}
          {activeFile === "app" && (
            <div className="space-y-3">
              <div className="text-xs text-gray-900 dark:text-gray-100 font-semibold">ដាក់ឈ្មោះ import ថាអ្វីក៏បាន:</div>
              <input type="text" value={importName}
                onChange={e => { setImportName(e.target.value || "User"); setCalled(false); }}
                className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-400"
              />
              <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
                <div>
                  <span className="text-blue-400">import</span>
                  <span className="text-yellow-300"> {importName || "User"}</span>
                  <span className="text-blue-400"> from </span>
                  <span className="text-green-300">'./User.js'</span>;
                  <span className="text-gray-500 ml-2">// គ្មាន {"{ }"}</span>
                </div>
                <div className={`transition-colors ${called ? "text-green-400" : "text-gray-400"}`}>
                  <span className="text-blue-400">const</span> user1 = <span className="text-blue-400">new</span> <span className="text-yellow-300">{importName || "User"}</span>(<span className="text-green-300">"Sok"</span>);
                </div>
                {called && <div className="text-green-400">console.log(user1.name); <span className="text-gray-500">// "Sok"</span></div>}
              </div>
              <button onClick={() => setCalled(true)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all">
                ▶ new {importName || "User"}("Sok")
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-bold">
            <div className="rounded-lg border border-green-300 bg-green-50 dark:bg-green-950/30 py-2 text-green-700 dark:text-green-300">
              <div>Default Export</div>
              <div className="font-mono opacity-75">export default User</div>
              <div className="opacity-60 mt-0.5">ក្នុង 1 file — 1 ប៉ុណ្ណោះ</div>
            </div>
            <div className="rounded-lg border border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 py-2 text-indigo-700 dark:text-indigo-300">
              <div>Import ដោយ</div>
              <div className="font-mono opacity-75">import {importName} from ...</div>
              <div className="opacity-60 mt-0.5">គ្មាន {"{ }"} — ឈ្មោះបត់ចិត្ត</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Combined Import Diagram ───────────────────────────────────────────────
export function CombinedImportDiagram() {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "myModule.js", desc: "export ទាំងពីរប្រភេទ" },
    { label: "import default", desc: "import sayHello (no {})" },
    { label: "import named", desc: "import { name }" },
    { label: "ប្រើប្រាស់", desc: "ហៅ sayHello() + log name" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Default + Named រួមគ្នា" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">

          {/* Step progress */}
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setStep(i)}
                className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold text-center cursor-pointer transition-all border-2 ${
                  i === step ? "bg-purple-600 border-transparent text-white" :
                  i < step   ? "border-purple-300 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300" :
                  "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
                }`}>
                {i < step ? "✓" : i + 1}
              </button>
            ))}
          </div>
          <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">{steps[step].label} <span className="opacity-60">— {steps[step].desc}</span></div>

          {/* myModule.js */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div className="text-gray-500 mb-1">{"// myModule.js"}</div>
            <div className={`transition-colors ${step >= 2 ? "text-green-400" : "text-gray-500"}`}>
              <span className="text-blue-400">export const</span> <span className="text-white">name</span> = <span className="text-green-300">"JavaScript"</span>; <span className="text-gray-600">{"// Named"}</span>
            </div>
            <div className={`transition-colors ${step >= 1 ? "text-yellow-300" : "text-gray-500"}`}>
              <span className="text-blue-400">const</span> <span className="text-white">sayHello</span> = () =&gt; console.<span className="text-yellow-300">log</span>(<span className="text-green-300">"Hello!"</span>);
            </div>
            <div className={`transition-colors ${step >= 1 ? "text-yellow-300" : "text-gray-500"}`}>
              <span className="text-blue-400">export default</span> sayHello; <span className="text-gray-600">{"// Default"}</span>
            </div>
          </div>

          {/* app.js */}
          {step >= 1 && (
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="text-gray-500 mb-1">{"// app.js"}</div>
              <div>
                <span className="text-blue-400">import</span>
                <span className={`transition-colors ${step >= 1 ? "text-yellow-300" : "text-gray-500"}`}> sayHello</span>
                {step >= 2 && <span className="text-white">, <span className="text-green-300">{"{ name }"}</span></span>}
                <span className="text-blue-400"> from </span>
                <span className="text-green-300">'./myModule.js'</span>;
              </div>
              {step >= 3 && <>
                <div className="mt-1 text-yellow-300">sayHello(); <span className="text-gray-500">// Hello!</span></div>
                <div className="text-green-300">console.log(name); <span className="text-gray-500">// JavaScript</span></div>
              </>}
            </div>
          )}

          {/* Nav */}
          <div className="flex justify-between">
            <button onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              Next →
            </button>
          </div>

          <div className="rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 px-3 py-2 text-[11px] text-purple-700 dark:text-purple-300">
            💡 អ្នកអាច import ទាំង default <strong> និង</strong> named ក្នុង statement តែមួយ — default ត្រូវមកមុន {"{}"}
          </div>
        </div>
      </div>
    </div>
  );
}
