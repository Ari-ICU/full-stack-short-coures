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

type LSEntry = { key: string; value: string };

// ─── 1. setItem / getItem / removeItem ────────────────────────────────────────
export function LocalStorageBasicDiagram() {
  const [store, setStore] = useState<LSEntry[]>([
    { key: "theme", value: "dark" },
    { key: "username", value: "Sok Dara" },
  ]);
  const [newKey, setNewKey]     = useState("lang");
  const [newVal, setNewVal]     = useState("km");
  const [lastGet, setLastGet]   = useState<string | null | undefined>(undefined);
  const [getKey, setGetKey]     = useState("theme");
  const [activeOp, setActiveOp] = useState<"set" | "get" | "remove" | "clear" | null>(null);

  function doSet() {
    if (!newKey.trim()) return;
    setStore(prev => {
      const exists = prev.findIndex(e => e.key === newKey);
      if (exists >= 0) {
        const next = [...prev];
        next[exists] = { key: newKey, value: newVal };
        return next;
      }
      return [...prev, { key: newKey, value: newVal }];
    });
    setActiveOp("set");
    setLastGet(undefined);
  }

  function doGet() {
    const found = store.find(e => e.key === getKey);
    setLastGet(found ? found.value : null);
    setActiveOp("get");
  }

  function doRemove(key: string) {
    setStore(prev => prev.filter(e => e.key !== key));
    setActiveOp("remove");
    setLastGet(undefined);
  }

  function doClear() {
    setStore([]);
    setActiveOp("clear");
    setLastGet(undefined);
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="localStorage — setItem / getItem / removeItem" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-5">

          {/* Storage visual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 tracking-widest">localStorage (Browser)</div>
              <button onClick={doClear}
                className="text-[10px] font-bold text-red-500 hover:text-red-700 cursor-pointer transition-colors px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
                clear()
              </button>
            </div>
            <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 min-h-[4rem] p-3 space-y-1.5">
              {store.length === 0 && (
                <div className="text-xs text-gray-900 dark:text-gray-100 italic text-center py-2">— empty —</div>
              )}
              {store.map(e => (
                <div key={e.key} className={`flex items-center justify-between rounded-lg px-3 py-1.5 border transition-all ${activeOp === "get" && getKey === e.key ? "border-green-400 bg-green-50 dark:bg-green-950/20" : activeOp === "set" && newKey === e.key ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"}`}>
                  <span className="text-xs font-mono">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">"{e.key}"</span>
                    <span className="text-gray-400 mx-1">:</span>
                    <span className="text-green-600 dark:text-green-400">"{e.value}"</span>
                  </span>
                  <button onClick={() => doRemove(e.key)}
                    className="text-[10px] text-red-400 hover:text-red-600 cursor-pointer font-bold ml-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* setItem */}
          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 p-3 space-y-2">
            <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">setItem(key, value)</div>
            <div className="flex gap-2">
              <input value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="key"
                className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400" />
              <input value={newVal} onChange={e => setNewVal(e.target.value)} placeholder="value"
                className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400" />
              <button onClick={doSet}
                className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all">
                Set
              </button>
            </div>
          </div>

          {/* getItem */}
          <div className="rounded-xl border-2 border-green-200 dark:border-green-800 p-3 space-y-2">
            <div className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400">getItem(key)</div>
            <div className="flex gap-2">
              <input value={getKey} onChange={e => { setGetKey(e.target.value); setLastGet(undefined); }} placeholder="key"
                className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-400" />
              <button onClick={doGet}
                className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all">
                Get
              </button>
            </div>
            {lastGet !== undefined && (
              <div className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${lastGet === null ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400" : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"}`}>
                → {lastGet === null ? "null (key not found)" : `"${lastGet}"`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Objects/Arrays with JSON ─────────────────────────────────────────────
export function LocalStorageJsonDiagram() {
  const [cart, setCart] = useState(["Apple", "Banana", "Milk"]);
  const [newItem, setNewItem] = useState("");
  const [savedRaw, setSavedRaw] = useState<string | null>(null);
  const [loadedCart, setLoadedCart] = useState<string[] | null>(null);
  const [phase, setPhase] = useState<"idle" | "saved" | "loaded">("idle");

  function addItem() {
    if (newItem.trim()) { setCart(prev => [...prev, newItem.trim()]); setNewItem(""); setPhase("idle"); setSavedRaw(null); setLoadedCart(null); }
  }
  function removeItem(i: number) { setCart(prev => prev.filter((_, idx) => idx !== i)); setPhase("idle"); setSavedRaw(null); setLoadedCart(null); }

  function doSave() {
    const str = JSON.stringify(cart);
    setSavedRaw(str);
    setPhase("saved");
    setLoadedCart(null);
  }

  function doLoad() {
    if (!savedRaw) return;
    setLoadedCart(JSON.parse(savedRaw));
    setPhase("loaded");
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="localStorage + JSON — Array/Object" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">

          {/* Path indicator */}
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
            {[
              { label: "① JS Array", sub: "cart = [...]", active: true, color: "blue" },
              { label: "② JSON.stringify()", sub: "→ String → LS", active: phase === "saved" || phase === "loaded", color: "orange" },
              { label: "③ JSON.parse()", sub: "LS → Array", active: phase === "loaded", color: "green" },
            ].map((s, i) => (
              <div key={i} className={`rounded-lg py-2 px-1 border-2 transition-all ${
                s.active
                  ? s.color === "blue"   ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                  : s.color === "orange" ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300"
                  :                        "border-green-400 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300"
                  : "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 opacity-40"
              }`}>
                <div>{s.label}</div>
                <div className="opacity-75 font-mono mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Cart editor */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-gray-900 dark:text-gray-100 tracking-widest">JS Array (cart)</div>
            <div className="flex flex-wrap gap-1.5">
              {cart.map((item, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-mono border border-blue-200 dark:border-blue-800">
                  {item}
                  <button onClick={() => removeItem(i)} className="text-blue-400 hover:text-red-500 cursor-pointer ml-0.5">✕</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newItem} onChange={e => setNewItem(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem()}
                placeholder="add item..."
                className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-400" />
              <button onClick={addItem}
                className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all">Add</button>
            </div>
          </div>

          {/* Stringify → save */}
          {phase === "saved" || phase === "loaded" ? (
            <div className="rounded-xl border-2 border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/20 p-3 space-y-1">
              <div className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400">localStorage (JSON String)</div>
              <div className="text-xs font-mono text-orange-700 dark:text-orange-300 break-all">{savedRaw}</div>
            </div>
          ) : null}

          {/* Loaded result */}
          {phase === "loaded" && loadedCart && (
            <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-3 space-y-2">
              <div className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400">JSON.parse() → JS Array</div>
              <div className="flex flex-wrap gap-1.5">
                {loadedCart.map((item, i) => (
                  <span key={i} className="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-mono border border-green-200 dark:border-green-800">
                    [{i}]: "{item}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            <button onClick={doSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer transition-all">
              💾 JSON.stringify() → setItem
            </button>
            {phase === "saved" && (
              <button onClick={doLoad}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all">
                📂 getItem → JSON.parse()
              </button>
            )}
            {phase === "loaded" && (
              <button onClick={() => { setPhase("idle"); setSavedRaw(null); setLoadedCart(null); }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                ↺ Reset
              </button>
            )}
          </div>

          <div className="rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 px-3 py-2 text-[11px] text-purple-700 dark:text-purple-300">
            💡 localStorage ទទួល <strong>String ប៉ុណ្ណោះ</strong> — ប្រើ <code className="font-mono bg-purple-100 dark:bg-purple-900/50 px-1 rounded">JSON.stringify()</code> រុញចូល និង <code className="font-mono bg-purple-100 dark:bg-purple-900/50 px-1 rounded">JSON.parse()</code> ទាញចេញ
          </div>
        </div>
      </div>
    </div>
  );
}
