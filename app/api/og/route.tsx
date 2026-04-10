import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Esa Sjana'
  const description = searchParams.get('description') || ''

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 24,
              color: '#a1a1aa',
              lineHeight: 1.5,
              maxWidth: '80%',
            }}
          >
            {description}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            fontSize: 20,
            color: '#71717a',
          }}
        >
          esasjana.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
