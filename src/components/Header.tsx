import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatWhatsAppLink } from '../utils/helpers';
import { Phone, MessageSquare, Calendar, ShieldCheck, Menu, X, Lock } from 'lucide-react';

export const Header: React.FC = () => {
  const { settings, openBookingModal, openChecklistModal, setIsAdminOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = formatWhatsAppLink(
    settings.whatsappNumber,
    'Hello Goodway Attestation, I would like to enquire about document attestation.'
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B1F3A]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
        {/* Top announcement bar / office quick banner */}
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs text-slate-300 border-b border-white/5 bg-[#08172b]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Malleshwaram Desk Open Today: {settings.openingTime} – {settings.closingTime}
            </span>
            <span className="text-slate-400">·</span>
            <span>Opp. Canara Bank, 11th Cross Temple St, Bengaluru</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
              {settings.primaryPhone}
            </a>
            <span className="text-slate-400">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-400 hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-[11px]"
              title="Staff & Admin Portal"
            >
              <Lock className="w-3 h-3" />
              Staff Login
            </button>
          </div>
        </div>

        {/* Main 1-Row 3-Zone Header Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2.5 text-white group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1357A6] to-[#0B1F3A] border border-[#D6A84F]/40 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#D6A84F]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                GOODWAY ATTESTATION
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                Bangalore · Document Legalization
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            <a href="#services" className="hover:text-[#D6A84F] transition-colors">
              Services
            </a>
            <a href="#countries" className="hover:text-[#D6A84F] transition-colors">
              Countries
            </a>
            <button
              onClick={() => openChecklistModal()}
              className="text-[#D6A84F] hover:text-white transition-colors font-semibold flex items-center gap-1 cursor-pointer"
            >
              PDF Checklist
            </button>
            <a href="#how-it-works" className="hover:text-[#D6A84F] transition-colors">
              How It Works
            </a>
            <a href="#documents" className="hover:text-[#D6A84F] transition-colors">
              Document Types
            </a>
            <a href="#track" className="hover:text-[#D6A84F] transition-colors">
              Track Status
            </a>
            <a href="#contact" className="hover:text-[#D6A84F] transition-colors">
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700/80 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1.5 border border-emerald-500/30 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#1357A6] hover:bg-[#1976D2] rounded-lg transition-all shadow-md hover:shadow-lg border border-blue-400/30 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
              Book Appointment
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Staff Login"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B1F3A] border-b border-white/10 px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-base font-medium text-slate-200">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1 border-b border-white/5"
              >
                Services
              </a>
              <a
                href="#countries"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1 border-b border-white/5"
              >
                Destination Countries
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openChecklistModal();
                }}
                className="text-left text-[#D6A84F] font-semibold py-1 border-b border-white/5 flex items-center justify-between"
              >
                <span>PDF Document Checklist</span>
                <span className="text-[10px] bg-[#D6A84F]/20 text-[#D6A84F] px-2 py-0.5 rounded">Download</span>
              </button>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1 border-b border-white/5"
              >
                How It Works
              </a>
              <a
                href="#documents"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1 border-b border-white/5"
              >
                Document Types
              </a>
              <a
                href="#track"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1 border-b border-white/5"
              >
                Track Status
              </a>
              <a
                href="#faqs"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1 border-b border-white/5"
              >
                FAQs
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D6A84F] py-1"
              >
                Contact & Directions
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-2.5 text-sm font-semibold text-white bg-[#1357A6] rounded-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#D6A84F]" />
                Book Appointment
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-sm font-semibold text-white bg-emerald-700 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Sticky CTA Bar (Height <= 15% viewport height) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1F3A]/98 backdrop-blur-md border-t border-white/10 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 text-center">
          <a
            href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-[#D6A84F] mb-0.5" />
            <span className="text-[11px] font-semibold tracking-wide">CALL NOW</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-md bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200 mb-0.5" />
            <span className="text-[11px] font-semibold tracking-wide">WHATSAPP</span>
          </a>
          <button
            onClick={() => openBookingModal()}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-md bg-[#1357A6] hover:bg-[#1976D2] text-white transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#D6A84F] mb-0.5" />
            <span className="text-[11px] font-semibold tracking-wide">BOOK NOW</span>
          </button>
        </div>
      </div>
    </>
  );
};
