'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useInquiryStore } from '@/lib/store';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { openInquiry } = useInquiryStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('You are subscribed to Private Atelier Previews.');
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#141416] text-[#f4efe6] pt-20 pb-12 border-t border-[#2a2a2e]">
      <div className="container-custom">
        {/* Newsletter & Atelier Invitation */}
        <div className="pb-16 border-b border-[#2a2a2e] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b89c6c]">
              Private Atelier Gazette
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#ffffff] font-normal">
              Invitations to Limited Studio Releases
            </h3>
            <p className="text-xs text-[#a1a1aa] font-light max-w-lg leading-relaxed">
              We release fewer than thirty original resin & hardwood creations each quarter.
              Subscribers receive 48-hour advance access before public exhibition.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email address"
                required
                className="flex-1 bg-[#1c1c1f] border border-[#333338] px-4 py-3 text-xs text-[#ffffff] placeholder-[#71717a] focus:outline-none focus:border-[#b89c6c]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#b89c6c] hover:bg-[#cfb484] text-[#141416] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* 4-Column Navigation */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left border-b border-[#2a2a2e]">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-[#ffffff] tracking-tight">
                The Creations
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#b89c6c] uppercase font-semibold">
                Atelier & Resin Gallery
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
              Preserving ancient live-edge timber within architectural optical resin.
              Handcrafted in Lucknow for collectors across India.
            </p>
            <div className="pt-2 text-xs text-[#b89c6c] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b89c6c]" />
              <span>Certified Authenticity Guaranteed</span>
            </div>
          </div>

          {/* Column 2: The Collections */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffffff]">
              Curated Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa] font-light">
              <li><a href="#catalogue" className="hover:text-[#ffffff] transition-colors">River Dining & Conference Tables</a></li>
              <li><a href="#catalogue" className="hover:text-[#ffffff] transition-colors">Oceanic Wall Art Panels</a></li>
              <li><a href="#catalogue" className="hover:text-[#ffffff] transition-colors">Geode & Mineral Serving Trays</a></li>
              <li><a href="#catalogue" className="hover:text-[#ffffff] transition-colors">24k Gold Flecked Coaster Suites</a></li>
              <li><a href="#catalogue" className="hover:text-[#ffffff] transition-colors">Crystalline Mountain Sculptures</a></li>
            </ul>
          </div>

          {/* Column 3: Atelier Provenance */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffffff]">
              Atelier Provenance
            </h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa] font-light">
              <li><a href="#craftsmanship" className="hover:text-[#ffffff] transition-colors">The 7-Day Curing Discipline</a></li>
              <li><a href="#craftsmanship" className="hover:text-[#ffffff] transition-colors">Ethical Hardwood Sourcing</a></li>
              <li><a href="#visualizer" className="hover:text-[#ffffff] transition-colors">In-Situ Architectural Preview</a></li>
              <li><a href="#patrons" className="hover:text-[#ffffff] transition-colors">Collector & Architect Testimonials</a></li>
              <li><a href="#catalogue" className="hover:text-[#ffffff] transition-colors">Commission a Bespoke Work</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Salons */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ffffff]">
              Studio Salons
            </h4>
            <div className="space-y-2 text-xs text-[#a1a1aa] font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b89c6c] flex-shrink-0 mt-0.5" />
                <span>Lucknow, Uttar Pradesh, 226030</span>
              </p>
              <p className="flex items-center gap-2 pt-2">
                <Mail className="w-3.5 h-3.5 text-[#b89c6c]" />
                <span className="text-[#ffffff]">thecreationsorg@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b89c6c]" />
                <span>+91 9555052529</span>
              </p>

              <button
                type="button"
                onClick={() => openInquiry('Custom Atelier Commission Inquiry')}
                className="mt-3 w-full py-2.5 px-3 bg-[#1e1e22] hover:bg-[#b89c6c] hover:text-[#141416] text-[#f4efe6] text-[11px] font-semibold uppercase tracking-wider transition-colors border border-[#2a2a2e] flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <p>© 2026 The Creations Atelier & Gallery. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <span>White-Glove Pan-India</span>
            <span>•</span>
            <span>Razorpay Secure</span>
            <span>•</span>
            <span>UPI & Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
