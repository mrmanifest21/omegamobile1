import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralOrb from '../effects/NeuralOrb';
import { aiPackagesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function AIPackages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = sectionRef.current;
    if (!trigger) return;
    const animations: gsap.core.Tween[] = [];

    if (headerRef.current) {
      animations.push(gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', scrollTrigger: { trigger, start: 'top 80%', toggleActions: 'play none none reverse' } }
      ));
    }

    if (orbRef.current) {
      animations.push(gsap.fromTo(orbRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger, start: 'top 75%', toggleActions: 'play none none reverse' } }
      ));
    }

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      animations.push(gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, delay: i * 0.13, ease: 'power2.out',
          scrollTrigger: { trigger, start: 'top 70%', toggleActions: 'play none none reverse' } }
      ));
    });

    return () => { animations.forEach(a => { a.scrollTrigger?.kill(); a.kill(); }); };
  }, []);

  return (
    <section id="ai-packages" ref={sectionRef} style={{ backgroundColor: '#011627', position: 'relative', zIndex: 2, padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,101,179,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header + Orb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', marginBottom: '72px' }}>
          <div ref={headerRef} style={{ opacity: 0, flex: '1 1 400px' }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#F865B3', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
              {aiPackagesConfig.sectionLabel}
            </p>
            <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px, 5.5vw, 76px)', fontWeight: 400, lineHeight: 0.95, color: '#D8E2DC', letterSpacing: '-0.03em', marginBottom: '20px' }}>
              {aiPackagesConfig.title}
            </h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: 'rgba(216,226,220,0.5)', maxWidth: '440px', lineHeight: 1.65 }}>
              {aiPackagesConfig.subtitle}
            </p>
          </div>

          <div ref={orbRef} style={{ opacity: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NeuralOrb size={280} />
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px' }}>
          {aiPackagesConfig.packages.map((pkg, i) => (
            <div
              key={pkg.name}
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                position: 'relative', padding: '40px 36px 48px',
                border: pkg.highlighted ? '1px solid rgba(248,101,179,0.45)' : '1px solid rgba(216,226,220,0.07)',
                backgroundColor: pkg.highlighted ? 'rgba(248,101,179,0.03)' : 'rgba(216,226,220,0.015)',
                opacity: 0, transition: 'border-color 0.3s ease, transform 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = pkg.highlighted ? 'rgba(248,101,179,0.75)' : 'rgba(216,226,220,0.18)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = pkg.highlighted ? 'rgba(248,101,179,0.45)' : 'rgba(216,226,220,0.07)';
              }}
            >
              {pkg.highlighted && (
                <>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #F865B3, transparent)' }} />
                  <div style={{ position: 'absolute', top: '-1px', left: '32px', backgroundColor: '#F865B3', padding: '5px 14px', fontFamily: '"Space Mono", monospace', fontSize: '9px', color: '#011627', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Most Popular
                  </div>
                </>
              )}

              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: pkg.highlighted ? '#F865B3' : 'rgba(216,226,220,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px', marginTop: pkg.highlighted ? '16px' : '0' }}>
                {pkg.name}
              </p>

              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: 'rgba(216,226,220,0.4)', alignSelf: 'flex-start', marginTop: '8px' }}>R</span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(38px, 4vw, 54px)', fontWeight: 400, color: '#D8E2DC', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {pkg.price}
                </span>
              </div>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.35)', letterSpacing: '0.06em', marginBottom: '8px' }}>
                {pkg.frequency}
              </p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: 'rgba(216,226,220,0.4)', fontStyle: 'italic', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(216,226,220,0.06)' }}>
                {pkg.ideal}
              </p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: 'rgba(216,226,220,0.55)', lineHeight: 1.65, marginBottom: '28px' }}>
                {pkg.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0' }}>
                {pkg.features.map(f => (
                  <li key={f} style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: 'rgba(216,226,220,0.55)', padding: '9px 0', borderBottom: '1px solid rgba(216,226,220,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: pkg.highlighted ? '#F865B3' : '#9CF6F6', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/27706584825?text=${encodeURIComponent(`Hi OMEGAELZ! I'm interested in the ${pkg.name} AI package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  fontFamily: '"Space Mono", monospace', fontSize: '12px',
                  color: pkg.highlighted ? '#011627' : 'rgba(216,226,220,0.8)',
                  backgroundColor: pkg.highlighted ? '#F865B3' : 'transparent',
                  border: pkg.highlighted ? 'none' : '1px solid rgba(216,226,220,0.18)',
                  letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
                  padding: '15px 24px', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = pkg.highlighted ? '#9CF6F6' : 'rgba(248,101,179,0.08)';
                  if (!pkg.highlighted) e.currentTarget.style.borderColor = 'rgba(248,101,179,0.4)';
                  if (!pkg.highlighted) e.currentTarget.style.color = '#F865B3';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = pkg.highlighted ? '#F865B3' : 'transparent';
                  if (!pkg.highlighted) e.currentTarget.style.borderColor = 'rgba(216,226,220,0.18)';
                  if (!pkg.highlighted) e.currentTarget.style.color = 'rgba(216,226,220,0.8)';
                }}
              >
                {pkg.ctaText}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontFamily: '"Space Mono", monospace', fontSize: '11px', color: 'rgba(216,226,220,0.25)', marginTop: '48px', lineHeight: 1.7 }}>
          All AI packages billed monthly in advance. Cancel with 30 days notice.{' '}
          <a href="mailto:omegaelz@outlook.com" style={{ color: '#9CF6F6', textDecoration: 'none' }}>Custom enterprise quotes available.</a>
        </p>
      </div>
    </section>
  );
}
