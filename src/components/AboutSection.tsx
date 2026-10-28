import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  Compass,
  FileCheck,
  Users2,
  CheckCircle2,
  MapPin,
  Calendar
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings, openBookingModal } = useApp();

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Commitments (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
              About Goodway Attestation
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
              Professional Document Assistance for Your Global Journey
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Based in Malleshwaram, Bengaluru, <strong>Goodway Attestation</strong> assists
              individuals, families, working professionals, and business organizations with the
              complex requirements of international document legalization.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are relocating to the UAE for employment, pursuing higher studies in Germany,
              sponsoring your family in Qatar, or expanding corporate operations into Saudi Arabia,
              we guide you through university verifications, State HRD and Home Department authentications,
              Ministry of External Affairs (MEA) Apostille stickers, and destination embassy consular stamping.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#1357A6]" />
                  <span>Document Security Protocol</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every original certificate is stored in dedicated fire-rated custody lockers and
                  transported only in tamper-evident security packaging.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Compass className="w-4 h-4 text-[#1357A6]" />
                  <span>Transparent Process Guidance</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We clarify the exact difference between Hague Apostille and Embassy Attestation so
                  you avoid unnecessary delays or rejected visa files.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <MapPin className="w-4 h-4 text-[#1357A6]" />
                  <span>Accessible Bangalore Presence</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Walk in directly to our physical Malleshwaram desk, or schedule an executive pickup
                  from your home or tech park across Bengaluru.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <FileCheck className="w-4 h-4 text-[#1357A6]" />
                  <span>Live Dossier Tracking</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Stay updated at every milestone with our online tracking portal, from inward receipt
                  to final consular dispatch.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3 bg-[#1357A6] hover:bg-[#1976D2] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D6A84F]" />
                <span>Visit Malleshwaram Office or Book Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Column: Physical Location & Verification Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#1357A6] text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-[#D6A84F]" />
                  <span className="text-xs uppercase tracking-wider font-bold text-white">
                    Malleshwaram Facility
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Central Bangalore
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-lg font-bold text-white">
                  Goodway Attestation Head Office
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {settings.address}
                </p>
                <div className="text-xs text-[#D6A84F] font-medium pt-1">
                  Landmark: {settings.landmark}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2 text-xs">
                <div className="font-bold text-white">Operational Service Hours:</div>
                <div className="flex justify-between text-slate-200">
                  <span>{settings.workingDays.join(' – ')}:</span>
                  <span className="font-mono text-white">{settings.openingTime} – {settings.closingTime}</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Sundays:</span>
                  <span className="text-slate-300">{settings.sundayStatus}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300 leading-relaxed">
                <strong>Legal Notice:</strong> Goodway Attestation is an independent professional document
                facilitation consultancy. Document eligibility and final visa validity are strictly
                governed by official state departments and respective foreign embassies.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
