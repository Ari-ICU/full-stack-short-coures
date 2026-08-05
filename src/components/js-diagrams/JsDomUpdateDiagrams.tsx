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

// ─── 1. Create Node Diagram ────────────────────────────────────────────────────
const TAG_OPTIONS = ["p", "div", "h2", "button", "li", "span"];

export function DomCreateDiagram() {
  const [tag, setTag] = useState("p");
  const [text, setText] = useState("Hello DOM!");
  const [className, setClassName] = useState("highlight");
  const [added, setAdded] = useState(false);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="document.createElement() — Creating Nodes" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-5">

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Tag</div>
              <div className="flex flex-wrap gap-1">
                {TAG_OPTIONS.map((t) => (
                  <button key={t} onClick={() => { setTag(t); setAdded(false); }}
                    className={`px-2 py-1 rounded text-xs font-mono font-bold border cursor-pointer transition-all
                      ${tag === t ? "bg-blue-600 border-transparent text-white" : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                    {`<${t}>`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">textContent</label>
              <input type="text" value={text} onChange={(e) => { setText(e.target.value); setAdded(false); }}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-1.5 text-xs bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">className</label>
              <input type="text" value={className} onChange={(e) => { setClassName(e.target.value); setAdded(false); }}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-1.5 text-xs bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* Memory → DOM flow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            {/* In memory */}
            <div className="rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-blue-500 mb-2">Memory (not visible)</div>
              <div className="font-mono text-xs text-blue-800 dark:text-blue-200 break-all">
                <span className="text-blue-400">&lt;{tag}</span>
                {className && <span className="text-yellow-600 dark:text-yellow-400"> class="{className}"</span>}
                <span className="text-blue-400">&gt;</span>
                <span className="text-gray-700 dark:text-gray-300">{text || "…"}</span>
                <span className="text-blue-400">&lt;/{tag}&gt;</span>
              </div>
            </div>

            {/* Arrow + button */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-gray-400 text-xs font-mono">.appendChild()</div>
              <button onClick={() => setAdded(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-all">
                ▶ Add to DOM
              </button>
              <div className="text-gray-400 text-xs">{added ? "✅ added!" : "not added yet"}</div>
            </div>

            {/* Live DOM preview */}
            <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-3 min-h-[60px]">
              <div className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400 mb-2">DOM (visible)</div>
              {added ? (
                <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg px-2 py-1.5 border border-green-200 dark:border-green-800">
                  {text || "(empty)"}
                  {className && <span className="ml-2 text-[10px] text-green-600 dark:text-green-400 font-mono">.{className}</span>}
                </div>
              ) : (
                <div className="text-[11px] text-gray-400 italic">← click Add to DOM</div>
              )}
            </div>
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"// 1. Create in memory"}</div>
            <div><span className="text-blue-400">const</span> <span className="text-white">el</span> = document.<span className="text-yellow-300">createElement</span>(<span className="text-green-300">"{tag}"</span>);</div>
            <div><span className="text-white">el</span>.<span className="text-yellow-300">textContent</span> = <span className="text-green-300">"{text}"</span>;</div>
            {className && <div><span className="text-white">el</span>.<span className="text-yellow-300">className</span> = <span className="text-green-300">"{className}"</span>;</div>}
            <div className="text-gray-400 mt-1">{"// 2. Add to DOM"}</div>
            <div><span className="text-white">parent</span>.<span className="text-blue-400">appendChild</span>(<span className="text-white">el</span>);</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Append Nodes Diagram ───────────────────────────────────────────────────
type AppendMode = "appendChild" | "prepend" | "insertBefore";

export function DomAppendDiagram() {
  const [mode, setMode] = useState<AppendMode>("appendChild");
  const [items, setItems] = useState(["Task A", "Task B", "Task C"]);
  const [log, setLog] = useState<string[]>([]);

  const MODES: { id: AppendMode; color: string; label: string; desc: string }[] = [
    { id: "appendChild",  color: "#3b82f6", label: "appendChild()",  desc: "ដាក់នៅខាងចុងគេ" },
    { id: "prepend",      color: "#22c55e", label: "prepend()",      desc: "ដាក់នៅខាងដើមគេ" },
    { id: "insertBefore", color: "#f97316", label: "insertBefore()", desc: "ដាក់នៅពីមុខ index[1]" },
  ];
  const m = MODES.find((x) => x.id === mode)!;

  function handleAdd() {
    const newItem = `New Item ${Date.now() % 1000}`;
    setItems((prev) => {
      if (mode === "appendChild")  return [...prev, newItem];
      if (mode === "prepend")      return [newItem, ...prev];
      if (mode === "insertBefore") {
        const copy = [...prev];
        copy.splice(1, 0, newItem);
        return copy;
      }
      return prev;
    });
    setLog((l) => [`${m.label} → "${newItem}"`, ...l.slice(0, 3)]);
  }

  function handleReset() { setItems(["Task A", "Task B", "Task C"]); setLog([]); }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {MODES.map((mo) => (
          <button key={mo.id} onClick={() => setMode(mo.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${mode === mo.id ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: mode === mo.id ? mo.color : undefined }}>
            {mo.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`${m.label} — ${m.desc}`} badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Live list */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Live DOM List</div>
            <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
              {items.map((item, i) => {
                const isNew = log[0]?.includes(item);
                return (
                  <div key={`${item}-${i}`}
                    className={`flex items-center gap-2 px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 text-xs font-mono transition-all
                      ${isNew ? "font-bold" : ""}`}
                    style={{ color: isNew ? m.color : undefined, background: isNew ? m.color + "18" : undefined }}>
                    <span className="text-gray-400 w-8">[{i}]</span>
                    {item}
                    {isNew && <span className="ml-auto text-[10px] font-sans font-bold" style={{ color: m.color }}>← new</span>}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={handleAdd}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all hover:opacity-90"
                style={{ background: m.color }}>
                ▶ Run {m.label}
              </button>
              <button onClick={handleReset}
                className="px-3 py-2 rounded-xl text-xs border border-gray-300 dark:border-gray-600 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                ↺ Reset
              </button>
            </div>
            {log.length > 0 && (
              <div className="mt-2 space-y-1">
                {log.map((l, i) => (
                  <div key={i} className="text-[11px] font-mono text-gray-500 dark:text-gray-400">{l}</div>
                ))}
              </div>
            )}
          </div>

          {/* Code */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 text-xs font-semibold"
              style={{ background: m.color + "18", color: m.color, border: `1px solid ${m.color}44` }}>
              🎯 {m.desc}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="text-gray-400">{"// create new node"}</div>
              <div><span className="text-blue-400">const</span> <span className="text-white">newLi</span> = document.<span className="text-yellow-300">createElement</span>(<span className="text-green-300">"li"</span>);</div>
              <div><span className="text-white">newLi</span>.<span className="text-yellow-300">textContent</span> = <span className="text-green-300">"New Item"</span>;</div>
              <div className="text-gray-400 mt-1">{"// insert"}</div>
              {mode === "appendChild"  && <div><span className="text-white">ul</span>.<span style={{ color: m.color }}>appendChild</span>(<span className="text-white">newLi</span>);</div>}
              {mode === "prepend"      && <div><span className="text-white">ul</span>.<span style={{ color: m.color }}>prepend</span>(<span className="text-white">newLi</span>);</div>}
              {mode === "insertBefore" && <>
                <div><span className="text-blue-400">const</span> <span className="text-white">ref</span> = ul.<span className="text-yellow-300">children</span>[<span className="text-orange-300">1</span>];</div>
                <div><span className="text-white">ul</span>.<span style={{ color: m.color }}>insertBefore</span>(<span className="text-white">newLi</span>, <span className="text-white">ref</span>);</div>
              </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Remove & Replace Diagram ──────────────────────────────────────────────
type RemoveMode = "remove" | "removeChild" | "replaceChild";

export function DomRemoveReplaceDiagram() {
  const [mode, setMode] = useState<RemoveMode>("remove");
  const [nodes, setNodes] = useState(["Alert Box", "Old Header", "Sidebar", "Footer"]);
  const [log, setLog] = useState<string[]>([]);
  const [replaced, setReplaced] = useState<number | null>(null);

  const MODES: { id: RemoveMode; color: string; label: string; desc: string }[] = [
    { id: "remove",       color: "#ef4444", label: "remove()",       desc: "លុប Element ចេញ" },
    { id: "removeChild",  color: "#f97316", label: "removeChild()",  desc: "លុបតាម Parent" },
    { id: "replaceChild", color: "#8b5cf6", label: "replaceChild()", desc: "ជំនួស Element ចាស់" },
  ];
  const m = MODES.find((x) => x.id === mode)!;

  function handleAction(index: number) {
    if (mode === "remove" || mode === "removeChild") {
      setLog((l) => [`${m.label} → removed "${nodes[index]}"`, ...l.slice(0, 3)]);
      setNodes((prev) => prev.filter((_, i) => i !== index));
      setReplaced(null);
    } else {
      const newName = `New Element ${Date.now() % 100}`;
      setLog((l) => [`replaceChild() → "${nodes[index]}" → "${newName}"`, ...l.slice(0, 3)]);
      setNodes((prev) => prev.map((n, i) => i === index ? newName : n));
      setReplaced(index);
      setTimeout(() => setReplaced(null), 1200);
    }
  }

  function handleReset() {
    setNodes(["Alert Box", "Old Header", "Sidebar", "Footer"]);
    setLog([]);
    setReplaced(null);
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {MODES.map((mo) => (
          <button key={mo.id} onClick={() => { setMode(mo.id); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${mode === mo.id ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: mode === mo.id ? mo.color : undefined }}>
            {mo.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`${m.label} — ${m.desc}`} badge="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Live DOM nodes */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
              Click a node to {mode === "replaceChild" ? "replace" : "remove"} it
            </div>
            {nodes.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center text-gray-400 text-xs">
                DOM is empty
              </div>
            ) : (
              <div className="space-y-1.5">
                {nodes.map((node, i) => (
                  <button key={`${node}-${i}`} onClick={() => handleAction(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-xs font-mono font-bold text-left cursor-pointer transition-all hover:opacity-80
                      ${replaced === i ? "border-purple-400 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"}`}>
                    <span className="text-gray-400 text-[10px] w-6">[{i}]</span>
                    {node}
                    <span className="ml-auto text-[10px] font-sans" style={{ color: m.color }}>
                      {mode === "replaceChild" ? "click to replace →" : "click to remove ✕"}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button onClick={handleReset}
              className="mt-3 w-full py-1.5 rounded-xl text-xs border border-gray-300 dark:border-gray-600 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
              ↺ Reset
            </button>
            {log.length > 0 && (
              <div className="mt-2 space-y-1">
                {log.map((l, i) => (
                  <div key={i} className="text-[11px] font-mono text-gray-500 dark:text-gray-400">{l}</div>
                ))}
              </div>
            )}
          </div>

          {/* Code */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 text-xs font-semibold"
              style={{ background: m.color + "18", color: m.color, border: `1px solid ${m.color}44` }}>
              🎯 {m.desc}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              {mode === "remove" && <>
                <div><span className="text-blue-400">const</span> <span className="text-white">el</span> = document.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">".alert"</span>);</div>
                <div className="mt-1"><span className="text-white">el</span>.<span style={{ color: m.color }}>remove</span>();</div>
                <div className="text-gray-400 mt-1">{"// ✅ modern — no parent needed"}</div>
              </>}
              {mode === "removeChild" && <>
                <div><span className="text-blue-400">const</span> <span className="text-white">ul</span> = document.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">"ul"</span>);</div>
                <div><span className="text-blue-400">const</span> <span className="text-white">li</span> = ul.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">"li"</span>);</div>
                <div className="mt-1"><span className="text-white">ul</span>.<span style={{ color: m.color }}>removeChild</span>(<span className="text-white">li</span>);</div>
                <div className="text-gray-400 mt-1">{"// ⚠️ needs parent reference"}</div>
              </>}
              {mode === "replaceChild" && <>
                <div><span className="text-blue-400">const</span> <span className="text-white">newEl</span> = document.<span className="text-yellow-300">createElement</span>(<span className="text-green-300">"h1"</span>);</div>
                <div><span className="text-white">newEl</span>.<span className="text-yellow-300">textContent</span> = <span className="text-green-300">"New Header"</span>;</div>
                <div className="mt-1"><span className="text-white">parent</span>.<span style={{ color: m.color }}>replaceChild</span>(<span className="text-white">newEl</span>, <span className="text-white">oldEl</span>);</div>
                <div className="text-gray-400 mt-1">{"// replaceChild(new, old)"}</div>
              </>}
            </div>
            {mode === "remove" && (
              <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-xs text-blue-800 dark:text-blue-200">
                💡 <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">remove()</code> គឺ Modern Way — ប្រើជារៀងរហូត
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
