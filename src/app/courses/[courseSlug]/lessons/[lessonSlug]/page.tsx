import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourse,
  getAllCourseSlugs,
  getLesson,
  getAdjacentLessons,
} from "@/lib/courses";
import { LessonContent } from "@/components/LessonContent";
import { LessonSidebar } from "@/components/LessonSidebar";
import { BookOpen, ChevronLeft, ChevronRight, Target } from "lucide-react";

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

  return (
    /* Full-viewport layout: sidebar fixed left, content fills the rest */
    <div className="flex min-h-[calc(100vh-4rem)]">

      {/* ── Sidebar (fixed, does not shrink content) ── */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 border-r border-gray-200 dark:border-gray-800">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-5 py-7">
          <LessonSidebar
            courseSlug={courseSlug}
            modules={course.modules}
            activeLesson={lesson}
          />
        </div>
      </div>

      {/* ── Content (fills remaining width) ── */}
      <div className="flex-1 min-w-0">
        <div className="w-full px-6 sm:px-10 py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  ទំព័រដើម
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
              <li>
                <Link
                  href={`/courses/${course.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {course.title}
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
              <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-xs">
                {lesson.title}
              </li>
            </ol>
          </nav>

          <article>
            {/* ── Lesson header ── */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                  <BookOpen className="w-3 h-3" />
                  {currentModule?.title ?? lesson.module}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  មេរៀនទី {lessonIndex + 1} / {allLessons.length}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {readMinutes} min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {lesson.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {lesson.descriptionKm || lesson.description}
              </p>
            </header>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-gray-800 mb-8" />

            {/* ── Learning objectives ── */}
            {lesson.objectives && lesson.objectives.length > 0 && (
              <section
                aria-labelledby="objectives-heading"
                className="mb-10 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 p-6"
              >
                <h2
                  id="objectives-heading"
                  className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wide mb-4"
                >
                  <Target className="w-4 h-4 shrink-0" />
                  អ្វីដែលអ្នកនឹងរៀន
                </h2>
                <ul className="space-y-3">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                        {obj}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ── MDX body ── */}
            <div className="mb-16">
              <LessonContent lesson={lesson} content={content} />
            </div>

            {/* ── Prev / Next nav ── */}
            <nav
              aria-label="Lesson navigation"
              className="pt-8 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4"
            >
              {prev ? (
                <Link
                  href={`/courses/${courseSlug}/lessons/${prev.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 shrink-0 transition-colors" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">
                      មេរៀនមុន
                    </p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/courses/${courseSlug}/lessons/${next.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all col-start-2 justify-end"
                >
                  <div className="min-w-0 text-right">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">
                      មេរៀនបន្ទាប់
                    </p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {next.title}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 shrink-0 transition-colors" />
                </Link>
              ) : (
                <Link
                  href={`/courses/${courseSlug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all col-start-2 justify-end"
                >
                  <div className="min-w-0 text-right">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">
                      បានបញ្ចប់
                    </p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      ត្រឡប់ទៅវគ្គសិក្សា
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 shrink-0 transition-colors" />
                </Link>
              )}
            </nav>
          </article>
        </div>
      </div>
    </div>
  );
}
