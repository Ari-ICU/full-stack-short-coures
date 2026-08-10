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

export function RdbmsJoinsDiagram() {
  const [joinType, setJoinType] = useState<"INNER" | "LEFT" | "RIGHT" | "FULL">("INNER");

  const buttonClass = (target: string) => `
    px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all flex-1
    ${joinType === target 
      ? "bg-green-500 border-green-600 text-white shadow-inner" 
      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}
  `;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-5xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="SQL Joins Visualizer" badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        
        <div className="p-6">
          
          {/* Controls */}
          <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-xl">
            <button onClick={() => setJoinType("INNER")} className={buttonClass("INNER")}>INNER JOIN</button>
            <button onClick={() => setJoinType("LEFT")} className={buttonClass("LEFT")}>LEFT JOIN</button>
            <button onClick={() => setJoinType("RIGHT")} className={buttonClass("RIGHT")}>RIGHT JOIN</button>
            <button onClick={() => setJoinType("FULL")} className={buttonClass("FULL")}>FULL OUTER JOIN</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Input Tables */}
            <div className="flex flex-col gap-6">
              
              <div>
                <div className="flex justify-between items-end mb-1">
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300">Table A: Users</div>
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                </div>
                <table className="w-full text-xs text-left border border-blue-300 dark:border-blue-800 rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    <tr><th className="px-2 py-1.5 border-r border-blue-200 dark:border-blue-800">id</th><th className="px-2 py-1.5">name</th></tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    <tr><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-blue-600">1</td><td className="px-2 py-1.5">Sokha</td></tr>
                    <tr><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-blue-600">2</td><td className="px-2 py-1.5">Dara</td></tr>
                    <tr><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-blue-600">3</td><td className="px-2 py-1.5">Bopha</td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300">Table B: Orders</div>
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2" />
                </div>
                <table className="w-full text-xs text-left border border-orange-300 dark:border-orange-800 rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                    <tr><th className="px-2 py-1.5 border-r border-orange-200 dark:border-orange-800">id</th><th className="px-2 py-1.5 border-r border-orange-200 dark:border-orange-800">user_id</th><th className="px-2 py-1.5">item</th></tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                    <tr><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono">101</td><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-orange-600">1</td><td className="px-2 py-1.5">Laptop</td></tr>
                    <tr><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono">102</td><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-orange-600">3</td><td className="px-2 py-1.5">Mouse</td></tr>
                    <tr><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono">103</td><td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-orange-600">9</td><td className="px-2 py-1.5">Keyboard</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Venn Diagram */}
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <div className="relative w-48 h-32 flex items-center justify-center">
                
                {/* Left Circle (Table A) */}
                <div className={`absolute left-0 w-28 h-28 rounded-full border-4 flex items-center justify-start pl-4 transition-colors duration-500 z-10 mix-blend-multiply dark:mix-blend-screen
                  ${["LEFT", "FULL"].includes(joinType) ? "bg-blue-400/50 border-blue-500" : "border-blue-300 dark:border-blue-700 bg-transparent"}`}>
                  <span className={`text-xs font-bold ${["LEFT", "FULL"].includes(joinType) ? "text-blue-900 dark:text-blue-100" : "text-blue-400"}`}>A</span>
                </div>
                
                {/* Right Circle (Table B) */}
                <div className={`absolute right-0 w-28 h-28 rounded-full border-4 flex items-center justify-end pr-4 transition-colors duration-500 z-10 mix-blend-multiply dark:mix-blend-screen
                  ${["RIGHT", "FULL"].includes(joinType) ? "bg-orange-400/50 border-orange-500" : "border-orange-300 dark:border-orange-700 bg-transparent"}`}>
                  <span className={`text-xs font-bold ${["RIGHT", "FULL"].includes(joinType) ? "text-orange-900 dark:text-orange-100" : "text-orange-400"}`}>B</span>
                </div>
                
                {/* Intersection (A ∩ B) */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-24 rounded-[100%] border-0 transition-colors duration-500 z-20 flex items-center justify-center"
                     style={{ backgroundColor: "rgba(34, 197, 94, 0.6)" }}>
                   <span className="text-[10px] font-bold text-green-900 dark:text-green-100">A∩B</span>
                </div>

              </div>
              
              <div className="mt-6 bg-[#1e1e1e] p-3 rounded-lg border border-gray-700 w-full font-mono text-[11px]">
                <div className="text-blue-400">SELECT <span className="text-white">*</span></div>
                <div className="text-blue-400">FROM <span className="text-gray-300">Users A</span></div>
                <div className="text-purple-400">{joinType} JOIN <span className="text-gray-300">Orders B</span></div>
                <div className="text-blue-400">ON <span className="text-gray-300">A.id = B.user_id;</span></div>
              </div>
            </div>

            {/* Result Table */}
            <div>
              <div className="flex justify-between items-end mb-1">
                <div className="text-sm font-bold text-gray-700 dark:text-gray-300">Result</div>
              </div>
              <div className="border border-green-400 dark:border-green-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-900">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    <tr>
                      <th className="px-2 py-1.5 border-r border-green-200 dark:border-green-800">A.id</th>
                      <th className="px-2 py-1.5 border-r border-green-200 dark:border-green-800">name</th>
                      <th className="px-2 py-1.5 border-r border-green-200 dark:border-green-800">B.id</th>
                      <th className="px-2 py-1.5 border-r border-green-200 dark:border-green-800">user_id</th>
                      <th className="px-2 py-1.5">item</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    
                    {/* Intersection (Match) */}
                    <tr className="bg-green-50/50 dark:bg-green-900/10">
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-blue-600">1</td>
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800">Sokha</td>
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono">101</td>
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-orange-600">1</td>
                      <td className="px-2 py-1.5">Laptop</td>
                    </tr>
                    <tr className="bg-green-50/50 dark:bg-green-900/10">
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-blue-600">3</td>
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800">Bopha</td>
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono">102</td>
                      <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-orange-600">3</td>
                      <td className="px-2 py-1.5">Mouse</td>
                    </tr>

                    {/* Left Only */}
                    {["LEFT", "FULL"].includes(joinType) && (
                      <tr className="bg-blue-50/50 dark:bg-blue-900/10 text-gray-500 dark:text-gray-400">
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-blue-600">2</td>
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800">Dara</td>
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 text-red-400 italic">NULL</td>
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 text-red-400 italic">NULL</td>
                        <td className="px-2 py-1.5 text-red-400 italic">NULL</td>
                      </tr>
                    )}

                    {/* Right Only */}
                    {["RIGHT", "FULL"].includes(joinType) && (
                      <tr className="bg-orange-50/50 dark:bg-orange-900/10 text-gray-500 dark:text-gray-400">
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 text-red-400 italic">NULL</td>
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 text-red-400 italic">NULL</td>
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono">103</td>
                        <td className="px-2 py-1.5 border-r border-gray-100 dark:border-gray-800 font-mono text-orange-600">9</td>
                        <td className="px-2 py-1.5">Keyboard</td>
                      </tr>
                    )}
                    
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
