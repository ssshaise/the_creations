'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalogue" className="py-24 bg-[#faf8f5] border-b border-[#e8e3d8]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block">
            Acquisitions & Gallery Editions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
            The Curated Collection
          </h2>
          <p className="text-sm text-[#4a4a50] font-light leading-relaxed">
            Every work in our atelier is a certified 1-of-1 original. 
            Meticulously created with non-toxic, UV-stable resin and solid seasoned hardwood.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-14">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bespoke Commission Banner (Dessine Art style) */}
        <div className="mt-16 p-8 bg-[#f4efe6] border border-[#e8e3d8] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8c734b]">
              Bespoke Architectural Commissions
            </span>
            <h4 className="font-serif text-2xl text-[#161618]">
              Need a Custom Length Table or Specific Colour Palette?
            </h4>
            <p className="text-xs text-[#73737c] font-light leading-relaxed">
              We partner with homeowners, interior architects, and hospitality groups to create custom river tables up to 14 feet, custom geode wall installations, and tailored tableware suites.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-gallery-primary whitespace-nowrap"
          >
            <span>Commission a Custom Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
