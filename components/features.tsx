import { Sparkles, ImageIcon, Zap } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "One-shot Editing",
      description: "Transform your images instantly with a single prompt. No multiple iterations needed.",
    },
    {
      icon: ImageIcon,
      title: "Multi-image Support",
      description: "Process multiple images at once with batch mode. Save time and maintain consistency.",
    },
    {
      icon: Sparkles,
      title: "Natural Language",
      description: "Use simple, everyday language to describe your edits. No technical jargon required.",
    },
  ]

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
