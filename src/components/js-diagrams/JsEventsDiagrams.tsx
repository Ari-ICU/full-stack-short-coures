"use client";

import { useState, useRef, useEffect } from "react";

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

// ─── 1. addEventListener Diagram ──────────────────────────────────────────────
const EVENT_TYPES = [
  { name: "click",       color: "#3b82f6", icon: "🖱️",  desc: "ពេលចុចលើ Element" },
  { name: "dblclick",    color: "#8b5cf6", icon: "🖱️🖱️", desc: "ចុចពីរដងផ្ទួន" },
  { name: "mouseenter",  color: "#22c55e", icon: "↘️",  desc: "ដាក់ Mouse ពីលើ" },
  { name: "mouseleave",  color: "#f97316", icon: "↗️",  desc: "ដក Mouse ចេញ" },
  { name: "keydown",     color: "#ec4899", icon: "⌨️",  desc: "ចុច Key ចុះក្រោម" },
  { name: "input",       color: "#14b8a6", icon: "✏️",  desc: "ប្ដូរតម្លៃ input" },
];

export function EventListenerDiagram() {
  const [activeType, setActiveType] = useState(0);
  const [log, setLog] = useState<{ msg: string; time: string }[]>([]);
  const [hovered, setHovered] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [lastKey, setLastKey] = useState("");

  const ev = EVENT_TYPES[activeType];

  function fire(detail: string) {
    const time = new Date().toLocaleTimeString("en", { hour12: false });
    setLog((l) => [{ msg: `${ev.name} → ${detail}`, time }, ...l.slice(0, 4)]);
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Event type selector */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {EVENT_TYPES.map((e, i) => (
          <button key={e.name} onClick={() => { setActiveType(i); setLog([]); setInputVal(""); setLastKey(""); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${activeType === i ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: activeType === i ? e.color : undefined }}>
            {e.icon} {e.name}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`addEventListener("${ev.name}", callback)`} badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Interactive demo */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Try It</div>

            {(ev.name === "click" || ev.name === "dblclick") && (
              <button
                onClick={() => ev.name === "click" && fire("button clicked")}
                onDoubleClick={() => ev.name === "dblclick" && fire("double clicked!")}
                className="w-full py-4 rounded-xl text-sm font-bold text-white cursor-pointer transition-all hover:opacity-90 active:scale-95"
                style={{ background: ev.color }}>
                {ev.icon} Click Me
              </button>
            )}

            {(ev.name === "mouseenter" || ev.name === "mouseleave") && (
              <div
                onMouseEnter={() => { setHovered(true); ev.name === "mouseenter" && fire("mouse entered!"); }}
                onMouseLeave={() => { setHovered(false); ev.name === "mouseleave" && fire("mouse left!"); }}
                className="w-full py-6 rounded-xl border-2 text-sm font-bold text-center transition-all duration-200 cursor-default"
                style={{
                  borderColor: ev.color,
                  background: hovered ? ev.color + "22" : undefined,
                  color: ev.color,
                }}>
                {hovered ? "🎯 Mouse is here!" : "↘️ Move mouse here"}
              </div>
            )}

            {ev.name === "keydown" && (
              <input
                type="text"
                placeholder="ចុច Key ណាមួយ..."
                className="w-full rounded-xl border-2 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
                style={{ borderColor: ev.color }}
                onKeyDown={(e) => { setLastKey(e.key); fire(`key="${e.key}"`); }}
              />
            )}

            {ev.name === "input" && (
              <input
                type="text"
                value={inputVal}
                placeholder="វាយអ្វីមួយ..."
                className="w-full rounded-xl border-2 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
                style={{ borderColor: ev.color }}
                onChange={(e) => { setInputVal(e.target.value); fire(`value="${e.target.value}"`); }}
              />
            )}

            {/* Event log */}
            <div className="mt-3 space-y-1 min-h-[80px]">
              {log.length === 0
                ? <div className="text-xs text-gray-400 italic">← interact above to fire events</div>
                : log.map((l, i) => (
                  <div key={i} className={`flex items-center gap-2 text-[11px] font-mono rounded-lg px-2 py-1 ${i === 0 ? "font-bold" : "opacity-60"}`}
                    style={{ background: ev.color + "18", color: ev.color }}>
                    <span className="text-gray-400">{l.time}</span>
                    {l.msg}
                  </div>
                ))}
            </div>
          </div>

          {/* Code */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 text-xs font-semibold"
              style={{ background: ev.color + "18", color: ev.color, border: `1px solid ${ev.color}44` }}>
              {ev.icon} {ev.desc}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
              <div><span className="text-blue-400">const</span> <span className="text-white">el</span> = document.<span className="text-yellow-300">querySelector</span>(<span className="text-green-300">"#target"</span>);</div>
              <div className="mt-1">
                <span className="text-white">el</span>.<span className="text-blue-400">addEventListener</span>(
                <span className="text-green-300">"{ev.name}"</span>, (<span className="text-orange-300">e</span>) ={">"} {"{"}
              </div>
              {ev.name === "keydown" && <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-orange-300">e</span>.<span className="text-yellow-300">key</span>); <span className="text-gray-400">// "{lastKey || "?"}"</span></div>}
              {ev.name === "input"   && <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-orange-300">e</span>.<span className="text-yellow-300">target</span>.<span className="text-yellow-300">value</span>);</div>}
              {!["keydown","input"].includes(ev.name) && <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-green-300">"{ev.name} fired!"</span>);</div>}
              <div>{"}"});</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Event Object Diagram ──────────────────────────────────────────────────
export function EventObjectDiagram() {
  const [eventType, setEventType] = useState<"click" | "key" | "input">("click");
  const [eProps, setEProps] = useState<Record<string, string>>({});
  const [fired, setFired] = useState(false);

  function handleClick(e: React.MouseEvent) {
    setEventType("click");
    setEProps({
      "e.type":          "click",
      "e.target":        (e.target as HTMLElement).tagName.toLowerCase(),
      "e.target.id":     (e.target as HTMLElement).id || "(none)",
      "e.clientX":       String(e.clientX),
      "e.clientY":       String(e.clientY),
      "e.timeStamp":     String(Math.round(e.timeStamp)),
    });
    setFired(true);
  }

  function handleKey(e: React.KeyboardEvent) {
    setEventType("key");
    setEProps({
      "e.type":     "keydown",
      "e.key":      e.key,
      "e.code":     e.code,
      "e.ctrlKey":  String(e.ctrlKey),
      "e.shiftKey": String(e.shiftKey),
      "e.altKey":   String(e.altKey),
    });
    setFired(true);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEventType("input");
    setEProps({
      "e.type":          "input",
      "e.target.value":  e.target.value,
      "e.target.name":   e.target.name || "(none)",
      "e.target.type":   e.target.type,
    });
    setFired(true);
  }

  const PROP_COLORS: Record<string, string> = {
    "e.type": "#3b82f6", "e.target": "#22c55e", "e.key": "#ec4899",
    "e.clientX": "#f97316", "e.clientY": "#f97316", "e.target.value": "#14b8a6",
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Event Object (e) — Properties" badge="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">
          {/* Three interaction zones */}
          <div className="grid grid-cols-3 gap-2">
            <button id="click-target" onClick={handleClick}
              className="py-3 rounded-xl text-xs font-bold bg-blue-600 text-white cursor-pointer hover:opacity-90 active:scale-95 transition-all">
              🖱️ Click here
            </button>
            <input type="text" placeholder="⌨️ Type here"
              className="rounded-xl border-2 border-pink-300 dark:border-pink-700 px-2 py-3 text-xs text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
              onKeyDown={handleKey}
            />
            <input type="text" name="search" placeholder="✏️ Input here"
              className="rounded-xl border-2 border-teal-300 dark:border-teal-700 px-2 py-3 text-xs text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
              onChange={handleInput}
            />
          </div>

          {/* Properties panel */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              {fired ? `Event Object — ${eProps["e.type"] || "?"}` : "← interact above to see the Event Object"}
            </div>
            {fired && Object.entries(eProps).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 px-3 py-1.5 border-t border-gray-100 dark:border-gray-800 text-xs font-mono">
                <span className="font-bold w-36 shrink-0" style={{ color: PROP_COLORS[key] ?? "#a78bfa" }}>{key}</span>
                <span className="text-gray-400">→</span>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">{val || '""'}</span>
              </div>
            ))}
            {!fired && (
              <div className="px-3 py-4 text-xs text-gray-400 italic text-center">
                Properties will appear here...
              </div>
            )}
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"// e is automatically passed to your callback"}</div>
            <div><span className="text-white">el</span>.<span className="text-blue-400">addEventListener</span>(<span className="text-green-300">"click"</span>, (<span className="text-orange-300">e</span>) ={">"} {"{"}</div>
            <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-orange-300">e</span>.<span className="text-yellow-300">type</span>);        <span className="text-gray-400">// "click"</span></div>
            <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-orange-300">e</span>.<span className="text-yellow-300">target</span>);      <span className="text-gray-400">// the clicked element</span></div>
            <div className="pl-4 text-white">console.<span className="text-yellow-300">log</span>(<span className="text-orange-300">e</span>.<span className="text-yellow-300">target</span>.<span className="text-yellow-300">value</span>); <span className="text-gray-400">// input value</span></div>
            <div>{"}"});</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. preventDefault Diagram ────────────────────────────────────────────────
export function PreventDefaultDiagram() {
  const [prevented, setPrevented] = useState(true);
  const [username, setUsername] = useState("");
  const [log, setLog] = useState<{ msg: string; ok: boolean }[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // always prevent in our simulation
    if (prevented) {
      setLog((l) => [{ msg: `✅ e.preventDefault() — username="${username}" (ទំព័រនៅដដែល)`, ok: true }, ...l.slice(0, 3)]);
    } else {
      setLog((l) => [{ msg: `❌ គ្មាន preventDefault() — Browser would reload (data lost)`, ok: false }, ...l.slice(0, 3)]);
    }
    setUsername("");
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="e.preventDefault() — Stop Default Browser Behavior" badge="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" />
        <div className="p-6 space-y-4">

          {/* Toggle */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400 font-semibold">e.preventDefault():</span>
            <button onClick={() => setPrevented((p) => !p)}
              className={`px-4 py-1.5 rounded-lg font-bold cursor-pointer transition-all
                ${prevented ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
              {prevented ? "✅ ON — recommended" : "❌ OFF — danger!"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              placeholder="វាយឈ្មោះ..."
              className="flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-green-500" />
            <button type="submit"
              className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold cursor-pointer transition-all">
              Submit
            </button>
          </form>

          {/* Log */}
          {log.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {log.map((entry, i) => (
                <div key={i} className={`px-3 py-2 text-[11px] font-mono border-b border-gray-100 dark:border-gray-800 last:border-0
                  ${entry.ok ? "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/20" : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20"}`}>
                  {entry.msg}
                </div>
              ))}
            </div>
          )}

          {/* Status callout */}
          <div className={`rounded-xl p-3 text-xs font-semibold
            ${prevented
              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"}`}>
            {prevented
              ? "✅ e.preventDefault() ការពារ Page Reload — JS គ្រប់គ្រង Form ផ្ទាល់"
              : "❌ គ្មាន e.preventDefault() — ចុច Submit → ទំព័រ Refresh → data បាត់"}
          </div>

          {/* Code */}
          <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1">
            <div><span className="text-white">form</span>.<span className="text-blue-400">addEventListener</span>(<span className="text-green-300">"submit"</span>, (<span className="text-orange-300">e</span>) ={">"} {"{"}</div>
            {prevented && <div className="pl-4"><span className="text-orange-300">e</span>.<span className="text-yellow-300">preventDefault</span>(); <span className="text-gray-400">// ⭐ stop reload</span></div>}
            <div className="pl-4"><span className="text-blue-400">const</span> <span className="text-white">val</span> = input.<span className="text-yellow-300">value</span>;</div>
            <div className="pl-4">console.<span className="text-yellow-300">log</span>(<span className="text-green-300">`Hello, ${"{val}"}!`</span>);</div>
            <div>{"}"});</div>
          </div>
        </div>
      </div>
    </div>
  );
}
