import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export type LegalDoc = 'privacy' | 'terms' | 'nda';

interface Props {
  doc: LegalDoc;
  onClose: () => void;
}

const CONTENT: Record<LegalDoc, { title: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'POPIA Compliance Statement',
        body: 'OMEGAELZ Group is committed to protecting your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). This policy explains how we collect, use, store, and protect your personal information, and outlines your rights as a data subject under South African law.',
      },
      {
        heading: '1. Responsible Party & Information Officer',
        body: 'The responsible party for your personal information is OMEGAELZ Group, based in South Africa. Our designated Information Officer is contactable at omegaelz@outlook.com or +27 63 559 0106. You may direct all privacy-related requests, complaints, or queries to this contact.',
      },
      {
        heading: '2. Personal Information We Collect',
        body: 'We collect personal information that you voluntarily provide, including: full name, email address, phone number, business name and industry, project details and requirements, and any other information submitted via inquiry forms, email, or WhatsApp. We do not collect sensitive personal information (as defined in POPIA) unless explicitly required and consented to for a specific service.',
      },
      {
        heading: '3. Purpose of Processing',
        body: 'Your personal information is processed for the following lawful purposes only: (a) to respond to your inquiry or consultation request; (b) to prepare and deliver project proposals; (c) to provide contracted services; (d) to send project-related communications and updates; (e) to comply with legal obligations. We will not process your information for any purpose incompatible with the above without your prior consent.',
      },
      {
        heading: '4. Lawful Basis for Processing',
        body: 'We process your personal information on the following grounds under POPIA: (a) Consent — where you have provided explicit consent; (b) Contractual necessity — where processing is required to fulfil a service agreement; (c) Legitimate interest — where processing is reasonably necessary for our business operations and does not override your rights; (d) Legal obligation — where we are required by law to process the information.',
      },
      {
        heading: '5. Data Retention',
        body: 'We retain your personal information for the duration of our engagement and for a maximum of 36 months thereafter, unless a longer retention period is required by law or you request earlier deletion. Client project files are retained for 5 years to comply with applicable commercial and tax obligations. Once the retention period expires, data is securely deleted or anonymised.',
      },
      {
        heading: '6. Data Storage & Security',
        body: 'Your information is stored on secured servers using industry-standard encryption (TLS/SSL). Access is restricted to authorised OMEGAELZ personnel directly involved in your project. We implement reasonable technical and organisational measures to prevent unauthorised access, loss, or disclosure of your data. In the event of a data breach that poses a risk to your rights, we will notify you and the Information Regulator as required by POPIA.',
      },
      {
        heading: '7. Third-Party Operators',
        body: 'We may share your personal information with trusted third-party operators only to the extent necessary to deliver our services. These include: email and communication platforms (e.g. Microsoft Outlook), WhatsApp Business (Meta), Google Analytics (anonymised usage data), and cloud hosting providers. All operators are contractually required to process your data only on our instructions and in accordance with POPIA. We do not sell, rent, or trade your personal information.',
      },
      {
        heading: '8. Trans-Border Transfers',
        body: 'Some of our third-party tools (e.g. Google, Meta/WhatsApp) may process data outside South Africa. Where this occurs, we ensure that the recipient country or organisation offers an adequate level of data protection comparable to POPIA, or that appropriate contractual safeguards are in place.',
      },
      {
        heading: '9. Your Rights as a Data Subject',
        body: 'Under POPIA, you have the following rights: (a) Right to access — request a copy of the personal information we hold about you; (b) Right to correction — request correction of inaccurate or outdated information; (c) Right to deletion — request erasure of your personal information, subject to legal retention requirements; (d) Right to object — object to processing based on legitimate interest; (e) Right to withdraw consent — withdraw consent at any time without affecting prior lawful processing; (f) Right to complain — lodge a complaint with the Information Regulator of South Africa. To exercise any of these rights, contact us at omegaelz@outlook.com.',
      },
      {
        heading: '10. Cookies & Website Analytics',
        body: 'Our website uses Google Analytics to collect anonymised, aggregated data about how visitors use our site (e.g. pages visited, session duration). No personally identifiable information is collected through analytics. You may disable cookies through your browser settings at any time without affecting your ability to use our site.',
      },
      {
        heading: '11. Contact the Information Regulator',
        body: 'If you believe we have handled your personal information unlawfully or your complaint has not been resolved satisfactorily, you have the right to lodge a complaint with the Information Regulator of South Africa: Website: inforegulator.org.za | Email: inforeg@justice.gov.za | Tel: 010 023 5207.',
      },
      {
        heading: '12. Policy Updates',
        body: 'This Privacy Policy may be updated periodically to reflect changes in our practices or applicable law. The current version will always be available on our website. Material changes will be communicated directly to active clients. Your continued use of our services after any update constitutes acceptance of the revised policy.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: '1. Services & Scope',
        body: 'OMEGAELZ Group provides digital agency services including web development, AI automation, CRM systems, digital marketing, branding, data analytics, and social media management. The scope of each engagement is defined in a written project proposal accepted by the client.',
      },
      {
        heading: '2. Payment Terms',
        body: 'A 50% deposit is required before project commencement. The remaining balance is due upon project completion and prior to final delivery. All prices are in South African Rand (ZAR) and are exclusive of VAT where applicable. Late payments incur a 5% monthly surcharge.',
      },
      {
        heading: '3. Revisions & Change Requests',
        body: 'Each package includes a defined number of revision rounds as specified in your proposal. Additional revisions beyond the agreed scope are billed at R650/hour. Change requests that alter project scope must be agreed upon in writing.',
      },
      {
        heading: '4. Intellectual Property',
        body: 'Upon receipt of full payment, all deliverables become the intellectual property of the client. OMEGAELZ Group retains the right to display completed work in its portfolio unless otherwise agreed in writing.',
      },
      {
        heading: '5. Timelines & Delivery',
        body: 'Estimated delivery timelines are provided in good faith. Delays caused by late client feedback, content provision, or approval constitute a client-side delay and may extend the timeline. OMEGAELZ Group will communicate any delays proactively.',
      },
      {
        heading: '6. Limitation of Liability',
        body: 'OMEGAELZ Group\'s total liability for any claim shall not exceed the total project fee paid by the client. We are not liable for indirect, consequential, or incidental damages arising from the use or inability to use delivered services.',
      },
      {
        heading: '7. Termination',
        body: 'Either party may terminate the engagement with 14 days written notice. In the event of client termination, fees for all work completed to date are payable in full. OMEGAELZ Group may terminate immediately for non-payment.',
      },
      {
        heading: '8. Governing Law',
        body: 'These terms are governed by the laws of the Republic of South Africa. Disputes shall first be attempted through mediation before escalation to the appropriate South African court of jurisdiction.',
      },
    ],
  },
  nda: {
    title: 'Non-Disclosure Agreement',
    sections: [
      {
        heading: 'Overview',
        body: 'OMEGAELZ Group takes client confidentiality seriously. We offer a mutual Non-Disclosure Agreement (NDA) for all engagements involving sensitive business information, proprietary systems, or competitive intelligence.',
      },
      {
        heading: 'What We Protect',
        body: 'Under a signed NDA, OMEGAELZ Group agrees to hold in strict confidence all proprietary information, business data, trade secrets, customer lists, financial projections, product roadmaps, and any other information identified as confidential by the disclosing party.',
      },
      {
        heading: 'Our Obligations',
        body: 'We will not disclose, copy, or use confidential information for any purpose outside the agreed project scope. Access is restricted to team members directly involved in your project, each bound by internal confidentiality obligations.',
      },
      {
        heading: 'Duration',
        body: 'Confidentiality obligations remain in force for 3 years from the date of signing, or for the duration of the engagement plus 2 years — whichever is longer — unless the information enters the public domain through no fault of ours.',
      },
      {
        heading: 'Requesting a Signed NDA',
        body: 'We are happy to sign an NDA before any detailed project discussion. Contact us via email at omegaelz@outlook.com or WhatsApp at +27 63 559 0106 and we will have a document ready within 24 hours.',
      },
      {
        heading: 'Mutual Agreement',
        body: 'Our standard NDA is mutual — OMEGAELZ Group\'s proprietary processes, methodologies, and tooling disclosed during the engagement are equally protected under the agreement.',
      },
    ],
  },
};

export default function LegalModal({ doc, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const content = CONTENT[doc];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(panel, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }
    gsap.to(panel, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(1,22,39,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        opacity: 0,
      }}
    >
      <div
        ref={panelRef}
        style={{
          backgroundColor: '#061f33',
          border: '1px solid rgba(216,226,220,0.1)',
          width: '100%', maxWidth: '720px',
          maxHeight: '85vh',
          display: 'flex', flexDirection: 'column',
          opacity: 0,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '28px 32px',
          borderBottom: '1px solid rgba(216,226,220,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <p style={{
              fontFamily: '"Space Mono", monospace', fontSize: '10px',
              color: '#F865B3', letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              OMEGAELZ Group — Legal
            </p>
            <h2 style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: '24px',
              fontWeight: 400, color: '#D8E2DC', letterSpacing: '-0.01em',
            }}>
              {content.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: '40px', height: '40px',
              border: '1px solid rgba(216,226,220,0.12)',
              backgroundColor: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(248,101,179,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(216,226,220,0.12)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1" y1="1" x2="11" y2="11" stroke="rgba(216,226,220,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="11" y1="1" x2="1" y2="11" stroke="rgba(216,226,220,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '32px', flex: 1 }}>
          {content.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontFamily: '"Space Mono", monospace', fontSize: '12px',
                color: '#9CF6F6', letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                {section.heading}
              </h3>
              <p style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: '14px',
                lineHeight: 1.8, color: 'rgba(216,226,220,0.6)',
              }}>
                {section.body}
              </p>
            </div>
          ))}
          {/* Last updated */}
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '10px',
            color: 'rgba(216,226,220,0.2)', letterSpacing: '0.04em',
            borderTop: '1px solid rgba(216,226,220,0.06)', paddingTop: '24px',
          }}>
            Last updated: June 2026 — omegaelz@outlook.com
          </p>
        </div>
      </div>
    </div>
  );
}
