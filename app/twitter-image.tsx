import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
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
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>AI Image Editor</div>
        <div style={{ fontSize: 32, opacity: 0.92, marginTop: 16, maxWidth: 900 }}>
          Edit any photo with simple text commands
        </div>
      </div>
    ),
    size
  )
}

