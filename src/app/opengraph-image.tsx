import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Trendique AI - Smart Fashion Companion'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  const mascotUrl = 'https://trendique-ai.vercel.app/images/mascot.png';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #FFD700, #000000)', // Gold to Black
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
         <div 
            style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '40px 80px',
                borderRadius: '40px',
                alignItems: 'center',
                gap: '40px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
         >
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
                src={mascotUrl}
                alt="Trendique Mascot"
                width="150"
                height="150"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
             />
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: 80, fontWeight: 'bold', margin: 0, color: '#1a1a1a' }}>
                    Trendique
                </h1>
                <p style={{ fontSize: 30, margin: 0, color: '#666' }}>
                    Smart Fashion Companion
                </p>
             </div>
         </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
