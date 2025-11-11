import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'AI Image Editor'
  const subtitle = searchParams.get('subtitle') || 'Natural language image editing powered by Gemini via OpenRouter'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #1e40af 0%, #8b5cf6 100%)',
          color: '#fff',
          padding: '80px',
          fontFamily: 'Inter, Geist, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 32, opacity: 0.92, marginTop: 16, maxWidth: 900 }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

