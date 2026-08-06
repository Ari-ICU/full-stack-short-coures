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

type BlockState = "idle" | "active" | "skipped" | "error";

function CodeBlock({
  label,
  lines,
  state,
  color,
}: {
  label: string;
  lines: string[];
  state: BlockState;
  color: string;
}) {
  const borderColor =
    state === "active"  ? color :
    state === "error"   ? "#ef4444" :
    state === "skipped" ? "#374151" : "#374151";
  const bgColor =
    state === "active"  ? color + "18" :
    state === "skipped" ? "transparent" : "transparent";
  const opacity = state === "skipped" ? "opacity-30" : "opacity-100";

  return (
    <div
      className={`rounded-xl border-2 p-3 transition-all duration-300 ${opacity}`}
      style={{ borderColor, background: bgColor }}
    >
      <div className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: state === "active" ? color : "#111827" }}>
        {label}
      </div>
      <div className="bg-gray-900 rounded-lg p-2.5 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className="text-xs font-mono text-gray-300 whitespace-pre">{line}</div>
        ))}
      </div>
    </div>
  );
}

// ─── 1. try…catch Flow Diagram ────────────────────────────────────────────────
export function TryCatchFlowDiagram() {
  type Scenario = "idle" | "success" | "error";
  const [scenario, setScenario] = useState<Scenario>("idle");

  const tryState: BlockState =
    scenario === "idle" ? "idle" :
    scenario === "error" ? "error" : "active";
  const catchState: BlockState =
    scenario === "error" ? "active" :
    scenario === "success" ? "skipped" : "idle";
  const afterState: BlockState =
    scenario === "idle" ? "idle" : "active";

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Scenario buttons */}
      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => setScenario("success")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
            ${scenario === "success" ? "bg-green-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
        >
          ✅ គ្មាន Error
        </button>
        <button
          onClick={() => setScenario("error")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
            ${scenario === "error" ? "bg-red-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
        >
          ❌ មាន Error
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="try...catch — Execution Flow" badge="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" />
        <div className="p-6 space-y-3">

          {/* Step legend */}
          <div className="flex gap-2 flex-wrap text-[10px] font-bold mb-1">
            <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">① try</span>
            <span className="text-gray-900 dark:text-gray-100 self-center">→</span>
            <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300">② catch <span className="opacity-60">(បើមាន Error)</span></span>
            <span className="text-gray-900 dark:text-gray-100 self-center">→</span>
            <span className="px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">③ បន្តដំណើរការ</span>
          </div>

          {/* try block */}
          <CodeBlock
            label="① try { }  — ដំណើរការកូដនេះ"
            state={tryState}
            color="#3b82f6"
            lines={[
              'let msg = "សួស្តី!";',
              "console.log(msg);",
              scenario === "error"
                ? "nonExistentFunction(); // ❌ Error កើតឡើងទីនេះ!"
                : '// ✅ ដំណើរការជោគជ័យ គ្មាន Error',
            ]}
          />

          {/* Arrow */}
          <div className="flex items-center justify-center gap-3 text-xs font-bold h-5">
            {scenario === "error" && (
              <span className="text-red-500 animate-pulse">↓ Error! លោតទៅ catch ភ្លាម — រំលង code ខាងក្រោម</span>
            )}
            {scenario === "success" && (
              <span className="text-green-500">↓ ជោគជ័យ — catch ត្រូវបានរំលងទាំងស្រុង</span>
            )}
            {scenario === "idle" && (
              <span className="text-gray-900 dark:text-gray-100">↑ ចុចប៊ូតុងខាងលើ ដើម្បីមើលលំហូរ</span>
            )}
          </div>

          {/* catch block */}
          <CodeBlock
            label={catchState === "skipped" ? "② catch { }  — ត្រូវបានរំលង (skip)" : "② catch (error) { }  — ចាប់យក Error"}
            state={catchState}
            color="#ef4444"
            lines={[
              'console.log("មានបញ្ហា:", error.message);',
              '// ↑ error.message = "nonExistentFunction is not defined"',
            ]}
          />

          {/* after */}
          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3">
            <CodeBlock
              label="③ Code continues — កម្មវិធីបន្តធម្មតា (មិន Crash)"
              state={afterState}
              color="#22c55e"
              lines={['console.log("កម្មវិធីនៅដើរធម្មតា!");']}
            />
          </div>

          {/* Status */}
          {scenario !== "idle" && (
            <div className={`rounded-xl px-4 py-2.5 text-xs font-semibold text-center ${
              scenario === "error"
                ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                : "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
            }`}>
              {scenario === "error"
                ? "❌ Error ត្រូវបានចាប់យក — កម្មវិធីបន្តដំណើរការ មិន Crash ទេ!"
                : "✅ ដំណើរការជោគជ័យ — catch ត្រូវបានរំលង កម្មវិធីបន្ត"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 2. finally Diagram ───────────────────────────────────────────────────────
export function FinallyDiagram() {
  type FScenario = "idle" | "success" | "error";
  const [scenario, setScenario] = useState<FScenario>("idle");
  const [isLoading, setIsLoading] = useState(true);

  function simulate(s: FScenario) {
    setScenario(s);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }

  const tryState: BlockState =
    scenario === "idle" ? "idle" :
    scenario === "error" ? "error" : "active";
  const catchState: BlockState =
    scenario === "error" ? "active" :
    scenario === "success" ? "skipped" : "idle";
  const finallyState: BlockState =
    scenario === "idle" ? "idle" : (isLoading ? "idle" : "active");

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => simulate("success")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
            ${scenario === "success" ? "bg-green-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
        >
          ✅ ជោគជ័យ
        </button>
        <button
          onClick={() => simulate("error")}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all
            ${scenario === "error" ? "bg-red-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"}`}
        >
          ❌ មាន Error
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="try...catch...finally" badge="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" />
        <div className="p-6 space-y-3">

          {/* Loading indicator */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-900 dark:text-gray-100 font-mono">isLoading =</span>
            <span className={`font-bold px-2 py-0.5 rounded-md font-mono ${
              isLoading || scenario === "idle"
                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            }`}>
              {scenario === "idle" ? "true" : isLoading ? "true" : "false"}
            </span>
          </div>

          <CodeBlock
            label="① try { }  — ព្យាយាមដំណើរការ"
            state={tryState}
            color="#3b82f6"
            lines={[
              'console.log("កំពុងទាញយកទិន្នន័យ...");',
              scenario === "error"
                ? 'throw new Error("ដាច់អុីនធឺណិត!"); // ❌ Error'
                : "// ✅ ទាញយកទិន្នន័យបាន",
            ]}
          />

          <CodeBlock
            label={catchState === "skipped" ? "② catch { }  — ត្រូវបានរំលង" : "② catch (error) { }  — ចាប់ Error"}
            state={catchState}
            color="#ef4444"
            lines={['console.log("កំហុស:", error.message);']}
          />

          <div className="relative">
            {finallyState === "active" && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-yellow-600 dark:text-yellow-400 animate-bounce">
                ▼ តែងតែដំណើរការ!
              </div>
            )}
            <div className="pt-2">
              <CodeBlock
                label="③ finally { }  — តែងតែដំណើរការជានិច្ច"
                state={finallyState}
                color="#eab308"
                lines={[
                  "isLoading = false;  // ✅ cleanup",
                  'console.log("បញ្ចប់ប្រតិបត្តិការ។");',
                ]}
              />
            </div>
          </div>

          {scenario !== "idle" && !isLoading && (
            <>
              {/* Path summary */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
                <div className={`rounded-lg py-1.5 px-2 border ${tryState === "active" ? "border-blue-300 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300" : "border-red-300 bg-red-50 dark:bg-red-950/30 text-red-500"}`}>
                  try {tryState === "active" ? "✅ ran" : "❌ threw"}
                </div>
                <div className={`rounded-lg py-1.5 px-2 border ${catchState === "active" ? "border-red-300 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300" : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}>
                  catch {catchState === "active" ? "✅ ran" : "⬜ skipped"}
                </div>
                <div className="rounded-lg py-1.5 px-2 border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-300">
                  finally ✅ always
                </div>
              </div>
              <div className="rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 px-4 py-2.5 text-xs font-semibold text-yellow-700 dark:text-yellow-300 text-center">
                💡 <code className="font-mono">finally</code> ដំណើរការជានិច្ច — ទោះជា try ជោគជ័យ ឬ catch ចាប់ Error ក៏ដោយ
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 3. Custom Error / throw Diagram ─────────────────────────────────────────
export function ThrowCustomErrorDiagram() {
  const [age, setAge] = useState(20);
  const [ran, setRan] = useState(false);

  function run() { setRan(true); }
  function reset() { setRan(false); }

  type Path = "negative" | "underage" | "ok";
  const path: Path =
    age < 0 ? "negative" :
    age < 18 ? "underage" : "ok";

  const throwActive   = ran && path === "negative";
  const catchActive   = ran && path === "negative";
  const youngActive   = ran && path === "underage";
  const okActive      = ran && path === "ok";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="throw — Custom Error" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">

          {/* Age slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-900 dark:text-gray-100">checkAge(age)</span>
              <span className="font-bold text-lg px-3 py-1 rounded-xl"
                style={{
                  background: path === "negative" ? "#ef444422" : path === "underage" ? "#f9731622" : "#22c55e22",
                  color:      path === "negative" ? "#ef4444"   : path === "underage" ? "#f97316"   : "#22c55e",
                }}>
                age = {age}
              </span>
            </div>
            <input
              type="range" min={-5} max={30} value={age}
              onChange={(e) => { setAge(+e.target.value); setRan(false); }}
              className="w-full h-2 rounded-full cursor-pointer"
              style={{ accentColor: path === "negative" ? "#ef4444" : path === "underage" ? "#f97316" : "#22c55e" }}
            />
            <div className="flex justify-between text-[10px] text-gray-900 dark:text-gray-100 font-mono">
              <span>-5</span><span className="text-red-400">0</span><span className="text-orange-400">18</span><span>30</span>
            </div>
          </div>

          {/* Path indicator — shows which branch will run BEFORE hitting Run */}
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
            {[
              { label: "age < 0", sublabel: "throw Error", active: path === "negative", color: "red" },
              { label: "age < 18", sublabel: "ក្មេងពេក", active: path === "underage", color: "orange" },
              { label: "age ≥ 18", sublabel: "ស្វាគមន៍!", active: path === "ok", color: "green" },
            ].map((p) => (
              <div key={p.label} className={`rounded-lg py-2 px-1 border-2 transition-all ${
                p.active
                  ? p.color === "red"    ? "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300 scale-105"
                  : p.color === "orange" ? "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-300 scale-105"
                  :                        "border-green-400 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-300 scale-105"
                  : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 opacity-50"
              }`}>
                <div className="font-mono">{p.label}</div>
                <div className="opacity-75 mt-0.5">{p.sublabel}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {/* try */}
            <div className={`rounded-xl border-2 p-3 transition-all duration-200 ${ran && !catchActive ? "border-blue-400 bg-blue-400/10" : "border-gray-700"}`}>
              <div className="text-[10px] uppercase font-bold text-blue-400 mb-1.5">try {"{"}</div>
              <div className="bg-gray-900 rounded-lg p-2.5 space-y-1 text-xs font-mono">
                <div className="text-gray-300">if (age &lt; 0) {"{"}</div>
                <div className={`pl-4 transition-all duration-200 ${throwActive ? "text-red-400 font-bold" : "text-gray-500"}`}>
                  throw new Error("អាយុមិនអាចជាលេខអវិជ្ជមានបានទេ!");
                </div>
                <div className="text-gray-300">{"}"}</div>
                <div className={`transition-all duration-200 ${youngActive ? "text-orange-400 font-bold" : "text-gray-500"}`}>
                  if (age &lt; 18) console.log("អ្នកនៅក្មេងពេក។");
                </div>
                <div className={`transition-all duration-200 ${okActive ? "text-green-400 font-bold" : "text-gray-500"}`}>
                  else console.log("ស្វាគមន៍មកកាន់ប្រព័ន្ធ!");
                </div>
              </div>
            </div>

            {/* catch */}
            <div className={`rounded-xl border-2 p-3 transition-all duration-200 ${catchActive ? "border-red-400 bg-red-400/10" : throwActive ? "border-red-400 bg-red-400/10" : "border-gray-700 opacity-40"}`}>
              <div className="text-[10px] uppercase font-bold text-red-400 mb-1.5">catch (error) {"{"}</div>
              <div className="bg-gray-900 rounded-lg p-2.5 text-xs font-mono">
                <div className={`transition-colors duration-200 ${catchActive ? "text-red-300" : "text-gray-500"}`}>
                  console.error("មានកំហុស:", error.message);
                </div>
              </div>
            </div>
          </div>

          {/* Output */}
          {ran && (
            <div className={`rounded-xl px-4 py-3 text-xs font-mono border ${
              path === "negative"
                ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                : path === "underage"
                  ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"
                  : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
            }`}>
              <div className="text-[10px] uppercase font-bold mb-1 opacity-60">Console Output</div>
              {path === "negative" && <div>❌ មានកំហុសផ្នែកទិន្នន័យ: អាយុមិនអាចជាលេខអវិជ្ជមានបានទេ!</div>}
              {path === "underage" && <div>🟠 អ្នកនៅក្មេងពេក។</div>}
              {path === "ok"       && <div>✅ ស្វាគមន៍មកកាន់ប្រព័ន្ធ!</div>}
            </div>
          )}

          {/* Run / Reset */}
          <div className="flex justify-center gap-3">
            {!ran ? (
              <button onClick={run}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all"
                style={{ background: path === "negative" ? "#ef4444" : path === "underage" ? "#f97316" : "#22c55e" }}>
                ▶ checkAge({age})
              </button>
            ) : (
              <button onClick={reset}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-600">
                ↺ Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
