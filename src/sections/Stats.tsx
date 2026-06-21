import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = sectionRef.current;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    });

    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const raw = el.getAttribute('data-target') || '0';
      const target = parseFloat(raw);
      if (isNaN(target)) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        delay: i * 0.12 + 0.3,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString();
        },
        scrollTrigger: { trigger, start: 'top 80%', toggleActions: 'play none none none' },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === trigger) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        backgroundColor: '#011627',
        borderTop: '1px solid rgba(248, 101, 179, 0.15)',
        borderBottom: '1px solid rgba(248, 101, 179, 0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}
      >
        {statsConfig.items.map((item, i) => (
          <div
            key={item.label}
            ref={(el) => { itemRefs.current[i] = el; }}
            style={{
              textAlign: 'center',
              padding: '32px 20px',
              borderRight: i < statsConfig.items.length - 1 ? '1px solid rgba(216, 226, 220, 0.07)' : 'none',
              opacity: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px', marginBottom: '8px' }}>
              <span
                ref={(el) => { numRefs.current[i] = el; }}
                data-target={item.value}
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 400,
                  color: '#F865B3',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              {item.suffix && (
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '20px', color: '#9CF6F6', fontWeight: 400 }}>
                  {item.suffix}
                </span>
              )}
            </div>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '10px',
              fontWeight: 400,
              color: 'rgba(216, 226, 220, 0.45)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
