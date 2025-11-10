import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Image Editor',
    short_name: 'AI Editor',
    description: 'Natural language image editing powered by Gemini via OpenRouter.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#7c3aed',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
  }
}

