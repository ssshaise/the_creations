'use client';

import Image from 'next/image';
import { Layers, Droplets, Sparkles, ShieldCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Ethical Hardwood Provenance',
    description: 'We source naturally fallen Indian teak and live-edge walnut, kiln-drying each slab to under 8% moisture to prevent warping across decades.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Multi-Depth Pigment Formulation',
    description: 'Custom mineral micas, alcohol pigments, and deep sea blues are suspended in multiple transparent pours over 72 hours to create authentic ocean depth.',
    icon: Droplets,
  },
  {
    number: '03',
    title: 'Optical Micro-Degassing',
    description: 'Each pour undergoes vacuum chamber degassing to eliminate microscopic air pockets, ensuring diamond-clear glass translucency.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Lapidary Hand-Lapping to 5,000 Grit',
    description: 'Artisans wet-sand every surface through nine successive grit grades, sealing the piece in food-safe, organic botanical hardwax oils.',
    icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <section id="craftsmanship" className="py-24 bg-[#faf8f5] border-b border-[#e8e3d8]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Studio Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#d4ccbd] shadow-lg bg-[#f4efe6]">
              <Image
                src="/images/artisan-process.jpg"
                alt="Artisan studio pouring resin in workshop"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Museum Quote Box */}
            <div className="mt-4 p-5 bg-[#ffffff] border border-[#e8e3d8] shadow-sm text-left">
              <span className="font-serif italic text-base text-[#161618] block leading-snug">
                “In resin art, patience is everything. You cannot rush the thermal bond between timber and liquid glass.”
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#8c734b] font-semibold mt-2 block">
                — Master Artisan, The Creations Studio
              </span>
            </div>
          </div>

          {/* Right: The 4 Steps */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block mb-2">
                The Atelier Chronicle
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
                The Alchemy of Wood & Resin
              </h2>
              <p className="text-sm text-[#4a4a50] font-light mt-3 leading-relaxed">
                Unlike mass-produced synthetic furniture, our works marry ancient wood grain with
                contemporary optical chemistry. We craft heirloom pieces designed to outlast lifetimes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#e8e3d8]">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="p-5 bg-[#ffffff] border border-[#e8e3d8] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-normal text-[#8c734b]">
                        {step.number}
                      </span>
                      <Icon className="w-4 h-4 text-[#73737c]" />
                    </div>
                    <h4 className="font-serif text-lg text-[#161618]">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#73737c] font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
