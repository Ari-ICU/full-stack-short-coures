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

// ─── 1. Class Blueprint → Instances ──────────────────────────────────────────
const PRESET_USERS = [
  { name: "Sok",   age: 25 },
  { name: "Dara",  age: 30 },
  { name: "Srey",  age: 22 },
];

type UserInstance = { id: number; name: string; age: number };

export function ClassBlueprintDiagram() {
  const [name, setName] = useState("Minea");
  const [age, setAge] = useState(28);
  const [instances, setInstances] = useState<UserInstance[]>([
    { id: 1, name: "Sok", age: 25 },
    { id: 2, name: "Dara", age: 30 },
  ]);
  const [nextId, setNextId] = useState(3);
  const [justAdded, setJustAdded] = useState<number | null>(null);

  function createInstance() {
    const id = nextId;
    setInstances((prev) => [...prev, { id, name, age }]);
    setNextId((n) => n + 1);
    setJustAdded(id);
    setTimeout(() => setJustAdded(null), 600);
  }

  function removeInstance(id: number) {
    setInstances((prev) => prev.filter((u) => u.id !== id));
  }

  function loadPreset(p: { name: string; age: number }) {
    setName(p.name);
    setAge(p.age);
  }

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="class User — Blueprint → Instances"
          badge="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
        />
        <div className="p-6 space-y-5">
          {/* Blueprint box */}
          <div className="rounded-xl border-2 border-violet-400 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/20 p-4">
            <div className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 mb-2 tracking-wider">
              📐 Blueprint (Class Definition)
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono space-y-0.5">
              <div><span className="text-blue-400">class</span> <span className="text-yellow-300">User</span> {"{"}</div>
              <div className="pl-4"><span className="text-green-400">constructor</span>(<span className="text-orange-300">name</span>, <span className="text-orange-300">age</span>) {"{"}</div>
              <div className="pl-8"><span className="text-pink-400">this</span>.name = <span className="text-orange-300">name</span>;</div>
              <div className="pl-8"><span className="text-pink-400">this</span>.age = <span className="text-orange-300">age</span>;</div>
              <div className="pl-4">{"}"}</div>
              <div className="pl-4"><span className="text-green-400">greet</span>() {"{"}</div>
              <div className="pl-8 text-gray-400">{`console.log(\`Hi, I'm \${this.name}\`);`}</div>
              <div className="pl-4">{"}"}</div>
              <div>{"}"}</div>
            </div>
          </div>

          {/* new User(...) creator */}
          <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="text-[10px] uppercase font-bold text-gray-700 dark:text-gray-300 tracking-wider">
              ✨ new User(name, age) — បង្កើត Instance ថ្មី
            </div>
            <div className="flex flex-wrap gap-2 mb-1">
              {PRESET_USERS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => loadPreset(p)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:border-violet-400 cursor-pointer transition-all"
                >
                  {p.name}
                </button>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[100px]">
                <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-violet-400"
                />
              </div>
              <div className="w-24">
                <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(+e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 px-2 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-violet-400"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={createInstance}
                  disabled={!name.trim()}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + new User
                </button>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg px-3 py-2 text-xs font-mono text-violet-300">
              <span className="text-blue-400">const</span>{" "}
              <span className="text-white">user{nextId - 1}</span> = <span className="text-yellow-300">new</span>{" "}
              <span className="text-yellow-300">User</span>(
              <span className="text-orange-300">"{name || "..."}"</span>,{" "}
              <span className="text-orange-300">{age}</span>);
            </div>
          </div>

          {/* Instances grid */}
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-700 dark:text-gray-300 tracking-wider mb-2">
              📦 Objects created ({instances.length})
            </div>
            {instances.length === 0 ? (
              <div className="text-xs text-gray-400 italic text-center py-4">
                — គ្មាន instance ណាមួយ —
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {instances.map((u) => (
                  <div
                    key={u.id}
                    className={`rounded-xl border-2 p-3 transition-all duration-300 ${
                      justAdded === u.id
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30 scale-[1.02]"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                        Instance #{u.id}
                      </span>
                      <button
                        onClick={() => removeInstance(u.id)}
                        className="text-[10px] text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg px-3 py-2 text-xs font-mono space-y-0.5">
                      <div><span className="text-pink-400">this</span>.name = <span className="text-yellow-300">"{u.name}"</span></div>
                      <div><span className="text-pink-400">this</span>.age = <span className="text-orange-300">{u.age}</span></div>
                      <div className="text-gray-500 text-[10px] mt-1">greet() → "Hi, I&apos;m {u.name}"</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 px-3 py-2 text-[11px] text-violet-700 dark:text-violet-300">
            💡 Class = ពុម្ពគំរូ (Blueprint) — <code className="bg-violet-100 dark:bg-violet-900/50 px-1 rounded font-mono">new User()</code> រាល់ម្តងបង្កើត Object <strong>ថ្មីដែលឯករាជ្យ</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. this Keyword Diagram ──────────────────────────────────────────────────
const THIS_INSTANCES = [
  { varName: "user1", name: "Sok",  age: 25, color: "#6366f1" },
  { varName: "user2", name: "Dara", age: 30, color: "#f97316" },
  { varName: "user3", name: "Srey", age: 22, color: "#22c55e" },
];

export function ThisKeywordDiagram() {
  const [active, setActive] = useState(0);
  const inst = THIS_INSTANCES[active];

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="this — ចង្អុលទៅ Object ណា?"
          badge="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300"
        />
        <div className="p-6 space-y-4">

          {/* Instance selector */}
          <div className="flex gap-2">
            {THIS_INSTANCES.map((inst, i) => (
              <button
                key={inst.varName}
                onClick={() => setActive(i)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all ${
                  active === i ? "text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                }`}
                style={{ background: active === i ? inst.color : undefined }}
              >
                {inst.varName}
              </button>
            ))}
          </div>

          {/* Constructor call + this mapping */}
          <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-2">
            <div className="text-gray-400">{"// new User() ហៅ constructor..."}</div>
            <div>
              <span className="text-blue-400">const</span>{" "}
              <span style={{ color: inst.color }} className="font-bold">{inst.varName}</span>{" "}
              = <span className="text-yellow-300">new User</span>(
              <span className="text-orange-300">"{inst.name}"</span>,{" "}
              <span className="text-orange-300">{inst.age}</span>);
            </div>
            <div className="border-t border-gray-700 pt-2 text-gray-400">
              {"// inside constructor, `this` = "}
              <span style={{ color: inst.color }}>{inst.varName}</span>
            </div>
            <div style={{ color: inst.color }}>
              <span className="text-pink-400">this</span>.name = <span className="text-orange-300">"{inst.name}"</span>
              <span className="text-gray-500">{"  // → "}{inst.varName}.name</span>
            </div>
            <div style={{ color: inst.color }}>
              <span className="text-pink-400">this</span>.age = <span className="text-orange-300">{inst.age}</span>
              <span className="text-gray-500">{"  // → "}{inst.varName}.age</span>
            </div>
          </div>

          {/* Visual: this arrow */}
          <div className="flex gap-3 items-stretch">
            {/* this box */}
            <div className="flex-1 rounded-xl border-2 border-pink-300 dark:border-pink-700 bg-pink-50 dark:bg-pink-950/20 p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-pink-500 mb-2">this</div>
              <div className="text-xs text-pink-700 dark:text-pink-300 font-semibold">ចង្អុលទៅ Object<br />ដែលកំពុងបង្កើត</div>
            </div>
            {/* Arrow */}
            <div className="flex items-center">
              <div className="text-2xl font-bold" style={{ color: inst.color }}>→</div>
            </div>
            {/* Object box */}
            <div
              className="flex-1 rounded-xl border-2 p-3"
              style={{ borderColor: inst.color, background: inst.color + "15" }}
            >
              <div className="text-[10px] uppercase font-bold mb-2" style={{ color: inst.color }}>
                {inst.varName}
              </div>
              <div className="text-xs font-mono space-y-0.5">
                <div style={{ color: inst.color }}>name: <span className="text-orange-400">"{inst.name}"</span></div>
                <div style={{ color: inst.color }}>age: <span className="text-orange-400">{inst.age}</span></div>
                <div className="text-gray-500 text-[10px]">greet: ƒ()</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 px-3 py-2 text-[11px] text-pink-700 dark:text-pink-300">
            💡 <code className="font-mono bg-pink-100 dark:bg-pink-900/50 px-1 rounded">this</code> ផ្លាស់ប្តូរទៅតាម Object ដែលហៅ — {THIS_INSTANCES[0].varName} → {THIS_INSTANCES[0].varName}.name, {THIS_INSTANCES[1].varName} → {THIS_INSTANCES[1].varName}.name
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Inheritance — extends / super ────────────────────────────────────────
type InheritanceView = "parent" | "child" | "instance";

export function InheritanceDiagram() {
  const [view, setView] = useState<InheritanceView>("parent");
  const [instanceType, setInstanceType] = useState<"user" | "admin">("user");

  const parentProps  = ["name", "age"];
  const parentMethods = ["constructor(name, age)", "greet()"];
  const childProps   = ["role"];
  const childMethods = ["constructor(name, age, role)", "deletePost()"];

  const instance =
    instanceType === "user"
      ? { label: "user1 = new User('Sok', 25)", props: [{ k: "name", v: '"Sok"' }, { k: "age", v: "25" }], methods: ["greet()"], from: "User", color: "#6366f1" }
      : { label: "admin1 = new Admin('Alice', 28, 'SuperAdmin')", props: [{ k: "name", v: '"Alice"' }, { k: "age", v: "28" }, { k: "role", v: '"SuperAdmin"' }], methods: ["greet()", "deletePost()"], from: "Admin extends User", color: "#22c55e" };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-2xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader
          label="Inheritance — extends & super"
          badge="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
        />
        <div className="p-6 space-y-4">

          {/* Tab selector */}
          <div className="flex gap-2">
            {(["parent", "child", "instance"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all ${
                  view === v
                    ? v === "parent" ? "bg-indigo-600 border-transparent text-white"
                    : v === "child"  ? "bg-green-600 border-transparent text-white"
                    :                  "bg-orange-500 border-transparent text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                }`}
              >
                {v === "parent" ? "👨 User (Parent)" : v === "child" ? "👦 Admin (Child)" : "📦 Instance"}
              </button>
            ))}
          </div>

          {/* Parent view */}
          {view === "parent" && (
            <div className="space-y-3">
              <div className="rounded-xl border-2 border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 overflow-hidden">
                <div className="px-3 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                  class User (Parent Class)
                </div>
                <div className="p-3 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-bold text-indigo-500 uppercase mb-1.5">Properties</div>
                    {parentProps.map((p) => (
                      <div key={p} className="text-xs font-mono bg-white dark:bg-gray-800 rounded-lg px-2 py-1 mb-1 text-indigo-700 dark:text-indigo-300">
                        this.{p}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-indigo-500 uppercase mb-1.5">Methods</div>
                    {parentMethods.map((m) => (
                      <div key={m} className="text-xs font-mono bg-white dark:bg-gray-800 rounded-lg px-2 py-1 mb-1 text-green-600 dark:text-green-400">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                Admin <strong>extends User</strong> → Admin ទទួលបាន properties & methods ទាំងអស់!
              </div>
            </div>
          )}

          {/* Child view */}
          {view === "child" && (
            <div className="space-y-3">
              {/* Inherited from parent */}
              <div className="rounded-xl border-2 border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/10 p-3">
                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide mb-2">
                  ♻️ Inherited from User (via extends)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...parentProps.map((p) => `this.${p}`), ...parentMethods].map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Own */}
              <div className="rounded-xl border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/20 p-3">
                <div className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">
                  ➕ Admin's Own (new additions)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...childProps.map((p) => `this.${p}`), ...childMethods].map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* super() explanation */}
              <div className="bg-gray-900 rounded-xl p-3 text-xs font-mono space-y-0.5">
                <div className="text-blue-400">class <span className="text-yellow-300">Admin</span> <span className="text-green-400">extends</span> <span className="text-indigo-400">User</span> {"{"}</div>
                <div className="pl-4 text-green-400">constructor(<span className="text-orange-300">name, age, role</span>) {"{"}</div>
                <div className="pl-8 text-yellow-300">super(<span className="text-orange-300">name, age</span>); <span className="text-gray-500">// ← ហៅ User's constructor</span></div>
                <div className="pl-8 text-pink-400">this<span className="text-white">.role = <span className="text-orange-300">role</span>;</span></div>
                <div className="pl-4 text-green-400">{"}"}</div>
                <div className="pl-4 text-green-400">deletePost() {"{"} <span className="text-gray-500">/* Admin only */</span> {"}"}</div>
                <div className="text-blue-400">{"}"}</div>
              </div>
            </div>
          )}

          {/* Instance view */}
          {view === "instance" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                {(["user", "admin"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setInstanceType(t)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 cursor-pointer transition-all ${
                      instanceType === t
                        ? t === "user" ? "bg-indigo-600 border-transparent text-white" : "bg-green-600 border-transparent text-white"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                    }`}
                  >
                    {t === "user" ? "new User()" : "new Admin()"}
                  </button>
                ))}
              </div>

              <div className="rounded-xl border-2 p-4 space-y-3" style={{ borderColor: instance.color, background: instance.color + "12" }}>
                <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: instance.color }}>
                  {instance.from}
                </div>
                <div className="bg-gray-900 rounded-lg px-3 py-2 text-xs font-mono" style={{ color: instance.color }}>
                  {instance.label}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-gray-500 mb-1.5">Properties</div>
                    {instance.props.map((p) => (
                      <div key={p.k} className="flex gap-1 text-xs font-mono mb-1">
                        <span className="text-pink-400">this.</span>
                        <span style={{ color: instance.color }}>{p.k}</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-orange-400">{p.v}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-gray-500 mb-1.5">Available Methods</div>
                    {instance.methods.map((m) => (
                      <div key={m} className="text-xs font-mono text-green-400 mb-1">✓ {m}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 px-3 py-2 text-[11px] text-green-700 dark:text-green-300">
            💡 <code className="font-mono bg-green-100 dark:bg-green-900/50 px-1 rounded">super()</code> ត្រូវតែហៅ<strong>ជាបន្ទាត់ដំបូង</strong>នៅក្នុង child constructor ដើម្បីបញ្ជូនទិន្នន័យទៅ parent ជាមុន
          </div>
        </div>
      </div>
    </div>
  );
}
