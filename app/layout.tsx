// app/layout.tsx
"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to detect current URL route
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Holds strings like "/" or "/upload"

  // Helper function to apply active styles conditionally
  const getLinkClass = (href: string) => {
    const baseClass = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    const activeClass = "bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 shadow-[0_0_12px_rgba(16,185,129,0.05)]";
    const inactiveClass = "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200";

    return `${baseClass} ${pathname === href ? activeClass : inactiveClass}`;
  };

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col md:flex-row antialiased">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-emerald-400">FinQuant AI</h1>
          </div>
          <nav className="flex flex-row md:flex-col gap-2">
            <Link href="/" className={getLinkClass("/")}>
              FinQuant Agent Chat
            </Link>
            <Link href="/upload" className={getLinkClass("/upload")}>
              Upload Documents
            </Link>
          </nav>
        </aside>

        {/* Dynamic Main Workspace Core Container */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}