import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { manifestoConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasManifestoContent = manifestoConfig.sectionLabel || manifestoConfig.text;

  useEffect(() => {
    if (!hasManifestoContent) return;

    const textEl = textRef.current;
    const containerEl = containerRef.current;
    if (!textEl || !containerEl) return;

    function initAnimation() {
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
      if (splitRef.current) { splitRef.current.revert(); splitRef.current = null; }
      ScrollTrigger.getAll().forEach((st) => { if (st.vars.trigger === containerEl) st.kill(); });

      splitRef.current = new SplitType(textEl as HTMLElement, { types: 'words' });
      const words = (textEl as HTMLElement).querySelectorAll('.word');
      if (words.length === 0) return;

      tlRef.current = gsap.timeline({
        scrollTrigger: { trigger: containerEl, start: 'top 82%', end: 'center 60%', scrub: true },
      });
      tlRef.current.fromTo(
        words,
        { opacity: 0.2, filter: 'blur(8px)', color: 'rgba(1,22,39,0.3)', willChange: 'filter, opacity, color' },
        { opacity: 1, filter: 'blur(0px)', color: 'rgba(1,22,39,1)', stagger: 0.04, ease: 'sine.out' }
      );
    }

    document.fonts.ready.then(() => { initAnimation(); });

    const ro = new ResizeObserver(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => { initAnimation(); }, 150);
    });
    ro.observe(containerEl);

    return () => {
      ro.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (tlRef.current) tlRef.current.kill();
      if (splitRef.current) splitRef.current.revert();
    };
  }, [hasManifestoContent]);

  useEffect(() => {
    if (!subtextRef.current) return;
    gsap.fromTo(subtextRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: subtextRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  if (!hasManifestoContent) return null;

  return (
    <section id="manifesto" style={{ backgroundColor: '#D8E2DC', position: 'relative', zIndex: 2 }}>
      <div
        ref={containerRef}
        className="manifesto-container"
        style={{
          maxWidth: '960px', margin: '0 auto',
          padding: 'clamp(100px,15vh,200px) clamp(20px,4vw,60px)',
        }}
      >
        {manifestoConfig.sectionLabel && (
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(1,22,39,0.5)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center',
          }}>
            {manifestoConfig.sectionLabel}
          </p>
        )}

        {manifestoConfig.text && (
          <p
            ref={textRef}
            className="manifesto-text"
            style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(22px,3.5vw,44px)',
              fontWeight: 400, lineHeight: 1.3, color: '#011627', textAlign: 'center',
              textWrap: 'balance', letterSpacing: '-0.02em', marginBottom: '48px',
            }}
          >
            {manifestoConfig.text}
          </p>
        )}

        {manifestoConfig.subtext && (
          <p
            ref={subtextRef}
            style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: '16px',
              color: 'rgba(1,22,39,0.5)', textAlign: 'center', lineHeight: 1.7,
              maxWidth: '600px', margin: '0 auto 56px', opacity: 0,
            }}
          >
            {manifestoConfig.subtext}
          </p>
        )}

        {/* Divider with brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center' }}>
          <div style={{ height: '1px', width: '80px', backgroundColor: 'rgba(1,22,39,0.12)' }} />
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(1,22,39,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            OMEGAELZ · 2026
          </span>
          <div style={{ height: '1px', width: '80px', backgroundColor: 'rgba(1,22,39,0.12)' }} />
        </div>
      </div>
    </section>
  );
}
