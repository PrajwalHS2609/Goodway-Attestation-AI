import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Globe2, CheckCircle2, Calendar, FileText, ArrowRight, AlertCircle, Building, FileDown } from 'lucide-react';

export const CountryGuideModal: React.FC = () => {
  const { selectedCountryDetail, setSelectedCountryDetail, openBookingModal, openChecklistModal } = useApp();

  if (!selectedCountryDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0B1F3A] text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold">
              {selectedCountryDetail.code}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#D6A84F]">
                Destination Country Dossier
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                {selectedCountryDetail.name}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedCountryDetail(null)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Legalization Framework Type Banner */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <Globe2 className="w-5 h-5 text-[#1357A6] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-[#1357A6]">
                Authentication Protocol
              </div>
              <div className="text-sm font-bold text-slate-900">
                {selectedCountryDetail.type}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {selectedCountryDetail.description}
              </div>
            </div>
          </div>

          {/* Consular / Diplomatic Mission */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <Building className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Diplomatic Jurisdiction: </span>
              {selectedCountryDetail.embassyName}
            </div>
          </div>

          {/* Step-by-Step Workflow */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Authentication Pipeline for {selectedCountryDetail.name}
            </h4>
            <div className="space-y-2">
              {selectedCountryDetail.workflow.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1357A6] text-white flex items-center justify-center font-bold shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specific Document Requirements */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Prerequisite Documents & Dossier Requirements
            </h4>
            <div className="space-y-1.5">
              {selectedCountryDetail.requiredDocs.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Country Processing Notes */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Crucial Verification Notice for {selectedCountryDetail.name}</span>
            </div>
            <p className="leading-relaxed">
              {selectedCountryDetail.processingNotes}
            </p>
          </div>

          {/* Goodway Assistance Process */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Malleshwaram Hub Service: </span>
            Goodway Attestation arranges initial document evaluation, state HRD / Home Department
            clearance, MEA submissions in New Delhi, and embassy consular submissions with secure
            courier return to your address or office collection.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
          <button
            onClick={() => {
              const cName = selectedCountryDetail.name;
              setSelectedCountryDetail(null);
              openChecklistModal(cName.toLowerCase());
            }}
            className="px-4 py-2 text-xs font-bold text-[#1357A6] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-[#1357A6]" />
            <span>Download {selectedCountryDetail.code} Checklist (PDF)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCountryDetail(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                const cName = selectedCountryDetail.name;
                setSelectedCountryDetail(null);
                openBookingModal(undefined, cName);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1357A6] hover:bg-[#1976D2] rounded-lg transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Book Appointment for {selectedCountryDetail.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
