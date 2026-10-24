'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Phone, User, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { useInquiryStore } from '@/lib/store';
import { toast } from 'sonner';

export default function InquiryModal() {
  const { isInquiryOpen, closeInquiry, inquirySubject } = useInquiryStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(inquirySubject || 'Custom Resin Art Commission');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in your name, email, and inquiry message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: subject || inquirySubject || 'Bespoke Resin Art Commission',
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        toast.success('Your message has been dispatched to our studio atelier.');
      } else {
        toast.error(data.error || 'Failed to dispatch email inquiry.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    closeInquiry();
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isInquiryOpen && (
        <div key="inquiry-root" className="fixed inset-0 z-[75] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="inquiry-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#161618]/60 backdrop-blur-sm"
            onClick={handleResetAndClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#ffffff] border border-[#e8e3d8] shadow-2xl p-6 sm:p-8 text-left z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#e8e3d8] flex items-center justify-center text-[#73737c] hover:text-[#161618] hover:border-[#161618] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8c734b] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#8c734b]" />
                    Atelier Commission & Consultation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#161618] font-normal">
                    Connect with the Artisan
                  </h3>
                  <p className="text-xs text-[#73737c] font-light leading-relaxed">
                    Have a bespoke resin piece in mind or questions about an artwork? Send us a message and our studio in Lucknow will reach out with a consultation.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-[#8c734b] absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#faf8f5] border border-[#e8e3d8] pl-9 pr-3 py-2.5 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-[#8c734b] absolute left-3 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#faf8f5] border border-[#e8e3d8] pl-9 pr-3 py-2.5 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1">
                        Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 text-[#8c734b] absolute left-3 pointer-events-none" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 "
                          className="w-full bg-[#faf8f5] border border-[#e8e3d8] pl-9 pr-3 py-2.5 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1">
                      Inquiry / Commission Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. 8-Seater Walnut River Dining Table"
                      className="w-full bg-[#faf8f5] border border-[#e8e3d8] px-3.5 py-2.5 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-medium text-[#161618] block mb-1">
                      Message & Specifications <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-[#8c734b] absolute left-3 top-3 pointer-events-none" />
                      <textarea
                        required
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your desired timber, color palette, dimensions, or questions..."
                        className="w-full bg-[#faf8f5] border border-[#e8e3d8] pl-9 pr-3 py-2 text-xs text-[#161618] focus:outline-none focus:border-[#161618]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gallery-primary !bg-[#161618] !text-[#ffffff] hover:!bg-[#8c734b] py-3.5 text-xs font-bold inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Dispatching to Atelier...' : 'Send Inquiry via Email'}</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#f4efe6] border border-[#8c734b] mx-auto flex items-center justify-center text-[#8c734b]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-[#161618]">Message Dispatched</h4>
                <p className="text-xs text-[#73737c] font-light max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#161618]">{name}</strong>. A copy of your inquiry has been forwarded to our master resin artisan. We will email you at <strong className="text-[#161618]">{email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="btn-gallery-primary py-2.5 px-6 text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
