"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Module, Lesson } from "@/types";

interface LessonSidebarProps {
  courseSlug: string;
  modules: Module[];
  activeLesson: Lesson;
  className?: string;
}

export function LessonSidebar({
  courseSlug,
  modules,
  activeLesson,
  className = "w-60",
}: LessonSidebarProps) {
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLesson.slug, activeLesson.moduleSlug]);

  return (
    <aside className={`shrink-0 ${className}`}>
      <nav aria-label="Course navigation">
        {modules.map((mod) => (
          <div key={mod.slug} className="mb-6">
            {/* Module header */}
            <h3 className="text-[11px] xl:text-xs font-semibold uppercase tracking-widest text-gray-950 dark:text-gray-200 mb-2 px-2">
              {mod.title}
            </h3>

            <ul className="space-y-0.5">
              {mod.lessons.map((lesson, index) => {
                const isActive =
                  lesson.slug === activeLesson.slug &&
                  lesson.moduleSlug === activeLesson.moduleSlug;

                return (
                  <li 
                    key={lesson.slug}
                    ref={isActive ? activeItemRef : null}
                  >
                    <Link
                      href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                      className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm xl:text-base transition-all duration-150 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Lesson number dot */}
                      <span
                        className={`shrink-0 w-5 h-5 xl:w-6 xl:h-6 rounded-full flex items-center justify-center text-[10px] xl:text-xs font-bold transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                        }`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>

                      <span className="flex-1 leading-snug line-clamp-2">{lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
