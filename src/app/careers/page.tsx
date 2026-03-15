import type { Metadata } from 'next';
import { Button } from '@/components/atoms/Button';
import { MonoLabel } from '@/components/atoms/MonoLabel';
import { ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Careers Page
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Sole Syndicate. We are looking for top-tier talent to build the future of authenticated commerce.',
  openGraph: {
    title: 'Careers | Sole Syndicate',
  },
};

const openPositions = [
  {
    role: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote / NYC',
    type: 'Full-time',
    description: 'Lead the visual and UX direction of the core marketplace and vault experiences. Must possess an obsessive detail-oriented mindset.',
  },
  {
    role: 'Frontend Engineer (Next.js/React)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Architect performant, accessible, and highly-animated e-commerce interfaces using App Router and Framer Motion.',
  },
  {
    role: 'Authentication Specialist',
    department: 'Operations',
    location: 'NYC Verification Center',
    type: 'Full-time',
    description: 'Physically inspect high-value inventory. Extensive knowledge of Nike, Jordan, and designer manufacturing flaws required.',
  },
  {
    role: 'Community Manager',
    department: 'Marketing',
    location: 'Remote / Los Angeles',
    type: 'Full-time',
    description: 'Grow and nurture the Syndicate tier membership. Coordinate private events and curate drops.',
  },
];

export default function CareersPage() {
  return (
    <main id="main-content" className="min-h-screen bg-void pt-32 pb-24">
      {/* Container: max-w-6xl */}
      <div className="max-w-6xl mx-auto px-md md:px-xl">
        
        {/* ── Careers Hero ── */}
        <section className="mb-24 flex flex-col items-center text-center">
          <MonoLabel className="text-gold tracking-widest uppercase mb-sm">Careers</MonoLabel>
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-md tracking-tight">
            Build the <span className="text-secondary italic font-serif">Future.</span>
          </h1>
          <p className="max-w-3xl text-secondary text-lg leading-relaxed">
            We are a collective of designers, engineers, and sneaker historians building 
            the most trusted destination for global collectors. We operate at the intersection 
            of luxury retail and extreme technical craft.
          </p>
        </section>

        {/* ── Open Positions ── */}
        <section>
          <div className="flex items-end justify-between border-b border-border pb-lg mb-xl">
            <h2 className="font-display text-3xl text-primary">Open Positions</h2>
            <MonoLabel muted>{openPositions.length} Roles</MonoLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {openPositions.map((job) => (
              <div key={job.role} className="flex flex-col bg-surface border border-border p-xl group hover:border-gold/50 transition-colors duration-normal">
                {/* Metaline */}
                <div className="flex items-center gap-sm mb-lg flex-wrap">
                  <span className="px-3 py-1 bg-void border border-border text-xs font-mono text-primary rounded-sm uppercase tracking-wider">{job.department}</span>
                  <span className="font-mono text-xs text-muted">{job.location} &bull; {job.type}</span>
                </div>
                
                {/* Title & Desc */}
                <h3 className="font-sans font-bold text-2xl text-primary mb-sm">{job.role}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-xl flex-1">
                  {job.description}
                </p>
                
                {/* Apply Button Action Row */}
                <div className="mt-auto pt-lg border-t border-border/50 flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="group-hover:text-gold transition-colors">
                    Apply Now
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── General Application ── */}
        <section className="mt-24 p-2xl bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-xl text-center md:text-left">
          <div>
            <h3 className="font-display text-2xl text-primary mb-xs">Do not see a fit?</h3>
            <p className="text-secondary max-w-lg">We are always looking for exceptional talent. Submit an open application and we will keep you in mind for future roles.</p>
          </div>
          <Button variant="gold" size="lg" className="shrink-0 h-[56px]">Submit Portfolio</Button>
        </section>

      </div>
    </main>
  );
}
