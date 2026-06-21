import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(codeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(btnRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
  }, []);

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      backgroundColor: '#011627',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      <div ref={codeRef} style={{ opacity: 0, marginBottom: '24px' }}>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 'clamp(80px, 15vw, 160px)',
          fontWeight: 700,
          color: 'rgba(248,101,179,0.12)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          display: 'block',
        }}>404</span>
      </div>

      <h1 ref={headingRef} style={{
        opacity: 0,
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 'clamp(28px, 5vw, 52px)',
        fontWeight: 400,
        color: '#D8E2DC',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        marginBottom: '20px',
      }}>
        This page doesn't exist.<br />
        <span style={{ color: '#F865B3' }}>Let's get you back.</span>
      </h1>

      <p ref={subRef} style={{
        opacity: 0,
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '15px',
        color: 'rgba(216,226,220,0.4)',
        lineHeight: 1.7,
        maxWidth: '380px',
        marginBottom: '40px',
      }}>
        The page you're looking for has been moved, deleted, or never existed. Head back to the homepage.
      </p>

      <a ref={btnRef} href="/" style={{
        opacity: 0,
        fontFamily: '"Space Mono", monospace',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#011627',
        backgroundColor: '#F865B3',
        padding: '14px 32px',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
      >
        ← Back to Home
      </a>

      <div style={{
        position: 'absolute', bottom: '32px',
        fontFamily: '"Space Mono", monospace',
        fontSize: '10px',
        color: 'rgba(216,226,220,0.15)',
        letterSpacing: '0.08em',
      }}>
        OMEGAELZ GROUP
      </div>
    </div>
  );
}
