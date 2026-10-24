'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  auth,
  isFirebaseConfigured,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from '@/lib/firebase';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, isOtpSent, setOtpSent } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    if (isFirebaseConfigured && auth) {
      try {
        // Setup reCAPTCHA verifier if not already done
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              // reCAPTCHA solved
            },
          });
        }

        const appVerifier = window.recaptchaVerifier;
        const formattedPhone = `+91${phone}`;

        const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(result);
        setOtpSent(true);
        toast.success(`Verification code dispatched via Firebase SMS to +91 ${phone}`);
      } catch (err: unknown) {
        console.error('Phone Auth Error:', err);
        const errorMsg =
          err instanceof Error
            ? err.message
            : 'Failed to send OTP. Please check your credentials.';
        toast.error(errorMsg);
        // Clear recaptcha verifier on error so it can be re-initialized
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = undefined;
          } catch { }
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Graceful fallback for local development before Firebase credentials are added to .env.local
      await new Promise((r) => setTimeout(r, 900));
      setOtpSent(true);
      setLoading(false);
      toast.info('Firebase keys not detected in .env.local — Running in test mode (Code: 123456)');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);

    if (confirmationResult) {
      try {
        const userCredential = await confirmationResult.confirm(otp);
        login(phone, name || userCredential.user.displayName || `Collector-${phone.slice(-4)}`);
        setLoading(false);
        handleClose();
        toast.success('Successfully authenticated.');
      } catch (err: unknown) {
        console.error('Firebase OTP Verification Error:', err);
        setLoading(false);
        toast.error('Invalid verification code. Please check and try again.');
      }
    } else {
      // Local fallback verification
      await new Promise((r) => setTimeout(r, 600));
      login(phone, name || `Collector-${phone.slice(-4)}`);
      setLoading(false);
      handleClose();
      toast.success('Welcome to The Creations Atelier.');
    }
  };

  const handleClose = () => {
    closeAuthModal();
    setPhone('');
    setName('');
    setOtp('');
    setConfirmationResult(null);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div key="auth-modal-root" className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#161618]/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#ffffff] border border-[#e8e3d8] shadow-2xl p-8 text-left z-10"
          >
            {/* Invisible reCAPTCHA container for Firebase */}
            <div id="recaptcha-container" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#e8e3d8] flex items-center justify-center text-[#73737c] hover:text-[#161618] hover:border-[#161618] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isOtpSent ? (
              /* Step 1: Mobile Input */
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#8c734b] font-semibold block">
                      Patron Authentication
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl text-[#161618] font-normal">
                    Sign In with Phone
                  </h3>
                  <p className="text-xs text-[#73737c] font-light leading-relaxed">
                    Enter your mobile number to receive a one-time security code and access your private acquisitions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1.5">
                      Your Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#e8e3d8] px-4 py-2.5 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border border-[#e8e3d8] bg-[#faf8f5] focus-within:border-[#161618]">
                      <span className="px-3.5 py-2.5 text-xs text-[#73737c] border-r border-[#e8e3d8] font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        required
                        className="flex-1 bg-transparent px-3 py-2.5 text-xs text-[#161618] focus:outline-none font-medium tracking-wider"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-3.5 text-xs font-bold"
                  id="send-otp-btn"
                >
                  {loading ? 'Dispatching SMS...' : 'Request Verification Code'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#73737c] uppercase tracking-wider pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Secured with Firebase Phone Verification</span>
                </div>
              </form>
            ) : (
              /* Step 2: OTP Verification */
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8c734b] font-semibold block">
                    Security Code
                  </span>
                  <h3 className="font-serif text-3xl text-[#161618] font-normal">
                    Verify Your Phone
                  </h3>
                  <p className="text-xs text-[#73737c] font-light leading-relaxed">
                    We sent a 6-digit verification code to{' '}
                    <strong className="text-[#161618]">+91 {phone}</strong>.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-2">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    required
                    className="w-full bg-[#faf8f5] border border-[#e8e3d8] px-4 py-3 text-center text-lg tracking-[0.5em] font-serif text-[#161618] focus:outline-none focus:border-[#161618]"
                  />
                  {!isFirebaseConfigured && (
                    <span className="text-[10px] text-[#8c734b] text-center block mt-2">
                      Test Mode: Enter any 6 digits (e.g. 123456)
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-3.5 text-xs font-bold"
                  id="verify-otp-btn"
                >
                  {loading ? 'Verifying...' : 'Authenticate & Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setConfirmationResult(null);
                    }}
                    className="text-xs text-[#8c734b] hover:underline"
                  >
                    Change Mobile Number
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
