import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ChevronRight, Globe, Lock, Sparkles, Zap } from "lucide-react";
import { getAllCourses } from "@/lib/courses";
import { CourseCard } from "@/components/CourseCard";

export default function Home() {
  const courses = getAllCourses();
  const totalLessons = courses.reduce(
    (sum, c) => sum + c.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );

  const stats = [
    { value: `${courses.length}`, label: "វគ្គសិក្សា", Icon: BookOpen },
    { value: `${totalLessons}+`, label: "មេរៀន", Icon: Zap },
    { value: "100%", label: "ឥតគិតថ្លៃ", Icon: Lock },
    { value: "∞", label: "រៀនពីគ្រប់ទីកន្លែង", Icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 text-white overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-700" />
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative w-full px-6 sm:px-10 lg:px-16 py-24 sm:py-36">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">កម្មវិធីសិក្សាជំនាន់ថ្មី</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight tracking-tight">
              ស្ទាត់ជំនាញ{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
                Full Stack
              </span>
              <br className="hidden sm:block" />
              {" "}ជាមួយ{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-rose-400">
                React.js & Node
              </span>
            </h1>

            <p className="text-xl sm:text-2xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
              រៀនពី Web Design, Frontend Engineering, និង Backend Architecture ពីចំណុចចាប់ផ្តើម។
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={courses.length > 0 ? `/courses/${courses[0].slug}` : "#"}
                className="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                ចាប់ផ្តើមរៀនឥឡូវនេះ
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 30C840 36 960 40 1080 42C1200 44 1320 44 1380 44L1440 44V80H0Z" className="fill-white dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="w-full py-14 bg-white dark:bg-gray-950">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, Icon }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ──────────────────────────────── */}
      <section className="w-full py-20 bg-white dark:bg-gray-950">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                កម្មវិធីសិក្សា
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                ពីមូលដ្ឋានគ្រឹះដល់កម្រិតខ្ពស់។
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            )) : (
              <div className="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
                មិនទាន់មានវគ្គសិក្សា
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
