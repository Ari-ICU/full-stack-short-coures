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

// ─── 1. Viewport Diagram ─────────────────────────────────────────────────────
type Device = "mobile" | "tablet" | "desktop";

const DEVICES: { id: Device; label: string; width: number; icon: string; color: string; breakpoint: string }[] = [
  { id: "mobile",  label: "Mobile",  width: 375,  icon: "📱", color: "#3b82f6", breakpoint: "< 768px" },
  { id: "tablet",  label: "Tablet",  width: 768,  icon: "📟", color: "#a855f7", breakpoint: "≥ 768px" },
  { id: "desktop", label: "Desktop", width: 1280, icon: "🖥️", color: "#22c55e", breakpoint: "≥ 1024px" },
];

export function ViewportDiagram() {
  const [active, setActive] = useState<Device>("mobile");
  const dev = DEVICES.find(d => d.id === active)!;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {DEVICES.map(d => (
          <button key={d.id} onClick={() => setActive(d.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer flex items-center gap-1.5
              ${active === d.id ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === d.id ? dev.color : undefined }}>
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`${dev.icon} ${dev.label} — ${dev.breakpoint}`} badge="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" />
        <div className="p-6 space-y-4">
          {/* Simulated screen */}
          <div className="flex justify-center">
            <div className="transition-all duration-500 rounded-xl border-2 overflow-hidden bg-white"
              style={{ width: active === "mobile" ? 160 : active === "tablet" ? 280 : "100%", borderColor: dev.color }}>
              {/* Simulated navbar */}
              <div className="px-3 py-2 flex items-center justify-between" style={{ background: dev.color }}>
                <span className="text-white text-[10px] font-bold">Logo</span>
                {active === "mobile" ? (
                  <span className="text-white text-[10px]">☰</span>
                ) : (
                  <div className="flex gap-2">
                    {["Home","About","Contact"].map(l => (
                      <span key={l} className="text-white text-[9px]">{l}</span>
                    ))}
                  </div>
                )}
              </div>
              {/* Simulated content */}
              <div className={`p-2 ${active === "desktop" ? "grid grid-cols-3 gap-1.5" : "space-y-1.5"}`}>
                {[1,2,3].map(i => (
                  <div key={i} className="rounded h-10 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: dev.color + "99" }}>
                    Card {i}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Breakpoints</div>
            <div className="space-y-1">
              {DEVICES.map(d => (
                <div key={d.id} className={`flex items-center gap-2 text-[11px] font-mono ${active === d.id ? "font-bold" : "text-gray-400"}`}>
                  <span style={{ color: d.color }}>{d.icon}</span>
                  <span style={{ color: active === d.id ? d.color : undefined }}>{d.breakpoint} — {d.label} ({d.width}px)</span>
                  {active === d.id && <span className="text-[9px] px-1.5 py-0.5 rounded text-white" style={{ background: d.color }}>active</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Mobile-First Diagram ──────────────────────────────────────────────────
export function MobileFirstDiagram() {
  const [approach, setApproach] = useState<"mobile-first" | "desktop-first">("mobile-first");
  const [vp, setVp] = useState<Device>("mobile");

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Mobile-First vs Desktop-First" badge="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" />
        <div className="p-6 space-y-4">
          {/* Approach toggle */}
          <div className="flex gap-2">
            {(["mobile-first","desktop-first"] as const).map(a => (
              <button key={a} onClick={() => setApproach(a)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
                  ${approach === a ? "bg-blue-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                {a === "mobile-first" ? "📱 Mobile-First ✅" : "🖥️ Desktop-First ❌"}
              </button>
            ))}
          </div>

          {/* Code comparison */}
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {approach === "mobile-first" ? (
              <div className="bg-gray-900 p-4 text-xs font-mono space-y-1">
                <div className="text-gray-500 text-[10px] mb-2">✅ Mobile-First — ចាប់ផ្ដើមពី Mobile</div>
                <div className="text-green-400">{"/* Base = Mobile */"}</div>
                <div className="text-white">{".nav { flex-direction: column; }"}</div>
                <div className="text-white">{".grid { grid-template-columns: 1fr; }"}</div>
                <br />
                <div className="text-blue-400">{"@media (min-width: 768px) { /* Tablet */"}</div>
                <div className="text-white pl-4">{".nav { flex-direction: row; }"}</div>
                <div className="text-blue-400">{"}"}</div>
                <br />
                <div className="text-purple-400">{"@media (min-width: 1024px) { /* Desktop */"}</div>
                <div className="text-white pl-4">{".grid { grid-template-columns: repeat(3, 1fr); }"}</div>
                <div className="text-purple-400">{"}"}</div>
              </div>
            ) : (
              <div className="bg-gray-900 p-4 text-xs font-mono space-y-1">
                <div className="text-gray-500 text-[10px] mb-2">❌ Desktop-First — ចាប់ផ្ដើមពី Desktop</div>
                <div className="text-red-400">{"/* Base = Desktop (ស្មុគស្មាញ) */"}</div>
                <div className="text-white">{".nav { flex-direction: row; }"}</div>
                <div className="text-white">{".grid { grid-template-columns: repeat(3, 1fr); }"}</div>
                <br />
                <div className="text-red-400">{"@media (max-width: 1023px) { /* Tablet */"}</div>
                <div className="text-white pl-4">{".grid { grid-template-columns: repeat(2, 1fr); }"}</div>
                <div className="text-red-400">{"}"}</div>
                <br />
                <div className="text-red-400">{"@media (max-width: 767px) { /* Mobile */"}</div>
                <div className="text-white pl-4">{".nav { flex-direction: column; }"}</div>
                <div className="text-white pl-4">{".grid { grid-template-columns: 1fr; }"}</div>
                <div className="text-red-400">{"}"}</div>
              </div>
            )}
          </div>

          {approach === "mobile-first" ? (
            <div className="text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              ✅ <strong>Mobile-First:</strong> Base CSS ស្រាល · ប្រើ <code>min-width</code> · Performance ល្អ · Code ច្បាស់
            </div>
          ) : (
            <div className="text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              ❌ <strong>Desktop-First:</strong> Base CSS ធ្ងន់ · ប្រើ <code>max-width</code> · Override ច្រើន · Code ស្មុគស្មាញ
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 3. Media Query Diagram ───────────────────────────────────────────────────
export function MediaQueryDiagram() {
  const [width, setWidth] = useState(600);

  const breakpoint = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
  const bpColor = breakpoint === "mobile" ? "#3b82f6" : breakpoint === "tablet" ? "#a855f7" : "#22c55e";
  const bpLabel = breakpoint === "mobile" ? "📱 Mobile (< 768px)" : breakpoint === "tablet" ? "📟 Tablet (768–1023px)" : "🖥️ Desktop (≥ 1024px)";

  const cols = breakpoint === "mobile" ? 1 : breakpoint === "tablet" ? 2 : 3;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="@media — drag to simulate viewport" badge="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300" />
        <div className="p-6 space-y-4">
          {/* Width slider */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-20 shrink-0">viewport</span>
            <input type="range" min={320} max={1440} value={width}
              onChange={e => setWidth(Number(e.target.value))}
              className="flex-1 cursor-pointer h-1.5" style={{ accentColor: bpColor }} />
            <span className="text-[11px] font-mono font-bold w-16 text-right shrink-0" style={{ color: bpColor }}>{width}px</span>
          </div>

          {/* Breakpoint indicator */}
          <div className="flex items-center gap-2">
            <div className="text-xs font-bold px-3 py-1.5 rounded-full text-white transition-all duration-200" style={{ background: bpColor }}>
              {bpLabel}
            </div>
          </div>

          {/* Breakpoint ruler */}
          <div className="relative h-6 rounded-lg overflow-hidden flex">
            <div className="flex-none bg-blue-400 flex items-center justify-center text-[9px] text-white font-bold" style={{ width: `${(768/1440)*100}%` }}>Mobile</div>
            <div className="flex-none bg-purple-400 flex items-center justify-center text-[9px] text-white font-bold" style={{ width: `${((1024-768)/1440)*100}%` }}>Tablet</div>
            <div className="flex-1 bg-green-400 flex items-center justify-center text-[9px] text-white font-bold">Desktop</div>
            {/* Current position marker */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-100"
              style={{ left: `${(width/1440)*100}%` }} />
          </div>

          {/* Live grid demo */}
          <div className="transition-all duration-300 rounded-xl border-2 p-3" style={{ borderColor: bpColor }}>
            <div className="text-[10px] font-bold mb-2" style={{ color: bpColor }}>
              grid-template-columns: repeat({cols}, 1fr)
            </div>
            <div className="transition-all duration-300" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 6 }}>
              {[1,2,3,4,5,6].slice(0, cols === 1 ? 3 : 6).map(i => (
                <div key={i} className="h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: bpColor }}>
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* Live CSS */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Active CSS</div>
            <div className="font-bold space-y-0.5" style={{ color: bpColor }}>
              {breakpoint === "mobile" && <div>{".grid { grid-template-columns: 1fr; }"}</div>}
              {breakpoint === "tablet" && <><div>{"@media (min-width: 768px) {"}</div><div className="pl-4">{".grid { grid-template-columns: repeat(2, 1fr); }"}</div><div>{"}"}</div></>}
              {breakpoint === "desktop" && <><div>{"@media (min-width: 1024px) {"}</div><div className="pl-4">{".grid { grid-template-columns: repeat(3, 1fr); }"}</div><div>{"}"}</div></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Responsive Layout Diagram ────────────────────────────────────────────
export function ResponsiveLayoutDiagram() {
  const [vp, setVp] = useState<Device>("mobile");
  const dev = { mobile: { icon: "📱", color: "#3b82f6" }, tablet: { icon: "📟", color: "#a855f7" }, desktop: { icon: "🖥️", color: "#22c55e" } }[vp];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex justify-center gap-2 mb-4">
        {(["mobile","tablet","desktop"] as Device[]).map(d => (
          <button key={d} onClick={() => setVp(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all capitalize
              ${vp === d ? "border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: vp === d ? dev.color : undefined }}>
            {d === "mobile" ? "📱" : d === "tablet" ? "📟" : "🖥️"} {d}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`Layout — ${vp}`} badge="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" />
        <div className="p-4 space-y-3">
          {/* Layout preview */}
          <div className="rounded-xl border-2 overflow-hidden transition-all duration-300" style={{ borderColor: dev.color }}>
            {/* Navbar */}
            <div className="px-3 py-2 flex items-center justify-between text-white text-[11px] font-bold" style={{ background: dev.color }}>
              <span>Logo</span>
              {vp === "mobile" ? <span>☰ Menu</span> : <div className="flex gap-3"><span>Home</span><span>About</span><span>Contact</span></div>}
            </div>

            {/* Body */}
            <div className={`p-3 transition-all duration-300 ${vp === "desktop" ? "flex gap-3" : "space-y-2"}`}>
              {/* Sidebar — only tablet+ */}
              {vp !== "mobile" && (
                <div className="rounded-lg p-2 text-[10px] font-bold text-white flex-none"
                  style={{ background: dev.color + "88", width: vp === "tablet" ? 80 : 120 }}>
                  Sidebar
                </div>
              )}

              {/* Main content */}
              <div className={`flex-1 transition-all duration-300 ${vp === "mobile" ? "space-y-2" : "grid gap-2"}`}
                style={{ gridTemplateColumns: vp === "desktop" ? "repeat(2, 1fr)" : vp === "tablet" ? "1fr" : undefined }}>
                {[1,2,3,4].slice(0, vp === "mobile" ? 3 : 4).map(i => (
                  <div key={i} className="rounded-lg h-10 flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: dev.color + "66" }}>
                    Card {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-3 py-2 text-center text-[10px] text-white" style={{ background: dev.color + "bb" }}>
              Footer
            </div>
          </div>

          {/* CSS for current viewport */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Active CSS</div>
            <div className="font-bold space-y-0.5" style={{ color: dev.color }}>
              {vp === "mobile" && (
                <><div>{"/* Mobile base */"}</div><div>{".sidebar { display: none; }"}</div><div>{".content { grid-template-columns: 1fr; }"}</div></>
              )}
              {vp === "tablet" && (
                <><div>{"@media (min-width: 768px) {"}</div><div className="pl-4">{".sidebar { display: block; width: 80px; }"}</div><div className="pl-4">{".layout { display: flex; gap: 12px; }"}</div><div>{"}"}</div></>
              )}
              {vp === "desktop" && (
                <><div>{"@media (min-width: 1024px) {"}</div><div className="pl-4">{".sidebar { width: 120px; }"}</div><div className="pl-4">{".content { grid-template-columns: repeat(2, 1fr); }"}</div><div>{"}"}</div></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
