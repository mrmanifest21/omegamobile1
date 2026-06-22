import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiersConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Tiers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tierRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const tiers = tiersConfig.tiers;

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];
    tierRefs.current.forEach((el) => {
      if (!el) return;
      const textEl = el.querySelector('.tier-text-content');
      if (textEl) {
        animations.push(gsap.fromTo(textEl,
          { opacity: 0, x: 40, filter: 'blur(4px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } }
        ));
      }
      const imgEl = el.querySelector('.tier-image-container');
      if (imgEl) {
        animations.push(gsap.fromTo(imgEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } }
        ));
      }
    });
    return () => { animations.forEach((a) => { a.scrollTrigger?.kill(); a.kill(); }); };
  }, []);

  if (!tiersConfig.sectionLabel && !tiersConfig.title && tiers.length === 0) return null;

  return (
    <section
      id="tiers"
      ref={sectionRef}
      style={{ backgroundColor: '#D8E2DC', position: 'relative', zIndex: 2, padding: '120px 0 80px' }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '0 24px 80px' }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(1,22,39,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
          {tiersConfig.sectionLabel}
        </p>
        <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px,6vw,80px)', fontWeight: 400, lineHeight: 0.95, color: '#011627', letterSpacing: '-0.03em', marginBottom: '16px' }}>
          {tiersConfig.title}
        </h2>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: 'rgba(1,22,39,0.55)', maxWidth: '440px', margin: '0 auto 0', lineHeight: 1.6 }}>
          {tiersConfig.subtitle}
        </p>
      </div>

      {/* Tier Rows */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            ref={(el) => { tierRefs.current[i] = el; }}
            className={i % 2 === 0 ? 'tier-row' : 'tier-row tier-row-reverse'}
            style={{ marginBottom: i < tiers.length - 1 ? '120px' : '0' }}
          >
            {/* Image */}
            <div
              className="tier-image-container"
              style={{
                width: '100%', maxWidth: '460px', flex: '0 0 auto',
                position: 'relative', overflow: 'hidden', borderRadius: '0px',
                boxShadow: '0px 24px 64px 0px rgba(1, 22, 39, 0.18)', opacity: 0,
              }}
            >
              {tier.badge && (
                <div style={{
                  position: 'absolute', top: '20px', left: '20px', zIndex: 2,
                  backgroundColor: '#F865B3', padding: '4px 14px',
                  fontFamily: '"Space Mono", monospace', fontSize: '10px',
                  color: '#011627', letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  {tier.badge}
                </div>
              )}
              {tier.image && (
                <img
                  src={tier.image}
                  alt={tier.name}
                  style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
                />
              )}
              {!tier.image && (
                <div style={{
                  width: '100%', aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, #011627 0%, #073545 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '80px', color: 'rgba(248,101,179,0.15)', letterSpacing: '-0.04em' }}>
                    {tier.name}
                  </span>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div
              className="tier-text-content"
              style={{ flex: '1 1 400px', minWidth: '300px', opacity: 0 }}
            >
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: '#F865B3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {tier.journeys}
              </p>
              <h3 style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px,4vw,64px)',
                fontWeight: 400, lineHeight: 1, color: '#011627', marginBottom: '4px',
                letterSpacing: '-0.03em',
              }}>
                {tier.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 400, color: '#011627', letterSpacing: '-0.02em' }}>
                  R{tier.price}
                </span>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(1,22,39,0.45)', letterSpacing: '0.05em' }}>
                  {tier.frequency}
                </span>
              </div>

              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', lineHeight: 1.65, color: 'rgba(1,22,39,0.6)', marginBottom: '28px', maxWidth: '440px' }}>
                {tier.description}
              </p>

              {/* Amenities */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {tier.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    style={{
                      fontFamily: '"Space Mono", monospace', fontSize: '12px', lineHeight: 1.4,
                      color: 'rgba(1,22,39,0.6)', padding: '10px 0',
                      borderBottom: '1px solid rgba(1,22,39,0.07)',
                      display: 'flex', alignItems: 'center', gap: '12px',
                    }}
                  >
                    <span style={{ display: 'inline-block', width: '16px', height: '1px', backgroundColor: '#F865B3', flexShrink: 0 }} />
                    {amenity}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.ctaText && (
                <a
                  href={tier.ctaHref || '#'}
                  onClick={(e) => { if (!tier.ctaHref || tier.ctaHref === '#') e.preventDefault(); }}
                  style={{
                    display: 'inline-block', fontFamily: '"Space Mono", monospace', fontSize: '13px',
                    color: '#011627', backgroundColor: '#F865B3', letterSpacing: '0.05em',
                    textTransform: 'uppercase', textDecoration: 'none', padding: '14px 36px', transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#9CF6F6'; e.currentTarget.style.boxShadow = '0 0 30px rgba(156,246,246,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F865B3'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {tier.ctaText}
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Comparison Toggle */}
        <div style={{ marginTop: '100px', borderTop: '1px solid rgba(1,22,39,0.1)', paddingTop: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: showComparison ? '32px' : '0' }}>
            <div>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(1,22,39,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Feature Comparison
              </p>
              <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 400, color: '#011627', letterSpacing: '-0.02em' }}>
                Compare All Packages
              </h3>
            </div>
            <button
              onClick={() => setShowComparison(!showComparison)}
              style={{
                fontFamily: '"Space Mono", monospace', fontSize: '12px', color: '#011627',
                backgroundColor: 'transparent', border: '1px solid rgba(1,22,39,0.3)',
                padding: '12px 28px', cursor: 'pointer', letterSpacing: '0.05em',
                textTransform: 'uppercase', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F865B3'; e.currentTarget.style.color = '#F865B3'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(1,22,39,0.3)'; e.currentTarget.style.color = '#011627'; }}
            >
              {showComparison ? 'Hide Comparison' : 'View Full Comparison'}
            </button>
          </div>

          {showComparison && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#011627' }}>
                    <th style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: 'rgba(216,226,220,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 20px', textAlign: 'left', fontWeight: 400 }}>
                      Feature
                    </th>
                    {tiers.map((tier) => (
                      <th key={tier.name} style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: tier.badge ? '#F865B3' : 'rgba(216,226,220,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 20px', textAlign: 'center', fontWeight: 400 }}>
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tiersConfig.comparisonRows.map((row, i) => (
                    <tr key={row.feature} style={{ backgroundColor: i % 2 === 0 ? 'rgba(1,22,39,0.04)' : 'transparent' }}>
                      <td style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(1,22,39,0.65)', padding: '14px 20px', borderBottom: '1px solid rgba(1,22,39,0.06)' }}>
                        {row.feature}
                      </td>
                      {[row.basic, row.standard, row.premium].map((val, j) => (
                        <td key={j} style={{
                          fontFamily: '"Space Mono", monospace', fontSize: '12px',
                          color: val === '✓' ? '#F865B3' : val === '—' ? 'rgba(1,22,39,0.25)' : 'rgba(1,22,39,0.7)',
                          padding: '14px 20px', textAlign: 'center', borderBottom: '1px solid rgba(1,22,39,0.06)',
                        }}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#011627' }}>
                    <td style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(216,226,220,0.5)', padding: '16px 20px', fontWeight: 400 }}>
                      Investment
                    </td>
                    {tiers.map((tier) => (
                      <td key={tier.name} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '18px', color: '#F865B3', padding: '16px 20px', textAlign: 'center', letterSpacing: '-0.01em' }}>
                        R{tier.price}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
