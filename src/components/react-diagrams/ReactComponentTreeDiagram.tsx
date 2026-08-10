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

export function ReactComponentTreeDiagram() {
  const [activeComponent, setActiveComponent] = useState<string>("App");

  const components = {
    App: {
      code: `function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}`,
      desc: "The root component that holds everything together."
    },
    Header: {
      code: `function Header() {
  return (
    <header>
      <h1>My App</h1>
      <Nav />
    </header>
  );
}`,
      desc: "Top section containing the logo and navigation."
    },
    Nav: {
      code: `function Nav() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}`,
      desc: "Navigation links."
    },
    Main: {
      code: `function Main() {
  return (
    <main>
      <Sidebar />
      <Content />
    </main>
  );
}`,
      desc: "The main body of the application."
    },
    Sidebar: {
      code: `function Sidebar() {
  return (
    <aside>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </aside>
  );
}`,
      desc: "Left-hand menu."
    },
    Content: {
      code: `function Content() {
  return (
    <section>
      <h2>Welcome!</h2>
      <p>This is the main content area.</p>
    </section>
  );
}`,
      desc: "The primary information display."
    },
    Footer: {
      code: `function Footer() {
  return (
    <footer>
      <p>&copy; 2024</p>
    </footer>
  );
}`,
      desc: "Bottom section."
    }
  };

  const getBtnClass = (name: string) => {
    const isActive = activeComponent === name;
    return `px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
      isActive 
        ? "border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 shadow-md scale-105" 
        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }`;
  };

  return (
    <div className="not-prose my-8 font-sans select-none">
      <div className="w-full max-w-4xl mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <PanelHeader label="Component Tree & Composition" badge="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Tree Diagram */}
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 relative">
            
            {/* Level 1 */}
            <div className="mb-8 z-10">
              <button onClick={() => setActiveComponent("App")} className={getBtnClass("App")}>&lt;App /&gt;</button>
            </div>
            
            {/* SVG Lines connecting App to Header, Main, Footer */}
            <svg className="absolute top-[68px] left-0 w-full h-[32px] pointer-events-none" preserveAspectRatio="none">
              <path d="M 50% 0 L 20% 100" stroke="#9ca3af" strokeWidth="2" fill="none" />
              <path d="M 50% 0 L 50% 100" stroke="#9ca3af" strokeWidth="2" fill="none" />
              <path d="M 50% 0 L 80% 100" stroke="#9ca3af" strokeWidth="2" fill="none" />
            </svg>

            {/* Level 2 */}
            <div className="flex justify-between w-full px-4 mb-8 z-10 relative">
              <div className="flex flex-col items-center">
                <button onClick={() => setActiveComponent("Header")} className={getBtnClass("Header")}>&lt;Header /&gt;</button>
                <svg className="absolute top-[40px] w-[2px] h-[32px] pointer-events-none" preserveAspectRatio="none">
                  <path d="M 1 0 L 1 32" stroke="#9ca3af" strokeWidth="2" fill="none" />
                </svg>
              </div>
              
              <div className="flex flex-col items-center relative">
                <button onClick={() => setActiveComponent("Main")} className={getBtnClass("Main")}>&lt;Main /&gt;</button>
                <svg className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[80px] h-[32px] pointer-events-none" preserveAspectRatio="none">
                  <path d="M 50% 0 L 20% 100" stroke="#9ca3af" strokeWidth="2" fill="none" />
                  <path d="M 50% 0 L 80% 100" stroke="#9ca3af" strokeWidth="2" fill="none" />
                </svg>
              </div>
              
              <div className="flex flex-col items-center">
                <button onClick={() => setActiveComponent("Footer")} className={getBtnClass("Footer")}>&lt;Footer /&gt;</button>
              </div>
            </div>

            {/* Level 3 */}
            <div className="flex justify-between w-full px-4 z-10">
              <div className="flex justify-center w-1/3">
                <button onClick={() => setActiveComponent("Nav")} className={getBtnClass("Nav")}>&lt;Nav /&gt;</button>
              </div>
              
              <div className="flex justify-center gap-2 w-1/3 ml-4">
                <button onClick={() => setActiveComponent("Sidebar")} className={getBtnClass("Sidebar")}>&lt;Sidebar /&gt;</button>
                <button onClick={() => setActiveComponent("Content")} className={getBtnClass("Content")}>&lt;Content /&gt;</button>
              </div>
              
              <div className="w-1/3"></div>
            </div>
            
            <div className="mt-8 text-[11px] text-gray-500 font-medium bg-gray-200/50 dark:bg-gray-700 px-3 py-1.5 rounded-full">
              👆 ចុចលើ Component ដើម្បីមើលកូដ
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-700">
            <div className="px-4 py-2 bg-[#2d2d2d] flex items-center gap-2 border-b border-gray-700">
              <span className="text-yellow-400">⚛️</span>
              <span className="text-xs font-mono text-gray-300">{activeComponent}.jsx</span>
            </div>
            <div className="p-4 flex-1">
              <pre className="text-sm font-mono text-[#d4d4d4]">
                <code dangerouslySetInnerHTML={{ 
                  __html: components[activeComponent as keyof typeof components].code
                    .replace(/function/g, '<span class="text-blue-400">function</span>')
                    .replace(/return/g, '<span class="text-purple-400">return</span>')
                    .replace(/(&lt;[a-zA-Z]+ \/&gt;|&lt;[a-zA-Z]+&gt;|&lt;\/[a-zA-Z]+&gt;)/g, '<span class="text-green-400">$1</span>')
                }} />
              </pre>
            </div>
            <div className="px-4 py-3 bg-[#2d2d2d] border-t border-gray-700">
              <p className="text-xs text-gray-300">{components[activeComponent as keyof typeof components].desc}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
