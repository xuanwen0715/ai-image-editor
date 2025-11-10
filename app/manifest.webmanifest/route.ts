export const runtime = 'edge'

export async function GET() {
  const manifest = {
    name: 'AI Image Editor',
    short_name: 'AI Editor',
    description: 'Natural language image editing powered by Gemini via OpenRouter.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#2563eb',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      'content-type': 'application/manifest+json; charset=UTF-8',
      'cache-control': 'public, max-age=3600'
    }
  })
}

