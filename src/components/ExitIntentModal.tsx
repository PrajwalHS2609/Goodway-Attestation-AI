import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatWhatsAppLink } from '../utils/helpers';
import { X, Sparkles, Phone, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export const ExitIntentModal: React.FC = () => {
  const { isExitModalOpen, closeExitModal, settings, openBookingModal, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('United Arab Emirates (UAE)');
  const [submitted, setSubmitted] = useState(false);

  // Trigger exit intent once on desktop mouseleave at top of viewport
  useEffect(() => {
    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered && !isExitModalOpen) {
        const hasSeen = sessionStorage.getItem('gwa_exit_seen');
        if (!hasSeen) {
          triggered = true;
          sessionStorage.setItem('gwa_exit_seen', 'true');
          // Optional subtle exit intent
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isExitModalOpen]);

  if (!isExitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide your name and mobile number.');
      return;
    }
    setSubmitted(true);
    showToast('Consultation request received! Our specialist will call you shortly.');
  };

  const directWhatsAppUrl = formatWhatsAppLink(
    settings.whatsappNumber,
    `Hello Goodway Attestation, I need a quick consultation for document attestation to ${destination}. My name is ${name || 'Applicant'} (${phone || 'Phone'}).`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0B1F3A] to-[#1357A6] text-white relative">
          <button
            onClick={closeExitModal}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#D6A84F] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complimentary Assessment</span>
          </div>

          <h3 className="text-xl font-bold text-white leading-tight">
            Have Questions About Attestation Rules & Timelines?
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Speak directly with our senior documentation advisor in Malleshwaram for quick advice.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Request Received!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you, {name}. Our Malleshwaram desk will contact you at {phone} within 30 minutes.
              </p>
              <div className="pt-2">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98450 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Destination Country</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1357A6]"
                >
                  <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Germany (Apostille)">Germany (Apostille)</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Other Country">Other Country</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Callback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
                  title="Connect on WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeExitModal();
                    openBookingModal();
                  }}
                  className="text-xs text-slate-500 hover:text-[#1357A6] underline"
                >
                  Or schedule a formal appointment slot directly
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
