'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, X, Check, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, setCartOpen } = useCartStore();
  const [inspectModalOpen, setInspectModalOpen] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addItem(product);
    setCartOpen(true);
    toast.success(`Acquired to Bag: ${product.name}`, {
      description: formatPrice(product.price),
    });
  };

  return (
    <>
      <div className="artwork-card group p-5 bg-[#ffffff] flex flex-col justify-between text-left relative">
        <div>
          {/* Artwork Image Frame - Clicking opens dedicated product page */}
          <Link
            href={`/product/${product.id}`}
            className="block relative aspect-[4/3] overflow-hidden mb-5 bg-[#f4efe6] cursor-pointer"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Subtle Provenance Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-[#161618]/90 text-[#f4efe6] text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Inspect Overlay Trigger */}
            <div className="absolute inset-0 bg-[#161618]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-[#ffffff] text-[#161618] text-xs font-medium uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                View Full Dossier
              </span>
            </div>
          </Link>

          {/* Artwork Details */}
          <div className="space-y-1.5 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c734b] block">
              {product.category}
            </span>
            <Link
              href={`/product/${product.id}`}
              className="font-serif text-xl sm:text-2xl text-[#161618] hover:text-[#8c734b] cursor-pointer transition-colors leading-tight line-clamp-1 block"
            >
              {product.name}
            </Link>
            <p className="text-xs text-[#73737c] font-light line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-4 border-t border-[#e8e3d8] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#73737c] block">
              Curated Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-[#161618]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#a1a1aa] line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-2.5 px-4 text-xs font-semibold"
            id={`add-bag-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Acquire</span>
          </button>
        </div>
      </div>

      {/* High-Resolution Inspection Modal (Google Arts & Culture style) */}
      <AnimatePresence>
        {inspectModalOpen && (
          <div key="inspect-modal-root" className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectModalOpen(false)}
              className="fixed inset-0 bg-[#161618]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#ffffff] border border-[#e8e3d8] shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#ffffff] border border-[#e8e3d8] flex items-center justify-center text-[#161618] hover:bg-[#161618] hover:text-[#ffffff] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Column */}
              <div className="md:w-1/2 relative aspect-square md:aspect-auto bg-[#f4efe6]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Information Column */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c734b] block mb-1">
                      {product.category} • Atelier Work
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#161618] font-normal leading-tight">
                      {product.name}
                    </h2>
                  </div>

                  <p className="text-sm text-[#4a4a50] font-light leading-relaxed">
                    {product.description}
                  </p>

                  <div className="space-y-2.5 py-4 border-y border-[#e8e3d8] text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#73737c]">Medium & Form:</span>
                      <span className="text-[#161618] font-medium">Reclaimed Hardwood & Optical Epoxy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#73737c]">Cure Time:</span>
                      <span className="text-[#161618] font-medium">72 Hours Exothermic Curing</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#73737c]">Provenance:</span>
                      <span className="text-[#161618] font-medium">Signed Certificate of Authenticity</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#73737c]">Delivery:</span>
                      <span className="text-emerald-700 font-medium">Complimentary Pan-India White Glove</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#73737c] uppercase tracking-wider">Curated Price</span>
                    <span className="font-serif text-2xl font-bold text-[#161618]">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart();
                      setInspectModalOpen(false);
                    }}
                    className="w-full btn-gallery-primary py-3.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Acquire Artwork ({formatPrice(product.price)})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
