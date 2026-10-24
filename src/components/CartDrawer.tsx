'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useCartStore, useAuthStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import PaymentModal from './PaymentModal';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();
  const { isLoggedIn, openAuthModal } = useAuthStore();
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      openAuthModal();
      toast.info('Please sign in with your phone number to complete acquisition.', {
        style: {
          background: '#ffffff',
          border: '1px solid #e8e3d8',
          color: '#161618',
        },
      });
      return;
    }

    setPaymentOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#161618]/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
        )}

        {isCartOpen && (
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] bg-[#ffffff] border-l border-[#e8e3d8] flex flex-col text-left shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e8e3d8]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#8c734b]" />
                <div>
                  <h2 className="font-serif text-2xl text-[#161618] leading-none">Your Acquisitions</h2>
                  <span className="text-[10px] uppercase tracking-wider text-[#73737c]">
                    {totalItems} {totalItems === 1 ? 'Artwork' : 'Artworks'} in Bag
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full border border-[#e8e3d8] flex items-center justify-center text-[#73737c] hover:text-[#161618] hover:border-[#161618] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#73737c] mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#161618] mb-1">
                    Your Bag is Empty
                  </h3>
                  <p className="text-xs text-[#73737c] max-w-xs mb-6 font-light">
                    Explore our curated collection of river tables, wall panels, and geode trays.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-gallery-primary"
                  >
                    Explore Catalogue
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 border border-[#e8e3d8] bg-[#faf8f5] group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-[#ffffff] border border-[#e8e3d8] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base text-[#161618] truncate leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#a1a1aa] hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8c734b]">
                          {item.product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#e8e3d8] bg-[#ffffff]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#73737c] hover:text-[#161618]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-[#161618]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#73737c] hover:text-[#161618]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-base font-bold text-[#161618]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-[#e8e3d8] p-6 space-y-4 bg-[#faf8f5]">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#73737c]">
                    <span>Atelier Subtotal</span>
                    <span className="font-medium text-[#161618]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[#73737c]">
                    <span>White-Glove Pan-India Delivery</span>
                    <span className="text-emerald-700 font-semibold uppercase text-[10px] tracking-wider">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-[#73737c]">
                    <span>Artisan Provenance Certificate</span>
                    <span className="text-[#8c734b] font-medium uppercase text-[10px] tracking-wider">Included</span>
                  </div>
                  <div className="gallery-divider pt-1" />
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#161618]">Total Investment</span>
                    <span className="font-serif text-2xl font-bold text-[#161618]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-4 text-xs font-bold"
                  id="cart-checkout-btn"
                >
                  {!isLoggedIn ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Sign In with Phone to Place Order
                    </>
                  ) : (
                    <>
                      Proceed to Secure Checkout
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#73737c] uppercase tracking-wider pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>256-Bit SSL Encrypted • Direct Razorpay Gateway</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Payment Modal */}
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
}
