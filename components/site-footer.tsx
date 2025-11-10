import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-background/80">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} AI Image Editor. Built with Next.js.
        </p>
        <p>
          <Link href="https://github.com/xuanwen0715/ai-image-editor" className="hover:underline">GitHub</Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:underline">Home</Link>
        </p>
      </div>
    </footer>
  )
}

