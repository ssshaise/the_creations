'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  Copy,
} from 'lucide-react';
import { useCartStore, useAuthStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { getTotalPrice, clearCart, setCartOpen } = useCartStore();
  const { userName, phone } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [deliveryAddress, setDeliveryAddress] = useState('402, Royal Palms, Bandra West, Mumbai 400050');

  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [orderId, setOrderId] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const totalPrice = getTotalPrice();

  const handleProcessPayment = async () => {
    setStep('processing');
    const newOrderId = `TC-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setPaidAmount(totalPrice);

    await new Promise((resolve) => setTimeout(resolve, 1800));
    setStep('success');
    clearCart();
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order Reference copied to clipboard.');
  };

  const handleDownloadInvoice = () => {
    toast.success('Artisan Invoice downloaded successfully. 📄');
  };

  const handleFinish = () => {
    setStep('checkout');
    onClose();
    setCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="payment-modal-root" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="payment-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#161618]/60 backdrop-blur-sm"
            onClick={step === 'processing' ? undefined : handleFinish}
          />

          {/* Modal Window */}
          <motion.div
            key="payment-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#ffffff] border border-[#e8e3d8] shadow-2xl overflow-hidden z-10 text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e8e3d8] bg-[#faf8f5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f4efe6] border border-[#e8e3d8] flex items-center justify-center text-[#8c734b]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#161618] leading-none">
                  {step === 'success' ? 'Acquisition Confirmed' : 'Atelier Checkout'}
                </h3>
                <p className="text-[11px] text-[#73737c] uppercase tracking-wider mt-1">
                  256-Bit SSL Encrypted • Direct Razorpay Gateway
                </p>
              </div>
            </div>

            {step !== 'processing' && (
              <button
                onClick={handleFinish}
                className="w-8 h-8 rounded-full border border-[#e8e3d8] flex items-center justify-center text-[#73737c] hover:text-[#161618] hover:border-[#161618] transition-colors"
                id="close-payment-modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#ffffff]">
            {step === 'checkout' && (
              <>
                {/* Order Summary Pill */}
                <div className="bg-[#faf8f5] p-5 border border-[#e8e3d8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#73737c] uppercase tracking-wider block">
                      Total Investment
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#161618]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#161618] block font-medium">
                      Patron: {userName || 'Collector'}
                    </span>
                    <span className="text-xs text-[#8c734b] block font-medium">
                      +91 {phone}
                    </span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#161618] block mb-2">
                    White-Glove Shipping Destination
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter complete shipping address with pincode"
                    className="w-full bg-[#faf8f5] border border-[#e8e3d8] px-4 py-2.5 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                  />
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#161618] block mb-3">
                    Select Payment Gateway
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {[
                      { id: 'upi', label: 'UPI / QR', icon: QrCode },
                      { id: 'card', label: 'Cards', icon: CreditCard },
                      { id: 'netbanking', label: 'Net Banking', icon: Building },
                      { id: 'cod', label: 'Pay on Delivery', icon: Truck },
                    ].map((method) => {
                      const Icon = method.icon;
                      const active = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                          className={`p-3 border text-center flex flex-col items-center gap-1.5 transition-all ${
                            active
                              ? 'border-[#161618] bg-[#161618] text-[#ffffff]'
                              : 'border-[#e8e3d8] bg-[#faf8f5] text-[#4a4a50] hover:text-[#161618] hover:border-[#161618]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-[11px] font-medium tracking-wide uppercase">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Method Content */}
                  <div className="bg-[#faf8f5] p-5 border border-[#e8e3d8]">
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 bg-[#ffffff] p-2 border border-[#e8e3d8] flex items-center justify-center flex-shrink-0 shadow-sm">
                            <div className="w-full h-full border border-black border-dashed flex flex-col items-center justify-center p-1 text-center">
                              <QrCode className="w-12 h-12 text-black" />
                              <span className="text-[8px] font-bold text-black uppercase">Scan & Pay</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#161618] block mb-1">
                              Scan with any UPI Application
                            </span>
                            <p className="text-[11px] text-[#73737c] leading-tight mb-2">
                              Google Pay, PhonePe, Paytm, BHIM, CRED
                            </p>
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Instant 0% Convenience Fee
                            </span>
                          </div>
                        </div>

                        <div className="gallery-divider" />

                        <div>
                          <label className="text-[11px] text-[#4a4a50] block mb-1.5 font-medium">
                            Or Enter Virtual Payment Address (VPA)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="e.g. mobile@upi or username@okhdfcbank"
                              className="flex-1 bg-[#ffffff] border border-[#e8e3d8] px-3 py-2 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setUpiId('collector@upi');
                                toast.info('Sample UPI ID filled');
                              }}
                              className="px-3 py-2 text-xs bg-[#ffffff] text-[#161618] border border-[#e8e3d8] hover:border-[#161618] font-medium"
                            >
                              Auto-Fill
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] text-[#4a4a50] block mb-1">Card Number</label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 •••• •••• 8824"
                            className="w-full bg-[#ffffff] border border-[#e8e3d8] px-3 py-2 text-xs font-mono text-[#161618] focus:outline-none focus:border-[#161618]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-[#4a4a50] block mb-1">Expiry Date</label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full bg-[#ffffff] border border-[#e8e3d8] px-3 py-2 text-xs font-mono text-[#161618] focus:outline-none focus:border-[#161618]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#4a4a50] block mb-1">CVV / CVC</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              className="w-full bg-[#ffffff] border border-[#e8e3d8] px-3 py-2 text-xs font-mono text-[#161618] focus:outline-none focus:border-[#161618]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] text-[#4a4a50] block mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Full name as printed on card"
                            className="w-full bg-[#ffffff] border border-[#e8e3d8] px-3 py-2 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <label className="text-[11px] text-[#4a4a50] block mb-1">Choose Partner Bank</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(
                            (bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => setSelectedBank(bank)}
                                className={`p-2.5 border text-left text-xs font-medium transition-all ${
                                  selectedBank === bank
                                    ? 'border-[#161618] bg-[#161618] text-[#ffffff]'
                                    : 'border-[#e8e3d8] bg-[#ffffff] text-[#4a4a50] hover:text-[#161618]'
                                }`}
                              >
                                {bank}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="text-center py-4 space-y-2">
                        <div className="w-12 h-12 bg-[#ffffff] border border-[#e8e3d8] mx-auto flex items-center justify-center text-[#8c734b]">
                          <Truck className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-lg text-[#161618]">Pay Upon Delivery</h4>
                        <p className="text-xs text-[#73737c] max-w-sm mx-auto font-light">
                          Inspect your handcrafted piece in person before completing payment via Cash or UPI with our white-glove courier.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Authorize Button */}
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="w-full btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-4 text-xs font-bold"
                  id="confirm-pay-button"
                >
                  <Lock className="w-4 h-4" />
                  Authorize & Acquire ({formatPrice(totalPrice)})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 'processing' && (
              <div className="py-20 text-center space-y-5">
                <div className="w-12 h-12 border-2 border-[#161618] border-t-transparent rounded-full animate-spin mx-auto" />
                <div>
                  <h4 className="font-serif text-2xl text-[#161618] mb-1">
                    Connecting to Payment Gateway...
                  </h4>
                  <p className="text-xs text-[#73737c] max-w-xs mx-auto font-light">
                    Securing bank transaction. Please do not close or navigate away.
                  </p>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#f4efe6] border border-[#8c734b] mx-auto flex items-center justify-center text-[#8c734b]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8c734b] font-semibold block mb-1">
                    Atelier Commission Secured
                  </span>
                  <h3 className="font-serif text-3xl text-[#161618] font-normal">
                    Acquisition Confirmed
                  </h3>
                  <p className="text-xs text-[#73737c] mt-1 font-light">
                    Thank you, <strong className="text-[#161618]">{userName || 'Valued Patron'}</strong>. Our master artisans have queued your piece for final museum packing.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-[#faf8f5] p-5 border border-[#e8e3d8] text-left space-y-3">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-[#e8e3d8]">
                    <span className="text-[#73737c]">Provenance Reference</span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="font-mono text-[#161618] font-bold flex items-center gap-1 hover:underline"
                    >
                      {orderId}
                      <Copy className="w-3.5 h-3.5 text-[#8c734b]" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-[#e8e3d8]">
                    <span className="text-[#73737c]">Paid Investment</span>
                    <span className="font-serif font-bold text-sm text-[#161618]">{formatPrice(paidAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-[#e8e3d8]">
                    <span className="text-[#73737c]">White-Glove Delivery</span>
                    <span className="text-[#161618]">4-6 Business Days (Reinforced Crate)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#73737c]">Notification Dispatched To</span>
                    <span className="text-[#161618] font-medium">+91 {phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadInvoice}
                    className="flex-1 btn-gallery-outline py-3 text-xs"
                  >
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="flex-1 btn-gallery-primary py-3 text-xs font-bold"
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
