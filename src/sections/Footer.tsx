import { useState } from 'react';
import { footerConfig } from '../config';
import LegalModal from '../components/LegalModal';
import type { LegalDoc } from '../components/LegalModal';

export default function Footer() {
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  const hasFooterContent =
    footerConfig.ageGateText || footerConfig.brandName ||
    footerConfig.brandTaglineLines.length > 0 || footerConfig.columns.length > 0 || footerConfig.copyright;

  if (!hasFooterContent) return null;

  return (
    <footer id="footer" style={{ backgroundColor: '#D8E2DC', position: 'relative', zIndex: 2 }}>
      {/* CTA Area */}
      <div style={{ textAlign: 'center', padding: '120px 24px 80px', backgroundColor: '#011627' }}>
        {footerConfig.ageGateText && (
          <>
            <p style={{
              fontFamily: '"Space Mono", monospace', fontSize: '12px', color: '#F865B3',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px',
            }}>
              READY TO TRANSFORM?
            </p>
            <p style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(32px,5vw,68px)',
              fontWeight: 400, color: '#D8E2DC', lineHeight: 1.1, maxWidth: '680px',
              margin: '0 auto 40px', textWrap: 'balance', letterSpacing: '-0.02em',
            }}>
              {footerConfig.ageGateText}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
              <a
                href="mailto:omegaelz@outlook.com?subject=Project%20Inquiry"
                style={{
                  display: 'inline-block', fontFamily: '"Space Mono", monospace', fontSize: '13px',
                  color: '#011627', backgroundColor: '#F865B3', letterSpacing: '0.05em',
                  textTransform: 'uppercase', textDecoration: 'none', padding: '16px 44px', transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#9CF6F6'; e.currentTarget.style.boxShadow = '0 0 40px rgba(156,246,246,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F865B3'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Start a Project
              </a>
              <a
                href="https://wa.me/27635590106"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', fontFamily: '"Space Mono", monospace', fontSize: '13px',
                  color: 'rgba(216,226,220,0.8)', backgroundColor: 'transparent',
                  border: '1px solid rgba(216,226,220,0.2)', letterSpacing: '0.05em',
                  textTransform: 'uppercase', textDecoration: 'none', padding: '16px 44px', transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.5)'; e.currentTarget.style.color = '#D8E2DC'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.2)'; e.currentTarget.style.color = 'rgba(216,226,220,0.8)'; }}
              >
                WhatsApp Us
              </a>
            </div>

            <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: '+27 63 559 0106', href: 'tel:+27635590106' },
                { label: 'omegaelz@outlook.com', href: 'mailto:omegaelz@outlook.com' },
                { label: 'omegaelz.com', href: 'https://omegaelz.com' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: '"Space Mono", monospace', fontSize: '12px',
                    color: 'rgba(216,226,220,0.4)', textDecoration: 'none', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#9CF6F6'; }}
                  onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'rgba(216,226,220,0.4)'; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Terms Highlights */}
      {footerConfig.termsHighlights && footerConfig.termsHighlights.length > 0 && (
        <div id="terms" style={{ backgroundColor: '#011627', borderTop: '1px solid rgba(216,226,220,0.05)', padding: '40px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{
              fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.3)',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px',
            }}>
              Key Terms & Conditions
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {footerConfig.termsHighlights.map((term, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F865B3', fontFamily: '"Space Mono", monospace', fontSize: '12px', flexShrink: 0, marginTop: '1px' }}>—</span>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: 'rgba(216,226,220,0.35)', lineHeight: 1.6 }}>
                    {term}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Columns */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 40px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px',
      }}>
        {/* Brand Column */}
        <div>
          {footerConfig.brandName && (
            <p style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: '16px', fontWeight: 400,
              color: '#011627', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px',
            }}>
              {footerConfig.brandName}
            </p>
          )}
          {footerConfig.brandTaglineLines.length > 0 && (
            <div>
              {footerConfig.brandTaglineLines.map((line, index) => (
                <p key={`${line}-${index}`} style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '11px',
                  lineHeight: 1.8, color: 'rgba(1,22,39,0.45)',
                }}>
                  {line}
                </p>
              ))}
            </div>
          )}
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            {[
              { label: 'LI', href: 'https://www.linkedin.com/in/omegaelz-group-21b18a323/' },
              { label: 'IG', href: 'https://www.instagram.com/omegaelz/' },
              { label: 'X', href: 'https://x.com/omegaelz' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '32px', height: '32px', border: '1px solid rgba(1,22,39,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(1,22,39,0.45)',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F865B3'; e.currentTarget.style.color = '#F865B3'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(1,22,39,0.15)'; e.currentTarget.style.color = 'rgba(1,22,39,0.45)'; }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {footerConfig.columns.map((column) => (
          <div key={column.heading}>
            <p style={{
              fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(1,22,39,0.35)',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px',
            }}>
              {column.heading}
            </p>
            {column.links.map((item) => (
              <a
                key={`${column.heading}-${item.label}`}
                href={item.href}
                onClick={(e) => { if (!item.href || item.href === '#') e.preventDefault(); }}
                style={{
                  display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '11px',
                  color: 'rgba(1,22,39,0.55)', textDecoration: 'none', marginBottom: '10px',
                  transition: 'color 0.2s ease', lineHeight: 1.8,
                }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#F865B3'; }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'rgba(1,22,39,0.55)'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* POPIA Compliance Badge */}
      <div style={{ borderTop: '1px solid rgba(1,22,39,0.08)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            border: '1px solid rgba(1,22,39,0.12)', padding: '8px 16px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z" stroke="#011627" strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(1,22,39,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              POPIA Compliant
            </span>
          </div>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(1,22,39,0.3)', letterSpacing: '0.03em' }}>
            Your personal information is protected under the Protection of Personal Information Act 4 of 2013 (South Africa).
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(1,22,39,0.1)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        {footerConfig.copyright && (
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '10px',
            color: 'rgba(1,22,39,0.35)', letterSpacing: '0.02em',
          }}>
            {footerConfig.copyright}
          </p>
        )}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {([
            { label: 'Privacy Policy', doc: 'privacy' as LegalDoc },
            { label: 'Terms of Service', doc: 'terms' as LegalDoc },
            { label: 'NDA Agreement', doc: 'nda' as LegalDoc },
          ]).map((item) => (
            <button
              key={item.label}
              onClick={() => setLegalDoc(item.doc)}
              style={{
                fontFamily: '"Space Mono", monospace', fontSize: '10px',
                color: 'rgba(1,22,39,0.4)', cursor: 'pointer',
                background: 'none', border: 'none', padding: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F865B3'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(1,22,39,0.4)'; }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}
    </footer>
  );
}
