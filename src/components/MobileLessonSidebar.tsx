"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LessonSidebar } from "./LessonSidebar";
import { Module, Lesson } from "@/types";

interface MobileLessonSidebarProps {
  courseSlug: string;
  modules: Module[];
  activeLesson: Lesson;
}

export function MobileLessonSidebar({ courseSlug, modules, activeLesson }: MobileLessonSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        aria-label="Open Course Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <span className="font-bold text-gray-900 dark:text-white">មាតិកាវគ្គសិក្សា</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            aria-label="Close Course Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="h-[calc(100vh-65px)] overflow-y-auto px-5 py-4">
          <div onClick={() => setIsOpen(false)}>
            <LessonSidebar 
              courseSlug={courseSlug}
              modules={modules}
              activeLesson={activeLesson}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
