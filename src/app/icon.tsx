import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default async function Icon() {
  // We use the public mascot image
  // Note: In Next.js App Router, we can't easily read public folder in Edge without fetch
  // We will assume the deployment URL or use a relative fetch if possible.
  // However, for stability in this localized environment, we'll try to fetch from the deployment URL if exists, 
  // or construct a simple geometric fallback if fetch fails, BUT asking for "mascot" implies we really want it.
  // A robust local way is using the arrayBuffer of the file if we can import it.
  // Unfortunately, importing local standard images in Edge functions is tricky.
  // Strategy: We will try to fetch the absolute URL of the hosted image since the user already deployed it.
  // URL: https://trendique-ai.vercel.app/images/mascot.png
  
  const mascotUrl = 'https://trendique-ai.vercel.app/images/mascot.png';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={mascotUrl}
            alt="Trendique Icon"
            width="32"
            height="32"
            style={{ objectFit: 'cover' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
