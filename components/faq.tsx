import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "What makes Nano Banana different from other AI image editors?",
      answer:
        "Nano Banana uses an advanced AI model that excels at consistent character editing and scene preservation, outperforming competitors like Flux Kontext. Our natural language interface makes complex edits simple, and our one-shot editing capability means you get great results on the first try.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support all common image formats including JPG, PNG, WebP, and HEIC. Maximum file size is 50MB per image. For batch processing, you can upload up to 9 images at once.",
    },
    {
      question: "How long does it take to process an image?",
      answer:
        "Most edits are completed in 10-30 seconds depending on complexity. Our ultra-fast processing ensures you can iterate quickly and maintain your creative flow without waiting.",
    },
    {
      question: "Can I use Nano Banana for commercial projects?",
      answer:
        "Yes! All images generated with Nano Banana can be used for commercial purposes. You retain full rights to your creations. Check our pricing page for details on commercial licensing tiers.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a free trial with 10 image generations so you can experience the power of Nano Banana. No credit card required to start. Upgrade anytime to unlock unlimited generations and advanced features.",
    },
    {
      question: "What kind of edits can I make?",
      answer:
        "You can make virtually any edit using natural language: change lighting and atmosphere, add or remove objects, transform styles, enhance details, change backgrounds, adjust colors, and much more. If you can describe it, Nano Banana can create it.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything you need to know about Nano Banana
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
