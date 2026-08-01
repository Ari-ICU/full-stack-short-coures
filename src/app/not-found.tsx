import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 sm:p-10 rounded-[2rem] shadow-2xl flex flex-col items-center backdrop-blur-sm">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-blue-100 dark:border-blue-800/30">
            <SearchX className="w-10 h-10" />
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            404
          </h1>
          
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            រកមិនឃើញទំព័រនេះទេ
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            ទំព័រដែលអ្នកកំពុងស្វែងរកប្រហែលជាត្រូវបានលុប ប្តូរឈ្មោះ ឬមិនដែលមានតាំងពីដំបូងមក។ សូមត្រួតពិនិត្យ URL ម្តងទៀត។
          </p>
          
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-4 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ត្រឡប់ទៅទំព័រដើមវិញ
          </Link>
        </div>
      </div>
    </div>
  );
}
