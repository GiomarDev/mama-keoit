'use client'

interface UserData {
  momName: string
  message: string
}

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300]

function FlowerCorner({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {PETAL_ANGLES.map((a, i) => (
        <ellipse
          key={i}
          cx={20 + Math.cos((a * Math.PI) / 180) * 9}
          cy={20 + Math.sin((a * Math.PI) / 180) * 9}
          rx="6"
          ry="4"
          fill={color1}
          opacity="0.3"
        />
      ))}
      <circle cx="20" cy="20" r="4" fill={color2} opacity="0.3" />
    </svg>
  )
}

export default function CardDownloadable({ userData }: { userData: UserData }) {
  return (
    /* Posicionado fuera del viewport — solo existe para html2canvas */
    <div
      id="card-to-download"
      style={{
        position: 'fixed',
        left: '-9999px',
        top: 0,
        width: 380,
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        borderRadius: 24,
        background: 'linear-gradient(145deg, #FFF8F0 0%, #FFE8F0 100%)',
        border: '1.5px solid rgba(212,168,83,0.3)',
        boxShadow: '0 20px 60px rgba(123,63,94,0.2)',
        boxSizing: 'border-box',
        zIndex: -1,
      }}
    >
      {/* Corner flower top-left */}
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <FlowerCorner color1="#E8A0BF" color2="#D4A853" />
      </div>
      {/* Corner flower bottom-right */}
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <FlowerCorner color1="#D4A853" color2="#E8A0BF" />
      </div>

      {/* Divider */}
      <div
        style={{
          width: 48,
          height: 1,
          margin: '0 auto',
          background: 'linear-gradient(90deg, transparent, #D4A853, transparent)',
        }}
      />

      {/* Para */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#B07090',
            marginBottom: 8,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Para
        </p>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            fontFamily: 'Playfair Display, Georgia, serif',
            color: '#7B3F5E',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {userData.momName}
        </h2>
      </div>

      {/* Message */}
      <p
        style={{
          textAlign: 'center',
          fontSize: 15,
          lineHeight: 1.7,
          fontStyle: 'italic',
          fontFamily: 'Playfair Display, Georgia, serif',
          color: '#5C2D44',
          margin: 0,
        }}
      >
        &ldquo;{userData.message}&rdquo;
      </p>

      {/* Divider */}
      <div
        style={{
          width: 48,
          height: 1,
          margin: '0 auto',
          background: 'linear-gradient(90deg, transparent, #D4A853, transparent)',
        }}
      />

      {/* Footer */}
      <p
        style={{
          textAlign: 'center',
          fontSize: 11,
          fontStyle: 'italic',
          color: '#C0A0B0',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
        }}
      >
        Con amor, el Día de la Madre ✦
      </p>
    </div>
  )
}
