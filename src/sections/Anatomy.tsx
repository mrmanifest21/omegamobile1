import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeritageHelix from '../effects/HeritageHelix';
import { anatomyConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Anatomy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillars = anatomyConfig.pillars;

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];
    pillarRefs.current.forEach((el) => {
      if (!el) return;
      const anim = gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: el, start: 'top 75%', end: 'top 40%',
            scrub: false, toggleActions: 'play none none reverse',
          },
        }
      );
      animations.push(anim);
    });
    return () => { animations.forEach((a) => { a.scrollTrigger?.kill(); a.kill(); }); };
  }, []);

  if (!anatomyConfig.sectionLabel && !anatomyConfig.title && pillars.length === 0) return null;

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      style={{ backgroundColor: '#011627', position: 'relative', zIndex: 2 }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '120px 24px 40px' }}>
        {anatomyConfig.sectionLabel && (
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '12px', color: '#F865B3',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px',
          }}>
            {anatomyConfig.sectionLabel}
          </p>
        )}
        {anatomyConfig.title && (
          <h2 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px,6vw,80px)',
            fontWeight: 400, lineHeight: 0.95, color: '#D8E2DC', letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            {anatomyConfig.title}
          </h2>
        )}
        {anatomyConfig.subtitle && (
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '16px',
            color: 'rgba(216,226,220,0.45)', maxWidth: '440px', margin: '0 auto',
          }}>
            {anatomyConfig.subtitle}
          </p>
        )}
      </div>

      {/* Split Layout */}
      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
        {/* Left: Sticky HeritageHelix */}
        <div
          className="hidden md:flex"
          style={{
            width: '50%', position: 'sticky', top: 0, height: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', height: '80vh' }}>
            <HeritageHelix />
          </div>
        </div>

        {/* Right: Scrolling Content */}
        <div className="w-full md:w-1/2" style={{ padding: '0 48px' }}>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              ref={(el) => { pillarRefs.current[i] = el; }}
              style={{
                padding: '14vh 0',
                borderBottom: i < pillars.length - 1 ? '1px solid rgba(216,226,220,0.08)' : 'none',
              }}
            >
              <p style={{
                fontFamily: '"Space Mono", monospace', fontSize: '12px', color: '#F865B3',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px',
              }}>
                {pillar.label}
              </p>
              <h3 style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(28px,4vw,52px)',
                fontWeight: 400, lineHeight: 1.05, color: '#D8E2DC', marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}>
                {pillar.title}
              </h3>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '15px', fontWeight: 400,
                lineHeight: 1.7, color: 'rgba(216,226,220,0.5)', maxWidth: '480px',
                marginBottom: '28px',
              }}>
                {pillar.body}
              </p>

              {/* Highlights */}
              {pillar.highlights && pillar.highlights.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {pillar.highlights.map((h) => (
                    <span key={h} style={{
                      fontFamily: '"Space Mono", monospace', fontSize: '10px',
                      color: 'rgba(216,226,220,0.5)', border: '1px solid rgba(248,101,179,0.2)',
                      padding: '5px 12px', letterSpacing: '0.06em',
                    }}>
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
