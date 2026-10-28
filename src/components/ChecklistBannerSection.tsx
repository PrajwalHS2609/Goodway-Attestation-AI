import React from 'react';
import { useApp } from '../context/AppContext';
import { FileDown, CheckCircle2, ShieldCheck, ArrowRight, Printer, Sparkles } from 'lucide-react';

export const ChecklistBannerSection: React.FC = () => {
  const { openChecklistModal } = useApp();

  return (
    <section className="py-12 bg-gradient-to-r from-[#0B1F3A] via-[#0e274c] to-[#0B1F3A] text-white border-y border-white/10 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#D6A84F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Downloadable Checklist Tool</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Preparing Your Documents for Attestation or Apostille?
            </h2>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Don’t risk rejected paperwork or missing university stamps. Generate a tailored,
              official PDF document preparation checklist customized for your destination country
              (UAE, Saudi Arabia, Qatar, Germany, USA, UK, Canada, and 120+ others).
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                Original Certificate Rules
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                ID & Marksheet Requirements
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                Printable PDF Format
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
            <button
              onClick={() => openChecklistModal()}
              className="px-6 py-3.5 bg-[#D6A84F] hover:bg-[#c29640] text-[#0B1F3A] font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Generate PDF Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openChecklistModal('uae', 'educational')}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Quick UAE / GCC Checklist</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
