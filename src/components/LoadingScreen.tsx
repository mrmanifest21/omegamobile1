import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = {
      container: containerRef.current,
      logo: logoRef.current,
      line: lineRef.current,
      tag: tagRef.current,
      bar: barRef.current,
    };

    gsap.set([el.logo, el.tag], { opacity: 0, y: 24 });
    gsap.set(el.line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(el.bar, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el.container, {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.to(el.logo, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
      .to(el.line, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.25')
      .to(el.tag, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.1')
      .to(el.bar, { scaleX: 1, duration: 1.1, ease: 'power1.inOut' }, '-=0.1')
      .to({}, { duration: 0.2 });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#011627',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
      }}
    >
      <div ref={logoRef} style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 'clamp(11px, 2vw, 14px)',
          letterSpacing: '0.35em',
          color: '#F865B3',
          marginBottom: '18px',
          textTransform: 'uppercase',
        }}>
          South Africa's Next-Generation Digital Agency
        </p>
        <h1 style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 'clamp(40px, 8vw, 88px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: '#D8E2DC',
          lineHeight: 1,
          margin: 0,
        }}>
          OMEGAELZ
          <span style={{ color: '#F865B3' }}> GROUP</span>
        </h1>
      </div>

      <div ref={lineRef} style={{
        width: 'clamp(200px, 40vw, 420px)',
        height: '1px',
        backgroundColor: 'rgba(248,101,179,0.3)',
        margin: '28px 0 20px',
      }} />

      <p ref={tagRef} style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: 'clamp(9px, 1.5vw, 11px)',
        letterSpacing: '0.2em',
        color: 'rgba(216,226,220,0.35)',
        textTransform: 'uppercase',
        margin: '0 0 48px',
      }}>
        Web · AI · CRM · Analytics · Design
      </p>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(248,101,179,0.1)',
      }}>
        <div ref={barRef} style={{
          height: '100%',
          background: 'linear-gradient(90deg, #F865B3, rgba(248,101,179,0.4))',
          transformOrigin: 'left center',
        }} />
      </div>
    </div>
  );
}
