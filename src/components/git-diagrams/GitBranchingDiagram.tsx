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

type Commit = {
  id: string;
  branch: "main" | "feature";
  msg: string;
  x: number;
};

export function GitBranchingDiagram() {
  const [commits, setCommits] = useState<Commit[]>([
    { id: "a1b2", branch: "main", msg: "Initial commit", x: 0 },
    { id: "c3d4", branch: "main", msg: "Add index.html", x: 1 },
  ]);
  
  const [activeBranch, setActiveBranch] = useState<"main" | "feature">("main");
  const [hasFeature, setHasFeature] = useState(false);

  const mainCommits = commits.filter(c => c.branch === "main");
  const featureCommits = commits.filter(c => c.branch === "feature");
  
  const maxMainX = Math.max(0, ...mainCommits.map(c => c.x));
  const maxFeatX = featureCommits.length > 0 ? Math.max(...featureCommits.map(c => c.x)) : 1; // branches off from c3d4 (x=1)

  const handleCommit = () => {
    const newX = activeBranch === "main" ? maxMainX + 1 : Math.max(maxFeatX + 1, maxMainX + 1); // feature branch moves forward relative to itself or main
    const id = Math.random().toString(36).slice(2, 6);
    setCommits([...commits, { id, branch: activeBranch, msg: `Update ${activeBranch}`, x: newX }]);
  };

  const handleCreateBranch = () => {
    setHasFeature(true);
    setActiveBranch("feature");
  };

  const handleCheckout = (branch: "main" | "feature") => {
    setActiveBranch(branch);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-3xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Git Branching" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        
        <div className="p-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-10 items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 items-center">
              <span className="text-xs font-bold text-gray-500 uppercase">Current Branch:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCheckout("main")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${activeBranch === "main" ? "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  main
                </button>
                {hasFeature && (
                  <button 
                    onClick={() => handleCheckout("feature")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${activeBranch === "feature" ? "border-purple-500 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" : "border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  >
                    feature
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {!hasFeature && (
                <button onClick={handleCreateBranch} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  git branch feature
                </button>
              )}
              <button onClick={handleCommit} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                git commit
              </button>
            </div>
          </div>

          {/* Diagram Area */}
          <div className="relative h-48 w-full overflow-x-auto overflow-y-hidden flex items-center">
            <div className="relative w-max min-w-full h-full px-8">
              
              {/* Main branch line */}
              <div className="absolute top-[120px] left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900/50" />
              
              {/* Feature branch line */}
              {hasFeature && (
                <>
                  <div className="absolute top-[60px] left-[150px] right-0 h-1 bg-purple-200 dark:bg-purple-900/50" />
                  {/* Diagonal connector */}
                  <svg className="absolute top-[60px] left-[70px] w-[80px] h-[60px]" preserveAspectRatio="none">
                    <path d="M 0 60 C 40 60, 40 0, 80 0" fill="none" stroke="currentColor" strokeWidth="4" className="text-purple-200 dark:text-purple-900/50" />
                  </svg>
                </>
              )}

              {/* Commits */}
              {commits.map(c => {
                const isMain = c.branch === "main";
                const yPos = isMain ? 120 : 60;
                const xPos = c.x * 80 + 30; // base spacing
                const colorClass = isMain ? "border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "border-purple-500 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
                
                return (
                  <div key={c.id} className="absolute flex flex-col items-center animate-in zoom-in duration-300" style={{ left: xPos, top: yPos - 12, width: 24, transform: 'translateX(-50%)' }}>
                    <div className="text-[9px] font-mono mb-1 text-gray-500 whitespace-nowrap absolute -top-5">{c.id}</div>
                    <div className={`w-6 h-6 rounded-full border-4 z-10 ${colorClass}`} />
                  </div>
                );
              })}

              {/* HEAD pointers */}
              <div className="absolute flex items-center gap-1 transition-all duration-300" style={{ left: maxMainX * 80 + 30, top: 140, transform: 'translateX(-50%)' }}>
                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">main</div>
                {activeBranch === "main" && <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-800 text-white">HEAD</div>}
              </div>

              {hasFeature && (
                <div className="absolute flex items-center gap-1 transition-all duration-300" style={{ left: maxFeatX * 80 + 30, top: 80, transform: 'translateX(-50%)' }}>
                  <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200">feature</div>
                  {activeBranch === "feature" && <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-800 text-white">HEAD</div>}
                </div>
              )}

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
