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

// ─── 1. Form Structure Diagram (action + method GET vs POST) ──────────────────
export function FormStructureDiagram() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="flex justify-center gap-3 mb-5">
        {(["GET", "POST"] as const).map((m) => (
          <button key={m} onClick={() => setMethod(m)}
            className={`px-5 py-2 rounded-xl text-sm font-bold font-mono border-2 cursor-pointer transition-all
              ${method === m
                ? m === "GET"
                  ? "bg-blue-600 border-transparent text-white shadow-md scale-105"
                  : "bg-green-600 border-transparent text-white shadow-md scale-105"
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}>
            {m}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label={`<form method="${method}"> — ${method === "GET" ? "ទិន្នន័យបង្ហាញនៅ URL" : "ទិន្នន័យលាក់ក្នុង Request Body"}`}
          badge={method === "GET"
            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
            : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"}
        />

        <div className="p-6 space-y-5">
          {/* Anatomy */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"<!-- Form anatomy -->"}</div>
            <div>
              <span className="text-blue-400">{"<form"}</span>
              <span className="text-yellow-300">{" action"}</span>
              <span className="text-white">{"=\"/submit\""}</span>
              <span className="text-yellow-300">{" method"}</span>
              <span className="text-white">{"=\""}</span>
              <span className={method === "GET" ? "text-blue-300" : "text-green-300"}>{method}</span>
              <span className="text-white">{"\">"}</span>
            </div>
            <div className="pl-4 text-gray-300">{"<input type=\"text\" name=\"username\">"}</div>
            <div className="pl-4 text-gray-300">{"<button type=\"submit\">Send</button>"}</div>
            <div><span className="text-blue-400">{"</form>"}</span></div>
          </div>

          {/* URL simulation */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Browser URL Bar
            </div>
            <div className={`rounded-xl border-2 p-3 font-mono text-xs break-all
              ${method === "GET"
                ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200"
                : "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200"}`}>
              {method === "GET"
                ? <><span className="text-gray-500">https://site.com/submit</span><span className="font-bold text-yellow-600 dark:text-yellow-400">?username=sokha&password=1234</span></>
                : <><span className="text-gray-500">https://site.com/submit</span><span className="text-green-600 dark:text-green-400"> ← URL មិនបង្ហាញ data ទេ (ដាក់ body)</span></>}
            </div>
          </div>

          {/* Comparison cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: "Use for",   get: "Search, filters, read", post: "Login, signup, payments" },
              { label: "Secure?",   get: "❌ Data in URL",         post: "✅ Data in body"         },
              { label: "Bookmark?", get: "✅ Yes",                 post: "❌ No"                    },
              { label: "Data size", get: "⚠️ Limited",             post: "✅ Unlimited"             },
            ].map((row) => (
              <div key={row.label} className={`rounded-xl border-2 p-3 text-center
                ${method === "GET"
                  ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/10"
                  : "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/10"}`}>
                <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1">{row.label}</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 text-[11px]">
                  {method === "GET" ? row.get : row.post}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── 2. Input Types Diagram ───────────────────────────────────────────────────
const INPUT_TYPES = [
  { type: "text",     color: "#3b82f6", label: "Text",     desc: "អក្សរទូទៅ",            code: '<input type="text" placeholder="ឈ្មោះ...">' },
  { type: "password", color: "#8b5cf6", label: "Password", desc: "លាក់តួអក្សរ (●●●)",     code: '<input type="password">' },
  { type: "email",    color: "#06b6d4", label: "Email",    desc: "ត្រូវមាន @ — auto-check", code: '<input type="email">' },
  { type: "number",   color: "#f97316", label: "Number",   desc: "លេខ + arrow buttons",    code: '<input type="number" min="0" max="100">' },
  { type: "date",     color: "#ec4899", label: "Date",     desc: "ប្រតិទិន (date picker)", code: '<input type="date">' },
  { type: "color",    color: "#14b8a6", label: "Color",    desc: "ផ្ទាំងរើសពណ៌",           code: '<input type="color">' },
  { type: "range",    color: "#f59e0b", label: "Range",    desc: "Slider ចន្លោះ",          code: '<input type="range" min="0" max="100">' },
  { type: "checkbox", color: "#22c55e", label: "Checkbox", desc: "ជ្រើស ច្រើន items",       code: '<input type="checkbox">' },
  { type: "radio",    color: "#ef4444", label: "Radio",    desc: "ជ្រើស ១ ក្នុង group",     code: '<input type="radio" name="grp">' },
  { type: "file",     color: "#6366f1", label: "File",     desc: "Upload ឯកសារ",           code: '<input type="file">' },
];

export function InputTypesDiagram() {
  const [active, setActive] = useState(0);
  const t = INPUT_TYPES[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Type buttons */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {INPUT_TYPES.map((it, i) => (
          <button key={it.type} onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all
              ${active === i ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === i ? it.color : undefined }}>
            {it.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label={`type="${t.type}" — ${t.desc}`}
          badge="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Live input preview */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Live Preview</div>
            <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-4 flex flex-col gap-3">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {t.label}:
              </label>
              {t.type === "checkbox" && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" style={{ accentColor: t.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">ចុះឈ្មោះទទួលព័ត៌មាន</span>
                </div>
              )}
              {t.type === "radio" && (
                <div className="space-y-1.5">
                  {["Frontend", "Backend", "Fullstack"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <input type="radio" name="preview-radio" className="cursor-pointer" style={{ accentColor: t.color }} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
              {t.type === "range" && (
                <input type="range" min={0} max={100} defaultValue={50} className="w-full cursor-pointer" style={{ accentColor: t.color }} />
              )}
              {t.type === "color" && (
                <input type="color" defaultValue={t.color} className="w-12 h-8 rounded cursor-pointer border border-gray-300" />
              )}
              {t.type === "file" && (
                <input type="file" className="text-xs text-gray-600 dark:text-gray-300 cursor-pointer" />
              )}
              {!["checkbox","radio","range","color","file"].includes(t.type) && (
                <input
                  type={t.type}
                  placeholder={t.type === "text" ? "វាយអក្សររបស់អ្នក..." : undefined}
                  className="w-full rounded-lg border-2 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
                  style={{ borderColor: t.color }}
                />
              )}
            </div>
          </div>

          {/* Code + info */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 text-xs font-semibold" style={{ background: t.color + "18", color: t.color, border: `1px solid ${t.color}44` }}>
              🏷️ {t.desc}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono">
              <div className="text-gray-400 mb-1">{"// HTML code"}</div>
              <div className="text-green-300 break-all">{t.code}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── 3. Form Validation Diagram ───────────────────────────────────────────────
const VALIDATION_ATTRS = [
  { attr: "required",   color: "#ef4444", desc: "ត្រូវតែបំពេញ",                 example: "required",                   test: (v: string) => v.trim().length > 0 },
  { attr: "minlength",  color: "#f97316", desc: "ត្រូវការអក្សរ min 4",           example: 'minlength="4"',              test: (v: string) => v.length >= 4 },
  { attr: "maxlength",  color: "#3b82f6", desc: "ហាមអក្សរលើស 8",               example: 'maxlength="8"',              test: (v: string) => v.length <= 8 },
  { attr: "pattern",    color: "#8b5cf6", desc: "ត្រូវតែជាលេខ (digits only)",    example: 'pattern="[0-9]+"',           test: (v: string) => /^[0-9]+$/.test(v) },
  { attr: "min/max",    color: "#22c55e", desc: "Number ១–១០០",                  example: 'type="number" min="1" max="100"', test: (v: string) => { const n = Number(v); return !isNaN(n) && n >= 1 && n <= 100; } },
];

export function FormValidationDiagram() {
  const [active, setActive] = useState(0);
  const [value, setValue] = useState("");

  const rule = VALIDATION_ATTRS[active];
  const isValid = value.length > 0 && rule.test(value);
  const isEmpty = value.length === 0;

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Attribute buttons */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {VALIDATION_ATTRS.map((r, i) => (
          <button key={r.attr} onClick={() => { setActive(i); setValue(""); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border-2 cursor-pointer transition-all
              ${active === i ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === i ? r.color : undefined }}>
            {r.attr}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label={`${rule.attr} — ${rule.desc}`}
          badge="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        />
        <div className="p-6 space-y-4">
          {/* Live input */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">
              Try It — វាយអក្សររបស់អ្នក
            </div>
            <input
              type={rule.attr === "min/max" ? "number" : "text"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="វាយអ្វីមួយ..."
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none transition-colors`}
              style={{ borderColor: isEmpty ? "#d1d5db" : isValid ? "#22c55e" : rule.color }}
            />
          </div>

          {/* Status badge */}
          <div className={`rounded-xl p-3 text-sm font-bold text-center transition-all
            ${isEmpty
              ? "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400"
              : isValid
                ? "bg-green-50 dark:bg-green-950/20 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300"
                : "bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"}`}>
            {isEmpty
              ? "👆 ចាប់ផ្តើមវាយអ្វីមួយ..."
              : isValid
                ? "✅ Validation ត្រឹមត្រូវ!"
                : `❌ ខុស — ${rule.desc}`}
          </div>

          {/* Code snippet */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-gray-400">{"<!-- HTML validation attribute -->"}</div>
            <div>
              <span className="text-blue-400">{"<input"}</span>
              <span className="text-yellow-300">{" type"}</span>
              <span className="text-white">{"=\"text\""}</span>
              <span className="text-yellow-300">{` ${rule.attr !== "min/max" ? rule.attr : "type=\"number\" min"}`}</span>
              {rule.attr !== "required" && (
                <span className="text-green-300">{`="${rule.example.split('"')[1]}"`}</span>
              )}
              <span className="text-blue-400">{">"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Form Controls Diagram (select / textarea / datalist / fieldset) ───────
type FormControl = "select" | "textarea" | "datalist" | "fieldset";

const CONTROLS: { id: FormControl; label: string; color: string; desc: string }[] = [
  { id: "select",    color: "#3b82f6", label: "<select>",    desc: "Dropdown — ជ្រើស ១ ពីបញ្ជី" },
  { id: "textarea",  color: "#8b5cf6", label: "<textarea>",  desc: "Text វែងៗ (comment, message)" },
  { id: "datalist",  color: "#f97316", label: "<datalist>",  desc: "Auto-complete + free text" },
  { id: "fieldset",  color: "#22c55e", label: "<fieldset>",  desc: "ចងក្រង inputs ជាក្រុម" },
];

export function FormControlsDiagram() {
  const [active, setActive] = useState<FormControl>("select");
  const [selectVal, setSelectVal] = useState("toyota");
  const [textareaVal, setTextareaVal] = useState("");
  const [datalistVal, setDatalistVal] = useState("");

  const ctrl = CONTROLS.find((c) => c.id === active)!;

  return (
    <div className="not-prose my-8 font-sans select-none">
      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {CONTROLS.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono border-2 cursor-pointer transition-all
              ${active === c.id ? "border-transparent text-white shadow-md scale-105" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"}`}
            style={{ background: active === c.id ? c.color : undefined }}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <code className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {ctrl.label} — {ctrl.desc}
          </code>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Live preview */}
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-2">Live Preview</div>
            <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">

              {active === "select" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">រើសឡាន៖</label>
                  <select value={selectVal} onChange={(e) => setSelectVal(e.target.value)}
                    className="w-full rounded-lg border-2 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer"
                    style={{ borderColor: ctrl.color }}>
                    <optgroup label="ឡានជប៉ុន">
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                    </optgroup>
                    <optgroup label="ឡានអាល្លឺម៉ង់">
                      <option value="bmw">BMW</option>
                    </optgroup>
                  </select>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Selected: <span className="font-bold" style={{ color: ctrl.color }}>{selectVal}</span>
                  </div>
                </div>
              )}

              {active === "textarea" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">សារ / Comment:</label>
                  <textarea rows={4} value={textareaVal}
                    onChange={(e) => setTextareaVal(e.target.value)}
                    placeholder="វាយសារនៅទីនេះ..."
                    className="w-full rounded-lg border-2 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none resize-none"
                    style={{ borderColor: ctrl.color }} />
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {textareaVal.length} chars — resize ជ្រុងខាងក្រោម-ស្តាំ
                  </div>
                </div>
              )}

              {active === "datalist" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">រើស Browser (ឬវាយខ្លួនឯង):</label>
                  <input list="preview-browsers" value={datalistVal}
                    onChange={(e) => setDatalistVal(e.target.value)}
                    placeholder="Chrome, Firefox..."
                    className="w-full rounded-lg border-2 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none"
                    style={{ borderColor: ctrl.color }} />
                  <datalist id="preview-browsers">
                    <option value="Chrome" />
                    <option value="Firefox" />
                    <option value="Safari" />
                    <option value="Edge" />
                    <option value="Brave" />
                  </datalist>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ✏️ អ្នកអាចវាយអ្វីក៏បាន មិនត្រូវជ្រើសពីបញ្ជីទេ
                  </div>
                </div>
              )}

              {active === "fieldset" && (
                <fieldset className="rounded-xl border-2 p-4" style={{ borderColor: ctrl.color }}>
                  <legend className="px-2 text-xs font-bold" style={{ color: ctrl.color }}>ព័ត៌មានផ្ទាល់ខ្លួន</legend>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">ឈ្មោះ:</label>
                      <input type="text" placeholder="វាយឈ្មោះ..."
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-1.5 text-xs bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">ត្រកូល:</label>
                      <input type="text" placeholder="វាយត្រកូល..."
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-1.5 text-xs bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none" />
                    </div>
                  </div>
                </fieldset>
              )}
            </div>
          </div>

          {/* Code + note */}
          <div className="space-y-3">
            <div className="rounded-xl p-3 text-xs font-semibold"
              style={{ background: ctrl.color + "18", color: ctrl.color, border: `1px solid ${ctrl.color}44` }}>
              🎯 {ctrl.desc}
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-1 overflow-x-auto">
              {active === "select" && <>
                <div className="text-blue-400">{"<select name=\"car\">"}</div>
                <div className="pl-3 text-yellow-300">{"<optgroup label=\"ឡានជប៉ុន\">"}</div>
                <div className="pl-6 text-green-300">{"<option value=\"toyota\">Toyota</option>"}</div>
                <div className="pl-3 text-yellow-300">{"</optgroup>"}</div>
                <div className="text-blue-400">{"</select>"}</div>
              </>}
              {active === "textarea" && <>
                <div className="text-blue-400">{"<textarea"}</div>
                <div className="pl-3 text-yellow-300">{"name=\"message\""}</div>
                <div className="pl-3 text-yellow-300">{"rows=\"4\""}</div>
                <div className="pl-3 text-yellow-300">{"placeholder=\"...\">"}</div>
                <div className="text-blue-400">{"</textarea>"}</div>
              </>}
              {active === "datalist" && <>
                <div className="text-blue-400">{"<input list=\"opts\" name=\"browser\">"}</div>
                <div className="mt-1 text-orange-400">{"<datalist id=\"opts\">"}</div>
                <div className="pl-3 text-green-300">{"<option value=\"Chrome\">"}</div>
                <div className="pl-3 text-green-300">{"<option value=\"Firefox\">"}</div>
                <div className="text-orange-400">{"</datalist>"}</div>
              </>}
              {active === "fieldset" && <>
                <div className="text-green-400">{"<fieldset>"}</div>
                <div className="pl-3 text-yellow-300">{"<legend>ព័ត៌មានផ្ទាល់ខ្លួន</legend>"}</div>
                <div className="pl-3 text-blue-400">{"<label for=\"fn\">ឈ្មោះ:</label>"}</div>
                <div className="pl-3 text-blue-400">{"<input type=\"text\" id=\"fn\">"}</div>
                <div className="text-green-400">{"</fieldset>"}</div>
              </>}
            </div>

            {active === "select" && (
              <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-xs text-blue-800 dark:text-blue-200">
                💡 ប្រើ <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">&lt;optgroup&gt;</code> ដើម្បីចាត់ក្រុម options ជាផ្នែក
              </div>
            )}
            {active === "datalist" && (
              <div className="rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-3 text-xs text-orange-800 dark:text-orange-200">
                💡 ខុសពី <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">&lt;select&gt;</code> — អ្នកប្រើអាចវាយ custom text បានផងដែរ
              </div>
            )}
            {active === "fieldset" && (
              <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 text-xs text-green-800 dark:text-green-200">
                💡 <code className="bg-green-100 dark:bg-green-900 px-1 rounded">&lt;legend&gt;</code> បង្ហាញជា title នៅជ្រុងប្រអប់
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
