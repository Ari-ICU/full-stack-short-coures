"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lesson } from "../types";
import { CodeBlock } from "./CodeBlock";
import { Mermaid } from "./Mermaid";
import { TabbedCodeBlock, parseTabs } from "./TabbedCodeBlock";
import { CssDiagram } from "./css-diagrams/CssDiagrams";
import { JsDiagram } from "./js-diagrams/JsDiagrams";
import { HtmlDiagram } from "./html-diagrams/HtmlDiagrams";
import { GitDiagram } from "./git-diagrams/GitDiagrams";

interface LessonContentProps {
  lesson: Lesson;
  content?: string;
}

export function LessonContent({ lesson, content }: LessonContentProps) {
  return (
    <div className="prose prose-base sm:prose-lg lg:prose-xl prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-7 prose-h3:mb-3 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 sm:prose-p:leading-8 lg:prose-p:leading-9 prose-p:my-5 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-7 sm:prose-li:leading-8 lg:prose-li:leading-9 prose-ul:my-5 prose-ol:my-5 prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-8 prose-blockquote:border-l-blue-400 prose-blockquote:not-italic prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:rounded-r-lg">
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
                className={isSvg ? "inline-block w-6 h-6 object-contain align-middle not-prose" : "max-w-full sm:max-w-2xl rounded-xl shadow-md not-prose my-4 block mx-auto"}
                {...props}
              />
            );
          },
          // Override p to avoid <div> inside <p> hydration errors
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

            return (
              <div className="not-prose">
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
