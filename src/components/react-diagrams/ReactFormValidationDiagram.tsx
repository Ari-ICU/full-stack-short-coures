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
        Interactive Form Validation Simulator
      </span>
    </div>
  );
}

export function ReactFormValidationDiagram() {
  const [useTouchedPattern, setUseTouchedPattern] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
  const [lastAction, setLastAction] = useState<string>("ទំព័រទើបតែ Load — មិនទាន់មាន User Action");

  // Pure validation rules (Derived)
  const errors: { email?: string; password?: string } = {};
  if (!formData.email.trim()) {
    errors.email = "Email មិនអាចទទេបានទេ!";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "ទម្រង់ Email មិនត្រឹមត្រូវ (ឧ. name@example.com)!";
  }

  if (!formData.password) {
    errors.password = "Password មិនអាចទទេបានទេ!";
  } else if (formData.password.length < 8) {
    errors.password = "Password ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ!";
  }

  const isFormValid = !errors.email && !errors.password;

  // Determining whether to show error based on UX mode
  const showEmailError = useTouchedPattern ? touched.email && !!errors.email : !!errors.email;
  const showPasswordError = useTouchedPattern ? touched.password && !!errors.password : !!errors.password;

  const handleChange = (field: "email" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setLastAction(`User វាយបញ្ចូលក្នុង ${field}: "${value}" (onChange)`);
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setLastAction(`User ចាកចេញពី field ${field} (onBlur) ➔ កំណត់ touched.${field} = true`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid) {
      setLastAction("❌ Submit បរាជ័យ! មាន Error មិនទាន់កែប្រែ ➔ Touched fields ទាំងអស់ត្រូវបានបើក");
      return;
    }

    setSubmitState("loading");
    setLastAction("⏳ Form ត្រឹមត្រូវ! កំពុង Submit ទៅកាន់ Server (loading state)...");

    setTimeout(() => {
      setSubmitState("success");
      setLastAction("🎉 Submit ជោគជ័យ! បង្ហាញផ្ទាំង Success Screen");
    }, 1300);
  };

  const handleReset = () => {
    setFormData({ email: "", password: "" });
    setTouched({});
    setSubmitState("idle");
    setLastAction("🔄 Reset Form ត្រឡប់មកស្ថានភាពដើម (idle)");
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-lg">
        <PanelHeader
          label="React Form Validation & Touched Pattern"
          badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
        />

        {/* Mode Selector Header */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">
            របៀបបង្ហាញ Error (UX Mode):
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseTouchedPattern(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                useTouchedPattern
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
              }`}
            >
              <span>✅ ប្រើ Touched Pattern (UX ល្អ)</span>
            </button>
            <button
              onClick={() => setUseTouchedPattern(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                !useTouchedPattern
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
              }`}
            >
              <span>❌ គ្មាន Touched (Aggressive UX)</span>
            </button>
          </div>
        </div>

        {/* Last Action Notification Bar */}
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <span className="font-bold shrink-0">📍 Action ចុងក្រោយ:</span>
          <span className="truncate">{lastAction}</span>
        </div>

        {/* Main Grid: Left = Interactive Form, Right = Live State Inspector */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-gray-50/70 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📝 សាកល្បងបំពេញ Form ផ្ទាល់</span>
              </h4>
              <button
                onClick={handleReset}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Reset Form
              </button>
            </div>

            {submitState === "success" ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                <span className="text-4xl block mb-2">🎉</span>
                <h5 className="font-bold text-emerald-800 dark:text-emerald-300 text-base">
                  ចុះឈ្មោះជោគជ័យ ១០០%!
                </h5>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  ទិន្នន័យត្រឹមត្រូវតាមលក្ខខណ្ឌទាំងអស់ ហើយត្រូវបានផ្ញើទៅ Server ដោយជោគជ័យ។
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition"
                >
                  សាកល្បងម្តងទៀត
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="flex gap-1.5 text-[10px]">
                      <span
                        className={`px-1.5 py-0.5 rounded font-mono ${
                          touched.email
                            ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}
                      >
                        touched: {touched.email ? "true" : "false"}
                      </span>
                    </div>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="ឈ្មោះ@example.com"
                    className={`w-full px-3 py-2 text-sm rounded-lg border transition outline-none dark:bg-gray-900 text-gray-900 dark:text-white ${
                      showEmailError
                        ? "border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900/30 bg-rose-50/30 dark:bg-rose-950/20"
                        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                    }`}
                  />
                  {showEmailError && (
                    <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium animate-fadeIn">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Password (យ៉ាងតិច ៨ តួ)
                    </label>
                    <div className="flex gap-1.5 text-[10px]">
                      <span
                        className={`px-1.5 py-0.5 rounded font-mono ${
                          touched.password
                            ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}
                      >
                        touched: {touched.password ? "true" : "false"}
                      </span>
                    </div>
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="បញ្ចូល Password..."
                    className={`w-full px-3 py-2 text-sm rounded-lg border transition outline-none dark:bg-gray-900 text-gray-900 dark:text-white ${
                      showPasswordError
                        ? "border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900/30 bg-rose-50/30 dark:bg-rose-950/20"
                        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                    }`}
                  />
                  {showPasswordError && (
                    <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium animate-fadeIn">
                      <span>⚠️</span> {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitState === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>កំពុងផ្ញើទិន្នន័យ (Loading... ការពារ Double-click)...</span>
                    </>
                  ) : (
                    <span>ចុច Submit Form</span>
                  )}
                </button>
              </form>
            )}

            {/* UX Explanation callout */}
            <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {useTouchedPattern ? (
                <span>
                  💡 <strong>Touced Pattern:</strong> Error នឹងបង្ហាញ <strong>តែពេលដែល</strong> អ្នកបានចុចចូល input ហើយចាកចេញ (Blur) ឬពេលចុច Submit ប៉ុណ្ណោះ។ នេះធ្វើឱ្យ User មិនមានអារម្មណ៍តានតឹង!
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400">
                  ⚠️ <strong>Aggressive UX:</strong> ទំព័រទើបតែបើកភ្លាម Error ក្រហមលោតឡើងភ្លែត (ទោះបី User មិនទាន់បានប៉ះ Keyboard ក៏ដោយ)។ នេះជាបទពិសោធន៍ UX មិនល្អ!
                </span>
              )}
            </div>
          </div>

          {/* Right: Live React State Inspector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 p-4 text-xs font-mono shadow-md text-gray-200">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-700 text-gray-400">
                <span className="font-bold text-yellow-400 flex items-center gap-1.5">
                  <span>⚛️</span> React State Inspector
                </span>
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-300">
                  Live Snapshot
                </span>
              </div>

              {/* formData */}
              <div className="mb-2">
                <span className="text-blue-400">formData</span>: {"{"}
                <div className="pl-4 text-gray-300">
                  email: <span className="text-green-300">&quot;{formData.email}&quot;</span>,
                  <br />
                  password: <span className="text-green-300">&quot;{formData.password ? "••••••••" : ""}&quot;</span>
                </div>
                {"}"}
              </div>

              {/* touched */}
              <div className="mb-2">
                <span className="text-purple-400">touched</span>: {"{"}
                <div className="pl-4 text-gray-300">
                  email: <span className={touched.email ? "text-emerald-400 font-bold" : "text-gray-500"}>{String(!!touched.email)}</span>,
                  <br />
                  password: <span className={touched.password ? "text-emerald-400 font-bold" : "text-gray-500"}>{String(!!touched.password)}</span>
                </div>
                {"}"}
              </div>

              {/* errors (Derived) */}
              <div className="mb-2">
                <span className="text-rose-400">errors (Derived)</span>: {"{"}
                <div className="pl-4 text-gray-400">
                  {errors.email ? (
                    <div>email: <span className="text-rose-300">&quot;{errors.email}&quot;</span>,</div>
                  ) : (
                    <div className="text-emerald-400">email: null (Valid ✅),</div>
                  )}
                  {errors.password ? (
                    <div>password: <span className="text-rose-300">&quot;{errors.password}&quot;</span></div>
                  ) : (
                    <div className="text-emerald-400">password: null (Valid ✅)</div>
                  )}
                </div>
                {"}"}
              </div>

              {/* submitState */}
              <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                <span className="text-amber-400">submitState:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    submitState === "loading"
                      ? "bg-amber-500/20 text-amber-300 animate-pulse"
                      : submitState === "success"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  &apos;{submitState}&apos;
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-cyan-400">isFormValid:</span>
                <span
                  className={`font-bold ${
                    isFormValid ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {String(isFormValid)}
                </span>
              </div>
            </div>

            {/* Quick Mental Model Rule */}
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs text-gray-700 dark:text-gray-300 space-y-1.5">
              <div className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <span>🧠</span> រូបមន្តចងចាំងាយៗ:
              </div>
              <p className="text-[11px] leading-relaxed">
                បង្ហាញ Error លុះត្រាតែ: <code className="text-pink-600 dark:text-pink-400 font-bold">touched[field] &amp;&amp; errors[field]</code>
              </p>
              <ul className="text-[10px] text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-4">
                <li><code>onChange</code>: កែប្រែតែ <code>formData</code> ប៉ុណ្ណោះ</li>
                <li><code>onBlur</code>: កំណត់ <code>touched[field] = true</code></li>
                <li><code>onSubmit</code>: កំណត់ <code>touched ទាំងអស់ = true</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
