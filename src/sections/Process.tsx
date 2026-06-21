import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];
    stepRefs.current.forEach((el) => {
      if (!el) return;
      const anim = gsap.fromTo(
        el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );
      animations.push(anim);
    });
    return () => { animations.forEach((a) => { a.scrollTrigger?.kill(); a.kill(); }); };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        backgroundColor: '#D8E2DC',
        position: 'relative',
        zIndex: 2,
        padding: '120px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '12px',
              color: 'rgba(1, 22, 39, 0.5)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {processConfig.sectionLabel}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 400,
                lineHeight: 0.95,
                color: '#011627',
                letterSpacing: '-0.03em',
                maxWidth: '500px',
              }}
            >
              {processConfig.title}
            </h2>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '16px',
                color: 'rgba(1, 22, 39, 0.6)',
                maxWidth: '360px',
                lineHeight: 1.6,
              }}
            >
              {processConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {processConfig.steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'flex-start',
                padding: '40px 0',
                borderBottom: i < processConfig.steps.length - 1 ? '1px solid rgba(1, 22, 39, 0.1)' : 'none',
                opacity: 0,
              }}
            >
              {/* Number */}
              <div style={{ flexShrink: 0, width: '80px' }}>
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 'clamp(48px, 5vw, 72px)',
                    fontWeight: 400,
                    color: 'rgba(1, 22, 39, 0.08)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    display: 'block',
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: '8px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <h3
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 'clamp(22px, 3vw, 32px)',
                      fontWeight: 400,
                      color: '#011627',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '13px',
                      color: 'rgba(1, 22, 39, 0.55)',
                      lineHeight: 1.7,
                      maxWidth: '480px',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '64px', display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <a
            href="mailto:omegaelz@outlook.com?subject=Project%20Consultation"
            style={{
              display: 'inline-block',
              fontFamily: '"Space Mono", monospace',
              fontSize: '13px',
              color: '#011627',
              backgroundColor: '#F865B3',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 40px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#9CF6F6';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(156, 246, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F865B3';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book a Consultation
          </a>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(1,22,39,0.45)' }}>
            Free initial consultation. No commitment required.
          </span>
        </div>
      </div>
    </section>
  );
}
