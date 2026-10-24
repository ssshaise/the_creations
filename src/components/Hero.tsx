'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 'river-table',
    name: 'Azure River Table',
    description:
      'Handcrafted live-edge walnut paired with translucent cyan resin, sculpted into an heirloom dining centerpiece.',
    image: '/images/editorial-hero.jpg',
    link: '/product/river-table-azure',
  },
  {
    id: 'ocean-coasters',
    name: 'Ocean Wave Coasters',
    description:
      'Hand-poured marine resin capturing realistic ocean swells and surf, finished with 24K gold leaf accents.',
    image: '/images/products/coasters.jpg',
    link: '/product/ocean-coaster-set',
  },
  {
    id: 'geode-tray',
    name: 'Amethyst Geode Tray',
    description:
      'Raw purple amethyst crystals embedded in glass-clear resin on walnut, complete with solid brushed brass handles.',
    image: '/images/products/tray.jpg',
    link: '/product/geode-serving-tray',
  },
  {
    id: 'ocean-frame',
    name: 'Oceanic Depths Wall Art',
    description:
      'A three-dimensional ocean wave relief poured in multiple layers over 72 hours in a minimalist gallery frame.',
    image: '/images/products/frame.jpg',
    link: '/product/ocean-wall-art',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Automatically switch every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-[#faf8f5] border-b border-[#e8e3d8] overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text: Name & Body */}
          <div className="lg:col-span-5 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-5"
              >
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#8c734b]">
                  Handcrafted Resin Art
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#161618] leading-[1.1] font-normal">
                  {slide.name}
                </h1>

                <p className="text-base text-[#4a4a50] leading-relaxed max-w-md font-light">
                  {slide.description}
                </p>

                <div className="pt-2 flex items-center gap-5">
                  <Link
                    href={slide.link}
                    className="px-6 py-3.5 bg-[#161618] text-[#ffffff] text-xs font-medium uppercase tracking-[0.14em] hover:bg-[#8c734b] transition-colors inline-flex items-center gap-2"
                  >
                    <span>View Piece</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="#catalogue"
                    className="text-xs uppercase tracking-[0.14em] text-[#161618] hover:text-[#8c734b] font-medium transition-colors"
                  >
                    Explore Catalog
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Minimal Dots */}
            <div className="flex items-center gap-2 pt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === current ? 'w-7 bg-[#8c734b]' : 'w-2 bg-[#d4ccbd] hover:bg-[#8c734b]/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Picture */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] md:aspect-[16/10] overflow-hidden bg-[#ede7dc] border border-[#e8e3d8]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
