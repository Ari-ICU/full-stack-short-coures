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

export function ReactContextDiagram() {
  const [mode, setMode] = useState<"props" | "context">("props");
  const [isPassing, setIsPassing] = useState(false);
  
  // Animation states for prop drilling (sequential)
  const [activeLevel, setActiveLevel] = useState(-1);

  const handlePass = () => {
    setIsPassing(true);
    
    if (mode === "props") {
      // Sequential animation for prop drilling
      setActiveLevel(0);
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setActiveLevel(step);
        if (step > 3) {
          clearInterval(interval);
          setTimeout(() => setIsPassing(false), 1000);
        }
      }, 500);
    } else {
      // Instant teleportation for context
      setActiveLevel(4); // Immediately to the end
      setTimeout(() => {
        setIsPassing(false);
        setActiveLevel(-1);
      }, 2000);
    }
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Prop Drilling vs Context API" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        
        <div className="p-6">
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => { setMode("props"); setActiveLevel(-1); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${mode === "props" ? "border-red-500 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 shadow-sm" : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"}`}
            >
              Prop Drilling
            </button>
            <button 
              onClick={() => { setMode("context"); setActiveLevel(-1); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${mode === "context" ? "border-purple-500 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 shadow-sm" : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"}`}
            >
              Context API
            </button>
          </div>

          <div className="relative max-w-md mx-auto">
            
            {/* The Teleportation Beam for Context */}
            {mode === "context" && isPassing && (
              <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[360px] bg-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.8)] z-0 top-[20px] animate-pulse" />
            )}

            <div className="flex flex-col gap-6 relative z-10">
              
              {/* Level 0: App */}
              <div className={`p-4 rounded-xl border-2 flex justify-between items-center bg-white dark:bg-gray-800 ${activeLevel === 0 ? "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "border-gray-300 dark:border-gray-600"}`}>
                <div className="font-bold text-gray-800 dark:text-gray-200">App (Provider)</div>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">theme=&quot;dark&quot;</span>
                  <button onClick={handlePass} disabled={isPassing} className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 disabled:opacity-50">Send Data</button>
                </div>
              </div>

              {/* Level 1 */}
              <div className={`p-3 rounded-xl border-2 mx-4 flex justify-between items-center bg-white dark:bg-gray-800 ${activeLevel === 1 ? "border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" : "border-gray-200 dark:border-gray-700"}`}>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Layout</div>
                {mode === "props" && activeLevel >= 1 && <span className="text-[10px] text-red-500">passing prop...</span>}
              </div>

              {/* Level 2 */}
              <div className={`p-3 rounded-xl border-2 mx-8 flex justify-between items-center bg-white dark:bg-gray-800 ${activeLevel === 2 ? "border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" : "border-gray-200 dark:border-gray-700"}`}>
                <div className="font-semibold text-gray-700 dark:text-gray-300">MainContent</div>
                {mode === "props" && activeLevel >= 2 && <span className="text-[10px] text-red-500">passing prop...</span>}
              </div>

              {/* Level 3 */}
              <div className={`p-3 rounded-xl border-2 mx-12 flex justify-between items-center bg-white dark:bg-gray-800 ${activeLevel === 3 ? "border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" : "border-gray-200 dark:border-gray-700"}`}>
                <div className="font-semibold text-gray-700 dark:text-gray-300">SettingsPanel</div>
                {mode === "props" && activeLevel >= 3 && <span className="text-[10px] text-red-500">passing prop...</span>}
              </div>

              {/* Level 4: The Consumer */}
              <div className={`p-5 rounded-xl border-4 mx-16 flex justify-between items-center bg-white dark:bg-gray-800 transition-all ${activeLevel >= 4 || (mode === "context" && activeLevel === 4) ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-105" : "border-gray-300 dark:border-gray-600"}`}>
                <div className="font-bold text-gray-800 dark:text-gray-200">ThemeButton</div>
                {activeLevel >= 4 || (mode === "context" && activeLevel === 4) ? (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded font-bold animate-in zoom-in">Received: &quot;dark&quot;</span>
                ) : (
                  <span className="text-xs text-gray-400 italic">Waiting...</span>
                )}
              </div>

            </div>
          </div>

          <div className="mt-10 text-center max-w-xl mx-auto">
            {mode === "props" ? (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <strong>Prop Drilling:</strong> You have to pass the data manually through every single intermediate component, even if they don&apos;t need it. This makes the code messy and hard to maintain.
              </p>
            ) : (
              <p className="text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <strong>Context API:</strong> You &quot;teleport&quot; the data directly from the Provider (App) to the Consumer (ThemeButton). Intermediate components are completely unaware and unaffected!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
