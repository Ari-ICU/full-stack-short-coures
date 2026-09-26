"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Module, Lesson } from "@/types";
import { FolderOpen, Folder } from "lucide-react";

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
      <nav aria-label="Course navigation" className="space-y-6">
        {modules.map((mod) => {
          const isModuleActive = mod.slug === activeLesson.moduleSlug;

          return (
            <div key={mod.slug} className="group/mod">
              {/* Module Header */}
              <div className="flex items-center justify-between gap-2 px-2.5 mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  {isModuleActive ? (
                    <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600 shrink-0" />
                  )}
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider truncate ${
                      isModuleActive
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {mod.title}
                  </h3>
                </div>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
                  {mod.lessons.length}
                </span>
              </div>

              {/* Lesson Items */}
              <ul className="space-y-1">
                {mod.lessons.map((lesson, index) => {
                  const isActive =
                    lesson.slug === activeLesson.slug &&
                    lesson.moduleSlug === activeLesson.moduleSlug;

                  return (
                    <li key={lesson.slug} ref={isActive ? activeItemRef : null}>
                      <Link
                        href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                        className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all duration-150 relative ${
                          isActive
                            ? "bg-blue-50/90 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold shadow-xs"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <span
                            className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-blue-600 dark:bg-blue-400"
                            aria-hidden="true"
                          />
                        )}

                        {/* Lesson number badge */}
                        <span
                          className={`shrink-0 w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${
                            isActive
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                          }`}
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>

                        <span className="flex-1 leading-snug line-clamp-2">
                          {lesson.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
