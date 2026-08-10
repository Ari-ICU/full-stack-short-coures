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

export function RdbmsNormalizationDiagram() {
  const [nf, setNf] = useState<0 | 1 | 2 | 3>(0);

  const buttonClass = (target: number) => `
    px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all flex-1
    ${nf >= target 
      ? "bg-blue-500 border-blue-600 text-white shadow-inner" 
      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}
  `;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-5xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Database Normalization (1NF -> 3NF)" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        
        <div className="p-6">
          
          <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-xl">
            <button onClick={() => setNf(0)} className={buttonClass(0)}>UNF (Unnormalized)</button>
            <button onClick={() => setNf(1)} className={buttonClass(1)}>1NF</button>
            <button onClick={() => setNf(2)} className={buttonClass(2)}>2NF</button>
            <button onClick={() => setNf(3)} className={buttonClass(3)}>3NF</button>
          </div>

          <div className="min-h-[400px] flex flex-col gap-6 relative">
            
            {/* UNF / 1NF view */}
            {nf < 2 && (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Orders Table</div>
                <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
                  <table className="w-full text-xs text-left whitespace-nowrap">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
                      <tr>
                        <th className="px-3 py-2 border-r border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400">OrderID (PK)</th>
                        <th className="px-3 py-2 border-r border-gray-300 dark:border-gray-700">Date</th>
                        <th className="px-3 py-2 border-r border-gray-300 dark:border-gray-700 text-purple-600 dark:text-purple-400">CustomerID</th>
                        <th className="px-3 py-2 border-r border-gray-300 dark:border-gray-700">CustomerName</th>
                        <th className="px-3 py-2 border-r border-gray-300 dark:border-gray-700">CustomerPhone</th>
                        <th className="px-3 py-2">Items</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                      {nf === 0 ? (
                        <>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700 font-mono font-bold text-blue-600">101</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">2024-01-01</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700 font-mono text-purple-600">C1</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">Sokha</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">012-345</td>
                            <td className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">Laptop, Mouse</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700 font-mono font-bold text-blue-600">101</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">2024-01-01</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700 font-mono text-purple-600">C1</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">Sokha</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">012-345</td>
                            <td className="px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-mono">Laptop (I1)</td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700 font-mono font-bold text-blue-600">101</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">2024-01-01</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700 font-mono text-purple-600">C1</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">Sokha</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">012-345</td>
                            <td className="px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-mono">Mouse (I2)</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2NF / 3NF split views */}
            {nf >= 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-8 duration-500">
                
                {/* Orders / Order Details (2NF fixed partial dependency) */}
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Orders Table</div>
                    <div className="border border-blue-300 dark:border-blue-800 rounded-lg overflow-hidden shadow-sm">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 uppercase">
                          <tr>
                            <th className="px-3 py-2 border-r border-blue-200 dark:border-blue-800">OrderID (PK)</th>
                            <th className="px-3 py-2 border-r border-blue-200 dark:border-blue-800">Date</th>
                            <th className="px-3 py-2 text-purple-600 dark:text-purple-400">CustomerID {nf === 3 ? "(FK)" : ""}</th>
                            {nf === 2 && <th className="px-3 py-2 border-l border-blue-200 dark:border-blue-800 text-red-500">CustomerName</th>}
                            {nf === 2 && <th className="px-3 py-2 text-red-500">CustomerPhone</th>}
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900">
                          <tr>
                            <td className="px-3 py-2 font-mono font-bold text-blue-600">101</td>
                            <td className="px-3 py-2 border-x border-gray-200 dark:border-gray-800">2024-01-01</td>
                            <td className="px-3 py-2 font-mono text-purple-600">C1</td>
                            {nf === 2 && <td className="px-3 py-2 border-l border-gray-200 dark:border-gray-800 text-gray-500">Sokha</td>}
                            {nf === 2 && <td className="px-3 py-2 text-gray-500">012-345</td>}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Order_Items (Junction)</div>
                    <div className="border border-green-300 dark:border-green-800 rounded-lg overflow-hidden shadow-sm">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 uppercase">
                          <tr>
                            <th className="px-3 py-2 border-r border-green-200 dark:border-green-800">OrderID (FK)</th>
                            <th className="px-3 py-2">ItemID (FK)</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900">
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-800 font-mono">101</td>
                            <td className="px-3 py-2 font-mono">I1</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-800 font-mono">101</td>
                            <td className="px-3 py-2 font-mono">I2</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 3NF Split (Customers table) */}
                {nf === 3 && (
                  <div className="animate-in zoom-in-90 fade-in duration-500">
                    <div className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      Customers Table 
                      <span className="text-[10px] bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 px-1.5 py-0.5 rounded">New!</span>
                    </div>
                    <div className="border border-purple-300 dark:border-purple-800 rounded-lg overflow-hidden shadow-sm">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 uppercase">
                          <tr>
                            <th className="px-3 py-2 border-r border-purple-200 dark:border-purple-800">CustomerID (PK)</th>
                            <th className="px-3 py-2 border-r border-purple-200 dark:border-purple-800">CustomerName</th>
                            <th className="px-3 py-2">CustomerPhone</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900">
                          <tr>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-800 font-mono font-bold text-purple-600">C1</td>
                            <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-800">Sokha</td>
                            <td className="px-3 py-2">012-345</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
              </div>
            )}

          </div>

          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Explanation:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {nf === 0 && "UNF (Unnormalized): Data contains repeating groups or comma-separated lists in a single column (e.g., Items)."}
              {nf === 1 && "1NF (First Normal Form): Eliminate repeating groups. Ensure each column holds atomic (single) values. Now Order 101 takes up two rows."}
              {nf === 2 && "2NF (Second Normal Form): Eliminate partial dependencies. Move the Many-to-Many 'Items' out into a Junction table. However, Customer details still depend on CustomerID, not OrderID!"}
              {nf === 3 && "3NF (Third Normal Form): Eliminate transitive dependencies. Move Customer details into their own Customers table. Orders table now only references CustomerID (Foreign Key)."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
