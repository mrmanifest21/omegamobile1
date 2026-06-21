import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Our website packages start at R4,750 (Basic – 4 pages) and go up to R7,800 (Premium – 10+ pages). If you only need a specific page or feature, our individual pricing starts from R1,500. All packages include a free .co.za domain for one year.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A Basic 4-page site typically takes 1–2 weeks. Standard 8-page sites take 2–3 weeks. Premium and enterprise projects with advanced integrations take 4–6 weeks. Timelines depend on how quickly you provide content (text, images, branding) and respond to review checkpoints.",
  },
  {
    q: "What do I need to get started?",
    a: "To kick off your project we need: a 50% deposit, your business logo or brand assets (if you have them), website content (or let us help write it), and any reference sites or design inspiration. We'll guide you through a structured onboarding to collect everything.",
  },
  {
    q: "Do you offer payment plans or deposits?",
    a: "All projects require a 50% deposit to begin. The remaining balance is due upon completion before final handover. For larger enterprise projects (R30,000+), we can discuss milestone-based payment schedules. Monthly AI and social media packages are billed in advance.",
  },
  {
    q: "Can you help if I already have a website?",
    a: "Absolutely. We offer website redesigns, speed optimisation, SEO audits, new page additions, and ongoing maintenance. If your existing site is outdated or underperforming, we can assess it and recommend the best path — whether that's a refresh or a full rebuild.",
  },
  {
    q: "What social media platforms do you manage?",
    a: "We manage Facebook, Instagram, TikTok, LinkedIn, Twitter/X, and YouTube. Our packages cover content creation, post scheduling, community management, and paid advertising (Meta Ads, Google Ads, TikTok Ads). We tailor the platform mix to where your audience actually is.",
  },
  {
    q: "Do you run paid advertising (Meta Ads, Google Ads)?",
    a: "Yes. Our social media management packages include optional paid ad management from R3,000/month (excluding your ad spend budget). We handle strategy, creative, targeting, A/B testing, and monthly performance reporting. Minimum recommended ad spend is R2,000–R5,000/month.",
  },
  {
    q: "What areas do you serve?",
    a: "We are based in South Africa and serve clients nationally across Johannesburg, Cape Town, Durban, Pretoria, and beyond. We also work with international clients remotely — all project communication and handover is fully digital.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. All packages include post-launch technical support — Basic gets 2 weeks, Standard gets 1 month, and Premium gets 12 months. After that, we offer ongoing monthly maintenance retainers. AI and social media packages include continuous monthly support by default.",
  },
  {
    q: "How do I get a custom quote?",
    a: "Use the contact form below or WhatsApp us directly at +27 70 757 9866. Tell us what you need, your timeline, and your budget, and we'll come back with a detailed proposal within 24 hours.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      const isOpen = i === openIdx;
      const height = isOpen ? el.scrollHeight : 0;
      gsap.to(el, { height, duration: 0.38, ease: 'power2.inOut', overflow: 'hidden' });
    });
  }, [openIdx]);

  const toggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        backgroundColor: '#011627',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid rgba(216,226,220,0.06)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(48px, 6vw, 72px)', opacity: 0 }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px',
            color: '#F865B3', letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>Frequently Asked</p>
          <h2 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400, color: '#D8E2DC', letterSpacing: '-0.02em', lineHeight: 0.9,
          }}>
            Questions<br />
            <span style={{ color: '#9CF6F6' }}>answered.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ borderTop: '1px solid rgba(216,226,220,0.08)' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderBottom: '1px solid rgba(216,226,220,0.08)' }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '24px',
                  padding: 'clamp(18px, 2.5vw, 26px) 0',
                  backgroundColor: 'transparent', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 'clamp(15px, 1.6vw, 18px)',
                  fontWeight: 500,
                  color: openIdx === i ? '#D8E2DC' : 'rgba(216,226,220,0.7)',
                  lineHeight: 1.4,
                  transition: 'color 0.25s ease',
                  flex: 1,
                }}>
                  {faq.q}
                </span>
                <div style={{
                  width: '32px', height: '32px', flexShrink: 0,
                  border: `1px solid ${openIdx === i ? 'rgba(248,101,179,0.5)' : 'rgba(216,226,220,0.15)'}`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  backgroundColor: openIdx === i ? 'rgba(248,101,179,0.08)' : 'transparent',
                }}>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <line x1="6" y1="0" x2="6" y2="12" stroke={openIdx === i ? '#F865B3' : 'rgba(216,226,220,0.5)'} strokeWidth="1.5" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke={openIdx === i ? '#F865B3' : 'rgba(216,226,220,0.5)'} strokeWidth="1.5" />
                  </svg>
                </div>
              </button>

              <div
                ref={(el) => { bodyRefs.current[i] = el; }}
                style={{ height: i === 0 ? 'auto' : '0px', overflow: 'hidden' }}
              >
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 'clamp(14px, 1.4vw, 16px)',
                  color: 'rgba(216,226,220,0.6)',
                  lineHeight: 1.75,
                  paddingBottom: 'clamp(18px, 2.5vw, 26px)',
                  maxWidth: '720px',
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '56px', display: 'flex', alignItems: 'center',
          gap: '24px', flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '12px',
            color: 'rgba(216,226,220,0.35)', letterSpacing: '0.04em',
          }}>
            Still have questions?
          </p>
          <a
            href="https://wa.me/27707579866?text=Hi%20OMEGAELZ%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: '"Space Mono", monospace', fontSize: '12px',
              color: '#011627', backgroundColor: '#25D366',
              letterSpacing: '0.05em', textTransform: 'uppercase',
              textDecoration: 'none', padding: '12px 24px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#9CF6F6'; e.currentTarget.style.boxShadow = '0 0 24px rgba(156,246,246,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25D366'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
