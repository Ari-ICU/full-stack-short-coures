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
  msg: string;
  inLocal: boolean;
  inRemote: boolean;
};

export function GitRemoteDiagram() {
  const [commits, setCommits] = useState<Commit[]>([
    { id: "a1b2", msg: "Initial commit", inLocal: true, inRemote: true },
    { id: "c3d4", msg: "Add index.html", inLocal: true, inRemote: true },
  ]);
  
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const localOnlyCount = commits.filter(c => c.inLocal && !c.inRemote).length;
  const remoteOnlyCount = commits.filter(c => c.inRemote && !c.inLocal).length;

  const handleLocalCommit = () => {
    const id = Math.random().toString(36).slice(2, 6);
    setCommits(prev => [...prev, { id, msg: "Update local files", inLocal: true, inRemote: false }]);
  };

  const handleRemoteCommit = () => {
    const id = Math.random().toString(36).slice(2, 6);
    setCommits(prev => [...prev, { id, msg: "Merge pull request", inLocal: false, inRemote: true }]);
  };

  const handlePush = () => {
    if (localOnlyCount === 0) return;
    setIsPushing(true);
    setTimeout(() => {
      setCommits(prev => prev.map(c => c.inLocal ? { ...c, inRemote: true } : c));
      setIsPushing(false);
    }, 1000);
  };

  const handlePull = () => {
    if (remoteOnlyCount === 0) return;
    setIsPulling(true);
    setTimeout(() => {
      setCommits(prev => prev.map(c => c.inRemote ? { ...c, inLocal: true } : c));
      setIsPulling(false);
    }, 1000);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Local vs Remote Workflow" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          {/* Local Repo */}
          <div className="flex flex-col h-[400px]">
            <div className="text-center mb-4">
              <div className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">💻 Local Repository</div>
              <div className="text-[11px] text-gray-500">Your Computer</div>
            </div>
            
            <div className="flex-1 rounded-xl border-2 border-solid border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4 flex flex-col gap-3 overflow-y-auto">
              <button onClick={handleLocalCommit} className="w-full py-2 mb-2 rounded-lg text-xs font-bold border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                + Create Local Commit
              </button>
              
              <div className="space-y-2 flex flex-col-reverse">
                {commits.map((c) => (
                  <div key={c.id} className={`p-3 rounded-lg border flex items-center justify-between transition-all duration-300 ${c.inLocal ? "bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 shadow-sm" : "opacity-0 h-0 p-0 m-0 overflow-hidden"}`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-gray-500 mb-0.5">{c.id}</span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{c.msg}</span>
                    </div>
                    {!c.inRemote && <span className="text-[9px] uppercase font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/40 px-1.5 py-0.5 rounded">Unpushed</span>}
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={handlePush} disabled={localOnlyCount === 0 || isPushing || isPulling} className="mt-4 w-full py-2 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-all">
              {isPushing ? "Pushing..." : `git push (${localOnlyCount} to send)`}
            </button>
          </div>

          {/* Connectors / Animation Area */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none hidden md:flex">
             {isPushing && <div className="text-2xl animate-bounce">➡️</div>}
             {isPulling && <div className="text-2xl animate-bounce" style={{ animationDirection: "reverse" }}>⬅️</div>}
          </div>

          {/* Remote Repo */}
          <div className="flex flex-col h-[400px]">
            <div className="text-center mb-4">
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">☁️ Remote Repository</div>
              <div className="text-[11px] text-gray-500">GitHub / GitLab</div>
            </div>
            
            <div className="flex-1 rounded-xl border-2 border-solid border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-4 flex flex-col gap-3 overflow-y-auto">
              <button onClick={handleRemoteCommit} className="w-full py-2 mb-2 rounded-lg text-xs font-bold border-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                + Simulate Teammate Commit
              </button>
              
              <div className="space-y-2 flex flex-col-reverse">
                {commits.map((c) => (
                  <div key={c.id} className={`p-3 rounded-lg border flex items-center justify-between transition-all duration-300 ${c.inRemote ? "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 shadow-sm" : "opacity-0 h-0 p-0 m-0 overflow-hidden"}`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-gray-500 mb-0.5">{c.id}</span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{c.msg}</span>
                    </div>
                    {!c.inLocal && <span className="text-[9px] uppercase font-bold text-purple-500 bg-purple-100 dark:bg-purple-900/40 px-1.5 py-0.5 rounded">Unpulled</span>}
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={handlePull} disabled={remoteOnlyCount === 0 || isPulling || isPushing} className="mt-4 w-full py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all">
              {isPulling ? "Pulling..." : `git pull (${remoteOnlyCount} to fetch)`}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
