'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Collections from '@/components/Collections';
import RoomVisualizer from '@/components/RoomVisualizer';
import FeaturedProducts from '@/components/FeaturedProducts';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

// Dynamic imports for client-only components
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });
const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="flex-1">
        <Hero />
        <Marquee />
        <Collections />
        <RoomVisualizer />
        <FeaturedProducts />
        <About />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
