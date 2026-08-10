"use client";

import { useState } from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────────
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

type FileState = "working" | "staged" | "committed";

export function GitArchitectureDiagram() {
  const [files, setFiles] = useState<{ id: string; name: string; state: FileState }[]>([
    { id: "1", name: "index.html", state: "working" },
    { id: "2", name: "style.css", state: "working" },
    { id: "3", name: "app.js", state: "working" },
  ]);
  const [commitLog, setCommitLog] = useState<{ id: string; msg: string; count: number }[]>([]);

  const workingFiles = files.filter(f => f.state === "working");
  const stagedFiles = files.filter(f => f.state === "staged");
  const committedFiles = files.filter(f => f.state === "committed");

  const handleAddAll = () => {
    setFiles(prev => prev.map(f => f.state === "working" ? { ...f, state: "staged" } : f));
  };

  const handleAddSingle = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, state: "staged" } : f));
  };

  const handleCommit = () => {
    if (stagedFiles.length === 0) return;
    setCommitLog(prev => [...prev, { id: Math.random().toString(36).slice(2, 9), msg: "Update files", count: stagedFiles.length }]);
    setFiles(prev => prev.map(f => f.state === "staged" ? { ...f, state: "committed" } : f));
  };

  const handleModify = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, state: "working" } : f));
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Git Architecture (The Three Trees)" badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" />
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Working Directory */}
          <div className="flex flex-col h-[400px]">
            <div className="text-center mb-4">
              <div className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Working Directory</div>
              <div className="text-[11px] text-gray-500">Files on your disk</div>
            </div>
            <div className="flex-1 rounded-xl border-2 border-dashed border-red-300 dark:border-red-700/50 bg-red-50 dark:bg-red-950/20 p-4 flex flex-col gap-2 overflow-y-auto">
              {workingFiles.length === 0 && <div className="text-xs text-gray-400 italic text-center mt-4">Empty</div>}
              {workingFiles.map(f => (
                <div key={f.id} className="group relative flex items-center justify-between bg-white dark:bg-gray-800 border-l-4 border-red-400 p-3 rounded-lg shadow-sm animate-in fade-in slide-in-from-left-4 duration-300">
                  <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">📄 {f.name}</span>
                  <button onClick={() => handleAddSingle(f.id)} className="text-[10px] px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity">Add</button>
                </div>
              ))}
            </div>
            <button onClick={handleAddAll} disabled={workingFiles.length === 0} className="mt-4 w-full py-2 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              <span>git add .</span>
              <span>→</span>
            </button>
          </div>

          {/* Staging Area */}
          <div className="flex flex-col h-[400px]">
            <div className="text-center mb-4">
              <div className="text-sm font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Staging Area (Index)</div>
              <div className="text-[11px] text-gray-500">Preparing for commit</div>
            </div>
            <div className="flex-1 rounded-xl border-2 border-dashed border-yellow-300 dark:border-yellow-700/50 bg-yellow-50 dark:bg-yellow-950/20 p-4 flex flex-col gap-2 overflow-y-auto">
              {stagedFiles.length === 0 && <div className="text-xs text-gray-400 italic text-center mt-4">Empty</div>}
              {stagedFiles.map(f => (
                <div key={f.id} className="flex items-center justify-between bg-white dark:bg-gray-800 border-l-4 border-yellow-400 p-3 rounded-lg shadow-sm animate-in zoom-in duration-300">
                  <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">📄 {f.name}</span>
                  <span className="text-[10px] text-yellow-600 dark:text-yellow-400">staged</span>
                </div>
              ))}
            </div>
            <button onClick={handleCommit} disabled={stagedFiles.length === 0} className="mt-4 w-full py-2 rounded-lg text-xs font-bold text-white bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              <span>git commit</span>
              <span>→</span>
            </button>
          </div>

          {/* Repository */}
          <div className="flex flex-col h-[400px]">
            <div className="text-center mb-4">
              <div className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">Local Repository</div>
              <div className="text-[11px] text-gray-500">Committed history (.git)</div>
            </div>
            <div className="flex-1 rounded-xl border-2 border-solid border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4 flex flex-col gap-3 overflow-y-auto">
              
              <div className="space-y-3">
                {commitLog.slice().reverse().map((commit) => (
                  <div key={commit.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-green-200 dark:border-green-800 animate-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">{commit.id}</span>
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-bold">+{commit.count} files</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">&quot;{commit.msg}&quot;</div>
                  </div>
                ))}
              </div>

              {committedFiles.length > 0 && (
                <div className="mt-auto pt-4 border-t border-green-200 dark:border-green-800">
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-2">Tracked Files</div>
                  <div className="flex flex-wrap gap-1.5">
                    {committedFiles.map(f => (
                      <button key={f.id} onClick={() => handleModify(f.id)} className="text-[10px] font-mono px-2 py-1 rounded bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 hover:border-red-400 hover:text-red-500 transition-colors" title="Click to modify">
                        {f.name}
                      </button>
                    ))}
                  </div>
                  <div className="text-[9px] text-gray-400 mt-2 text-center">Click a file to modify it</div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
