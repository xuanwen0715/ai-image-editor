import { Card } from "@/components/ui/card"

export function Showcase() {
  const examples = [
    {
      title: "Portrait Enhancement",
      before: "/portrait-photo-before.jpg",
      after: "/enhanced-portrait-with-professional-lighting.jpg",
      prompt: "Professional studio lighting, enhanced details, cinematic look",
    },
    {
      title: "Scene Transformation",
      before: "/daytime-city-street.jpg",
      after: "/same-city-street-at-golden-hour-sunset.jpg",
      prompt: "Transform to golden hour, warm sunset lighting, dramatic sky",
    },
    {
      title: "Style Transfer",
      before: "/regular-photo-of-person.jpg",
      after: "/same-person-in-anime-art-style.jpg",
      prompt: "Convert to anime art style, vibrant colors, detailed illustration",
    },
    {
      title: "Object Addition",
      before: "/empty-room-interior.png",
      after: "/same-room-with-modern-furniture.jpg",
      prompt: "Add modern minimalist furniture, plants, warm ambient lighting",
    },
  ]

  return (
    <section id="showcase" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🍌</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Showcase</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See what's possible with Nano Banana's AI-powered image editing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">{example.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">BEFORE</p>
                    <img src={example.before || "/placeholder.svg"} alt="Before" className="w-full rounded-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">AFTER</p>
                    <img src={example.after || "/placeholder.svg"} alt="After" className="w-full rounded-lg" />
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">PROMPT</p>
                  <p className="text-sm text-foreground">{example.prompt}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
