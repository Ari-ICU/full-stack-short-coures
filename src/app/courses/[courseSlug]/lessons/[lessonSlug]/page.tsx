import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourse,
  getAllCourseSlugs,
  getLesson,
  getAdjacentLessons,
} from "@/lib/courses";
import { slugifyHeading } from "@/lib/slugify";
import { LessonContent } from "@/components/LessonContent";
import { LessonSidebar } from "@/components/LessonSidebar";
import { MobileLessonSidebar } from "@/components/MobileLessonSidebar";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { Quiz } from "@/components/Quiz";
import { BookOpen, ChevronLeft, ChevronRight, Target, Clock, ListTree, ArrowRight, Home } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  const params: { courseSlug: string; lessonSlug: string }[] = [];

  for (const courseSlug of slugs) {
    const course = getCourse(courseSlug);
    if (course) {
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          params.push({ courseSlug, lessonSlug: lesson.slug });
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) return { title: "មិនមានមេរៀន" };

  let targetLesson = null;
  for (const mod of course.modules) {
    const found = mod.lessons.find((l) => l.slug === lessonSlug);
    if (found) {
      targetLesson = found;
      break;
    }
  }

  if (!targetLesson) return { title: "មិនមានមេរៀន" };
  return { title: `${targetLesson.title} — ${course.title}` };
}

function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) notFound();

  let moduleSlug = "";
  for (const mod of course.modules) {
    if (mod.lessons.find((l) => l.slug === lessonSlug)) {
      moduleSlug = mod.slug;
      break;
    }
  }

  if (!moduleSlug) notFound();

  const lessonData = getLesson(courseSlug, moduleSlug, lessonSlug);
  if (!lessonData) notFound();

  const { lesson, content } = lessonData;
  const { prev, next } = getAdjacentLessons(courseSlug, moduleSlug, lessonSlug);

  const readMinutes = estimateReadTime(content);

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const lessonIndex = allLessons.findIndex(
    (l) => l.slug === lessonSlug && l.moduleSlug === moduleSlug
  );
  const currentModule = course.modules.find((m) => m.slug === moduleSlug);

  // Extract H2 headings for Table of Contents
  const headings: { text: string; id: string }[] = [];
  const headingMatches = content.matchAll(/^##\s+(.+)$/gm);
  for (const match of headingMatches) {
    const rawTitle = match[1].trim();
    const id = slugifyHeading(rawTitle);
    const displayText = rawTitle.replace(/[`*]/g, "");
    headings.push({ text: displayText, id });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 flex flex-col">
      <ReadingProgressBar />

      {/* Full-viewport layout: sidebar fixed left, content fills the rest */}
      <div className="flex flex-1">

        {/* ── Sidebar (fixed, does not shrink content) ── */}
        <div className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-r border-gray-200/80 dark:border-gray-800/80 bg-gray-50/40 dark:bg-gray-900/30">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-5 py-7">
            <LessonSidebar
              courseSlug={courseSlug}
              modules={course.modules}
              activeLesson={lesson}
            />
          </div>
        </div>

        {/* ── Mobile Sidebar (Hidden on LG) ── */}
        <MobileLessonSidebar
          courseSlug={courseSlug}
          modules={course.modules}
          activeLesson={lesson}
        />

        {/* ── Content (fills remaining width) ── */}
        <main className="flex-1 min-w-0">
          <div className="w-full px-5 sm:px-8 lg:px-12 py-8 lg:py-12">

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="/" className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Home className="w-3.5 h-3.5" />
                    <span>ទំព័រដើម</span>
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-300 dark:text-gray-700">/</li>
                <li>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {course.title}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-300 dark:text-gray-700">/</li>
                <li className="text-gray-900 dark:text-gray-200 font-semibold truncate max-w-[200px] sm:max-w-md lg:max-w-none">
                  {lesson.title}
                </li>
              </ol>
            </nav>

            <article>
              {/* ── Lesson Header ── */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-100 dark:border-blue-900/60">
                    <BookOpen className="w-3.5 h-3.5" />
                    {currentModule?.title ?? lesson.module}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
                    មេរៀនទី {lessonIndex + 1} នៃ {allLessons.length}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {readMinutes} នាទី
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight">
                  {lesson.title}
                </h1>

                {(lesson.descriptionKm || lesson.description) && (
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {lesson.descriptionKm || lesson.description}
                  </p>
                )}
              </header>

              {/* ── Learning Objectives Card ── */}
              {lesson.objectives && lesson.objectives.length > 0 && (
                <section
                  aria-labelledby="objectives-heading"
                  className="mb-10 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-gray-900 border border-blue-100 dark:border-blue-900/40 p-5 sm:p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-100/60 dark:border-blue-900/40">
                    <h2
                      id="objectives-heading"
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider"
                    >
                      <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      អ្វីដែលអ្នកនឹងរៀន (Learning Objectives)
                    </h2>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {lesson.objectives.length} គោលដៅ
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {lesson.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/40 border border-blue-50/80 dark:border-blue-900/20">
                        <span
                          className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* ── Table of Contents / Quick Jump ── */}
              {headings.length > 1 && (
                <nav
                  aria-label="Table of contents"
                  className="mb-10 p-4 sm:p-5 rounded-2xl bg-gray-50/90 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <ListTree className="w-4 h-4 text-blue-500" />
                    <span>មាតិកាក្នុងទំព័រនេះ (On this page)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {headings.map((h, idx) => (
                      <a
                        key={idx}
                        href={`#${h.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xs transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="truncate max-w-[240px]">{h.text}</span>
                      </a>
                    ))}
                  </div>
                </nav>
              )}

              {/* ── MDX Body Content ── */}
              <div className="mb-16">
                <LessonContent lesson={lesson} content={content} />
              </div>

              {/* ── Quiz Section ── */}
              {lesson.quiz && lesson.quiz.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                    <span className="text-xl">🧠</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      កម្រងសំណួរវាស់ស្ទង់ការយល់ដឹង (Self Assessment Quiz)
                    </h2>
                  </div>
                  <Quiz quiz={lesson.quiz} />
                </div>
              )}

              {/* ── Prev / Next Navigation ── */}
              <nav
                aria-label="Lesson navigation"
                className="pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {prev ? (
                  <Link
                    href={`/courses/${courseSlug}/lessons/${prev.slug}`}
                    className="group flex items-center gap-3.5 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-900 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 shadow-xs hover:shadow-sm transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                        មេរៀនមុន
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {prev.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {next ? (
                  <Link
                    href={`/courses/${courseSlug}/lessons/${next.slug}`}
                    className="group flex items-center justify-between sm:justify-end gap-3.5 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-900 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 shadow-xs hover:shadow-sm transition-all sm:col-start-2"
                  >
                    <div className="min-w-0 sm:text-right">
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                        មេរៀនបន្ទាប់
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {next.title}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={`/courses/${courseSlug}`}
                    className="group flex items-center justify-between sm:justify-end gap-3.5 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600 bg-white dark:bg-gray-900 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 shadow-xs hover:shadow-sm transition-all sm:col-start-2"
                  >
                    <div className="min-w-0 sm:text-right">
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider mb-0.5">
                        បានបញ្ចប់វគ្គ
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        ត្រឡប់ទៅមាតិកាវគ្គសិក្សា
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </Link>
                )}
              </nav>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
