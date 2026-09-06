"use client";

import { useState } from "react";

function PanelHeader({ label, badge }: { label: string; badge: string }) {
  return (
    <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <code className={`text-xs font-bold px-2 py-0.5 rounded ${badge}`}>{label}</code>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Derived State vs useEffect Comparison
      </span>
    </div>
  );
}

export function ReactPitfallsDiagram() {
  const [firstName, setFirstName] = useState("Sok");
  const [lastName, setLastName] = useState("Dara");
  const [badRenderCount, setBadRenderCount] = useState(1);
  const [goodRenderCount, setGoodRenderCount] = useState(1);
  const [selectedExample, setSelectedExample] = useState<"derived" | "action">("derived");

  // For User Action Example
  const [actionLog, setActionLog] = useState<string>("ចុចប៊ូតុងដើម្បីមើលភាពខុសគ្នា");

  const handleNameChange = (first: string, last: string) => {
    setFirstName(first);
    setLastName(last);
    // Bad approach causes 2 renders (Render 1 with input, Render 2 after effect setFullName)
    setBadRenderCount((prev) => prev + 2);
    // Good approach causes only 1 render
    setGoodRenderCount((prev) => prev + 1);
  };

  const handleActionTest = (type: "bad" | "good") => {
    if (type === "bad") {
      setActionLog("❌ របៀបខុស: onClick ➔ setIsBought(true) ➔ Re-render ➔ useEffect ឃើញ isBought ➔ ទើបហៅ API (ស្មុគស្មាញ និងយឺត!)");
    } else {
      setActionLog("✅ របៀបត្រូវ: onClick ➔ handleBuyClick() ➔ ហៅ API ផ្ទាល់ភ្លាមៗ (ត្រង់ចំណុច និងច្បាស់លាស់ ១០០%)");
    }
  };

  // Good approach: Derived directly
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-lg">
        <PanelHeader
          label="You Might Not Need an Effect (Interactive Demo)"
          badge="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
        />

        {/* Tab Selector */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700 flex gap-2">
          <button
            onClick={() => setSelectedExample("derived")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedExample === "derived"
                ? "bg-blue-600 text-white shadow"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
            }`}
          >
            ករណីទី ១ ៖ គណនាទិន្នន័យ (Derived State)
          </button>
          <button
            onClick={() => setSelectedExample("action")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedExample === "action"
                ? "bg-blue-600 text-white shadow"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
            }`}
          >
            ករណីទី ២ ៖ សកម្មភាព User (Button Click)
          </button>
        </div>

        {selectedExample === "derived" ? (
          <div className="p-6 space-y-6">
            {/* Input fields */}
            <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">
                ✏️ សាកល្បងកែប្រែឈ្មោះ (Inputs):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-500">First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => handleNameChange(e.target.value, lastName)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border dark:bg-gray-900 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => handleNameChange(firstName, e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border dark:bg-gray-900 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Side by Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Approach */}
              <div className="p-4 rounded-xl border-2 border-rose-300 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400">
                    ❌ របៀបខុស (ប្រើ useEffect)
                  </span>
                  <span className="bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded">
                    Re-render: {badRenderCount} ដង
                  </span>
                </div>
                <pre className="text-[11px] font-mono bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 border border-rose-200 dark:border-rose-900 overflow-x-auto">
{`const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);`}
                </pre>
                <div className="mt-2 text-[11px] text-rose-700 dark:text-rose-400">
                  ⚠️ <strong>បញ្ហា៖</strong> Component ត្រូវ Render លើកទី ១ រួចទើប Effect រត់ ➔ ហៅ setFullName ➔ បង្កជា <strong>Render លើកទី ២</strong> ឥតប្រយោជន៍!
                </div>
              </div>

              {/* Good Approach */}
              <div className="p-4 rounded-xl border-2 border-emerald-300 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    ✅ របៀបត្រូវ (Derived State)
                  </span>
                  <span className="bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                    Re-render: {goodRenderCount} ដង
                  </span>
                </div>
                <pre className="text-[11px] font-mono bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-700 dark:text-gray-300 border border-emerald-200 dark:border-emerald-900 overflow-x-auto">
{`// គណនាផ្ទាល់ក្នុង Render Phase
const fullName = firstName + ' ' + lastName;`}
                </pre>
                <div className="mt-2 text-[11px] text-emerald-700 dark:text-emerald-400">
                  ✨ <strong>លទ្ធផល៖</strong> លឿនបំផុត ស៊ីពេល 0.001ms គ្មាន extra re-render គ្មាន bugs និងបង្ហាញឈ្មោះភ្លាម៖ <strong>&quot;{fullName}&quot;</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="text-xs text-gray-600 dark:text-gray-300">
              ស្រមៃថា User ចុចប៊ូតុង <strong>«ទិញទំនិញ $50»</strong>។ តើកូដគួរដើរបែបណា?
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleActionTest("bad")}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                ចុចតេស្ត ៖ ❌ របៀបខុស (ឆ្លងកាត់ useEffect)
              </button>

              <button
                onClick={() => handleActionTest("good")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                ចុចតេស្ត ៖ ✅ របៀបត្រូវ (ហៅក្នុង Event Handler ផ្ទាល់)
              </button>
            </div>

            <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800">
              <div className="text-slate-500 mb-1">{"// លំហូរដំណើរការ:"}</div>
              <div>{actionLog}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
