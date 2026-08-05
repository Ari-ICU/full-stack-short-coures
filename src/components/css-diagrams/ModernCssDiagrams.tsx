"use client";

import { useState } from "react";

function SliderRow({ label, value, min, max, onChange, unit = "px" }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-24 shrink-0">{label}</span>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-blue-500 cursor-pointer h-1.5" />
      <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 w-14 text-right shrink-0">
        {value}{unit}
      </span>
    </div>
  );
}

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

// ─── 1. CSS Units Diagram ────────────────────────────────────────────────────
type UnitTab = "px" | "em/rem" | "vw/vh" | "%";

export function CssUnitsDiagram() {
  const [tab, setTab] = useState<UnitTab>("px");
  const [fontSize, setFontSize] = useState(16);
  const [vpWidth, setVpWidth] = useState(800);
  const [parentW, setParentW] = useState(400);

  const TABS: UnitTab[] = ["px", "em/rem", "vw/vh", "%"];
  const TAB_COLORS: Record<UnitTab, string> = {
    "px": "bg-blue-600", "em/rem": "bg-purple-600", "vw/vh": "bg-green-600", "%": "bg-orange-600"
  };
  const TAB_BADGE: Record<UnitTab, string> = {
    "px": "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
    "em/rem": "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
    "vw/vh": "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
    "%": "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${tab === t ? `${TAB_COLORS[t]} border-transparent text-white shadow-md scale-105`
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label={`CSS Units — ${tab}`} badge={TAB_BADGE[tab]} />
        <div className="p-6 space-y-4">

          {tab === "px" && (
            <>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">px</code> = absolute unit — ទំហំតែងតែ <strong>200px</strong> មិនអើពើ viewport ឬ font-size
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 relative overflow-hidden" style={{ height: 100 }}>
                <div className="h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-blue-500 transition-all duration-300" style={{ width: 200 }}>
                  200px — ថេរជានិច្ច
                </div>
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">✅ ប្រើ px: border, shadow, icon size · ❌ កុំប្រើ px: font-size, spacing (ប្រើ rem)</div>
            </>
          )}

          {tab === "em/rem" && (
            <>
              <SliderRow label="font-size" value={fontSize} min={12} max={32} onChange={setFontSize} />
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
                <div>
                  <div className="text-[10px] text-purple-600 font-bold mb-1">em: {fontSize * 10}px (10em × {fontSize}px parent font)</div>
                  <div className="h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-purple-500 transition-all duration-300" style={{ width: Math.min(fontSize * 10, 540) }}>
                    10em = {fontSize * 10}px
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-blue-600 font-bold mb-1">rem: 160px (10rem × 16px root — ថេរ!)</div>
                  <div className="h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-blue-500 transition-all duration-300" style={{ width: 160 }}>
                    10rem = 160px
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">em ផ្លាស់ប្ដូរតាម parent · rem ផ្លាស់ប្ដូរតែ root ⭐</div>
            </>
          )}

          {tab === "vw/vh" && (
            <>
              <SliderRow label="viewport" value={vpWidth} min={320} max={1280} onChange={setVpWidth} />
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
                <div>
                  <div className="text-[10px] text-green-600 font-bold mb-1">50vw = {Math.round(vpWidth * 0.5)}px (50% of {vpWidth}px viewport)</div>
                  <div className="h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-green-500 transition-all duration-300"
                    style={{ width: `${Math.min((vpWidth * 0.5 / 560) * 100, 100)}%` }}>
                    50vw
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-teal-600 font-bold mb-1">100vh = កម្ពស់ពេញអេក្រង់ (ថេរ)</div>
                  <div className="h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-teal-500" style={{ width: "100%" }}>
                    100vh — ពេញ viewport height
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "%" && (
            <>
              <SliderRow label="parent width" value={parentW} min={100} max={540} onChange={setParentW} />
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <div className="rounded-lg border-2 border-dashed border-orange-400 p-3 transition-all duration-200 bg-orange-50 dark:bg-orange-950/20"
                  style={{ width: parentW }}>
                  <div className="text-[10px] text-orange-600 font-bold mb-2">parent: {parentW}px</div>
                  <div className="h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-orange-500 transition-all duration-200"
                    style={{ width: "50%" }}>
                    50% = {Math.round(parentW * 0.5)}px
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            {tab === "px" && <div className="text-blue-600 dark:text-blue-400 font-bold">width: 200px; <span className="text-gray-400 font-sans">/&#42; absolute — ថេរ &#42;/</span></div>}
            {tab === "em/rem" && <div className="text-purple-600 dark:text-purple-400 font-bold space-y-0.5"><div>.el {"{"} font-size: {fontSize}px; width: 10em; {"}"}</div><div>.el {"{"} width: 10rem; {"}"} <span className="text-gray-400 font-sans">/&#42; = 160px &#42;/</span></div></div>}
            {tab === "vw/vh" && <div className="text-green-600 dark:text-green-400 font-bold space-y-0.5"><div>width: 50vw; <span className="text-gray-400 font-sans">/&#42; {Math.round(vpWidth * 0.5)}px &#42;/</span></div><div>height: 100vh;</div></div>}
            {tab === "%" && <div className="text-orange-600 dark:text-orange-400 font-bold">width: 50%; <span className="text-gray-400 font-sans">/&#42; = {Math.round(parentW * 0.5)}px &#42;/</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Clamp Diagram ────────────────────────────────────────────────────────
export function ClampDiagram() {
  const [vpWidth, setVpWidth] = useState(800);
  const [minRem, setMinRem] = useState(1.5);
  const [maxRem, setMaxRem] = useState(3);
  const ROOT_PX = 16;

  const preferred = vpWidth * 0.05; // 5vw in px
  const clamped = Math.min(Math.max(minRem * ROOT_PX, preferred), maxRem * ROOT_PX);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="clamp(min, preferred, max)" badge="bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300" />
        <div className="p-6 space-y-4">
          <SliderRow label="viewport" value={vpWidth} min={320} max={1440} onChange={setVpWidth} />
          <SliderRow label="min (rem)" value={minRem * 10} min={5} max={20} onChange={v => setMinRem(v / 10)} unit="" />
          <SliderRow label="max (rem)" value={maxRem * 10} min={10} max={50} onChange={v => setMaxRem(v / 10)} unit="" />

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center min-h-[80px]">
            <div className="font-bold text-gray-800 dark:text-gray-100 transition-all duration-200 text-center"
              style={{ fontSize: clamped }}>
              Responsive Title
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
            <div className={`rounded-lg p-2 border-2 ${clamped <= minRem * ROOT_PX + 1 ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 font-bold" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
              min<br />{minRem}rem = {Math.round(minRem * ROOT_PX)}px
            </div>
            <div className={`rounded-lg p-2 border-2 ${clamped > minRem * ROOT_PX + 1 && clamped < maxRem * ROOT_PX - 1 ? "border-purple-400 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 font-bold" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
              preferred<br />5vw = {Math.round(preferred)}px
            </div>
            <div className={`rounded-lg p-2 border-2 ${clamped >= maxRem * ROOT_PX - 1 ? "border-red-400 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 font-bold" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
              max<br />{maxRem}rem = {Math.round(maxRem * ROOT_PX)}px
            </div>
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            <div className="text-rose-600 dark:text-rose-400 font-bold">
              font-size: clamp({minRem}rem, 5vw, {maxRem}rem);
              <span className="text-gray-400 font-sans ml-2 text-[10px]">current: {Math.round(clamped)}px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. CSS Variables Diagram ────────────────────────────────────────────────
const PRIMARY_COLORS = [
  { label: "Blue",   value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Green",  value: "#22c55e" },
  { label: "Red",    value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
];

export function CssVariablesDiagram() {
  const [primary, setPrimary] = useState("#3b82f6");
  const [spacing, setSpacing] = useState(16);
  const [radius, setRadius] = useState(8);
  const [dark, setDark] = useState(false);

  const bg = dark ? "#1f2937" : "#ffffff";
  const text = dark ? "#f9fafb" : "#111827";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="CSS Variables (Custom Properties)" badge="bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-24 shrink-0">--primary</span>
              <div className="flex gap-1.5">
                {PRIMARY_COLORS.map(c => (
                  <button key={c.value} onClick={() => setPrimary(c.value)} title={c.label}
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform ${primary === c.value ? "scale-125 border-white ring-2" : "border-transparent"}`}
                    style={{ background: c.value }} />
                ))}
              </div>
            </div>
            <SliderRow label="--spacing" value={spacing} min={4} max={40} onChange={setSpacing} />
            <SliderRow label="--radius" value={radius} min={0} max={24} onChange={setRadius} />
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-24 shrink-0">--bg-color</span>
              <button onClick={() => setDark(!dark)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold border-2 cursor-pointer transition-all ${dark ? "bg-gray-800 border-transparent text-white" : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                {dark ? "🌙 dark" : "☀️ light"}
              </button>
            </div>
          </div>

          {/* Live preview */}
          <div className="space-y-3">
            {/* Button preview */}
            <button className="font-semibold text-white text-sm transition-all duration-200"
              style={{ background: primary, padding: `${spacing * 0.5}px ${spacing}px`, borderRadius: radius, border: "none", cursor: "default" }}>
              Primary Button
            </button>

            {/* Card preview */}
            <div className="border transition-all duration-200 text-sm"
              style={{ background: bg, color: text, padding: spacing, borderRadius: radius, borderColor: "#e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div className="font-bold mb-1" style={{ color: primary }}>Card Title</div>
              <div className="text-xs opacity-70">Card content using CSS variables</div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            <div className="text-violet-600 dark:text-violet-400 font-bold space-y-0.5">
              <div>:root {"{"}</div>
              <div className="pl-4">--primary-color: <span style={{ color: primary }}>{primary}</span>;</div>
              <div className="pl-4">--spacing: {spacing}px;</div>
              <div className="pl-4">--radius: {radius}px;</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Gradient Diagram ─────────────────────────────────────────────────────
type GradType = "linear" | "radial" | "conic";

const COLOR_OPTS = ["#3b82f6","#a855f7","#ef4444","#f97316","#22c55e","#eab308","#ec4899","#14b8a6","#ffffff"];

export function GradientDiagram() {
  const [type, setType] = useState<GradType>("linear");
  const [angle, setAngle] = useState(135);
  const [c1, setC1] = useState("#3b82f6");
  const [c2, setC2] = useState("#a855f7");
  const [c3, setC3] = useState("#ef4444");
  const [shape, setShape] = useState<"circle"|"ellipse">("circle");

  const gradient =
    type === "linear" ? `linear-gradient(${angle}deg, ${c1}, ${c2})` :
    type === "radial"  ? `radial-gradient(${shape}, ${c1}, ${c2})` :
    `conic-gradient(from ${angle}deg, ${c1}, ${c2}, ${c3})`;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Gradients" badge="bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Type buttons */}
            <div className="flex gap-2">
              {(["linear","radial","conic"] as GradType[]).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
                    ${type === t ? "bg-pink-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                  {t}
                </button>
              ))}
            </div>

            {(type === "linear" || type === "conic") && (
              <SliderRow label="angle" value={angle} min={0} max={360} onChange={setAngle} unit="deg" />
            )}
            {type === "radial" && (
              <div className="flex gap-2">
                {(["circle","ellipse"] as const).map(s => (
                  <button key={s} onClick={() => setShape(s)}
                    className={`flex-1 px-3 py-1 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
                      ${shape === s ? "bg-pink-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Color pickers */}
            {[["Color 1", c1, setC1], ["Color 2", c2, setC2], ...(type === "conic" ? [["Color 3", c3, setC3]] : [])] .map(([label, val, setter]) => (
              <div key={label as string} className="flex items-center gap-2">
                <span className="text-[11px] text-gray-600 dark:text-gray-400 w-16 shrink-0">{label as string}</span>
                <div className="flex flex-wrap gap-1">
                  {COLOR_OPTS.map(c => (
                    <button key={c} onClick={() => (setter as (v: string) => void)(c)}
                      className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-transform ${val === c ? "scale-125 border-gray-800 dark:border-white" : "border-transparent"}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <div className="rounded-xl transition-all duration-300" style={{ background: gradient, minHeight: 160 }} />
            <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
              <div className="text-pink-600 dark:text-pink-400 font-bold break-all">background: {gradient};</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. Responsive Image Diagram ─────────────────────────────────────────────
export function ResponsiveImgDiagram() {
  const [fixed, setFixed] = useState(false);
  const [containerW, setContainerW] = useState(300);
  const IMG_NATURAL = 400;
  const overflows = !fixed && containerW < IMG_NATURAL;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Responsive Images" badge="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300" />
        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            <button onClick={() => setFixed(false)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all ${!fixed ? "bg-red-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
              ❌ Without fix
            </button>
            <button onClick={() => setFixed(true)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all ${fixed ? "bg-teal-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
              ✅ With fix
            </button>
          </div>

          <SliderRow label="container" value={containerW} min={100} max={540} onChange={setContainerW} />

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 overflow-hidden">
            <div className="text-[10px] text-gray-500 mb-2">Container: {containerW}px {overflows ? "⚠️ image ហៀរ!" : "✅ ស្អាត"}</div>
            <div className="border-2 border-dashed border-gray-400 rounded-lg overflow-hidden transition-all duration-200" style={{ width: containerW }}>
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold transition-all duration-200"
                style={{
                  width: fixed ? "100%" : IMG_NATURAL,
                  height: fixed ? Math.round((containerW / IMG_NATURAL) * 120) : 120,
                  maxWidth: fixed ? "100%" : "none",
                }}>
                🖼️ Image ({IMG_NATURAL}px natural)
              </div>
            </div>
            {overflows && (
              <div className="text-[10px] text-red-500 font-bold mt-1">↑ image ហៀរ {IMG_NATURAL - containerW}px ចេញពី container!</div>
            )}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            {fixed ? (
              <div className="text-teal-600 dark:text-teal-400 font-bold space-y-0.5">
                <div>img {"{"}</div>
                <div className="pl-4">max-width: 100%; <span className="text-gray-400 font-sans">/&#42; ✅ មិនហៀរ &#42;/</span></div>
                <div className="pl-4">height: auto; <span className="text-gray-400 font-sans">/&#42; ✅ ratio &#42;/</span></div>
                <div>{"}"}</div>
              </div>
            ) : (
              <div className="text-red-600 dark:text-red-400 font-bold space-y-0.5">
                <div>img {"{"}</div>
                <div className="pl-4 line-through opacity-60">max-width: 100%;</div>
                <div className="pl-4"><span className="text-gray-400 font-sans">/&#42; ❌ គ្មានការការពារ — ហៀរ! &#42;/</span></div>
                <div>{"}"}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
