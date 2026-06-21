import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ConsultationBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.6 && !dismissed) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    if (visible && !dismissed) {
      gsap.fromTo(banner,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
      );
    }
  }, [visible, dismissed]);

  const handleDismiss = () => {
    const banner = bannerRef.current;
    if (!banner) { setDismissed(true); return; }
    gsap.to(banner, {
      y: 80, opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: () => setDismissed(true),
    });
  };

  const handleBook = () => {
    const el = document.getElementById('book-consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    handleDismiss();
  };

  if (!visible || dismissed) return null;

  return (
    <div
      ref={bannerRef}
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: '#061f33',
        border: '1px solid rgba(156,246,246,0.25)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(156,246,246,0.08)',
        padding: '14px 14px 14px 24px',
        maxWidth: '540px',
        width: 'calc(100vw - 48px)',
        opacity: 0,
      }}
    >
      {/* Pulse dot */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: '#9CF6F6',
        }} />
        <div style={{
          position: 'absolute', top: '-4px', left: '-4px',
          width: '16px', height: '16px', borderRadius: '50%',
          border: '1px solid rgba(156,246,246,0.4)',
          animation: 'bannerPulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: '#D8E2DC',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          Free 30-min strategy session — no obligation
        </p>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '10px',
          color: 'rgba(216,226,220,0.4)',
          letterSpacing: '0.04em',
          marginTop: '2px',
        }}>
          Tell us your goals — we'll show you the path.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={handleBook}
        style={{
          flexShrink: 0,
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          color: '#011627',
          backgroundColor: '#9CF6F6',
          border: 'none',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '11px 20px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F865B3'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#9CF6F6'; }}
      >
        Book Free
      </button>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        style={{
          flexShrink: 0,
          width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'transparent',
          border: '1px solid rgba(216,226,220,0.1)',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease',
          padding: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(248,101,179,0.4)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.1)'; }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="1" y1="1" x2="9" y2="9" stroke="rgba(216,226,220,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="1" x2="1" y2="9" stroke="rgba(216,226,220,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <style>{`
        @keyframes bannerPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        @media (max-width: 480px) {
          #consultation-banner-text-sub { display: none; }
        }
      `}</style>
    </div>
  );
}
