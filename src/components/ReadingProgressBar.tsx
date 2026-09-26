"use client";

import { useEffect, useState } from "react";

/**
 * ReadingProgressBar
 * A slim top progress bar that indicates how far the user has scrolled through the lesson.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateScrollProgress() {
      // 1. Calculate how far the page can be scrolled
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      // 2. Avoid division by zero if the page has no scrollbar
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      // 3. Calculate percentage (0 to 100)
      const scrolled = (window.scrollY / scrollableHeight) * 100;
      const clampedProgress = Math.min(100, Math.max(0, scrolled));

      setProgress(clampedProgress);
    }

    // Update on scroll with passive listener for smooth performance
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    
    // Initial calculation when component mounts
    updateScrollProgress();

    // Clean up event listener when unmounting
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-16 left-0 right-0 h-0.5 bg-gray-100 dark:bg-gray-800 z-30 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
