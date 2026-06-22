import { useState } from 'react';
import { individualServicesConfig } from '../config';

const WHATSAPP = '27635590106';

const inputBase: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(216,226,220,0.04)',
  border: '1px solid rgba(216,226,220,0.12)',
  color: '#D8E2DC',
  fontFamily: '"Space Mono", monospace',
  fontSize: '12px',
  padding: '14px 16px',
  outline: 'none',
  transition: 'border-color 0.25s ease',
  borderRadius: '0',
  appearance: 'none',
  WebkitAppearance: 'none',
};

function FormInput({ label, name, type = 'text', required = false, value, placeholder, onChange }: {
  label: string; name: string; type?: string; required?: boolean;
  value: string; placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type={type} name={name} required={required} value={value} placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputBase, borderColor: focused ? 'rgba(156,246,246,0.45)' : 'rgba(216,226,220,0.12)' }}
      />
    </div>
  );
}

function FormSelect({ label, name, value, options, onChange }: {
  label: string; name: string; value: string; options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      <select
        name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...inputBase, cursor: 'pointer', borderColor: focused ? 'rgba(156,246,246,0.45)' : 'rgba(216,226,220,0.12)' }}
      >
        {options.map((o, i) => (
          <option key={o} value={i === 0 ? '' : o} style={{ backgroundColor: '#021e30' }}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hovering, setHovering] = useState(false);

  const serviceOptions = ['Select a service...', ...individualServicesConfig.categories.map(c => c.title), 'Custom / Multiple Services'];
  const budgetOptions = ['Select budget range...', 'Under R5,000', 'R5,000 – R15,000', 'R15,000 – R50,000', 'R50,000 – R100,000', 'R100,000+', 'Monthly Retainer'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hi OMEGAELZ Group! 👋`,
      ``,
      `*Name:* ${form.name}`,
      form.company ? `*Company:* ${form.company}` : '',
      form.service ? `*Service:* ${form.service}` : '',
      form.budget ? `*Budget:* ${form.budget}` : '',
      form.message ? `\n*Message:*\n${form.message}` : '',
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const contactDetails = [
    { label: 'WhatsApp', value: '+27 63 559 0106', href: `https://wa.me/${WHATSAPP}` },
    { label: 'Email', value: 'omegaelz@outlook.com', href: 'mailto:omegaelz@outlook.com' },
    { label: 'Based', value: 'South Africa — Global', href: undefined },
  ];

  return (
    <section id="contact" style={{ backgroundColor: '#02111e', position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
      <div style={{ position: 'absolute', top: '-300px', right: '-300px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,101,179,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(156,246,246,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div className="contact-layout">
          {/* Left Content */}
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#F865B3', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>
              GET IN TOUCH
            </p>
            <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(40px, 5vw, 70px)', fontWeight: 400, color: '#D8E2DC', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '32px' }}>
              Let's Build<br />
              <span style={{ color: '#F865B3' }}>Something</span><br />
              Extraordinary.
            </h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: 'rgba(216,226,220,0.5)', lineHeight: 1.7, maxWidth: '400px', marginBottom: '56px' }}>
              Fill in the form — we'll open WhatsApp with your enquiry pre-filled so you can send it instantly. No spam, ever.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '56px' }}>
              {contactDetails.map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: '#9CF6F6', letterSpacing: '0.1em', textTransform: 'uppercase', width: '72px', flexShrink: 0 }}>
                    {item.label}
                  </span>
                  <div style={{ height: '1px', width: '24px', backgroundColor: 'rgba(216,226,220,0.12)' }} />
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: 'rgba(216,226,220,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#9CF6F6')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(216,226,220,0.65)')}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: 'rgba(216,226,220,0.65)' }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { label: '24hr', sub: 'Response SLA' },
                { label: '100%', sub: 'Satisfaction' },
                { label: 'NDA', sub: 'On Request' },
              ].map(stat => (
                <div key={stat.label} style={{ padding: '20px 24px', border: '1px solid rgba(216,226,220,0.07)', flex: 1, textAlign: 'center' }}>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '22px', color: '#F865B3', letterSpacing: '-0.02em', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '9px', color: 'rgba(216,226,220,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="omega-glass" style={{ padding: 'clamp(32px, 4vw, 52px)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '26px', color: '#D8E2DC', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                  WhatsApp Opened!
                </h3>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '12px', color: 'rgba(216,226,220,0.45)', lineHeight: 1.7 }}>
                  Your message is pre-filled.<br />Just hit send on WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '28px', fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#F865B3', background: 'none', border: '1px solid rgba(248,101,179,0.3)', padding: '12px 28px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#F865B3'; e.currentTarget.style.backgroundColor = 'rgba(248,101,179,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,101,179,0.3)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#F865B3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Start a Conversation
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormInput label="Your Name *" name="name" required value={form.name} placeholder="John Smith" onChange={handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
                  <FormInput label="Company" name="company" value={form.company} placeholder="Acme Ltd." onChange={handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
                </div>

                <FormSelect label="Service Needed" name="service" value={form.service} options={serviceOptions} onChange={handleChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} />
                <FormSelect label="Budget Range" name="budget" value={form.budget} options={budgetOptions} onChange={handleChange as (e: React.ChangeEvent<HTMLSelectElement>) => void} />

                <div>
                  <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your project, goals, or challenges..."
                    rows={4}
                    style={{ ...inputBase, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(156,246,246,0.45)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(216,226,220,0.12)'; }}
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  style={{
                    fontFamily: '"Space Mono", monospace', fontSize: '13px', fontWeight: 400,
                    color: '#011627', backgroundColor: hovering ? '#1ebe5d' : '#25D366',
                    border: 'none', padding: '18px 32px', cursor: 'pointer',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: hovering ? '0 0 40px rgba(37,211,102,0.35)' : '0 0 20px rgba(37,211,102,0.15)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send via WhatsApp
                </button>

                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '10px', color: 'rgba(216,226,220,0.2)', textAlign: 'center', lineHeight: 1.7 }}>
                  No spam. We respond within 24 business hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
