'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  Phone,
  Compass,
  Sun,
  Moon,
  Mail,
} from 'lucide-react';
import { useCartStore, useAuthStore, useThemeStore, useInquiryStore } from '@/lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const { isLoggedIn, userName, logout, openAuthModal } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { openInquiry } = useInquiryStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [theme]);

  const totalItems = mounted ? getTotalItems() : 0;

  const navLinks = [
    { href: '#collections', label: 'Collections' },
    { href: '#catalogue', label: 'Artworks' },
    { href: '#visualizer', label: 'Room Preview' },
    { href: '#craftsmanship', label: 'The Alchemy' },
    { href: '#patrons', label: 'Collector Reviews' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Editorial Announcement Bar */}
        <div className="bg-[#161618] text-[#f4efe6] text-[11px] font-medium tracking-[0.14em] uppercase py-2 px-4 text-center border-b border-[#2a2a2d]">
          <div className="container-custom flex items-center justify-center gap-4">
            <span className="hidden sm:inline text-[#b89c6c]">✦ Atelier Release 2026</span>
            <span>Complimentary Pan-India White-Glove Delivery</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Each Work Accompanied by a Signed Provenance Certificate</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`transition-all duration-300 border-b ${
            mounted && theme === 'dark'
              ? scrolled
                ? 'bg-[#0c0c0e]/95 backdrop-blur-md shadow-md border-[#24242a]'
                : 'bg-[#0c0c0e] border-[#24242a]'
              : scrolled
                ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-[#e8e3d8]'
                : 'bg-[#faf8f5] border-[#e8e3d8]'
          }`}
        >
          <div className="container-custom">
            <nav className="flex items-center justify-between h-20">
              {/* Brand Logo */}
              <Link href="/" className="flex flex-col group text-left">
                <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#161618] font-normal leading-none">
                  The Creations
                </span>
                <span className="text-[9px] tracking-[0.28em] text-[#8c734b] uppercase font-semibold mt-1">
                  Atelier & Resin Gallery
                </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[13px] tracking-[0.06em] text-[#4a4a50] hover:text-[#161618] uppercase font-medium transition-colors relative py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8c734b] transition-all duration-300 hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Auth: Phone Sign-in */}
                {mounted && isLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4efe6] border border-[#e8e3d8] text-xs text-[#161618]">
                      <User className="w-3.5 h-3.5 text-[#8c734b]" />
                      <span className="max-w-[100px] truncate font-medium">
                        {userName || 'Collector'}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2 text-[#73737c] hover:text-[#161618] transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase border border-[#161618] text-[#161618] hover:bg-[#161618] hover:text-[#faf8f5] transition-all"
                    id="nav-login-btn"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                )}

                {/* Commission / Email Inquiry Button */}
                <button
                  onClick={() => openInquiry('Bespoke Artwork Commission Inquiry')}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 border border-[#d4ccbd] text-[11px] font-medium uppercase tracking-wider text-[#161618] hover:border-[#161618] hover:bg-[#f4efe6] transition-all"
                  title="Commission an Artwork via Email"
                  id="nav-inquire-btn"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8c734b]" />
                  <span>Inquire</span>
                </button>

                {/* Ambience Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center border border-[#e8e3d8] text-[#161618] hover:border-[#161618] hover:text-[#8c734b] transition-all"
                  aria-label={mounted && theme === 'dark' ? 'Switch to daylight gallery' : 'Switch to nocturnal gallery'}
                  title={mounted && theme === 'dark' ? 'Daylight Gallery' : 'Nocturnal Gallery'}
                  id="theme-toggle-btn"
                >
                  {mounted && theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-[#d6b583]" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>

                {/* Cart Button */}
                <button
                  onClick={toggleCart}
                  className="relative flex items-center gap-2 px-4 py-2 bg-[#161618] text-[#ffffff] hover:bg-[#8c734b] transition-colors text-xs font-medium uppercase tracking-wider"
                  id="nav-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Bag</span>
                  {mounted && totalItems > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#b89c6c] text-[#161618] font-bold text-[10px] flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 lg:hidden text-[#161618] hover:text-[#8c734b] transition-colors"
                  aria-label="Toggle Navigation"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-b px-6 py-8 space-y-6 shadow-xl ${
                mounted && theme === 'dark'
                  ? 'bg-[#0c0c0e] border-[#24242a]'
                  : 'bg-[#faf8f5] border-[#e8e3d8]'
              }`}
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-xl text-[#161618] hover:text-[#8c734b] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="gallery-divider pt-4" />

              <div className="pt-2 space-y-2.5">
                {mounted && !isLoggedIn && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openAuthModal();
                    }}
                    className="w-full btn-gallery-primary"
                  >
                    <Phone className="w-4 h-4" />
                    Sign In with Phone
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openInquiry('Bespoke Artwork Commission Inquiry');
                  }}
                  className="w-full btn-gallery-outline flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#8c734b]" />
                  <span>Commission / Email Us</span>
                </button>

                <div className="pt-3 flex items-center justify-between border-t border-[#e8e3d8]">
                  <span className="text-xs uppercase tracking-wider text-[#73737c]">Gallery Ambience</span>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#e8e3d8] text-xs uppercase tracking-wider text-[#161618] hover:border-[#161618] transition-colors"
                  >
                    {mounted && theme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-[#d6b583]" />
                        <span>Daylight</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5" />
                        <span>Nocturnal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
