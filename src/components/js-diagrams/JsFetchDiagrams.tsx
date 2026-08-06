"use client";

import { useState, useRef, useEffect } from "react";

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

// ─── 1. Fetch Flow — animated step-by-step ────────────────────────────────────
const FETCH_STEPS = [
  {
    id: "call",
    icon: "📞",
    label: "① fetch() called",
    desc: "Browser ស្នើ HTTP request ទៅកាន់ Server",
    color: "#6366f1",
    code: 'const response = await fetch("https://api.example.com/users");',
  },
  {
    id: "network",
    icon: "🌐",
    label: "② Network Request",
    desc: "Packet ធ្វើដំណើរតាម Internet → Server",
    color: "#f97316",
    code: "// GET /users HTTP/1.1\n// Host: api.example.com",
  },
  {
    id: "server",
    icon: "🖥️",
    label: "③ Server Responds",
    desc: "Server ត្រឡប់ Response (status 200, JSON body)",
    color: "#22c55e",
    code: '// HTTP/1.1 200 OK\n// Content-Type: application/json\n// [{"id":1,"name":"Dara"}, ...]',
  },
  {
    id: "parse",
    icon: "🔄",
    label: "④ response.json()",
    desc: "Parse JSON string → JavaScript Object",
    color: "#3b82f6",
    code: "const data = await response.json();\n// data = [{ id: 1, name: 'Dara' }, ...]",
  },
  {
    id: "render",
    icon: "🖼️",
    label: "⑤ Update DOM",
    desc: "យក data ទៅបង្ហាញនៅលើ Page",
    color: "#ec4899",
    code: "renderUsers(data);\n// <li>Dara</li><li>Srey</li>...",
  },
];

export function FetchFlowDiagram() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<"success" | "error" | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function run(result: "success" | "error") {
    clearAll();
    setStep(-1);
    setOutcome(null);
    setRunning(true);

    if (result === "error") {
      // Fails at network step
      const t0 = setTimeout(() => setStep(0), 300);
      const t1 = setTimeout(() => setStep(1), 900);
      const t2 = setTimeout(() => {
        setOutcome("error");
        setRunning(false);
      }, 2000);
      timersRef.current.push(t0, t1, t2);
    } else {
      FETCH_STEPS.forEach((_, i) => {
        const t = setTimeout(() => {
          setStep(i);
          if (i === FETCH_STEPS.length - 1) {
            setTimeout(() => {
              setOutcome("success");
              setRunning(false);
            }, 500);
          }
        }, 400 + i * 800);
        timersRef.current.push(t);
      });
    }
  }

  function reset() {
    clearAll();
    setStep(-1);
    setRunning(false);
    setOutcome(null);
  }

  useEffect(() => () => clearAll(), []);

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="Fetch API — Request / Response Flow"
          badge="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
        />
        <div className="p-6 space-y-4">

          {/* Steps */}
          <div className="space-y-2">
            {FETCH_STEPS.map((s, i) => {
              const active = i === step;
              const done = i < step || (outcome === "success" && step === FETCH_STEPS.length - 1);
              const visible = i <= step;
              // error kills at step 1
              const errored = outcome === "error" && i === 1;
              return (
                <div
                  key={s.id}
                  className={`flex gap-3 rounded-xl px-3 py-2.5 border-2 text-xs transition-all duration-300 ${
                    errored
                      ? "border-red-400 bg-red-50 dark:bg-red-950/20"
                      : active
                      ? "scale-[1.01]"
                      : visible
                      ? "opacity-70"
                      : "opacity-25"
                  }`}
                  style={
                    !errored
                      ? {
                          borderColor: visible ? s.color : "#374151",
                          background: active ? s.color + "18" : "transparent",
                        }
                      : {}
                  }
                >
                  <span className="text-base shrink-0 mt-0.5">{errored ? "❌" : done ? "✅" : active ? s.icon : "○"}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold mb-0.5"
                      style={{ color: errored ? "#ef4444" : visible ? s.color : "#6b7280" }}
                    >
                      {errored ? "② Network Error — server unreachable" : s.label}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-[11px]">
                      {errored ? "catch block ត្រូវបានដំណើរការ — console.error(error)" : s.desc}
                    </div>
                    {active && !errored && (
                      <div className="mt-1.5 bg-gray-900 rounded-lg p-2 font-mono text-[10px] text-green-400 whitespace-pre">
                        {s.code}
                      </div>
                    )}
                    {errored && (
                      <div className="mt-1.5 bg-gray-900 rounded-lg p-2 font-mono text-[10px] text-red-400">
                        {"catch (error) { console.error(error); }"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outcome banner */}
          {outcome === "success" && (
            <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border-2 border-green-400 p-3 text-center text-sm font-bold text-green-700 dark:text-green-300">
              🎉 ទទួលបានទិន្នន័យ ហើយបង្ហាញលើ DOM រួចហើយ!
            </div>
          )}
          {outcome === "error" && (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border-2 border-red-400 p-3 text-center text-sm font-bold text-red-600 dark:text-red-400">
              ❌ Network Error — try/catch បានចាប់ error!
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => run("success")}
              disabled={running}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ▶ Fetch (success)
            </button>
            <button
              onClick={() => run("error")}
              disabled={running}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ▶ Fetch (network error)
            </button>
            {(step >= 0 || outcome) && !running && (
              <button
                onClick={reset}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                ↺ Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. HTTP Status Codes Diagram ─────────────────────────────────────────────
const HTTP_CODES = [
  { code: 200, label: "OK",                   color: "#22c55e", group: "2xx Success",   desc: "Request ជោគជ័យ — data ត្រូវបានត្រឡប់" },
  { code: 201, label: "Created",              color: "#16a34a", group: "2xx Success",   desc: "Resource ថ្មីត្រូវបានបង្កើត (POST)" },
  { code: 400, label: "Bad Request",          color: "#f97316", group: "4xx Client",    desc: "Request មានទម្រង់ខុស ឬ parameters ខ្វះ" },
  { code: 401, label: "Unauthorized",         color: "#f97316", group: "4xx Client",    desc: "ត្រូវការ Authentication — Token ខ្វះ" },
  { code: 403, label: "Forbidden",            color: "#ef4444", group: "4xx Client",    desc: "Authenticated ប៉ុន្តែ Permission គ្មាន" },
  { code: 404, label: "Not Found",            color: "#ef4444", group: "4xx Client",    desc: "Resource ដែលស្នើ រកមិនឃើញ" },
  { code: 500, label: "Internal Server Error",color: "#dc2626", group: "5xx Server",    desc: "Server crashed — not your fault" },
];

export function FetchStatusCodesDiagram() {
  const [active, setActive] = useState(0);
  const item = HTTP_CODES[active];

  const groupColor = (g: string) =>
    g.startsWith("2xx") ? "#22c55e" : g.startsWith("4xx") ? "#f97316" : "#ef4444";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="HTTP Status Codes — response.status"
          badge="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"
        />
        <div className="p-6 space-y-4">

          {/* Code buttons */}
          <div className="flex flex-wrap gap-2">
            {HTTP_CODES.map((c, i) => (
              <button
                key={c.code}
                onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 cursor-pointer transition-all ${
                  active === i ? "text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                }`}
                style={{ background: active === i ? c.color : undefined }}
              >
                {c.code}
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div
            className="rounded-xl border-2 p-5 flex flex-col gap-2"
            style={{ borderColor: item.color, background: item.color + "12" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black" style={{ color: item.color }}>{item.code}</span>
              <div>
                <div className="font-bold text-sm" style={{ color: item.color }}>{item.label}</div>
                <div
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 inline-block"
                  style={{ background: groupColor(item.group) + "22", color: groupColor(item.group) }}
                >
                  {item.group}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">{item.desc}</div>
          </div>

          {/* Code snippet */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-blue-400">const response = <span className="text-indigo-400">await</span> fetch(url);</div>
            <div className="text-gray-400 mt-1">{"// ✅ check status before using data"}</div>
            <div className={item.code === 200 || item.code === 201 ? "text-green-400 font-bold" : "text-gray-500"}>
              {`if (response.ok) {          // status 200–299`}
            </div>
            <div className={item.code === 200 || item.code === 201 ? "text-green-400" : "text-gray-500"}>
              {"  const data = await response.json();"}
            </div>
            <div className={item.code >= 400 ? "text-red-400 font-bold" : "text-gray-500"}>
              {"} else {"}
            </div>
            <div className={item.code >= 400 ? "text-red-400 font-bold" : "text-gray-500"}>
              {`  throw new Error(\`HTTP \${response.status}\`);`}
            </div>
            <div className={item.code >= 400 ? "text-red-400" : "text-gray-500"}>{"}"}</div>
            <div className="text-gray-400 mt-1 border-t border-gray-700 pt-1">
              {"// response.status → "}
              <span style={{ color: item.color }}>{item.code}</span>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-3 py-2 text-[11px] text-blue-700 dark:text-blue-300">
            💡 <code className="font-mono bg-blue-100 dark:bg-blue-900/50 px-1 rounded">response.ok</code> គឺ{" "}
            <strong>true</strong> តែពេល status ស្ថិតរវាង <strong>200–299</strong> ប៉ុណ្ណោះ
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Fetch + DOM Render Simulation ────────────────────────────────────────
const FAKE_USERS = [
  { id: 1, name: "Dara Sok",     email: "dara@example.com",  role: "Developer" },
  { id: 2, name: "Srey Neang",   email: "srey@example.com",  role: "Designer"  },
  { id: 3, name: "Ratha Chan",   email: "ratha@example.com", role: "PM"         },
  { id: 4, name: "Bopha Vann",   email: "bopha@example.com", role: "QA"         },
  { id: 5, name: "Minea Heng",   email: "minea@example.com", role: "DevOps"    },
];

type FetchState = "idle" | "loading" | "success" | "error";

export function FetchDomRenderDiagram() {
  const [state, setState] = useState<FetchState>("idle");
  const [users, setUsers] = useState<typeof FAKE_USERS>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function simulateFetch(forceError = false) {
    clearAll();
    setUsers([]);
    setRevealedCount(0);
    setState("loading");

    if (forceError) {
      const t = setTimeout(() => setState("error"), 1800);
      timersRef.current.push(t);
      return;
    }

    // After 1.4s "network delay", reveal users one-by-one
    const t0 = setTimeout(() => {
      setState("success");
      setUsers(FAKE_USERS);
      FAKE_USERS.forEach((_, i) => {
        const t = setTimeout(() => setRevealedCount(i + 1), i * 200);
        timersRef.current.push(t);
      });
    }, 1400);
    timersRef.current.push(t0);
  }

  function reset() {
    clearAll();
    setState("idle");
    setUsers([]);
    setRevealedCount(0);
  }

  useEffect(() => () => clearAll(), []);

  const btnLabel =
    state === "idle" ? "ទាញយកអ្នកប្រើប្រាស់" :
    state === "loading" ? "កំពុងទាញយក..." :
    "ទាញយកអ្នកប្រើប្រាស់";

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="Fetch + DOM — Live Simulation"
          badge="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300"
        />
        <div className="p-6 space-y-4">

          {/* Simulated browser window */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white dark:bg-gray-900 rounded px-2 py-0.5 text-[10px] font-mono text-gray-500 dark:text-gray-400 ml-1">
                http://localhost:3000/users
              </div>
              {state === "loading" && (
                <span className="text-[10px] text-indigo-500 animate-pulse font-semibold">⏳ Loading...</span>
              )}
            </div>

            {/* Page body */}
            <div className="bg-white dark:bg-gray-950 min-h-[160px] p-4">
              {/* Button */}
              <button
                onClick={() => simulateFetch(false)}
                disabled={state === "loading"}
                className={`mb-4 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  state === "loading" ? "bg-gray-500 animate-pulse" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {btnLabel}
              </button>

              {/* User list */}
              {state === "success" && (
                <ul className="space-y-1.5">
                  {users.slice(0, revealedCount).map((u) => (
                    <li
                      key={u.id}
                      className="flex items-center gap-2.5 rounded-lg border border-gray-100 dark:border-gray-800 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 animate-fadeIn"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {u.name[0]}
                      </span>
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{u.name}</span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">{u.email}</span>
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium">
                        {u.role}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {state === "error" && (
                <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-3 py-2 text-xs text-red-600 dark:text-red-400 font-semibold">
                  ❌ មានបញ្ហាក្នុងការទាញយកទិន្នន័យ — Network Error
                </div>
              )}

              {state === "idle" && (
                <div className="text-xs text-gray-400 italic">
                  ← ចុចប៊ូតុងខាងលើ ដើម្បីទាញយកទិន្នន័យ
                </div>
              )}
            </div>
          </div>

          {/* Code walkthrough */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-gray-400 mb-1">{"// JavaScript code running behind the scenes:"}</div>
            <div className={state === "loading" ? "text-indigo-400 font-bold" : "text-gray-500"}>
              btn.addEventListener(<span className="text-yellow-300">"click"</span>, handleFetch);
            </div>
            <div className={state === "loading" ? "text-indigo-400 font-bold" : "text-gray-500"}>
              {"const response = await fetch(url);       "}
              {state === "loading" && <span className="text-orange-400 animate-pulse">{"// ⏳ waiting..."}</span>}
            </div>
            <div className={state === "success" ? "text-green-400 font-bold" : "text-gray-500"}>
              {"const data = await response.json();"}
              {state === "success" && <span className="text-green-500">{" // ✅ [{id:1,...}]"}</span>}
            </div>
            <div className={state === "success" && revealedCount > 0 ? "text-pink-400 font-bold" : "text-gray-500"}>
              {"renderUsers(data);"}
              {state === "success" && revealedCount > 0 && <span className="text-pink-400">{` // បង្ហាញ ${revealedCount} នាក់`}</span>}
            </div>
            <div className={state === "error" ? "text-red-400 font-bold" : "text-gray-500"}>
              {"} catch (error) { console.error(error); }"}
              {state === "error" && <span className="text-red-500">{" // ❌ caught!"}</span>}
            </div>
          </div>

          {/* Error sim button */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => simulateFetch(true)}
              disabled={state === "loading"}
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              🔴 Simulate Network Error
            </button>
            {state !== "idle" && state !== "loading" && (
              <button
                onClick={reset}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                ↺ Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
