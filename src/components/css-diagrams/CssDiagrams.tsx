"use client";

import { useState } from "react";
import {
  CssUnitsDiagram,
  ClampDiagram,
  CssVariablesDiagram,
  GradientDiagram,
  ResponsiveImgDiagram,
} from "./ModernCssDiagrams";
import {
  TransitionDiagram,
  TransformDiagram,
  KeyframesDiagram,
  TransitionTransformDiagram,
} from "./AnimationDiagrams";

// ─── Box Model Diagram ────────────────────────────────────────────────────────
export function BoxModelDiagram() {
  return (
    <div className="not-prose my-8 flex justify-center">
      <div className="relative font-sans text-xs font-semibold select-none">
        {/* MARGIN */}
        <div className="bg-yellow-100 border-2 border-dashed border-yellow-400 rounded-xl p-1">
          <div className="text-yellow-700 text-center py-1 px-3 tracking-wide text-[11px] uppercase">
            Margin — គម្លាតខាងក្រៅ
          </div>
          {/* BORDER */}
          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-1">
            <div className="text-red-700 text-center py-1 px-3 tracking-wide text-[11px] uppercase">
              Border — ស៊ុម
            </div>
            {/* PADDING */}
            <div className="bg-green-100 border-2 border-green-400 rounded-md p-1">
              <div className="text-green-700 text-center py-1 px-3 tracking-wide text-[11px] uppercase">
                Padding — គម្លាតខាងក្នុង
              </div>
              {/* CONTENT */}
              <div className="bg-blue-200 border-2 border-blue-500 rounded px-16 py-6 text-center">
                <span className="text-blue-800 font-bold text-sm">CONTENT</span>
                <br />
                <span className="text-blue-600 text-xs font-normal">width × height</span>
              </div>
              <div className="text-green-700 text-center py-1 px-3 tracking-wide text-[11px] uppercase">
                Padding — គម្លាតខាងក្នុង
              </div>
            </div>
            <div className="text-red-700 text-center py-1 px-3 tracking-wide text-[11px] uppercase">
              Border — ស៊ុម
            </div>
          </div>
          <div className="text-yellow-700 text-center py-1 px-3 tracking-wide text-[11px] uppercase">
            Margin — គម្លាតខាងក្រៅ
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Box Sizing Diagram ───────────────────────────────────────────────────────
export function BoxSizingDiagram() {
  return (
    <div className="not-prose my-8 grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs">
      {/* content-box */}
      <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4">
        <div className="text-red-600 dark:text-red-400 font-bold text-sm mb-3 flex items-center gap-1">
          ❌ <code className="bg-red-100 dark:bg-red-900/40 px-1 rounded">content-box</code>
          <span className="font-normal">(លំនាំដើម)</span>
        </div>
        <div className="relative bg-yellow-100 dark:bg-yellow-900/30 border-2 border-dashed border-yellow-400 p-3 rounded-lg mb-2">
          <span className="absolute -top-2 left-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 text-[10px] px-1">margin: 10px</span>
          <div className="bg-red-200 dark:bg-red-900/40 border-2 border-red-400 p-2 rounded-md">
            <span className="text-red-700 dark:text-red-400 text-[10px]">border: 5px</span>
            <div className="bg-green-200 dark:bg-green-900/40 border border-green-400 p-2 rounded mt-1">
              <span className="text-green-700 dark:text-green-400 text-[10px]">padding: 20px</span>
              <div className="bg-blue-300 dark:bg-blue-800 border border-blue-500 px-4 py-3 rounded mt-1 text-center">
                <span className="text-blue-800 dark:text-blue-200 font-bold text-[11px]">200px content</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-red-700 dark:text-red-400 space-y-0.5 text-[11px]">
          <div>content: 200px</div>
          <div>+ padding: 20×2 = <strong>+40px</strong></div>
          <div>+ border: 5×2 = <strong>+10px</strong></div>
          <div className="border-t border-red-300 mt-1 pt-1 font-bold">សរុប = 250px ⚠️</div>
        </div>
      </div>

      {/* border-box */}
      <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 p-4">
        <div className="text-green-600 dark:text-green-400 font-bold text-sm mb-3 flex items-center gap-1">
          ✅ <code className="bg-green-100 dark:bg-green-900/40 px-1 rounded">border-box</code>
          <span className="font-normal">(ល្អបំផុត!)</span>
        </div>
        <div className="relative bg-yellow-100 dark:bg-yellow-900/30 border-2 border-dashed border-yellow-400 p-3 rounded-lg mb-2">
          <span className="absolute -top-2 left-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 text-[10px] px-1">margin: 10px</span>
          <div className="bg-red-200 dark:bg-red-900/40 border-2 border-red-400 p-2 rounded-md">
            <span className="text-red-700 dark:text-red-400 text-[10px]">border: 5px</span>
            <div className="bg-green-200 dark:bg-green-900/40 border border-green-400 p-2 rounded mt-1">
              <span className="text-green-700 dark:text-green-400 text-[10px]">padding: 20px</span>
              <div className="bg-blue-300 dark:bg-blue-800 border border-blue-500 px-2 py-3 rounded mt-1 text-center">
                <span className="text-blue-800 dark:text-blue-200 font-bold text-[11px]">content តូចជាង</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-green-700 dark:text-green-400 space-y-0.5 text-[11px]">
          <div>width ប្រកាស: 200px</div>
          <div>padding + border <strong>បញ្ចូលរួច</strong></div>
          <div>content = 200 - 40 - 10 = 150px</div>
          <div className="border-t border-green-300 mt-1 pt-1 font-bold">សរុប = 200px ✅</div>
        </div>
      </div>
    </div>
  );
}

// ─── Padding Directions Diagram ───────────────────────────────────────────────
type PaddingSide = "top" | "right" | "bottom" | "left" | null;

const PADDING_SIDES = [
  { id: "top"    as const, label: "padding-top",    activeColor: "#16a34a", activeBg: "rgba(34,197,94,0.2)",   btn: "bg-green-600",  text: "text-green-600 dark:text-green-400"  },
  { id: "right"  as const, label: "padding-right",  activeColor: "#2563eb", activeBg: "rgba(59,130,246,0.2)",  btn: "bg-blue-600",   text: "text-blue-600 dark:text-blue-400"    },
  { id: "bottom" as const, label: "padding-bottom", activeColor: "#ea580c", activeBg: "rgba(249,115,22,0.2)",  btn: "bg-orange-600", text: "text-orange-600 dark:text-orange-400"},
  { id: "left"   as const, label: "padding-left",   activeColor: "#9333ea", activeBg: "rgba(168,85,247,0.2)",  btn: "bg-purple-600", text: "text-purple-600 dark:text-purple-400"},
];

const BASE = 20;
const ACTIVE = 44;

export function PaddingDiagram() {
  const [active, setActive] = useState<PaddingSide>(null);

  const p = (side: "top" | "right" | "bottom" | "left") => active === side ? ACTIVE : BASE;
  const activeSide   = PADDING_SIDES.find((s) => s.id === active);
  const activeColor  = activeSide?.activeColor ?? "#9ca3af";
  const activeBgOf   = (side: "top" | "right" | "bottom" | "left") =>
    active === side ? (activeSide?.activeBg ?? "transparent") : "transparent";
  const labelClass   = (side: "top" | "right" | "bottom" | "left") =>
    active === side ? (activeSide?.text ?? "") : "text-gray-700 dark:text-gray-300";

  return (
    <div className="not-prose my-8 font-sans select-none">

      {/* ── Buttons ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {PADDING_SIDES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${active === s.id
                ? `${s.btn} border-transparent text-white shadow-md scale-105`
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
              }`}
          >
            {s.label}
          </button>
        ))}
        {active && (
          <button
            onClick={() => setActive(null)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-500 bg-white dark:bg-gray-800 cursor-pointer"
          >
            ✕ reset
          </button>
        )}
      </div>

      {/* ── Visual box ── */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-0 w-full max-w-2xl">
          <span className={`text-[11px] font-semibold mb-1 transition-colors duration-300 ${labelClass("top")}`}>
            ↑ padding-top: {p("top")}px
          </span>

          <div className="flex items-center w-full gap-0">
            {/* Left label */}
            <span className={`text-[11px] font-semibold w-20 text-right mr-2 shrink-0 transition-colors duration-300 ${labelClass("left")}`}>
              ← {p("left")}px
            </span>

            {/* The box itself — padding zones rendered as flex layout */}
            <div
              className="flex-1 border-2 border-gray-400 dark:border-gray-500 rounded-xl overflow-hidden transition-all duration-300"
              style={{ background: "#f9fafb", minWidth: 0 }}
            >
              {/* TOP padding zone */}
              <div
                className="w-full transition-all duration-300 flex items-center justify-center"
                style={{
                  height: p("top"),
                  background: activeBgOf("top"),
                }}
              >
                {active === "top" && (
                  <span style={{ color: activeColor }} className="text-[10px] font-bold">{p("top")}px</span>
                )}
              </div>

              {/* MIDDLE row: left zone + content + right zone */}
              <div className="flex min-w-0">
                {/* LEFT padding zone */}
                <div
                  className="shrink-0 transition-all duration-300 flex items-center justify-center"
                  style={{
                    width: p("left"),
                    minWidth: p("left"),
                    background: activeBgOf("left"),
                  }}
                >
                  {active === "left" && (
                    <span style={{ color: activeColor }} className="text-[10px] font-bold">{p("left")}px</span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0 bg-blue-200 dark:bg-blue-800 border-2 border-blue-500 rounded-lg flex items-center justify-center py-6">
                  <span className="text-blue-800 dark:text-blue-200 font-bold text-sm">CONTENT</span>
                </div>

                {/* RIGHT padding zone */}
                <div
                  className="shrink-0 transition-all duration-300 flex items-center justify-center"
                  style={{
                    width: p("right"),
                    minWidth: p("right"),
                    background: activeBgOf("right"),
                  }}
                >
                  {active === "right" && (
                    <span style={{ color: activeColor }} className="text-[10px] font-bold">{p("right")}px</span>
                  )}
                </div>
              </div>

              {/* BOTTOM padding zone */}
              <div
                className="w-full transition-all duration-300 flex items-center justify-center"
                style={{
                  height: p("bottom"),
                  background: activeBgOf("bottom"),
                }}
              >
                {active === "bottom" && (
                  <span style={{ color: activeColor }} className="text-[10px] font-bold">{p("bottom")}px</span>
                )}
              </div>
            </div>

            {/* Right label */}
            <span className={`text-[11px] font-semibold w-20 ml-2 shrink-0 transition-colors duration-300 ${labelClass("right")}`}>
              {p("right")}px →
            </span>
          </div>

          {/* Bottom label */}
          <span className={`text-[11px] font-semibold mt-1 transition-colors duration-300 ${labelClass("bottom")}`}>
            ↓ padding-bottom: {p("bottom")}px
          </span>
        </div>
      </div>

      {/* ── Live CSS panel ── */}
      <div className="mt-5 mx-auto max-w-xs rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono transition-all duration-300">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
        {active && activeSide ? (
          <div style={{ color: activeColor }} className="font-bold">
            {activeSide.label}: {p(active)}px;
          </div>
        ) : (
          <div className="text-gray-800 dark:text-gray-200 space-y-0.5">
            <div>padding-top:    {BASE}px;</div>
            <div>padding-right:  {BASE}px;</div>
            <div>padding-bottom: {BASE}px;</div>
            <div>padding-left:   {BASE}px;</div>
            <div className="text-gray-700 dark:text-gray-300 text-[10px] font-sans mt-1">👆 click a side to see it change</div>
          </div>
        )}
      </div>

      {/* Shorthand note */}
      <div className="mt-3 text-center text-[11px] text-gray-700 dark:text-gray-300">
        <code>padding: top right bottom left</code> &nbsp;·&nbsp; 🕐 ↑ → ↓ ←
      </div>
    </div>
  );
}

// ─── Margin Diagram ───────────────────────────────────────────────────────────
type MarginSide = "top" | "right" | "bottom" | "left" | null;

const MARGIN_SIDES = [
  { id: "top"    as const, label: "margin-top",    activeColor: "#16a34a", activeBg: "rgba(34,197,94,0.25)",  btn: "bg-green-600",  text: "text-green-600 dark:text-green-400"  },
  { id: "right"  as const, label: "margin-right",  activeColor: "#2563eb", activeBg: "rgba(59,130,246,0.25)", btn: "bg-blue-600",   text: "text-blue-600 dark:text-blue-400"    },
  { id: "bottom" as const, label: "margin-bottom", activeColor: "#ea580c", activeBg: "rgba(249,115,22,0.25)", btn: "bg-orange-600", text: "text-orange-600 dark:text-orange-400"},
  { id: "left"   as const, label: "margin-left",   activeColor: "#9333ea", activeBg: "rgba(168,85,247,0.25)", btn: "bg-purple-600", text: "text-purple-600 dark:text-purple-400"},
];

const M_BASE = 20;
const M_ACTIVE = 52;

export function MarginCollapseDiagram() {
  const [active, setActive] = useState<MarginSide>(null);

  const m       = (side: "top" | "right" | "bottom" | "left") => active === side ? M_ACTIVE : M_BASE;
  const activeSide  = MARGIN_SIDES.find((s) => s.id === active);
  const activeColor = activeSide?.activeColor ?? "#9ca3af";
  const activeBgOf  = (side: "top" | "right" | "bottom" | "left") =>
    active === side ? (activeSide?.activeBg ?? "transparent") : "transparent";
  const labelClass  = (side: "top" | "right" | "bottom" | "left") =>
    active === side ? (activeSide?.text ?? "") : "text-gray-700 dark:text-gray-300";

  return (
    <div className="not-prose my-8 font-sans select-none">

      {/* ── Buttons ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {MARGIN_SIDES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${active === s.id
                ? `${s.btn} border-transparent text-white shadow-md scale-105`
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
              }`}
          >
            {s.label}
          </button>
        ))}
        {active && (
          <button
            onClick={() => setActive(null)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-500 bg-white dark:bg-gray-800 cursor-pointer"
          >
            ✕ reset
          </button>
        )}
      </div>

      {/* ── Visual: two elements with margin space between/around ── */}
      <div className="w-full max-w-2xl mx-auto">

        {/* Neighbour element above */}
        {(active === "top" || active === null) && (
          <div className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-center mb-0">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Element ខាងលើ (neighbor)</span>
          </div>
        )}

        {/* TOP margin zone */}
        <div
          className="w-full transition-all duration-300 flex items-center justify-center"
          style={{ height: m("top"), background: activeBgOf("top") }}
        >
          <span className={`text-[11px] font-semibold transition-colors duration-300 ${labelClass("top")}`}>
            {active === "top"
              ? <span style={{ color: activeColor }}>↕ margin-top: {m("top")}px</span>
              : `↕ margin-top: ${m("top")}px`}
          </span>
        </div>

        {/* Main element row: left margin + element + right margin */}
        <div className="flex min-w-0">
          {/* LEFT margin zone */}
          <div
            className="shrink-0 transition-all duration-300 flex items-center justify-center"
            style={{ width: m("left"), minWidth: m("left"), background: activeBgOf("left") }}
          >
            {active === "left" && (
              <span style={{ color: activeColor, writingMode: "vertical-rl" }} className="text-[10px] font-bold">
                {m("left")}px
              </span>
            )}
          </div>

          {/* THE ELEMENT — solid box with border */}
          <div className="flex-1 min-w-0 bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center py-8 gap-1">
            <span className="text-blue-800 dark:text-blue-200 font-bold text-base">ELEMENT</span>
            <span className="text-blue-500 dark:text-blue-400 text-[10px]">border: 2px solid</span>
          </div>

          {/* RIGHT margin zone */}
          <div
            className="shrink-0 transition-all duration-300 flex items-center justify-center"
            style={{ width: m("right"), minWidth: m("right"), background: activeBgOf("right") }}
          >
            {active === "right" && (
              <span style={{ color: activeColor, writingMode: "vertical-rl" }} className="text-[10px] font-bold">
                {m("right")}px
              </span>
            )}
          </div>
        </div>

        {/* Left / Right labels */}
        <div className="flex justify-between text-[11px] font-semibold mt-1 px-0">
          <span className={`transition-colors duration-300 ${labelClass("left")}`}>← margin-left: {m("left")}px</span>
          <span className={`transition-colors duration-300 ${labelClass("right")}`}>margin-right: {m("right")}px →</span>
        </div>

        {/* BOTTOM margin zone */}
        <div
          className="w-full transition-all duration-300 flex items-center justify-center mt-0"
          style={{ height: m("bottom"), background: activeBgOf("bottom") }}
        >
          <span className={`text-[11px] font-semibold transition-colors duration-300 ${labelClass("bottom")}`}>
            {active === "bottom"
              ? <span style={{ color: activeColor }}>↕ margin-bottom: {m("bottom")}px</span>
              : `↕ margin-bottom: ${m("bottom")}px`}
          </span>
        </div>

        {/* Neighbour element below */}
        {(active === "bottom" || active === null) && (
          <div className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-center mt-0">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Element ខាងក្រោម (neighbor)</span>
          </div>
        )}

        {/* Key difference callout */}
        <div className="mt-4 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-3 text-xs text-orange-800 dark:text-orange-300">
          <span className="font-bold">⚠️ ភាពខុសពី Padding:</span> Margin គឺ <strong>ខាងក្រៅ border</strong> — វាជាចំងាយរវាង Element នេះ និង Elements ផ្សេងទៀត។ Background color <strong>មិន</strong>គ្របលើ Margin ទេ។
        </div>
      </div>

      {/* ── Live CSS panel ── */}
      <div className="mt-5 mx-auto max-w-xs rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono transition-all duration-300">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
        {active && activeSide ? (
          <div style={{ color: activeColor }} className="font-bold">
            {activeSide.label}: {m(active)}px;
          </div>
        ) : (
          <div className="text-gray-800 dark:text-gray-200 space-y-0.5">
            <div>margin-top:    {M_BASE}px;</div>
            <div>margin-right:  {M_BASE}px;</div>
            <div>margin-bottom: {M_BASE}px;</div>
            <div>margin-left:   {M_BASE}px;</div>
            <div className="text-gray-700 dark:text-gray-300 text-[10px] font-sans mt-1">👆 click a side to see it change</div>
          </div>
        )}
      </div>

      {/* Shorthand note */}
      <div className="mt-3 text-center text-[11px] text-gray-700 dark:text-gray-300">
        <code>margin: top right bottom left</code> &nbsp;·&nbsp; 🕐 ↑ → ↓ ←
      </div>
    </div>
  );
}

// ─── Display Diagram (interactive) ───────────────────────────────────────────
type DisplayValue = "block" | "inline" | "inline-block" | "none";

const DISPLAY_OPTIONS: {
  id: DisplayValue;
  label: string;
  color: string;
  btnBg: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  badge: string;
  note: string;
}[] = [
  {
    id: "block",
    label: "display: block",
    color: "#2563eb",
    btnBg: "bg-blue-600",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-200 dark:bg-blue-800",
    textColor: "text-blue-900 dark:text-blue-100",
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
    note: "ចាប់ 100% width · ចុះបន្ទាត់ថ្មី · អាចកំណត់ width/height",
  },
  {
    id: "inline",
    label: "display: inline",
    color: "#ca8a04",
    btnBg: "bg-yellow-600",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    textColor: "text-yellow-900 dark:text-yellow-100",
    badge: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
    note: "ស្ថិតនៅ row · width/height ❌ មិនដំណើរការ · ទំហំតាម content",
  },
  {
    id: "inline-block",
    label: "display: inline-block",
    color: "#16a34a",
    btnBg: "bg-green-600",
    borderColor: "border-green-400",
    bgColor: "bg-green-200 dark:bg-green-800",
    textColor: "text-green-900 dark:text-green-100",
    badge: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
    note: "ស្ថិតនៅ row · width/height ✅ ដំណើរការ · ល្អសម្រាប់ button",
  },
  {
    id: "none",
    label: "display: none",
    color: "#6b7280",
    btnBg: "bg-gray-500",
    borderColor: "border-gray-400",
    bgColor: "bg-gray-200 dark:bg-gray-700",
    textColor: "text-gray-600 dark:text-gray-300",
    badge: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    note: "🚫 លាក់ Element — គ្មានទំហំ · Elements ផ្សេងបូកគ្នាដូចជាវាគ្មាន",
  },
];

export function DisplayDiagram() {
  const [active, setActive] = useState<DisplayValue>("block");
  const [count, setCount] = useState(3);
  const opt = DISPLAY_OPTIONS.find((o) => o.id === active)!;

  const KHMER_NUMS = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨"];
  const items = Array.from({ length: count }, (_, i) => `Element ${KHMER_NUMS[i]}`);

  return (
    <div className="not-prose my-8 font-sans select-none">

      {/* ── Display buttons ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {DISPLAY_OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => setActive(o.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${active === o.id
                ? `${o.btnBg} border-transparent text-white shadow-md scale-105`
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
              }`}
          >
            {o.id}
          </button>
        ))}
      </div>

      {/* ── Live preview panel ── */}
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">

        {/* Header with add/remove */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <code className={`text-xs font-bold px-2 py-0.5 rounded ${opt.badge}`}>
              {opt.label}
            </code>
          </div>
          {/* Add / Remove element buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 mr-1">Elements:</span>
            <button
              onClick={() => setCount(c => Math.max(1, c - 1))}
              disabled={count <= 1}
              className="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 text-sm font-bold flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >−</button>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-4 text-center">{count}</span>
            <button
              onClick={() => setCount(c => Math.min(8, c + 1))}
              disabled={count >= 8}
              className="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 text-sm font-bold flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >+</button>
          </div>
        </div>

        {/* Live demo area */}
        <div className="p-6 min-h-[120px]">
          {active === "block" && (
            <div className="space-y-2 w-full">
              {items.map((item) => (
                <div
                  key={item}
                  className={`${opt.bgColor} ${opt.borderColor} ${opt.textColor} border-2 rounded-lg px-4 py-2.5 w-full font-semibold text-sm text-center transition-all duration-200`}
                >
                  {item} <span className="text-[10px] font-normal opacity-70">(width: 100%)</span>
                </div>
              ))}
            </div>
          )}

          {active === "inline" && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 font-sans">
                  CSS: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">width: 120px; height: 60px;</code>
                  <span className="text-red-500 ml-2 font-bold">← ដាក់ហើយ ប៉ុន្តែ មិនដំណើរការ!</span>
                </div>
                <div className="leading-loose bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 text-xs mr-1">អក្សរ</span>
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`${opt.bgColor} ${opt.borderColor} ${opt.textColor} border-2 rounded font-semibold text-xs mx-0.5 px-2 py-1`}
                      style={{ display: "inline", width: 120, height: 60 }}
                    >
                      {item}
                    </span>
                  ))}
                  <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">អក្សរ</span>
                </div>
                <div className="mt-2 text-[11px] text-red-600 dark:text-red-400 font-medium">
                  ❌ Elements តូចតែប៉ុន content — width 120px / height 60px ត្រូវបានមិនអើពើ
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-xs text-red-700 dark:text-red-400">
                <div className="font-bold mb-1">inline Elements មិនអើពើ:</div>
                <div className="space-y-0.5 font-mono">
                  <div>width: 120px;  <span className="line-through opacity-60">← ignored</span></div>
                  <div>height: 60px;  <span className="line-through opacity-60">← ignored</span></div>
                  <div>margin-top/bottom: 10px; <span className="line-through opacity-60">← ignored</span></div>
                </div>
              </div>
            </div>
          )}

          {active === "inline-block" && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 font-sans">
                  CSS: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">width: 120px; height: 60px;</code>
                  <span className="text-green-600 ml-2 font-bold">← ដំណើរការ!</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 text-xs mr-1">អក្សរ</span>
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`${opt.bgColor} ${opt.borderColor} ${opt.textColor} border-2 rounded-lg font-semibold text-xs mx-0.5`}
                      style={{ display: "inline-block", width: 120, height: 60, lineHeight: "60px", textAlign: "center" }}
                    >
                      {item}
                    </span>
                  ))}
                  <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">អក្សរ</span>
                </div>
                <div className="mt-2 text-[11px] text-green-700 dark:text-green-400 font-medium">
                  ✅ Elements ទទឹង 120px / កម្ពស់ 60px ជាក់ស្តែង · ស្ថិតនៅ row — wrap ទៅបន្ទាត់ថ្មីនៅពេលគ្មានទំហំ
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-xs text-green-700 dark:text-green-400">
                <div className="font-bold mb-1">inline-block អើពើ (ដូច block):</div>
                <div className="space-y-0.5 font-mono">
                  <div>width: 120px;  ✅</div>
                  <div>height: 60px;  ✅</div>
                  <div>margin-top/bottom: 10px; ✅</div>
                  <div className="font-sans text-[10px] mt-1 text-green-600 dark:text-green-500">+ ស្ថិតនៅ row ដូច inline ✅</div>
                </div>
              </div>
            </div>
          )}

          {active === "none" && (
            <div>
              <div className="flex flex-wrap gap-2 items-center">
                {items.map((item, i) => (
                  i === 1 ? (
                    <div key={item} className="flex items-center gap-1">
                      <div
                        className={`${opt.bgColor} ${opt.borderColor} ${opt.textColor} border-2 rounded-lg px-4 py-2.5 font-semibold text-sm line-through opacity-25`}
                        style={{ display: "none" }}
                      >
                        {item}
                      </div>
                      <span className="text-[10px] text-red-500 font-bold italic">[{item} hidden]</span>
                    </div>
                  ) : (
                    <div
                      key={item}
                      className={`${opt.bgColor} ${opt.borderColor} ${opt.textColor} border-2 rounded-lg px-4 py-2.5 font-semibold text-sm`}
                    >
                      {item}
                    </div>
                  )
                ))}
              </div>
              <div className="mt-3 text-[11px] text-red-600 dark:text-red-400 font-medium">
                🚫 Element ២ — display: none · គ្មានទំហំ · Elements ផ្សេងបូកគ្នាជិតជំហានៗ
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Note ── */}
      <div className="mt-4 mx-auto max-w-2xl rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
        <span className="font-bold" style={{ color: opt.color }}>{opt.label}:</span>{" "}
        {opt.note}
      </div>

      {/* ── Live CSS ── */}
      <div className="mt-3 mx-auto max-w-xs rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
        <div className="font-bold" style={{ color: opt.color }}>
          display: {active};
        </div>
      </div>
    </div>
  );
}

// ─── Overflow Diagram (interactive, same style as Display) ───────────────────
type OverflowValue = "visible" | "hidden" | "scroll" | "auto";

const OVERFLOW_OPTIONS: {
  id: OverflowValue;
  color: string;
  btnBg: string;
  badge: string;
  bgColor: string;
  borderColor: string;
  note: string;
}[] = [
  {
    id: "visible",
    color: "#dc2626",
    btnBg: "bg-red-600",
    badge: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-400",
    note: "លំនាំដើម — Content ហៀរចេញខាងក្រៅ border ។ Elements ជិតខាងអាចត្រូវបានគ្របដណ្តប់!",
  },
  {
    id: "hidden",
    color: "#9333ea",
    btnBg: "bg-purple-600",
    badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-400",
    note: "✂️ កាត់ Content ដែលហៀរចេញ — Content ខាងក្រៅប្រអប់ត្រូវបានលាក់ចោល។ ពេញនិយមសម្រាប់ border-radius",
  },
  {
    id: "scroll",
    color: "#ca8a04",
    btnBg: "bg-yellow-600",
    badge: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-400",
    note: "📜 Scrollbar ជានិច្ចកាល — ទោះ Content តូចក៏ Scrollbar នៅតែបង្ហាញ។ Layout ហាក់ ugly ប្រសិនបើ content ស",
  },
  {
    id: "auto",
    color: "#16a34a",
    btnBg: "bg-green-600",
    badge: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-400",
    note: "✅ ល្អបំផុត — Scrollbar លេចតែនៅពេល Content ហៀរ ។ ប្រើ auto ជា default choice",
  },
];

const LONG_CONTENT = "Lorem ipsum dolor sit amet consectetur. CSS overflow គ្រប់គ្រងការបង្ហាញ Content ដែលហៀរ។ ខ្ញុំជា Content វែងជាងប្រអប់ ហើយ CSS ត្រូវសម្រេចថានឹងធ្វើអ្វី។";
const SHORT_CONTENT = "ខ្ញុំតូច";

export function OverflowDiagram() {
  const [active, setActive] = useState<OverflowValue>("visible");
  const [showLong, setShowLong] = useState(true);
  const opt = OVERFLOW_OPTIONS.find((o) => o.id === active)!;

  const LONG = `🌊 CSS Overflow Demo — ខ្ញុំជា Content វែងដែលហៀរចេញក្រៅប្រអប់។

បន្ទាត់ ១: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
បន្ទាត់ ២: CSS overflow គ្រប់គ្រងការបង្ហាញ Content ដែលហៀរ។
បន្ទាត់ ៣: visible = ហៀរចេញ, hidden = កាត់, scroll = scroll ជានិច្ច, auto = scroll ពេលចាំបាច់។
បន្ទាត់ ៤: សាកល្បង scroll ចុះក្រោម ↓ ដើម្បីមើល content ទាំងអស់!
បន្ទាត់ ៥: នេះជាបន្ទាត់ចុងក្រោយ — ហើយអ្នកឃើញ overflow ដំណើរការ!`;

  const SHORT = `✅ ខ្ញុំជា Content ខ្លី — ស តូច ស្អាត!`;

  const content = showLong ? LONG : SHORT;

  return (
    <div className="not-prose my-8 font-sans select-none">

      {/* ── Buttons ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {OVERFLOW_OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => setActive(o.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${active === o.id
                ? `${o.btnBg} border-transparent text-white shadow-md scale-105`
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
              }`}
          >
            {o.id}
          </button>
        ))}
      </div>

      {/* ── Live preview panel ── */}
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-visible">

        {/* Header */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <code className={`text-xs font-bold px-2 py-0.5 rounded ${opt.badge}`}>
              overflow: {active}
            </code>
          </div>
          {/* Content toggle */}
          <button
            onClick={() => setShowLong(!showLong)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 cursor-pointer transition-colors"
          >
            {showLong ? "👉 content ខ្លី" : "👉 content វែង"}
          </button>
        </div>

        {/* Demo area */}
        <div className="p-6">
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 font-sans">
            CSS: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">width: 100%; height: 120px; overflow: {active};</code>
          </div>

          {/* The overflow box — overflow:visible needs a wrapper to not bleed into panel */}
          <div className={active === "visible" ? "relative pb-24" : ""}>
            <div
              className={`${opt.bgColor} border-2 ${opt.borderColor} rounded-lg p-3 text-gray-800 dark:text-gray-200 text-xs leading-relaxed whitespace-pre-line transition-all duration-300`}
              style={{ height: 120, overflow: active }}
            >
              {content}
            </div>
            {active === "visible" && showLong && (
              <div className="absolute left-0 right-0 text-center text-[10px] text-red-500 font-bold mt-1 pointer-events-none">
                ↑ Content ហៀរចេញខាងក្រៅ border!
              </div>
            )}
          </div>

          {/* Visual indicator */}
          <div className="mt-4 flex items-start gap-2 text-xs">
            {active === "visible" && (
              <div className={`flex items-start gap-2 font-medium ${showLong ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}>
                <span className="text-base shrink-0">{showLong ? "⚠️" : "✅"}</span>
                {showLong
                  ? "Content ហៀរចេញខាងក្រៅ border — ប្រើ content ខ្លី ឬ overflow ផ្សេង ដើម្បីជៀសវាង!"
                  : "Content ខ្លី — មិនហៀរ។ សាក content វែង ☝️ ដើម្បីឃើញ visible overflow!"}
              </div>
            )}
            {active === "hidden" && (
              <div className="flex items-start gap-2 text-purple-700 dark:text-purple-400 font-medium">
                <span className="text-base shrink-0">✂️</span>
                {showLong
                  ? "Content ត្រូវបានកាត់ចោលដោយស្ងៀម — ផ្នែកខាងក្រោម hidden ទាំងស្រុង · មិនអាច Scroll បានទេ"
                  : "Content ខ្លី ហើយមិនហៀរ — hidden មិនផ្លាស់ប្តូររូបរាងទេ"}
              </div>
            )}
            {active === "scroll" && (
              <div className="flex items-start gap-2 text-yellow-700 dark:text-yellow-400 font-medium">
                <span className="text-base shrink-0">📜</span>
                {showLong
                  ? "Scrollbar លេចឡើង — Scroll ចុះក្រោម ↓ ដើម្បីអានបន្ត · Scrollbar នៅជានិច្ចទោះ content ខ្លីក៏ដោយ"
                  : "⚠️ Content ខ្លី ប៉ុន្តែ Scrollbar នៅតែបង្ហាញ — layout ហាក់ ugly! ប្រើ auto ជំនួស"}
              </div>
            )}
            {active === "auto" && (
              <div className="flex items-start gap-2 text-green-700 dark:text-green-400 font-medium">
                <span className="text-base shrink-0">✅</span>
                {showLong
                  ? "Scrollbar លេចតែនៅពេល Content ហៀរ — Scroll ចុះ ↓ ដើម្បីអានបន្ត"
                  : "Content ខ្លី → Scrollbar បាត់ (ស្អាត!) · switch ទៅ content វែង ☝️ ដើម្បីឃើញ Scrollbar"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── All 4 values side by side mini preview ── */}
      <div className="mt-5 w-full max-w-2xl mx-auto">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold text-center">ប្រៀបធៀប ៤ values ជាមួយ content វែង</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OVERFLOW_OPTIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => { setActive(o.id); setShowLong(true); }}
              className={`text-left rounded-xl border-2 overflow-hidden transition-all duration-150 cursor-pointer
                ${active === o.id ? "ring-2 ring-offset-1" : "opacity-80 hover:opacity-100"}`}
              style={{ borderColor: o.color, ringColor: o.color } as React.CSSProperties}
            >
              <div className="px-2 py-1 text-[10px] font-bold" style={{ background: o.color + "22", color: o.color }}>
                overflow: {o.id}
              </div>
              <div
                className={`${o.bgColor} text-gray-700 dark:text-gray-300 text-[9px] leading-relaxed p-1.5`}
                style={{ height: 52, overflow: o.id, whiteSpace: "pre-line" }}
              >
                {LONG}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Note ── */}
      <div className="mt-4 mx-auto max-w-2xl rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
        <span className="font-bold" style={{ color: opt.color }}>overflow: {active}:</span>{" "}
        {opt.note}
      </div>

      {/* ── Live CSS ── */}
      <div className="mt-3 mx-auto max-w-xs rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
        <div className="font-bold" style={{ color: opt.color }}>
          overflow: {active};
        </div>
      </div>
    </div>
  );
}

// ─── Box Shadow Diagram (interactive) ────────────────────────────────────────
const SHADOW_PRESETS = [
  { label: "none",   x: 0,  y: 0,  blur: 0,  spread: 0,  opacity: 0,   color: "0,0,0",      inset: false },
  { label: "simple", x: 0,  y: 4,  blur: 10, spread: 0,  opacity: 0.15, color: "0,0,0",     inset: false },
  { label: "lifted", x: 0,  y: 12, blur: 28, spread: 0,  opacity: 0.2,  color: "0,0,0",     inset: false },
  { label: "glow",   x: 0,  y: 0,  blur: 20, spread: 4,  opacity: 0.6,  color: "59,130,246", inset: false },
  { label: "inset",  x: 0,  y: 3,  blur: 8,  spread: 0,  opacity: 0.2,  color: "0,0,0",     inset: true  },
];

function SliderRow({ label, value, min, max, onChange, unit = "px" }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-20 shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-blue-500 cursor-pointer h-1.5"
      />
      <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 w-12 text-right shrink-0">
        {value}{unit}
      </span>
    </div>
  );
}

export function BoxShadowDiagram() {
  const [x, setX]           = useState(0);
  const [y, setY]           = useState(8);
  const [blur, setBlur]     = useState(16);
  const [spread, setSpread] = useState(0);
  const [opacity, setOp]    = useState(0.15);
  const [color, setColor]   = useState("0,0,0");
  const [inset, setInset]   = useState(false);
  const [preset, setPreset] = useState("simple");

  const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px rgba(${color},${opacity})`;

  const applyPreset = (p: typeof SHADOW_PRESETS[0]) => {
    setX(p.x); setY(p.y); setBlur(p.blur); setSpread(p.spread);
    setOp(p.opacity); setColor(p.color); setInset(p.inset);
    setPreset(p.label);
  };

  const COLOR_OPTIONS = [
    { label: "Black",  value: "0,0,0" },
    { label: "Blue",   value: "59,130,246" },
    { label: "Purple", value: "139,92,246" },
    { label: "Green",  value: "34,197,94" },
    { label: "Red",    value: "239,68,68" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">

      {/* ── Preset buttons ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {SHADOW_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${preset === p.label
                ? "bg-gray-800 dark:bg-white border-transparent text-white dark:text-gray-900 shadow-md scale-105"
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Main panel ── */}
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">

        {/* Header */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono truncate max-w-md">
            box-shadow: {shadow}
          </code>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Live preview */}
          <div className="flex flex-col items-center justify-center gap-4 min-h-[180px] bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <div
              className="w-32 h-20 bg-white dark:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ boxShadow: shadow }}
            >
              <span className="text-gray-700 font-bold text-sm">.card</span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 text-center">👆 ស្រមោលផ្លាស់ប្តូរ live</span>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <SliderRow label="x-offset" value={x} min={-40} max={40} onChange={setX} />
            <SliderRow label="y-offset" value={y} min={-40} max={40} onChange={setY} />
            <SliderRow label="blur"     value={blur} min={0} max={60} onChange={setBlur} />
            <SliderRow label="spread"   value={spread} min={-20} max={30} onChange={setSpread} />
            <SliderRow label="opacity"  value={Math.round(opacity * 100)} min={0} max={100}
              onChange={v => setOp(v / 100)} unit="%" />

            {/* Color picker */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-20 shrink-0">color</span>
              <div className="flex flex-wrap gap-1.5">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => { setColor(c.value); setPreset("custom"); }}
                    title={c.label}
                    className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-transform ${color === c.value ? "scale-125 border-gray-800 dark:border-white" : "border-transparent"}`}
                    style={{ background: `rgb(${c.value})` }}
                  />
                ))}
              </div>
            </div>

            {/* Inset toggle */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-20 shrink-0">inset</span>
              <button
                onClick={() => { setInset(!inset); setPreset("custom"); }}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold border-2 cursor-pointer transition-all
                  ${inset ? "bg-indigo-600 border-transparent text-white" : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
              >
                {inset ? "✅ inset on" : "inset off"}
              </button>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{inset ? "ស្រមោលខាងក្នុង" : "ស្រមោលខាងក្រៅ"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Presets comparison ── */}
      <div className="mt-5 w-full max-w-2xl mx-auto">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold text-center">ប្រៀបធៀប presets</div>
        <div className="grid grid-cols-5 gap-3">
          {SHADOW_PRESETS.map((p) => {
            const s = `${p.inset ? "inset " : ""}${p.x}px ${p.y}px ${p.blur}px ${p.spread}px rgba(${p.color},${p.opacity})`;
            return (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                  ${preset === p.label ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-400"}`}
              >
                <div
                  className="w-10 h-8 bg-white dark:bg-gray-200 rounded-lg"
                  style={{ boxShadow: s }}
                />
                <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Live CSS ── */}
      <div className="mt-4 mx-auto max-w-2xl rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
        <div className="text-blue-700 dark:text-blue-400 font-bold break-all">
          box-shadow: {shadow};
        </div>
        <div className="text-gray-500 dark:text-gray-500 text-[10px] font-sans mt-1">
          syntax: [inset] x-offset y-offset blur spread color
        </div>
      </div>
    </div>
  );
}

// ─── Card Layout Diagram (interactive box model builder) ─────────────────────
export function CardLayoutDiagram() {
  const [padding, setPadding]   = useState(24);
  const [margin, setMargin]     = useState(16);
  const [borderW, setBorderW]   = useState(1);
  const [radius, setRadius]     = useState(12);
  const [shadowY, setShadowY]   = useState(8);
  const [shadowBlur, setShadowBlur] = useState(16);
  const [shadowOp, setShadowOp] = useState(0.1);
  const [bgColor, setBgColor]   = useState("#ffffff");

  const shadow = `0px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOp})`;

  const BG_OPTIONS = [
    { label: "White",  value: "#ffffff", dark: "#1f2937" },
    { label: "Blue",   value: "#eff6ff", dark: "#1e3a5f" },
    { label: "Green",  value: "#f0fdf4", dark: "#14532d" },
    { label: "Purple", value: "#faf5ff", dark: "#3b0764" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">

      {/* ── Layout: preview left, controls right ── */}
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">

        {/* Header */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Card Component — Box Model Builder</span>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* ── Live card preview ── */}
          <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl min-h-[260px] p-4">
            {/* Margin indicator */}
            <div
              className="relative bg-yellow-100/60 dark:bg-yellow-900/20 border-2 border-dashed border-yellow-400 rounded-xl transition-all duration-200"
              style={{ padding: margin }}
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-yellow-600 font-bold whitespace-nowrap bg-white dark:bg-gray-900 px-1 rounded">
                margin: {margin}px
              </span>
              {/* The card itself */}
              <div
                className="relative transition-all duration-200"
                style={{
                  padding,
                  border: `${borderW}px solid #e5e7eb`,
                  borderRadius: radius,
                  background: bgColor,
                  boxShadow: shadow,
                  minWidth: 160,
                }}
              >
                {/* Padding indicator */}
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-green-600 font-bold whitespace-nowrap">
                  padding: {padding}px
                </span>
                {/* Content */}
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mt-2 text-center">
                  <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto mb-2" />
                  <div className="text-xs font-bold text-gray-800">Card Title</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Description text</div>
                  <div className="mt-2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full inline-block">
                    Button
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 text-center">
              🟡 margin · 🔴 border · 🟢 padding · 🔵 content
            </span>
          </div>

          {/* ── Controls ── */}
          <div className="space-y-3 text-xs">
            <SliderRow label="padding"   value={padding}   min={0}  max={48} onChange={setPadding} />
            <SliderRow label="margin"    value={margin}    min={0}  max={40} onChange={setMargin} />
            <SliderRow label="border"    value={borderW}   min={0}  max={8}  onChange={setBorderW} />
            <SliderRow label="radius"    value={radius}    min={0}  max={32} onChange={setRadius} />
            <SliderRow label="shadow-y"  value={shadowY}   min={0}  max={40} onChange={setShadowY} />
            <SliderRow label="blur"      value={shadowBlur} min={0} max={60} onChange={setShadowBlur} />
            <SliderRow label="shadow-op" value={Math.round(shadowOp * 100)} min={0} max={50}
              onChange={v => setShadowOp(v / 100)} unit="%" />

            {/* Background color */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 w-20 shrink-0">bg-color</span>
              <div className="flex gap-1.5">
                {BG_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setBgColor(c.value)}
                    title={c.label}
                    className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-transform ${bgColor === c.value ? "scale-125 border-blue-500" : "border-gray-300"}`}
                    style={{ background: c.value }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live CSS output ── */}
      <div className="mt-4 mx-auto max-w-2xl rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4 text-xs font-mono">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-3 font-bold">Live CSS</div>
        <div className="space-y-0.5 text-gray-800 dark:text-gray-200">
          <div><span className="text-purple-600 dark:text-purple-400">.card</span> {"{"}</div>
          <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">padding</span>: <span className="text-green-600 dark:text-green-400">{padding}px</span>;</div>
          <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">margin</span>: <span className="text-green-600 dark:text-green-400">{margin}px</span>;</div>
          <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">border</span>: <span className="text-green-600 dark:text-green-400">{borderW}px solid #e5e7eb</span>;</div>
          <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">border-radius</span>: <span className="text-green-600 dark:text-green-400">{radius}px</span>;</div>
          <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">box-sizing</span>: <span className="text-orange-500">border-box</span>; <span className="text-gray-400 font-sans text-[10px]">/* ✅ ច្បាប់មាស */</span></div>
          <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">box-shadow</span>: <span className="text-green-600 dark:text-green-400">{shadow}</span>;</div>
          <div>{"}"}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Positioning Diagram (interactive) ───────────────────────────────────────
type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

const POSITION_OPTIONS: {
  id: PositionValue; color: string; btnBg: string; badge: string; note: string;
}[] = [
  { id: "static",   color: "#6b7280", btnBg: "bg-gray-500",   badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",     note: "លំនាំដើម — ស្ថិតនៅ Normal Flow · top/left/right/bottom/z-index មិនដំណើរការ" },
  { id: "relative", color: "#2563eb", btnBg: "bg-blue-600",   badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",   note: "រំកិលខ្លួនពីទីតាំងដើម · នៅតែរក្សា Normal Flow Space · ប្រើជា container ឃុំ absolute children" },
  { id: "absolute", color: "#9333ea", btnBg: "bg-purple-600", badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300", note: "លោតចេញពី Normal Flow · ធៀបនឹង relative parent · Elements ផ្សេងបូកជិតដូចវាគ្មាន" },
  { id: "fixed",    color: "#dc2626", btnBg: "bg-red-600",    badge: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",       note: "ស្ងៀមជាប់នឹង Viewport · Scroll មិនប៉ះពាល់ · ប្រើសម្រាប់ Navbar, Chat Button" },
  { id: "sticky",   color: "#16a34a", btnBg: "bg-green-600",  badge: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300", note: "relative + fixed hybrid · relative រហូតដល់ Scroll ដល់ threshold · ក្លាយជា fixed បន្ទាប់" },
];

// ─── Shared gray element helper ──────────────────────────────────────────────
function GrayEl({ label }: { label: string }) {
  return (
    <div className="rounded-lg px-3 py-2 text-[11px] font-semibold text-gray-600 dark:text-gray-300 text-center bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
      {label}
    </div>
  );
}

// ─── Position: Static ─────────────────────────────────────────────────────────
export function StaticDiagram() {
  return (
    <div className="not-prose my-6 font-sans">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-yellow-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">position: static</code>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Visual */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
            <div className="text-[10px] text-gray-400 text-center mb-2">Normal Flow — ហូរពីលើចុះក្រោម</div>
            <GrayEl label="Element ១" />
            <div className="rounded-lg px-3 py-2 text-[11px] font-bold text-white text-center bg-gray-500">Element ២ (static)</div>
            <GrayEl label="Element ៣" />
          </div>
          {/* Info */}
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-xs space-y-2 text-gray-700 dark:text-gray-300">
            <div className="font-bold text-sm text-gray-800 dark:text-gray-200">position: static</div>
            <div>✅ ស្ថិតនៅ Normal Flow</div>
            <div>✅ default — Elements ទាំងអស់</div>
            <div>❌ <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">top</code> / <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">left</code> — ignored</div>
            <div>❌ <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">z-index</code> — ignored</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Position: Relative ───────────────────────────────────────────────────────
export function RelativeDiagram() {
  const [top, setTop]   = useState(20);
  const [left, setLeft] = useState(20);
  return (
    <div className="not-prose my-6 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800 flex items-center gap-3">
          <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-yellow-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">position: relative</code>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Visual */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <div className="text-[10px] text-gray-400 text-center mb-2">Space ដើម reserve — Element រំកិលចេញ</div>
            <div className="space-y-1">
              <GrayEl label="Element ១" />
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg px-3 py-2 text-[10px] text-blue-400 dark:text-blue-500 text-center">
                [space ដើម — reserve នៅទីនេះ]
              </div>
              <div className="relative h-0">
                <div className="absolute w-full rounded-lg px-3 py-2 text-[11px] font-bold text-white text-center transition-all duration-200"
                  style={{ background: "#2563eb", top: top - 32, left: left, zIndex: 10, boxShadow: "0 4px 12px rgba(37,99,235,0.35)" }}>
                  relative · top:{top}px left:{left}px
                </div>
              </div>
              <div style={{ marginTop: 14 }}><GrayEl label="Element ៣" /></div>
            </div>
            <div className="text-[10px] text-blue-500 text-center mt-2">↑ Element ២ រំកិល · space ដើម (dashed) នៅ reserve</div>
          </div>
          {/* Sliders + info */}
          <div className="space-y-4">
            <div className="space-y-3">
              <SliderRow label="top"  value={top}  min={0} max={80} onChange={setTop} />
              <SliderRow label="left" value={left} min={0} max={120} onChange={setLeft} />
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-400 space-y-1.5">
              <div className="font-bold">position: relative</div>
              <div>✅ ស្ថិតនៅ Normal Flow</div>
              <div>✅ top/left/right/bottom ដំណើរការ</div>
              <div>✅ Space ដើម reserve ក្នុង flow</div>
              <div>⭐ ប្រើជា container ឃុំ absolute child</div>
            </div>
            <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-[10px] uppercase tracking-widest font-sans mb-1 text-gray-600 dark:text-gray-400 font-bold">Live CSS</div>
              <div className="font-bold text-blue-600 dark:text-blue-400">
                <div>position: relative;</div>
                <div>top: {top}px;</div>
                <div>left: {left}px;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Position: Absolute ───────────────────────────────────────────────────────
export function AbsoluteDiagram() {
  const [top, setTop]   = useState(8);
  const [left, setLeft] = useState(8);
  return (
    <div className="not-prose my-6 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-purple-50 dark:bg-purple-950/30 border-b border-purple-200 dark:border-purple-800 flex items-center gap-3">
          <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-yellow-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">position: absolute</code>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Visual */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
            <div className="text-[10px] text-gray-400 text-center mb-1">relative parent ឃុំ absolute child</div>
            <div className="relative border-2 border-blue-400 dark:border-blue-600 rounded-xl p-3 bg-blue-50 dark:bg-blue-950/20" style={{ minHeight: 110 }}>
              <div className="text-[10px] text-blue-600 font-bold mb-2">📦 position: relative (parent)</div>
              <GrayEl label="content ក្នុង parent" />
              <div className="absolute rounded-lg px-2 py-1 text-[11px] font-bold text-white text-center transition-all duration-200"
                style={{ background: "#9333ea", top, left, zIndex: 10, boxShadow: "0 4px 12px rgba(147,51,234,0.4)", whiteSpace: "nowrap" }}>
                🟣 absolute top:{top} left:{left}
              </div>
            </div>
            <GrayEl label="Element ៣ — ឡើងមក (absolute លែងស៊ីទំហំ)" />
          </div>
          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-3">
              <SliderRow label="top"  value={top}  min={0} max={80} onChange={setTop} />
              <SliderRow label="left" value={left} min={0} max={120} onChange={setLeft} />
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-3 text-xs text-purple-700 dark:text-purple-400 space-y-1.5">
              <div className="font-bold">position: absolute</div>
              <div>✅ ធៀបនឹង relative parent</div>
              <div>❌ លោតចេញពី Normal Flow</div>
              <div>❌ Elements ផ្សេងបូកជិតដូចវាបាត់</div>
              <div>⭐ badge, tooltip, dropdown menu</div>
            </div>
            <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-[10px] uppercase tracking-widest font-sans mb-1 text-gray-600 dark:text-gray-400 font-bold">Live CSS</div>
              <div className="font-bold text-purple-600 dark:text-purple-400">
                <div>position: absolute;</div>
                <div>top: {top}px;</div>
                <div>left: {left}px;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Position: Fixed ──────────────────────────────────────────────────────────
export function FixedDiagram() {
  return (
    <div className="not-prose my-6 font-sans">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-800 flex items-center gap-3">
          <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-yellow-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">position: fixed</code>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Viewport simulation */}
          <div className="rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-600" style={{ height: 200 }}>
            <div className="relative h-full bg-white dark:bg-gray-900 overflow-hidden">
              {/* Fixed navbar */}
              <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white text-[11px] font-bold px-3 py-2 flex items-center justify-between z-20">
                <span>🔴 Navbar</span><span className="text-[9px] opacity-60">position: fixed · top:0</span>
              </div>
              {/* Page content */}
              <div className="pt-9 px-3 space-y-1.5 overflow-y-auto h-full pb-2">
                <GrayEl label="Page content ១" />
                <GrayEl label="Page content ២" />
                <GrayEl label="Page content ៣" />
                <GrayEl label="↓ scroll ចុះ..." />
              </div>
              {/* Fixed chat button */}
              <div className="absolute bottom-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg z-20">
                💬 Chat
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="space-y-3">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-xs text-red-700 dark:text-red-400 space-y-1.5">
              <div className="font-bold">position: fixed</div>
              <div>✅ ធៀបនឹង Viewport (អេក្រង់)</div>
              <div>✅ Scroll មិនប៉ះពាល់ — ស្ងៀម</div>
              <div>❌ លោតចេញពី Normal Flow</div>
              <div>⭐ Navbar · Chat FAB · Cookie Banner</div>
            </div>
            <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-[10px] uppercase tracking-widest font-sans mb-1 text-gray-600 dark:text-gray-400 font-bold">Live CSS</div>
              <div className="font-bold text-red-600 dark:text-red-400">
                <div>position: fixed;</div>
                <div>bottom: 24px;</div>
                <div>right: 24px;</div>
                <div>z-index: 999;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Position: Sticky ─────────────────────────────────────────────────────────
export function StickyDiagram() {
  return (
    <div className="not-prose my-6 font-sans">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-green-200 dark:border-green-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-green-50 dark:bg-green-950/30 border-b border-green-200 dark:border-green-800 flex items-center gap-3">
          <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-yellow-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">position: sticky</code>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Scrollable demo */}
          <div className="rounded-xl border-2 border-gray-300 dark:border-gray-600 overflow-hidden" style={{ height: 200 }}>
            <div className="h-full overflow-y-auto bg-white dark:bg-gray-900">
              <div className="p-2 space-y-1">
                <GrayEl label="Content ១ — scroll ☟" />
                <GrayEl label="Content ២" />
              </div>
              <div className="sticky top-0 bg-green-500 text-white text-[11px] font-bold px-3 py-2 text-center z-10 shadow">
                🟢 Sticky Header — ស្អិតពេល scroll ដល់
              </div>
              <div className="p-2 space-y-1">
                <GrayEl label="Content ៣" />
                <GrayEl label="Content ៤" />
                <GrayEl label="Content ៥" />
                <GrayEl label="Content ៦" />
                <GrayEl label="Content ៧ — scroll ☟ ☟" />
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-xs text-green-700 dark:text-green-400 space-y-1.5">
              <div className="font-bold">position: sticky</div>
              <div>✅ relative ជាធម្មតា</div>
              <div>✅ fixed ពេល scroll ដល់ threshold</div>
              <div>✅ ស្ថិតក្នុង Normal Flow</div>
              <div>⭐ Sticky headers · Table row headers</div>
            </div>
            <div className="rounded-xl border-2 border-green-200 dark:border-green-800 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-[10px] uppercase tracking-widest font-sans mb-1 text-gray-600 dark:text-gray-400 font-bold">Live CSS</div>
              <div className="font-bold text-green-600 dark:text-green-400">
                <div>position: sticky;</div>
                <div>top: 0; <span className="text-gray-400 font-sans text-[9px]">/* ⭐ ត្រូវតែ! */</span></div>
                <div>z-index: 10;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PositioningDiagram (kept for backward compat — shows all 5 tabs) ─────────
export function PositioningDiagram() {
  const [active, setActive] = useState<PositionValue>("static");
  const opt = POSITION_OPTIONS.find(o => o.id === active)!;
  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {POSITION_OPTIONS.map(o => (
          <button key={o.id} onClick={() => setActive(o.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
              ${active === o.id ? `${o.btnBg} border-transparent text-white shadow-md scale-105`
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {o.id}
          </button>
        ))}
      </div>
      <div style={{ color: opt.color }} className="text-center text-xs font-semibold mb-2">
        ↓ diagram for position: {active}
      </div>
      {active === "static"   && <StaticDiagram />}
      {active === "relative" && <RelativeDiagram />}
      {active === "absolute" && <AbsoluteDiagram />}
      {active === "fixed"    && <FixedDiagram />}
      {active === "sticky"   && <StickyDiagram />}
    </div>
  );
}

// ─── Z-Index Diagram (interactive) ───────────────────────────────────────────
export function ZIndexDiagram() {
  const [z1, setZ1] = useState(1);
  const [z2, setZ2] = useState(2);
  const [z3, setZ3] = useState(3);

  const layers = [
    { id: 1, label: "Box ១", z: z1, setZ: setZ1, bg: "#3b82f6", offset: { top: 20, left: 20 } },
    { id: 2, label: "Box ២", z: z2, setZ: setZ2, bg: "#a855f7", offset: { top: 50, left: 60 } },
    { id: 3, label: "Box ៣", z: z3, setZ: setZ3, bg: "#f97316", offset: { top: 35, left: 100 } },
  ].sort((a, b) => a.z - b.z); // paint lowest z first

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Z-Index — ស្រទាប់ Layer</span>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Visual stacking demo */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative" style={{ height: 180 }}>
            {layers.map(({ id, label, z, bg, offset }) => (
              <div
                key={id}
                className="absolute rounded-xl flex items-center justify-center font-bold text-white text-xs transition-all duration-300"
                style={{
                  top: offset.top,
                  left: offset.left,
                  width: 120,
                  height: 80,
                  background: bg,
                  zIndex: z,
                  opacity: 0.92,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <div className="text-center">
                  <div>{label}</div>
                  <div className="text-[10px] opacity-80">z-index: {z}</div>
                </div>
              </div>
            ))}
            {/* Z-axis arrow */}
            <div className="absolute bottom-2 right-2 text-[10px] text-gray-500 dark:text-gray-400 font-bold">
              z ↑ (ខ្ពស់ = លើ)
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {[
              { label: "Box ១", color: "#3b82f6", z: z1, setZ: setZ1 },
              { label: "Box ២", color: "#a855f7", z: z2, setZ: setZ2 },
              { label: "Box ៣", color: "#f97316", z: z3, setZ: setZ3 },
            ].map(({ label, color, z, setZ }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 w-12 shrink-0">{label}</span>
                <input type="range" min={-5} max={20} value={z}
                  onChange={e => setZ(Number(e.target.value))}
                  className="flex-1 accent-blue-500 cursor-pointer h-1.5" />
                <span className="text-[11px] font-mono font-bold w-8 text-right shrink-0" style={{ color }}>
                  {z}
                </span>
              </div>
            ))}

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-xs text-yellow-700 dark:text-yellow-400 space-y-1">
              <div className="font-bold">⚡ ច្បាប់ z-index:</div>
              <div>• លេខធំ = នៅខាងលើ</div>
              <div>• ដំណើរការតែជាមួយ position ≠ static</div>
              <div>• negative z-index = ចូលទៅក្រោយ parent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live CSS */}
      <div className="mt-4 mx-auto max-w-xs rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
        <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
        <div className="space-y-1 text-gray-800 dark:text-gray-200">
          {[{ label: "box-1", color: "#3b82f6", z: z1 }, { label: "box-2", color: "#a855f7", z: z2 }, { label: "box-3", color: "#f97316", z: z3 }].map(({ label, color, z }) => (
            <div key={label}><span style={{ color }} className="font-bold">.{label}</span> {"{ "}z-index: <span style={{ color }} className="font-bold">{z}</span>; {"}"}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Flexbox Diagram ─────────────────────────────────────────────────────────
export function FlexboxDiagram() {
  const [direction, setDirection] = useState<"row" | "column" | "row-reverse" | "column-reverse">("row");
  const [justify, setJustify] = useState<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">("flex-start");
  const [alignItems, setAlignItems] = useState<"stretch" | "center" | "flex-start" | "flex-end">("stretch");
  const [wrap, setWrap] = useState<"nowrap" | "wrap">("nowrap");

  const ITEMS_COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f97316"];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            Flexbox Playground
          </code>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            {/* flex-direction */}
            <div>
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">flex-direction</div>
              <div className="grid grid-cols-2 gap-2">
                {(["row", "column", "row-reverse", "column-reverse"] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
                      ${direction === dir
                        ? "bg-blue-600 border-transparent text-white shadow-md"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                      }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* justify-content */}
            <div>
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">justify-content</div>
              <div className="grid grid-cols-3 gap-2">
                {(["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"] as const).map((jc) => (
                  <button
                    key={jc}
                    onClick={() => setJustify(jc)}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all duration-150 cursor-pointer
                      ${justify === jc
                        ? "bg-purple-600 border-transparent text-white shadow-md"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                      }`}
                  >
                    {jc}
                  </button>
                ))}
              </div>
            </div>

            {/* align-items */}
            <div>
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">align-items</div>
              <div className="grid grid-cols-2 gap-2">
                {(["stretch", "center", "flex-start", "flex-end"] as const).map((ai) => (
                  <button
                    key={ai}
                    onClick={() => setAlignItems(ai)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
                      ${alignItems === ai
                        ? "bg-green-600 border-transparent text-white shadow-md"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                      }`}
                  >
                    {ai}
                  </button>
                ))}
              </div>
            </div>

            {/* flex-wrap */}
            <div>
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">flex-wrap</div>
              <div className="grid grid-cols-2 gap-2">
                {(["nowrap", "wrap"] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWrap(w)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
                      ${wrap === w
                        ? "bg-orange-600 border-transparent text-white shadow-md"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                      }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Info note */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-400">
              <div className="font-bold mb-1">💡 អ្វីដែលកំពុងកើតឡើង:</div>
              <div className="space-y-0.5">
                <div>• <strong>flex-direction</strong> កំណត់ទិសដៅ main axis</div>
                <div>• <strong>justify-content</strong> តម្រៀបតាម main axis</div>
                <div>• <strong>align-items</strong> តម្រៀបតាម cross axis</div>
                <div>• <strong>flex-wrap</strong> អនុញ្ញាតឱ្យ items រុំបន្ទាត់</div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-3">
            <div
              className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 transition-all duration-300"
              style={{
                height: 200,
                display: "flex",
                flexDirection: direction,
                justifyContent: justify,
                alignItems: alignItems,
                flexWrap: wrap,
                gap: "8px",
              }}
            >
              {ITEMS_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="rounded-lg flex items-center justify-center font-bold text-white text-xs transition-all duration-300"
                  style={{
                    background: color,
                    width: direction.includes("column") ? "80%" : "60px",
                    height: direction.includes("column") ? "40px" : (alignItems === "stretch" ? "100%" : "60px"),
                    minWidth: "60px",
                    minHeight: "40px",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Live CSS */}
            <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
              <div className="space-y-0.5 text-gray-800 dark:text-gray-200">
                <div>display: <span className="text-blue-600 dark:text-blue-400 font-bold">flex</span>;</div>
                <div>flex-direction: <span className="text-blue-600 dark:text-blue-400 font-bold">{direction}</span>;</div>
                <div>justify-content: <span className="text-purple-600 dark:text-purple-400 font-bold">{justify}</span>;</div>
                <div>align-items: <span className="text-green-600 dark:text-green-400 font-bold">{alignItems}</span>;</div>
                <div>flex-wrap: <span className="text-orange-600 dark:text-orange-400 font-bold">{wrap}</span>;</div>
                <div>gap: 8px;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Diagram ────────────────────────────────────────────────────────────
export function GridDiagram() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(16);
  const [pattern, setPattern] = useState<"equal" | "sidebar" | "holy-grail">("equal");

  const getTemplateColumns = () => {
    switch (pattern) {
      case "sidebar": return "200px 1fr";
      case "holy-grail": return "200px 1fr 200px";
      default: return `repeat(${columns}, 1fr)`;
    }
  };

  const gridItems = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
            CSS Grid Playground
          </code>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            {/* Pattern presets */}
            <div>
              <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">grid-template-columns pattern</div>
              <div className="space-y-2">
                {(["equal", "sidebar", "holy-grail"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPattern(p)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer text-left
                      ${pattern === p
                        ? "bg-purple-600 border-transparent text-white shadow-md"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                      }`}
                  >
                    {p === "equal" && `equal — repeat(${columns}, 1fr)`}
                    {p === "sidebar" && "sidebar — 200px 1fr"}
                    {p === "holy-grail" && "holy-grail — 200px 1fr 200px"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            {pattern === "equal" && (
              <div>
                <SliderRow label="columns" value={columns} min={1} max={6} onChange={setColumns} unit="" />
              </div>
            )}
            <SliderRow label="rows" value={rows} min={1} max={4} onChange={setRows} unit="" />
            <SliderRow label="gap" value={gap} min={0} max={32} onChange={setGap} />

            {/* Info note */}
            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-xs text-purple-700 dark:text-purple-400">
              <div className="font-bold mb-1">💡 អំពី Grid:</div>
              <div className="space-y-0.5">
                <div>• <strong>fr</strong> = fractional unit (ប្រភាគទំនេរ)</div>
                <div>• <strong>repeat(n, 1fr)</strong> = n columns ស្មើគ្នា</div>
                <div>• <strong>gap</strong> = គម្លាតរវាង cells</div>
                <div>• Grid គ្រប់គ្រងទាំង rows និង columns!</div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-3">
            <div
              className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 transition-all duration-300"
              style={{
                minHeight: 240,
                display: "grid",
                gridTemplateColumns: getTemplateColumns(),
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gap: `${gap}px`,
              }}
            >
              {gridItems.slice(0, columns * rows).map((num) => (
                <div
                  key={num}
                  className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300"
                  style={{ minHeight: "60px" }}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Live CSS */}
            <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
              <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
              <div className="space-y-0.5 text-gray-800 dark:text-gray-200">
                <div>display: <span className="text-purple-600 dark:text-purple-400 font-bold">grid</span>;</div>
                <div>grid-template-columns: <span className="text-purple-600 dark:text-purple-400 font-bold">{getTemplateColumns()}</span>;</div>
                <div>grid-template-rows: <span className="text-purple-600 dark:text-purple-400 font-bold">repeat({rows}, 1fr)</span>;</div>
                <div>gap: <span className="text-purple-600 dark:text-purple-400 font-bold">{gap}px</span>;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── 1. FlexDirectionDiagram ─────────────────────────────────────────────────
export function FlexDirectionDiagram() {
  const [direction, setDirection] = useState<"row" | "column" | "row-reverse" | "column-reverse">("row");
  const COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f97316"];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            flex-direction
          </code>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(["row", "column", "row-reverse", "column-reverse"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => setDirection(dir)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
                  ${direction === dir
                    ? "bg-blue-600 border-transparent text-white shadow-md"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                  }`}
              >
                {dir}
              </button>
            ))}
          </div>

          <div
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6 transition-all duration-300 min-h-[200px] relative"
            style={{
              display: "flex",
              flexDirection: direction,
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            {direction.includes("row") && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                Main Axis →
              </div>
            )}
            {direction.includes("column") && (
              <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] font-bold text-blue-600 dark:text-blue-400 -rotate-90 origin-center whitespace-nowrap">
                Main Axis ↓
              </div>
            )}
            {COLORS.map((color, i) => (
              <div
                key={i}
                className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300"
                style={{
                  background: color,
                  width: direction.includes("column") ? "80px" : "60px",
                  height: "60px",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">
              flex-direction: {direction};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. JustifyContentDiagram ────────────────────────────────────────────────
export function JustifyContentDiagram() {
  const [justify, setJustify] = useState<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">("flex-start");
  const COLORS = ["#3b82f6", "#a855f7", "#10b981"];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
            justify-content
          </code>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {(["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"] as const).map((jc) => (
              <button
                key={jc}
                onClick={() => setJustify(jc)}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all duration-150 cursor-pointer
                  ${justify === jc
                    ? "bg-purple-600 border-transparent text-white shadow-md"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                  }`}
              >
                {jc}
              </button>
            ))}
          </div>

          <div className="relative">
            <div
              className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 transition-all duration-300"
              style={{ display: "flex", justifyContent: justify, alignItems: "center", height: "100px" }}
            >
              {COLORS.map((color, i) => (
                <div
                  key={i}
                  className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300"
                  style={{ background: color, width: "60px", height: "60px", flexShrink: 0 }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            {/* Axis line */}
            <div className="relative mt-1 h-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-purple-300 dark:bg-purple-700" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-purple-600 dark:text-purple-400 font-bold">→</div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] text-purple-500 dark:text-purple-400">Main Axis</div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-purple-600 dark:text-purple-400 font-bold">
              justify-content: {justify};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. AlignItemsDiagram ────────────────────────────────────────────────────
export function AlignItemsDiagram() {
  const [alignItems, setAlignItems] = useState<"stretch" | "center" | "flex-start" | "flex-end">("stretch");
  const ITEMS = [
    { color: "#3b82f6", naturalH: 40, label: "A" },
    { color: "#a855f7", naturalH: 60, label: "B" },
    { color: "#10b981", naturalH: 80, label: "C" },
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
            align-items
          </code>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(["stretch", "center", "flex-start", "flex-end"] as const).map((ai) => (
              <button
                key={ai}
                onClick={() => setAlignItems(ai)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
                  ${alignItems === ai
                    ? "bg-green-600 border-transparent text-white shadow-md"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                  }`}
              >
                {ai}
              </button>
            ))}
          </div>

          <div className="relative flex gap-2">
            <div
              className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 transition-all duration-300"
              style={{ display: "flex", alignItems, gap: "12px", height: "140px" }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300 flex-1"
                  style={{
                    background: item.color,
                    height: alignItems === "stretch" ? undefined : item.naturalH,
                    minHeight: "20px",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
            {/* Cross axis arrow on right */}
            <div className="flex flex-col items-center justify-between py-2">
              <div className="text-[9px] text-green-600 dark:text-green-400 font-bold">↑</div>
              <div className="text-[9px] text-green-500 dark:text-green-400 -rotate-90 origin-center whitespace-nowrap">Cross</div>
              <div className="text-[9px] text-green-600 dark:text-green-400 font-bold">↓</div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-green-600 dark:text-green-400 font-bold">
              align-items: {alignItems};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. FlexWrapGapDiagram ───────────────────────────────────────────────────
export function FlexWrapGapDiagram() {
  const [wrap, setWrap] = useState<"nowrap" | "wrap">("nowrap");
  const [gap, setGap] = useState(8);
  const COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f97316", "#ef4444", "#eab308"];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300">
            flex-wrap + gap
          </code>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            {(["nowrap", "wrap"] as const).map((w) => (
              <button
                key={w}
                onClick={() => setWrap(w)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 cursor-pointer
                  ${wrap === w
                    ? "bg-orange-600 border-transparent text-white shadow-md"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                  }`}
              >
                {w}
              </button>
            ))}
          </div>

          <SliderRow label="gap" value={gap} min={0} max={32} onChange={setGap} />

          <div
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 transition-all duration-300 overflow-hidden"
            style={{ display: "flex", flexWrap: wrap, gap: `${gap}px`, minHeight: "120px" }}
          >
            {COLORS.map((color, i) => (
              <div
                key={i}
                className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300"
                style={{ background: color, width: "80px", height: "60px", flexShrink: wrap === "nowrap" ? 1 : 0 }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="space-y-0.5 text-orange-600 dark:text-orange-400 font-bold">
              <div>flex-wrap: {wrap};</div>
              <div>gap: {gap}px;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. FlexGrowDiagram ──────────────────────────────────────────────────────
export function FlexGrowDiagram() {
  const [flexGrow, setFlexGrow] = useState(1);
  const [flexShrink, setFlexShrink] = useState(1);
  const [flexBasis, setFlexBasis] = useState(0);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
            flex-grow / flex-shrink / flex-basis
          </code>
        </div>

        <div className="p-6 space-y-4">
          <SliderRow label="flex-grow" value={flexGrow} min={0} max={3} onChange={setFlexGrow} unit="" />
          <SliderRow label="flex-shrink" value={flexShrink} min={0} max={3} onChange={setFlexShrink} unit="" />
          <SliderRow label="flex-basis" value={flexBasis} min={0} max={300} onChange={setFlexBasis} />

          <div
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 transition-all duration-300 overflow-hidden"
            style={{ display: "flex", gap: "8px", height: "80px" }}
          >
            {/* Left sidebar — fixed */}
            <div
              className="rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ background: "#6b7280", width: "100px" }}
            >
              sidebar
              <br />(fixed)
            </div>
            {/* Middle — flex controlled */}
            <div
              className="rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-300"
              style={{
                background: "#3b82f6",
                flexGrow,
                flexShrink,
                flexBasis: flexBasis === 0 ? "auto" : `${flexBasis}px`,
                minWidth: "40px",
              }}
            >
              main
            </div>
            {/* Right — fixed */}
            <div
              className="rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ background: "#a855f7", width: "80px" }}
            >
              right
              <br />(fixed)
            </div>
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">
              flex: {flexGrow} {flexShrink} {flexBasis === 0 ? "auto" : `${flexBasis}px`};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 6. GridBasicDiagram ─────────────────────────────────────────────────────
export function GridBasicDiagram() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const CELL_COLORS = [
    "#3b82f6", "#a855f7", "#10b981", "#f97316", "#ef4444", "#eab308",
    "#06b6d4", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#22c55e",
    "#64748b", "#0ea5e9", "#d946ef", "#f43f5e", "#84cc16", "#fb923c",
  ];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
            grid-template-columns / rows
          </code>
        </div>

        <div className="p-6 space-y-4">
          <SliderRow label="columns" value={columns} min={1} max={6} onChange={setColumns} unit="" />
          <SliderRow label="rows" value={rows} min={1} max={3} onChange={setRows} unit="" />

          <div className="relative">
            <div
              className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 transition-all duration-300"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 60px)`,
                gap: "6px",
              }}
            >
              {Array.from({ length: columns * rows }, (_, i) => (
                <div
                  key={i}
                  className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300 relative"
                  style={{ background: CELL_COLORS[i % CELL_COLORS.length] }}
                >
                  {i + 1}
                  {/* column line indicator on first row */}
                  {i < columns && i > 0 && (
                    <div className="absolute -left-[3px] top-0 bottom-0 w-[1px] border-l border-dashed border-white/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="space-y-0.5 text-purple-600 dark:text-purple-400 font-bold">
              <div>grid-template-columns: repeat({columns}, 1fr);</div>
              <div>grid-template-rows: repeat({rows}, 1fr);</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 7. FrUnitDiagram ────────────────────────────────────────────────────────
export function FrUnitDiagram() {
  const [pattern, setPattern] = useState<0 | 1 | 2>(0);

  const PATTERNS = [
    {
      label: "1fr 1fr 1fr",
      template: "1fr 1fr 1fr",
      cols: [{ label: "1fr", color: "#3b82f6" }, { label: "1fr", color: "#3b82f6" }, { label: "1fr", color: "#3b82f6" }],
    },
    {
      label: "1fr 2fr 1fr",
      template: "1fr 2fr 1fr",
      cols: [{ label: "1fr", color: "#a855f7" }, { label: "2fr", color: "#7c3aed" }, { label: "1fr", color: "#a855f7" }],
    },
    {
      label: "200px 1fr",
      template: "200px 1fr",
      cols: [{ label: "200px", color: "#10b981" }, { label: "1fr", color: "#059669" }],
    },
  ] as const;

  const active = PATTERNS[pattern];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">
            fr unit + repeat()
          </code>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            {PATTERNS.map((p, idx) => (
              <button
                key={p.label}
                onClick={() => setPattern(idx as 0 | 1 | 2)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all duration-150 cursor-pointer
                  ${pattern === idx
                    ? "bg-violet-600 border-transparent text-white shadow-md"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 transition-all duration-300"
            style={{
              display: "grid",
              gridTemplateColumns: active.template,
              gap: "6px",
              height: "80px",
            }}
          >
            {active.cols.map((col, i) => (
              <div
                key={i}
                className="rounded-lg flex items-center justify-center font-bold text-white text-xs transition-all duration-300"
                style={{ background: col.color }}
              >
                {col.label}
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-violet-600 dark:text-violet-400 font-bold">
              grid-template-columns: {active.template};
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 8. GridGapDiagram ───────────────────────────────────────────────────────
export function GridGapDiagram() {
  const [columnGap, setColumnGap] = useState(12);
  const [rowGap, setRowGap] = useState(12);
  const COLORS = [
    "#3b82f6", "#a855f7", "#10b981",
    "#f97316", "#ef4444", "#eab308",
    "#06b6d4", "#ec4899", "#14b8a6",
  ];
  const isEqual = columnGap === rowGap;

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">
            column-gap / row-gap
          </code>
        </div>

        <div className="p-6 space-y-4">
          <SliderRow label="column-gap" value={columnGap} min={0} max={32} onChange={setColumnGap} />
          <SliderRow label="row-gap" value={rowGap} min={0} max={32} onChange={setRowGap} />

          <div
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 transition-all duration-300"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 56px)",
              columnGap: `${columnGap}px`,
              rowGap: `${rowGap}px`,
            }}
          >
            {COLORS.map((color, i) => (
              <div
                key={i}
                className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300"
                style={{ background: color }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-cyan-600 dark:text-cyan-400 font-bold">
              {isEqual
                ? `gap: ${columnGap}px;`
                : <>column-gap: {columnGap}px;<br />row-gap: {rowGap}px;</>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 9. GridSpanDiagram ──────────────────────────────────────────────────────
export function GridSpanDiagram() {
  const [colStart, setColStart] = useState(1);
  const [colEnd, setColEnd]     = useState(3);
  const [rowStart, setRowStart] = useState(1);
  const [rowEnd, setRowEnd]     = useState(2);

  // Clamp: colEnd must be > colStart; rowEnd must be > rowStart
  const safeColEnd = Math.max(colEnd, colStart + 1);
  const safeRowEnd = Math.max(rowEnd, rowStart + 1);

  // Build a 4-col × 3-row grid; determine which cells are hero
  const isHero = (col: number, row: number) =>
    col >= colStart && col < safeColEnd && row >= rowStart && row < safeRowEnd;

  const cells: { col: number; row: number }[] = [];
  for (let r = 1; r <= 3; r++) {
    for (let c = 1; c <= 4; c++) {
      cells.push({ col: c, row: r });
    }
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
            grid-column / grid-row spanning
          </code>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <SliderRow label="col-start" value={colStart} min={1} max={4} onChange={(v) => setColStart(v)} unit="" />
            <SliderRow label="col-end" value={colEnd} min={2} max={5} onChange={(v) => setColEnd(v)} unit="" />
            <SliderRow label="row-start" value={rowStart} min={1} max={3} onChange={(v) => setRowStart(v)} unit="" />
            <SliderRow label="row-end" value={rowEnd} min={2} max={4} onChange={(v) => setRowEnd(v)} unit="" />
          </div>

          <div
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 transition-all duration-300"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 56px)",
              gap: "6px",
            }}
          >
            {/* Hero cell with grid-column/row span */}
            <div
              className="rounded-lg flex items-center justify-center font-bold text-white text-sm transition-all duration-300 z-10"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                gridColumn: `${colStart} / ${safeColEnd}`,
                gridRow: `${rowStart} / ${safeRowEnd}`,
              }}
            >
              .hero
            </div>
            {/* Non-hero cells — render only cells not overlapped by hero */}
            {cells
              .filter((c) => !isHero(c.col, c.row))
              .map((c) => (
                <div
                  key={`${c.col}-${c.row}`}
                  className="rounded-lg flex items-center justify-center font-bold text-white text-xs transition-all duration-300"
                  style={{ background: "#94a3b8" }}
                >
                  {c.col},{c.row}
                </div>
              ))}
          </div>

          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 text-xs font-mono">
            <div className="text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-widest font-sans mb-2 font-bold">Live CSS</div>
            <div className="text-rose-600 dark:text-rose-400 font-bold">
              <div className="text-gray-500 dark:text-gray-500">.hero {"{"}</div>
              <div className="pl-4">grid-column: {colStart} / {safeColEnd};</div>
              <div className="pl-4">grid-row: {rowStart} / {safeRowEnd};</div>
              <div className="text-gray-500 dark:text-gray-500">{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────
const DIAGRAMS: Record<string, React.ComponentType> = {
  boxmodel: BoxModelDiagram,
  boxsizing: BoxSizingDiagram,
  padding: PaddingDiagram,
  margincollapse: MarginCollapseDiagram,
  display: DisplayDiagram,
  overflow: OverflowDiagram,
  boxshadow: BoxShadowDiagram,
  cardlayout: CardLayoutDiagram,
  positioning: PositioningDiagram,
  positionstatic: StaticDiagram,
  positionrelative: RelativeDiagram,
  positionabsolute: AbsoluteDiagram,
  positionfixed: FixedDiagram,
  positionsticky: StickyDiagram,
  zindex: ZIndexDiagram,
  flexbox: FlexboxDiagram,
  grid: GridDiagram,
  flexdirection: FlexDirectionDiagram,
  justifycontent: JustifyContentDiagram,
  alignitems: AlignItemsDiagram,
  flexwrapgap: FlexWrapGapDiagram,
  flexgrow: FlexGrowDiagram,
  gridbasic: GridBasicDiagram,
  frunit: FrUnitDiagram,
  gridgap: GridGapDiagram,
  gridspan: GridSpanDiagram,
  cssunits: CssUnitsDiagram,
  clampdemo: ClampDiagram,
  cssvariables: CssVariablesDiagram,
  gradientdemo: GradientDiagram,
  responsiveimg: ResponsiveImgDiagram,
  transition: TransitionDiagram,
  transformdemo: TransformDiagram,
  keyframesdemo: KeyframesDiagram,
  transitiontransform: TransitionTransformDiagram,
};

export function CssDiagram({ name }: { name: string }) {
  const Component = DIAGRAMS[name.toLowerCase().replace(/[^a-z]/g, "")];
  if (!Component) {
    return (
      <div className="not-prose my-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        Unknown diagram: <code>{name}</code>
      </div>
    );
  }
  return <Component />;
}
