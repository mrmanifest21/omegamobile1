import { useEffect, useRef, useState } from 'react';
import { getLenis } from '../hooks/useLenis';
import { navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const navHeight = navRef.current?.offsetHeight ?? 0;
      const probeY = navHeight > 0 ? navHeight * 0.6 : 60;
      const lightSectionIds = ['manifesto', 'tiers', 'process', 'individual-services', 'footer'];
      const isInLightSection = lightSectionIds.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });
      setIsLightSection(isInLightSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const baseTextColor = isLightSection ? '#011627' : '#D8E2DC';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetId);
      } else {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  if (!navigationConfig.brandName && navigationConfig.links.length === 0) return null;

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
          padding: scrolled ? '16px 0' : '24px 0',
          transition: 'padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '14px 24px',
          borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(1, 22, 39, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {navigationConfig.brandName ? (
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '12px', fontWeight: 400,
                color: menuOpen ? '#D8E2DC' : baseTextColor,
                letterSpacing: '0.08em', textDecoration: 'none',
                textTransform: 'uppercase', transition: 'color 0.6s ease', zIndex: 101,
              }}
            >
              {navigationConfig.brandName}
            </a>
          ) : <div />}

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {navigationConfig.links.map((item) => (
              <a
                key={`${item.label}-${item.target}`}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '12px', fontWeight: 400,
                  color: baseTextColor, letterSpacing: '0.08em', textDecoration: 'none',
                  textTransform: 'uppercase', transition: 'color 0.2s ease', opacity: 0.85,
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#F865B3'; (e.target as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = baseTextColor; (e.target as HTMLElement).style.opacity = '0.85'; }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Hamburger button */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: '8px', zIndex: 101,
              flexDirection: 'column', gap: '5px', alignItems: 'flex-end',
            }}
          >
            <span style={{
              display: 'block', height: '1px', backgroundColor: menuOpen ? '#F865B3' : '#D8E2DC',
              width: menuOpen ? '24px' : '24px',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              transition: 'all 0.3s ease',
            }} />
            <span style={{
              display: 'block', height: '1px', backgroundColor: menuOpen ? '#F865B3' : '#D8E2DC',
              width: '18px',
              opacity: menuOpen ? 0 : 1,
              transition: 'all 0.3s ease',
            }} />
            <span style={{
              display: 'block', height: '1px', backgroundColor: menuOpen ? '#F865B3' : '#D8E2DC',
              width: menuOpen ? '24px' : '24px',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              transition: 'all 0.3s ease',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'fixed', inset: 0, zIndex: 99,
          backgroundColor: '#011627',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          gap: '4px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248,101,179,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', width: '100%' }}>
          {navigationConfig.links.map((item, i) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 'clamp(26px, 7vw, 44px)',
                fontWeight: 400,
                color: '#D8E2DC',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                padding: '14px 32px',
                width: '100%', justifyContent: 'center',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, color 0.2s ease`,
              }}
              onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.color = '#F865B3'; }}
              onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.color = '#D8E2DC'; }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F865B3'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D8E2DC'; }}
            >
              <span style={{
                fontFamily: '"Space Mono", monospace', fontSize: '10px',
                color: 'rgba(248,101,179,0.5)', letterSpacing: '0.1em',
                flexShrink: 0, marginTop: '4px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </a>
          ))}
        </div>

        {/* Quick-contact bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          borderTop: '1px solid rgba(216,226,220,0.07)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease 0.35s',
        }}>
          <a
            href="https://wa.me/27635590106?text=Hi%20OMEGAELZ%20Group!%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '20px 16px',
              backgroundColor: 'rgba(37,211,102,0.08)',
              borderRight: '1px solid rgba(216,226,220,0.07)',
              fontFamily: '"Space Mono", monospace', fontSize: '11px',
              color: '#25D366', letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background-color 0.2s ease',
            }}
            onTouchStart={(e) => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.14)'; }}
            onTouchEnd={(e) => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.08)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="mailto:omegaelz@outlook.com?subject=Project%20Inquiry"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '20px 16px',
              backgroundColor: 'rgba(248,101,179,0.06)',
              fontFamily: '"Space Mono", monospace', fontSize: '11px',
              color: '#F865B3', letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background-color 0.2s ease',
            }}
            onTouchStart={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248,101,179,0.12)'; }}
            onTouchEnd={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248,101,179,0.06)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email Us
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
