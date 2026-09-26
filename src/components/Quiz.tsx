"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from "lucide-react";

interface QuizProps {
  quiz: QuizQuestion[];
}

export function Quiz({ quiz }: QuizProps) {
  const [resetKey, setResetKey] = useState(0);

  if (!quiz || quiz.length === 0) return null;

  return (
    <div key={resetKey} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          មានសំណួរទាំងអស់ {quiz.length} សំណួរ — ជ្រើសរើសចម្លើយដែលត្រឹមត្រូវបំផុត
        </p>
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="ធ្វើតេស្តឡើងវិញ"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ធ្វើម្តងទៀត</span>
        </button>
      </div>

      <div className="space-y-6">
        {quiz.map((q, index) => (
          <QuizItem key={index} question={q} index={index} total={quiz.length} />
        ))}
      </div>
    </div>
  );
}

function QuizItem({ question, index, total }: { question: QuizQuestion; index: number; total: number }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Normalize: if 0, index is 0. If >= 1, it is 1-based so subtract 1.
  const correctIndex = question.correctAnswer === 0 ? 0 : Math.max(0, question.correctAnswer - 1);
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === correctIndex;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  const formatOption = (opt: any): string => {
    if (typeof opt === "string") {
      return opt.replace(/^"|"$/g, "");
    }
    if (opt && typeof opt === "object") {
      const keys = Object.keys(opt);
      if (keys.length > 0) {
        return `${keys[0]}: ${opt[keys[0]]}`.replace(/^"|"$/g, "");
      }
    }
    return String(opt).replace(/^"|"$/g, "");
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
      {/* Question Header */}
      <div className="flex items-start gap-3.5 mb-5">
        <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-100 dark:border-blue-900/50">
          Q{index + 1}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              សំណួរ {index + 1} / {total}
            </span>
          </div>
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
            {question.question}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2.5 sm:pl-11">
        {question.options.map((option, idx) => {
          const letter = optionLetters[idx] || String(idx + 1);
          let btnStyle = "bg-gray-50/70 dark:bg-gray-800/40 hover:bg-gray-100/80 dark:hover:bg-gray-800 border-gray-200/80 dark:border-gray-700/80 text-gray-700 dark:text-gray-300";
          let badgeStyle = "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700";
          let icon = null;

          if (isAnswered) {
            if (idx === correctIndex) {
              btnStyle = "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20";
              badgeStyle = "bg-emerald-600 text-white border-transparent";
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
            } else if (idx === selectedOption) {
              btnStyle = "bg-rose-50/90 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200";
              badgeStyle = "bg-rose-600 text-white border-transparent";
              icon = <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
            } else {
              btnStyle = "bg-gray-50/40 dark:bg-gray-800/20 border-gray-200/50 dark:border-gray-800/50 text-gray-400 dark:text-gray-600 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3.5 ${btnStyle} ${!isAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs border shrink-0 transition-colors ${badgeStyle}`}>
                  {letter}
                </span>
                <span className="text-sm sm:text-base leading-relaxed break-words">{formatOption(option)}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation Callout */}
      {showExplanation && (
        <div className="mt-5 sm:pl-11 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className={`p-4 sm:p-5 rounded-xl border ${isCorrect ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-100" : "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 text-blue-950 dark:text-blue-100"}`}>
            <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
              {isCorrect ? (
                <>
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">ត្រឹមត្រូវ! (Correct)</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300">ការពន្យល់ (Explanation)</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
