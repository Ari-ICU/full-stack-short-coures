"use client";
import React, { useState } from 'react';
import { Module } from '../types';
import { ChevronDown, PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface ModuleAccordionProps {
  module: Module;
  onLessonSelect?: (lessonId: string) => void;
}

export function ModuleAccordion({ module, onLessonSelect }: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900/50 mb-4 overflow-hidden transition-all duration-300">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 dark:text-white text-lg">{module.title}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <div className="flex flex-col gap-3">
            {module.lessons.map(lesson => (
              <Link
                href={`/courses/${lesson.courseSlug}/lessons/${lesson.slug}`}
                key={lesson.slug} 
                className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-all duration-200 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lesson.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
