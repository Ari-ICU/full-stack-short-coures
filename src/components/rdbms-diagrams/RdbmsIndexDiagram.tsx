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

export function RdbmsIndexDiagram() {
  const [isRunning, setIsRunning] = useState(false);
  const [scanStep, setScanStep] = useState(-1);
  const [treeStep, setTreeStep] = useState(-1);

  const targetId = 78;
  const tableData = [10, 23, 35, 42, 55, 61, 78, 89, 94];

  const handleSearch = () => {
    setIsRunning(true);
    setScanStep(0);
    setTreeStep(0);

    // Full Table Scan (Slow, linear)
    let sStep = 0;
    const scanInterval = setInterval(() => {
      sStep++;
      if (sStep <= 6) { // Index of 78 is 6
        setScanStep(sStep);
      }
      if (sStep === 6) clearInterval(scanInterval);
    }, 400);

    // B-Tree Search (Fast, logarithmic)
    let tStep = 0;
    const treeInterval = setInterval(() => {
      tStep++;
      if (tStep <= 2) { // Found in 2 jumps (Root -> Right Child -> Right Leaf)
        setTreeStep(tStep);
      }
      if (tStep === 2) {
        clearInterval(treeInterval);
        setTimeout(() => setIsRunning(false), 2000);
      }
    }, 600);
  };

  const handleReset = () => {
    setScanStep(-1);
    setTreeStep(-1);
    setIsRunning(false);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-5xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Database Indexing (B-Tree vs Seq Scan)" badge="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" />
        
        <div className="p-6">
          
          <div className="flex justify-between items-center mb-8 bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl">
            <div className="font-mono text-sm bg-gray-800 text-teal-300 px-4 py-2 rounded shadow-inner">
              SELECT * FROM users WHERE id = <span className="text-white font-bold">{targetId}</span>;
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSearch}
                disabled={isRunning || scanStep === 6}
                className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg shadow disabled:opacity-50 hover:bg-teal-600 transition-colors"
              >
                Execute Query
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Without Index */}
            <div className="border-2 border-red-200 dark:border-red-900/30 rounded-xl p-4 relative bg-red-50/30 dark:bg-red-900/10">
              <div className="text-center font-bold text-red-600 dark:text-red-400 mb-4">Without Index (Full Table Scan)</div>
              
              <div className="flex flex-col gap-2">
                {tableData.map((val, idx) => (
                  <div key={idx} className={`flex items-center gap-4 p-2 rounded border transition-colors duration-300
                    ${scanStep === idx && val !== targetId ? "border-red-400 bg-red-100 dark:bg-red-900/40 shadow-[0_0_10px_rgba(248,113,113,0.5)]" : ""}
                    ${scanStep >= idx && val === targetId ? "border-green-500 bg-green-100 dark:bg-green-900/40 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : ""}
                    ${scanStep > idx && val !== targetId ? "border-gray-200 dark:border-gray-700 opacity-50" : ""}
                    ${scanStep < idx ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" : ""}
                  `}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold
                      ${scanStep >= idx && val === targetId ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}
                    `}>
                      {val}
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600" />
                    </div>
                    {scanStep === idx && val !== targetId && <div className="text-xs text-red-500 font-bold">Checking... No</div>}
                    {scanStep >= idx && val === targetId && <div className="text-xs text-green-600 font-bold">Found! (7 steps)</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* With Index */}
            <div className="border-2 border-teal-200 dark:border-teal-900/30 rounded-xl p-4 relative bg-teal-50/30 dark:bg-teal-900/10">
              <div className="text-center font-bold text-teal-700 dark:text-teal-400 mb-4">With B-Tree Index (Index Scan)</div>
              
              <div className="flex flex-col items-center justify-center h-full gap-8 py-8 relative">
                
                {/* SVG Connections */}
                <svg className="absolute top-1/4 left-0 w-full h-1/2 -z-10" preserveAspectRatio="none">
                  {/* Root to Left */}
                  <path d="M 50% 10 L 25% 90" stroke={treeStep >= 1 ? "#374151" : "#9ca3af"} strokeWidth="2" fill="none" className={treeStep >= 1 ? "opacity-30" : "opacity-100"} />
                  {/* Root to Right */}
                  <path d="M 50% 10 L 75% 90" stroke={treeStep >= 1 ? "#14b8a6" : "#9ca3af"} strokeWidth={treeStep >= 1 ? "4" : "2"} fill="none" className={treeStep >= 1 ? "shadow-[0_0_10px_rgba(20,184,166,0.5)]" : ""} />
                </svg>

                {/* Level 0: Root */}
                <div className={`p-3 border-2 rounded-lg font-mono font-bold text-sm z-10 transition-colors
                  ${treeStep === 0 ? "border-teal-500 bg-teal-100 dark:bg-teal-900/50 shadow-[0_0_15px_rgba(20,184,166,0.5)]" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"}
                  ${treeStep > 0 ? "border-teal-500 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400" : ""}
                `}>
                  [ 55 ]
                  {treeStep === 0 && <div className="absolute -right-24 text-[10px] text-teal-600 font-bold animate-pulse whitespace-nowrap">78 &gt; 55 (Go Right)</div>}
                </div>

                {/* Level 1: Children */}
                <div className="flex w-full justify-around z-10 mt-8">
                  <div className={`p-3 border-2 rounded-lg font-mono font-bold text-sm transition-opacity
                    ${treeStep >= 1 ? "opacity-30 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-400" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"}
                  `}>
                    [ 23, 35 ]
                  </div>
                  
                  <div className="relative">
                    <div className={`p-3 border-2 rounded-lg font-mono font-bold text-sm transition-colors
                      ${treeStep === 1 ? "border-teal-500 bg-teal-100 dark:bg-teal-900/50 shadow-[0_0_15px_rgba(20,184,166,0.5)]" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"}
                      ${treeStep > 1 ? "border-teal-500 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400" : ""}
                    `}>
                      [ 78, 89 ]
                    </div>
                    {treeStep === 1 && <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[10px] text-teal-600 font-bold animate-pulse whitespace-nowrap">Found 78!</div>}
                  </div>
                </div>

                {/* Data Block Match */}
                {treeStep === 2 && (
                  <div className="mt-8 animate-in slide-in-from-top-4 fade-in duration-300 z-10">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                      <span>Row Data Pointer</span>
                      <span className="text-xs bg-green-700 px-2 py-0.5 rounded">O(log n) - 2 steps!</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
