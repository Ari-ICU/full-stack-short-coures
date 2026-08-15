"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface QuizProps {
  quiz: QuizQuestion[];
}

export function Quiz({ quiz }: QuizProps) {
  if (!quiz || quiz.length === 0) return null;

  return (
    <div className="mt-12 space-y-8">
      {quiz.map((q, index) => (
        <QuizItem key={index} question={q} index={index} />
      ))}
    </div>
  );
}

function QuizItem({ question, index }: { question: QuizQuestion; index: number }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Note: correctAnswer is 1-indexed in the frontmatter, so we subtract 1 for 0-based array index
  const correctIndex = question.correctAnswer - 1;
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === correctIndex;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            សំនួរទី {index + 1}
          </h3>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
            {question.question}
          </p>
        </div>
      </div>

      <div className="space-y-3 pl-0 sm:pl-12">
        {question.options.map((option, idx) => {
          let buttonStateClass = "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300";
          let icon = null;

          if (isAnswered) {
            if (idx === correctIndex) {
              buttonStateClass = "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 ring-2 ring-green-500/20";
              icon = <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />;
            } else if (idx === selectedOption) {
              buttonStateClass = "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300";
              icon = <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />;
            } else {
              buttonStateClass = "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 opacity-50";
            }
          }

          const formatOption = (opt: any): string => {
            if (typeof opt === "string") {
              return opt.replace(/^"|"$/g, '');
            }
            if (opt && typeof opt === "object") {
              const keys = Object.keys(opt);
              if (keys.length > 0) {
                return `${keys[0]}: ${opt[keys[0]]}`.replace(/^"|"$/g, '');
              }
            }
            return String(opt).replace(/^"|"$/g, '');
          };

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${buttonStateClass} ${!isAnswered ? "cursor-pointer" : "cursor-default"}`}
            >
              <span className="leading-relaxed">{formatOption(option)}</span>
              {icon && <span className="flex-shrink-0">{icon}</span>}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`mt-6 pl-0 sm:pl-12 animate-in fade-in slide-in-from-top-2 duration-300`}>
          <div className={`p-5 rounded-xl border ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/50' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/50'}`}>
            <h4 className={`text-sm font-bold uppercase tracking-wide mb-2 ${isCorrect ? 'text-green-800 dark:text-green-400' : 'text-blue-800 dark:text-blue-400'}`}>
              {isCorrect ? '🎉 ត្រឹមត្រូវ!' : '💡 ពន្យល់បន្ថែម:'}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
