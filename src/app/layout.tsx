import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const khmerFont = localFont({
  src: "./fonts/KhmerOSSiemreap-Regular.ttf",
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full Stack Mastery",
  description: "Learn Web Design, Frontend, and Backend.",
};

import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className={`${outfit.variable} ${khmerFont.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, val) {
                    if (name === 'bis_skin_checked') return;
                    return origSetAttr.apply(this, arguments);
                  };
                  const observer = new MutationObserver((mutations) => {
                    for (const m of mutations) {
                      if (m.attributeName === 'bis_skin_checked' && m.target && m.target.removeAttribute) {
                        m.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                  observer.observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked']
                  });
                  const origError = console.error;
                  console.error = function(...args) {
                    if (args.some(arg => typeof arg === 'string' && arg.includes('bis_skin_checked'))) {
                      return;
                    }
                    return origError.apply(console, args);
                  };
                } catch (e) {}
              `,
            }}
          />
        )}
      </head>
      <body suppressHydrationWarning className="flex flex-col min-h-screen antialiased">
        {/* Global Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition-colors">
                FS
              </div>
              <span className="font-bold text-gray-900 dark:text-white">Full Stack Mastery</span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
