import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroConfig } from '../config';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const hasHeroContent =
    heroConfig.videoPath || heroConfig.eyebrow || heroConfig.titleLine ||
    heroConfig.titleEmphasis || heroConfig.subtitleLine1 || heroConfig.subtitleLine2 || heroConfig.ctaText;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
        }
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasHeroContent) return;

    const tl = gsap.timeline({ delay: 0.3 });

    if (cardRef.current) {
      tl.fromTo(cardRef.current,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
    }
    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.8');
    }
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.6');
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    }

    return () => { tl.kill(); };
  }, [hasHeroContent]);

  if (!hasHeroContent) return null;

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative', width: '100%', height: '100vh', minHeight: '600px',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#011627',
      }}
    >
      {/* Video Background */}
      {heroConfig.videoPath && (
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        >
          <source src={heroConfig.videoPath} type="video/mp4" />
        </video>
      )}

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(1,22,39,0.4) 0%, rgba(1,22,39,0.65) 60%, rgba(1,22,39,0.92) 100%)',
        zIndex: 1,
      }} />

      {/* Content Card */}
      <div
        ref={cardRef}
        className="omega-glass"
        style={{
          position: 'relative', zIndex: 10, maxWidth: '720px', width: '90%',
          padding: 'clamp(36px, 5vw, 60px)', textAlign: 'center', opacity: 0,
        }}
      >
        {heroConfig.eyebrow && (
          <p ref={eyebrowRef} style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#F865B3',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px',
            textShadow: '0 0 20px rgba(248,101,179,0.4)', opacity: 0,
          }}>
            {heroConfig.eyebrow}
          </p>
        )}

        {(heroConfig.titleLine || heroConfig.titleEmphasis) && (
          <h1 ref={titleRef} style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px, 7vw, 96px)',
            fontWeight: 400, color: '#D8E2DC', letterSpacing: '-0.02em', lineHeight: 0.9, opacity: 0,
          }}>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{heroConfig.titleLine}</span>
            {heroConfig.titleEmphasis && (
              <span style={{ display: 'block', whiteSpace: 'nowrap', color: '#F865B3' }}>
                {heroConfig.titleEmphasis}
              </span>
            )}
          </h1>
        )}

        {(heroConfig.subtitleLine1 || heroConfig.subtitleLine2) && (
          <p ref={subtitleRef} style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: 'rgba(216,226,220,0.55)',
            lineHeight: 1.6, margin: '24px auto 0', maxWidth: '520px', opacity: 0,
          }}>
            {heroConfig.subtitleLine1}
            {heroConfig.subtitleLine1 && heroConfig.subtitleLine2 && <br />}
            {heroConfig.subtitleLine2}
          </p>
        )}

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px', opacity: 0 }}>
          {heroConfig.ctaText && (
            <a
              href={heroConfig.ctaTargetId || '#'}
              onClick={(e) => {
                e.preventDefault();
                if (!heroConfig.ctaTargetId) return;
                const el = document.querySelector(heroConfig.ctaTargetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-block', fontFamily: '"Space Mono", monospace', fontSize: '13px',
                color: '#011627', backgroundColor: '#F865B3', letterSpacing: '0.05em',
                textTransform: 'uppercase', textDecoration: 'none', padding: '16px 36px', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#9CF6F6'; e.currentTarget.style.boxShadow = '0 0 30px rgba(156,246,246,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F865B3'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {heroConfig.ctaText}
            </a>
          )}
          {heroConfig.secondaryCtaText && (
            <a
              href={heroConfig.secondaryCtaTargetId || '#'}
              onClick={(e) => {
                e.preventDefault();
                if (!heroConfig.secondaryCtaTargetId) return;
                const el = document.querySelector(heroConfig.secondaryCtaTargetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-block', fontFamily: '"Space Mono", monospace', fontSize: '13px',
                color: 'rgba(216,226,220,0.8)', backgroundColor: 'transparent',
                border: '1px solid rgba(216,226,220,0.25)', letterSpacing: '0.05em',
                textTransform: 'uppercase', textDecoration: 'none', padding: '16px 36px', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.6)'; e.currentTarget.style.color = '#D8E2DC'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.25)'; e.currentTarget.style.color = 'rgba(216,226,220,0.8)'; }}
            >
              {heroConfig.secondaryCtaText}
            </a>
          )}
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
          {['Web Development', 'AI Automation', 'CRM Systems', 'Data Analytics'].map((badge) => (
            <span key={badge} style={{
              fontFamily: '"Space Mono", monospace', fontSize: '10px',
              color: 'rgba(216,226,220,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ width: '1px', height: '48px', backgroundColor: 'rgba(248,101,179,0.35)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#F865B3',
            position: 'absolute', left: '-1.5px', animation: 'scrollDot 2s infinite ease-in-out',
          }} />
        </div>
        <style>{`@keyframes scrollDot { 0% { top: 0; opacity: 1; } 80% { top: 44px; opacity: 0.3; } 100% { top: 0; opacity: 1; } }`}</style>
      </div>
    </section>
  );
}
