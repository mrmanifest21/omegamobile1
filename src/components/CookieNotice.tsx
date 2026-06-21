import { useState, useEffect } from 'react';

const STORAGE_KEY = 'omegaelz_cookie_consent';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      setVisible(false);
    }, 380);
  };

  const decline = () => {
    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, 'declined');
      setVisible(false);
    }, 380);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        zIndex: 9998,
        width: 'min(92vw, 620px)',
        background: 'rgba(1,22,39,0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(248,101,179,0.18)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap' as const,
        transition: 'opacity 0.38s ease, transform 0.38s ease',
        opacity: leaving ? 0 : 1,
        transform: leaving
          ? 'translateX(-50%) translateY(12px)'
          : 'translateX(-50%) translateY(0)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ flex: 1, minWidth: '200px' }}>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: '#F865B3',
          textTransform: 'uppercase',
          margin: '0 0 6px',
        }}>
          Cookie Notice
        </p>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '13px',
          color: 'rgba(216,226,220,0.65)',
          lineHeight: 1.55,
          margin: 0,
        }}>
          We use cookies to improve your experience and analyse site traffic. By continuing, you agree to our use of cookies.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: 'rgba(216,226,220,0.4)',
            background: 'transparent',
            border: '1px solid rgba(216,226,220,0.15)',
            padding: '9px 16px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(216,226,220,0.8)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(216,226,220,0.4)')}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: '#011627',
            background: '#F865B3',
            border: '1px solid #F865B3',
            padding: '9px 20px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#ff7cc4')}
          onMouseLeave={e => (e.currentTarget.style.background = '#F865B3')}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
