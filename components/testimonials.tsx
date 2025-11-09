import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      avatar: "/professional-woman-portrait.png",
      content:
        "Nano Banana has completely transformed my workflow. The quality and speed are unmatched. I can iterate on ideas in minutes instead of hours.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      avatar: "/professional-man-portrait.png",
      content:
        "The natural language interface is a game-changer. I can describe exactly what I want and get perfect results every time. No more complex tools!",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Marketing Director",
      avatar: "/confident-businesswoman.png",
      content:
        "Our team uses Nano Banana for all our campaign visuals. The consistency and quality have elevated our brand presence significantly.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Photographer",
      avatar: "/photographer-portrait.png",
      content:
        "As a professional photographer, I was skeptical at first. But the scene preservation and character consistency are truly impressive. It's now essential to my post-processing.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join thousands of creators who trust Nano Banana for their image editing needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
