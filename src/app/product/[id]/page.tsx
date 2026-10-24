'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  Layers,
  Ruler,
  Clock,
  Compass,
  Star,
  Plus,
  Minus,
  Maximize2,
  Info,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { products, type Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCartStore, useThemeStore } from '@/lib/store';
import { toast } from 'sonner';

// Client-only components
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });
const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = products.find((p) => p.id === productId) || products[0];
  const { addItem, setCartOpen } = useCartStore();
  const { theme } = useThemeStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedAngle, setSelectedAngle] = useState(0);

  // Gallery view angles (using curated crops/angles)
  const anglePlates = [
    { label: 'Plate 01: Architectural View', image: product.image },
    { label: 'Plate 02: Timber Grain & Macro Detail', image: product.image },
    { label: 'Plate 03: Optical Depth & Resin Flow', image: product.image },
  ];

  // Curated detailed specs based on category and product
  const getProductSpecs = (p: Product) => {
    switch (p.category) {
      case 'tables':
        return [
          { label: 'Curated Dimensions', value: p.dimensions || '120cm (L) × 60cm (W) × 45cm (H)' },
          { label: 'Timber Provenance', value: '85-Year Aged Reclaimed American Walnut (Kiln-Dried to 8% Moisture)' },
          { label: 'Liquid Glass Polymer', value: 'High-Purity European Crystalline Epoxy, UV-Stabilized Anti-Yellowing' },
          { label: 'Pigment Infusion', value: 'Metallic Mica Pearl with Liquid Cyan & Abyss Blue Swirls' },
          { label: 'Plinth Architecture', value: 'X-Frame Heavy Gauge Carbon Steel, Matte Midnight Electrostatic Coat' },
          { label: 'Surface Refinement', value: '4-Stage Diamond Grit Buffing to High-Gloss Optical Mirror Finish' },
          { label: 'Total Weight & Load', value: 'Approx. 42 kg • Static Structural Capacity: 180 kg' },
          { label: 'Provenance Seal', value: 'Recessed Atelier Brass Medallion with Stamped Serial No. TC-2026-081' },
          { label: 'Craft Duration', value: '72+ Hours of Slow Curing, Planing, and Hand Buffing' },
        ];
      case 'coasters':
        return [
          { label: 'Set Configuration', value: 'Suite of 4 Hand-Poured Coasters + Natural Dark Slate Plinth' },
          { label: 'Dimensions', value: p.dimensions || '10cm Diameter × 1.2cm Thickness' },
          { label: 'Resin System', value: 'Heat-Resistant Food-Safe Optical Epoxy (Safe up to 90°C)' },
          { label: 'Artisanal Elements', value: '24K Genuine Flaked Gold Leaf, Opaque Ocean Foam Waves' },
          { label: 'Under-Surface', value: 'Scratch-Preventing Natural Portuguese Cork Base' },
          { label: 'Maintenance', value: 'Rinse with tepid water and wipe dry with a soft lint-free microfiber cloth' },
        ];
      case 'trays':
        return [
          { label: 'Tray Dimensions', value: p.dimensions || '45cm (L) × 30cm (W) × 5cm (H)' },
          { label: 'Foundation Wood', value: 'Single-Slab Kiln-Dried Solid Walnut with Beveled Rim' },
          { label: 'Resin Inlay', value: 'Amethyst Crystalline Geode with Multi-Tier Purple & Violet Luster' },
          { label: 'Hardware Spec', value: 'Solid Cast Brass Handles with Brushed Antique Gold PVD Finish' },
          { label: 'Food Safety', value: 'FDA-Compliant Food-Contact Certified Top Seal' },
          { label: 'Weight', value: '3.2 kg (Substantial weighted base for stable entertaining)' },
        ];
      case 'frames':
        return [
          { label: 'Frame Dimensions', value: p.dimensions || '90cm (H) × 60cm (W) × 4cm (D)' },
          { label: 'Art Depth', value: '7-Layered Three-Dimensional Resin Pour with Suspended Pigment Shelves' },
          { label: 'Casing', value: 'Deep-Set Architectural Matte Black Anodized Aluminium Gallery Box' },
          { label: 'Backing & Mounting', value: 'French Cleat Wall Bracket System for Flush Seismic-Safe Installation' },
          { label: 'Optical Clarity', value: 'Museum-Grade UV99 Filter Coat to Preserve Cerulean Vibrancy' },
        ];
      default:
        return [
          { label: 'Dimensions', value: p.dimensions || 'Custom Handcrafted Geometry' },
          { label: 'Primary Materials', value: p.materials.join(', ') },
          { label: 'Curing Period', value: '7-Day Multi-Layer Ambient Slow Cure' },
          { label: 'Authenticity', value: 'Signed Atelier Certificate of Provenance Included' },
        ];
    }
  };

  const specs = getProductSpecs(product);

  // Related products ("You May Also Like")
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  const handleAcquire = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setCartOpen(true);
    toast.success(`Acquired ${quantity} × ${product.name} to your collection.`);
  };

  return (
    <main className="min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44 bg-[#faf8f5]">
      {/* Breadcrumb Navigation */}
      <div className="container-custom py-4 border-b border-[#e8e3d8]">
        <nav className="flex items-center gap-2 text-xs text-[#73737c]">
          <Link href="/" className="hover:text-[#161618] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Atelier Gallery</span>
          </Link>
          <span>/</span>
          <Link href="/#catalogue" className="hover:text-[#161618] uppercase tracking-wider transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#161618] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ─── SECTION 1: GENERAL INFORMATION ─── */}
      <section className="py-12 md:py-16 border-b border-[#e8e3d8]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Visual Art Gallery */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Artwork Viewport */}
              <div className="relative aspect-[4/3] bg-[#ede7dc] overflow-hidden border border-[#d4ccbd] shadow-lg group">
                <Image
                  src={anglePlates[selectedAngle].image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#161618] text-[#f4efe6] text-[10px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 shadow-sm">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Provenance Stamp Overlay */}
                <div className="absolute bottom-4 left-4 bg-[#161618]/70 backdrop-blur-sm px-3 py-1 text-[11px] text-[#f5f2eb] font-light">
                  {anglePlates[selectedAngle].label}
                </div>
              </div>

              {/* Angle Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {anglePlates.map((plate, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAngle(idx)}
                    className={`relative aspect-[4/3] overflow-hidden border transition-all text-left ${selectedAngle === idx
                        ? 'border-[#161618] ring-1 ring-[#161618]'
                        : 'border-[#e8e3d8] opacity-70 hover:opacity-100'
                      }`}
                  >
                    <Image
                      src={plate.image}
                      alt={plate.label}
                      fill
                      className="object-cover"
                      sizes="180px"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Craft Pillars Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#e8e3d8] text-center">
                <div className="p-3 bg-[#f4efe6] border border-[#e8e3d8]">
                  <Layers className="w-4 h-4 mx-auto text-[#8c734b] mb-1.5" />
                  <span className="text-[10px] uppercase font-semibold text-[#161618] block">Live-Edge Wood</span>
                  <span className="text-[9px] text-[#73737c]">Salvaged Hardwood</span>
                </div>
                <div className="p-3 bg-[#f4efe6] border border-[#e8e3d8]">
                  <Clock className="w-4 h-4 mx-auto text-[#8c734b] mb-1.5" />
                  <span className="text-[10px] uppercase font-semibold text-[#161618] block">7-Day Cure</span>
                  <span className="text-[9px] text-[#73737c]">Bubble-Free Clarity</span>
                </div>
                <div className="p-3 bg-[#f4efe6] border border-[#e8e3d8]">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#8c734b] mb-1.5" />
                  <span className="text-[10px] uppercase font-semibold text-[#161618] block">Provenance</span>
                  <span className="text-[9px] text-[#73737c]">Signed Certificate</span>
                </div>
                <div className="p-3 bg-[#f4efe6] border border-[#e8e3d8]">
                  <Truck className="w-4 h-4 mx-auto text-[#8c734b] mb-1.5" />
                  <span className="text-[10px] uppercase font-semibold text-[#161618] block">White-Glove</span>
                  <span className="text-[9px] text-[#73737c]">Pan-India Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: General Info & Acquisition */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Category & Discipline Eyebrow */}
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8c734b] block mb-1.5">
                  Curated Discipline • {product.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] leading-[1.08] font-normal">
                  {product.name}
                </h1>
              </div>

              {/* Rating & Collector Reviews */}
              <div className="flex items-center gap-3 text-xs text-[#73737c]">
                <div className="flex items-center gap-1 text-[#8c734b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#8c734b]" />
                  ))}
                </div>
                <span className="font-medium text-[#161618]">{product.rating}</span>
                <span>•</span>
                <span>{product.reviews} Verified Patron Reviews</span>
              </div>

              {/* Price Display */}
              <div className="p-4 bg-[#f4efe6] border border-[#e8e3d8] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#73737c] block mb-0.5">
                    Acquisition Investment
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-[#161618]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#a1a1aa] line-through font-light">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#8c734b] font-semibold">
                  Taxes & Crate Included
                </span>
              </div>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-[#4a4a50] leading-relaxed font-light">
                {product.longDescription || product.description}
              </p>

              {/* Stock Status & Lead Time */}
              <div className="flex items-center gap-2.5 text-xs text-[#161618] py-2 border-y border-[#e8e3d8]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-medium">In Stock at Lucknow Atelier</span>
                <span className="text-[#73737c]">— Dispatched within 48 Hours</span>
              </div>

              {/* Quantity & Acquire Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#161618] bg-[#ffffff]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-11 flex items-center justify-center text-[#161618] hover:bg-[#f4efe6] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-serif text-base font-bold text-[#161618]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-11 flex items-center justify-center text-[#161618] hover:bg-[#f4efe6] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Button */}
                  <button
                    onClick={handleAcquire}
                    className="flex-1 btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-3.5 px-6 text-xs font-bold uppercase tracking-wider"
                    id="acquire-now-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acquire Artwork ({formatPrice(product.price * quantity)})</span>
                  </button>
                </div>

                {/* Secondary Room Visualizer Link */}
                <Link
                  href="/#visualizer"
                  className="w-full btn-gallery-outline py-3 px-6 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Preview in Architectural Room Setting</span>
                </Link>
              </div>

              {/* Commission Guarantee */}
              <div className="p-4 bg-[#ffffff] border border-[#e8e3d8] text-xs text-[#73737c] space-y-1">
                <span className="font-semibold text-[#161618] block uppercase tracking-wider text-[10px]">
                  Bespoke Atelier Commission
                </span>
                <p className="font-light">
                  Every piece is 1-of-1. For custom slab dimensions, specific wood species, or custom resin pigment shades, our artisans work directly with your interior architecture.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: DETAILED SPECIFICATIONS ─── */}
      <section className="py-20 md:py-24 bg-[#f4efe6] border-b border-[#e8e3d8]">
        <div className="container-custom">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block">
              Technical Dossier & Provenance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
              Detailed Specifications
            </h2>
            <p className="text-sm text-[#4a4a50] font-light leading-relaxed">
              The technical composition, material origins, structural tolerance, and conservation protocols of this creation.
            </p>
          </div>

          {/* Specifications Plinth Table */}
          <div className="bg-[#ffffff] border border-[#d4ccbd] shadow-md overflow-hidden mb-12">
            <div className="p-6 md:p-8 border-b border-[#e8e3d8] bg-[#faf8f5]">
              <h3 className="font-serif text-2xl text-[#161618] font-medium">
                Atelier Curation Record
              </h3>
              <span className="text-xs text-[#73737c]">
                Studio Ref: TC-SPEC-{product.id.toUpperCase()} • Issued by Master Artisan
              </span>
            </div>

            <div className="divide-y divide-[#e8e3d8]">
              {specs.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-12 p-4 md:px-8 md:py-5 hover:bg-[#faf8f5] transition-colors text-left gap-2 sm:gap-4"
                >
                  <span className="sm:col-span-4 text-xs font-semibold uppercase tracking-wider text-[#8c734b]">
                    {item.label}
                  </span>
                  <span className="sm:col-span-8 text-xs sm:text-sm text-[#161618] font-light">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conservation & Care Protocols */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-[#ffffff] border border-[#e8e3d8]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#161618] block mb-2">
                01. Daily Surface Care
              </span>
              <p className="text-xs text-[#4a4a50] font-light leading-relaxed">
                Clean only with lukewarm water and a plush microfiber cloth. Never use harsh ammoniated glass cleaners or citrus solvent sprays which may dull the polished resin sheen.
              </p>
            </div>

            <div className="p-6 bg-[#ffffff] border border-[#e8e3d8]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#161618] block mb-2">
                02. Thermal Tolerance
              </span>
              <p className="text-xs text-[#4a4a50] font-light leading-relaxed">
                Resin is cured to withstand hot teacups and coffee vessels up to 85°C. For boiling cast-iron cookery straight from the hearth, always place on an artisan coaster or trivet.
              </p>
            </div>

            <div className="p-6 bg-[#ffffff] border border-[#e8e3d8]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#161618] block mb-2">
                03. Sunlight & Lightfastness
              </span>
              <p className="text-xs text-[#4a4a50] font-light leading-relaxed">
                Infused with European UV-blocker hindered amine light stabilizers (HALS). Perfectly stable in bright interior rooms, but avoid persistent outdoor tropical weather exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: 'YOU MAY ALSO LIKE' (RELATED ARTWORKS) ─── */}
      <section className="py-20 md:py-28 bg-[#faf8f5] border-b border-[#e8e3d8]">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c734b] block mb-2">
                Curated Pairings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161618] font-normal tracking-tight">
                You May Also Like
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#73737c] max-w-md font-light">
              Patrons exploring {product.name} also frequently curate their spaces with these complementary works.
            </p>
          </div>

          {/* Related Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="artwork-card group p-5 bg-[#ffffff] flex flex-col justify-between text-left relative"
              >
                <div>
                  {/* Artwork Image */}
                  <Link
                    href={`/product/${rel.id}`}
                    className="block relative aspect-[4/3] overflow-hidden mb-4 bg-[#f4efe6]"
                  >
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    {rel.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-[#161618]/90 text-[#f4efe6] text-[9px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5">
                          {rel.badge}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Metadata */}
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c734b] block mb-1">
                    {rel.category}
                  </span>
                  <Link
                    href={`/product/${rel.id}`}
                    className="font-serif text-lg text-[#161618] hover:text-[#8c734b] transition-colors leading-tight line-clamp-1 block mb-1.5"
                  >
                    {rel.name}
                  </Link>
                  <p className="text-xs text-[#73737c] font-light line-clamp-2 leading-relaxed mb-4">
                    {rel.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-[#e8e3d8] flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#161618]">
                    {formatPrice(rel.price)}
                  </span>
                  <Link
                    href={`/product/${rel.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#161618] hover:text-[#8c734b] flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Full Gallery Link */}
          <div className="mt-14 text-center">
            <Link
              href="/#catalogue"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#161618] hover:text-[#8c734b] font-semibold transition-colors group"
            >
              <span>Return to Full Atelier Catalog</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44 bg-[#faf8f5]">
      <div className="container-custom py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative mb-6">
          <div className="w-14 h-14 border-2 border-[#e8e3d8] border-t-[#8c734b] rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#8c734b]" />
          </div>
        </div>
        <p className="font-serif text-xl text-[#161618] tracking-wide">
          Curating Handcrafted Piece
        </p>
        <p className="text-xs text-[#73737c] font-light mt-1.5 tracking-wider uppercase">
          Loading atelier specifications & custom finishes
        </p>
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent />
      </Suspense>
      <Footer />
    </>
  );
}
