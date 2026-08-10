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

export function ReactStateDiagram() {
  const [count, setCount] = useState(0);
  const [isRendering, setIsRendering] = useState(false);

  const handleIncrement = () => {
    // Phase 1: Set State
    setCount(prev => prev + 1);
    
    // Phase 2: Trigger Re-render animation
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
    }, 800);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="State & Re-rendering" badge="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" />
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Component UI */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">User Interface</div>
            
            <div className={`p-8 rounded-2xl border-4 transition-all duration-300 flex flex-col items-center gap-6 ${isRendering ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] bg-yellow-50 dark:bg-yellow-900/20 scale-105" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"}`}>
              
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Current Count</div>
                <div className="text-5xl font-black text-gray-800 dark:text-white tabular-nums">{count}</div>
              </div>

              <button 
                onClick={handleIncrement}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all flex gap-2 items-center"
              >
                <span>Add +1</span>
              </button>

              {isRendering && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[10px] font-bold animate-pulse">
                  <span className="animate-spin">⚙️</span> Re-rendering...
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-center text-gray-500 max-w-xs">
              Clicking the button updates <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">state</code>, which tells React to rebuild (re-render) this specific box to show the new data.
            </div>
          </div>

          {/* Code Execution Flow */}
          <div className="bg-[#1e1e1e] rounded-xl border border-gray-700 p-6 font-mono text-sm shadow-xl relative overflow-hidden">
            
            <div className={`transition-opacity duration-300 ${isRendering ? "opacity-100" : "opacity-30"}`}>
              <div className="text-blue-400">function <span className="text-yellow-300">Counter</span>() {'{'}</div>
              
              <div className="pl-4 mt-2 mb-4 border-l-2 border-gray-600">
                <span className="text-gray-500">{"// 1. React reads current state"}</span><br/>
                <span className="text-purple-400">const</span> [count, setCount] = <span className="text-blue-300">useState</span>(<span className="text-green-400">{count}</span>);
              </div>

              <div className="pl-4 mb-4 border-l-2 border-gray-600">
                <span className="text-gray-500">{"// 2. React rebuilds the UI with new state"}</span><br/>
                <span className="text-purple-400">return</span> (<br/>
                <span className="pl-4 text-gray-300">&lt;<span className="text-red-400">div</span>&gt;</span><br/>
                <span className="pl-8 text-white">{count}</span><br/>
                <span className="pl-4 text-gray-300">&lt;/<span className="text-red-400">div</span>&gt;</span><br/>
                );
              </div>

              <div>{'}'}</div>
            </div>

            {/* Scanning Laser Effect during re-render */}
            {isRendering && (
              <div className="absolute left-0 right-0 h-1 bg-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.8)] z-10 animate-scan pointer-events-none" style={{ top: 0 }} />
            )}
            
          </div>

        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan {
            animation: scan 0.8s ease-in-out forwards;
          }
        `}} />
      </div>
    </div>
  );
}
