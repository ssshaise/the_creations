'use client';

import { testimonials } from '@/lib/data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="patrons" className="py-24 bg-[#f4efe6] border-b border-[#e8e3d8]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block">
            Patron Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
            Voices of Our Collectors
          </h2>
          <p className="text-sm text-[#4a4a50] font-light leading-relaxed">
            From modern Bangalore villas to heritage Mumbai penthouses, our works 
            anchor residences across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#ffffff] p-8 border border-[#e8e3d8] flex flex-col justify-between shadow-sm relative group"
            >
              <Quote className="w-8 h-8 text-[#d4ccbd] absolute top-6 right-6 opacity-40" />

              <div className="space-y-4 mb-6">
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#8c734b] font-semibold block">
                  {t.location || 'Verified Patron'}
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[#161618] leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#e8e3d8] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#161618]">
                    {t.name}
                  </h4>
                  <span className="text-[11px] text-[#73737c]">
                    Acquired {t.product}
                  </span>
                </div>
                <span className="text-xs text-[#8c734b]">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
