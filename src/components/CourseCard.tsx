"use client";
import React from 'react';
import Link from 'next/link';
import { Course } from '../types';
import { BookOpen, Clock, ArrowRight, Code2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick?: (courseId: string) => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const lessonCount = course.modules.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <Link 
      href={`/courses/${course.slug}`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(course.slug);
        }
      }}
      className="group relative flex flex-col bg-white dark:bg-gray-900/50 rounded-3xl p-7 sm:p-8 shadow-sm border border-gray-200/60 dark:border-gray-800/80 hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-blue-900/20 hover:border-transparent dark:hover:border-transparent transition-all duration-500 hover:-translate-y-1.5 overflow-hidden cursor-pointer"
    >
      {/* Subtle top glow on hover */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-500`}>
          <Code2 className={`w-7 h-7 text-blue-600 dark:text-blue-400`} />
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/80 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500">
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 -rotate-45 group-hover:rotate-0 transition-all duration-500" />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 transition-all duration-300">
        {course.title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 flex-1 leading-relaxed">
        {course.description}
      </p>

      <div className="flex items-center gap-5 pt-5 border-t border-gray-100 dark:border-gray-800/80 mt-auto">
        <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <BookOpen className="w-4 h-4 text-gray-400" />
          {lessonCount} មេរៀន
        </span>
        <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 text-gray-400" />
          ឥតគិតថ្លៃ
        </span>
      </div>
    </Link>
  );
}
