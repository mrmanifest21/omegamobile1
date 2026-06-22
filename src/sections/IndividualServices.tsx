import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { individualServicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function IndividualServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const anim = gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' } }
    );
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const { categories } = individualServicesConfig;
  const active = categories[activeTab];

  return (
    <section
      id="individual-services"
      ref={sectionRef}
      style={{
        backgroundColor: '#D8E2DC',
        position: 'relative',
        zIndex: 2,
        padding: '120px 0',
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
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
            {individualServicesConfig.sectionLabel}
          </p>
          <h2
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: '#011627',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            {individualServicesConfig.title}
          </h2>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '15px',
              color: 'rgba(1, 22, 39, 0.55)',
              maxWidth: '540px',
              lineHeight: 1.6,
            }}
          >
            {individualServicesConfig.subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="services-tab-bar">
          {categories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(i)}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: activeTab === i ? '#011627' : 'rgba(1, 22, 39, 0.45)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === i ? '2px solid #F865B3' : '2px solid transparent',
                padding: '14px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '-1px',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== i) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(1,22,39,0.7)';
              }}
              onMouseLeave={(e) => {
                if (activeTab !== i) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(1,22,39,0.45)';
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          ref={tableRef}
          style={{ backgroundColor: '#011627', marginTop: '0', overflow: 'hidden' }}
        >
          {/* Table Header */}
          <div className="services-table-header">
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Service — {active.title}
            </span>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right', minWidth: '180px' }}>
              Price (ZAR)
            </span>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right', minWidth: '200px', paddingLeft: '24px' }}>
              Notes
            </span>
          </div>

          {/* Table Rows */}
          {active.items.map((item, i) => (
            <div
              key={item.service}
              className="services-table-row"
              style={{ borderBottom: i < active.items.length - 1 ? '1px solid rgba(216, 226, 220, 0.05)' : 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(248, 101, 179, 0.03)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'; }}
            >
              <span className="service-name" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D8E2DC', fontWeight: 400 }}>
                {item.service}
              </span>
              <span className="service-price" style={{ fontFamily: '"Space Mono", monospace', fontSize: '13px', color: '#F865B3', textAlign: 'right', minWidth: '180px', letterSpacing: '0.02em' }}>
                {item.price}
              </span>
              <span className="service-notes" style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: 'rgba(216, 226, 220, 0.35)', textAlign: 'right', minWidth: '200px', paddingLeft: '24px', letterSpacing: '0.02em' }}>
                {item.notes}
              </span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '12px',
              color: 'rgba(1, 22, 39, 0.45)',
              lineHeight: 1.6,
              maxWidth: '500px',
            }}
          >
            All prices are indicative. Final pricing depends on scope and complexity.
            Contact us for a detailed quote tailored to your specific requirements.
          </p>
          <a
            href="mailto:omegaelz@outlook.com?subject=Custom%20Quote%20Request"
            style={{
              display: 'inline-block',
              fontFamily: '"Space Mono", monospace',
              fontSize: '13px',
              color: '#011627',
              backgroundColor: '#F865B3',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '14px 32px',
              flexShrink: 0,
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
            Request a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
