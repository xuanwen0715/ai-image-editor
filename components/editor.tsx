"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Sparkles } from "lucide-react"

export function Editor() {
  const [prompt, setPrompt] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        const maxWidth = 1024
        const maxHeight = 1024
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target?.result as string)
              reader.onerror = reject
              reader.readAsDataURL(blob)
            } else {
              reject(new Error('Canvas to blob conversion failed'))
            }
          },
          'image/jpeg',
          0.8
        )
      }

      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image too large (max 10MB)")
        return
      }

      try {
        setError(null)
        const compressedImage = await compressImage(file)
        setSelectedImage(compressedImage)
      } catch (err) {
        setError("Failed to process image")
      }
    }
  }

  const handleGenerate = async () => {
    try {
      setError(null)
      setGeneratedImages([])
      if (!selectedImage) {
        setError("Please upload an image first")
        return
      }
      if (!prompt.trim()) {
        setError("Please enter a prompt")
        return
      }
      setIsGenerating(true)
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, image: selectedImage }),
      })
      if (!res.ok) {
        let message = "Generation failed"
        try {
          const err = await res.json()
          if (err?.error) message = `Generation failed: ${err.error}`
          else if (err?.details) message = `Generation failed: ${err.details}`
        } catch {
          const t = await res.text()
          if (t) message = `Generation failed: ${t}`
        }
        setError(message)
        return
      }
      const data = (await res.json()) as { images?: string[]; error?: string }
      if (!data.images || data.images.length === 0) {
        setError(data.error || "No image returned")
        return
      }
      setGeneratedImages(data.images)
    } catch (err: any) {
      setError(err?.message ?? "Unexpected error")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="editor" className="relative py-16 md:py-20">
      <div className="container">

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Prompt Engine */}
          <Card className="p-6 border border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Prompt Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Transform your image with AI-powered editing</p>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-foreground">Reference Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/60 transition-colors cursor-pointer bg-secondary/30">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {selectedImage ? (
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="max-h-40 mx-auto rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Add Image
                        <br />
                        <span className="text-xs">Max 10MB (auto-compressed)</span>
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Main Prompt */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-foreground">Main Prompt</label>
              <Textarea
                placeholder="A futuristic city powered by nano technology, golden hour lighting, ultra detailed..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-95 shadow-md"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Now"}
            </Button>
          </Card>

          {/* Output Gallery */}
          <Card className="p-6 border border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-secondary p-2">
                <Upload className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Output Gallery</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your ultra-fast AI creations appear here instantly</p>

            {error && (
              <div className="mb-4 text-sm text-destructive">
                {error}
              </div>
            )}

            {generatedImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedImages.map((src, idx) => (
                  <img key={idx} src={src} alt={`Generated ${idx + 1}`} className="w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-80 border-2 border-dashed border-border rounded-lg bg-secondary/40">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    {isGenerating ? "Generating..." : "Ready for Instant generation"}
                  </p>
                  <p className="text-sm text-muted-foreground">Enter your prompt and unleash the power</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
