import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  Globe2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Award,
  Sparkles,
  Search,
  FileDown
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { openBookingModal, openExitModal, openChecklistModal, countries, services } = useApp();
  const [selectedQuickService, setSelectedQuickService] = useState('educational-attestation');
  const [selectedQuickCountry, setSelectedQuickCountry] = useState('uae');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = services.find((s) => s.id === selectedQuickService);
    const countryObj = countries.find((c) => c.id === selectedQuickCountry);
    openBookingModal(serviceObj?.title, countryObj?.name);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F3A] via-[#0d274c] to-[#0B1F3A] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background architectural grid and ambient glow */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1357A6]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D6A84F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#D6A84F] text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certificate Attestation & Apostille Services</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Your Documents. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-[#D6A84F]">
                  Ready for the World.
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-blue-100">
                Professional Attestation & Apostille Services in Bangalore
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Get professional assistance with educational, personal, and commercial document
              attestation, MEA apostille, and diplomatic legalization for international employment,
              study, migration, and business.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3.5 rounded-lg bg-[#1357A6] hover:bg-[#1976D2] text-white font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl border border-blue-400/40 flex items-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D6A84F]" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => openChecklistModal()}
                className="px-5 py-3.5 rounded-lg bg-[#D6A84F] hover:bg-[#c29640] text-[#0B1F3A] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>PDF Checklist</span>
              </button>

              <button
                onClick={() => openExitModal()}
                className="px-4 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Quick Advice</span>
              </button>
            </div>

            {/* Trust Indicators Underneath */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                <span>Educational Documents</span>
              </div>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                <span>Personal Documents</span>
              </div>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                <span>Commercial Documents</span>
              </div>
            </div>

            {/* Embedded Quick Appointment / Price Estimator Starter Card */}
            <form
              onSubmit={handleQuickBook}
              className="mt-6 p-4 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md max-w-xl"
            >
              <div className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span>Quick Service Selector</span>
                <span className="text-[#D6A84F] lowercase text-xs">Direct Office / Pickup Booking</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="sr-only">Service</label>
                  <select
                    value={selectedQuickService}
                    onChange={(e) => setSelectedQuickService(e.target.value)}
                    className="w-full bg-[#08172b] border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D6A84F]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#08172b] text-white">
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-4">
                  <label className="sr-only">Country</label>
                  <select
                    value={selectedQuickCountry}
                    onChange={(e) => setSelectedQuickCountry(e.target.value)}
                    className="w-full bg-[#08172b] border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D6A84F]"
                  >
                    {countries.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#08172b] text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-[#D6A84F] hover:bg-[#c29640] text-[#0B1F3A] font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Check Slots</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Visual Trust & Document Dossier Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="rounded-2xl bg-gradient-to-b from-[#102a4e] to-[#09182d] border border-white/15 p-6 shadow-2xl relative overflow-hidden">
                {/* Decorative gold badge */}
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-[#D6A84F]/10 rounded-full blur-xl pointer-events-none" />

                {/* Header of Dossier */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1357A6] flex items-center justify-center text-white shadow-inner">
                      <FileCheck className="w-5 h-5 text-[#D6A84F]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">International Legalization Dossier</div>
                      <div className="text-xs text-slate-300">Malleshwaram Hub · Bengaluru</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    Active Desk
                  </span>
                </div>

                {/* Simulated Certificate Verification Document */}
                <div className="mt-5 p-4 rounded-xl bg-white text-[#172033] shadow-md border border-slate-200 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        Document Classification
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        Bachelor of Engineering (B.E.)
                      </div>
                      <div className="text-xs text-slate-500">
                        Visvesvaraya Technological University (VTU)
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#1357A6] p-1 flex items-center justify-center text-center">
                      <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#1357A6]" />
                      </div>
                    </div>
                  </div>

                  {/* Verification Chain Illustration */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50 text-slate-700">
                      <span className="font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        1. University Verification & HRD
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Karnataka</span>
                    </div>

                    <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50 text-slate-700">
                      <span className="font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        2. MEA Attestation (CPV Div)
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">New Delhi</span>
                    </div>

                    <div className="flex items-center justify-between py-1 px-2 rounded bg-blue-50/80 text-blue-900 border border-blue-200">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-[#1357A6]" />
                        3. Destination Consular Legalization
                      </span>
                      <span className="text-[11px] font-bold text-[#1357A6]">UAE / GCC / MEA</span>
                    </div>
                  </div>

                  {/* Stamp & Seal representation */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Tamper-Evident Security Folder
                    </span>
                    <span className="font-mono text-slate-400">Bangalore – 560003</span>
                  </div>
                </div>

                {/* Sub-cards: Location & Service Highlights */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#D6A84F] font-semibold mb-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Physical Office</span>
                    </div>
                    <div className="text-xs text-slate-200">
                      Malleshwaram 11th Cross, Temple Street
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#D6A84F] font-semibold mb-1">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Global Destinations</span>
                    </div>
                    <div className="text-xs text-slate-200">
                      UAE, Saudi, Qatar, Europe, USA & 120+ Countries
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
