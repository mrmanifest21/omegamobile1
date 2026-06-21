import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "OMEGAELZ streamlined our entire business operations. The AI automation they built handles our admin workflows end-to-end — what used to take days now runs itself. Genuinely transformative.",
    name: "Exilite",
    title: "Business Admin & AI Automation",
    location: "South Africa",
    stars: 5,
    initials: "EX",
    color: "#F865B3",
  },
  {
    quote: "They delivered a professional, high-converting website for Chibuwe Construction that truly reflects the quality of our builds. The process was smooth and the results exceeded expectations.",
    name: "Chibuwe Construction",
    title: "Web Development",
    location: "South Africa",
    stars: 5,
    initials: "CC",
    color: "#9CF6F6",
  },
  {
    quote: "OMEGAELZ built our website and took over our social media — engagement has grown consistently every month. They understand how to position a brand and actually drive results.",
    name: "Brainsensory",
    title: "Web Development & Social Media",
    location: "South Africa",
    stars: 5,
    initials: "BS",
    color: "#F865B3",
  },
  {
    quote: "Our new website positions Muhuyu Holdings exactly where we need to be in the market. Clean, authoritative, and built to convert. OMEGAELZ delivered on every brief.",
    name: "Muhuyu Holdings",
    title: "Web Development",
    location: "South Africa",
    stars: 5,
    initials: "MH",
    color: "#9CF6F6",
  },
  {
    quote: "Working with OMEGAELZ across borders was seamless. They managed our social media and produced AI-generated content that resonated with our audience internationally. A standout agency.",
    name: "Beast Initiative",
    title: "Social Media & AI Content",
    location: "International",
    stars: 5,
    initials: "BI",
    color: "#F865B3",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F865B3">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, active }: { t: typeof testimonials[0]; active: boolean }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${active ? 'rgba(248,101,179,0.3)' : 'rgba(216,226,220,0.08)'}`,
      borderRadius: '2px',
      padding: 'clamp(28px, 3vw, 40px)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
      transform: active ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: active ? '0 20px 60px rgba(248,101,179,0.08)' : 'none',
      cursor: 'default',
    }}>
      <StarRating count={t.stars} />

      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 'clamp(14px, 1.5vw, 16px)',
        color: 'rgba(216,226,220,0.8)',
        lineHeight: 1.75,
        flex: 1,
        marginBottom: '28px',
      }}>
        "{t.quote}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          backgroundColor: `${t.color}18`,
          border: `1px solid ${t.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px', fontWeight: 700,
            color: t.color, letterSpacing: '0.05em',
          }}>{t.initials}</span>
        </div>
        <div>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '14px',
            fontWeight: 600, color: '#D8E2DC', marginBottom: '2px',
          }}>{t.name}</p>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '10px',
            color: 'rgba(216,226,220,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>{t.title}</p>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '10px',
            color: t.color, opacity: 0.7, letterSpacing: '0.04em',
          }}>{t.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [, setActiveIdx] = useState(0);
  const [page, setPage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const VISIBLE = 3;
  const totalPages = testimonials.length - VISIBLE + 1;

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setPage(p => {
        const next = (p + 1) % totalPages;
        setActiveIdx(next);
        return next;
      });
    }, 4000);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const anim = gsap.fromTo(header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 85%', once: true } }
    );

    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const cardEls = Array.from(cards.children) as HTMLElement[];
    gsap.set(cardEls, { opacity: 0, y: 40 });
    const tweens = cardEls.map((card, i) =>
      gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.08 })
    );

    return () => { tweens.forEach(t => t.kill()); };
  }, [page]);

  const goTo = (idx: number) => {
    setPage(idx);
    setActiveIdx(idx);
    startAutoplay();
  };

  const visible = testimonials.slice(page, page + VISIBLE);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        backgroundColor: '#02111e',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid rgba(216,226,220,0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(48px, 6vw, 72px)', opacity: 0 }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px',
            color: '#F865B3', letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>Client Proof</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 400, color: '#D8E2DC', letterSpacing: '-0.02em', lineHeight: 0.9,
            }}>
              Trusted by<br />
              <span style={{ color: '#F865B3' }}>South African</span><br />
              businesses.
            </h2>

            {/* Aggregate rating badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              background: 'rgba(248,101,179,0.06)', border: '1px solid rgba(248,101,179,0.2)',
              borderRadius: '2px', padding: '16px 24px', flexShrink: 0,
            }}>
              <div>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif', fontSize: '36px', fontWeight: 700,
                  color: '#D8E2DC', lineHeight: 1, marginBottom: '4px',
                }}>5.0</p>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F865B3">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '10px',
                  color: 'rgba(216,226,220,0.4)', letterSpacing: '0.06em',
                }}>AVERAGE RATING</p>
              </div>
              <div style={{ width: '1px', height: '48px', background: 'rgba(216,226,220,0.1)' }} />
              <div>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif', fontSize: '36px', fontWeight: 700,
                  color: '#D8E2DC', lineHeight: 1, marginBottom: '4px',
                }}>50+</p>
                <p style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '10px',
                  color: 'rgba(216,226,220,0.4)', letterSpacing: '0.06em',
                }}>HAPPY CLIENTS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {visible.map((t, i) => (
            <div key={`${page}-${i}`}>
              <TestimonialCard t={t} active={i === 0} />
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === page ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: i === page ? '#F865B3' : 'rgba(216,226,220,0.2)',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          marginTop: '64px', paddingTop: '40px',
          borderTop: '1px solid rgba(216,226,220,0.06)',
          display: 'flex', flexWrap: 'wrap', gap: '32px',
          justifyContent: 'center', alignItems: 'center',
        }}>
          {[
            { label: 'Project Delivery Rate', value: '100%' },
            { label: 'Avg. Client ROI', value: '3.2×' },
            { label: 'Repeat Clients', value: '84%' },
            { label: 'Response Time', value: '< 2hrs' },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 600, color: '#9CF6F6', lineHeight: 1, marginBottom: '6px',
              }}>{value}</p>
              <p style={{
                fontFamily: '"Space Mono", monospace', fontSize: '10px',
                color: 'rgba(216,226,220,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{label}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #testimonials [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #testimonials [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
