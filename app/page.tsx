import { Editor } from '@/components/editor'

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-32 left-1/2 h-72 w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-accent/20 to-primary/25 blur-3xl" />
        </div>
        <div className="container relative">
          <h1 className="mx-auto max-w-3xl text-center text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Try The AI Editor</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
            Natural language image editing powered by Gemini via OpenRouter. Upload a photo, type your idea, and generate in seconds.
          </p>
        </div>
      </section>
      <Editor />
    </main>
  )
}
