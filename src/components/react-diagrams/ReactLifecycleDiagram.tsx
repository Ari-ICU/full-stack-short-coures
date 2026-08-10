"use client";

import { useState, useEffect } from "react";

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

export function ReactLifecycleDiagram() {
  const [isMounted, setIsMounted] = useState(false);
  const [logs, setLogs] = useState<{msg: string, type: "mount" | "unmount" | "render"}[]>([]);
  const [count, setCount] = useState(0);

  const addLog = (msg: string, type: "mount" | "unmount" | "render") => {
    setLogs(prev => [...prev.slice(-4), { msg, type }]); // Keep last 5 logs
  };

  // Simulate the child component's lifecycle behavior
  useEffect(() => {
    if (isMounted) {
      addLog("Component Mounted! (useEffect callback)", "mount");
      return () => {
        addLog("Component Unmounted! (Cleanup function)", "unmount");
      };
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && count > 0) {
      addLog(`Component Updated (Count: ${count})`, "render");
    }
  }, [count, isMounted]);

  const handleToggleMount = () => {
    if (!isMounted) setCount(0); // Reset count when mounting
    setIsMounted(!isMounted);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Component Lifecycle (useEffect)" badge="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" />
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls & UI */}
          <div className="flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">App.jsx</span>
                <button 
                  onClick={handleToggleMount}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-colors ${isMounted ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                >
                  {isMounted ? "Unmount Component" : "Mount Component"}
                </button>
              </div>
              
              <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                {isMounted ? (
                  <div className="text-center animate-in zoom-in duration-300 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-300 rounded-xl">
                    <div className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">TimerComponent</div>
                    <div className="text-2xl font-black text-indigo-900 dark:text-white mb-2">{count}</div>
                    <button 
                      onClick={() => setCount(c => c + 1)}
                      className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold rounded hover:bg-indigo-600 transition-colors"
                    >
                      Update State
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm italic">Component is completely destroyed</div>
                )}
              </div>
            </div>

            {/* Timeline Graphic */}
            <div className="flex justify-between items-end h-24 px-4 relative mt-auto">
              {/* Connecting line */}
              <div className="absolute top-[30px] left-8 right-8 h-1 bg-gray-200 dark:bg-gray-700 -z-10" />
              
              <div className={`flex flex-col items-center transition-opacity ${isMounted ? "opacity-100" : "opacity-30"}`}>
                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-900 shadow mb-2" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Mount</span>
              </div>
              
              <div className={`flex flex-col items-center transition-opacity ${isMounted && count > 0 ? "opacity-100" : "opacity-30"}`}>
                <div className="w-6 h-6 rounded-full bg-yellow-400 border-4 border-white dark:border-gray-900 shadow mb-2" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Update</span>
              </div>
              
              <div className={`flex flex-col items-center transition-opacity ${!isMounted && logs.some(l => l.type === "unmount") ? "opacity-100" : "opacity-30"}`}>
                <div className="w-6 h-6 rounded-full bg-red-500 border-4 border-white dark:border-gray-900 shadow mb-2" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">Unmount</span>
              </div>
            </div>
          </div>

          {/* Console / Code */}
          <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-700">
            <div className="px-4 py-2 bg-[#2d2d2d] flex items-center justify-between border-b border-gray-700">
              <span className="text-xs font-mono text-gray-300">Terminal Output</span>
              <button onClick={() => setLogs([])} className="text-[10px] text-gray-500 hover:text-gray-300">Clear</button>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-end overflow-hidden font-mono text-[11px] leading-relaxed">
              <div className="space-y-2">
                {logs.length === 0 && <div className="text-gray-500 italic">No activity yet. Click 'Mount Component'.</div>}
                {logs.map((log, i) => (
                  <div key={i} className="animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <span className="text-gray-500 mr-2">{">"}</span>
                    <span className={
                      log.type === "mount" ? "text-green-400 font-bold" :
                      log.type === "unmount" ? "text-red-400 font-bold" :
                      "text-yellow-300"
                    }>{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="px-4 py-3 bg-[#2d2d2d] border-t border-gray-700 text-xs text-gray-400">
              <span className="text-purple-400">useEffect</span> runs <i>after</i> the render is committed to the screen.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
