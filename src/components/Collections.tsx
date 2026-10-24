'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    category: 'tables',
    title: 'River Tables & Desks',
    tagline: 'Centrepiece Hardwood Works',
    description: 'Centuries-old live-edge walnut and teak fused with custom turquoise and midnight blue pigments.',
    image: '/images/products/river-table.jpg',
    aspect: 'aspect-[4/3] lg:aspect-[16/10]',
  },
  {
    category: 'frames',
    title: 'Oceanic Wall Art Panels',
    tagline: 'Multi-Depth Gallery Works',
    description: 'Dynamic translucent ocean waves hand-poured in up to 7 distinct resin layers with real sea spray texture.',
    image: '/images/products/frame.jpg',
    aspect: 'aspect-[4/3] lg:aspect-[1/1]',
  },
  {
    category: 'trays',
    title: 'Geode Serving Trays',
    tagline: 'Crystalline Functional Art',
    description: 'Amethyst and quartz geode formations rendered in metallic micas with brushed brass handles.',
    image: '/images/products/tray.jpg',
    aspect: 'aspect-[4/3] lg:aspect-[1/1]',
  },
  {
    category: 'coasters',
    title: 'Ocean Coaster Suites',
    tagline: 'Miniature Wave Sculptures',
    description: 'Sets of 4 and 6 hand-poured coasters featuring real 24k gold leaf flakes and waterproof heat resistance.',
    image: '/images/products/coasters.jpg',
    aspect: 'aspect-[4/3] lg:aspect-[1/1]',
  },
  {
    category: 'showpieces',
    title: 'Encased Mountain Sculptures',
    tagline: 'Collectors Kinetic Artefacts',
    description: 'Micro-landscapes of miniature moss and slate encased in diamond-polished clear optical resin.',
    image: '/images/products/showpiece.jpg',
    aspect: 'aspect-[4/3] lg:aspect-[1/1]',
  },
];

export default function Collections() {
  return (
    <section id="collections" className="py-24 bg-[#faf8f5] border-b border-[#e8e3d8]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#e8e3d8] gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block mb-2">
              Curated Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
              Explore by Form & Medium
            </h2>
          </div>
          <p className="text-sm text-[#4a4a50] max-w-md font-light leading-relaxed">
            Every creation is born from a rigorous 7-day slow curing regimen, 
            blending raw nature with archival-grade European polymers.
          </p>
        </div>

        {/* Featured Large Hero Card + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Large Table Card */}
          <div className="lg:col-span-7">
            <div className="artwork-card group p-6 sm:p-8 flex flex-col justify-between h-full bg-[#ffffff]">
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-[#f4efe6]">
                <Image
                  src={collections[0].image}
                  alt={collections[0].title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8c734b]">
                  {collections[0].tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#161618]">
                  {collections[0].title}
                </h3>
                <p className="text-sm text-[#4a4a50] font-light leading-relaxed">
                  {collections[0].description}
                </p>
                <div className="pt-4">
                  <a
                    href="#catalogue"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#161618] group-hover:text-[#8c734b] transition-colors"
                  >
                    View Studio River Tables
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Small Grid Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {collections.slice(1).map((item, idx) => (
              <div
                key={idx}
                className="artwork-card group p-5 bg-[#ffffff] flex flex-col justify-between"
              >
                <div className="relative aspect-[1/1] overflow-hidden mb-4 bg-[#f4efe6]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8c734b] block">
                    {item.tagline}
                  </span>
                  <h4 className="font-serif text-lg text-[#161618] leading-snug">
                    {item.title}
                  </h4>
                  <a
                    href="#catalogue"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#161618] pt-2 group-hover:text-[#8c734b] transition-colors"
                  >
                    Explore
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
