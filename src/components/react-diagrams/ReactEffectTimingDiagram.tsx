"use client";

import { useState } from "react";

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
        Render vs Paint vs Effect Execution Timing
      </span>
    </div>
  );
}

export function ReactEffectTimingDiagram() {
  const [count, setCount] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [tabTitle, setTabTitle] = useState<string>("ទំព័រដើម");
  const [logs, setLogs] = useState<string[]>([
    "ត្រៀមរួចរាល់៖ ចុចប៊ូតុងខាងក្រោមដើម្បីមើលដំណើរការ Render ➔ Paint ➔ Effect មួយជំហានម្តងៗ",
  ]);

  const handleTrigger = () => {
    if (isRunning) return;
    setIsRunning(true);
    const nextCount = count + 1;
    setCount(nextCount);
    setActiveStep(1);
    setLogs([`⚡ ជំហានទី ១ (Render Phase): React ហៅ Component គណនា JSX ជាមួយ count = ${nextCount}`]);

    // Step 2: Paint
    setTimeout(() => {
      setActiveStep(2);
      setLogs((prev) => [
        `🖼️ ជំហានទី ២ (Paint Phase): Browser គូរ UI លើអេក្រង់ ➔ User ឃើញលេខ ${nextCount} ភ្លាមៗ (មិនកកស្ទះ screen)!`,
        ...prev,
      ]);

      // Step 3: Run Effect
      setTimeout(() => {
        setActiveStep(3);
        setTabTitle(`(${nextCount}) សារថ្មី`);
        setLogs((prev) => [
          `⚡ ជំហានទី ៣ (Effect Phase): useEffect Callback រត់ក្រោយគេបង្អស់ ➔ កែប្រែ document.title = "(${nextCount}) សារថ្មី"!`,
          ...prev,
        ]);

        setTimeout(() => {
          setIsRunning(false);
        }, 600);
      }, 700);
    }, 700);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-lg">
        <PanelHeader
          label="The useEffect Execution Pipeline"
          badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
        />

        {/* Mock Browser Tab Header */}
        <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Browser Tab Title:</span>
            <div
              className={`px-3 py-1 rounded-t-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeStep === 3
                  ? "bg-blue-600 text-white shadow-md animate-pulse"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>🌐</span>
              <span>{tabTitle}</span>
            </div>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">
            {activeStep === 3 ? "Effect updated document.title!" : "Waiting for Effect..."}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Component (5 cols) */}
          <div className="lg:col-span-5 bg-gray-50/80 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              ⚛️ React Component Screen
            </h4>

            {/* Simulated UI Box */}
            <div
              className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                activeStep === 2
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              }`}
            >
              <span className="text-xs text-gray-500 font-medium">ចំនួនសារ (State):</span>
              <div className="text-5xl font-black text-gray-800 dark:text-white tabular-nums">
                {count}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeStep === 2
                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                {activeStep === 2 ? "✨ UI បាន Paint រួចរាល់!" : "UI Display"}
              </span>
            </div>

            <button
              onClick={handleTrigger}
              disabled={isRunning}
              className="mt-4 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>កំពុងដំណើរការលំហូរ...</span>
                </>
              ) : (
                <span>ចុចដើម្បីផ្ញើសារថ្មី (+1)</span>
              )}
            </button>
          </div>

          {/* Right: 3-Step Step Flow & Logs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Step Indicators */}
            <div className="space-y-2.5">
              {/* Step 1 */}
              <div
                className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  activeStep === 1
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-70"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                    activeStep === 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 dark:text-white">
                    Render Phase (គណនា JSX)
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    React ហៅ Component Function ដើម្បីដឹងថាតើ UI គួរមានរូបរាងបែបណា
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  activeStep === 2
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-md"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-70"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                    activeStep === 2 ? "bg-emerald-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 dark:text-white">
                    Paint Phase (គូរលើអេក្រង់)
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    Browser បង្ហាញ UI ជូន User ឃើញភ្លាមៗ — អេក្រង់មិនកកស្ទះឡើយ!
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  activeStep === 3
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 shadow-md"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-70"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                    activeStep === 3 ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 dark:text-white">
                    Effect Phase (រត់ Side Effect)
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    ក្រោយ User ឃើញ UI ទើប React មកដំណើរការកូដក្នុង useEffect (កែប្រែ Title)
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Logs */}
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-xs space-y-1 shadow-inner">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                📋 លំដាប់ដំណើរការ (Live Timeline Logs):
              </div>
              {logs.slice(0, 3).map((log, i) => (
                <div key={i} className="text-[11px] text-emerald-400">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
