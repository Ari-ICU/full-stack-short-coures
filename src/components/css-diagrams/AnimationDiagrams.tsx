"use client";

import { useState, useEffect, useRef } from "react";

function SliderRow({ label, value, min, max, onChange, unit = "px", step = 1 }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; unit?: string; step?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-24 shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-blue-500 cursor-pointer h-1.5" />
      <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 w-16 text-right shrink-0">
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

// ─── 1. Transition Diagram ───────────────────────────────────────────────────
const EASING_OPTIONS = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];

export function TransitionDiagram() {
  const [duration, setDuration] = useState(0.3);
  const [easing, setEasing] = useState("ease-in-out");
  const [property, setProperty] = useState<"all" | "background-color" | "transform" | "opacity">("all");
  const [hovered, setHovered] = useState(false);

  const transition = `${property} ${duration}s ${easing}`;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="transition" badge="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <SliderRow label="duration" value={duration * 10} min={1} max={20} onChange={v => setDuration(v / 10)} unit="s" step={1} />

            <div>
              <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-2">timing-function</div>
              <div className="flex flex-wrap gap-1.5">
                {EASING_OPTIONS.map(e => (
                  <button key={e} onClick={() => setEasing(e)}
                    className={`px-2 py-1 rounded text-[10px] font-bold border cursor-pointer transition-all
                      ${easing === e ? "bg-blue-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-2">property</div>
              <div className="flex flex-wrap gap-1.5">
                {(["all", "background-color", "transform", "opacity"] as const).map(p => (
                  <button key={p} onClick={() => setProperty(p)}
                    className={`px-2 py-1 rounded text-[10px] font-bold border cursor-pointer transition-all
                      ${property === p ? "bg-purple-600 border-transparent text-white" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="font-semibold text-sm cursor-pointer select-none"
              style={{
                transition,
                background: hovered ? "#ef4444" : "#3b82f6",
                color: "white",
                padding: "12px 28px",
                borderRadius: 8,
                border: "none",
                transform: hovered ? "scale(1.08) translateY(-3px)" : "scale(1) translateY(0)",
                opacity: hovered ? 1 : 0.85,
                boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {hovered ? "🎉 Hover!" : "Hover me"}
            </button>
            <div className="text-[10px] text-gray-500 dark:text-gray-400">👆 hover the button to see transition</div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold space-y-0.5">
              <div>.btn {"{"}</div>
              <div className="pl-4">transition: <span className="text-purple-600 dark:text-purple-400">{transition}</span>;</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Transform Diagram ────────────────────────────────────────────────────
export function TransformDiagram() {
  const [translateX, setTX] = useState(0);
  const [translateY, setTY] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [skewX, setSkewX] = useState(0);

  const parts: string[] = [];
  if (translateX !== 0 || translateY !== 0) parts.push(`translate(${translateX}px, ${translateY}px)`);
  if (scale !== 1) parts.push(`scale(${scale})`);
  if (rotate !== 0) parts.push(`rotate(${rotate}deg)`);
  if (skewX !== 0) parts.push(`skewX(${skewX}deg)`);
  const transform = parts.length ? parts.join(" ") : "none";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="transform" badge="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-3">
            <SliderRow label="translateX" value={translateX} min={-80} max={80} onChange={setTX} />
            <SliderRow label="translateY" value={translateY} min={-60} max={60} onChange={setTY} />
            <SliderRow label="scale" value={Math.round(scale * 10)} min={3} max={25} onChange={v => setScale(v / 10)} unit="x" />
            <SliderRow label="rotate" value={rotate} min={-180} max={180} onChange={setRotate} unit="deg" />
            <SliderRow label="skewX" value={skewX} min={-40} max={40} onChange={setSkewX} unit="deg" />
            <button onClick={() => { setTX(0); setTY(0); setScale(1); setRotate(0); setSkewX(0); }}
              className="w-full px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-gray-300 dark:border-gray-600 text-gray-500 bg-white dark:bg-gray-800 cursor-pointer">
              ✕ reset
            </button>
          </div>

          {/* Preview */}
          <div className="relative bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center overflow-visible" style={{ height: 200 }}>
            {/* Origin marker */}
            <div className="absolute w-1 h-1 bg-gray-400 rounded-full" style={{ top: "50%", left: "50%" }} />
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-white text-sm transition-all duration-200"
              style={{ background: "#a855f7", transform, transformOrigin: "center" }}>
              Box
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            <div className="text-purple-600 dark:text-purple-400 font-bold break-all">
              transform: {transform};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Keyframes Animation Diagram ─────────────────────────────────────────
const ANIMATION_PRESETS = [
  {
    name: "fade-in-up",
    label: "Fade In Up",
    css: `@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
    style: "fadeInUp 1s ease-out forwards",
    keyframes: `@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
  },
  {
    name: "spin",
    label: "Spin",
    css: `@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`,
    style: "spin 1s linear infinite",
    keyframes: `@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`,
  },
  {
    name: "pulse",
    label: "Pulse",
    css: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.1); }
}`,
    style: "pulse 1.2s ease-in-out infinite",
    keyframes: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.1); }
}`,
  },
  {
    name: "bounce",
    label: "Bounce",
    css: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}`,
    style: "bounce 0.8s ease-in-out infinite",
    keyframes: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}`,
  },
];

export function KeyframesDiagram() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const preset = ANIMATION_PRESETS[selected];

  const replay = () => { setKey(k => k + 1); setPlaying(true); };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <style>{ANIMATION_PRESETS.map(p => p.keyframes).join("\n")}</style>
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="@keyframes animation" badge="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300" />
        <div className="p-6 space-y-4">
          {/* Preset buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ANIMATION_PRESETS.map((p, i) => (
              <button key={p.name} onClick={() => { setSelected(i); replay(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
                  ${selected === i ? "bg-green-600 border-transparent text-white shadow-md" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl flex flex-col items-center justify-center gap-3 p-6" style={{ minHeight: 140 }}>
              <div
                key={key}
                className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #14b8a6)",
                  animation: playing ? preset.style : "none",
                }}
              >
                ✨
              </div>
              <button onClick={replay}
                className="text-[10px] font-semibold px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 cursor-pointer">
                ▶ Replay
              </button>
            </div>

            {/* Keyframes code */}
            <div className="bg-gray-900 rounded-xl p-3 text-[11px] font-mono text-green-400 overflow-auto">
              <div className="text-gray-500 text-[10px] mb-1">@keyframes</div>
              <pre className="whitespace-pre-wrap">{preset.css}</pre>
            </div>
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            <div className="text-green-600 dark:text-green-400 font-bold">
              animation: {preset.style};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Combined Transition + Transform Demo ─────────────────────────────────
export function TransitionTransformDiagram() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    { id: 0, label: "Hover Lift", color: "#3b82f6", hoverStyle: { transform: "translateY(-8px) scale(1.02)", boxShadow: "0 16px 40px rgba(59,130,246,0.3)" } },
    { id: 1, label: "Hover Rotate", color: "#a855f7", hoverStyle: { transform: "rotate(3deg) scale(1.05)", boxShadow: "0 12px 32px rgba(168,85,247,0.3)" } },
    { id: 2, label: "Hover Glow", color: "#22c55e", hoverStyle: { transform: "scale(1.04)", boxShadow: "0 0 32px rgba(34,197,94,0.5)", filter: "brightness(1.1)" } },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="transition + transform combined" badge="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300" />
        <div className="p-6 space-y-4">
          <div className="text-xs text-gray-600 dark:text-gray-400">👆 hover each card to see different transition + transform effects</div>
          <div className="grid grid-cols-3 gap-4">
            {cards.map(card => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer"
                style={{
                  background: card.color,
                  color: "white",
                  minHeight: 100,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease",
                  ...(hoveredCard === card.id ? card.hoverStyle : { transform: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }),
                }}
              >
                <span className="text-xl">🎨</span>
                <span className="text-xs font-bold text-center">{card.label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-1 font-bold">Live CSS</div>
            {hoveredCard !== null ? (
              <div className="text-orange-600 dark:text-orange-400 font-bold space-y-0.5">
                <div>.card {"{"} transition: transform 0.25s ease, box-shadow 0.25s ease; {"}"}</div>
                <div>.card:hover {"{"}</div>
                {Object.entries(cards[hoveredCard].hoverStyle).map(([k, v]) => (
                  <div key={k} className="pl-4">{k}: {v};</div>
                ))}
                <div>{"}"}</div>
              </div>
            ) : (
              <div className="text-gray-400 font-sans">👆 hover a card to see its CSS</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
