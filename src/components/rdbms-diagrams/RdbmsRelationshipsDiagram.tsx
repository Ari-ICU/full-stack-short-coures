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

export function RdbmsRelationshipsDiagram() {
  const [rel, setRel] = useState<"1:1" | "1:N" | "N:M">("1:N");

  const buttonClass = (target: string) => `
    px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all flex-1
    ${rel === target 
      ? "bg-purple-500 border-purple-600 text-white shadow-inner" 
      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}
  `;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Database Relationships" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        
        <div className="p-6">
          
          <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-xl">
            <button onClick={() => setRel("1:1")} className={buttonClass("1:1")}>One-to-One (1:1)</button>
            <button onClick={() => setRel("1:N")} className={buttonClass("1:N")}>One-to-Many (1:N)</button>
            <button onClick={() => setRel("N:M")} className={buttonClass("N:M")}>Many-to-Many (N:M)</button>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 min-h-[250px] relative">
            
            {/* TABLE A */}
            <div className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm z-10">
              <div className="bg-blue-500 text-white font-bold text-center py-1.5 rounded-t-lg text-sm">
                {rel === "1:1" ? "Users" : rel === "1:N" ? "Departments" : "Students"}
              </div>
              <div className="p-2 text-xs divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                <div className="py-1 flex justify-between">
                  <span className="font-bold text-blue-600 dark:text-blue-400">id (PK)</span>
                  <span className="text-gray-400">INT</span>
                </div>
                <div className="py-1 flex justify-between">
                  <span>name</span>
                  <span className="text-gray-400">VARCHAR</span>
                </div>
              </div>
            </div>

            {/* RELATIONSHIP ARROWS & JUNCTION */}
            <div className="flex-1 flex justify-center items-center relative w-full h-24 md:h-auto">
              
              {rel === "1:1" && (
                <div className="flex items-center w-full relative animate-in fade-in duration-300">
                  <div className="h-0.5 bg-gray-400 w-full relative">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-xs font-bold text-gray-500 bg-white dark:bg-gray-900 px-2">has one</div>
                </div>
              )}

              {rel === "1:N" && (
                <div className="flex items-center w-full relative animate-in fade-in duration-300">
                  <div className="h-0.5 bg-gray-400 w-full relative">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    
                    {/* Crow's foot */}
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4">
                      <svg viewBox="0 0 10 10" className="w-full h-full stroke-gray-400 fill-none" strokeWidth="1">
                        <path d="M0,5 L10,5 M0,5 L10,0 M0,5 L10,10" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-xs font-bold text-gray-500 bg-white dark:bg-gray-900 px-2">has many</div>
                </div>
              )}

              {rel === "N:M" && (
                <div className="flex items-center justify-between w-full relative animate-in zoom-in duration-500">
                  {/* Left arrow to junction */}
                  <div className="h-0.5 bg-gray-400 w-1/4 relative">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4">
                      <svg viewBox="0 0 10 10" className="w-full h-full stroke-gray-400 fill-none" strokeWidth="2">
                        <path d="M0,5 L10,5 M0,5 L10,0 M0,5 L10,10" />
                      </svg>
                    </div>
                  </div>

                  {/* Junction Table */}
                  <div className="w-40 bg-gray-50 dark:bg-gray-800 border-2 border-green-400 dark:border-green-600 rounded-lg shadow-md z-20">
                    <div className="bg-green-500 text-white font-bold text-center py-1.5 rounded-t-sm text-[11px] uppercase tracking-wide">
                      Junction Table
                    </div>
                    <div className="p-2 text-[10px] divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                      <div className="py-1 flex justify-between">
                        <span className="font-bold text-blue-600 dark:text-blue-400">student_id (FK)</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="font-bold text-purple-600 dark:text-purple-400">course_id (FK)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right arrow to junction */}
                  <div className="h-0.5 bg-gray-400 w-1/4 relative">
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400" />
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 rotate-180">
                      <svg viewBox="0 0 10 10" className="w-full h-full stroke-gray-400 fill-none" strokeWidth="2">
                        <path d="M0,5 L10,5 M0,5 L10,0 M0,5 L10,10" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* TABLE B */}
            <div className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm z-10">
              <div className="bg-purple-500 text-white font-bold text-center py-1.5 rounded-t-lg text-sm">
                {rel === "1:1" ? "Profiles" : rel === "1:N" ? "Employees" : "Courses"}
              </div>
              <div className="p-2 text-xs divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                <div className="py-1 flex justify-between">
                  <span className="font-bold text-purple-600 dark:text-purple-400">id (PK)</span>
                  <span className="text-gray-400">INT</span>
                </div>
                {rel === "1:1" && (
                  <div className="py-1 flex justify-between bg-yellow-50 dark:bg-yellow-900/20 px-1 rounded">
                    <span className="font-bold text-blue-600 dark:text-blue-400">user_id (FK, UNIQUE)</span>
                  </div>
                )}
                {rel === "1:N" && (
                  <div className="py-1 flex justify-between bg-yellow-50 dark:bg-yellow-900/20 px-1 rounded">
                    <span className="font-bold text-blue-600 dark:text-blue-400">dept_id (FK)</span>
                  </div>
                )}
                <div className="py-1 flex justify-between">
                  <span>title</span>
                  <span className="text-gray-400">VARCHAR</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Rule of Thumb:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {rel === "1:1" && "Place the Foreign Key (FK) in the dependent table (e.g. Profiles) and make it UNIQUE so it can only link to one User."}
              {rel === "1:N" && "Place the Foreign Key (FK) on the 'Many' side (Employees). One department can have many employees, but each employee has only one department."}
              {rel === "N:M" && "A Many-to-Many relationship REQUIRES a third table (Junction/Pivot table) containing Foreign Keys to both tables."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
