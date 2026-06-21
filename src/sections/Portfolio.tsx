import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: 'Exilite',
    category: 'Business Services',
    services: ['Business Admin', 'AI Automation'],
    description: 'End-to-end automation of Exilite\'s business administration workflows — eliminating manual tasks, streamlining reporting, and deploying AI tools that run core operations around the clock.',
    results: [
      { label: 'Admin Time Saved', value: '−70%' },
      { label: 'Workflows Automated', value: '8+' },
      { label: 'Operational Cost', value: '↓ Reduced' },
    ],
    color: '#F865B3',
    tags: ['AI Automation', 'Business Admin', 'Workflow Design'],
    year: '2024',
  },
  {
    id: '02',
    name: 'Chibuwe Construction',
    category: 'Construction',
    services: ['Web Development'],
    description: 'Professional website built to showcase Chibuwe Construction\'s project portfolio, services, and credibility — designed for trust, built to generate inbound leads from clients and contractors.',
    results: [
      { label: 'Delivery Time', value: '2 Weeks' },
      { label: 'Mobile Optimised', value: '100%' },
      { label: 'Lead Gen', value: 'Active' },
    ],
    color: '#9CF6F6',
    tags: ['Web Development', 'UI/UX', 'Responsive Design'],
    year: '2024',
  },
  {
    id: '03',
    name: 'Brainsensory',
    category: 'Media & Tech',
    services: ['Web Development', 'Social Media'],
    description: 'Built a modern, high-performance website for Brainsensory and took over their full social media presence — consistent content strategy driving monthly audience growth across platforms.',
    results: [
      { label: 'Platforms Managed', value: '3+' },
      { label: 'Monthly Growth', value: 'Consistent' },
      { label: 'Content Output', value: 'Weekly' },
    ],
    color: '#F865B3',
    tags: ['Web Dev', 'Social Media', 'Content Strategy'],
    year: '2025',
  },
  {
    id: '04',
    name: 'Muhuyu Holdings',
    category: 'Holdings & Investment',
    services: ['Web Development'],
    description: 'Corporate website built to reflect Muhuyu Holdings\' market authority — clean architecture, sharp copy, and a professional presence that opens doors with partners and investors.',
    results: [
      { label: 'Brand Positioning', value: 'Premium' },
      { label: 'Delivery Time', value: 'On Time' },
      { label: 'Mobile Score', value: '95+' },
    ],
    color: '#9CF6F6',
    tags: ['Web Development', 'Corporate Design', 'Responsive'],
    year: '2025',
  },
  {
    id: '05',
    name: 'Beast Initiative',
    category: 'International Client',
    services: ['Social Media', 'AI Content'],
    description: 'Managed Beast Initiative\'s social media presence and produced AI-powered content at scale — crafted to resonate across international audiences and drive engagement beyond borders.',
    results: [
      { label: 'Client Location', value: 'Global' },
      { label: 'Content Type', value: 'AI-Generated' },
      { label: 'Engagement', value: 'Growing' },
    ],
    color: '#F865B3',
    tags: ['Social Media', 'AI Content', 'International'],
    year: '2025',
  },
];

const PLACEHOLDER_COLORS = [
  'linear-gradient(135deg, #0a2540 0%, #0e3a5c 50%, #0a2540 100%)',
  'linear-gradient(135deg, #1a0a2e 0%, #2d1054 50%, #1a0a2e 100%)',
  'linear-gradient(135deg, #0a1f0a 0%, #0e3a1e 50%, #0a1f0a 100%)',
  'linear-gradient(135deg, #2a0a18 0%, #4a1030 50%, #2a0a18 100%)',
  'linear-gradient(135deg, #0a1a2e 0%, #103050 50%, #0a1a2e 100%)',
  'linear-gradient(135deg, #1a1a0a 0%, #2e2a0e 50%, #1a1a0a 100%)',
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: (index % 3) * 0.12,
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#061f33',
        border: `1px solid ${hovered ? project.color + '50' : 'rgba(216,226,220,0.07)'}`,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}20` : '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Visual placeholder */}
      <div style={{
        height: '200px',
        background: PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />
        {/* Center icon */}
        <div style={{
          width: '64px', height: '64px',
          border: `1px solid ${project.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          transition: 'border-color 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'scale(1.1) rotate(45deg)' : 'rotate(45deg)',
        }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '18px',
            fontWeight: 700,
            color: project.color,
            transform: 'rotate(-45deg)',
            letterSpacing: '-0.02em',
          }}>
            {project.id}
          </div>
        </div>
        {/* Year badge */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          fontFamily: '"Space Mono", monospace', fontSize: '10px',
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
        }}>
          {project.year}
        </div>
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          fontFamily: '"Space Mono", monospace', fontSize: '10px',
          color: project.color, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          backgroundColor: `${project.color}15`,
          padding: '4px 10px',
          border: `1px solid ${project.color}30`,
        }}>
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px' }}>
        <h3 style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '22px', fontWeight: 400,
          color: '#D8E2DC', marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '13px', lineHeight: 1.7,
          color: 'rgba(216,226,220,0.5)',
          marginBottom: '20px',
        }}>
          {project.description}
        </p>

        {/* Services */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {project.services.map((s) => (
            <span key={s} style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '9px', letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'rgba(216,226,220,0.35)',
              border: '1px solid rgba(216,226,220,0.1)',
              padding: '3px 8px',
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Results */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: 'rgba(216,226,220,0.06)',
          borderTop: '1px solid rgba(216,226,220,0.06)',
          marginTop: '4px',
        }}>
          {project.results.map((r, i) => (
            <div key={i} style={{
              padding: '14px 12px',
              backgroundColor: '#061f33',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '18px', fontWeight: 500,
                color: project.color,
                letterSpacing: '-0.02em', marginBottom: '4px',
              }}>
                {r.value}
              </p>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '9px', letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(216,226,220,0.3)',
              }}>
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
  }, []);

  return (
    <section id="portfolio" style={{ backgroundColor: '#011627', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: '80px' }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px',
            color: '#F865B3', letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            06 / Portfolio
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 400, color: '#D8E2DC',
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              Work that<br />
              <span style={{ color: '#9CF6F6' }}>speaks results.</span>
            </h2>
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '15px', lineHeight: 1.7,
              color: 'rgba(216,226,220,0.45)',
              maxWidth: '360px',
            }}>
              Real projects. Real clients. Measurable outcomes — across industries, sizes, and budgets.
            </p>
          </div>
          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(216,226,220,0.07)', marginTop: '48px' }} />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: '11px',
            color: 'rgba(216,226,220,0.2)', letterSpacing: '0.06em',
          }}>
            Real clients. Real work. More projects available — reach out to learn more.
          </p>
        </div>
      </div>
    </section>
  );
}
