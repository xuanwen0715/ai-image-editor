"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Image Editor</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
