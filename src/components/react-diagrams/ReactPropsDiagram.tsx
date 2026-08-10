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

export function ReactPropsDiagram() {
  const [parentData, setParentData] = useState("Sokha");
  const [isPassing, setIsPassing] = useState(false);
  const [childData, setChildData] = useState("");

  const handlePassProp = () => {
    setIsPassing(true);
    setTimeout(() => {
      setChildData(parentData);
      setIsPassing(false);
    }, 1000);
  };

  const handleReset = () => {
    setChildData("");
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-3xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Props (One-Way Data Flow)" badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        
        <div className="p-8">
          
          <div className="flex flex-col items-center max-w-md mx-auto">
            
            {/* Parent Component */}
            <div className="w-full bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-400 rounded-xl p-4 shadow-sm relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-blue-800 dark:text-blue-300">ParentComponent</span>
                <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Data Owner</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Data:</span>
                <input 
                  type="text" 
                  value={parentData} 
                  onChange={(e) => setParentData(e.target.value)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm w-32 text-center"
                />
              </div>

              <div className="text-center">
                <button 
                  onClick={handlePassProp}
                  disabled={isPassing || parentData === ""}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Pass as Prop ↓
                </button>
              </div>
            </div>

            {/* Connection Flow */}
            <div className="h-24 w-1 bg-gray-200 dark:bg-gray-700 relative -my-1 z-0">
              {isPassing && (
                <div className="absolute w-6 h-6 -left-2.5 bg-green-500 rounded-full shadow-lg flex items-center justify-center animate-bounce z-20" style={{ animationDuration: "1s", animationIterationCount: "1", animationName: "slideDown" }}>
                  <span className="text-[10px] text-white">📦</span>
                </div>
              )}
            </div>

            {/* Child Component */}
            <div className="w-full bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-400 rounded-xl p-4 shadow-sm relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-purple-800 dark:text-purple-300">ChildComponent</span>
                <span className="text-xs bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Data Receiver</span>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-between min-h-[50px]">
                <span className="text-sm text-gray-600 dark:text-gray-400">Received Prop:</span>
                {childData ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold rounded shadow-sm border border-green-300 animate-in zoom-in">
                    &quot;{childData}&quot;
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 italic">Waiting...</span>
                )}
              </div>
            </div>

          </div>

          {/* Reset Action */}
          <div className="text-center mt-8">
            <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-700 underline">Reset Diagram</button>
          </div>

        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideDown {
            0% { top: 0; opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
}
