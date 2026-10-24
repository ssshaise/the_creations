'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShoppingBag, Check, Sparkles, Maximize2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function RoomVisualizer() {
  const [activeScene, setActiveScene] = useState<'wall' | 'table'>('wall');
  const [hotspotOpen, setHotspotOpen] = useState(true);
  const { addItem, setCartOpen } = useCartStore();

  const wallArtProduct = products.find((p) => p.id === 'frame-1') || products[3];
  const tableProduct = products.find((p) => p.id === 'table-1') || products[0];

  const currentProduct = activeScene === 'wall' ? wallArtProduct : tableProduct;

  const handleAddCurrent = () => {
    addItem(currentProduct);
    setCartOpen(true);
    toast.success(`Added ${currentProduct.name} to your collection.`);
  };

  return (
    <section id="visualizer" className="py-24 bg-[#f4efe6] border-b border-[#e8e3d8]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block">
            Architectural In-Situ Preview
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
            Art in Architectural Dialogue
          </h2>
          <p className="text-sm text-[#4a4a50] font-light leading-relaxed">
            Experience how natural daylight, textured limewash, and warm woodwork activate 
            the optical depth of our resin creations.
          </p>
        </div>

        {/* Scene Toggle Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#ffffff] border border-[#e8e3d8] rounded-full shadow-sm">
            <button
              onClick={() => setActiveScene('wall')}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeScene === 'wall'
                  ? 'bg-[#161618] text-[#ffffff] shadow-sm'
                  : 'text-[#4a4a50] hover:text-[#161618]'
              }`}
            >
              Gallery Wall Installation
            </button>
            <button
              onClick={() => setActiveScene('table')}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeScene === 'table'
                  ? 'bg-[#161618] text-[#ffffff] shadow-sm'
                  : 'text-[#4a4a50] hover:text-[#161618]'
              }`}
            >
              Living & Dining Setting
            </button>
          </div>
        </div>

        {/* Visualizer Display Box */}
        <div className="relative aspect-[16/9] max-h-[640px] w-full bg-[#161618] border border-[#d4ccbd] overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
            >
              <Image
                src={
                  activeScene === 'wall'
                    ? '/images/room-visualizer.jpg'
                    : '/images/editorial-hero.jpg'
                }
                alt="Room setting preview"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hotspot Pulse Button */}
          <div
            className={`absolute z-20 cursor-pointer ${
              activeScene === 'wall'
                ? 'top-[42%] left-[49%]'
                : 'top-[65%] left-[50%]'
            } -translate-x-1/2 -translate-y-1/2`}
          >
            <button
              onClick={() => setHotspotOpen(!hotspotOpen)}
              className="relative w-10 h-10 rounded-full bg-[#161618]/90 text-[#ffffff] border border-[#b89c6c] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              title="Inspect piece details"
            >
              <span className="absolute inset-0 rounded-full bg-[#b89c6c]/30 animate-ping" />
              <Eye className="w-4 h-4 relative z-10" />
            </button>

            {/* Hotspot Popover Card */}
            <AnimatePresence>
              {hotspotOpen && (
                <motion.div
                  key="hotspot-card"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 w-72 sm:w-80 p-5 bg-[#ffffff] border border-[#e8e3d8] shadow-2xl z-30 text-left"
                >
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#8c734b] font-semibold block mb-1">
                    Inspected Artwork
                  </span>
                  <h4 className="font-serif text-xl text-[#161618] leading-tight mb-1">
                    {currentProduct.name}
                  </h4>
                  <p className="text-xs text-[#73737c] mb-3 leading-relaxed">
                    {currentProduct.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs py-2 border-y border-[#e8e3d8] mb-3">
                    <span className="text-[#73737c]">Curated Price</span>
                    <span className="font-serif text-base font-semibold text-[#161618]">
                      {formatPrice(currentProduct.price)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddCurrent}
                    className="w-full btn-gallery-primary py-2.5 text-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Acquire This Work
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar Details */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <span className="bg-[#161618]/80 backdrop-blur-md px-3 py-1.5 text-[11px] text-[#f4efe6] tracking-wider uppercase">
              {activeScene === 'wall'
                ? 'Setting: Minimalist Limewash Gallery Hallway'
                : 'Setting: Scandinavian Natural Light Residence'}
            </span>
            <span className="hidden sm:inline-block bg-[#ffffff]/90 px-3 py-1.5 text-[11px] text-[#161618] font-medium tracking-wider uppercase border border-[#e8e3d8]">
              Tap Pin to Inspect Details
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
