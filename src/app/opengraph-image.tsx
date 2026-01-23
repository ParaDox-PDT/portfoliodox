// ===========================================
// DYNAMIC OPEN GRAPH IMAGE
// ===========================================
// Bu Next.js 14 feature - dinamik OG image generatsiya qiladi

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ParaDox (Doniyor Jo\'rabekov) - Flutter Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0b',
          backgroundImage: 'linear-gradient(135deg, #0a0a0b 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(99, 102, 241, 0.1) 100%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '10px',
            }}
          >
            ParaDox
          </div>
          
          {/* Real name */}
          <div
            style={{
              fontSize: 32,
              color: '#94a3b8',
              marginBottom: '30px',
            }}
          >
            Doniyor Jo&apos;rabekov
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#818cf8',
              marginBottom: '20px',
            }}
          >
            Flutter Developer
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Building beautiful mobile apps with Flutter
          </div>
          
          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '40px',
            }}
          >
            {['Flutter', 'Dart', 'Mobile', 'Clean Architecture'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  borderRadius: '20px',
                  color: '#a5b4fc',
                  fontSize: 18,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          
          {/* Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '30px',
              fontSize: 20,
              color: '#64748b',
            }}
          >
            📍 Tashkent, Uzbekistan
          </div>
        </div>
        
        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: 18,
            color: '#475569',
          }}
        >
          paradox-portfolio.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
