const clients = [
  { name: 'Exilite', service: 'AI Automation' },
  { name: 'Chibuwe Construction', service: 'Web Development' },
  { name: 'Brainsensory', service: 'Web & Social Media' },
  { name: 'Muhuyu Holdings', service: 'Web Development' },
  { name: 'Beast Initiative', service: 'AI Content' },
];

const repeated = [...clients, ...clients, ...clients];

export default function ClientMarquee() {
  return (
    <div style={{
      backgroundColor: '#011627',
      borderTop: '1px solid rgba(216,226,220,0.06)',
      borderBottom: '1px solid rgba(216,226,220,0.06)',
      padding: '20px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
        background: 'linear-gradient(to right, #011627, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
        background: 'linear-gradient(to left, #011627, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 30s linear infinite',
      }}>
        {repeated.map((client, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 40px',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              color: '#D8E2DC',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}>
              {client.name}
            </span>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '9px',
              color: '#F865B3',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.7,
              whiteSpace: 'nowrap',
            }}>
              {client.service}
            </span>
            <span style={{
              width: '4px', height: '4px', borderRadius: '50%',
              backgroundColor: 'rgba(216,226,220,0.15)',
              flexShrink: 0,
              marginLeft: '6px',
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
