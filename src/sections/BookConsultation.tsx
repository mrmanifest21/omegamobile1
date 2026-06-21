import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "Web Development",
  "AI & Automation",
  "Social Media & Marketing",
  "Graphic Design & Branding",
  "CRM Implementation",
  "Data Analytics & BI",
  "Business Consultation",
  "Website Package (Basic / Standard / Premium)",
  "Multiple Services",
  "Not sure yet — need guidance",
];

const TIME_SLOTS = [
  "Morning (08:00–11:00)",
  "Midday (11:00–13:00)",
  "Afternoon (13:00–16:00)",
  "Late Afternoon (16:00–18:00)",
  "Flexible — any time works",
];

const WHAT_TO_EXPECT = [
  { icon: "30", unit: "min", label: "Free strategy session — no obligation" },
  { icon: "✓", unit: "", label: "We understand your goals & challenges" },
  { icon: "✓", unit: "", label: "You get a tailored solution overview" },
  { icon: "✓", unit: "", label: "Transparent pricing discussed on the call" },
  { icon: "✓", unit: "", label: "You receive a written proposal within 24hrs" },
];

export default function BookConsultation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '', phone: '', service: '', date: '', slot: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const a1 = gsap.fromTo(left,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: left, start: 'top 80%', once: true } }
    );
    const a2 = gsap.fromTo(right,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: right, start: 'top 80%', once: true } }
    );
    return () => { a1.scrollTrigger?.kill(); a1.kill(); a2.scrollTrigger?.kill(); a2.kill(); };
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.service) e.service = 'Please select a service';
    if (!form.slot) e.slot = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      `Hi OMEGAELZ! I'd like to book a free consultation.`,
      ``,
      `*Name:* ${form.name}`,
      `*WhatsApp / Phone:* ${form.phone}`,
      `*Service Interest:* ${form.service}`,
      `*Preferred Date:* ${form.date || 'Flexible'}`,
      `*Preferred Time:* ${form.slot}`,
      form.message ? `*Additional Notes:* ${form.message}` : '',
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/27707579866?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, type = 'text') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: '"Space Mono", monospace', fontSize: '10px',
        color: errors[key] ? '#F865B3' : 'rgba(216,226,220,0.45)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {label}{errors[key] ? ` — ${errors[key]}` : ''}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => { setForm(f => ({ ...f, [key]: e.target.value })); if (errors[key]) setErrors(er => ({ ...er, [key]: '' })); }}
        style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: '15px',
          color: '#D8E2DC', backgroundColor: 'rgba(255,255,255,0.04)',
          border: `1px solid ${errors[key] ? 'rgba(248,101,179,0.5)' : 'rgba(216,226,220,0.12)'}`,
          padding: '14px 16px', outline: 'none', width: '100%', boxSizing: 'border-box',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(156,246,246,0.4)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = errors[key] ? 'rgba(248,101,179,0.5)' : 'rgba(216,226,220,0.12)'; }}
      />
    </div>
  );

  return (
    <section
      id="book-consultation"
      ref={sectionRef}
      style={{
        backgroundColor: '#061f33',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid rgba(156,246,246,0.1)',
        borderBottom: '1px solid rgba(156,246,246,0.1)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: 'clamp(48px, 6vw, 96px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* Left — context */}
        <div ref={leftRef} style={{ flex: '0 0 clamp(280px, 36%, 400px)', opacity: 0 }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px',
            color: '#9CF6F6', letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>Free Consultation</p>
          <h2 style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 400, color: '#D8E2DC', letterSpacing: '-0.02em', lineHeight: 0.92,
            marginBottom: '28px',
          }}>
            Book your<br />
            <span style={{ color: '#9CF6F6' }}>free strategy</span><br />
            session.
          </h2>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '15px',
            color: 'rgba(216,226,220,0.55)', lineHeight: 1.7, marginBottom: '40px',
          }}>
            In 30 minutes we'll understand your business, identify opportunities, and outline exactly how we can help — with no pressure and no obligation.
          </p>

          {/* What to expect */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {WHAT_TO_EXPECT.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '36px', height: '36px', flexShrink: 0,
                  border: '1px solid rgba(156,246,246,0.2)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: item.unit ? '13px' : '14px',
                    fontWeight: 700, color: '#9CF6F6', lineHeight: 1,
                  }}>{item.icon}</span>
                  {item.unit && (
                    <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '8px', color: 'rgba(156,246,246,0.6)', letterSpacing: '0.06em' }}>
                      {item.unit}
                    </span>
                  )}
                </div>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif', fontSize: '14px',
                  color: 'rgba(216,226,220,0.65)', lineHeight: 1.5, paddingTop: '4px',
                }}>{item.label}</p>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp link */}
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(216,226,220,0.08)' }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.35)', letterSpacing: '0.08em', marginBottom: '12px' }}>
              PREFER TO CALL OR MESSAGE DIRECTLY?
            </p>
            <a
              href="https://wa.me/27707579866"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '16px',
                color: '#9CF6F6', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +27 70 757 9866
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div ref={rightRef} style={{ flex: '1 1 340px', opacity: 0 }}>
          {submitted ? (
            <div style={{
              background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)',
              padding: '48px 40px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>📅</div>
              <h3 style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '24px',
                color: '#D8E2DC', fontWeight: 500, marginBottom: '12px',
              }}>Booking request sent!</h3>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '15px',
                color: 'rgba(216,226,220,0.6)', lineHeight: 1.6, marginBottom: '28px',
              }}>
                We've received your message on WhatsApp and will confirm your consultation slot within 2 hours during business hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: '', date: '', slot: '', message: '' }); }}
                style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '12px',
                  color: 'rgba(216,226,220,0.5)', backgroundColor: 'transparent',
                  border: '1px solid rgba(216,226,220,0.15)', padding: '10px 24px',
                  cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Name */}
              {field('name', 'Full Name *', 'Your full name')}

              {/* Phone */}
              {field('phone', 'WhatsApp / Phone *', '+27 XX XXX XXXX', 'tel')}

              {/* Service */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '10px',
                  color: errors.service ? '#F865B3' : 'rgba(216,226,220,0.45)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Service Interest *{errors.service ? ` — ${errors.service}` : ''}
                </label>
                <select
                  value={form.service}
                  onChange={(e) => { setForm(f => ({ ...f, service: e.target.value })); setErrors(er => ({ ...er, service: '' })); }}
                  style={{
                    fontFamily: '"DM Sans", sans-serif', fontSize: '15px',
                    color: form.service ? '#D8E2DC' : 'rgba(216,226,220,0.35)',
                    backgroundColor: '#061f33',
                    border: `1px solid ${errors.service ? 'rgba(248,101,179,0.5)' : 'rgba(216,226,220,0.12)'}`,
                    padding: '14px 16px', outline: 'none', width: '100%', cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(216,226,220,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="" disabled>Select a service...</option>
                  {SERVICES.map(s => <option key={s} value={s} style={{ backgroundColor: '#061f33' }}>{s}</option>)}
                </select>
              </div>

              {/* Date + Time row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Preferred Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    fontFamily: '"Space Mono", monospace', fontSize: '10px',
                    color: 'rgba(216,226,220,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date}
                    onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                    style={{
                      fontFamily: '"DM Sans", sans-serif', fontSize: '15px',
                      color: form.date ? '#D8E2DC' : 'rgba(216,226,220,0.35)',
                      backgroundColor: '#061f33',
                      border: '1px solid rgba(216,226,220,0.12)',
                      padding: '14px 16px', outline: 'none', width: '100%', boxSizing: 'border-box',
                      colorScheme: 'dark',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(156,246,246,0.4)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.12)'; }}
                  />
                </div>

                {/* Time Slot */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    fontFamily: '"Space Mono", monospace', fontSize: '10px',
                    color: errors.slot ? '#F865B3' : 'rgba(216,226,220,0.45)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    Time Slot *{errors.slot ? ` — ${errors.slot}` : ''}
                  </label>
                  <select
                    value={form.slot}
                    onChange={(e) => { setForm(f => ({ ...f, slot: e.target.value })); setErrors(er => ({ ...er, slot: '' })); }}
                    style={{
                      fontFamily: '"DM Sans", sans-serif', fontSize: '14px',
                      color: form.slot ? '#D8E2DC' : 'rgba(216,226,220,0.35)',
                      backgroundColor: '#061f33',
                      border: `1px solid ${errors.slot ? 'rgba(248,101,179,0.5)' : 'rgba(216,226,220,0.12)'}`,
                      padding: '14px 12px', outline: 'none', width: '100%', cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(216,226,220,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    <option value="" disabled>Pick a slot...</option>
                    {TIME_SLOTS.map(s => <option key={s} value={s} style={{ backgroundColor: '#061f33' }}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Optional message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{
                  fontFamily: '"Space Mono", monospace', fontSize: '10px',
                  color: 'rgba(216,226,220,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>Anything to add? (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly what you're looking to achieve..."
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    fontFamily: '"DM Sans", sans-serif', fontSize: '15px',
                    color: '#D8E2DC', backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(216,226,220,0.12)',
                    padding: '14px 16px', outline: 'none', width: '100%',
                    boxSizing: 'border-box', resize: 'vertical', minHeight: '90px',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(156,246,246,0.4)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.12)'; }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                  fontFamily: '"Space Mono", monospace', fontSize: '13px',
                  color: '#011627', backgroundColor: '#9CF6F6',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  border: 'none', padding: '18px 32px', cursor: 'pointer',
                  transition: 'all 0.3s ease', width: '100%',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F865B3'; e.currentTarget.style.boxShadow = '0 0 30px rgba(248,101,179,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#9CF6F6'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book via WhatsApp — Free
              </button>

              <p style={{
                fontFamily: '"Space Mono", monospace', fontSize: '10px',
                color: 'rgba(216,226,220,0.25)', letterSpacing: '0.05em',
                textAlign: 'center', lineHeight: 1.6,
              }}>
                This opens WhatsApp with your details pre-filled.<br />
                We'll confirm your slot within 2 hours during business hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
