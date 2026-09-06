"use client";

import { useState, useEffect, useRef } from "react";

function PanelHeader({ label, badge }: { label: string; badge: string }) {
  return (
    <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <code className={`text-xs font-bold px-2 py-0.5 rounded ${badge}`}>{label}</code>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Interactive useEffect Lifecycle Simulator
      </span>
    </div>
  );
}

type Mode = "no-deps" | "empty-deps" | "with-deps";

interface LogEntry {
  id: number;
  time: string;
  source: "render" | "effect" | "skip";
  message: string;
}

export function ReactUseEffectDiagram() {
  const [mode, setMode] = useState<Mode>("with-deps");
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("Ratha");
  const [renderCount, setRenderCount] = useState<number>(1);
  const [effectRunCount, setEffectRunCount] = useState<number>(1);
  const [isEffectActive, setIsEffectActive] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      time: "Initial",
      source: "effect",
      message: "Mount: Effect បានរត់ជាលើកដំបូង (Initial Render)",
    },
  ]);

  const prevCountRef = useRef<number>(count);
  const prevModeRef = useRef<Mode>(mode);

  // When mode changes, reset counts for clarity
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    prevModeRef.current = newMode;
    setCount(0);
    prevCountRef.current = 0;
    setText("Ratha");
    setRenderCount(1);
    setEffectRunCount(1);
    setLogs([
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString().split(" ")[0],
        source: "effect",
        message: `ប្តូរ Mode ទៅ: ${
          newMode === "no-deps"
            ? "គ្មាន Dependency (រត់រាល់ Render)"
            : newMode === "empty-deps"
            ? "Dependency ទទេ [] (រត់តែម្តងពេល Mount)"
            : "Dependency [count] (រត់តែពេល count ប្តូរ)"
        }`,
      },
    ]);
  };

  const triggerAction = (type: "count" | "text") => {
    const newRender = renderCount + 1;
    setRenderCount(newRender);

    let willEffectRun = false;
    let reason = "";

    if (type === "count") {
      const nextCount = count + 1;
      setCount(nextCount);

      if (mode === "no-deps") {
        willEffectRun = true;
        reason = "Effect បានរត់ព្រោះ Component Re-render (គ្មាន Dependency Array)";
      } else if (mode === "empty-deps") {
        willEffectRun = false;
        reason = "Effect ត្រូវបានរំលង ព្រោះ Dependency Array ទទេ [] (រត់តែម្តងគត់ពេល Mount)";
      } else if (mode === "with-deps") {
        willEffectRun = true;
        reason = `Effect បានរត់ព្រោះ count បានផ្លាស់ប្តូរ (${count} ➔ ${nextCount})`;
      }
    } else {
      const nextText = text === "Ratha" ? "Sokha" : "Ratha";
      setText(nextText);

      if (mode === "no-deps") {
        willEffectRun = true;
        reason = "Effect បានរត់ព្រោះ Component Re-render (គ្មាន Dependency Array)";
      } else if (mode === "empty-deps") {
        willEffectRun = false;
        reason = "Effect ត្រូវបានរំលង ព្រោះ Dependency Array ទទេ []";
      } else if (mode === "with-deps") {
        willEffectRun = false;
        reason = `Effect ត្រូវបានរំលង ព្រោះ count មិនបានផ្លាស់ប្តូរទេ (នៅស្មើ ${count} ដដែល)`;
      }
    }

    const timeStr = new Date().toLocaleTimeString().split(" ")[0];

    if (willEffectRun) {
      setEffectRunCount((prev) => prev + 1);
      setIsEffectActive(true);
      setTimeout(() => setIsEffectActive(false), 900);
      setLogs((prev) => [
        ...prev.slice(-4),
        {
          id: Date.now(),
          time: timeStr,
          source: "effect",
          message: `⚡ ${reason}`,
        },
      ]);
    } else {
      setLogs((prev) => [
        ...prev.slice(-4),
        {
          id: Date.now(),
          time: timeStr,
          source: "skip",
          message: `⏭️ ${reason}`,
        },
      ]);
    }
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-lg">
        <PanelHeader
          label="The useEffect Execution Lifecycle"
          badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
        />

        {/* Mode Selector Tabs */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            ជ្រើសរើសទម្រង់ Dependency Array នៃ useEffect:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleModeChange("no-deps")}
              className={`p-2.5 rounded-xl text-left border transition ${
                mode === "no-deps"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 shadow-sm"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="font-mono text-xs font-bold">1. គ្មាន [] (No Array)</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                រត់ឡើងវិញ <strong>រាល់ពេល Render</strong>
              </div>
            </button>

            <button
              onClick={() => handleModeChange("empty-deps")}
              className={`p-2.5 rounded-xl text-left border transition ${
                mode === "empty-deps"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 shadow-sm"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="font-mono text-xs font-bold">2. ទទេ [] (Empty Array)</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                រត់ <strong>តែ ១ ដងគត់</strong> ពេល Mount
              </div>
            </button>

            <button
              onClick={() => handleModeChange("with-deps")}
              className={`p-2.5 rounded-xl text-left border transition ${
                mode === "with-deps"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 shadow-sm"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="font-mono text-xs font-bold">3. មាន [count] (With Deps)</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                រត់ <strong>តែពេល count ប្តូរ</strong>
              </div>
            </button>
          </div>
        </div>

        {/* Interactive Controls & 3-Step Pipeline */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Triggers and Component State (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-gray-50/80 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                🎮 សាកល្បង Trigger State Changes:
              </h4>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => triggerAction("count")}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-between"
                >
                  <span>ប្តូរ Count State (+1)</span>
                  <span className="bg-blue-800 px-2 py-0.5 rounded font-mono text-xs">
                    count: {count}
                  </span>
                </button>

                <button
                  onClick={() => triggerAction("text")}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-between"
                >
                  <span>ប្តូរ Text State (Re-render)</span>
                  <span className="bg-indigo-800 px-2 py-0.5 rounded font-mono text-xs">
                    text: &quot;{text}&quot;
                  </span>
                </button>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <div className="text-[10px] text-gray-500 uppercase font-bold">
                    Re-render Count
                  </div>
                  <div className="text-2xl font-black text-gray-800 dark:text-white tabular-nums">
                    {renderCount}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isEffectActive
                      ? "bg-purple-500/20 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="text-[10px] text-purple-600 dark:text-purple-400 uppercase font-bold">
                    Effect Run Count
                  </div>
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400 tabular-nums">
                    {effectRunCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Rule Callout */}
            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs text-gray-700 dark:text-gray-300">
              <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">
                💡 ចំណាំសំខាន់:
              </span>
              {mode === "no-deps" && (
                <p className="text-[11px] leading-relaxed">
                  <strong>គ្មាន Dependency Array:</strong> ទោះជាអ្នកចុចប្តូរ <code>count</code> ឬ <code>text</code> ក៏ដោយ ក៏ Effect នឹងត្រូវ Run គ្រប់ដងទាំងអស់ ព្រោះ Component បាន Re-render។
                </p>
              )}
              {mode === "empty-deps" && (
                <p className="text-[11px] leading-relaxed">
                  <strong>Dependency Array ទទេ <code>[]</code>:</strong> ទោះបី Re-render ប៉ុន្មានដង ក៏ Effect មិន Run ទៀតឡើយ។ វា Run តែមួយដងគត់ពេល Component ទើបបង្ហាញដំបូង (Mount)។
                </p>
              )}
              {mode === "with-deps" && (
                <p className="text-[11px] leading-relaxed">
                  <strong>មាន Dependency <code>[count]</code>:</strong> ពេលអ្នកប្តូរ <code>count</code> ➔ Effect នឹង Run។ ប៉ុន្តែពេលអ្នកប្តូរ <code>text</code> ➔ Effect <strong>មិន Run ទេ</strong> ព្រោះ <code>count</code> មិនបានប្រែប្រួល!
                </p>
              )}
            </div>
          </div>

          {/* Right Column: 3-Step Execution Pipeline + Live Code (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Visual 3-Step Timeline */}
            <div className="bg-gray-50/80 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-between">
                <span>🔄 ដំណាក់កាលដំណើរការ (React Timeline):</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                {/* Step 1: Render */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold inline-flex items-center justify-center text-[10px] mb-1">
                    1
                  </span>
                  <div className="font-bold text-gray-800 dark:text-white">Render Phase</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">គណនា JSX</div>
                </div>

                {/* Step 2: Paint */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold inline-flex items-center justify-center text-[10px] mb-1">
                    2
                  </span>
                  <div className="font-bold text-gray-800 dark:text-white">Paint UI</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Browser បង្ហាញ UI</div>
                </div>

                {/* Step 3: useEffect */}
                <div
                  className={`p-2.5 rounded-lg border transition-all ${
                    isEffectActive
                      ? "bg-purple-500 text-white border-purple-400 font-bold shadow-md animate-pulse"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full font-bold inline-flex items-center justify-center text-[10px] mb-1 ${
                      isEffectActive ? "bg-white text-purple-700" : "bg-purple-500 text-white"
                    }`}
                  >
                    3
                  </span>
                  <div className="font-bold">Run useEffect</div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      isEffectActive ? "text-purple-100" : "text-gray-500"
                    }`}
                  >
                    Side Effects
                  </div>
                </div>
              </div>
            </div>

            {/* Live Code Mirror */}
            <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 p-4 font-mono text-xs text-gray-200 shadow-md">
              <div className="text-gray-500 mb-2">{"// កូដដែលកំពុងដំណើរការក្នុង Mode នេះ:"}</div>
              <div className="text-purple-400">
                useEffect<span className="text-gray-300">(() =&gt; {"{"}</span>
              </div>
              <div
                className={`pl-4 py-1 transition-colors rounded ${
                  isEffectActive
                    ? "bg-purple-500/30 text-purple-200 font-bold"
                    : "text-gray-400"
                }`}
              >
                <span className="text-blue-300">document.title</span> ={" "}
                <span className="text-green-300">`(${count}) សារថ្មី`</span>;
              </div>

              {/* Dependency line */}
              <div className="text-gray-300">
                {"}"}
                {mode === "no-deps" && (
                  <span className="text-amber-400 font-bold">
                    ); <span className="text-gray-500">{"// ⚠️ គ្មាន Array (រត់រាល់ Render)"}</span>
                  </span>
                )}
                {mode === "empty-deps" && (
                  <span className="text-blue-400 font-bold">
                    , []); <span className="text-gray-500">{"// ✅ [] ទទេ (រត់តែម្តងពេល Mount)"}</span>
                  </span>
                )}
                {mode === "with-deps" && (
                  <span className="text-emerald-400 font-bold">
                    , [count]); <span className="text-gray-500">{"// ✅ រត់តែពេល count ប្តូរ"}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Chronological Action Logs */}
            <div className="bg-gray-100 dark:bg-gray-800/80 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                📋 កំណត់ហេតុដំណើរការ (Execution Logs):
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-1.5 rounded flex items-center justify-between gap-2 ${
                      log.source === "effect"
                        ? "bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                        : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <span className="truncate">{log.message}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
