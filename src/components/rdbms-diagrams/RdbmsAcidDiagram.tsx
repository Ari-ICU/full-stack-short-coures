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

export function RdbmsAcidDiagram() {
  const [step, setStep] = useState(0); // 0=init, 1=deduct, 2=crash/success, 3=rollback/commit
  const [isSuccess, setIsSuccess] = useState(true);

  // Initial State
  const initialA = 500;
  const initialB = 200;
  const amount = 100;

  const handleStart = (success: boolean) => {
    setIsSuccess(success);
    setStep(1); // Deduct from A
    
    setTimeout(() => {
      setStep(2); // Attempt add to B
      
      setTimeout(() => {
        setStep(3); // Result (Commit or Rollback)
      }, 1500);
      
    }, 1500);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-3xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Transactions & Atomicity (Bank Transfer)" badge="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" />
        
        <div className="p-8">
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => handleStart(true)}
              disabled={step !== 0}
              className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow disabled:opacity-50 hover:bg-green-600 transition-colors"
            >
              Simulate Success
            </button>
            <button 
              onClick={() => handleStart(false)}
              disabled={step !== 0}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow disabled:opacity-50 hover:bg-red-600 transition-colors"
            >
              Simulate Crash
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Reset
            </button>
          </div>

          <div className="relative">
            
            {/* Status Banner */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-64 text-center z-20">
              {step === 0 && <span className="bg-gray-800 text-white px-3 py-1 text-xs rounded-full shadow">Idle</span>}
              {step === 1 && <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full shadow animate-pulse">BEGIN TRANSACTION...</span>}
              {step === 2 && isSuccess && <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full shadow animate-pulse">Processing...</span>}
              {step === 2 && !isSuccess && <span className="bg-red-600 text-white px-3 py-1 text-xs rounded-full shadow animate-bounce">⚡ SYSTEM CRASH ⚡</span>}
              {step === 3 && isSuccess && <span className="bg-green-600 text-white px-3 py-1 text-xs rounded-full shadow">✅ COMMIT (Saved)</span>}
              {step === 3 && !isSuccess && <span className="bg-orange-600 text-white px-3 py-1 text-xs rounded-full shadow">⏪ ROLLBACK (Reverted)</span>}
            </div>

            <div className={`p-6 border-2 rounded-xl grid grid-cols-2 gap-8 items-center relative transition-colors duration-500
              ${step === 0 ? "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50" : ""}
              ${step === 1 || (step === 2 && isSuccess) ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/10" : ""}
              ${step === 2 && !isSuccess ? "border-red-500 bg-red-50 dark:bg-red-900/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : ""}
              ${step === 3 && isSuccess ? "border-green-500 bg-green-50/50 dark:bg-green-900/10" : ""}
              ${step === 3 && !isSuccess ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/10" : ""}
            `}>
              
              {/* Account A */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Account A</div>
                <div className="text-3xl font-black tabular-nums transition-all duration-500 text-gray-800 dark:text-white">
                  ${step === 0 ? initialA : step === 3 && !isSuccess ? initialA : initialA - amount}
                </div>
                
                {step >= 1 && (
                  <div className={`text-xs font-bold mt-2 ${step === 3 && !isSuccess ? "text-orange-500 line-through" : "text-red-500"}`}>
                    - ${amount}
                  </div>
                )}
              </div>

              {/* Account B */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Account B</div>
                <div className="text-3xl font-black tabular-nums transition-all duration-500 text-gray-800 dark:text-white">
                  ${step < 2 ? initialB : step === 2 && !isSuccess ? initialB : step === 3 && !isSuccess ? initialB : initialB + amount}
                </div>
                
                {step >= 2 && (
                  <div className={`text-xs font-bold mt-2 ${step === 3 && !isSuccess || (step === 2 && !isSuccess) ? "text-orange-500 line-through" : "text-green-500"}`}>
                    + ${amount}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="mt-8 bg-[#1e1e1e] p-4 rounded-xl border border-gray-700 font-mono text-[11px] h-[160px] relative overflow-hidden">
            
            <div className={`transition-opacity duration-300 ${step >= 1 ? "opacity-100" : "opacity-30"}`}>
              <div className="text-blue-400">BEGIN;</div>
              <div className="text-gray-300">UPDATE accounts SET balance = balance - 100 WHERE id = &apos;A&apos;;</div>
            </div>

            <div className={`mt-2 transition-opacity duration-300 ${step >= 2 ? "opacity-100" : "opacity-30"}`}>
              {step === 2 && !isSuccess ? (
                <div className="text-red-500 font-bold">{"-- SERVER CRASH (Power outage, constraint violation) --"}</div>
              ) : (
                <div className="text-gray-300">UPDATE accounts SET balance = balance + 100 WHERE id = &apos;B&apos;;</div>
              )}
            </div>

            <div className={`mt-2 transition-opacity duration-300 ${step >= 3 ? "opacity-100" : "opacity-30"}`}>
              {step === 3 && isSuccess ? (
                <div className="text-green-400 font-bold">COMMIT;</div>
              ) : step === 3 && !isSuccess ? (
                <div className="text-orange-400 font-bold">ROLLBACK;</div>
              ) : null}
            </div>

          </div>

          <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <strong>Atomicity (All or Nothing):</strong> If the system crashes after deducting from A but before adding to B, the database automatically reverts (ROLLBACK) to ensure money isn&apos;t lost.
          </div>

        </div>
      </div>
    </div>
  );
}
