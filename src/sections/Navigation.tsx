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
          gap: '8px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {navigationConfig.links.map((item, i) => (
          <a
            key={item.label}
            href={item.target}
            onClick={(e) => handleNavClick(e, item.target)}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(28px, 8vw, 48px)',
              fontWeight: 400,
              color: '#D8E2DC',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              padding: '12px 0',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${i * 0.06}s`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F865B3'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D8E2DC'; }}
          >
            {item.label}
          </a>
        ))}

        <div style={{
          position: 'absolute', bottom: '40px',
          fontFamily: '"Space Mono", monospace', fontSize: '10px',
          color: 'rgba(216,226,220,0.25)', letterSpacing: '0.1em',
        }}>
          OMEGAELZ GROUP
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
