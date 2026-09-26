"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lesson } from "../types";
import { CodeBlock } from "./CodeBlock";
import { Mermaid } from "./Mermaid";
import { TabbedCodeBlock } from "./TabbedCodeBlock";
import { CssDiagram } from "./css-diagrams/CssDiagrams";
import { JsDiagram } from "./js-diagrams/JsDiagrams";
import { HtmlDiagram } from "./html-diagrams/HtmlDiagrams";
import { GitDiagram } from "./git-diagrams/GitDiagrams";
import { ReactDiagram } from "./react-diagrams/ReactDiagrams";
import { RdbmsDiagram } from "./rdbms-diagrams/RdbmsDiagrams";
import { Target, Lightbulb, Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { slugifyHeading } from "@/lib/slugify";

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return "";
}

interface LessonContentProps {
  lesson: Lesson;
  content?: string;
}

export function LessonContent({ lesson, content }: LessonContentProps) {
  return (
    <div className="prose prose-base sm:prose-lg lg:prose-xl prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-7 prose-h3:mb-3 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 sm:prose-p:leading-8 lg:prose-p:leading-9 prose-p:my-5 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-7 sm:prose-li:leading-8 lg:prose-li:leading-9 prose-ul:my-5 prose-ol:my-5 prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img({ src, alt, ...props }) {
            const isSvg = typeof src === "string" && (src.endsWith(".svg") || src.includes("simpleicons.org"));
            const isLogo = alt && alt.toLowerCase().includes("logo");
            
            if (isLogo) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt} className="w-32 h-auto object-contain mx-auto block my-8" {...props} />
              );
            }

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || ""}
                className={isSvg ? "inline-block w-6 h-6 object-contain align-middle not-prose" : "max-w-full sm:max-w-2xl rounded-2xl shadow-md not-prose my-6 block mx-auto border border-gray-100 dark:border-gray-800"}
                {...props}
              />
            );
          },
          h2({ children }) {
            const text = getNodeText(children);
            const id = slugifyHeading(text);
            return (
              <h2
                id={id}
                className="group flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4 pb-2.5 border-b border-gray-100 dark:border-gray-800 scroll-mt-24"
              >
                <span className="flex-1">{children}</span>
                <a
                  href={`#${id}`}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 text-sm font-normal transition-opacity"
                  aria-label="Link to section"
                >
                  #
                </a>
              </h2>
            );
          },
          h3({ children }) {
            const text = getNodeText(children);
            const id = slugifyHeading(text);
            return (
              <h3
                id={id}
                className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-3 scroll-mt-24"
              >
                {children}
              </h3>
            );
          },
          blockquote({ children }) {
            const childArray = React.Children.toArray(children);
            let alertType: "IMPORTANT" | "NOTE" | "TIP" | "WARNING" | "CAUTION" | null = null;
            let newChildren = childArray;

            for (let i = 0; i < childArray.length; i++) {
              const child = childArray[i];
              if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
                const pChildren = React.Children.toArray(child.props.children);
                if (typeof pChildren[0] === "string") {
                  const match = pChildren[0].match(/^\[!(IMPORTANT|NOTE|TIP|WARNING|CAUTION)\]\s*/i);
                  if (match) {
                    alertType = match[1].toUpperCase() as "IMPORTANT" | "NOTE" | "TIP" | "WARNING" | "CAUTION";
                    const remainingText = pChildren[0].replace(/^\[!(IMPORTANT|NOTE|TIP|WARNING|CAUTION)\]\s*/i, "");
                    const newPChildren = remainingText.trim() === "" 
                      ? pChildren.slice(1) 
                      : [remainingText, ...pChildren.slice(1)];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const newFirstP = React.cloneElement(child as React.ReactElement<any>, {}, ...newPChildren);
                    newChildren = [...childArray.slice(0, i), newFirstP, ...childArray.slice(i + 1)];
                    break;
                  }
                }
              }
            }

            if (alertType) {
              const configs = {
                IMPORTANT: {
                  bg: "bg-blue-50/70 dark:bg-blue-950/25 border-l-blue-600 dark:border-l-blue-400 border-blue-200/70 dark:border-blue-900/40 text-blue-950 dark:text-blue-100",
                  badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
                  icon: <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />,
                  label: "ចំណុចសំខាន់ (IMPORTANT)",
                },
                TIP: {
                  bg: "bg-emerald-50/70 dark:bg-emerald-950/25 border-l-emerald-600 dark:border-l-emerald-400 border-emerald-200/70 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-100",
                  badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
                  icon: <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
                  label: "គន្លឹះពិសេស (PRO TIP)",
                },
                NOTE: {
                  bg: "bg-sky-50/70 dark:bg-sky-950/25 border-l-sky-500 dark:border-l-sky-400 border-sky-200/70 dark:border-sky-900/40 text-sky-950 dark:text-sky-100",
                  badge: "bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300",
                  icon: <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />,
                  label: "ចំណាំ (NOTE)",
                },
                WARNING: {
                  bg: "bg-amber-50/70 dark:bg-amber-950/25 border-l-amber-500 dark:border-l-amber-400 border-amber-200/70 dark:border-amber-900/40 text-amber-950 dark:text-amber-100",
                  badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
                  icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />,
                  label: "ការប្រុងប្រយ័ត្ន (WARNING)",
                },
                CAUTION: {
                  bg: "bg-rose-50/70 dark:bg-rose-950/25 border-l-rose-500 dark:border-l-rose-400 border-rose-200/70 dark:border-rose-900/40 text-rose-950 dark:text-rose-100",
                  badge: "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300",
                  icon: <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />,
                  label: "គ្រោះថ្នាក់ (CAUTION)",
                },
              };

              const cfg = configs[alertType];

              return (
                <div className={`my-6 rounded-2xl border border-l-4 p-5 sm:p-6 shadow-sm not-prose transition-all ${cfg.bg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {cfg.icon}
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base leading-relaxed space-y-2 [&>p]:m-0 [&>p+p]:mt-2">
                    {newChildren}
                  </div>
                </div>
              );
            }

            return (
              <blockquote className="my-6 border-l-4 border-gray-300 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 p-5 rounded-r-2xl not-italic text-gray-700 dark:text-gray-300">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 not-prose">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm m-0">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-50/90 dark:bg-gray-800/60">{children}</thead>;
          },
          th({ children }) {
            return (
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-5 py-3.5 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800/50">
                {children}
              </td>
            );
          },
          p({ children }) {
            return <p>{children}</p>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match?.[1] ?? "text";
            const isInline = !match && !String(children).includes("\n");

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[0.85em] font-mono text-pink-600 dark:text-pink-400 border border-gray-200 dark:border-gray-700 not-prose"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            if (lang === "mermaid") {
              return <Mermaid chart={String(children).replace(/\n$/, "")} />;
            }

            if (lang === "tabs") {
              return <TabbedCodeBlock raw={String(children).trim()} />;
            }

            if (lang === "diagram") {
              const name = String(children).trim();
              return <CssDiagram name={name} />;
            }

            if (lang === "jsdiagram") {
              const name = String(children).trim();
              return <JsDiagram name={name} />;
            }

            if (lang === "htmldiagram") {
              const name = String(children).trim();
              return <HtmlDiagram name={name} />;
            }

            if (lang === "gitdiagram") {
              const name = String(children).trim();
              return <GitDiagram name={name} />;
            }

            if (lang === "reactdiagram") {
              const name = String(children).trim();
              return <ReactDiagram name={name} />;
            }

            if (lang === "rdbmsdiagram") {
              const name = String(children).trim();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Comp = (RdbmsDiagram as any)[name];
              return Comp ? <Comp /> : <div className="text-red-500">Diagram not found: {name}</div>;
            }

            return (
              <div className="not-prose my-6">
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={lang}
                />
              </div>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {content || lesson.descriptionKm || lesson.description || ""}
      </ReactMarkdown>
    </div>
  );
}
