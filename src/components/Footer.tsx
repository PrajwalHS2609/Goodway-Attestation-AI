import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, openBookingModal, openLegalModal, setIsAdminOpen } = useApp();

  return (
    <footer className="bg-[#08172b] text-slate-300 border-t border-white/10 pt-16 pb-24 sm:pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & NAP */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#1357A6] flex items-center justify-center text-[#D6A84F]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                GOODWAY ATTESTATION
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Professional Certificate Attestation, Embassy Consular Legalization, State HRD,
              and MEA Apostille Services based in Malleshwaram, Bengaluru, Karnataka.
            </p>

            <div className="space-y-2 text-slate-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <a href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {settings.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Services
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Educational Attestation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Personal Certificate Attestation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Embassy Attestation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">MEA Apostille</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">HRD Attestation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Commercial Documents</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">MOFA Assistance</a></li>
            </ul>
          </div>

          {/* Col 3: Key Destinations */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Destinations
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#countries" className="hover:text-white transition-colors">UAE Attestation</a></li>
              <li><a href="#countries" className="hover:text-white transition-colors">Saudi Arabia (KSA)</a></li>
              <li><a href="#countries" className="hover:text-white transition-colors">Qatar Embassy</a></li>
              <li><a href="#countries" className="hover:text-white transition-colors">Germany Apostille</a></li>
              <li><a href="#countries" className="hover:text-white transition-colors">UK Apostille</a></li>
              <li><a href="#countries" className="hover:text-white transition-colors">USA Apostille</a></li>
              <li><a href="#countries" className="hover:text-white transition-colors">Canada Apostille</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Legal */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Quick Access
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => openBookingModal()} className="hover:text-white transition-colors text-left">
                  Book an Appointment
                </button>
              </li>
              <li><a href="#track" className="hover:text-white transition-colors">Track Document Dossier</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#documents" className="hover:text-white transition-colors">Document Types Guide</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Malleshwaram Office</a></li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-slate-500 hover:text-[#D6A84F] transition-colors"
                >
                  Staff Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Goodway Attestation. All Rights Reserved.
            <span className="block sm:inline sm:ml-2 text-slate-400">
              Independent document facilitation consultancy in Bengaluru.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openLegalModal('privacy')}
              className="hover:text-white transition-colors underline"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => openLegalModal('terms')}
              className="hover:text-white transition-colors underline"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => openLegalModal('document-handling')}
              className="hover:text-white transition-colors underline"
            >
              Document Handling Policy
            </button>
            <span>·</span>
            <button
              onClick={() => openLegalModal('refund')}
              className="hover:text-white transition-colors underline"
            >
              Refund Guidelines
            </button>
            <span>·</span>
            <button
              onClick={() => openLegalModal('disclaimer')}
              className="hover:text-white transition-colors underline"
            >
              Disclaimer
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
